import { listarTareas } from './modulos/listar.js';
import { crearTarea } from './modulos/crear.js';
import { actualizarTarea } from './modulos/actualizar.js';
import { eliminarTarea } from './modulos/delete.js';

const URL_API = "http://localhost:3000";
const listaTareasContainer = document.getElementById('taskList');
const botonGuardar = document.getElementById('addTaskBtn');
const inputTitulo = document.getElementById('taskTitle');
const inputDescripcion = document.getElementById('taskDescription');

// 1. Inicialización: Carga de datos al renderizar el DOM
document.addEventListener('DOMContentLoaded', () => {
    listarTareas(URL_API, listaTareasContainer);
});

// 2. Creación: Lógica para guardar nueva tarea
botonGuardar.addEventListener('click', () => {
    const titulo = inputTitulo.value.trim();
    const descripcion = inputDescripcion.value.trim();

    if (titulo === "") {
        alert("El campo título es obligatorio.");
        return;
    }

    const objetoTarea = {
        nombreTarea: titulo,
        descripcion: descripcion,
        completada: false // Estado inicial por defecto
    };

    crearTarea(URL_API, objetoTarea, () => {
        // Limpieza de campos y recarga de la lista
        inputTitulo.value = '';
        inputDescripcion.value = '';
        listarTareas(URL_API, listaTareasContainer);
    });
});

// 3. Gestión de Eventos en Lista (Delegación)
listaTareasContainer.addEventListener('click', (e) => {
    const boton = e.target;
    const item = boton.closest('li');
    const id = item?.dataset.id; 

    // Si el clic no fue en un elemento relacionado a una tarea, salimos
    if (!id) return;

    // A. ELIMINAR TAREA
    if (boton.classList.contains('deleteBtn')) {
        eliminarTarea(URL_API, id, () => {
            listarTareas(URL_API, listaTareasContainer);
        });
    }

    // B. ACTUALIZAR INFORMACIÓN (Nombre y Descripción)
    if (boton.classList.contains('updateBtn')) {
        const nombreActual = boton.dataset.nombre;
        const descActual = boton.dataset.descripcion;
        
        // Paso 1: Solicitar nuevo título
        const nuevoNombre = prompt("Ingrese el nuevo título:", nombreActual);
        if (nuevoNombre === null) return; // Cancelación por parte del usuario
        
        // Paso 2: Solicitar nueva descripción
        const nuevaDescripcion = prompt("Ingrese la nueva descripción:", descActual);

        // Validación: El título no puede quedar vacío
        if (nuevoNombre.trim() !== "") {
            const datosActualizados = {
                nombreTarea: nuevoNombre.trim(),
                descripcion: nuevaDescripcion ? nuevaDescripcion.trim() : ""
            };

            actualizarTarea(URL_API, id, datosActualizados, () => {
                listarTareas(URL_API, listaTareasContainer);
            });
        } else {
            alert("El título no puede estar vacío.");
        }
    }

    // C. CAMBIAR ESTADO (Completada / Pendiente)
    if (boton.classList.contains('statusBtn')) {
        // Lectura del estado actual desde el atributo data (siempre es string)
        const estadoString = boton.dataset.estado;
        const esCompletada = estadoString === "true"; // Conversión a booleano

        // Inversión del valor lógico (Toggle)
        const nuevoEstado = !esCompletada;

        // Llamada a actualizar solo con la propiedad 'completada'
        actualizarTarea(URL_API, id, { completada: nuevoEstado }, () => {
            listarTareas(URL_API, listaTareasContainer);
        });
    }
});