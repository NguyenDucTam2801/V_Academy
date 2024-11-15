import React from 'react'
import "../styles/pages/CourseListPage.css";
import { NavBar } from '../components/outside/NavBar'
import Footer from '../components/outside/Footer'
import basicMath from '../assets/basic_math_icon.png'
import basicEng from '../assets/basic_eng_icon.png'
import advancedMath from '../assets/advanced_math_icon.png'
import advancedEng from '../assets/advanced_eng_icon.png'
import background from "../assets/background.jpg";

function CourseListPage() {

    const CourseCard = ({ title, level, icon }) => (
        <div className="course-card">
          <div className="icon-container">
            {icon}
          </div>
          <div className="card-content">
            <h3>{title}</h3>
            <p>{level}</p>
            <button className="more-button">More</button>
          </div>
        </div>
      );

  return (
    <div style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
        <NavBar/>
        <div className="container">
            <h1 className="title">Lists of courses</h1>
            <div className="courses-grid">
                <CourseCard 
                title="Math" 
                level="Basic" 
                icon={
                    <img src={basicMath} alt='basic nath icon'/>
                }
                />
                <CourseCard 
                title="English" 
                level="Basic" 
                icon={
                    <img src={basicEng} alt='basic nath icon'/>
                }
                />
                <CourseCard 
                title="Math" 
                level="Advanced" 
                icon={
                    <img src={advancedMath} alt='basic nath icon'/>
                }
                />
                <CourseCard 
                title="English" 
                level="Advanced" 
                icon={
                    <img src={advancedEng} alt='basic nath icon'/>
                }
                />
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default CourseListPage