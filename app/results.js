var model = require('./models/submission')
    ;

module.exports = function(app) {

  var render = function(request, response) {
    // @TODO populate the results view with the submissions
    response.render('results');
  };

  /**
   * GET /results
   */
  app.get('/results', render);
};