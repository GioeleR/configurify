import React from "react";
import MenuItem from "src/components/MenuItem";
import MenuItemOcchiali from "src/components/MenuItemOcchiali";
import RightSection from "src/components/RightSection";
import ImageResult from "src/components/ImageResult";
import Actions from "src/Actions";

export default class MenuList extends React.Component{
	render() {
		return (<div>
			<nav className="navbar navbar-inverse navbar-fixed-top">
				<div className="container-fluid">
					<div className="navbar-header">
						<a className="navbar-brand" href="#">Manichinofy</a>
					</div>
					<ul className="nav navbar-nav">
						<li className="active"><a href="">Reset</a></li>
						<MenuItem parte="Maglie" />
						<MenuItem parte="Pantaloni" />
						<MenuItem parte="Scarpe" />
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