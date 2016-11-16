import mmd from 'musicmetadata';
import fs from 'fs';
import path from 'path';
import globby from 'globby';

const utils = {

    isNullOrEmpty: (variable) => (
        variable === null ||
        variable.length === 0 ||
        variable === ''
    ),

    getAudioDuration: (audiopath, callback = () => {}) => {
        const audio = new Audio();

        audio.addEventListener('loadedmetadata', () => {
            callback(null, audio.duration);
        });

        audio.addEventListener('error', (e) => {
            const message = `Error getting the audio duration: (${e.target.error.code}) ${path}`;
            callback(new Error(message), 0);
        });

        audio.preload = 'metadata';
        audio.src = audiopath;
    },

    parseUri: (uri) => {
        const root = process.platform === 'win32' ? '' : path.parse(uri).root;
        const location = uri
            .split(path.sep)
            .map((d, i) => {
                return (i === 0 ? d : encodeURIComponent(d));
            }).reduce((a, b) => path.join(a, b));
        return `file://${root}${location}`;
    },

    chunkArray: (array, chunkLength) => {
        const chunks = [];

        for(let i = 0; i < array.length; i += chunkLength) {
            chunks.push(array.slice(i, i + chunkLength));
        }
        return chunks;
    },

    stripChars: (str) => {
        const accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
        const fixes = 'AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz';
        const split = accents.split('').join('|');
        const reg = new RegExp(`(${split})`, 'g');

        return str
            .replace(reg, (a) => fixes[accents.indexOf(a) || '' ])
            .replace(' ','');
    },

    getMetadata: (track, callback) => {
        const stream = fs.createReadStream(track);
        mmd(stream, { duration: true }, (err, data) => {
            if (err) console.warn(`An error occured while reading ${track} id3 tags: ${err}`);

            const metadata = {
                album: utils.isNullOrEmpty(data.album) ?
                    'Unknown' : data.album,
                albumartist: utils.isNullOrEmpty(data.albumartist) ?
                    ['Unknown Artist'] : data.albumartist,
                artist: utils.isNullOrEmpty(data.artist) ?
                    ['Unknown Artist'] : data.artist,
                title: utils.isNullOrEmpty(data.title) ?
                    path.parse(track).base : data.title,
                year: data.year,
                track: data.track,
                disk: data.disk,
                genre: data.genre,
                path: track,
                playCount: 0,
                duration: data.duration
            };

            metadata.loweredMetas = {
                artist: metadata.artist.map((meta) => utils.stripChars(meta.toLowerCase())),
                album: utils.stripChars(metadata.album.toLowerCase()),
                albumartist: metadata.albumartist.map((meta) => utils.stripChars(meta.toLowerCase())),
                title: utils.stripChars(metadata.title.toLowerCase()),
                genre: metadata.genre.map((meta) => utils.stripChars(meta.toLowerCase()))
            };

            if (metadata.duration === 0) {
                utils.getAudioDuration(track, (_err, duration) => {
                    if (_err) console.warn(duration);

                    metadata.duration = duration;
                    callback(metadata);
                });
            } else {
                callback(metadata);
            }
        });
    },

    removeUselessFolders: (folders) => {
        //duplicates removal
        const filteredFolders = folders.filter((elem, index) =>
             folders.indexOf(elem) === index
        );

        const foldersToBeRemoved = [];

        filteredFolders.forEach((folder, i) => filteredFolders.forEach((subFolder, j) => {
            if (subFolder.includes(folder) && i !== j && !foldersToBeRemoved.includes(folder)) {
                foldersToBeRemoved.push(subFolder);
            }
        }));

        return filteredFolders.filter((elem) => !foldersToBeRemoved.includes(elem));
    },

    getFormatted(type, data) {
        switch (type) {
            case ('SONG_COUNT') : {
                return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
            case ('TOTAL_DURATION') : {
                const time = parseInt(data, 10);
                const hours = parseInt(time / 3600, 10);
                const minutes = parseInt((time % 3600) / 60, 10);
                const seconds = parseInt((time % 60), 10);

                const hoursStr = hours > 0 ? `${hours} hr, ` : '';
                const minStr = minutes > 0 ? `${minutes} min, ` : '';
                const secondsStr = seconds > 0 ? `${seconds} sec` : '';

                if (hoursStr !== '') return hoursStr.concat(minStr.concat(secondsStr));
                else if (hoursStr !== '' && minStr === '') return hoursStr.concat(secondsStr);
                else if (hoursStr === '' && minStr !== '') return minStr.concat(secondsStr);

                return secondsStr;
            }
            default: {
                return data;
            }
        }
    },

    parseBase64(format, data) {
        return `data:image/${format};base64,${data}`;
    },

    fetchCover(trackPath, callback) {
        if (!trackPath) {
            callback(null);
            return;
        }

        const stream = fs.createReadStream(trackPath);

        mmd(stream, (err, data) => {
            if (err) {
                console.warn(err);
            } else {
                if (data.picture[0]) { // If cover in id3 tag
                    const cover = utils.parseBase64(
                        data.picture[0].format,
                        data.picture[0].data.toString('base64')
                    );
                    callback(cover);
                    return;
                }

                //scan folder for cover image
                const folder = path.dirname(trackPath);
                const pattern = path.join(folder, '*');
                globby(pattern, { nodir: true, follow: false }).then((matches) => {
                    const cover = matches.find((elem) => {
                        const parsedPath = path.parse(elem);

                        return ['album', 'albumart', 'folder', 'cover']
                                    .includes(parsedPath.name.toLowerCase())
                            && ['.png', '.jpg', '.bmp', '.gif']
                                    .includes(path.extname(parsedPath.ext.toLowerCase()));
                    });

                    callback(cover);
                    return;
                });
            }
        });
    }
};

export default utils;
