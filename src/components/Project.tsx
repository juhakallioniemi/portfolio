import * as React from "react";

const appEnvironment = process.env.NODE_ENV;
const brandGameUrl =
    appEnvironment === "production"
        ? "brand-game/index.html"
        : "docs/brand-game/index.html";

interface ProjectProps {
    projectName: string;
}

export class Project extends React.Component<ProjectProps, {}> {
    render() {
        return (
            <React.Fragment>
                <div className="project">{this.props.projectName}</div>
            </React.Fragment>
            // <React.Fragment>
            //     <object
            //         type="text/html"
            //         data={brandGameUrl}
            //         width="800px"
            //         height="600px"
            //     ></object>
            // </React.Fragment>
        );
    }
}
