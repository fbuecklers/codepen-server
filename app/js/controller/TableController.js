define(['Backbone', 'jquery', 'underscore', './RowController'], 
    function(Backbone, $, _, RowController) {
        return Backbone.View.extend({
          template: _.template($('#tableTemplate').text()),
          
          events: {
              
          },
          
          initialize: function() {
            this.listenTo(this.collection, 'add', this.addRow);
            this.listenTo(this.collection, 'destroy remove', this.removeRow);
            this.render();
            
            this.collection.fetch();
            
            setInterval(function(collection) {
              collection.fetch({remove: true});
            }, 1000, this.collection);
          },
          
          addRow: function(model) {
            var ctrl = new RowController({model: model});
            var el = ctrl.render();
            this.$el.find('tbody').append(el);
            
            if (model.isNew())
              model.save();
          },
          
          removeRow: function(model) {
            model.controller.$el.remove();
          },
          
          render: function() {
            return this.$el.html(this.template({models: this.collection}));
          }
        });
    });