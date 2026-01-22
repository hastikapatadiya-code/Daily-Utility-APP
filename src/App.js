import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import "./App.css";
import Contact from "./Components/Contact";
import ContactList from "./Components/ContactList";
import About from "./Components/About";
import DailyTodo from "./Components/DailyTodo";
import DailyExpense from "./Components/DailyExpense";
import Login from "./Components/Login";
import News from "./News";
import Weather from "./Components/Weather";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contactlist" element={<ContactList />} />
          <Route path="/dailytodo" element={<DailyTodo />} /> 
          <Route path="/dailyexpense" element={<DailyExpense />}/>
          <Route path="/news" element={<News />}></Route>
          <Route path="/weather" element={<Weather />} />
          <Route path="/login" element={<Login />} />
          <Route path="/footer" element={<Footer />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
