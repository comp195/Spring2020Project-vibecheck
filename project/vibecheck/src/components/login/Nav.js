import React, { Component } from "react";

import "./../../styles/nav.scss";

class Nav extends Component {

    render() {
        return (
            <nav>
                <div className="brand">
                    <img src="./static/vibecheck/img/brand.png"></img>
                </div>
            </nav>
        );
    }

}

export default Nav;