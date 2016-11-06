import React from 'react';

class Songs extends React.Component {

    constructor(props) {
        super(props);
        this.getHeader = this.getHeader.bind(this);
        this.getSong = this.getSong.bind(this);
    }

    getHeader(props = {}) {
       return (
           <thead>
                <tr>
                    <th> </th>
                    <th>Song</th>
                    <th>Artists</th>
                    <th>Album</th>
                    <th>Genre</th>
                    <th>Plays</th>
                </tr>
           </thead>
       );
    }

    getSong(data = {}) {
        return (
            <tr>
                <td></td>
                <td>Song Name</td>
                <td>Artists</td>
                <td>Album Name</td>
                <td>Genre</td>
                <td>Plays</td>
            </tr>
        );
    }

    render() {
        return (
            <table className="table table-inverse songs-view">
                {this.getHeader()}
                <tbody>
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                    {this.getSong()}
                </tbody>
            </table>
        );
    }

}

export default Songs;
