// require packages used in the project
const express = require("express");
const restaurantList = require("./restaurant.json").results;
const app = express();
const port = 3000;

// require handlebars in the project
const exphbs = require("express-handlebars");

// setting template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// setting static files
app.use(express.static("public"));

// routes setting
app.get("/", (req, res) => {
  res.render("index", { restaurant: restaurantList });
});

app.get("/search", (req, res) => {
  const keywords = req.query.keyword
  const keyword = keywords.toLowerCase().trim()
  const restaurants = restaurantList.filter(data => {
    return data.name.toLowerCase().trim().includes(keyword) || data.category.toLowerCase().trim().includes(keyword)
  })
  res.render("index", { restaurant: restaurants, keyword: keyword});
});

app.get("/restaurants/:restaurant_id", (req, res) => {
  const restaurant = restaurantList.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render("show", { restaurant: restaurant });
});

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
