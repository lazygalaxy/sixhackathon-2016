Router.configure({
    layoutTemplate: 'layout'
});

Router.route('/', function () {
    this.render('home');
});

Router.route('/trending', function () {
    this.render('trending');
});

Router.route('/analyze', function () {
    this.render('analyze');
});
