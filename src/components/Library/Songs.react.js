import React from 'react';
import utils from '../../utilities/utils';

import SongRow from './SongRow.react';

class Songs extends React.Component {
    static propTypes = {
        library: React.PropTypes.array,
        trackPlayingId: React.PropTypes.string
    }

    constructor(props) {
        super(props);
        this.getHeader = this.getHeader.bind(this);
        this.getSong = this.getSong.bind(this);
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

    getSong(data = {}) {
        // console.log(data);
        return (
            <tr
                key={ data.key }
            >
                <td><img alt='' /></td>
                <td>{data.title}</td>
                <td>{data.artist}</td>
                <td>{data.album}</td>
                <td>{data.genre}</td>
                <td>{data.playCount}</td>
            </tr>
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
                    track={ track }
                    index={ index }
                    key={ index }
                    trackId={ track._id }
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
