
(function(global) {
    var width = 960,
        height = 500;

    var projection = d3.geo.albersUsa()
        .scale(1000)
        .translate([width / 2, height / 2]);

    var path = d3.geo.path()
        .projection(projection);

    var svg = d3.select("#map").append("svg")
        .attr("width", width)
        .attr("height", height);

    d3.json("assets/maps/usa.json", function(error, us) {
        svg.insert("path", ".graticule")
            .datum(topojson.feature(us, us.objects.land))
            .attr("class", "land")
            .attr("d", path);

        svg.insert("path", ".graticule")
            .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
            .attr("class", "state-boundary")
            .attr("d", path);
    });

    global.svgmap = global.svgmap || {
        addPoints: function(collection) {
            svg.selectAll('.point')
                .data(collection.toJSON())
                .enter()
                .append('circle')
                .attr('class', 'point')
                .attr('r', 2)
                .attr('transform', function(d) {
                    return "translate(" + projection([d.lon, d.lat]) + ")";
                });
        }

    };

})(this);

