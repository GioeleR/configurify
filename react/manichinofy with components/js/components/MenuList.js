var React = require('react');
var MenuItem = require('./MenuItem');
var RightSection = require('./RightSection');
var ImageResult = require('./ImageResult');

var MenuList = React.createClass({
	getInitialState: function(){
		return {maglia: '', pantalone: '', scarpa: '', showOcchiali: false};
	},
	componentWillReceiveProps: function(nextProps) {			//modifica lo stato appena riceve nuove props da Container
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
	impostaOcchiali: function(x){
		this.setState({showOcchiali: x});
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
					<RightSection maglia={this.state.maglia} pantalone={this.state.pantalone} scarpa={this.state.scarpa} showOcchiali={this.state.showOcchiali} 
								setMaglia={this.setMaglia} setPantalone={this.setPantalone} setScarpa={this.setScarpa} setOcchiali={this.impostaOcchiali} />
				</div>
			</nav>
			<ImageResult maglia={this.state.maglia} pantalone={this.state.pantalone} scarpa={this.state.scarpa} showOcchiali={this.state.showOcchiali} />
			</div>
		);
	}
});

module.exports = MenuList;