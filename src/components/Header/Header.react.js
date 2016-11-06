import React from 'react';

//Components
import WindowControls from './WindowControls.react';

export default class App extends React.Component {
    render() {
        return (
            <header className='header'>
                <WindowControls active={this.props.windowControls} />
            </header>
        );
    }
}
