import d3 from 'd3';
import styles from '../css/welcome.css';
import soundcloudLogo from '../soundcloud_logo.png';

export function logoDrop(el) {

  let svgWidth = parseInt(d3.select("body").style("width"));
  let svgHeight = 1200;

  // initialize the svg canvas
  var svg = d3.select(el).insert("svg",":first-child")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  svg.append("rect")
    .attr("width", "100%")
    .attr("height", svgHeight)
    .attr("fill", "#222");

  function addButtons() {
    let buttonGroupTop = (svgHeight/2 + 130) + "px";
    let login_button_classes = `btn btn-info btn-lg ${styles.login_button}`;
    let signup_button_classes = `btn btn-info btn-lg ${styles.signup_button}`;
    let button_div = d3.select(el)
      .append("div")
      .attr("class", styles.button_group)
      .style("top", buttonGroupTop);
    let soundcloudImg = button_div
      .append("div")
      .attr("class", "text-center")
      .append("img")
      .attr("src", soundcloudLogo)
      .attr("width", 150)
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
      soundcloudImg.transition().delay(3000).duration(3000).style("opacity", 1);
      login_button.transition().delay(3000).duration(3000).style("opacity", 1);
      signup_button.transition().delay(3000).duration(3000).style("opacity", 1);
  }

  // MUSICAL NOTES START ****

  setTimeout(musicStart, 19000);

  function musicStart() {
    var margin = {top: 0, right: 0, bottom: 0, left: 0};
     
    var rect = [50,50, svgWidth - 50, svgHeight - 50];
     
    var n =500,
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
        // x: rect[0] + (Math.random() * (rect[2] - rect[0])),
        // y:rect[1] + (Math.random() * (rect[3] - rect[1])),
        x: rect[0] + Math.floor(svgWidth/2),
        y: rect[1] + Math.floor(svgHeight/2),

        speedX: (Math.random() - 0.5) * 2 *maxSpeed,
        speedY: (Math.random() - 0.5) * 2 *maxSpeed});
    }
      
    var force = d3.layout.force()
      .nodes(nodes)
      .size([svgWidth, svgHeight])
      .gravity(0)
      .charge(0)
      .on("tick", tick);

    force.start();

    // setTimeout(force.start, 10000);
     
    var notesGroup = svg
    // .attr("width", svgWidth + margin.left + margin.right)
    // .attr("height", svgHeight + margin.top + margin.bottom)
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

  function textWidth(textElement) {
    return +textElement.node().getBBox().width;
  }

  function textHeight(textElement) {
    return +textElement.node().getBBox().height;
  }

  function translation(x, y, rotation) {
    return `translate(${x}, ${y}) rotate(${rotation})`
  }

  function xCenterPosition(textWidth, anchor) {
    svgWidth = parseInt(d3.select("body").style("width"));
    svg.attr("width", svgWidth);

    if (anchor === "start") {
      return svgWidth/2 - textWidth/2;
    }
    else if (anchor === "end") {
      return svgWidth/2 + textWidth/2;
    }
    else
    {
      return svgWidth/2;
    }
  }

  let textGroup = svg.append("g");

  // the message to animate
  const logo = "Rockus";

  let fontsize = Math.min(106, svgWidth/1200 * 150);

  let logoElement = textGroup.append("text")
    .text(logo)
    .attr("class", styles.logo)
    .style("font-size", fontsize)
    .style('fill', '#FF83E2')
    .style("text-anchor", "middle");

  let blurbHeadElement = textGroup.append("text")
    .text("ID 5 songs. Played at the same time.")
    .style("font-size", "30px")
    .style('fill', '#FF83E2')
    .style("text-anchor", "start")
    .style("opacity", 0);

  const fullBlurbWidth = textWidth(blurbHeadElement) + 10;

  blurbHeadElement.text("ID 5 songs.")

  let blurbEndElement = textGroup.append("text")
    .text("Played at the same time.")
    .style("font-size", "30px")
    .style('fill', '#FF83E2')
    .style("text-anchor", "end")
    .style("font-style", "italic")
    .style("opacity", 0);

  let logoStart = -125;
  let logoBottom = svgHeight/2 - 50;
  let blurbBottom = svgHeight/2 + 10;
  let logoWidth = textWidth(logoElement);
  const blurbHeadWidth = textWidth(blurbHeadElement);

  blurbHeadElement.attr("transform", translation(xCenterPosition(blurbHeadWidth, "start"), blurbBottom, 0))
    .transition()
    .delay(1000)
    .duration(3000)
    .style("opacity", 1)
    .transition()
    .duration(3000)
    .transition()
    .duration(2000)
    .attrTween("transform", function() {
      return function(t) {
        return translation(xCenterPosition(blurbHeadWidth, "start") +
          ((xCenterPosition(fullBlurbWidth, "start") - xCenterPosition(blurbHeadWidth, "start")) * t),
          blurbBottom, 0);
      };
    });

  blurbEndElement.attr("transform", translation(xCenterPosition(fullBlurbWidth, "end"), blurbBottom, 0))
    .transition()
    .delay(9000)
    .duration(2000)
    .style("opacity", 1);

  logoElement.attr("transform", translation(xCenterPosition(logoWidth, "middle"), logoStart, 0))
    .transition()
    .delay(16000)
    .duration(1000)
    .ease("bounce")
    .attrTween("transform", function() {
      return function(t) {
        return translation(xCenterPosition(logoWidth, "middle"), logoStart + (logoBottom - logoStart) * t, 0);
      };
    })
    .each("end", addButtons);

  d3.select(window).on('resize', resize);

  function resize() {
    /* Find the new window dimensions */
    let lastSvgWidth = svgWidth;
    svgWidth = parseInt(d3.select("body").style("width"));
    svg.attr("width", svgWidth);
    let positionAdjustment = (svgWidth - lastSvgWidth)/2;

    // Get current X position of each text element and add the adjustment factor
    let logoElementX = d3.transform(logoElement.attr("transform")).translate[0] + positionAdjustment;
    let blurbHeadElementX = d3.transform(blurbHeadElement.attr("transform")).translate[0] + positionAdjustment;
    let blurbEndElementX = d3.transform(blurbEndElement.attr("transform")).translate[0] + positionAdjustment;

    // Get current Y position of each text element
    let logoElementY = d3.transform(logoElement.attr("transform")).translate[1];
    let blurbHeadElementY = d3.transform(blurbHeadElement.attr("transform")).translate[1];
    let blurbEndElementY = d3.transform(blurbEndElement.attr("transform")).translate[1];

    // Translate text elements using newly calculated X and Y positions
    logoElement.attr("transform", translation(logoElementX, logoElementY, 0));
    blurbHeadElement.attr("transform", translation(blurbHeadElementX, blurbHeadElementY, 0));
    blurbEndElement.attr("transform", translation(blurbEndElementX, blurbEndElementY, 0));
  }
};
