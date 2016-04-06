var React = require('react');
var MenuItem = require('./MenuItem');
var RightSection = require('./RightSection');
var ImageResult = require('./ImageResult');
var Store = require('../Store');

var MenuList = React.createClass({
	getInitialState: function(){
        var current = Store.getCurrent();
		return {showOcchiali: current.occhiali};
	},
    listener: function() {
        var current = Store.getCurrent();
		this.setState({showOcchiali: current.occhiali});
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
		return (<div>
			<nav className="navbar navbar-inverse navbar-fixed-top">
				<div className="container-fluid">
					<div className="navbar-header">
						<a className="navbar-brand" href="#">Manichinofy</a>
					</div>
					<ul className="nav navbar-nav">
						<li className="active"><a href="">Reset</a></li>
						<MenuItem parte="Maglie" />
						<MenuItem parte="Pantaloni" />
						<MenuItem parte="Scarpe" />
						<li className="dropdown">
							<a className="dropdown-toggle" data-toggle="dropdown" href="#">Occhiali
							<span className="caret"></span></a>
							<ul className="dropdown-menu">
								<li><input type="checkbox" value={this.state.showOcchiali} onChange={this.handleChange}/> Mostra Occhiali</li>
							</ul>
						</li>
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