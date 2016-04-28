var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt'),
    Schema   = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const BCRYPT_SALT = 10;

var UserSchema = new Schema({
  name     : { type: String, required: true, trim: true },
  username : { type: String, required: true, trim: true },
  password : { type: String },
  books    : [
    {type: Schema.Types.ObjectId, ref: 'Book'}
  ]
});

UserSchema.pre('save', function(next) {

    var user = this;

    // Only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(BCRYPT_SALT, function(error, salt) {

        if (error) return next(error);

        // hash the password using generated salt
        bcrypt.hash(user.password, salt, function(error, hash) {

            if (error) return next(error);

            // Override the cleartext password with hash
            user.password = hash;

            next();
        });
    });
});

UserSchema.methods.comparePassword = function(password, callback) {

    bcrypt.compare(password, this.password, function(error, isMatch) {

        if (error) return callback(error);
        callback(null, isMatch);
    });
};

UserSchema.methods.addBooks = function(books) {
  
  var user = this;

  books.forEach(function(book) {
    user.books.push(book._id);
    user.save();
  });
};

exports.UserSchema = UserSchema;
module.exports     = mongoose.model('Users', UserSchema);
