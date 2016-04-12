var React = require('react');
var Actions = require("../Actions");
var Store = require("../Store");

var MenuItemOcchiali = React.createClass({
    getInitialState: function(){
        var current = Store.getCurrent();
        return {occhiali: current.occhiali};
    },
    listener: function() {
	   var current = Store.getCurrent();
       this.setState({occhiali: current.occhiali});
    },
    componentDidMount: function() {
        Store.addChangeListener(this.listener);
    },
    componentWillUnmount: function() {
        Store.removeChangeListener(this.listener);
    },
    handleChange: function() {
        Actions.toogleOcchiali();
    },
    render: function() {
        return (
            <li className="dropdown">
				<a className="dropdown-toggle" data-toggle="dropdown" href="#">Occhiali
                    <span className="caret"></span></a>
				    <ul className="dropdown-menu">
					    <li><input type="checkbox" value={this.state.occhiali} onChange={this.handleChange}/> Mostra Occhiali</li>
				    </ul>
            </li>
        );
    }
});

module.exports = MenuItemOcchiali;