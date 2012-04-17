var users = {
  'tal' : {login: 'tal', password: 'pass', role: 'admin'},
  'eli' : {login: 'eli', password: 'pass', role: 'admin'},
  'tommy' : {login: 'tommy', password: 'pass', role: 'user'}
};
module.exports.authenticate = function(login, password, callback) {
  var user = users[login];
  if (!user) {
    callback(null);
    return;
  }
  if (user.password == password) {
    callback(user);
    return;
  }
  callback(null);
};
