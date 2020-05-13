
# Raigslist, Inc, the Craigslist Spinoff

---

Name: Adharsh Babu

Date: April 11th, 2020

Project Topic: Raigslist, Inc

URL: https://raigslist.herokuapp.com/
 ---

### 1. Data Format and Storage

All data point fields:
- `Field 1`: Title               `Type: String` 
- `Field 2`: Price              `Type: Number`
- `Field 3`: Images             `Type: [String]`
- `Field 4`: Location                `Type: String`
- `Field 5`: Name       `Type: String`
- `Field 6`: Contact    `Type: String`
- `Field 7`: Description    `Type: String`
- `Field 8`: ID    `Type: Number` (internally used)
- `Field 9`: Preview    `Type: String` (internally used)
- `Field 10`: Date    `Type: Number` (internally used)
- `Field 11`: Display Date    `Type: String` (internally used)

External Schema: 
```javascript
{
    "title": String,
    "price": Number,
    "images": [String],
    "location": String,
    "name": String,
    "contact": String,
    "description": String,
    "internal_id": Number
}
```

Internal Schema: 
```javascript
{
    "internal_id": Number,
    "preview": String,
    "date": Number,
    "display_date": String
}
```

### 2. Add New Data

HTML form route: `/post`

POST endpoint route: `/api/post`

Example Node.js POST request to endpoint: 
```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'http://localhost:3000/api/post',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form:  {
          "title": "Selling a Chair",
          "price": 29.99,
          "images": [
              "https://via.placeholder.com/300x300",
              "https://via.placeholder.com/300x270",
              "https://via.placeholder.com/300x250"
          ],
          "location": "Washington D.C.",
          "name": "Bob Smith",
          "contact": "555-555-5555, example@example.com",
          "description": "This is a very high quality chair that I have bought recently."
      }

};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/api/getads`

### 4. Search Data

Search Field: {{`title`}} - ${{`price`}}

### 5. Navigation Pages

Navigation Filters
1. Home -> `/`
2. About -> `/about`
3. Newest -> `/newest`
4. Oldest -> `/oldest`
5. Cheapest -> `/cheapest`
6. Priciest -> `/priciest`
7. Random -> `/random`
8. Post Advertisement -> `/post`

Additionally, each individual post can be accessed through:
`/ad/:id`  
(`id` starts from `1` to the number of posts present)

### 6. Module
The schemas are stored in the `Data.js` file located in `./models/Data.js`. `Data` is exported and contains the two schemas, which are `External` and `Internal`. They are acessed by `Data.External` and `Data.Internal`.

### 6. Delete Data
DELETE endpoint route: `/delete/all`
This will delete all advertisements. This will only be used in the event when the government intervenes in our company's moral black market operations.

DELETE endpoint route: `/delete/:id`
This will delete individual advertisements by id.

### 7. Additional NPM Packages
* `cows` was used to display ascii art in the 404 page.
* `superb` was used to display adjectives to describe the ascii art in the 404 page.
* `helmet` is very nice package that automatically adds security to your web application.

### Code Repo:
- https://github.com/adharsh/Raigslist
