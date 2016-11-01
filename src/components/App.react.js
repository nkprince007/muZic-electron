import React from 'react';

//Components
import Header from './Header/Header.react';
import Footer from './Footer/Footer.react';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Footer />
            </div>
        );
    }
}
