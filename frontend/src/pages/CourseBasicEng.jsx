import React from 'react'
import "../styles/pages/CourseInfoPage.css";
import { NavBar } from '../components/outside/NavBar';
import Footer from '../components/outside/Footer';
import background from "../assets/background.jpg";
import timeIcon from "../assets/Time_icon.png"
import courseIcon from "../assets/course_icon2.png"
import feeIcon from "../assets/fee_icon.png"

function CourseBasicEng() {
  return (
    <div>
      <NavBar/>
      <div className="course-info-page">
        {/* Header Section */}
        <div className="course-header" style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
          <h1>English - Basic</h1>
          <p>Master English with V_Academy—engaging, practical, and empowering learning for all levels!</p>
          <div className="course-stats">
            <div className="stat">
              <img src={timeIcon} alt='time icon'/>
              <h2>4 Months</h2>
            </div>
            <div className="stat">
              <img src={courseIcon} alt='course icon'/>
              <h2>5 Courses</h2>
            </div>
            <div className="stat">
              <img src={feeIcon} alt='fee icon'/>
              <h2>5 Million</h2>
            </div>
          </div>
          <a href='contact_page'><button className="register-button">Register now</button></a>
        </div>

        {/* Subjects Section */}
        {/* <div className="course-subjects">
          <h2>List of subjects</h2>
          <div className="subject-tabs">
            <button className="tab">Basic</button>
            <button className="tab">Advanced</button>
          </div>
        </div> */}

        {/* Course Details Section */}
        <div className="course-details">
          <h2>Course details</h2>
          <p>
          Our Basic English course focuses on building foundational skills essential for effective communication. Ideal for beginners, it covers:
            <ol>
                <li>Grammar Fundamentals: Learn the essential rules of English grammar to construct clear and correct sentences.</li>
                <li>Vocabulary Building: Develop a rich vocabulary to improve comprehension and expression.</li>
                <li>Listening and Speaking Skills: Gain confidence in everyday conversations with practical exercises.</li>
                <li>Reading Comprehension: Understand and analyze simple texts to enhance critical thinking.</li>
                <li>Writing Practice: Begin writing clear and concise paragraphs using correct structure.</li>
            </ol>
            By the end of this level, students will have the tools to communicate effectively in common situations, paving the way for academic and professional success.
          </p>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default CourseBasicEng