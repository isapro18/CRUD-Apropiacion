/**
 * Envía una petición PATCH para actualizar parcialmente una tarea.
 * @param {string} urlBase - URL del servidor.
 * @param {string} id - Identificador de la tarea.
 * @param {object} datosAEditar - Objeto con las propiedades a modificar (ej: { completada: true }).
 * @param {function} callbackRefrescar - Función para recargar la lista en el DOM.
 */
export const actualizarTarea = async (urlBase, id, datosAEditar, callbackRefrescar) => {
    try {
        // Petición asíncrona usando el método PATCH
        const respuesta = await fetch(`${urlBase}/tareas/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosAEditar)
        });

        if (respuesta.ok) {
            console.log(`Actualización exitosa en tarea ID: ${id}`);
            // Ejecutamos la función de refresco para actualizar la interfaz
            callbackRefrescar();
        } else {
            console.error("Error: El servidor no pudo procesar la solicitud.");
        }

    } catch (error) {
        console.error("Error de conexión durante la actualización:", error);
    }
};