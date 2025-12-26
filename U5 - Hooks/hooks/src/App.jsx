import { useState, useRef, useEffect, useMemo } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";

export default function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addTask = () => {
    const title = text.trim();
    if (!title) return;

    setTasks((prev) => [
      ...prev,
      { id: Date.now(), title, completed: false },
    ]);

    setText("");
    inputRef.current?.focus();
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const filteredTasks = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return tasks;
    return tasks.filter((t) => t.title.toLowerCase().includes(q));
  }, [tasks, search]);

  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <main style={{ padding: 20, maxWidth: 700, margin: "0 auto" }}>
      <h1>Lista de tareas</h1>

      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Nueva tarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addTask}>Agregar</button>
      </div>

      <hr />

      <input
        type="text"
        placeholder="Buscar tarea"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <p>
        Completadas: {completedCount} | Pendientes: {pendingCount}
      </p>

      <ul style={{ paddingLeft: 20 }}>
        {filteredTasks.map((task) => (
          <li key={task.id} className={`task ${task.completed ? "done" : ""}`}>
            <label className="check">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
            </label>

            <span className="title">{task.title}</span>

            <button
              className="delete"
              onClick={() => deleteTask(task.id)}
              aria-label="Eliminar tarea"
            >
              ✕
            </button>
          </li>
        ))}

      </ul>
    </main>
  );
}
