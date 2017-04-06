import AppActions from '../../actions/AppActions';
import Player from '../../lib/player';

import { ProgressBar } from 'react-bootstrap';

import React from 'react';

export default class PlayerControls extends React.Component {
    static propTypes = {
        app: React.PropTypes.object,
        cover: React.PropTypes.string,
        playerStatus: React.PropTypes.string,
        queue: React.PropTypes.array,
        queueCursor: React.PropTypes.number,
        repeat: React.PropTypes.bool,
        shuffle: React.PropTypes.bool
    }

    constructor(props) {
        super(props);

        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        this.timer = setInterval(this.tick, 250);
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
        let elapsedPercent = 0;

        if (song !== undefined && this.state.elapsed < song.duration) {
            elapsedPercent = this.state.elapsed * 100 / song.duration;
        }

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
        let classNames = 'album-img';
        if (this.props.cover !== null && this.props.cover !== '' && this.props.cover !== undefined) {
            cover = this.props.cover;
        } else {
            classNames = 'add-padding album-img';
        }

        return (
            <div className="footer-base">
                <img
                    className={ classNames }
                    alt=''
                    src={ cover }
                />
                <div className="footer-controls">
                    {/*<div className="progress-player">
                        <div className="progress-fill" />
                        <input className="player-progress-bar" type="range" min="0" max="100" />
                    </div>*/}
                    <ProgressBar now={ elapsedPercent } />
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
