var React = require('react');

var Container = require('./components/Container');

React.render(
  <Container source="http://localhost:3000/react/manichinofy/" />,
  document.getElementById('app')
);