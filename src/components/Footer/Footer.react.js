import React from 'react';

//Components
import PlayerControls from './PlayerControls.react';

export default class App extends React.Component {
    render() {
        return (
            <footer className='row footer'>
                <PlayerControls />
            </footer>
        );
    }
}
