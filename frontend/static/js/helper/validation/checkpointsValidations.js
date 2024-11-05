export const validateNewCheckpoint = ({ id, lat, long, description }) => {
    if (!id || !lat || !long || !description) {
        alert('Todos los campos son requeridos.');
        return;
    }

    if (description.length < 5 || description.length > 100) {
        alert('La descripcion debe tener entre 5 y 100 caracteres.');
        return;
    }
}