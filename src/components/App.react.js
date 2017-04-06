import Footer from './Footer/Footer.react';
import Header from './Header/Header.react';
import { Link } from 'react-router';
import React from 'react';

import app from '../lib/app';
import { connect } from 'react-redux';

class App extends React.Component {
    static propTypes = {
        children: React.PropTypes.object,
        store: React.PropTypes.object
    };

    render() {
        const store = this.props.store;
        const trackPlayingId = (store.queue.length > 0 && store.queueCursor !== null) ?
            store.queue[store.queueCursor]._id : null;

        return (
            <div>
                <Header windowControls={ !{ ...app.config.getAll() }.useNativeFrame } />
                <div id="sidebar-wrapper">
                    <ul className="sidebar-nav">
                        <li className="sidebar-brand"><a href="#">Library</a></li>
                        <li><hr /></li>
                        <li><Link activeClassName="active" to='library/songs/'>Songs</Link></li>
                        <li><Link activeClassName="active" to='library/albums/'>Albums</Link></li>
                        <li><a href="#">Artists</a></li>
                        <li><a href="#">Playlists</a></li>
                        <li><a href="#">Genres</a></li>

                        <li className="sidebar-brand"><a href="#">Settings</a></li>
                        <li><hr /></li>
                        <li><Link activeClassName="active" to='settings/library/'>Library</Link></li>
                        <li><a href="#">Playback</a></li>
                        <li><a href="#">User Interface</a></li>
                        <li><a href="#">Advanced</a></li>
                    </ul>
                </div>
                <div id="page-content-wrapper">
                    <div className='main-content'>
                        { React.cloneElement(
                            this.props.children, {
                                albums: store.albums.all,
                                app: this,
                                config: { ...app.config.getAll() },
                                filteredAlbums: store.albums.sub,
                                filteredTracks: store.tracks[store.tracksCursor].sub,
                                library: store.tracks[store.tracksCursor].all,
                                playlists: store.playlists,
                                queue: store.queue,
                                refreshProgress: store.refreshProgress,
                                refreshingLibrary: store.refreshingLibrary,
                                status: store.playerStatus,
                                trackPlayingId
                            })
                        }
                    </div>
                </div>
                <Footer
                    app={ this }
                    playerStatus={ store.playerStatus }
                    repeat={ store.repeat }
                    shuffle={ store.shuffle }
                    queue={ store.queue }
                    cover={ store.cover }
                    queueCursor={ store.queueCursor }
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { store: { ...state } };
}

export default connect(mapStateToProps)(App);
