
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();

//for authetication
var MemStore = require('connect').session.MemoryStore;
// Configuration

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  //adding authentication
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'somerandomstring', store: MemStore( {
    reapInterval: 6000 * 10
  })}));
  //
  app.use(app.router);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.static(__dirname + '/public'));
  //dynamic helpers to allow flash comment to user
  app.dynamicHelpers( 
    {
      session: function(req, res) {
        return req.session;
      },
      flash: function(req,res) {
        return req.flash();
      }    
  });
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

//login middleware route
function requiresLogin(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/sessions/new?redir=' + req.url);
  }
};

//Sessions//

var users = require('./users');

app.get('/sessions/new', function(req,res) {
  res.render('sessions/new', {locals: {
    title: 'Login', //not sure if it goes here or outside of locals
    redir: req.query.redir
  }});
});

app.post('/sessions', function(req,res) {
  users.authenticate(req.body.login, req.body.password, function(user) {
    if (user) {
      req.session.user = user;
      res.redirect(req.body.redir || '/');
    } else {
      req.flash('warn', 'login failed');
      res.render('sessions/new', {locals: {
        title: 'Login', //not sure if it goes here or outside of locals
        redir: req.body.redir
      }});
    }
  });
});

app.get('/sessions/destroy', function(req,res) {
  delete req.session.user;
  res.redirect('/sessions/new');
});

// Routes
app.get('/', requiresLogin, routes.index);
app.get('/googleline', requiresLogin, routes.googleline);
app.get('/googleannotated', requiresLogin, routes.googleannotated);
app.get('/dygraphs', requiresLogin, routes.dygraphs);
app.get('/dygraphs_csv', requiresLogin, routes.dygraphs_csv);
app.get('/sortable_table', requiresLogin, routes.sortable_table);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
