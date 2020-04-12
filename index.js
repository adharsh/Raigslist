/*
Future:
https://bashooka.com/coding/web-background-animation-effects/

*/

var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');

var dataUtil = require("./data-util");
var _ = require("underscore");
var moment = require('moment');
var marked = require('marked');
var helmet = require('helmet')
const { check, validationResult } = require('express-validator');


var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

app.use(helmet())

/* Add whatever you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5
 * endpoints for the API, and 5 others.
 */

var _DATA = dataUtil.loadData().ads;
var id = _.max(_DATA, function (element) { return element.id }).id;

/*
app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
*/

app.listen(process.env.PORT || 3000, function () {
  console.log('Listening!');
});

app.get('/', function (req, res) {
  res.render('home', {
    ads: _DATA,
    search: true
  });
})

app.get('/ad/:id', function (req, res) {
  var _id = parseInt(req.params.id);
  var ad = _.findWhere(_DATA, { id: _id });
  if (!ad) return res.render('404');
  res.render('ad', ad);
});

app.get('/cheapest', function (req, res) {
  _ads = _.sortBy(_DATA, function (element) {
    return element.price;
  });
  res.render('home', {
    ads: _ads
  });
});

app.get('/priciest', function (req, res) {
  _ads = _.sortBy(_DATA, function (element) {
    return element.price * -1;
  });
  res.render('home', {
    ads: _ads
  });
});

app.get('/newest', function (req, res) {
  _ads = _.sortBy(_DATA, function (element) {
    return element.date * -1;
  });
  res.render('home', {
    ads: _ads
  });
});

app.get('/oldest', function (req, res) {
  _ads = _.sortBy(_DATA, function (element) {
    return element.date;
  });
  res.render('home', {
    ads: _ads
  });
});

app.get('/random', function (req, res) {
  var _ad = _DATA[Math.floor(Math.random() * _DATA.length)];
  res.render('ad', _ad);
});

app.get("/post", function (req, res) {
  res.render('post');
});

app.post('/post', function (req, res) {
  var body = req.body;
  body.id = ++id;

  body.images = body.images.trim().split(/\s+/);
  body.description = marked(body.description);
  body.preview = body.description.substring(0, 50);

  var date = moment();
  body.date = parseInt(date.format('YYYYMMDD'));
  body.display_date = date.format('MMM Do, YYYY');

  _DATA.push(req.body);
  dataUtil.saveData(_DATA);

  res.redirect("/");
});

app.get('/api/getAds', function (req, res) {
  res.json(_DATA);
})

app.post('/api/post', [
  check('title').trim().escape().notEmpty().withMessage("Title is required"),
  check('price').isDecimal({ force_decimal: false, decimal_digits: '2', locale: 'en-US' }),
  check('location').trim().escape().notEmpty().withMessage("Location is required"),
  check('name').trim().escape().notEmpty().withMessage("Name is required"),
  check('contact').trim().escape().notEmpty().withMessage("Contact is required"),
  check('description').trim().escape().notEmpty().withMessage("Description is required")
], (req, res) => {
  errors = validationResult(req);
  errors = errors.array();

  var image_error;
  var images = [];
  
  var num_images = 0;
  for(var key in req.body){
      if(key.includes("image")){
          num_images++;
      }
  }

  if (num_images == 0) {
    image_error =
    {
      "value": images,
      "msg": "Empty array",
      "param": "images",
      "location": "body"
    };
  } else {
    var valid_images = true;
    for (var i = 0; i < num_images; i++) {
      var ele = req.body["images[" + i.toString() + "]"];
      if (ele.split(/\s+/).length != 1) {
        image_error = {
          "value": images,
          "msg": "Invalid values",
          "param": "images",
          "location": "body"
        };
        break;
      }

      images.push(ele);
    }
  }

  if (image_error) {
    errors.push(image_error);
  }

  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }

  
  var data = {};
  data.title = req.body.title;
  data.price = parseFloat(req.body.price);
  data.images = images;
  data.location = req.body.location;
  data.name = req.body.name;
  data.contact = req.body.contact;
  data.description = marked(req.body.description);
  
  data.id = ++id;
  data.preview = data.description.substring(0, 50);

  var date = moment();
  data.date = parseInt(date.format('YYYYMMDD'));
  data.display_date = date.format('MMM Do, YYYY');
  

  _DATA.push(data);
  dataUtil.saveData(_DATA);

  res.send("Success!")
});


app.get('*', function (req, res) {
  return res.render('404');
});