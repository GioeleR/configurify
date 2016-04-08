import React from "react";
import { connect } from "react-redux";
import Actions from "src/Actions";

class MenuItemOcchiali extends React.Component{
    render(){
        return (
            <li className="dropdown">
				<a className="dropdown-toggle" data-toggle="dropdown" href="#">Occhiali
                    <span className="caret"></span></a>
				    <ul className="dropdown-menu">
					    <li><input type="checkbox" value={this.props.occhiali} onChange={this.props.dispatch.bind(this, Actions.toogleOcchiali())}/> Mostra Occhiali</li>
				    </ul>
            </li>
        );
    }
}

var select = (state) => {
    return {
        occhiali: state.currentConfig.occhiali
    };
};

export default connect(select)(MenuItemOcchiali);