import React from "react";
import { connect } from "react-redux";
import Actions from "src/Actions";

class ImageResult extends React.Component{						//immagine risultante
    render() {
		var modifica = this.props.occhiali ? " modifica" : "";
        var showMaglia = this.props.maglia != "";
        var showPant = this.props.pantalone != "";
        var showScarpa = this.props.scarpa != "";
        var showOver = showMaglia || showPant;
		var hideMaglia =  showMaglia ? "" : " off";
		var hidePant =  showPant ? "" : " off";
		var hideScarpa =  showScarpa ? "" : " off";
		var hideBraccia = showOver ? "" : " off";
		return (
			<div className="result">
				<img src={"img/"+this.props.manichino}/>{this.props.occhiali ? <img className="occhiali" src="img/occhiali.png"/> : null}
				<img className={"maglia"+ modifica + hideMaglia} src={"img/"+this.props.maglia}/>
				<img className={"pantalone" + modifica + hidePant} src={"img/"+this.props.pantalone}/>
				<img className={"scarpasx" + modifica + hideScarpa} src={"img/"+this.props.scarpa}/>
				<img className={"braccioSx" + modifica + hideBraccia} src={"img/"+this.props.braccioSx}/>
				<img className={"braccioDx" + modifica + hideBraccia} src={"img/"+this.props.braccioDx}/>
			</div>
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
        occhiali: state.currentConfig.occhiali
    };
};

export default connect(select)(ImageResult);