var express = require('express')
    ;

var app = express();

var config = require('./app/config.js')(app, express);
var routes = require('./app/routes.js')(app);

var port = app.get('port');
app.listen(port, function() {
  console.log('baby-pool server listening on port %d...\n\n', port);
});