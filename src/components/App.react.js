import React from 'react';

//Libraries
import app from '../lib/app';

//Store
import store from '../store';

//Components
import Header from './Header/Header.react';
import Footer from './Footer/Footer.react';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Header windowControls={!{ ...app.config.getAll() }.useNativeFrame} />
                <div className='main-content'>
                    {
                        React.cloneElement(this.props.children, {
                            app: this,
                            config: { ...app.config.getAll() },
                            refreshingLibrary: store.refreshingLibrary,
                            refreshProgress: store.refreshProgress
                        })
                    }
                </div>
                <Footer />
            </div>
        );
    }
}
