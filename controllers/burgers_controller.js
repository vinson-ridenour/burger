const express = require("express");

const router = express.Router();

// Import the model (burger.js) to use its database functions.
const burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    // console.log(hbsObject);
    res.render("", hbsObject);
  });
});

router.post("/", function(req, res) {
  burger.create([
    "burger_name" // has to match what you assigned this to in the HTML (input text box)
  ], [
    req.body.burger_name // name has to match what you assigned it to in the HTML
  ], function() {
    res.redirect("/");
  });
});

router.put("/:id", function(req, res) {
  var condition = "id = " + req.params.id + ";";

  console.log(`Condition being passed to model to ORM: ${condition}`);

  burger.update({
    id: req.body.id
  }, condition, function() {
    res.redirect("/");
  });
});

// router.delete("/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   console.log("condition", condition);

//   burger.delete(condition, function() {
//     res.redirect("/");

//     // should have a condition statement if it doesnt pass 
//   });
// });


// Export routes for server.js to use.
module.exports = router;