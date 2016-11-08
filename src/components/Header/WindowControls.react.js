import React from 'react';

import AppActions from '../../actions/AppActions';

export default class WindowControls extends React.Component {

    winClose() {
        AppActions.close();
    }

    winMinimize() {
        AppActions.minimize();
    }

    winMaximize() {
        AppActions.fullScreen();
    }

    render() {
        return (
            <div className="window-controls clearfix">
                <ul className="window-control-buttons">
                    <li onClick={ this.winClose } />
                    <li onClick={ this.winMinimize } />
                    <li onClick={ this.winMaximize } />
                </ul>
                <p className="title">muZic</p>
            </div>
        );
    }
}
