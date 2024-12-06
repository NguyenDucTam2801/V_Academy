import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import {LoginPage} from "./pages/LoginPage";
import ContactPage from "./pages/ContactPage";
import CourseListPage from "./pages/CourseListPage";
import CourseEngBasic from "./pages/CourseBasicEng";
import CourseInfoPageGeneralEng from "./pages/CourseInfoPageGeneralEng";
import CourseEngAdvanced from "./pages/CourseAdvancedEng";
import StdManagePage from "./pages/StudentManagePage";
import AdminManagePage from "./pages/AdminManagePage";
import ClassDetailPage from "./pages/ClassDetailPage";
import LessonDetailPage from "./pages/LessonDetailPage";
import CreateLessonPage from "./pages/CreateLessonPage";
import CreateClassPage from "./pages/CreateClassPage";
import CreateStudentPage from "./pages/CreateStudentPage";
import CreateTutorPage from "./pages/CreateTutorPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<HomePage/>}/>
        <Route path="/home_page" element={<HomePage/>} />
        <Route path="/login_page" element={<LoginPage/>} />
        <Route path="/contact_page" element={<ContactPage/>} />
        <Route path="/cirriculum_page" element={<CourseListPage/>} />
        <Route path="/englishCourse_info_page" element={<CourseInfoPageGeneralEng/>} />
        <Route path="/basic_english_course_page" element={<CourseEngBasic/>} />
        <Route path="/advanced_english_course_page" element={<CourseEngAdvanced/>} />
        <Route path="/student_dashboard" element={<StdManagePage/>} />
        <Route path="/admin_dashboard" element={<AdminManagePage/>} />
        <Route path="/class_detail/:id" element={<ClassDetailPage/>} />
        <Route path="/lesson_detail/:id" element={<LessonDetailPage/>} />
        <Route path="/create_lesson" element={<CreateLessonPage/>} />
        <Route path="/create_class" element={<CreateClassPage/>} />
        <Route path="/create_student" element={<CreateStudentPage/>} />
        <Route path="/create_tutor" element={<CreateTutorPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
