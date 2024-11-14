// El nombre de los animales es opcional
export const isNewAnimalValid = (newAnimal) => {
    return !(
        !newAnimal || 
        !newAnimal.id || 
        !newAnimal.description || 
        typeof newAnimal !== 'object' ||
        typeof newAnimal.description !== 'string'
    );
};