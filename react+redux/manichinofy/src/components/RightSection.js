import React from "react";
import { connect } from "react-redux";
import Actions from "src/Actions";

class RightSection extends React.Component{					//parte destra del menu (interazione col server)
	constructor(props) {
        super(props);
        
        this.handlePut = this._handlePut.bind(this);
    }
    
	_handlePut() {
		if (this.props.maglia!='' && this.props.pantalone!='' && this.props.scarpa!=''){
			this.props.dispatch(Actions.uploadConfig());
		}
		else alert("Configurazione non valida");
	}
    
	render() {
		var delClasses= "active ";
		var nextClasses= "active ";
		if (this.props.lengthConfigs != 0){
			if (this.props.lengthConfigs < 1)
				delClasses+="hidden";
			else if (this.props.lengthConfigs < 2)
					nextClasses += "hidden";
		}
		else {
			nextClasses += "hidden";
			delClasses += "hidden";
		}
		return(
			<ul className="nav navbar-nav navbar-right">
				<li className="active"><a href="#" onClick={this.handlePut}>Put on Server</a></li>
				<li className="active"><a href="#" onClick={this.props.dispatch.bind(this, Actions.downloadConfig())}>Scarica configurazioni dal server</a></li>
				<li className={nextClasses}><a href="#" onClick={this.props.dispatch.bind(this, Actions.nextConfig())}>Scorri Configurazioni</a></li>
				<li className={delClasses}><a href="#" onClick={this.props.dispatch.bind(this, Actions.deleteConfig())}>Cancella tutto dal server</a></li>
			</ul>
		);
	}
}

var select = (state) => {
    return {
        manichino: state.manichino,
        braccioSx: state.braccioSx,
        braccioDx: state.braccioDx,
        maglia: state.currentConfig.maglia,
        pantalone: state.currentConfig.pantalone,
        scarpa: state.currentConfig.scarpa,
        occhiali: state.currentConfig.occhiali,
        lengthConfigs: state.configs.length
    };
};

export default connect(select)(RightSection);