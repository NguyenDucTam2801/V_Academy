import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import {LoginPage} from "./pages/LoginPage";
import ContactPage from "./pages/ContactPage";
import CourseListPage from "./pages/CourseListPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<HomePage/>}/>
        <Route path="/home_page" element={<HomePage/>} />
        <Route path="/login_page" element={<LoginPage/>} />
        <Route path="/contact_page" element={<ContactPage/>} />
        <Route path="/cirriculum_page" element={<CourseListPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
