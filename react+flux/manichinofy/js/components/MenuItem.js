var React = require('react');
var Store = require('../Store');
var Actions = require('../Actions');

var MenuItem = React.createClass({			//dropdown menu per 'maglie' 'pantaloni' e 'scarpe', mostra i capi disponibili per ogni sezione
	getInitialState: function(){
        var data = Store.getData();
        if (this.props.parte == "Maglie")
            return {vestiario: data.maglie};
        else if (this.props.parte == "Pantaloni")
                return {vestiario: data.pantaloni};
            else (this.props.parte == "Scarpe")
                return {vestiario: data.scarpe};
	},
    /*listener: function() {
		var data = Store.getData();
        if (this.props.parte == "Maglie")
            this.setState({vestiario: data.maglie});
            else if (this.props.parte == "Pantaloni")
                this.setState({vestiario: data.pantaloni});
                else (this.props.parte == "Scarpe")
                    this.setState({vestiario: data.scarpe});
    },
    componentDidMount: function() {
        Store.addChangeListener(this.listener);
    },
    componentWillUnmount: function() {
        Store.removeChangeListener(this.listener);
    },*/
	handleClick: function(capo){			//gestisce l'evento click sui capi del menu
		if (this.props.parte== "Maglie")
            Actions.setMaglia(capo);
        if (this.props.parte == "Pantaloni")
            Actions.setPantalone(capo);
        if (this.props.parte == "Scarpe")
            Actions.setScarpa(capo);
	},
	render: function(){
		var that = this;
		if (this.state.vestiario!=undefined)
			var elenco = this.state.vestiario.map(function(capo, i){
				return(
					<li key={i} ><a href="#" onClick={that.handleClick.bind(that, capo.img)}>{capo.desc}</a></li>
				);
			});
		return (
			<li className="dropdown">
				<a className="dropdown-toggle" data-toggle="dropdown" href="#">{this.props.parte}
				<span className="caret"></span></a>
				<ul className="dropdown-menu">
					{elenco}
				</ul>
			</li>
		);
	}
});

module.exports = MenuItem;