
(function(global) {
    
    var margin = {top: 10, left: 10, bottom: 10, right: 10}
    , width = parseInt(d3.select('#map').style('width'))
    , width = width - margin.left - margin.right
    , mapRatio = .5
    , height = width * mapRatio;
;

    // projection and path setup
    var projection = d3.geo.albersUsa()
        .scale(width)
        .translate([width / 2, height / 2]);

    var path = d3.geo.path()
        .projection(projection);

    // make a map
    var map = d3.select('#map').append('svg')
        .style('height', height + 'px')
        .style('width', width + 'px');

    
    d3.json('assets/maps/usa.json', function(e, us) {
        render(e, us);
    });

    // catch the resize
    d3.select(window).on('resize', resize);

    function render(err, us) {

        var land = topojson.mesh(us, us.objects.land)
        , states = topojson.feature(us, us.objects.states);

        map.append('path')
            .datum(land)
            .attr('class', 'land')
            .attr('d', path);

        var states = map.selectAll('path.state-boundary')
            .data(states.features)
        .enter().append('path')
            .attr('class', 'state-boundary')
            .attr('d', path);
    }

    function resize() {
        // adjust things when the window size changes
        width = parseInt(d3.select('#map').style('width'));
        width = width - margin.left - margin.right;
        height = width * mapRatio;

        // update projection
        projection
            .translate([width / 2, height / 2])
            .scale(width);

        // resize the map container
        map
            .style('width', width + 'px')
            .style('height', height + 'px');

        // resize the map
        map.select('.land').attr('d', path);
        map.selectAll('.state-boundary').attr('d', path);
        map.selectAll('.point')
           .attr('transform', function(d) {
               return "translate(" + projection([d.lon, d.lat]) + ")";
           });
}   
    
    global.svgmap = global.svgmap || {
        addPoints: function(collection) {
            map.selectAll('.point')
                .data(collection.toJSON())
                .enter()
                .append('circle')
                .attr('class', 'point')
                .attr('r', 2)
                .attr('transform', function(d) {
                    return "translate(" + projection([d.lon, d.lat]) + ")";
                });
        }
    }


})(this);

