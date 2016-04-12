import React from "react";
import MenuItem from "src/components/MenuItem";
import MenuItemOcchiali from "src/components/MenuItemOcchiali";
import RightSection from "src/components/RightSection";
import ImageResult from "src/components/ImageResult";
import Actions from "src/Actions";
import {connect} from "react-redux";

export default class MenuList extends React.Component{
	render() {
		return (
            <div>
                <nav className="navbar navbar-inverse navbar-fixed-top">
				    <div className="container-fluid">
				        <div className="navbar-header">
						  <a className="navbar-brand" href="#">Manichinofy</a>
				        </div>
				        <ul className="nav navbar-nav">
				          <li className="active"><a href="#" onClick={this.props.dispatch.bind(this, Actions.resetApp())}>Reset</a></li>
						  <MenuItem parte="Maglie" vestiario={this.props.maglie} />
						  <MenuItem parte="Pantaloni" vestiario={this.props.pantaloni} />
						  <MenuItem parte="Scarpe" vestiario={this.props.scarpe} />
						  <MenuItemOcchiali />
				        </ul>
				        <RightSection />
				    </div>
                </nav>
                <ImageResult />
			</div>
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

export default connect(select)(MenuList);