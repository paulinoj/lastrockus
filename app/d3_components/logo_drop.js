import d3 from 'd3';

export function logoDrop(el) {

  // initialize the svg canvas
  var svg = d3.select(el).append("svg")
      .attr("width", 960)
      .attr("height", 500)
      .append("g")

  // the message to animate
  var msg = "Rockus";

  var ty = svg.append("text")
      .text(msg);
      ty.style("font-size", "100px")
      .style("text-anchor", "end")
      .attr("transform", "translate(400,-100) rotate(180)");

  ty.transition()
  .attr("transform", "translate(400, 400) rotate(180)")
  .delay(500)
  .duration(500)
  .ease("cubic")
  .transition()
    .duration(1000)
    .ease("bounce")
    .style('fill', 'darkOrange')
    .attr("transform", "translate(400, 400) rotate(0)")
    .transition()
    .duration(2000)
    .ease("cubic")
    .attr("transform", "translate(700, 400) rotate(0)")    

};