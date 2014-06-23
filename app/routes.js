module.exports = function(app) {
  // index
  app.get('/', function(request, response) {
    response.render('form', {title:'Baby Pool'});
  });

  // Handle the survey form submission
  require('./submit.js')(app);
};