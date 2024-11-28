import React from 'react'
import "../styles/pages/CourseInfoPage.css";
import { NavBar } from '../components/outside/NavBar';
import Footer from '../components/outside/Footer';
import background from "../assets/background.jpg";
import timeIcon from "../assets/Time_icon.png"
import courseIcon from "../assets/course_icon2.png"
import feeIcon from "../assets/fee_icon.png"

function CourseAdvancedEng() {
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
          <h1>English - Advanced</h1>
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

        {/* Course Details Section */}
        <div className="course-details">
          <h2>Course details</h2>
          <p>
          The Advanced English course is tailored for those looking to refine their skills and achieve mastery in the language. This course focuses on:
            <ol>
                <li>Advanced Grammar and Usage: Delve deeper into complex grammatical structures for professional and academic writing.</li>
                <li>Rich Vocabulary Expansion: Learn nuanced words, idioms, and expressions to enhance fluency and precision.</li>
                <li>Public Speaking and Presentation Skills: Master articulation, confidence, and clarity in formal communication settings.</li>
                <li>Critical Reading and Analysis: Engage with challenging texts, from literature to articles, to develop analytical and interpretative skills.</li>
                <li>Creative and Professional Writing: Learn to write essays, reports, and creative pieces with clarity, originality, and impact.</li>
            </ol>
            By the end of this level, students will be well-equipped to handle advanced communication scenarios, excel in academic and professional environments, and express themselves confidently.
          </p>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default CourseAdvancedEng