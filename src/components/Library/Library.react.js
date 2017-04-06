import AppActions from '../../actions/AppActions';

import { Link } from 'react-router';
import React from 'react';

class Library extends React.Component {
    static propTypes = {
        albums: React.PropTypes.array,
        children: React.PropTypes.object,
        filteredAlbums: React.PropTypes.array,
        filteredTracks: React.PropTypes.array,
        library: React.PropTypes.array,
        refreshProgress: React.PropTypes.number,
        status: React.PropTypes.string,
        trackPlayingId: React.PropTypes.string
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
                <div className="overlay-loader">
                    <div className="loader">
                        <div />
                        <div />
                        <div />
                        <div />
                        <div />
                        <div />
                        <div />
                      </div>
                </div>
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
            filteredTracks: this.props.filteredTracks,
            library: this.library,
            songs: this.songs,
            status: this.props.status,
            trackPlayingId: this.props.trackPlayingId
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
