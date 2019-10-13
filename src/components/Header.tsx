import * as React from "react";

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Header extends React.Component {
    // menuClick = () => {
    //     this.props.history.push("/AboutMe");
    // };

    render() {
        return (
            <React.Fragment>
                <h1 className="portfolio-title">Portfolio</h1>
                <div className="menu-links">
                    {/* <a href="#" onClick={this.menuClick}>
                        About me
                    </a> */}
                    <a>Projects</a>
                    <a>Contact</a>
                </div>
            </React.Fragment>
        );
    }
}
