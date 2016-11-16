import React from 'react';
import _ from 'lodash';

import utils from '../../utilities/utils';

import SongRow from './SongRow.react';
import AppActions from '../../actions/AppActions';

class Songs extends React.Component {
    static propTypes = {
        library: React.PropTypes.array,
        trackPlayingId: React.PropTypes.string,
        status: React.PropTypes.string,
        filteredTracks: React.PropTypes.array
    }

    constructor(props) {
        super(props);
        this.state = {
            selected: [],
            scrollTop: 0
        };

        this.scrollList = this.scrollList.bind(this);
        this.search = this.search.bind(this);

        this.rowHeight = 69;
        this.correction = 0;
    }

    scrollList() {
        this.setState({ scrollTop: document.querySelector('.lib-viewbox').scrollTop - this.correction });
    }

    render() {
        const library = this.props.filteredTracks || this.props.library;
        const trackPlayingId = this.props.trackPlayingId;

        const chunkLength = 20;
        const tilesToDisplay = 5;
        const tileHeight = this.rowHeight * chunkLength;

        const tracksChunked = utils.chunkArray(library, chunkLength);
        const tilesScrolled = Math.floor(this.state.scrollTop / tileHeight);

        const duration = _.sum(library.map((song) => song.duration));
        const rowCount = library.length;

        const trackTiles = tracksChunked
            .splice(tilesScrolled, tilesToDisplay)
            .map((tracksChunk, indexChunk) => {

                const list = tracksChunk.map((track, index) => {
                    const playing = track._id === trackPlayingId;

                    return (
                        <SongRow
                            status={ this.props.status }
                            track={ track }
                            index={ index }
                            key={ index }
                            trackPlayingId={ trackPlayingId }
                            playing={ playing }
                        />
                    );
                });

                const chunkListScrollHelperClasses = {
                    transform: `translate3d(0, ${ (this.rowHeight * chunkLength * (tilesScrolled + indexChunk)) }px, 0)`
                };

                return (
                    <table key={ indexChunk } style={ chunkListScrollHelperClasses } className="table table-inverse table-sm songs-view songs-table">
                        <tbody>
                            { list }
                        </tbody>
                    </table>
                );
            });

        const songCount = utils.getFormatted('SONG_COUNT', rowCount);
        const totalTime = utils.getFormatted('TOTAL_DURATION', duration);

        return (
            <div onScroll={ this.scrollList } className="lib-viewbox">
                <div className="lib-message">
                    <h1>Songs</h1>
                    <div className="search">
                        <input onChange={ this.search } type="text" placeholder="Search..." />
                        <img src="dist/img/magnifier.svg" />
                    </div>
                    <p><b>{songCount}</b> Songs &#x25cf; <b>{totalTime}</b></p>
                </div>
                <div className="lib-container">
                    <div style={ { height: rowCount * this.rowHeight } }>
                        {trackTiles}
                    </div>
                </div>
            </div>
        );
    }

    search(e) {
        AppActions.library.search(e.target.value);
    }

}

export default Songs;
