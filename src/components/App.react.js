import React from 'react';

//Libraries
import app from '../lib/app';

//Components
import Header from './Header/Header.react';
import Footer from './Footer/Footer.react';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Header windowControls={!{ ...app.config.getAll() }.useNativeFrame} />
                <Footer />
            </div>
        );
    }
}
