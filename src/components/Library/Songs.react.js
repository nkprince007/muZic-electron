import React from 'react';
import utils from '../../utilities/utils';

class Songs extends React.Component {

    constructor(props) {
        super(props);
        this.getHeader = this.getHeader.bind(this);
        this.getSong = this.getSong.bind(this);
    }

    getHeader(props = {}) {
       return (
           <thead>
                <tr>
                    <th> </th>
                    <th>Song</th>
                    <th>Artists</th>
                    <th>Album</th>
                    <th>Genre</th>
                    <th>Plays</th>
                </tr>
           </thead>
       );
    }

    getSong(data = {}) {
        return (
            <tr key={data.key}>
                <td><img /></td>
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
        var duration = 0;
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
        const songCount = utils.getFormatted('SONG_COUNT', rows.length);
        const totalTime = utils.getFormatted('TOTAL_DURATION', duration);

        return (
            <div className="songs-viewbox">
                <h1>Songs</h1>
                <p>{songCount} Songs, {totalTime}</p>
                <table className="table table-inverse table-sm songs-view">
                    {this.getHeader()}
                    <tbody>{rows}</tbody>
                </table>
            </div>
        );
    }

}

export default Songs;
