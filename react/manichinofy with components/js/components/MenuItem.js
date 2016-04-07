var React = require('react');

var MenuItem = React.createClass({			//dropdown menu per 'maglie' 'pantaloni' e 'scarpe', mostra i capi disponibili per ogni sezione
	getInitialState: function(){
		return {};
	},
	handleClick: function(capo){			//gestisce l'evento click sui capi del menu
		this.props.setCapo(capo);
	},
	componentWillReceiveProps: function(nextProps) {			//cambia lo stato appena riceve nuove props
		this.setState({vestiario: nextProps.vestiario});
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