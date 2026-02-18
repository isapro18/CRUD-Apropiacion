// Módulo encargado de obtener (GET) y renderizar las tareas en el DOM
export const listarTareas = async (urlBase, contenedor) => {
    try {
        const respuesta = await fetch(`${urlBase}/tareas`);
        
        if (!respuesta.ok) throw new Error("Fallo en la respuesta del servidor.");
        
        const tareas = await respuesta.json();
        
        // Verificación de datos en consola
        console.log("Datos recibidos:", tareas);

        contenedor.innerHTML = '';

        // Iteramos las tareas (limitado a las primeras 5 para la vista)
        tareas.slice(0, 5).forEach(tarea => {
            const li = document.createElement('li');
            li.dataset.id = tarea.id;

            // Lógica condicional: Si la tarea está completada, asignamos la clase visual
            if (tarea.completada) {
                li.classList.add('tarea-completada');
            }
            
            // Validación de la descripción para evitar valores 'undefined'
            const descripcionTexto = tarea.descripcion ? tarea.descripcion : "";

            li.innerHTML = `
                <div class="info">
                    <strong>${tarea.nombreTarea}</strong> 
                    <p style="margin: 0; color: gray; font-size: 0.9em;">${descripcionTexto}</p>
                </div>
                <div class="acciones">
                    <button class="updateBtn" 
                        data-nombre="${tarea.nombreTarea}" 
                        data-descripcion="${descripcionTexto}">
                        Actualizar
                    </button>
                    
                    <button class="deleteBtn">Eliminar</button>
                    
                    <button class="statusBtn" data-estado="${tarea.completada}">
                        ${tarea.completada ? 'Desmarcar' : 'Completar'}
                    </button>
                </div>
            `;
            
            contenedor.appendChild(li);
        });

    } catch (error) {
        console.error("Error crítico al intentar listar:", error);
    }
};