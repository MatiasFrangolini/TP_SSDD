export const validateLogin = (username, password) => {
    if (!username || !password) {
        alert('Ambos campos son requeridos.');
        return false;
    }
    return true;
}