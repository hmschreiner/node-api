var express    = require('express'),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose'),
    BookSchema = require('./models/Book'),
    UserSchema = require('./models/User'),
    app        = express();

// Settings
app.set('json spaces', 2);
app.set('port', process.env.PORT || 3000);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// MongoDB connect
mongoose.connect('mongodb://localhost/test', function(err) {

    if (err) throw err;
    console.log('Connected to MongoDB.');
});

// Adding a user
// new UserSchema({
//   name     : 'Henrique Schreiner',
//   username : 'hmschreiner',
//   password : '12345'
// }).save(function (error) {
//   if (error) console.error(error);
// });

// Adding a book
// new BookSchema({
//   name     : 'Senhor dos Anéis',
//   author   : 'R. R. Tolkien',
//   published_date : new Date()
// }).save(function (error) {
//   if (error) console.error(error);
// });

// Adding all books to users
// BookSchema.find(function(error, books) {
//
//   UserSchema.find(function(error, users) {
//
//     users.forEach(function(user) {
//       user.addBooks(books);
//     });
//   });
// });

app.get('/', function(req, res, next) {

  res.status(403).send({
    status: false,
    message: 'Access token is required.'
  });
});

app.get('/users', function(req, res, next) {

  UserSchema.find()
    .select('name')
    .lean()
    .exec(function (err, users) {

        UserSchema.populate(users, {
          path: "books",
          model: 'Books'
         },
          function(err, users) {
            if (err) throw err;

            res.json({users: users});
          }
        );
  });
});

app.post('/post', function(req, res, next) {
  res.send(req.body);
});

app.listen(app.get('port'), function() {
  console.log('App running on port ' + app.get('port'));
});
