import React from 'react';
import { connect } from 'react-redux';

//Libraries
import app from '../lib/app';

//Store
import store from '../store';

//Components
import Header from './Header/Header.react';
import Footer from './Footer/Footer.react';

// console.log(store.refreshProgress);

class App extends React.Component {
    render() {
        const store = this.props.store;

        return (
            <div>
                <Header windowControls={!{ ...app.config.getAll() }.useNativeFrame} />
                <div className='main-content'>
                    { React.cloneElement(
                        this.props.children, {
                            app: this,
                            config: { ...app.config.getAll() },
                            refreshingLibrary: store.refreshingLibrary,
                            refreshProgress: store.refreshProgress,
                            songs: store.tracks[store.tracksCursor].sub,
                            library: store.tracks[store.tracksCursor].all
                        })
                    }
                </div>
                <Footer />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { store: { ...state } };
}

export default connect(mapStateToProps)(App);
