import { Button, ButtonGroup, ProgressBar } from 'react-bootstrap';

import AppActions from '../../actions/AppActions';
import React from 'react';

import classnames from 'classnames';

class SettingsLibrary extends React.Component {
    static propTypes = {
        config: React.PropTypes.object,
        refreshProgress: React.PropTypes.number
    };

    constructor(props) {
        super(props);
        this.addFolder = this.addFolder.bind(this);
        this.refreshLibrary = this.refreshLibrary.bind(this);
        this.resetLibrary = this.resetLibrary.bind(this);
        this.removeFolder = this.removeFolder.bind(this);
    }

    addFolder() {
        AppActions.library.addFolders();
    }

    removeFolder(e) {
        const el = e.target;
        const id = el.getAttribute('data-id');
        AppActions.library.removeFolder(id);
    }

    refreshLibrary() {
        AppActions.library.refresh();
    }

    resetLibrary() {
        AppActions.player.stop();
        AppActions.library.reset();
    }

    render() {
        const config = this.props.config;
        const musicFolders = config.musicFolders;
        const liMusicFolders = [];
        musicFolders.forEach((folder, i) => {
            liMusicFolders.push(<li key={ i } >{ folder }<span data-id={ i } onClick={ this.removeFolder }>&times;</span></li>);
        });
        const now = this.props.refreshProgress;
        const classes = classnames({ hidden: now === 0 });

        return (
            <div className="settings-section">
                <h2>Folders</h2>
                <p>we'll search for your music under here...</p>
                <ul className="folder-list">
                    { liMusicFolders }
                </ul>
                <ButtonGroup bsSize="large">
                    <Button onClick={ this.addFolder }>Add Folders</Button>
                    <Button onClick={ this.refreshLibrary }>Refresh Library</Button>
                    <Button onClick={ this.resetLibrary }>Reset Library</Button>
                </ButtonGroup>
                <div className="progress-bar-container">
                    <ProgressBar className={ classes } label={ `${now}%` } now={ this.props.refreshProgress } />
                </div>
            </div>
        );
    }

}

export default SettingsLibrary;
