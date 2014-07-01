/**
 * Submits data to the backend.
 *
 * Routes:
 *  POST /form-submit
 */
var model = require('./models/submission')
    ;

module.exports = function(app) {
  var self = {};

  var onFormSubmit = function(request, response) {
    self.response = response;

    // Document created based on request.body payload
    var doc = {
      first_name: request.body.first_name,
      last_name: request.body.last_name,
      contact: request.body.contact,
      weight_lbs: request.body.weight_lbs,
      weight_oz: request.body.weight_oz,
      length_inches: request.body.length_inches,
      hair: request.body.hair
    };

    // Set the year on the birthdate and add to the document
    var birthdate = new Date(request.body.birthdate + ' ' + request.body.birthdate_time);

    // User another Date object to get the current year
    var currDate = new Date();
    birthdate.setFullYear(currDate.getFullYear());
    doc.birthdate = birthdate;

    // Add document to the database
    var submission = model.create(doc);
    submission.then(onCreate);
  };

  var onCreate = function(doc) {
    if (doc) {
      console.log('Document created successfully.');
      console.log(doc);
    }
    else {
      console.log('uh oh...');
    }

    // Redirect to the results view
    self.response.redirect('/results');
  };

  /**
   * POST /form-submit
   */
  app.post('/form-submit', onFormSubmit);
};
