export const isNewCheckPointValid = (newCheckPoint) => {
    return !(
        !newCheckPoint ||
        typeof newCheckPoint !== "object" ||
        !newCheckPoint.lat ||
        !newCheckPoint.long ||
        !newCheckPoint.description
    );
}