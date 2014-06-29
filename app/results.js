/**
 * Logic for pulling submission data out of the backend and rendering it to the frontend.
 *
 * Routes:
 *  GET /results
 */

var model = require('./models/submission')
    ;

module.exports = function(app) {

  var render = function(request, response) {

    // Retrieve all documents in the collection
    model.find({}, function(err, docs) {
      if (err) {
        response.send(500);
        return;
      }

      var birthdates = []
          , weights = []
          , heights = []
          , hairs = []
          ;

      // Loop through documents to populate the results to pass to the view
      docs.forEach(function(val, idx, set) {
        var name = val.first_name + ' ' + val.last_name;

        // Birthdate results
        var birthdatesIndex = birthdates.length;
        birthdates[birthdatesIndex] = {};
        birthdates[birthdatesIndex].name = name;
        birthdates[birthdatesIndex].date = val.birthdate.toLocaleDateString();
        birthdates[birthdatesIndex].time = val.birthdate.toLocaleTimeString();
        birthdates[birthdatesIndex].dateObj = val.birthdate;

        // Height results
        var heightsIndex = heights.length;
        heights[heightsIndex] = {};
        heights[heightsIndex].name = name;
        heights[heightsIndex].height = val.height_inches;

        // Weight results
        var weightsIndex = weights.length;
        weights[weightsIndex] = {};
        weights[weightsIndex].name = name;
        weights[weightsIndex].weight = val.weight_lbs + ' lbs ' + val.weight_oz + ' oz';
        weights[weightsIndex].totalWeightInOz = (val.weight_lbs * 16) + val.weight_oz;

        // Hair results
        var hairsIndex = hairs.length;
        hairs[hairsIndex] = {};
        hairs[hairsIndex].name = name;
        hairs[hairsIndex].hair = val.hair ? 'YES' : 'NO';
      });

      // Sort birthdates by date and time. If equal, sort by name.
      birthdates.sort(function(a, b) {
        if (a.dateObj.getTime() === b.dateObj.getTime()) {
          return a.name.toLowerCase() > b.name.toLowerCase();
        }
        else {
          return a.dateObj.getTime() - b.dateObj.getTime();
        }
      });

      // Sort heights in ascending order. If equal, sort by name.
      heights.sort(function(a, b) {
        if (a.height == b.height) {
          return a.name.toLowerCase() > b.name.toLowerCase();
        }
        else {
          return a.height - b.height;
        }
      });

      // Sort weights in ascending order. If equal, sort by name.
      weights.sort(function(a, b) {
        if (a.totalWeightInOz == b.totalWeightInOz) {
          return a.name.toLowerCase() > b.name.toLowerCase();
        }
        else {
          return a.totalWeightInOz - b.totalWeightInOz;
        }
      });

      // Sort hair selection between YES and NO. Sort by name within the groupings.
      hairs.sort(function(a, b) {
        if (a.hair === 'YES' && b.hair === 'NO')
          return -1;
        else if (a.hair === 'NO' && b.hair === 'YES')
          return 1;
        else
          return a.name.toLowerCase() > b.name.toLowerCase();
      });

      // Prepare object to pass to the view to parse
      var results = {
        birthdates: birthdates,
        weights: weights,
        heights: heights,
        hairs: hairs
      };

      // Render the 'results' view
      response.render('results', results);
    });
  };

  /**
   * GET /results
   */
  app.get('/results', render);
};
