import React from 'react'
import { NavBar } from '../components/outside/NavBar'
import "../styles/pages/HomePage.css";
import introImage from "../assets/img-7.jpg"
import mathIcon from "../assets/math_icon.png"
import engIcon from "../assets/english_icon.png"
import Footer from '../components/outside/Footer';

function HomePage() {
  return (
    <div>
        <NavBar/>

        {/* Introduction section */}
        <div className="introFrame-container"style={
              {
                backgroundImage: `url(${introImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed"
              }
            }>
            <div className="homepage-intro-container">
              <div className="text-section">
                  <h1>Welcome to V-Academy!</h1>
                  <p>Welcome to V_Academy – where learning meets excellence! At V_Academy, we believe in unlocking every student's potential by making education accessible, engaging, and empowering. We offer focused courses in Math and English, designed to meet you at your current skill level and guide you to mastery. Whether you’re building foundational skills or advancing your knowledge, our dedicated team is here to support you at every step. Join a community that values growth, curiosity, and the power of knowledge. Start your learning journey with us and watch yourself succeed!</p>
                  <a href='/Contact'><button className="register-button">Register</button></a>
              </div>
            </div>
        </div>

        {/* Courses section */}
        <div className="courseFrame-container">
          <h1>Our Courses</h1>
          <div className="course-cards">
            <div className="course-card">
                <img src={mathIcon} alt='math icon'/>
              <span>Math</span>
            </div>
            <div className="course-card">
                <img src={engIcon} alt='english icon'/>
              <span>English</span>
            </div>
          </div>
        </div>

        {/* Method section */}
        <div className='wholeApproach-container'>
          <div className="study-approach-container">
            <h2>Study approach</h2>
            
            <div className="cards-container">
              <div className="study-card">
                <h4>Assessment & Goal Setting</h4>
                <div className="card-content">
                  <p>We start by understanding each student's strengths and learning goals. Through a quick assessment, we identify the right starting point to ensure a personalized and effective learning experience.</p>
                </div>
                <div className="connector"></div>
              </div>

              <div className="study-card">
                <div className="card-content">
                  <h4>Engaging Lessons</h4>
                  <p>Each lesson is crafted to be interactive, clear, and engaging. Our instructors break down complex topics, making learning enjoyable and ensuring each concept is thoroughly understood.</p>
                </div>
                <div className="connector"></div>
              </div>

              <div className="study-card">
                <div className="card-content">
                  <h4>Practice & Application</h4>
                  <p>Learning is solidified through practice. Our curriculum includes hands-on exercises and real-world examples, allowing students to apply what they learn and build confidence in their skills.</p>
                </div>
                <div className="connector"></div>
              </div>

              <div className="study-card">
                <div className="card-content">
                  <h4>Feedback & Progress Tracking</h4>
                  <p>Regular feedback and progress reports help keep students on track. We celebrate improvements and provide targeted support, ensuring students continuously progress towards their goals.</p>
                </div>
              </div>
            </div>
            <button className="register-btn"><a href='/Contact'>Register</a></button>
          </div>
        </div>

        <Footer/>
    </div>
  )
}

export default HomePage
