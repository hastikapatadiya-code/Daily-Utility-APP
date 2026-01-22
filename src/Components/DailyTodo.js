import React, { useState } from "react";
import Navbar from "./Navbar";

function DailyTodo() {
  const [task, setTask] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);

  const addOrUpdateTask = () => {
    if (!task || !time || !date) return;

    if (editId) {
      // UPDATE
      setTasks(
        tasks.map((t) =>
          t.id === editId
            ? { ...t, task, time, date }
            : t
        )
      );
      setEditId(null);
    } else {
      // ADD
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          task,
          time,
          date,
        },
      ]);
    }

    // Clear inputs
    setTask("");
    setTime("");
    setDate("");
  };

  const editTask = (taskObj) => {
    setTask(taskObj.task);
    setTime(taskObj.time);
    setDate(taskObj.date);
    setEditId(taskObj.id);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <>
    <Navbar />
      <div className="container">
      <h2 className="pt-5 text-center my-5 ">Daily Task List</h2>

      {/* Inputs */}
      <div className="form justify-content-center">
        <input
          type="text"
          placeholder="Task name"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button onClick={addOrUpdateTask}>
          {editId ? "Update Task" : "Add Task"}
        </button>
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Task</th>
            <th>Time</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No tasks added
              </td>
            </tr>
          ) : (
            tasks.map((t, index) => (
              <tr key={t.id}>
                <td>{index + 1}</td>
                <td>{t.task}</td>
                <td>{t.time}</td>
                <td>{t.date}</td>
                <td>
                  <button onClick={() => editTask(t)}>✏️</button>
                  <button onClick={() => deleteTask(t.id)}>🗑️</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
    </>
  );
}


export default DailyTodo;
