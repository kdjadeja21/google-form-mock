import React from 'react';
import './splashScreen.css';

const SplashScreen = () => {
    return (
        <>
            <div id="splash-screen">

                <div className="center">

                    {/* <div className="logo">
                        <img width="128" src={logo} alt="logo" />
                    </div> */}

                    <div className="spinner-wrapper">
                        <div className="spinner">
                            <div className="inner">
                                <div className="gap"></div>
                                <div className="left">
                                    <div className="half-circle"></div>
                                </div>
                                <div className="right">
                                    <div className="half-circle"></div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

            </div>
        </>
    )
}

export default SplashScreen