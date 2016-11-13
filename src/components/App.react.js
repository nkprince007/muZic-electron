import React from 'react';
import { connect } from 'react-redux';

//Libraries
import app from '../lib/app';

//Components
import Header from './Header/Header.react';
import Footer from './Footer/Footer.react';

// console.log(store.refreshProgress);

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
                <div className='main-content'>
                    { React.cloneElement(
                        this.props.children, {
                            app: this,
                            config: { ...app.config.getAll() },
                            refreshingLibrary: store.refreshingLibrary,
                            refreshProgress: store.refreshProgress,
                            queue: store.queue,
                            playlists: store.playlists,
                            tracks: store.tracks[store.tracksCursor].sub,
                            library: store.tracks[store.tracksCursor].all,
                            albums: store.albums.all,
                            trackPlayingId,
                            status: store.playerStatus
                        })
                    }
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
