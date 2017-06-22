var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator')
// ^^ required packages
var app = express();

app.use(express.static('public'));
app.use(expressValidator());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// ^^ body parser boilerplate
var mustacheExpress = require('mustache-express');
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');
// ^^ mustache boilerplate

// var data = require('./data.js');

// ^^^ server setup ^^^
// vvv get/post/listen vvv

// a fake set of data
var data = {
      todoItems: [{
              "todo": "eat lunch",
              "done": true
            },
            {
              "todo": "make boilerplate",
              "done": true
            },
            {
              "todo": "use the toilet",
              "done": false
            }
  ]}



app.get("/", function (req, res) {
  res.render('index', { todos: data.todoItems });
});


app.post("/", function (req, res) {
  req.checkBody("item", "Gotta put SOMETHING in...okay?").notEmpty();
  var errors = req.validationErrors();

  if (errors) {
    var html = errors;
    res.send(html);
  } else {
      data.todoItems.push({ "todo": req.body.item,
                          "done": false
                        });

      res.redirect('/');
    }
})



app.listen(8080, function(){
  console.log("You're good to go!")
});






// white space
