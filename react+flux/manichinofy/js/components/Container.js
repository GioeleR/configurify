var React = require('react');
var MenuList =  require('./MenuList');
var Store = require('../Store');

var Container = React.createClass({
	getInitialState: function() {
        return {};
	},
    render: function(){
		return (
				<MenuList />
		);
	}
});

module.exports = Container;