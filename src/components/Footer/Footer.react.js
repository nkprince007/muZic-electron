import React from 'react';

//Components
import PlayerControls from './PlayerControls.react';

export default class App extends React.Component {
    static propTypes = {
        app: React.PropTypes.object,
        playerStatus: React.PropTypes.string,
        repeat: React.PropTypes.bool,
        shuffle: React.PropTypes.bool,
        queue: React.PropTypes.array,
        cover: React.PropTypes.string,
        queueCursor: React.PropTypes.number
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
