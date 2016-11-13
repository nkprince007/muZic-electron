import React from 'react';

class AlbumRow extends React.Component {
    static propTypes = {
        index: React.PropTypes.number,
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

        return(
            <div className='album-item'>
                <img src={ this.cover } />
                <span>{year}</span>
                <h5>{artists}</h5>
                <h3>{title}</h3>
            </div>
        );
    }
}

export default AlbumRow;
