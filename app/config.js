module.exports = function(app, express) {
  app.configure(function() {
    // Set the port. Heroku will automatically set the PORT environment variable. 
    app.set('port', process.env.PORT || 5000);

    // Perform route lookup based on url and HTTP method.
    app.use(app.router);

    // Set views folder. Use Jade engine for rendering.
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');

    // Static files live in the public folder.
    app.use(express.static(__dirname + '/public'));
  });
};