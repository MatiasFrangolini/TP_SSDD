export default class CheckpointsStateHelper {
    static getCheckpoints() {
        return JSON.parse(sessionStorage.getItem('checkpoints'));
    }

    static setCheckpoints(checkpoints) {
        sessionStorage.setItem('checkpoints', JSON.stringify(checkpoints));
    }
}