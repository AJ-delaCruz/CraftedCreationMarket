import React, {Component} from 'react';

class Footer extends Component {
    render() {
        return (
            <div style={{
                // marginTop: "10px",
                // height: "50px",
                // alignItems: 'center',
                bottom: "0",
                left:"0",
                right:"0",
                position:"relative",
                overflow:"auto"
                // minHeight: "100vh",
                // marginTop: "auto"
            }}>
                <nav className="navbar bg-light ">
                    {/*Footer*/}
                    <span> United States |  English (US)  |  $ (USD)</span>
                </nav>
            </div>
        );
    }
}

export default Footer;
