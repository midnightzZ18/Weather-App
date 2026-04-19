import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/WeatherTips.css';

function WeatherTips({ city }) {
  const [weather, setWeather] = useState(null);
  const [tips, setTips] = useState([]);
  const API_KEY = import.meta.env.VITE_API_KEY || '5f31b1bc5d88a35c79c821c5ce03d82c';

  useEffect(() => {
    if (!city) return;

    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      .then((response) => {
        setWeather(response.data);
        const weatherMain = response.data.weather?.[0]?.main || '';
        const temp = response.data.main?.temp || 0; 
        let newTips = [];

        const getTemperatureTips = () => {
          if (temp >= 40) {
            return [
              { text: 'หลีกเลี่ยงแดดและพักในที่ร่ม', icon: 'fa-sun' },
              { text: 'สวมเสื้อผ้าบางสีอ่อน ระบายอากาศดี', icon: 'fa-tshirt' },
              { text: 'ดื่มน้ำมากๆ และพกร่มหรือหมวก', icon: 'fa-tint' },
            ];
          } else if (temp >= 35) {
            return [
              { text: 'สวมเสื้อแขนสั้นและกางเกงขาสั้น ถ้าออกจากบ้านควรพกร่มและ ใส่เสื้อคลุม', icon: 'fa-tshirt' },
              { text: 'ดื่มน้ำเยอะๆ เพื่อป้องกันการขาดน้ำ', icon: 'fa-tint' },
              { text: 'หลีกเลี่ยงการออกแดดนาน', icon: 'fa-sun' },
            ];
          } else if (temp >= 30) {
            return [
              { text: 'สวมเสื้อยืดและกางเกงสบายๆ', icon: 'fa-tshirt' },
              { text: 'ดื่มน้ำบ่อยเพื่อความสดชื่น', icon: 'fa-tint' },
            ];
          } else if (temp >= 25) {
            return [
              { text: 'สวมเสื้อยืดหรือแขนสั้น กางเกงขาสั้นหรือขายาว', icon: 'fa-tshirt' },
              { text: 'แต่งตัวสบาย ๆ ตามใจชอบ', icon: 'fa-smile' },
            ];
          } else if (temp >= 20) {
            return [
              { text: 'สวมเสื้อแขนยาวบาง ๆ และแจ็คเก็ตเบา', icon: 'fa-tshirt' },
              { text: 'พกเสื้อคลุมเผื่ออากาศเย็น', icon: '🧥' },
            ];
          } else if (temp >= 15) {
            return [
              { text: 'สวมเสื้อแขนยาวและแจ็คเก็ต กางเกงขายาว', icon: '🧥' },
              { text: 'ใส่รองเท้าปิดเพื่อความอบอุ่น', icon: 'fa-shoe-prints' },
            ];
          } else if (temp >= 10) {
            return [
              { text: 'สวมเสื้อกันหนาวและฮู้ด ผ้าพันคอ', icon: '🧣' },
              { text: 'เริ่มใส่ถุงมือได้', icon: 'fa-mitten' },
            ];
          } else if (temp >= 5) {
            return [
              { text: 'สวมเสื้อกันหนาวหนาและโค้ท หมวกไหมพรม', icon: '🧥' },
              { text: 'ใส่ถุงมือและถุงเท้าหนา', icon: 'fa-mitten' },
            ];
          } else if (temp >= 0) {
            return [
              { text: 'สวมหลายชั้น: เสื้อฮีทเทค เสื้อไหมพรม โค้ทหนา', icon: '🧥' },
              { text: 'ใส่หมวก ผ้าพันคอ ถุงมือครบ', icon: '🧣' },
            ];
          } else if (temp >= -20) {
            return [
              { text: 'สวมชั้นในกันหนาว ชั้นกลางเก็บความร้อน โค้ทหนา', icon: '🧥' },
              { text: 'ใส่บูทและถุงมือกันลม ระวังน้ำแข็งลื่น', icon: 'fa-mitten' },
            ];
          } else {
            return [
              { text: 'สวมชั้นในกันหนาวและโค้ทหนา ระวังอากาศเยือกแข็ง', icon: 'fa-snowflake' },
              { text: 'ปกป้องผิวจากลมหนาวด้วยผ้าพันคอและหมวก', icon: '🧣' },
            ];
          }
        };

        newTips = getTemperatureTips();

        const getWeatherTips = () => {
          switch (weatherMain.toLowerCase()) {
            case 'rain':
            case 'drizzle':
              return [
                { text: 'พกร่มหรือเสื้อกันฝนเมื่อออกจากบ้าน', icon: 'fa-umbrella' },
                { text: 'สวมรองเท้าที่กันน้ำได้', icon: 'fa-shoe-prints' },
                { text: 'ระวังถนนลื่นในช่วงฝนตก', icon: 'fa-exclamation-triangle' },
              ];
            case 'clear':
              return [
                { text: 'ทาครีมกันแดดเพื่อปกป้องผิว', icon: 'fa-sun' },
                { text: 'สวมแว่นกันแดดเมื่ออยู่กลางแจ้ง', icon: 'fa-glasses' },
              ];
            case 'clouds':
              return [
                { text: 'พกเสื้อแจ็คเก็ตบาง ๆ เผื่ออากาศเปลี่ยน', icon: '🥼' },
                { text: 'ตรวจสอบพยากรณ์ฝนก่อนออกจากบ้าน', icon: 'fa-cloud-rain' },
              ];
            case 'snow':
              return [
                { text: 'สวมเสื้อกันหนาวและถุงมือให้อบอุ่น', icon: 'fa-mitten' },
                { text: 'ระวังพื้นลื่นจากหิมะ', icon: 'fa-snowflake' },
                { text: 'ใช้ยางรถยนต์สำหรับหิมะถ้าขับรถ', icon: 'fa-car' },
              ];
            case 'thunderstorm':
              return [
                { text: 'หลีกเลี่ยงการอยู่นอกอาคารในช่วงพายุ', icon: 'fa-bolt' },
                { text: 'ปิดเครื่องใช้ไฟฟ้าที่ไม่จำเป็น', icon: 'fa-plug' },
                { text: 'เตรียมไฟฉายเผื่อไฟดับ', icon: 'fa-flashlight' },
              ];
            case 'mist':
            case 'haze':
              return [
                { text: 'สวมหน้ากากอนามัยเพื่อป้องกันฝุ่น', icon: 'fa-mask-face' },
                { text: 'หลีกเลี่ยงการออกกำลังกายกลางแจ้ง', icon: 'fa-running' },
                { text: 'ใช้ไฟตัดหมอกเมื่อขับรถ', icon: 'fa-lightbulb' },
              ];
            default:
              return [
                { text: 'ตรวจสอบสภาพอากาศก่อนออกจากบ้าน', icon: 'fa-calendar' },
                { text: 'เตรียมเสื้อผ้าให้เหมาะสม', icon: 'fa-tshirt' },
              ];
          }
        };

        const weatherTips = getWeatherTips();
        const remainingSlots = 5 - newTips.length;
        if (remainingSlots > 0) {
          newTips = [...newTips, ...weatherTips.slice(0, remainingSlots)];
        }

     
        newTips = newTips.slice(0, 4);
        setTips(newTips);
      })
      .catch(() => {
        setWeather(null);
        setTips([{ text: 'ไม่สามารถดึงข้อมูลสภาพอากาศได้', icon: 'fa-times' }]);
      });
  }, [city]);

  return (
    <div className="weather-tips">
      <h2>Tips for {city || 'เมือง'}</h2>
      {weather ? (
        <ul>
          {tips.map((tip, index) => (
            <li key={index} className="tip-item" aria-label={`คำแนะนำ: ${tip.text}`}>
              {tip.icon && tip.icon.startsWith('fa-') ? (
                <i className={`fas ${tip.icon} tip-icon`} aria-hidden="true"></i>
              ) : (
                <span className="tip-icon" role="img" aria-hidden="true">
                  {tip.icon || '🌍'}
                </span>
              )}
              <span className="tip-text">{tip.text}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>กำลังโหลดคำแนะนำ...</p>
      )}
    </div>
  );
}

export default WeatherTips;