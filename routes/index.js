
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

exports.dygraphs_csv = function(req,res){
	res.render('dygraphs_csv', {title: 'Dygraphs CSV'})
}

/*Table Pages*/

exports.sortable_table = function(req,res){
	res.render('sortable_table', {title: 'Sortable Table'})
}