define(['Backbone', 'jquery', 'underscore'], 
    function(Backbone, $, _) {
        return Backbone.View.extend({
          tagName: 'tr',
          template: _.template($('#trTemplate').text()),
          
          events: { 
            'click .glyphicon-pencil': 'edit',
            'click .glyphicon-trash': 'remove'  
          },
          
          initialize: function() {
            this.listenTo(this.model, 'change', this.change);
            this.model.controller = this;
          },
          
          change: function() {
            this.render();
          },
            
          edit: function() {
            this.model.trigger('edit', this.model);
          },
            
          remove: function() {
            this.model.destroy();
          },
          
          render: function() {
            return this.$el.html(this.template(this.model.attributes));
          }
        });
    });