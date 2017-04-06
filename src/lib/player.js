import app from './app';

class Player {
    constructor(options) {
        this.audio = new Audio();

        this.audio.defaultPlaybackRate = options.playbackRate || 1;
        this.audio.playbackRate = options.playbackRate || 1;
        this.audio.volume = options.volume || 1;
        this.audio.muted = options.muted || false;

        this.threshold = 0.75;
        this.durationThresholdReached = false;
    }

    play() {
        this.audio.play();
    }

    pause() {
        this.audio.pause();
    }

    stop() {
        this.audio.pause();
    }

    mute() {
        this.audio.muted = true;
    }

    unmute() {
        this.audio.muted = false;
    }

    getAudio() {
        return this.audio;
    }

    setAudioVolume(volume) {
        this.audio.volume = volume;
    }

    setAudioPlaybackRate(playbackRate) {
        this.audio.playbackRate = playbackRate;
        this.audio.defaultPlaybackRate = playbackRate;
    }

    setAudioSrc(src) {
        this.durationThresholdReached = false;
        this.audio.src = src;
    }

    setAudioCurrentTime(currentTime) {
        this.audio.currentTime = currentTime;
    }

    isThresholdReached() {
        if (!this.durationThresholdReached
        && this.audio.currentTime >= this.audio.duration * this.threshold) {
            this.durationThresholdReached = true;
            return this.durationThresholdReached;
        }
    }
}

export default new Player({
    muted: app.config.get('audioMuted'),
    playbackRate: app.config.get('audioPlaybackRate'),
    volume: app.config.get('audioVolume')
});
