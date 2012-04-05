
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

/* Get Plots Pages */

exports.googleline = function(req,res){
	res.render('googleline', {title: 'Google Line Chart'})
}

exports.googleannotated = function(req,res){
	res.render('googleannotated', {title: 'Google Annotated Time Line'})
}

exports.dygraphs = function(req,res){
	res.render('dygraphs', {title: 'Dygraphs'})
}