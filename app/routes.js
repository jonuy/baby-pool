module.exports = function(app) {
  // index
  app.get('/', function(request, response) {
    response.render('index', {title:'Baby Pool'});
  });
};