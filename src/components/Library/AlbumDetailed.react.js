import React from 'react';
import utils from '../../utilities/utils';
import SongRow from './SongRow.react';
// import AppActions from '../../actions/AppActions';

class AlbumDetailed extends React.Component {
    static propTypes = {
        library: React.PropTypes.array,
        params: React.PropTypes.object,
        trackPlayingId: React.PropTypes.string,
        status: React.PropTypes.string
    };

    constructor(props) {
        super(props);
        this.id = this.props.params.albumId;
    }

    render() {
        const albums = this.props.library;
        const album = albums.filter((album) => album._id === this.id)[0];
        const cover = 'dist/img/album.svg';
        let noOfSongs = utils.getFormatted('SONG_COUNT', album.tracks);
        noOfSongs += noOfSongs > 1 ? ' Songs' : ' Song';
        const duration = utils.getFormatted('TOTAL_DURATION', album.duration);
        const artists = album.artists.join(', ');
        const songs = album.songsList;
        const songsRow = [];
        songs.forEach((song, index) => {
            const playing = song._id === this.props.trackPlayingId;
            songsRow.push(
                <SongRow
                    track={ song }
                    index= { index }
                    key = { index }
                    status = { this.props.status }
                    trackPlayingId = { this.props.trackPlayingId }
                    playing = { playing }
                />
            );
        });

        return (
            <div className="album-detailed">
                <div className="lib-message">
                    <img src={ cover } />
                    <div className="album-header">
                        <h1>{ album.title }</h1>
                        <p className="artists">{ artists }</p>
                        <p>{ noOfSongs } &#x25cf; { duration }</p>
                    </div>
                </div>
                <table className="table table-inverse table-sm songs-view songs-table">
                    <tbody>
                        { songsRow }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default AlbumDetailed;