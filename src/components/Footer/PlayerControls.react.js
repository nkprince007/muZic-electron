import React from 'react';

export default class PlayerControls extends React.Component {
    render() {
        return (
            <div className="footer-base">
                <img className="album-img" src="dist/img/album.svg" />
                <div className="footer-controls">
                    <div className="progress">
                        <div className="progress-fill"></div>
                        <input className="player-progress-bar" type="range" min="0" max="100"/>
                    </div>
                    <ul className="play-control-buttons">
                        <li><img src="dist/img/prev.svg" /></li>
                        <li><img src="dist/img/play_arrow_white_24px.svg" /></li>
                        <li><img src="dist/img/next.svg" /></li>
                    </ul>
                </div>
            </div>
        );
    }
}
