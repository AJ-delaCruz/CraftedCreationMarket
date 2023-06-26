import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <div className="bg-light" style={{
                // marginTop: "10px",
                // height: "50px",
                display: "flex",
                alignItems: 'center',
                justifyContent: "right",
                bottom: "0",
                left: "0",
                right: "0",
                // position: "relative",
                position: "fixed",
                // overflow: "auto",
                // minHeight: "100vh",
                // marginTop: "auto"
                background: "lightgray",
                height: "50px",


            }}>
                {/* <nav className="navbar bg-light "> */}
                {/*Footer*/}
                <span style={{ marginRight: "30px" }}> United States |  English (US)  |  $ (USD)</span>
                {/* </nav> */}
            </div>
        );
    }
}

export default Footer;
