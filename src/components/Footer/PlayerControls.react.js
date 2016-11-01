import React from 'react';

export default class PlayerControls extends React.Component {
    render() {
        return (
            <div className="footer-controls">
                <ul className="fav-control-buttons">
                </ul>
                <ul className="play-control-buttons">
                    <li><img src="dist/img/prev.svg" /></li>
                    <li><img src="dist/img/play_arrow_white_24px.svg" /></li>
                    <li><img src="dist/img/next.svg" /></li>
                </ul>
                <ul className="fav-control-buttons">
                </ul>
            </div>
        );
    }
}
