import d3 from 'd3';
import styles from '../css/welcome.css';


export function logoDrop(el) {

  var svg_width = parseInt(d3.select("body").style("width"));
  let svg_height = 1200;

  // initialize the svg canvas
  var svg = d3.select(el).insert("svg",":first-child")
    .attr("width", svg_width)
    .attr("height", svg_height);

  svg.append("rect")
    .attr("width", "100%")
    .attr("height", svg_height)
    .attr("fill", "#222");

  function addButtons() {

    let buttonGroupTop = (svg_height/2 + 170) + "px";

    let login_button_classes = `btn btn-info btn-lg ${styles.login_button}`;
    let signup_button_classes = `btn btn-info btn-lg ${styles.signup_button}`;
    let button_div = d3.select(el)
      .append("div")
      .attr("class", styles.button_group)
      .style("top", buttonGroupTop);
    let login_button = button_div
      .append("div")
      .attr("class", "text-center")
      .append("a")
      .attr("class", login_button_classes)
      .text("Sign In")
      .style("opacity", 0)
      .attr("href", "/signin");
    let signup_button = button_div
      .append("div")
      .attr("class", "text-center")
      .append("a")
      .attr("class", signup_button_classes)
      .text("Sign Up")
      .style("opacity", 0)
      .attr("href", "/signup");

      login_button.transition().delay(3000).duration(3000).style("opacity", 1);
      signup_button.transition().delay(3000).duration(3000).style("opacity", 1);
  }

  // MUSICAL NOTES START ****

  setTimeout(musicStart, 15000);

  function musicStart() {
    var margin = {top: 0, right: 0, bottom: 0, left: 0};
     
    var rect = [50,50, svg_width - 50, svg_height - 50];
     
    var n =1000,
      m = 40,
      padding = 6,
      maxSpeed = 3,
      radius = d3.scale.sqrt().range([0, 10]),
      color = d3.scale.category10().domain(d3.range(m));

    var nodes = [];
     
    for (var i in d3.range(n)) {
      nodes.push({radius: 20,
        // color: color(Math.floor(Math.random() * m)),
        color: "white",
        x: rect[0] + (Math.random() * (rect[2] - rect[0])),
        y:rect[1] + (Math.random() * (rect[3] - rect[1])),
        speedX: (Math.random() - 0.5) * 2 *maxSpeed,
        speedY: (Math.random() - 0.5) * 2 *maxSpeed});
    }
      
    var force = d3.layout.force()
      .nodes(nodes)
      .size([svg_width, svg_height])
      .gravity(0)
      .charge(0)
      .on("tick", tick);

    force.start();

    // setTimeout(force.start, 10000);
     
    var notesGroup = svg
    // .attr("width", svg_width + margin.left + margin.right)
    // .attr("height", svg_height + margin.top + margin.bottom)
      .insert("g",":nth-child(2)");
    // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
     
    var notes = ["\u2669", "\u266A", "\u266B", "\u266C", "\u266D", "\u266E"];

    // var fontSizes = [30, 40, 50];

    var fontSizes = [30, 40, 50];

    var circle = notesGroup.selectAll("text")
      .data(nodes)
      .enter().append("text")
      .text(function() { var i = Math.floor(Math.random() * notes.length); return notes[i]})
      .style("font-size",function() { var i = Math.floor(Math.random() * fontSizes.length); return fontSizes[i]})
      .attr("r", function(d) { return d.radius; })
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; })
      .style("fill", function(d) { return d.color; })
      .style("opacity", 0.3)
      .call(force.drag);
     
    var flag = false;

    function tick(e) {
      force.alpha(0.2);
      circle
        .each(gravity(e.alpha))
        .each(collide(.5))
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; });
    }
       
    // Move nodes toward cluster focus.
    function gravity(alpha) {
      return function(d) {
        if ((d.x - d.radius - 2) < rect[0]) d.speedX = Math.abs(d.speedX);
        if ((d.x + d.radius + 2) > rect[2]) d.speedX = -1 * Math.abs(d.speedX);
        if ((d.y - d.radius - 2) < rect[1]) d.speedY = -1 * Math.abs(d.speedY);
        if ((d.y + d.radius + 2) > rect[3]) d.speedY = Math.abs(d.speedY);
     
        d.x = d.x + (d.speedX * alpha);
        d.y = d.y + (-1 * d.speedY * alpha);
     
      };
    }
     
    // Resolve collisions between nodes.
    function collide(alpha) {
      var quadtree = d3.geom.quadtree(nodes);
      return function(d) {
        var r = d.radius + radius.domain()[1] + padding,
          nx1 = d.x - r,
          nx2 = d.x + r,
          ny1 = d.y - r,
          ny2 = d.y + r;
        quadtree.visit(function(quad, x1, y1, x2, y2) {
          if (quad.point && (quad.point !== d)) {
            var x = d.x - quad.point.x,
              y = d.y - quad.point.y,
              l = Math.sqrt(x * x + y * y),
              r = d.radius + quad.point.radius + (d.color !== quad.point.color) * padding;
            if (l < r) {
              l = (l - r) / l * alpha;
              d.x -= x *= l;
              d.y -= y *= l;
              quad.point.x += x;
              quad.point.y += y;
            }
          }
          return x1 > nx2
            || x2 < nx1
            || y1 > ny2
            || y2 < ny1;
        });
      };
    }
  };
  // *** MUSICAL NOTES END


  var textGroup = svg.append("g");

  // the message to animate
  const logo = "Rockus";

  let fontsize = Math.min(150, svg_width/1200 * 150);

  let logoElement = textGroup.append("text")
    .text(logo)
    .style("font-size", fontsize)
    .style("font-style", "italic")
    .style('fill', '#FF83E2')
    .style("text-anchor", "end");

  const text_element = textGroup.select("text");
  const text_width = textWidth(text_element);
  const text_height = textHeight(text_element);

  let logoBottom = svg_height/2 - 50;
  let textGroupBottom = svg_height/2 + 10;

  let blurbElement = textGroup.append("text")
    .text("Identify 5 songs. Played at the same time.")
    .style("font-size", "30px")
    .style('fill', '#FF83E2')
    .style("text-anchor", "start")
    .style("opacity", 0);

  let text_element2 = textGroup.select("text:nth-child(2)");

  function textWidth(textElement) {
    return textElement.node().getBBox().width;
  }

  function textHeight(textElement) {
    return textElement.node().getBBox().height;
  }

  const text_width3 = textWidth(text_element2) + 10;

  blurbElement.text("Identify 5 songs.")

  const text_width2 = textWidth(text_element2);
  const text_height2 = textHeight(text_element2);

  function translation(x, y, rotation) {
    return `translate(${x}, ${y}) rotate(${rotation})`
  }

  function xCenterPosition(textWidth, anchor) {
    if (anchor === "start") {
      return svg_width/2 - textWidth/2;
    }
    else if (anchor === "end") {
      return svg_width/2 + textWidth/2;
    }
    else
    {
      return svg_width/2;
    }
  }

  // blurbElement.transition().delay(2000).attr("transform", translation4);      
  blurbElement.attr("transform", translation(xCenterPosition(text_width2, "start"), textGroupBottom, 0))
    .transition()
    .delay(1000)
    .duration(1000)
    .style("opacity", 1)
    .transition()
    .duration(1000)
    .attr("transform", translation(xCenterPosition(text_width3, "start"), textGroupBottom, 0));

  let blurbElementEnding = textGroup.append("text")
    .text("Played at the same time.")
    .style("font-size", "30px")
    .style('fill', '#FF83E2')      
    .style("text-anchor", "end")
    .style("font-style", "italic")
    .style("opacity", 0);

  blurbElementEnding.attr("transform", translation(xCenterPosition(text_width3, "end"), textGroupBottom, 0))
    .transition()
    .delay(6000)
    .duration(1000)
    .style("opacity", 1);

  // logoElement.attr("transform", translation(xCenterPosition(text_width, "start"), -125, 180))
  //   .transition()
  //   .attr("transform", translation(xCenterPosition(text_width, "start"), logoBottom - text_height/2, 180))
  //   .delay(11000)
  //   .duration(500)
  //   .ease("cubic")
  //   .transition()
  //   .duration(1000)
  //   .ease("bounce")
  //   .attr("transform", translation(xCenterPosition(text_width, "start"), logoBottom, 0))
  //   .transition()
  //   .duration(2000)
  //   .ease("cubic")
  //   .attr("transform", translation(xCenterPosition(text_width, "end"), logoBottom, 0))
  //   .each("end", addButtons);

  logoElement.attr("transform", translation(xCenterPosition(text_width, "end"), -125, 0))
    .transition()
    .delay(11000)
    .duration(1000)
    .ease("bounce")
    .attr("transform", translation(xCenterPosition(text_width, "end"), logoBottom, 0))
    .each("end", addButtons);

  function resize() {
    /* Find the new window dimensions */
    // let svg = d3.select("svg");
    svg_width = parseInt(d3.select("body").style("width"));
    svg.attr("width", svg_width);
    logoElement.attr("transform", translation(xCenterPosition(text_width, "end"), logoBottom, 0));
    blurbElement.attr("transform", translation(xCenterPosition(text_width3, "start"), textGroupBottom, 0));
    blurbElementEnding.attr("transform", translation(xCenterPosition(text_width3, "end"), textGroupBottom, 0));

  }
     
  d3.select(window).on('resize', resize);

};
