export const isNewUserValid = (newUser) => {
    return !(
        !newUser ||
        typeof newUser !== 'object' || 
        !newUser.name || 
        !newUser.roles || 
        !Array.isArray(newUser.roles) || 
        !newUser.password
    );
}