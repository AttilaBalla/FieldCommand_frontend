import React from 'react';

export function Footer() {
    return(
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-sm-4 centered">
                        <a href="http://www.moddb.com/mods/rise-of-the-reds" title="View Rise of the Reds on Mod DB"><img
                            src="http://button.moddb.com/popularity/medium/mods/4333.png" alt="Rise of the Reds"/></a>
                    </div>
                    <div className="col-sm-4 centered">
                        <img src="/img/ROTR.png" alt=""/>
                    </div>
                    <div className="col-sm-4 centered">
                        <a href="http://generalsrotr.wikia.com/wiki/Rise_Of_The_Reds_Wiki"><img
                            src="/img/rotr_icon_wikia.png" alt=""/></a>
                        <a href="http://forums.swr-productions.com/index.php?showforum=22"><img
                            src="/img/rotr_icon_forum.png" alt=""/></a>
                    </div>
                    <p> version 0.2 / 2018 - Created by XAttus</p>
                </div>
            </div>
        </footer>
    )
}