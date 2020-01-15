import React from 'react';

class About extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            aboutText: "I'm a web developer, chum"
        };
    }

    render() {

        return (
            <div className="container mx-auto">
                <div className="container mx-auto">
                    <p>{this.state.aboutText}</p>
                </div>
            </div>
        );
    }

}

export default About;