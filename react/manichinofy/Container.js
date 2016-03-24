var Container = React.createClass({
	getInitialState: function() {
		return {};
	},
	componentWillMount: function() {
		var maglieUrl = this.props.source + 'maglie.json';
		var pantaloniUrl = this.props.source + 'pantaloni.json';
		var scarpeUrl = this.props.source + 'scarpe.json';
		this.serverRequestMaglie = $.get(maglieUrl, function (result) {
			this.setState({maglie: result.maglie});
		}.bind(this));
		this.serverRequestPantaloni = $.get(pantaloniUrl, function (result) {
			this.setState({pantaloni: result.pantaloni});
		}.bind(this));
		this.serverRequestScarpe = $.get(scarpeUrl, function (result) {
			this.setState({scarpe: result.scarpe});
		}.bind(this));
	},
	componentWillUnmount: function() {
		this.serverRequestMaglie.abort();
		this.serverRequestPantaloni.abort();
		this.serverRequestScarpe.abort();
	},
	render: function(){
		return (
				<MenuList maglie={this.state.maglie} pantaloni={this.state.pantaloni} scarpe={this.state.scarpe}/>
		);
	}
});
	
var MenuList = React.createClass({
	getInitialState: function(){
		return {maglia: '', pantalone: '', scarpa: '', showOcchiali: 'false'};
	},
	componentWillReceiveProps: function(nextProps) {
		this.setState({maglie: nextProps.maglie});
		this.setState({pantaloni: nextProps.pantaloni});
		this.setState({scarpe: nextProps.scarpe});
	},
	setMaglia: function(x){
		this.setState({maglia: x});
	},
	setPantalone: function(x){
		this.setState({pantalone: x});
	},
	setScarpa: function(x){
		this.setState({scarpa: x});
	},
	setOcchiali: function(){
		this.setState({showOcchiali: !this.state.showOcchiali});
	},
	render: function() {
		return (<div>
			<nav className="navbar navbar-inverse navbar-fixed-top">
				<div className="container-fluid">
					<div className="navbar-header">
						<a className="navbar-brand" href="#">Manichinofy</a>
					</div>
					<ul className="nav navbar-nav">
						<li className="active"><a href="">Reset</a></li>
						<MenuItem vestiario={this.state.maglie} parte="Maglie" setCapo={this.setMaglia}/>
						<MenuItem vestiario={this.state.pantaloni} parte="Pantaloni" setCapo={this.setPantalone}/>
						<MenuItem vestiario={this.state.scarpe} parte="Scarpe" setCapo={this.setScarpa}/>
						<li className="dropdown">
							<a className="dropdown-toggle" data-toggle="dropdown" href="#">Occhiali
							<span className="caret"></span></a>
							<ul className="dropdown-menu">
								<li><input type="checkbox" value={this.state.showOcchiali} onChange={this.setOcchiali}/> Mostra Occhiali</li>
							</ul>
						</li>
					</ul>
					<RightSection/>
				</div>
			</nav>
			<ImageResult maglia={this.state.maglia} pantalone={this.state.pantalone} scarpa={this.state.scarpa} showOcchiali={this.state.showOcchiali}/>
			</div>
		);
	}
});

var MenuItem = React.createClass({
	getInitialState: function(){
		return {};
	},
	handleClick: function(capo){
		this.props.setCapo(capo);
	},
	componentWillReceiveProps: function(nextProps) {
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

var RightSection = React.createClass({
	render: function() {
		return(
			<ul className="nav navbar-nav navbar-right">
				<li className="active"><a href="#" >Put on Server</a></li>
				<li className="active"><a href="#" >Scarica configurazioni dal server</a></li>
				<li className="active"><a href="#" >Scorri Configurazioni</a></li>
				<li className="active"><a href="#" >Cancella tutto dal server</a></li>
			</ul>
		);
	}
});

var ImageResult = React.createClass({
	getInitialState: function(){
		return {manichino: "manichino.jpg", occhiali: "occhiali.png", maglia: '', pantalone: '', scarpa:'', braccioSx: "mano_sx.png", braccioDx: "mano_dx.png", showMaglia: false, showPant: false, showScarpa: false, showOcchiali: false, showOver: false};
	},
	componentWillReceiveProps: function(nextProps) {
		if (this.props.maglia=="" && nextProps.maglia!=""){
			this.setState({maglia: nextProps.maglia});
			this.setState({showMaglia: true});
			this.setState({showOver: true});
		}
		else this.setState({maglia: nextProps.maglia});
		if (this.props.pantalone=="" && nextProps.pantalone!=""){
			this.setState({pantalone: nextProps.pantalone});
			this.setState({showPant: true});
			this.setState({showOver: true});
		}
		else this.setState({pantalone: nextProps.pantalone});
		if (this.props.scarpa=="" && nextProps.scarpa!=""){
			this.setState({scarpa: nextProps.scarpa});
			this.setState({showScarpa: true});
		}
		else this.setState({scarpa: nextProps.scarpa});
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

ReactDOM.render(
	<Container source="http://localhost:3000/react/manichinofy/"/>,
	document.getElementById('wrapper')
);