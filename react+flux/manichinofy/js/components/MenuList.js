var React = require('react');
var MenuItem = require('./MenuItem');
var RightSection = require('./RightSection');
var ImageResult = require('./ImageResult');
var MenuItemOcchiali = require('./MenuItemOcchiali');
var Store = require('../Store');
var Actions = require('../Actions');

var MenuList = React.createClass({
	getInitialState: function(){
        var data = Store.getData();
		return {maglie: data.maglie, pantaloni: data.pantaloni, scarpe: data.scarpe};
	},
    listener: function() {
        var data = Store.getData();
		this.setState({maglie: data.maglie, pantaloni: data.pantaloni, scarpe: data.scarpe});
    },
    componentWillMount() {
        Actions.getMaglie();
        Actions.getPantaloni();
        Actions.getScarpe();  
    },
    componentDidMount: function() {
        Store.addChangeListener(this.listener);
    },
    componentWillUnmount: function() {
        Store.removeChangeListener(this.listener);
    },
	handleChange: function(){
        Actions.toogleOcchiali();
	},
    render: function() {
		return (
			<div>
				<nav className="navbar navbar-inverse navbar-fixed-top">
					<div className="container-fluid">
						<div className="navbar-header">
							<a className="navbar-brand" href="#">Manichinofy</a>
						</div>
						<ul className="nav navbar-nav">
							<li className="active"><a href="">Reset</a></li>
							<MenuItem parte="Maglie" vestiario={this.state.maglie} />
							<MenuItem parte="Pantaloni" vestiario={this.state.pantaloni} />
							<MenuItem parte="Scarpe" vestiario={this.state.scarpe} />
                            <MenuItemOcchiali />
						</ul>
						<RightSection />
					</div>
				</nav>
				<ImageResult />
			</div>
		);
    }
});

module.exports = MenuList;