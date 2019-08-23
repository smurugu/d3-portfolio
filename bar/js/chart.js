// SETUP ///////////////////////////////////////////////////////////////////////

// set margins
const margin = { left: 100, right: 10, top: 10, bottom: 150 };

// set chart width and height
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

// create the chart group
const g = d3
  .select('#chart-area')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`);

// x label
g.append('text')
  .attr('class', 'x axis-label')
  .attr('x', width / 2)
  .attr('y', height + 140)
  .attr('font-size', '20px')
  .attr('text-anchor', 'middle')
  .text("The word's tallest buildings");

// y label
g.append('text')
  .attr('class', 'y axis-label')
  .attr('x', -(height / 2))
  .attr('y', -60)
  .attr('font-size', '20px')
  .attr('text-anchor', 'middle')
  .attr('transform', 'rotate(-90)')
  .text('Height (m)');

// CHART ///////////////////////////////////////////////////////////////////////

d3.json('data/data.json').then(data => {
  console.log(data);

  // convert heights to numeric
  data.forEach(d => {
    d.height = +d.height;
  });

  // create x scale
  const x = d3
    .scaleBand()
    .domain(data.map(d => d.name))
    .range([0, width])
    .paddingInner(0.3)
    .paddingOuter(0.3);

  // create y scale
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.height)])
    .range([height, 0]);

  // create x axis
  const xAxisCall = d3.axisBottom(x);

  // apply x axis to group
  g.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0, ' + height + ')')
    .call(xAxisCall)
    .selectAll('text')
    .attr('y', '10')
    .attr('x', '-5')
    .attr('text-anchor', 'end')
    .attr('transform', 'rotate(-40)');

  // create y axis
  const yAxisCall = d3
    .axisLeft(y)
    .ticks(3)
    .tickFormat(d => d + 'm');

  // append y axis to group
  g.append('g')
    .attr('class', 'y-axis')
    .call(yAxisCall);

  // apply data to rects
  const rects = g.selectAll('rect').data(data);

  // enter rects
  rects
    .enter()
    .append('rect')
    .attr('y', d => y(d.height))
    .attr('x', d => x(d.name))
    .attr('width', x.bandwidth)
    .attr('height', d => height - y(d.height))
    .attr('fill', 'grey');
});
