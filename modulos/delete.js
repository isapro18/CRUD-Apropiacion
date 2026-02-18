// Eliminar tarea (DELETE)
async function eliminarTarea(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
  listarTareas(); // refrescar lista
}

// Cargar tareas al inicio
listarTareas();