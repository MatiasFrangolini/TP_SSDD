export const validateNewAnimal = ({description}) => {
    if (!description) { 
        alert("El campo descripción es obligatorio");
        return false;
    }
    if (description.length < 5 || description.length > 100) {
        alert("La descripción debe tener entre 5 y 100 caracteres");
        return false;
    }
    return true;
};