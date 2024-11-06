export const isNewAnimalValid = (newAnimal) => {
    return !(
        !newAnimal ||
        typeof newAnimal !== "object" ||
        !newAnimal.name ||
        !newAnimal.description
    );
}