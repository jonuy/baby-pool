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

        // Hair results
        var hairsIndex = hairs.length;
        hairs[hairsIndex] = {};
        hairs[hairsIndex].name = name;
        hairs[hairsIndex].hair = val.hair ? 'YES' : 'NO';
      });

      // @TODO sort birthdates by date and time
      // @TODO sort heights in ascending order
      // @TODO sort weights in ascending order
      // @TODO sort hair options to YES and NO
      
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