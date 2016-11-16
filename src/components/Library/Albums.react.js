import React from 'react';
import utils from '../../utilities/utils';
import Masonry from 'masonry-layout';

import AlbumRow from './AlbumRow.react';
import AppActions from '../../actions/AppActions';


class Albums extends React.Component {
    static propTypes = {
        library: React.PropTypes.array,
        trackPlayingId: React.PropTypes.string,
        status: React.PropTypes.string,
    }

    constructor(props) {
        super(props);

        this.masonryCreate = this.masonryCreate.bind(this);
        this.search = this.search.bind(this);
    }

    masonryCreate() {
        new Masonry('.album-grid', {
            isAnimated: true,
            itemSelector: '.album-item',
            stagger: 50
        });
    }

    componentDidMount() {
        this.masonryCreate();
    }

    componentDidUpdate() {
        this.masonryCreate();
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
                    <div className="search">
                        <input onChange={ this.search } type="text" placeholder="Search..." />
                        <img src="dist/img/magnifier.svg" />
                    </div>
                    <p><b>{ noOfAlbums }</b> Albums &#x25cf; <b>{ noOfSongs }</b> Songs</p>
                </div>
                <div className="lib-container album-grid">
                    { r }
                </div>
            </div>
        );
    }

    search(e) {
        AppActions.library.searchAlbums(e.target.value);
    }
}

export default Albums;
