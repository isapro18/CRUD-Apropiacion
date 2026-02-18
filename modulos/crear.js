// Crear tarea (POST)
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nuevaTarea = {
    title: taskInput.value,
    completed: false
  };

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevaTarea)
  });

  taskInput.value = "";
  listarTareas(); // refresca la lista
});


