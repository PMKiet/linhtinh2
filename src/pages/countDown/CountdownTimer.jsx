import React, { useEffect, useRef, useState } from 'react';
import { GiAlarmClock } from "react-icons/gi";
import '../../assets/styles/CountTimer/CountTimer.scss'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function CountdownTimer(props) {
     const [startDate, setStartDate] = useState(new Date());
     const [timeDays, setTimeDays] = useState('00')
     const [timeHours, setTimeHours] = useState('00')
     const [timeMinutes, setTimeMinutes] = useState('00')
     const [timeSeconds, setTimeSeconds] = useState('00')


     let interval = useRef()

     const startTimer = () => {
          const countDownDate = startDate.getTime()

          interval = setInterval(() => {
               const now = new Date().getTime()
               const distance = countDownDate - now

               const days = Math.floor(distance / (1000 * 60 * 60 * 24));
               const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
               const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
               const seconds = Math.floor((distance % (1000 * 60)) / 1000);


               if (distance < 0) {
                    //stop our time
                    clearInterval(interval.current)
               } else {
                    //update time
                    setTimeDays(days)
                    setTimeHours(hours)
                    setTimeMinutes(minutes)
                    setTimeSeconds(seconds)
               }

          }, 1000)
     }

     useEffect(() => {
          startTimer();
          return () => {
               clearInterval(interval.current);
          };
     }, [startDate]);

     const handleDateChange = (date) => {
          setStartDate(date);
     };

     return (
          <div className='time-container'>
               <div className='time-card'>
                    <div>
                         <GiAlarmClock className='iconClock' />
                         <h2>CountDown Timer</h2>
                         <DatePicker selected={startDate} onChange={handleDateChange} />
                         <p>CountDown to a really special date, One you could or  world never imagine!</p>
                    </div>

                    <div className='time'>
                         <section>
                              <h2>{timeDays}</h2>
                              <p>Days</p>
                         </section>
                         <h2>:</h2>
                         <section>
                              <h2>{timeHours}</h2>
                              <p>Hours</p>
                         </section>
                         <h2>:</h2>
                         <section>
                              <h2>{timeMinutes}</h2>
                              <p>Minutes</p>
                         </section>
                         <h2>:</h2>
                         <section>
                              <h2>{timeSeconds}</h2>
                              <p>Seconds</p>
                         </section>
                    </div>
               </div>
          </div>
     );
}

export default CountdownTimer;