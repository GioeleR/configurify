var React = require('react');
var Actions = require('../Actions');

var MenuItem = React.createClass({			//dropdown menu per 'maglie' 'pantaloni' e 'scarpe', mostra i capi disponibili per ogni sezione
	getInitialState: function(){
        return {};
	},
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
		var elenco = this.props.vestiario.map(function(capo, i){
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