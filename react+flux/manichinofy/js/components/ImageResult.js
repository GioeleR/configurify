var React = require('react');
var Store = require('../Store');

var ImageResult = React.createClass({						//immagine risultante
	getInitialState: function(){
        var current = Store.getCurrent();
        var showMaglia = current.maglia != "";
        var showPant = current.pantalone != "";
        var showScarpa = current.scarpa != "";
        var showOver = showMaglia || showPant;
		return {manichino: "manichino.jpg", braccioSx: "mano_sx.png", braccioDx: "mano_dx.png", currentConfig: current, showMaglia: showMaglia, showPant: showPant, showScarpa: showMaglia, showOver: showOver};
	},
    listener: function() {
        var current = Store.getCurrent();
        var showMaglia = current.maglia != "";
        var showPant = current.pantalone != "";
        var showScarpa = current.scarpa != "";
        var showOver = showMaglia || showPant;
		this.setState({currentConfig: current, showMaglia: showMaglia, showPant: showPant, showScarpa: showMaglia, showOver: showOver});
    },
    componentDidMount: function() {
        Store.addChangeListener(this.listener);
    },
    componentWillUnmount: function() {
        Store.removeChangeListener(this.listener);
    },
	render: function(){
		var modifica = this.state.currentConfig.occhiali ? " modifica" : "";
		var hideMaglia =  this.state.showMaglia ? "" : " off";
		var hidePant =  this.state.showPant ? "" : " off";
		var hideScarpa =  this.state.showScarpa ? "" : " off";
		var hideBraccia = this.state.showOver ? "" : " off";
		return (
			<div className="result">
				<img src={"img/"+this.state.manichino}/>{this.state.currentConfig.occhiali ? <img className="occhiali" src="img/occhiali.png"/> : null}
				<img className={"maglia"+ modifica + hideMaglia} src={"img/"+this.state.currentConfig.maglia}/>
				<img className={"pantalone" + modifica + hidePant} src={"img/"+this.state.currentConfig.pantalone}/>
				<img className={"scarpasx" + modifica + hideScarpa} src={"img/"+this.state.currentConfig.scarpa}/>
				<img className={"braccioSx" + modifica + hideBraccia} src={"img/"+this.state.braccioSx}/>
				<img className={"braccioDx" + modifica + hideBraccia} src={"img/"+this.state.braccioDx}/>
			</div>
		);
	}
});

module.exports = ImageResult;