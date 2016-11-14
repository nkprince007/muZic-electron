import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

//Libraries
import app from '../lib/app';

//Components
import Header from './Header/Header.react';
import Footer from './Footer/Footer.react';


class App extends React.Component {
    static propTypes = {
        store: React.PropTypes.object,
        children: React.PropTypes.object
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
                                app: this,
                                config: { ...app.config.getAll() },
                                refreshingLibrary: store.refreshingLibrary,
                                refreshProgress: store.refreshProgress,
                                queue: store.queue,
                                playlists: store.playlists,
                                filteredTracks: store.tracks[store.tracksCursor].sub,
                                library: store.tracks[store.tracksCursor].all,
                                albums: store.albums.all,
                                filteredAlbums: store.albums.sub,
                                trackPlayingId,
                                status: store.playerStatus
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
