(function(global) {


    var SoaRecord = Backbone.Model.extend({
        parse: function(r) {
            return {'lat': r['location']['latitude'],
                    'lon': r['location']['longitude'],
                    'species': r['data']['species']}
        }
    });

    var MapView = Backbone.View.extend({
        initialize: function(options) {
            this.uimap = options.uimap;
        },
        render: function() {
            this.uimap.addPoints(this.collection);
            return this;
        }
    });

    var IndexView = Backbone.View.extend({
        template: _.template($('#index-view').html()),
        render: function() {

            var self = this;

            this.$el.html('');
            
            self.$el.append(self.template({d: this.collection.models[0].attributes}));

            return this;
        }
    });

    var soa = new (Backbone.Collection.extend({
        url: 'data.json',
        model: SoaRecord,
        _views: [],
        addView: function(v) {
            return this._views.push(v);
        },
        updateUi: function() {
            _.each(this._views, function(v) {
                v.render();
            });

            return this;
        },
        run: function() {
            var self = this;

            this.fetch({success: function() {
                self.updateUi();
            }});

            return this;
        }

    }))().run();

    var indexView = new IndexView({collection: soa, el: $('#map-side')});
    var mapView = new MapView({uimap: global.svgmap, collection: soa});

    soa.addView(mapView);
    soa.addView(indexView);

})(this);
