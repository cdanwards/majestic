(function() {

  //
  //Models & Collections
  //

  var MenuItemModel = Backbone.Model.extend({
    idAttribute: 'objectId',
  });

  var OrderItemModel = Backbone.Model.extend({
    idAttribute: 'objectId',
  });


  var MenuItemsCollection = Backbone.Collection.extend({
    model: MenuItemModel,

    url: "https://api.parse.com/1/classes/MenuItems",

    parse: function(response){
      return response.results;
    }

  });

  var CategoryCollection = Backbone.Collection.extend({
    model: MenuItemModel
  });

  var OrderItemsCollection = Backbone.Collection.extend({
    model: OrderItemModel,

    url: "https://api.parse.com/1/classes/OrderItems",
    }


  });


  //
  //Views / (Presentation/Interaction)
  //

  var CategoryView = Backbone.View.extend({


  });

  var MenuItemView = Backbone.View.extend({
    tagName: 'li',
    ClassName: 'item',
    template: _.template( $('#item-detail-template'). text() ),

  });

  var MenuCategoryDetailView = Backbone.View.extend({


  });

  var OrderListView = Backbone.View.extend({


  });


  var AppRouter = new Router.Backbone.extend({
    routes: {
      "": "index",
      'category/:category' : 'category',
    },

    initialize: function(){
      this.MenuItems = new MenuItemsCollection
    },

    index: function(){

      var orderTemplate = _.template( $('#order-template').text() );
      $('.right-container').html(orderTemplate);


    },

    category: function(cat){
      var self = this;
      this.items.fetch().done(function (){
        var selectedFood = self.items.where({itemCategory: category});
        var selectedCollection = new CategoryCollection(selectedFood);
        var menuListView = new MenuItemView({collection: selectedCollection});
        menuListView.render();
      });
    }

  });

  //
  // Config
  //

  $.ajaxSetup({
    headers: {
      "X-Parse-Application-Id": "bilB9PM6xSeHLMj4bZZABpY8toyfYxHt9lCcVv0g",
      "X-Parse-REST-API-Key": "WxKgWbDhoBpm8UE3lFUGiW1K3OIIpTr7oIC7eAU0"
    }
  });

  //
  // Glue Code
  //

  $(document).ready(function(){
    window.total = 0;
    window.router = new AppRouter();
    Backbone.history.start();
  });

}());

})();
