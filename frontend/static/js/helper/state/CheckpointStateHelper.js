export default class CheckpointStateHelper {
    static getCheckPoints() {
        return JSON.parse(sessionStorage.getItem("checkpoints"));
    }

    static setCheckPoints(checkpoints) {
        sessionStorage.setItem("checkpoints", JSON.stringify(checkpoints));
    }
}