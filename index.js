/*
Future:
https://bashooka.com/coding/web-background-animation-effects/

*/

var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');

var _ = require("underscore");
var moment = require('moment');
var marked = require('marked');
var helmet = require('helmet')
const cows = require('cows');
const superb = require('superb');

const { check, validationResult } = require('express-validator');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var dotenv = require('dotenv'); //allows you to use dotenv file
var Data = require('./models/Data');
dotenv.config();
console.log(process.env.MONGODB);
mongoose.connect(process.env.MONGODB);
mongoose.connection.on('error', function () {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

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

// var id = _.max(DATA, function (element) { return element.id }).id;
var id;
Data.Internal.count({}, function (err, count) {
  if (err) throw err;
  id = count;
  // console.log("id: " + id)
});

/*
app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
*/

app.listen(process.env.PORT || 3000, function () {
  console.log('Listening!');
});

app.get('/', function (req, res) {

  Data.External.find({}, function (err, external) {
    if (err) throw err;
    Data.Internal.find({}, function (err, internal) {
      if (err) throw err;

      var ads = external.map((o, i) => (
        {
          //time: o.key, lat: o.value, lon: lon[i].value,

          title: o.title,
          price: o.price,
          images: o.images,
          location: o.location,
          name: o.name,
          contact: o.contact,
          description: o.description,
          id: o.internal_id,

          preview: internal[i].preview,
          date: internal[i].date,
          display_date: internal[i].display_date,
        }));

      res.render('home', {
        ads: ads,
        search: true
      });

    });
  });

  // res.render('home', {
  //   ads: DATA,
  //   search: true
  // });
})

app.get('/ad/:id', function (req, res) {
  var _id = parseInt(req.params.id);

  Data.External.find({}, function (err, external) {
    if (err) throw err;
    Data.Internal.find({}, function (err, internal) {
      if (err) throw err;

      var ads = external.map((o, i) => (
        {
          //time: o.key, lat: o.value, lon: lon[i].value,

          title: o.title,
          price: o.price,
          images: o.images,
          location: o.location,
          name: o.name,
          contact: o.contact,
          description: o.description,
          id: o.internal_id,

          preview: internal[i].preview,
          date: internal[i].date,
          display_date: internal[i].display_date,
        }));

      var ad = _.findWhere(ads, { id: _id });
      if (!ad) return res.render('404');
      res.render('ad', ad);

    });
  });

});

app.get('/cheapest', function (req, res) {

  Data.External.find({}, function (err, external) {
    if (err) throw err;
    Data.Internal.find({}, function (err, internal) {
      if (err) throw err;

      var ads = external.map((o, i) => (
        {
          //time: o.key, lat: o.value, lon: lon[i].value,

          title: o.title,
          price: o.price,
          images: o.images,
          location: o.location,
          name: o.name,
          contact: o.contact,
          description: o.description,
          id: o.internal_id,

          preview: internal[i].preview,
          date: internal[i].date,
          display_date: internal[i].display_date,
        }));

      _ads = _.sortBy(ads, function (element) {
        return element.price;
      });
      res.render('home', {
        ads: _ads
      });

    });
  });

});

app.get('/priciest', function (req, res) {
  Data.External.find({}, function (err, external) {
    if (err) throw err;
    Data.Internal.find({}, function (err, internal) {
      if (err) throw err;

      var ads = external.map((o, i) => (
        {
          //time: o.key, lat: o.value, lon: lon[i].value,

          title: o.title,
          price: o.price,
          images: o.images,
          location: o.location,
          name: o.name,
          contact: o.contact,
          description: o.description,
          id: o.internal_id,

          preview: internal[i].preview,
          date: internal[i].date,
          display_date: internal[i].display_date,
        }));

      _ads = _.sortBy(ads, function (element) {
        return element.price * -1;
      });
      res.render('home', {
        ads: _ads
      });

    });
  });


});

app.get('/newest', function (req, res) {
  Data.External.find({}, function (err, external) {
    if (err) throw err;
    Data.Internal.find({}, function (err, internal) {
      if (err) throw err;

      var ads = external.map((o, i) => (
        {
          //time: o.key, lat: o.value, lon: lon[i].value,

          title: o.title,
          price: o.price,
          images: o.images,
          location: o.location,
          name: o.name,
          contact: o.contact,
          description: o.description,
          id: o.internal_id,

          preview: internal[i].preview,
          date: internal[i].date,
          display_date: internal[i].display_date,
        }));

      _ads = _.sortBy(ads, function (element) {
        return element.date * -1;
      });
      res.render('home', {
        ads: _ads
      });

    });
  });
});

app.get('/oldest', function (req, res) {
  Data.External.find({}, function (err, external) {
    if (err) throw err;
    Data.Internal.find({}, function (err, internal) {
      if (err) throw err;

      var ads = external.map((o, i) => (
        {
          //time: o.key, lat: o.value, lon: lon[i].value,

          title: o.title,
          price: o.price,
          images: o.images,
          location: o.location,
          name: o.name,
          contact: o.contact,
          description: o.description,
          id: o.internal_id,

          preview: internal[i].preview,
          date: internal[i].date,
          display_date: internal[i].display_date,
        }));

      _ads = _.sortBy(ads, function (element) {
        return element.date;
      });
      res.render('home', {
        ads: _ads
      });

    });
  });

});

app.get('/random', function (req, res) {

  Data.External.find({}, function (err, external) {
    if (err) throw err;
    Data.Internal.find({}, function (err, internal) {
      if (err) throw err;

      var ads = external.map((o, i) => (
        {
          //time: o.key, lat: o.value, lon: lon[i].value,

          title: o.title,
          price: o.price,
          images: o.images,
          location: o.location,
          name: o.name,
          contact: o.contact,
          description: o.description,
          id: o.internal_id,

          preview: internal[i].preview,
          date: internal[i].date,
          display_date: internal[i].display_date,
        }));

      var _ad = ads[Math.floor(Math.random() * ads.length)];
      res.render('ad', _ad);

    });
  });

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

  var external = new Data.External({
    title: body.title,
    price: parseFloat(body.price),
    images: body.images,
    location: body.location,
    name: body.name,
    contact: body.contact,
    description: body.description,
    internal_id: parseInt(body.id),
  });

  var internal = new Data.Internal({
    internal_id: parseInt(body.id),
    preview: body.preview,
    date: parseInt(body.date),
    display_date: body.display_date,
  });

  // Save movie to database

  external.save(function (err) {
    if (err) throw err;

    internal.save(function (err) {
      if (err) throw err;
      return res.redirect("/");
    })

  })

  // DATA.push(req.body);
  // dataUtil.saveData(DATA);
});

app.get('/api/getAds', function (req, res) {
  Data.External.find({}, function (err, external) {
    if (err) throw err;
    Data.Internal.find({}, function (err, internal) {
      if (err) throw err;

      var ads = external.map((o, i) => (
        {
          //time: o.key, lat: o.value, lon: lon[i].value,

          title: o.title,
          price: o.price,
          images: o.images,
          location: o.location,
          name: o.name,
          contact: o.contact,
          description: o.description,
          id: o.internal_id,

          preview: internal[i].preview,
          date: internal[i].date,
          display_date: internal[i].display_date,
        }));

      res.json(ads);

    });
  });

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
  for (var key in req.body) {
    if (key.includes("image")) {
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

  var body = data;

  //DATA.push(data);
  //dataUtil.saveData(DATA);

  var external = new Data.External({
    title: body.title,
    price: parseFloat(body.price),
    images: body.images,
    location: body.location,
    name: body.name,
    contact: body.contact,
    description: body.description,
    internal_id: parseInt(body.id),
  });

  var internal = new Data.Internal({
    internal_id: parseInt(body.id),
    preview: body.preview,
    date: parseInt(body.date),
    display_date: body.display_date,
  });

  // Save movie to database

  external.save(function (err) {
    if (err) throw err;

    internal.save(function (err) {
      if (err) throw err;
      return res.redirect("/");
    })

  })

  res.send("Success!")
});


app.delete('/delete/all', function (req, res) {

  Data.External.remove({}, function (err, external) {
    if (err) throw err;
    Data.Internal.remove({}, function (err, internal) {
      if (err) throw err;
      res.send('Everything is deleted!')

    });
  });

});


app.delete('/delete/:id', function (req, res) {
  var _id = parseInt(req.params.id);

  Data.External.remove({internal_id: _id}, function (err, external) {
    if (err) throw err;
    Data.Internal.remove({internal_id: _id}, function (err, internal) {
      if (err) throw err;
      res.send('Ad ' + _id + ' is deleted!')
    });
  });

});


app.get('/about', function (req, res) {

  return res.render('about');
  
});

app.get('*', function (req, res) {

  var cowList = cows();
  var cow = cowList[Math.floor(Math.random() * cowList.length)];
  var adj = superb.random();
  return res.render('404', {
    cow: cow,
    adj: adj
  });
});