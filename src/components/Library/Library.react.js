import React from 'react';
import { Link } from 'react-router';

import AppActions from '../../actions/AppActions';

class Library extends React.Component {
    static propTypes = {
        library: React.PropTypes.array,
        children: React.PropTypes.object,
        trackPlayingId: React.PropTypes.string,
        status: React.PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.addMusic = this.addMusic.bind(this);
        this.getLibraryComponent = this.getLibraryComponent.bind(this);
    }

    getLibraryComponent() {
        if (this.props.library === null) {
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
                    <a onClick={ this.addMusic }>add your music here</a>
                  </p>
                </div>
            );
        }

        return React.cloneElement(this.props.children, {
            library: this.props.library,
            trackPlayingId: this.props.trackPlayingId,
            status: this.props.status
        });
    }

    addMusic() {
        AppActions.library.addFolders();
    }

    render() {
        return (
            <div className='library'>
              <ul className='nav nav-pills'>
                <li className='nav-item'>
                  <Link className="nav-link active" to='library/songs'>Songs</Link>
                </li>
                <li className='nav-item'>
                  <Link to='library/albums'>Albums</Link>
                </li>
                <li className='nav-item'>
                  <Link to='library/artists'>Artists</Link>
                </li>
              </ul>
              <div className='library-content'>
                {this.getLibraryComponent()}
              </div>
            </div>
        );
    }
}

export default Library;
