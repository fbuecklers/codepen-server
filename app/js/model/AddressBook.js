define(['Backbone', './Address'], 
    function(Backbone, Address) {
        return Backbone.Collection.extend({
          model: Address,
          url: 'http://localhost:8080/book'
        });
    });    