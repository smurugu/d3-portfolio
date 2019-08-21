// select chart area and append svg
const svg = d3.selectAll('#chart-area').append('svg');

// set dimensions
svg.attr('height', 400).attr('width', 400);

// create a circle
const circle = svg
  .append('circle')
  .attr('cx', 200)
  .attr('cy', 200)
  .attr('r', 100)
  .attr('fill', 'blue');
