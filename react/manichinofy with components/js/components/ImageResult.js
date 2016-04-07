var React = require('react');

var ImageResult = React.createClass({						//immagine risultante
	getInitialState: function(){
		return {manichino: "manichino.jpg", maglia: '', pantalone: '', scarpa:'', braccioSx: "mano_sx.png", 
				braccioDx: "mano_dx.png", showMaglia: false, showPant: false, showScarpa: false, showOcchiali: false, showOver: false};
	},
	componentWillReceiveProps: function(nextProps) {		//modifica lo state se riceve nuove props diverse dalle precedenti e se l'utente modifica il capo selezionato
		if (this.props.maglia=="" && nextProps.maglia!=""){
			this.setState({maglia: nextProps.maglia});
			this.setState({showMaglia: true});
			this.setState({showOver: true});
		}
		else
			this.setState({maglia: nextProps.maglia});
		if (this.props.pantalone=="" && nextProps.pantalone!=""){
			this.setState({pantalone: nextProps.pantalone});
			this.setState({showPant: true});
			this.setState({showOver: true});
		}
		else
			this.setState({pantalone: nextProps.pantalone});
		if (this.props.scarpa=="" && nextProps.scarpa!=""){
			this.setState({scarpa: nextProps.scarpa});
			this.setState({showScarpa: true});
		}
		else
			this.setState({scarpa: nextProps.scarpa});
		if (this.props.showOcchiali!=nextProps.showOcchiali)
			this.setState({showOcchiali: !this.state.showOcchiali});
	},
	render: function(){
		var modifica = this.state.showOcchiali ? " modifica" : "";
		var hideMaglia =  this.state.showMaglia ? "" : " off";
		var hidePant =  this.state.showPant ? "" : " off";
		var hideScarpa =  this.state.showScarpa ? "" : " off";
		var hideBraccia = this.state.showOver ? "" : " off";
		return (
			<div className="result">
				<img src={"img/"+this.state.manichino}/>{this.state.showOcchiali ? <img className="occhiali" src="img/occhiali.png"/> : null}
				<img className={"maglia"+ modifica + hideMaglia} src={"img/"+this.state.maglia}/>
				<img className={"pantalone" + modifica + hidePant} src={"img/"+this.state.pantalone}/>
				<img className={"scarpasx" + modifica + hideScarpa} src={"img/"+this.state.scarpa}/>
				<img className={"braccioSx" + modifica + hideBraccia} src={"img/"+this.state.braccioSx}/>
				<img className={"braccioDx" + modifica + hideBraccia} src={"img/"+this.state.braccioDx}/>
			</div>
		);
	}
});

module.exports = ImageResult;