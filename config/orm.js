var connection = require("../config/connection.js");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
 function printQuestionMarks(num) {
     var arr = [];
     for (var i = 0; i < num; i++) {
       arr.push("?");
     }
     return arr.toString();
   }
   // Helper function to convert object key/value pairs to SQL syntax
 function objToSql(ob) {
     var arr = [];
     // loop through the keys and push the key/value as a string int arr
     for (var key in ob) {
       var value = ob[key];
       // check to skip hidden properties
       if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
         }
         // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
         // e.g. {sleepy: true} => ["sleepy=true"]
         arr.push(key + "=" + value);
      }
    }
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }

// * In the `orm.js` file, create the methods that will execute the necessary MySQL commands in the **controllers** What does controllers mean? These are the methods you will need to use in order to retrieve and store data in your database.
//    * Export the ORM object in `module.exports

//      * `selectAll()`
var orm = {
  all: function(tableInput, cb) {
     var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function (err, result) {
      if(err) { 
        throw err; 
      }
      cb(result);
    });
  },
  
  
  //      insertOne()
  create: function(table, cols, vals, cb) {
     var queryString = "INSERT INTO " + table;
     queryString += " (";
     queryString += cols.toString();
     queryString += ") ";
     queryString += "VALUES (";
     queryString += printQuestionMarks(vals.length);
     queryString += ") ";
     console.log(queryString);
     connection.query(queryString, vals, function(err, result) {
       if (err) {
         throw err;
       }
       cb(result);
     });
  },
  
  // An example of objColVals would be {name: dblbaccheesonator, devoured: false}
  //      updateOne()
  update: function(table, objColVals, condition, cb) {
     
     var queryString = "UPDATE " + table;
     queryString += " SET ";
     queryString += objToSql(objColVals);
     queryString += " WHERE ";
     queryString += condition;
     console.log(queryString);
     connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};


module.exports = orm;

/*
connection.query("SELECT * FROM burgers_db;", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
});
// We will need to create an object to export here.  The export will be reequired as var orm = require("orm.js");
// var orm = {
    // using handlebars to render main index.html pg with burgers in it
app.get("/", function(req,res) {
    connection.query("SELECT * FROM burgers;", function(err, data) {
        if (err) {
            return res.status(500).end();
        }
        res.render("index", {burgers: data});
    });
});

// Create a new burger in db from the user input 
app.post("/burgers", function(req, res) {
connection.query("INSERT INTO burgers VALUES ?", [req.body.burger], function(err, result) {
    if (err) {
        return res.status(500).end();
    }
        // and send back the id of the new burger
        res.json({id: result.insertId });
        console.log({ id:  result.insertId});
});
});
        // retrive all burgers
        app.get("/burgers", function(req,res) {
            connection.query("SELECT * FROM burgers;", function(err, data) {
                if (err) {
                    return res.status(500).end();
                }
                res.json(data);
            });
        });

// Update a burger
app.put("/burgers/:id", function(req, res) {
    connection..query("UPDATE burgers SET burger = ? WHERE id = ? ", [req.body.burger, req.params.id], function(err, result) {
        if (err){ 
            return res.status(500),end();
        }
        else if (result.changedRows === 0) {
            return res.status(404).end();
        }
        res.status(200).end();
    });
});

// delete a burger
app.delete("/burgers/:id", function(req, res){
    connection.query("DELETE FROM burgers WHERE id = ?",[req.params.id], function(err, result) {
        if (err) {
            // If an error occurred, send a generic server failure
            return res.status(500).end();
          }
          else if (result.affectedRows === 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
          }
          res.status(200).end();
    });
});
}
*/
