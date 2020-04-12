
# Raigslist, Inc, the Craigslist Spinoff

---

Name: Adharsh Babu

Date: April 11th, 2020

Project Topic: Raigslist, Inc

URL: https://raigslist.herokuapp.com/
 ---

### 1. Data Format and Storage

Data point fields:
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

Schema: 
```javascript
{
    "title": String,
    "price": Number,
    "images": [String],
    "location": String,
    "name": String,
    "contact": String,
    "description": String,
    "id": Number,
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
1. Newest -> `/newest`
2. Oldest -> `/oldest`
3. Cheapest -> `/cheapest`
4. Priciest -> `/priciest`
5. Random -> `/random`

Additionally, each individual post can be accessed through:
`/ad/:id`  
(`id` starts from `1` to the number of posts present)

### Code Repo:
- https://github.com/adharsh/Raigslist
