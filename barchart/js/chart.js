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
  .text('Species');

// y label
g.append('text')
  .attr('class', 'y axis-label')
  .attr('x', -(height / 2))
  .attr('y', -60)
  .attr('font-size', '20px')
  .attr('text-anchor', 'middle')
  .attr('transform', 'rotate(-90)')
  .text('SepalLengthCm');

// color scale
const color = d3.scaleOrdinal(d3['schemeCategory10']);

// CHART ///////////////////////////////////////////////////////////////////////

d3.csv('data/iris.csv').then(data => {
  // convert heights to numeric
  data.forEach(d => {
    d.SepalLengthCm = +d.SepalLengthCm;
  });

  // log data
  console.log(data);

  // create x scale
  const x = d3
    .scaleBand()
    .domain(data.map(d => d.Species))
    .range([0, width])
    .paddingInner(0.3)
    .paddingOuter(0.3);

  // create y scale
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.SepalLengthCm)])
    .range([height, 0]);

  // create x axis
  const xAxisCall = d3.axisBottom(x);

  // apply x axis to group
  g.append('g')
    .attr('class', 'x axis')
    .attr('transform', `translate(0,${height})`)
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
    .tickFormat(d => d + ' cm');

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
    .attr('y', d => y(d.SepalLengthCm))
    .attr('x', d => x(d.Species))
    .attr('width', x.bandwidth)
    .attr('height', d => height - y(d.SepalLengthCm))
    .attr('fill', d => color(d.Species));
});
