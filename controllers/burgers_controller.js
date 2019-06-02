// Inside the `burgers_controller.js` file, import the following:

//    * Express
//    * `burger.js`

// Create the `router` for the app, and export the `router` at the end of your file.
var express = require("express");
// var orm = require("../config/orm.js");
var router = express.Router();

// Import the model burger (burger.js) to use its db function
var burger =  require("../models/burger.js");
// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    burger.all(function(data) {
      var hbsObject = {
        burgers: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });

  router.post("/api/burgers", function(req, res) {
    console.log(req.body.name);
    
    burger.create(["burger_name", "devoured"],[req.body.name, 0], function(result) {
     console.log("Controller post says " + result);
      console.log(result);
      // Send back the ID of the new quote
        res.json({ id: result.insertId });
    });
  });

  router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    console.log("condition", condition);
    burger.update(
      {
        devoured: req.body.devoured
      },
      condition,
      function(result) {
        if(result.changedRows === 0) {
          return res.status(404).end();
        }
        res.status(200).end();
      }
    );
  });

  // router information goes at the end of the file
  module.exports = router;
   // burger.create(["burgers", req.body.burger], [req.body.burger_name, req.body.devoured], function(result) {
   // res.json({ id: result.insertId });
   // });
   // });

  // router.put("/burgers/update", function(req, res) {
  //  // var condition = "id = " + req.params.id;
  
  //  // console.log("condition", condition);
  //   burger.update(req.body.burger_id, function(result) {
  //     console.log(result);
  //     res.redirect("/");
  //   });
  // });
        // {
          // devoured: req.body.devoured
         // },
       // condition,
       // function(result) {
         //   if (result.changedRows === 0) {
                 // If no rows were changed, then the ID must not exist, so 404
      //  return res.status(404).end();
      // }
      //  res.status(200).end();
      //      });
    // });


