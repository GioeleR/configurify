import React from "react";
import Actions from "src/Actions";
import {connect} from "react-redux";

class MenuItem extends React.Component{			//dropdown menu per 'maglie' 'pantaloni' e 'scarpe', mostra i capi disponibili per ogni sezione
	constructor(props){
        super(props);
        this.handleClick = this._handleClick.bind(this);
	}
    componentDidMount(){
        if (this.props.parte == "Maglie")
            this.props.dispatch(Actions.getMaglie());
        if (this.props.parte == "Pantaloni")
            this.props.dispatch(Actions.getPantaloni());
        if (this.props.parte == "Scarpe")
            this.props.dispatch(Actions.getScarpe());
    }
	_handleClick(capo){			//gestisce l'evento click sui capi del menu
		if (this.props.parte == "Maglie")
            this.props.dispatch(Actions.setMaglia(capo));
        if (this.props.parte == "Pantaloni")
            this.props.dispatch(Actions.setPantalone(capo));
        if (this.props.parte == "Scarpe")
            this.props.dispatch(Actions.setScarpa(capo));
	}

	render() {
		//TODO: questa parte andrebbe migliorata...invece di passare il tipo al componente MenuItem perché non passare direttamente la lista?
		if (this.props.parte == "Maglie"){
			this.state = {vestiario: this.props.maglie};
		} else if (this.props.parte == "Pantaloni"){
			this.state = {vestiario: this.props.pantaloni};
		} else if (this.props.parte == "Scarpe"){
			this.state = {vestiario: this.props.scarpe};
		}
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
}

var select = (state) => {
    return {
        maglie: state.maglie,
        pantaloni: state.pantaloni,
        scarpe: state.scarpe
    };
};

export default connect(select)(MenuItem);
