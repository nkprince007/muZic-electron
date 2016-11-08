import React from 'react';

import AppActions from '../../actions/AppActions';
import Player from '../../lib/player';

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

    constructor(props) {
        super(props);

        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        this.timer = setInterval(this.tick, 100);
    }

    tick() {
        this.setState({ elapsed: Player.getAudio().currentTime });
    }

    toggle() {
        AppActions.player.playToggle();
    }

    render() {
        const queue = this.props.queue;
        const queueCursor = this.props.queueCursor;
        const song = queue[queueCursor];
        let title = '';
        let albumArtist = '';
        let playerStatus = this.props.playerStatus === 'play';

        if (!playerStatus) {
            playerStatus = 'dist/img/play.svg';
        } else {
            playerStatus = 'dist/img/pause.svg';
        }

        if(song !== undefined) {
            title = song.title;
            albumArtist = `${song.album} - ${song.artist}`;
        }

        let cover = 'dist/img/album.svg';
        if (this.props.cover !== null && this.props.cover !== '' && this.props.cover !== undefined) {
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
                            <p className="song-title">{title}</p>
                            <p className="artist-name">{albumArtist}</p>
                        </div>
                        <ul className="play-control-buttons">
                            <li><img alt='' src="dist/img/prev.svg" /></li>
                            <li onClick={ this.toggle }><img alt='' src={ playerStatus } /></li>
                            <li><img alt='' src="dist/img/next.svg" /></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
