import d3 from 'd3';
import styles from '../css/welcome.css';
import soundcloudLogo from '../soundcloud_logo.png';

export function logoDrop(el) {

  let svgWidth, svgHeight, buttonGroupTop;
  let logoFontSize = 106;
  let blurbFontSize = 30;
  let textColor = "#FF83E2";

  let button_div = d3.select(el)
      .append("div")
      .attr("class", styles.button_group);

  // initialize the svg canvas
  var svg = d3.select(el).insert("svg",":first-child")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  let textGroup = svg.append("g");

  // the message to animate
  const logo = "Rockus";

  let logoElement = textGroup.append("text")
    .text(logo)
    .attr("class", styles.logo)
    .style("font-size", logoFontSize)
    .style('fill', textColor)
    .style("text-anchor", "middle");

  // Temporarily set text of blurbHeadElement to entire blurb in order
  // to get width of entire blurb.  Second sentence is removed afterwards. 

  let blurbHeadElement = textGroup.append("text")
    .text("ID 5 songs. Played at the same time.")
    .style("font-size", blurbFontSize)
    .style('fill', textColor)
    .style("text-anchor", "start")
    .style("opacity", 0);

  const fullBlurbWidth = textWidth(blurbHeadElement) + 10;

  blurbHeadElement.text("ID 5 songs.")

  const blurbHeadWidth = textWidth(blurbHeadElement);

  let blurbEndElement = textGroup.append("text")
    .text("Played at the same time.")
    .style("font-size", blurbFontSize)
    .style('fill', textColor)
    .style("text-anchor", "end")
    .style("font-style", "italic")
    .style("opacity", 0);

  const logoStart = -1200;
  const logoBottom = 20;
  const blurbBottom = 80;

  resize();

  blurbHeadElement.attr("transform", translation((fullBlurbWidth - blurbHeadWidth)/2, blurbBottom, 0))
    .transition()
    .delay(1000)
    .duration(3000)
    .style("opacity", 1)
    .transition()
    .duration(3000)
    .transition()
    .duration(2000)
    .attr("transform", translation(0, blurbBottom, 0));

  blurbEndElement.attr("transform", translation(fullBlurbWidth, blurbBottom, 0))
    .transition()
    .delay(9000)
    .duration(2000)
    .style("opacity", 1);

  logoElement.attr("transform", translation(fullBlurbWidth/2, logoStart, 0))
    .transition()
    .delay(16000)
    .duration(1000)
    .ease("bounce")
    .attr("transform", translation(fullBlurbWidth/2, logoBottom, 0))
    .transition()
    .duration(3000)
    .each("end", function() {
      musicStart();
      addButtons();
    });

  d3.select(window).on('resize', resize);

  function textWidth(textElement) {
    return +textElement.node().getBBox().width;
  }

  function translation(x, y, rotation) {
    return `translate(${x}, ${y}) rotate(${rotation})`
  }

  function addButtons() {
    let login_button_classes = `btn btn-info btn-lg ${styles.login_button}`;
    let signup_button_classes = `btn btn-info btn-lg ${styles.signup_button}`;

    let soundcloudImg = button_div
      .append("div")
      .attr("class", "text-center")
      .append("img")
      .attr("src", soundcloudLogo)
      .attr("width", 125)
      .style("opacity", 0);
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
      soundcloudImg.transition().duration(4000).style("opacity", 1);
      login_button.transition().duration(4000).style("opacity", 1);
      signup_button.transition().duration(4000).style("opacity", 1);
  }

  // MUSICAL NOTES START ****

  function musicStart() {
    var margin = {top: 0, right: 0, bottom: 0, left: 0};
     
    // var rect = [50,50, svgWidth - 50, svgHeight - 50];
    var rect = [50,50, 1900, 1900];

    var n =500,
      m = 40,
      padding = 6,
      maxSpeed = 3,
      radius = d3.scale.sqrt().range([0, 10]),
      color = d3.scale.category10().domain(d3.range(m));

    var nodes = [];
     
    for (var i in d3.range(n)) {
      nodes.push({radius: 20,
        color: color(Math.floor(Math.random() * m)),
        // color: "white",
        // x: rect[0] + (Math.random() * (rect[2] - rect[0])),
        // y:rect[1] + (Math.random() * (rect[3] - rect[1])),
        x: rect[0] + Math.floor(svgWidth/2),
        y: rect[1] + Math.floor(svgHeight/2),

        speedX: (Math.random() - 0.5) * 2 *maxSpeed,
        speedY: (Math.random() - 0.5) * 2 *maxSpeed});
    }
      
    var force = d3.layout.force()
      .nodes(nodes)
      // .size([svgWidth, svgHeight])
      .size([1200, 1200])
      .gravity(0)
      .charge(0)
      .on("tick", tick)
      .start();
     
    var notesGroup = svg
      .insert("g",":nth-child(1)");
     
    var notes = ["\u2669", "\u266A", "\u266B", "\u266C", "\u266D", "\u266E"];

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
      .style("opacity", 0.7)
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

  function resize() {
    /* Find the new window dimensions */
    let lastSvgWidth = svgWidth;
    let lastSvgHeight = svgHeight;

    svgWidth = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

    svgHeight = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;

    buttonGroupTop = (svgHeight/2 + 35) + "px";
    button_div
      .style("top", buttonGroupTop);

    svg.attr("width", svgWidth);
    svg.attr("height", svgHeight);

    let positionAdjustmentY = (svgHeight - lastSvgHeight)/2;
    let textGroupNewPos = d3.transform(textGroup.attr("transform")).translate[1] + positionAdjustmentY;

    textGroup.attr("transform", translation((svgWidth - fullBlurbWidth)/2, (svgHeight - 300)/2, 0));
  }
};
