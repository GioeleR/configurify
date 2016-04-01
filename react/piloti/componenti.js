var piloti = [{"nome": "Dovizioso", "img": "Dovizioso.jpg", "testa": "dov_testa.png", "corpo": "dov_corpo.png"},
			{"nome": "Rossi", "img": "Rossi.jpg", "testa": "ros_testa.png", "corpo": "ros_corpo.png"},
			{"nome": "Lorenzo", "img": "Lorenzo.jpg", "testa": "lor_testa.png", "corpo": "lor_corpo.png"},
			{"nome": "Marquez", "img": "Marquez.jpg", "testa": "mar_testa.png", "corpo": "mar_corpo.png"}];

var Container = React.createClass({
	render: function(){
		return (
			<div className="box">
				<ImagesList piloti={this.props.piloti}/>
				<FormBox piloti={this.props.piloti}/>
			</div>
		);
	}
});

var ImagesList = React.createClass({
	render: function(){
		var listaPiloti =  this.props.piloti.map(function(pilota){
			var url = "images/" + pilota.img;
			var key = "li" + pilota.nome;
			return (
				<li key={key}>
					<img src={url} key={pilota.nome} />
				</li>
			);
		});
		return (
			<ul>
				{listaPiloti}
			</ul>
		);
	}
});
	
var FormBox = React.createClass({
	getInitialState: function() {
		return {testa: '', corpo: '', numero: ''};
	},
	setTesta: function(stringa){
		this.setState({testa: stringa});
	},
	setCorpo: function(stringa){
		this.setState({corpo: stringa});
	},
	setNumero: function(stringa){
		this.setState({numero: stringa});
	},		
	handleClick: function(e){
		e.preventDefault();
		var div = document.getElementById('result');
		div.setAttribute("class","resultOn");
	},
	getStato: function(){
		var img = new Array(3);
		img[0]=this.state.testa;
		img[1]=this.state.corpo;
		img[2]=this.state.numero;
		return img;
	},
	isConsistent: function(){
		if (this.state.testa == '')
			return false;
		if (this.state.corpo == '')
			return false;
		if (this.state.numero == '')
			return false;
		return true;
	},
	render: function(){
		var disable = !this.isConsistent();
		return (
		<div className="formDiv">
			<h3>Crea il tuo Pilota</h3>
			<h5>Scegli un volto, un corpo e un numero/nome</h5>
			<form className="scelta" name="sceltaForm">
				<label>Volto di:</label><SelectElements piloti={this.props.piloti} parte='testa' set={this.setTesta}/>
				<label> Corpo di:</label><SelectElements piloti={this.props.piloti} parte='corpo' set={this.setCorpo}/>
				<label> Numero e nome di:</label><SelectElements piloti={this.props.piloti} parte='img' set={this.setNumero}/>
				<button onClick={this.handleClick} disabled={disable}> Fusione</button>
			</form>
			<ImageResult getStato={this.getStato}/>
		</div>
		);
	}
});
	
var SelectElements = React.createClass({
	getInitialState: function() {
		return {};
	},
	handleChange: function(e){
		var parteCorpo = this.props.parte;
		if (parteCorpo == 'testa'){
			this.setState({testa: e.target.value});
			this.props.set(e.target.value);
		}
		else if (parteCorpo == 'corpo'){
				this.setState({corpo: e.target.value});
				this.props.set(e.target.value);
			}
			else {
				this.setState({numero: e.target.value});
				this.props.set(e.target.value);
			}
		var div = document.getElementById('result');
		div.setAttribute("class", 'resultOff');
	},
	render: function(){
		var parteCorpo = this.props.parte;
		var scelta;
		switch(parteCorpo){
			case 'testa':
				scelta = this.props.piloti.map(function(pilota){
					return (
						<option value={pilota.testa} key={pilota.nome}>{pilota.nome}</option>
					);})
				break;
			case 'corpo':
				scelta = this.props.piloti.map(function(pilota){
				return (
					<option value={pilota.corpo} key={pilota.nome}>{pilota.nome}</option>
				);})
				break;
			default:
				scelta = this.props.piloti.map(function(pilota){
				return (
					<option value={pilota.img} key={pilota.nome}>{pilota.nome}</option>
				);
			})
		};
		return (
			<select name={this.props.parte} onChange={this.handleChange} >
				{scelta}
			</select>
			
		);
	}
});

var ImageResult = React.createClass({
	getInitialState: function() {
		return {};
	},
	render: function(){
		var img = this.props.getStato();
		return (
			<div id="result" className="resultOff">
				<img src={"images/"+img[0]} className="testa"/><img src={"images/"+img[1]} className="corpo"/><img src={"images/"+img[2]} className="base"/>
			</div>
		);
	}
});

ReactDOM.render(
	<Container piloti={piloti}/>,
	document.getElementById('container')
);