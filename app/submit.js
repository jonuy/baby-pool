var model = require('./models/submission')
    ;

module.exports = function(app) {
  var onFormSubmit = function(request, response) {
    // Document created based on request.body payload
    var doc = {
      first_name: request.body.first_name,
      last_name: request.body.last_name,
      birthdate: new Date(request.body.birthdate),
      birthdate_time: request.body.birthdate_time,
      weight_lbs: request.body.weight_lbs,
      weight_oz: request.body.weight_oz,
      height_inches: request.body.height_inches,
      hair: request.body.hair
    };

    // Add document to the database
    var submission = model.create(doc);
    submission.then(onCreate);

    // Redirect to the results view
    response.redirect('/results');
  };

  var onCreate = function(doc) {
    if (doc) {
      console.log('Document created successfully.');
      console.log(doc);
    }
  };

  /**
   * POST /form-submit
   */
  app.post('/form-submit', onFormSubmit);    
};