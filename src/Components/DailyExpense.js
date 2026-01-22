import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("All");
  const isMobile = window.innerWidth < 768;

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Food",
    date: "",
  });

  /* ---------- LOAD & SAVE ---------- */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  /* ---------- CRUD ---------- */
  const submitExpense = (e) => {
    e.preventDefault();
    if (editId) {
      setExpenses(expenses.map((x) => (x.id === editId ? { ...form, id: editId } : x)));
      setEditId(null);
    } else {
      setExpenses([...expenses, { ...form, id: Date.now() }]);
    }
    setForm({ title: "", amount: "", category: "Food", date: "" });
  };

  const editExpense = (exp) => {
    setForm(exp);
    setEditId(exp.id);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  /* ---------- FILTER ---------- */
  const filteredExpenses =
    filter === "All" ? expenses : expenses.filter((e) => e.category === filter);

  const total = filteredExpenses.reduce((sum, e) => sum + Number(e.amount), 0);

  const categoryTotals = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + Number(e.amount);
    return acc;
  }, {});

  /* ---------- CHART DATA ---------- */
  const pieData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  const barData = {
    labels: expenses.map((e) => e.date),
    datasets: [
      {
        label: "Expenses",
        data: expenses.map((e) => e.amount),
        backgroundColor: "#36A2EB",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="container py-4 my-5">
      <h3 className="text-center mb-4">💰 Expense Tracker</h3>

      {/* FORM */}
      <div className="card mb-3">
        <div className="card-body">
          <form onSubmit={submitExpense} className="row g-2">
            <div className="col-12 col-md-3">
              <input className="form-control" placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="col-6 col-md-2">
              <input type="number" className="form-control" placeholder="Amount"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })} />
            </div>
            <div className="col-6 col-md-2">
              <select className="form-select"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}>
                <option>Food</option>
                <option>Travel</option>
                <option>Bills</option>
                <option>Shopping</option>
                <option>Other</option>
              </select>
            </div>
            <div className="col-12 col-md-3">
              <input type="date" className="form-control"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
            <div className="col-12 col-md-2">
              <button className="btn btn-primary w-100">
                {editId ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* FILTER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <select className="form-select w-auto" onChange={(e) => setFilter(e.target.value)}>
          <option>All</option>
          <option>Food</option>
          <option>Travel</option>
          <option>Bills</option>
          <option>Shopping</option>
          <option>Other</option>
        </select>
        <strong>₹ {total}</strong>
      </div>

      {/* CHARTS */}
      <div className="mb-4">
        <div style={{ height: isMobile ? 260 : 320 }}>
          <Pie data={pieData} options={chartOptions} />
        </div>
      </div>

      <div className="mb-4">
        <div style={{ height: isMobile ? 300 : 360 }}>
          <Bar data={barData} options={chartOptions} />
        </div>
      </div>

      {/* TABLE */}
      <div className="table-responsive">
        <table className="table table-bordered table-sm">
          <thead>
            <tr>
              <th>Title</th>
              <th>₹</th>
              <th>Category</th>
              <th>Date</th>
              <th>✏️</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((e) => (
              <tr key={e.id}>
                <td>{e.title}</td>
                <td>{e.amount}</td>
                <td>{e.category}</td>
                <td>{e.date}</td>
                <td>
                  <button onClick={() => editExpense(e)}>✏️</button>
                  <button onClick={() => deleteExpense(e.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExpenseTracker;