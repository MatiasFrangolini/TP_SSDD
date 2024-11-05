export const validateNewAnimal = ({ id, name, description }) => {
    if (!id || !name || !description) {
        alert('Todos los campos son requeridos.');
        return;
    }

    if (description.length < 5 || description.length > 100) {
        alert('La descripcion debe tener entre 5 y 100 caracteres.');
        return;
    }
}