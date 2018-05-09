import React from 'react';

export function Banner() {
    return(
        <div id="banner_bg">
            <div className="container-fluid">
                <div className="row banner_container">
                    <div className="col-3">
                        <div className="banner_side client_bg">
                            <div className="banner_text">
                                <h4>Download Client</h4>
                                <p>Recieve the latest releases automatically</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div id="banner_center">
                            <div className="banner_text">
                                <h4>Fieldcommand</h4>
                                <p>Latest news can go here.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="banner_side reports_bg">
                            <div className="banner_text">
                                <h4>Share your games</h4>
                                <p>Give and recieve feedback</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}