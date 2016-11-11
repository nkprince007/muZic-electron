import React from 'react';
import classnames from 'classnames';

import AppActions from '../../actions/AppActions';

class SongRow extends React.Component {
    static propTypes = {
        children: React.PropTypes.object,
        selected: React.PropTypes.bool,
        trackPlayingId: React.PropTypes.string,
        index: React.PropTypes.number,
        playing: React.PropTypes.bool,
        track: React.PropTypes.object,
        status: React.PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {};

        this.selectAndPlay = this.selectAndPlay.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    selectAndPlay() {
        AppActions.library.selectAndPlay(this.props.track._id);
        AppActions.library.fetchCover(this.props.track.path);
    }

    toggle() {
        const playingId = this.props.trackPlayingId;
        const trackId = this.props.track._id;
        if(trackId === playingId)
            AppActions.player.playToggle();
        else {
            AppActions.library.selectAndPlay(trackId);
            AppActions.library.fetchCover(this.props.track.path);
        }
    }

    render() {
        const track = this.props.track;
        const key = this.props.index;
        const status = this.props.status === 'play';
        let trackClasses = classnames({ active: this.props.playing });
        if (track._id === this.props.trackPlayingId) {
            trackClasses = classnames({ active: this.props.playing, play: status });
        }

        return (
            <tr
                key={ key }
                className={ trackClasses }
                onDoubleClick={ this.selectAndPlay }
            >
                <td><img onClick={ this.toggle } alt='' /></td>
                <td className="col-sm-8">
                    <h3>{track.title}</h3>
                    <p>{track.album} - {track.artist}</p>
                </td>
                <td>{track.genre}</td>
                <td>{track.playCount}</td>
            </tr>
        );
    }
}

export default SongRow;
