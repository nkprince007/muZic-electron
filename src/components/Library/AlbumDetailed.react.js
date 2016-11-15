import React from 'react';

class AlbumDetailed extends React.Component {
    static propTypes = {
        library: React.PropTypes.array,
        params: React.PropTypes.object
    };

    constructor(props) {
        super(props);
        this.id = this.props.params.albumId;
    }

    render() {
        const albums = this.props.library;
        let album;
        albums.forEach((a) => {
            if(a._id === this.id) {
                album = a;
            }
        });
        console.info(album);
        return (
            <div>
                Welcome to AlbumDetailed
            </div>
        );
    }
}

export default AlbumDetailed;