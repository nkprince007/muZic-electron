import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

import AppActions from '../../actions/AppActions';

class SettingsLibrary extends React.Component {
    static propTypes = {
        config: React.PropTypes.object
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
            </div>
        );
    }

}

export default SettingsLibrary;