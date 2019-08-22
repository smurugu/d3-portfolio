// connect to data
d3.csv('data/data.csv')
  .then(data => {
    // log the data
    console.log(data);

    // convert age to int
    data.forEach(d => {
      d.age = +d.age;
    });

    // select chart area and append svg
    const svg = d3.selectAll('#chart-area').append('svg');

    // set dimensions
    svg.attr('height', 400).attr('width', 400);

    // join circles to data
    const circles = svg.selectAll('circle').data(data);

    // enter circles
    circles
      .enter()
      .append('circle')
      .attr('cx', (d, i) => {
        return i * 50 + 25;
      })
      .attr('cy', 200)
      .attr('r', d => {
        return d.age * 2;
      })
      .attr('fill', d => {
        if (d.name == 'Tony') {
          return 'blue';
        } else {
          return 'red';
        }
      });
  })
  .catch(error => {
    console.log(error);
  });
