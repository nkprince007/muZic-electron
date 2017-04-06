import { Link } from 'react-router';
import React from 'react';
import path from 'path';

class AlbumRow extends React.Component {
    static propTypes = {
        album: React.PropTypes.object
    };

    constructor(props) {
        super(props);
        this.cover = 'dist/img/album.svg';
    }

    render() {
        const album = this.props.album;
        const title = album.title;
        const year = album.year;
        const artists = album.artists.join(', ');
        const albumLink = path.join('library', 'albums', album._id);

        return(
            <Link to={ albumLink }>
                <div className='album-item'>
                    <img src={ this.cover } />
                    <h5>{artists}</h5>
                    <span>{ year }</span>
                    <h3>{title}</h3>
                </div>
            </Link>
        );
    }
}

export default AlbumRow;
