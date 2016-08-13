import d3 from 'd3';
import detect from '../detect.min.js'

var user = detect.parse(navigator.userAgent);
var svgHeight = '75';
var svgWidth = '940';

function createSvg(parent, height, width) {
  return d3.select(parent).append('svg').attr('height', height).attr('width', width);
}

if (user.browser.family === "Safari") {
  var createVisualization = function(el, audioID, color) {
    let timer_ret_val = false;

    var canvas = d3.select(el).append("canvas")
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    var ctx = canvas.node().getContext('2d'),
        height = svgHeight,
        width = svgWidth;

    canvas.height = height;
    canvas.width = width;

    var heightFactor = Math.random();
    var particle = {
      amp: (height / 2) * heightFactor,
      cycle: Math.random(),
      hue: Math.floor(361 * Math.random()),
      r: 2,
      x: 0,
      y: height / 2,
      v: 2.5 * Math.random() + 0.5
    };

    function draw() {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2, true);
      ctx.fillStyle = 'hsl(' + particle.hue + ', 60%, 70%)';
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'hsl(' + particle.hue + ', 80%, 80%)';
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    function loop() {
      var svgHeight = window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight;
      var lastHeight = height;

      if (svgHeight <= 1024) {
        height = '55';
      }
      else
      {
        height = '75';
      }

      canvas.height = height;

      particle.amp = (height / 2) * heightFactor;

      if (lastHeight !== height) {
        ctx.clearRect(0, 0, width, lastHeight);
      }

      ctx.fillStyle = 'rgba(25, 45, 65, 0.4)';

      ctx.fillRect(0, 0, width, height);

      particle.cycle += 0.02;
      particle.y = Math.sin(particle.cycle * Math.PI) * particle.amp + height / 2;

      if (particle.x + particle.r > width) {
        particle.x = 0 - particle.r;
      } else {
        particle.x += particle.v;
      }

      draw();

      return timer_ret_val;
    }

    d3.timer(loop);

    return function() {
      timer_ret_val = true;
    }
  }

} else {
  var createVisualization = function(el, audioID, color) {
  console.log(
    user.browser.family,
    user.browser.version,
    user.os.name
  );
    var svg = createSvg(el, svgHeight, svgWidth);

    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var audioElement = document.getElementById(audioID);
    var audioSrc = audioCtx.createMediaElementSource(audioElement);
    var analyser = audioCtx.createAnalyser();
    let timer_ret_val = false;

    // Bind our analyser to the media element source.
    audioSrc.connect(analyser);
    audioSrc.connect(audioCtx.destination);

    var frequencyData = new Uint8Array(200);

    var barPadding = '1';



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
      // console.log(color);

      // Copy frequency data to frequencyData array.
      if (analyser) {
        analyser.getByteFrequencyData(frequencyData);
      }

      // Update d3 chart with new data.
      if (svg) {
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
      return timer_ret_val;
    }

    // Run the loop
    // renderChart();
    d3.timer(renderChart);

    return function() {
      timer_ret_val = true;
      frequencyData = null;
      audioSrc = null;
      analyser = null;

      // This is the line of code that seems to fix problem with subsequent ajax requests
      // Be sure you pause audioElement before setting it to null
      // Got idea from this link:  
      // http://stackoverflow.com/questions/19294258/forcing-mediaelement-to-release-stream-after-playback
      audioElement.pause();

      audioElement = null;
      audioCtx.close();
      audioCtx = null;
      svg=null;
    }

  };


}

export { createVisualization };


