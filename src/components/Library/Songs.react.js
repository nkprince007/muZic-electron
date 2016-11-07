import React from 'react';
import utils from '../../utilities/utils';

class Songs extends React.Component {

    constructor(props) {
        super(props);
        this.getHeader = this.getHeader.bind(this);
        this.getSong = this.getSong.bind(this);
    }

    getHeader(columns = []) {
        const headers = [];
        columns.forEach(col => {
            headers.push(<th>{col}</th>);
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
        return (
            <tr key={data.key}>
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
        const rows = [];
        let duration = 0;
        library.forEach(song => {
            const data = {
                key: song.path,
                album: song.album,
                title: song.title,
                artist: song.artist,
                genre: song.genre,
                playCount: song.playCount
            };
            duration += song.duration;
            rows.push(this.getSong(data));
        });
        const columns = ['Song', 'Artist', 'Album', 'Genre', 'Plays'];
        const songCount = utils.getFormatted('SONG_COUNT', rows.length);
        const totalTime = utils.getFormatted('TOTAL_DURATION', duration);

        return (
            <div className="songs-viewbox">
                <h1>Songs</h1>
                <p>{songCount} Songs, {totalTime}</p>
                <table className="table table-inverse table-sm songs-view">
                    {this.getHeader(columns)}
                    <tbody>{rows}</tbody>
                </table>
            </div>
        );
    }

}

export default Songs;
