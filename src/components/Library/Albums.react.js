import React from 'react';
import utils from '../../utilities/utils';
import Masonry from 'masonry-layout';

import AlbumRow from './AlbumRow.react';


class Albums extends React.Component {
    static propTypes = {
        library: React.PropTypes.array,
        trackPlayingId: React.PropTypes.string,
        status: React.PropTypes.string,
        albums: React.PropTypes.array
    }

    componentDidMount() {
        new Masonry('.album-grid', {
            isAnimated: true,
            itemSelector: '.album-item'
        });
    }

    render() {
        const albums = this.props.library;

        let noOfAlbums = albums.length;
        let noOfSongs = 0;
        const r = [];
        albums.forEach((album) => {
            noOfSongs += album.tracks;
            r.push(<AlbumRow album={ album } key={ album.title } />);
        });

        noOfAlbums = utils.getFormatted('SONG_COUNT', noOfAlbums);
        noOfSongs = utils.getFormatted('SONG_COUNT', noOfSongs);

        return (
            <div className="lib-viewbox">
                <div className="lib-message">
                    <h1>Albums</h1>
                    <p>{ noOfAlbums } Albums ․ { noOfSongs } Songs</p>
                </div>
                <div className="lib-container album-grid">
                    { r }
                </div>
            </div>
        );
    }
}

export default Albums;
