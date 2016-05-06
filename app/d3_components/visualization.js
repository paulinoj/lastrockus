import d3 from 'd3';

export function createVisualization(el, audioID, color) {
  console.log("AUDIOID: ", audioID);
  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var audioElement = document.getElementById(audioID);
  var audioSrc = audioCtx.createMediaElementSource(audioElement);
  var analyser = audioCtx.createAnalyser();

  // Bind our analyser to the media element source.
  audioSrc.connect(analyser);
  audioSrc.connect(audioCtx.destination);

  var frequencyData = new Uint8Array(200);

  var svgHeight = '75';
  var svgWidth = '940';
  var barPadding = '1';

  function createSvg(parent, height, width) {
    return d3.select(parent).append('svg').attr('height', height).attr('width', width);
  }

  var svg = createSvg(el, svgHeight, svgWidth);

  // Create our initial D3 chart.
  svg.selectAll('rect')
     .data(frequencyData)
     .enter()
     .append('rect')
     .attr('x', function (d, i) {
        return i * (svgWidth / frequencyData.length);
     })
     .attr('width', svgWidth / frequencyData.length - barPadding);

  function renderChart() {
     console.log(color);
     requestAnimationFrame(renderChart);

     // Copy frequency data to frequencyData array.
     analyser.getByteFrequencyData(frequencyData);

     // Update d3 chart with new data.
     svg.selectAll('rect')
        .data(frequencyData)
        .attr('y', function(d) {
           return (svgHeight - d/2);
        })
        .attr('height', function(d) {
           return d/2;
        })
        .attr('fill', function(d) {
           return color;
        })
        .attr('opacity', 0.3);
  }

  // Run the loop
  renderChart();
};