define(['Backbone', 'jquery', 'underscore'], 
    function(Backbone, $, _) {
        return Backbone.View.extend({
          events: {
            'submit': 'onSubmit'
          },
          
          initialize: function() {
            this.listenTo(this.collection, 'edit', this.onEdit);
            this.listenTo(this.collection, 'destroy', this.onDestroy);
            this.button = this.$el.find('input[type=submit]');
            this.render();
          },
          
          onDestroy: function(model) {
            if (model == this.model) {
              this.model = null;
              this.render();
            }
          },
          
          onEdit: function(model) {
            this.model = model;
            this.render();
          },
          
          onSubmit: function(e) {
            var tuples = _.map(this.$el.serializeArray(), function(el) {
              return [el.name, el.value];
            });
            
            var attr = _.object(tuples);
            if (this.model) {
              this.model.set(attr);
              this.model.save();
              this.model = null;
            } else {
              this.collection.add(attr);
            }
            
            e.preventDefault();
            this.render();
          },
          
          render: function() {
            if (this.model) {
              _.each(this.model.attributes, function(value, key) {
                var input = this.$el.find('[name="' + key + '"]');
                if (input.attr('type') == 'radio') {
                  input.filter('[value="' + value + '"]').attr('checked', 'checked');
                } else { 
                  input.val(value);
                }
              }, this);

              this.button.val(this.button.data('edit-value'));
            } else {
              this.button.val(this.button.data('add-value'));
              this.el.reset();
              this.$el.find('[type="radio"]').removeAttr('checked');
            }
          }
        });
    });