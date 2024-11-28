import React from 'react'
import "../styles/pages/CourseInfoPage.css";
import { NavBar } from '../components/outside/NavBar';
import Footer from '../components/outside/Footer';
import background from "../assets/background.jpg";
import timeIcon from "../assets/Time_icon.png"
import courseIcon from "../assets/course_icon2.png"
import feeIcon from "../assets/fee_icon.png"

function CourseInfoPageGeneralMath() {
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
          <h1>Math</h1>
          <p>Master math with V_Academy—engaging, practical, and empowering learning for all levels!</p>
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
          <button className="register-button">Register now</button>
        </div>

        {/* Subjects Section */}
        <div className="course-subjects">
          <h2>List of subjects</h2>
          <div className="subject-tabs">
            <button className="tab">Basic</button>
            <button className="tab">Advanced</button>
          </div>
        </div>

        {/* Course Details Section */}
        <div className="course-details">
          <h2>Course details</h2>
          <p>
          At V_Academy, our Math course is designed to build confidence and proficiency at every level, from foundational skills to advanced topics. Starting with a personalized assessment, we identify each student's strengths and learning needs to create a tailored approach. Our engaging lessons break down complex concepts into simple, easy-to-understand steps, ensuring clarity and comprehension.<br/><br/>

The course is divided into two levels: Basic Math and Advanced Math. The Basic Math course covers essential topics such as addition, subtraction, fractions, and basic algebra, laying the groundwork for more complex concepts. The Advanced Math course delves into higher-level topics like algebraic equations, geometry, trigonometry, and calculus, perfect for students aiming to strengthen their skills for further education or real-world applications.<br/><br/>

We focus on hands-on practice and real-world applications to reinforce learning and ensure students understand how math can be used in everyday life. Regular feedback and progress tracking allow us to guide students toward measurable improvement, helping them build both skill and confidence in their math abilities.<br/><br/>

Whether you're just starting or advancing to higher levels, V_Academy’s Math course is designed to empower students to reach their full potential and achieve their goals.
          </p>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default CourseInfoPageGeneralMath