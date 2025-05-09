import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-container">
      <h2>About Weather App</h2>
      
      <div className="about-section">
        <h3>My Mission</h3>
        <p>
            เว็บไซต์ Weather Report ผมทำขึ้นเพื่อ พัฒนาทักษะด้านการเขียนเว็บ การเขียนReact การใช้ API โดยการดึงข้อมูลการพยากรณ์สภาพอากาศเมืองต่างๆ จาก OpenWeatherMap
        </p>
      </div>
      
      <div className="about-section">
        <h3>Features</h3>
        <ul className="about-features">
          <li><strong>Weather Report</strong>: รับและ แสดงข้อมูลสภาพอากาศปัจจุบันของเมืองต่างๆ ทั่วโลก</li>
          <li><strong>Weather Forecast</strong>: ดูพยากรณ์อากาศรายละเอียดสำหรับ 5 วันข้างหน้าของเมือง</li>
          <li><strong>Weather Tips</strong>: ให้คำแนะนำสำหรับการแต่งกายและรับมือตามสภาพอากาศ</li>
        </ul>
      </div>
      
      <div className="about-section">
        <h3>Data Sources</h3>
        <p>
          
          Special thanks to <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer" className='link-web-api'>
            OpenWeatherMap
          </a>{' '}for providing the weather data API used in this project.
        </p>
      </div>
      
      <div className="about-section">
        <h3>Contact Us</h3>
        <div className="contact-info">
          <p>Email: teeraponghmc@gmail.com</p>
          <p>Phone: 065-994-8815</p>
        </div>
      </div>
    </div>
  );
};

export default About;
