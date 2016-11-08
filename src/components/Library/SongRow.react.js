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
        track: React.PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {};

        this.selectAndPlay = this.selectAndPlay.bind(this);
    }

    selectAndPlay() {
        AppActions.library.selectAndPlay(this.props.trackId);
    }

    render() {
        const track = this.props.track;
        const key = this.props.index;
        const trackClasses = classnames({ active: this.props.playing });

        return (
            <tr
                key={ key }
                className={ trackClasses }
                onDoubleClick={ this.selectAndPlay }
            >
                <td><img alt='' /></td>
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