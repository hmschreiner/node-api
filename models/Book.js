var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var BookSchema = new Schema({
  name           : { type: String, required: true, trim: true },
  author         : { type: String, required: true, trim: true },
  published_date : { type: Date, required: true, trim: true }
});

exports.BookSchema = BookSchema;
module.exports     = mongoose.model('Books', BookSchema);
