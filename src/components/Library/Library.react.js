import React from 'react';
import { Link } from 'react-router';

import Songs from './Songs.react';

class Library extends React.Component {
    render() {
        return (
            <div className='library'>
                <ul className='nav nav-pills'>
                    <li className='nav-item'>
                        <Link className="nav-link active" to='library/songs'>Songs</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='library/albums'>Albums</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='library/artists'>Artists</Link>
                    </li>
                </ul>
                <div className='library-content'>
                {
                    React.cloneElement(this.props.children, {
                    })
                }
                </div>
            </div>
        );
    }
}

export default Library;
