var React = require('react');
var Store = require('../Store');
var Actions = require('../Actions');

var RightSection = React.createClass({					//parte destra del menu (interazione col server)
	getInitialState: function() {
		return {currentConfig: Store.getCurrent(), configs: Store.getConfigs()};
	},
    listener: function(){
        this.setState({currentConfig: Store.getCurrent(), configs: Store.getConfigs()});
    },
    componentDidMount: function() {
        Store.addChangeListener(this.listener);
    },
    componentWillUnmount: function() {
        Store.removeChangeListener(this.listener);
    },
	handleGet: function() {
        Actions.downloadConfig();
	},
	handlePut: function() {
		if (this.state.currentConfig.maglia!='' && this.state.currentConfig.pantalone!='' && this.state.currentConfig.scarpa!=''){
            Store.uploadConfig();
		}
		else alert("Configurazione non valida");
	},
	next: function(){
        Actions.nextConfig();
	},
	handleDelete: function() {
        Actions.deleteConfig();
	},
	render: function() {
		var delClasses= "active ";
		var nextClasses= "active ";
		if (this.state.configs.length != 0){
			if (this.state.configs.length < 1)
				delClasses += "hidden";
			else if (this.state.configs.length < 2)
					nextClasses += "hidden";
		}
		else {
			nextClasses += "hidden";
			delClasses += "hidden";
		}
		return(
			<ul className="nav navbar-nav navbar-right">
				<li className="active"><a href="#" onClick={this.handlePut}>Put on Server</a></li>
				<li className="active"><a href="#" onClick={this.handleGet}>Scarica configurazioni dal server</a></li>
				<li className={nextClasses}><a href="#" onClick={this.next}>Scorri Configurazioni</a></li>
				<li className={delClasses}><a href="#" onClick={this.handleDelete}>Cancella tutto dal server</a></li>
			</ul>
		);
	}
});

module.exports = RightSection;