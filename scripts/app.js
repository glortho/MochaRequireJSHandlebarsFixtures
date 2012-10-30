define(['../components/jquery/jquery'], function() { 
    var App = function() {
        $(this.setHeader);
    };

    App.prototype.setHeader = function() {
        $('#header').html('Dynamic Header');
    };

    return App;
});
