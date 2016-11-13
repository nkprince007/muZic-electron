import React from 'react';

class AlbumRow extends React.Component {
    static propTypes = {
        index: React.PropTypes.number
    };

    render() {
        let str = 'Use securing confined his shutters. ';
        str += 'Delightful as he it acceptance an solicitude discretion reasonably. ';
        str += 'Carriage we husbands advanced an perceive greatest. ';
        str += 'Totally dearest expense on demesne ye he. ';
        str += 'Curiosity excellent commanded in me. ';
        str += 'Unpleasing impression themselves to at assistance acceptance my or. ';
        str += 'On consider laughter civility offended oh.';

        return(
            <div className='album-item'>
                <img src='dist/img/album.svg' />
                <p>{ str }</p>
            </div>
        );
    }
}

export default AlbumRow;
