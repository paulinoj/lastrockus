import d3 from 'd3';

export function logoDrop(el) {

  var svg_width = parseInt(d3.select("body").style("width"));
  let svg_height = 600;

  // initialize the svg canvas
  var svg = d3.select(el).insert("svg",":first-child")
      .attr("width", svg_width)
      .attr("height", svg_height)
      .append("g")

  // the message to animate
  const msg = "Rockus";

  let fontsize = Math.min(150, svg_width/1200 * 150);
  fontsize = fontsize + "px";

  let ty = svg.append("text")
      .text(msg)
      .style("font-size", fontsize)
      .style("font-style", "italic")
      .style("text-anchor", "end");

  const text_element = svg.select("text");
  const bbox = text_element.node().getBBox();
  const text_width = bbox.width;
  const text_height = bbox.height;

  let translationX1 = (svg_width/2 - text_width/2);
  let translationX2 = (svg_width/2 + text_width/2);
  let translationY1 = svg_height - 20 - text_height/2;
  let translationY2 = svg_height - 20;

  let translation0 = `translate(${translationX1}, -125) rotate(180)`;
  let translation1 = `translate(${translationX1}, ${translationY1}) rotate(180)`;
  let translation2 = `translate(${translationX1}, ${translationY2}) rotate(0)`;
  let translation3 = `translate(${translationX2}, ${translationY2}) rotate(0)`;

  ty.attr("transform", translation0)
  .transition()
  .attr("transform", translation1)
  .delay(1000)
  .duration(500)
  .ease("cubic")
  .transition()
    .duration(1000)
    .ease("bounce")
    .style('fill', 'darkOrange')
    .attr("transform", translation2)
    .transition()
    .duration(2000)
    .ease("cubic")
    .attr("transform", translation3)    

  function resize() {
    /* Find the new window dimensions */
    let svg = d3.select("svg");
    var svg_width = parseInt(d3.select("body").style("width"));
    svg.attr("width", svg_width);
    console.log(svg.attr("width"));
    let translationX = (svg_width/2 + text_width/2);
    let translation = "translate(" + translationX + ", " + translationY2 + ") rotate(0)";
    ty.attr("transform", translation);
  }
     
  d3.select(window).on('resize', resize);

};
