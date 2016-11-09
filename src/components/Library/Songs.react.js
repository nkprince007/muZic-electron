import React from 'react';
import _ from 'lodash';

import utils from '../../utilities/utils';

import SongRow from './SongRow.react';

class Songs extends React.Component {
    static propTypes = {
        library: React.PropTypes.array,
        trackPlayingId: React.PropTypes.string,
        status: React.PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            selected: [],
            scrollTop: 0
        };

        this.getHeader = this.getHeader.bind(this);
        this.scrollList = this.scrollList.bind(this);

        this.rowHeight = 68;
    }

    getHeader(columns = []) {
        const headers = [];
        columns.forEach((col, i) => {
            headers.push(<th key={ i }>{col}</th>);
        });
        return (
           <thead>
               <tr>
                   <th>&nbsp;</th>
                   {headers}
               </tr>
           </thead>
        );
    }

    scrollList() {
        this.setState({ scrollTop: document.querySelector('.songs-viewbox').scrollTop });
    }

    render() {
        const library = this.props.library;
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

                return (
                    <tbody key={ indexChunk }>
                        { list }
                    </tbody>
                );
            });

        // const list = library.map((track, index) => {
        //     duration += track.duration;
        //     const playing = track._id === trackPlayingId;

        //     return (
        //         <SongRow
        //             status={ this.props.status }
        //             track={ track }
        //             index={ index }
        //             key={ index }
        //             trackPlayingId={ trackPlayingId }
        //             playing={ playing }
        //         />
        //     );
        // });

        const columns = ['Song', 'Genre', 'Plays'];
        const songCount = utils.getFormatted('SONG_COUNT', rowCount);
        const totalTime = utils.getFormatted('TOTAL_DURATION', duration);

        {/*style={ { height: rowCount * this.rowHeight } } */}

        return (
            <div onScroll={ this.scrollList } className="songs-viewbox">
                <h1>Songs</h1>
                <p>{songCount} Songs, {totalTime}</p>
                <table style={ { height: rowCount * this.rowHeight } } className="table table-inverse table-sm songs-view">
                    {this.getHeader(columns)}
                    {trackTiles}
                </table>
            </div>
        );
    }

}

export default Songs;
