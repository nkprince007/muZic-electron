import React from 'react';
import utils from '../../utilities/utils';

import SongRow from './SongRow.react';

class Songs extends React.Component {
    static propTypes = {
        library: React.PropTypes.array,
        trackPlayingId: React.PropTypes.string,
        status: React.PropTypes.string
    }

    constructor(props) {
        super(props);
        this.getHeader = this.getHeader.bind(this);
    }

    getHeader(columns = []) {
        const headers = [];
        columns.forEach((col, i) => {
            headers.push(<th key={ i }>{col}</th>);
        });
        return (
           <thead>
               <tr>
                   <th>&nbsp;</th>
                   {headers}
               </tr>
           </thead>
        );
    }

    render() {
        const library = this.props.library;
        const trackPlayingId = this.props.trackPlayingId;

        let duration = 0;
        const rowCount = library.length;

        const list = library.map((track, index) => {
            duration += track.duration;
            const playing = track._id === trackPlayingId;

            return (
                <SongRow
                    status={ this.props.status }
                    track={ track }
                    index={ index }
                    key={ index }
                    trackPlayingId={ trackPlayingId }
                    playing={ playing }
                />
            );
        });

        const columns = ['Song', 'Artist', 'Album', 'Genre', 'Plays'];
        const songCount = utils.getFormatted('SONG_COUNT', rowCount);
        const totalTime = utils.getFormatted('TOTAL_DURATION', duration);

        return (
            <div className="songs-viewbox">
                <h1>Songs</h1>
                <p>{songCount} Songs, {totalTime}</p>
                <table className="table table-inverse table-sm songs-view">
                    {this.getHeader(columns)}
                    <tbody>{list}</tbody>
                </table>
            </div>
        );
    }

}

export default Songs;
