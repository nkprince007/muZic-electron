import React from 'react';

export default class PlayerControls extends React.Component {
    static propTypes = {
        app: React.PropTypes.object,
        playerStatus: React.PropTypes.string,
        repeat: React.PropTypes.bool,
        shuffle: React.PropTypes.bool,
        queue: React.PropTypes.array,
        cover: React.PropTypes.string,
        queueCursor: React.PropTypes.number
    }

    render() {
        let cover = 'dist/img/album.svg';
        if (this.props.cover !== null) {
            cover = this.props.cover;
        }
        return (
            <div className="footer-base">
                <img
                    className="album-img"
                    alt=''
                    src={ cover }
                />
                <div className="footer-controls">
                    <div className="progress-player">
                        <div className="progress-fill" />
                        <input className="player-progress-bar" type="range" min="0" max="100" />
                    </div>
                    <div className="player-content">
                        <div className="song-details">
                            <p className="song-title">Shut Up and Dance</p>
                            <p className="artist-name">WALK THE MOON - Talking is Hard</p>
                        </div>
                        <ul className="play-control-buttons">
                            <li><img alt='' src="dist/img/prev.svg" /></li>
                            <li><img alt='' src="dist/img/play_arrow_white_24px.svg" /></li>
                            <li><img alt='' src="dist/img/next.svg" /></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
