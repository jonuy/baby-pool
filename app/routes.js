module.exports = function(app) {
  // index
  app.get('/', function(request, response) {
    response.render('form', {title:'Baby Pool'});
  });

  // Results view
  require('./results.js')(app);

  // Handle the survey form submission
  require('./submit.js')(app);
};