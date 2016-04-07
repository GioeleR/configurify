var React = require('react');
var MenuList =  require('./MenuList');

var Container = React.createClass({
	getInitialState: function() {
		return {};
	},
	componentWillMount: function() {				//richiedo al server i vettori con i dati
		var maglieUrl = this.props.source + 'maglie.json';
		var pantaloniUrl = this.props.source + 'pantaloni.json';
		var scarpeUrl = this.props.source + 'scarpe.json';
		this.serverRequestMaglie = $.get(maglieUrl, function (result) {
			this.setState({maglie: result.maglie});
		}.bind(this));
		this.serverRequestPantaloni = $.get(pantaloniUrl, function (result) {
			this.setState({pantaloni: result.pantaloni});
		}.bind(this));
		this.serverRequestScarpe = $.get(scarpeUrl, function (result) {
			this.setState({scarpe: result.scarpe});
		}.bind(this));
	},
	componentWillUnmount: function() {
		this.serverRequestMaglie.abort();
		this.serverRequestPantaloni.abort();
		this.serverRequestScarpe.abort();
	},
	render: function(){
		return (
				<MenuList maglie={this.state.maglie} pantaloni={this.state.pantaloni} scarpe={this.state.scarpe}/>
		);
	}
});

module.exports = Container;