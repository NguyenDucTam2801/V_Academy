import React from 'react'
import "../styles/pages/CourseInfoPage.css";
import { NavBar } from '../components/outside/NavBar';
import Footer from '../components/outside/Footer';
import background from "../assets/background.jpg";
import timeIcon from "../assets/Time_icon.png"
import courseIcon from "../assets/course_icon2.png"
import feeIcon from "../assets/fee_icon.png"

function CourseInfoPageGeneralEng() {
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
          <h1>English</h1>
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
        <div className="course-subjects">
          <h2>List of subjects</h2>
          <div className="subject-tabs">
            <a href='/basic_english_course_page'>
              <button className="tab">Basic</button>
            </a>
            <a href='/advanced_english_course_page'>
              <button className="tab">Advanced</button>
            </a>
          </div>
        </div>

        {/* Course Details Section */}
        <div className="course-details">
          <h2>Course details</h2>
          <p>
          At V_Academy, our English course is thoughtfully designed to empower learners to become confident communicators and proficient language users. Recognizing that language is a cornerstone of personal and professional success, we have created a comprehensive curriculum that caters to students at various stages of their learning journey. Whether your goal is to enhance your communication skills for academic excellence, professional growth, or personal development, our English course provides the tools and support you need to succeed.<br/><br/>

We understand that every learner’s journey is unique. That’s why our course is structured into two progressive levels—Basic and Advanced—to meet the needs of individuals with varying degrees of proficiency. Each level is tailored to ensure a gradual, yet impactful, learning experience, helping students build confidence, competence, and clarity in their use of the English language.<br/><br/>

The Basic English Course lays the foundation for learners who are just starting or those who want to strengthen their core language skills. It focuses on grammar, vocabulary, listening, speaking, reading, and writing to provide a well-rounded understanding of the language. The goal is to equip students with the ability to communicate effectively in everyday situations, whether it’s engaging in conversations, understanding simple texts, or writing basic sentences.<br/><br/>

For those ready to take their skills to the next level, the Advanced English Course offers a more in-depth exploration of the language. This level is designed for students who are already comfortable with the basics and wish to refine their skills for academic, professional, or creative pursuits. Advanced grammar, complex vocabulary, critical analysis, public speaking, and professional writing are just some of the key areas we cover, ensuring students are prepared for higher-level communication challenges.<br/><br/>

At V_Academy, we believe that learning should be more than just gaining knowledge—it should be a transformative experience. That’s why our English course emphasizes engagement, practical application, and measurable progress. Our lessons are interactive, using real-world examples and scenarios to make the learning process enjoyable and relevant. We also provide regular feedback, progress tracking, and personalized support, empowering students to overcome challenges and achieve their goals.<br/><br/>

Whether you’re starting from scratch, brushing up on your skills, or aiming for fluency and mastery, our English course is designed to guide you every step of the way. Join V_Academy and unlock the power of language to open doors, connect with the world, and transform your future.
          </p>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default CourseInfoPageGeneralEng