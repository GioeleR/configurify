var React = require('react');

var RightSection = React.createClass({					//parte destra del menu (interazione col server)
	getInitialState: function() {
		return {maglia: '', pantalone: '', scarpa: '', selected: -1};
	},
	componentWillReceiveProps: function(nextProps) {			//modifica lo stato appena riceve nuove props da MenuList
		this.setState({maglia: nextProps.maglia});
		this.setState({pantalone: nextProps.pantalone});
		this.setState({scarpa: nextProps.scarpa});
		this.setState({showOcchiali: nextProps.showOcchiali});
	},
	toBoolean: function(x) {
		if (x=="true")
			return true;
		if (x=="false")
			return false;
		return x;
	},
	handleGet: function() {
		this.requestConfig = $.get('http://localhost:3000/react/manichinofy/config', function (result) {
			this.setState({config: result});
			this.props.setMaglia(result[0].maglia);
			this.props.setPantalone(result[0].pantalone);
			this.props.setScarpa(result[0].scarpa);
			this.props.setOcchiali(this.toBoolean(result[0].occhiali));
			this.setState({selected: 0});
		}.bind(this)).fail(function (res){
				console.log("Richiesta fallita: "+res.statusText);
				if (res.status==404)
					alert("Nessuna configurazione presente sul server");
			});
	},
	handlePut: function() {
		if (this.state.maglia!='' && this.state.pantalone!='' && this.state.scarpa!='' && this.state.showOcchiali!=undefined){
			var object = {"maglia": this.state.maglia, "pantalone": this.state.pantalone, "scarpa": this.state.scarpa, "occhiali": this.state.showOcchiali};
			var handler = $.ajax({
				data: object,
				url: 'http://localhost:3000/react/manichinofy/config',
				type: 'PUT',
				dataType: 'json'
			});
			handler.done(function(res){
				if (res)
                    console.log("put ok");
                else
                    alert("Configurazione gia' presente sul server");
            }).fail(function(res){
                console.log(res.status);
            });
		}
		else alert("Configurazione non valida");
	},
	next: function(){
		var selected = this.state.selected;
		selected++;
		if (this.state.config.length <= selected)
			selected = 0;
		this.props.setMaglia(this.state.config[selected].maglia);
		this.props.setPantalone(this.state.config[selected].pantalone);
		this.props.setScarpa(this.state.config[selected].scarpa);
		this.props.setOcchiali(this.state.config[selected].occhiali);
		this.setState({selected: selected}); 
	},
	handleDelete: function() {
		var handler = $.ajax({
			url: 'http://localhost:3000/react/manichinofy/config',
			type: "DELETE",
			success: function (data) {
				console.log('delete ok');
			}.bind(this),
		});
	},
	render: function() {
		var delClasses= "active ";
		var nextClasses= "active ";
		if (this.state.config != undefined){
			if (this.state.config.length < 1)
				delClasses+="hidden";
			else if (this.state.config.length < 2)
					nextClasses += "hidden";
		}
		else {
			nextClasses += "hidden";
			delClasses += "hidden";
		}
		return(
			<ul className="nav navbar-nav navbar-right">
				<li className="active"><a href="#" onClick={this.handlePut}>Put on Server</a></li>
				<li className="active"><a href="#" onClick={this.handleGet}>Scarica configurazioni dal server</a></li>
				<li className={nextClasses}><a href="#" onClick={this.next}>Scorri Configurazioni</a></li>
				<li className={delClasses}><a href="#" onClick={this.handleDelete}>Cancella tutto dal server</a></li>
			</ul>
		);
	}
});

module.exports = RightSection;