import React from 'react';
import { Link } from 'react-router';

import AppActions from '../../actions/AppActions';

class Library extends React.Component {
    static propTypes = {
        library: React.PropTypes.array,
        children: React.PropTypes.object,
        trackPlayingId: React.PropTypes.string,
        status: React.PropTypes.string,
        albums: React.PropTypes.array,
        filteredTracks: React.PropTypes.array,
        filteredAlbums: React.PropTypes.array,
        refreshProgress: React.PropTypes.number
    };

    constructor(props) {
        super(props);
        this.addMusic = this.addMusic.bind(this);
        this.getLibraryComponent = this.getLibraryComponent.bind(this);
    }

    getLibraryComponent() {
        this.child = this.props.children.type.name;
        this.library = this.props.library;
        if (this.child === 'Albums') {
            this.library = this.props.filteredAlbums || this.props.albums;
        } else if (this.child === 'AlbumDetailed') {
            this.library = this.props.albums;
            this.songs = this.props.library;
        }

        if (this.props.library === null || this.props.refreshProgress !== 0) {
            return (
                <div className='library-empty'>
                  <p>Loading library...</p>
                </div>
            );
        }

        if (this.props.library.length === 0) {
            return (
                <div className='library-empty'>
                  <p>Too bad, there is no music in your library =(</p>
                  <p className='sub-message'>
                    <span>nothing found yet, but that&apos;s fine, you can always </span>
                    <Link to="settings/library">add your music here</Link>
                  </p>
                </div>
            );
        }

        return React.cloneElement(this.props.children, {
            library: this.library,
            trackPlayingId: this.props.trackPlayingId,
            status: this.props.status,
            songs: this.songs,
            filteredTracks: this.props.filteredTracks
        });
    }

    addMusic() {
        AppActions.library.addFolders();
    }

    render() {
        return (
            <div className='library'>
              <div className='library-content'>
                {this.getLibraryComponent()}
              </div>
            </div>
        );
    }
}

export default Library;
