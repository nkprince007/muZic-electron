import React from 'react';

export default class PlayerControls extends React.Component {
    render() {
        return (
            <div className="footer-base">
                <img className="album-img" src="dist/img/album.svg" />
                <div className="footer-controls">
                    <div className="progress-player">
                        <div className="progress-fill" />
                        <input className="player-progress-bar" type="range" min="0" max="100"/>
                    </div>
                    <div className="player-content">
                        <div className="song-details">
                            <p className="song-title">Shut Up and Dance</p>
                            <p className="artist-name">WALK THE MOON - Talking is Hard</p>
                        </div>
                        <ul className="play-control-buttons">
                            <li><img src="dist/img/prev.svg" /></li>
                            <li><img src="dist/img/play_arrow_white_24px.svg" /></li>
                            <li><img src="dist/img/next.svg" /></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
