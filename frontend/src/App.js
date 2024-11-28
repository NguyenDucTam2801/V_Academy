import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import {LoginPage} from "./pages/LoginPage";
import ContactPage from "./pages/ContactPage";
import CourseListPage from "./pages/CourseListPage";
import CourseEngBasic from "./pages/CourseBasicEng";
// import CourseInfoPageGeneralMath from "./pages/CourseInfoPageGeneralMath";
import CourseInfoPageGeneralEng from "./pages/CourseInfoPageGeneralEng";
import CourseEngAdvanced from "./pages/CourseAdvancedEng";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<HomePage/>}/>
        <Route path="/home_page" element={<HomePage/>} />
        <Route path="/login_page" element={<LoginPage/>} />
        <Route path="/contact_page" element={<ContactPage/>} />
        <Route path="/cirriculum_page" element={<CourseListPage/>} />
        {/* <Route path="/mathCourse_info_page" element={<CourseInfoPageGeneralMath/>} /> */}
        <Route path="/englishCourse_info_page" element={<CourseInfoPageGeneralEng/>} />
        <Route path="/basic_english_course_page" element={<CourseEngBasic/>} />
        <Route path="/advanced_english_course_page" element={<CourseEngAdvanced/>} />
      </Routes>
    </Router>
  );
}

export default App;
