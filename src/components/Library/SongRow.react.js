import React from 'react';
import classnames from 'classnames';

import AppActions from '../../actions/AppActions';

class SongRow extends React.Component {
    static propTypes = {
        children: React.PropTypes.object,
        selected: React.PropTypes.bool,
        trackId: React.PropTypes.string,
        index: React.PropTypes.number,
        playing: React.PropTypes.bool,
        track: React.PropTypes.object,
        status: React.PropTypes.bool
    }

    constructor(props) {
        super(props);
        this.state = {};

        this.selectAndPlay = this.selectAndPlay.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    selectAndPlay() {
        AppActions.library.selectAndPlay(this.props.trackId);
        AppActions.library.fetchCover(this.props.track.path);
    }

    toggle() {
        AppActions.player.playToggle();
    }

    render() {
        const track = this.props.track;
        const key = this.props.index;
        const status = this.props.status === 'play';
        const trackClasses = classnames({ active: this.props.playing, play: status });

        return (
            <tr
                key={ key }
                className={ trackClasses }
                onDoubleClick={ this.selectAndPlay }
            >
                <td><img onClick={ this.toggle } alt='' /></td>
                <td>{track.title}</td>
                <td>{track.artist}</td>
                <td>{track.album}</td>
                <td>{track.genre}</td>
                <td>{track.playCount}</td>
            </tr>
        );
    }
}

export default SongRow;
