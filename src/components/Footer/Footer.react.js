//Components
import PlayerControls from './PlayerControls.react';

import React from 'react';

export default class App extends React.Component {
    static propTypes = {
        app: React.PropTypes.object,
        cover: React.PropTypes.string,
        playerStatus: React.PropTypes.string,
        queue: React.PropTypes.array,
        queueCursor: React.PropTypes.number,
        repeat: React.PropTypes.bool,
        shuffle: React.PropTypes.bool
    }

    render() {
        return (
            <footer className='footer'>
                <PlayerControls
                    app={ this }
                    playerStatus={ this.props.playerStatus }
                    repeat={ this.props.repeat }
                    shuffle={ this.props.shuffle }
                    cover={ this.props.cover }
                    queue={ this.props.queue }
                    queueCursor={ this.props.queueCursor }
                />
            </footer>
        );
    }
}
