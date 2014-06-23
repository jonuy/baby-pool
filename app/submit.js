module.exports = function(app) {
  var onFormSubmit = function(request, response) {
    response.render('results');
  };

  /**
   * POST /form-submit
   */
  app.post('/form-submit', onFormSubmit);    
};