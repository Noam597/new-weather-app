import React,{useState,useEffect} from 'react';
import styles from './frontPage.module.css'
import { cities } from './cities';
import axios from 'axios';


export const FrontPage = () => {

    const [query, setQuery] = useState('Jerusalem');
    const [cityName, setCityName] = useState([...cities]);
    const [weatherStats, setWeatherStats] = useState('');
    const [selectBar, setSelectBar] = useState('')
    const [weatherIcon, setWeatherIcon] = useState('');
    const [temp_min, setTemp_min] = useState('');
    const [temp_max, setTemp_max] = useState('');
    const [clock, setClock] = useState();
    const [fontBackground, setFontBackground] = useState('')
    const [weatherBackground, setWeatherBackground] = useState();



    useEffect(() => {
        
        setInterval(() => {
            let time = new Date()
            setClock(time.toLocaleTimeString())
            // console.log(time.getHours());
            if(time.getHours() >= 16 && time.getHours() <18){
                setWeatherBackground(`${styles.dusk}`)
                setFontBackground(`${styles.clock_night}`)
                setSelectBar(`${styles.selectDusk}`)
            }
            else if(time.getHours() >= 18){
                setWeatherBackground(`${styles.night}`)
                setFontBackground(`${styles.clock_night}`)
                setSelectBar(`${styles.selectNight}`)
            } else if(time.getHours() >= 5 && time.getHours() < 8){
                setWeatherBackground(`${styles.early_morning}`)
                setFontBackground(`${styles.clock}`)
                setSelectBar(`${styles.selectAfternoon}`)
            }else if(time.getHours() >= 8 && time.getHours() < 16){
            setWeatherBackground(`${styles.afternoon}`)
            setFontBackground(`${styles.clock}`)
            setSelectBar(`${styles.selectAfternoon}`)
        }
        }, 1000);
      
    }, [weatherBackground,])
    const currentDate = (d)=>{
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
       let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

       
       let day = days[d.getDay()]
       let date = d.getDate()
      let month =months[d.getMonth()]
       let year = d.getFullYear()
   return `${day} ${date} ${month} ${year}`
  };

    // const getWeather = ()=>{
    //     axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${query},il&units=metric&APPID=34d5ded21f34b228638abfd12a6759cd`)
    //     .then(res=>{
    //         console.log(res.data.main);
    //         console.log(res.data.weather[0].main);
    //         setTemp_min(`${res.data.main.temp_min}`);
    //         setTemp_max(`${res.data.main.temp_max}`);
    //         const icon = res.data.weather[0].main;
    //         if(icon == 'Clouds'){
    //             setWeatherIcon("fas fa-cloud")
    //         }else if(icon === "Rain" || "Thunderstorm"){
    //             setWeatherIcon('fas fa-cloud-showers-heavy')
    //         }else if(icon === "Drizzle"){
    //             setWeatherIcon('fas fa-cloud-sun-rain')}
    //             else if(icon === "Snow"){
    //                 setWeatherIcon('fas fa-snowflake')}
    //                 else if(icon === "Clear"){
    //                     setWeatherIcon('fas fa-sun')}
    //                     else{
    //                         setWeatherIcon('fas fa-wind">')
    //                     }
    //     })
    // };

    useEffect(() => {
          

         axios.get(`${process.env.REACT_APP_WEATHER_URL}?q=${query},il&units=metric&APPID=${process.env.REACT_APP_API_ID}`)
        .then(res=>{
            console.log(res.data.main);
            console.log(res.data.weather[0].main);
            setTemp_min(`${res.data.main.temp_min}`);
            setTemp_max(`${res.data.main.temp_max}`);
            const icon = res.data.weather[0].main;
            if(icon == 'Clouds'){
                setWeatherIcon("fas fa-cloud")
            }
            else if(icon === "Rain"){
                setWeatherIcon('fas fa-cloud-showers-heavy')
            }
              else if(icon === "Thunderstorm"){
                setWeatherIcon('fas fa-cloud-showers-heavy')
            }
            else if(icon == "Drizzle"){
                setWeatherIcon('fas fa-cloud-sun-rain')}
                else if(icon === "Snow"){
                    setWeatherIcon('fas fa-snowflake')}
                    else if(icon === "Clear"){
                        setWeatherIcon("fas fa-sun")}
                        else{
                            setWeatherIcon('fas fa-wind">')
                        }
                        
                   
        })
      
    }, [query,weatherIcon]);
    


  return <div className={weatherBackground}>
      <div>
          <label className={styles.label}>Select City: 
      <select className={selectBar} value={query} onChange={e=>{setQuery(e.target.value)}}>
               {cityName.map((city,i)=>
                    
                    <option key={i} value={city} >{city}</option>
                   
               )} </select></label></div>
      <div>
                  
               <h2 className={fontBackground}>{currentDate(new Date())}</h2>   <br/></div>
               <h1 className={fontBackground}>{query}</h1>
      <h3>temperture {temp_min}° - {temp_max}°</h3>
      <h1 className={fontBackground}><i className={weatherIcon}></i> </h1>
      {/* <button onClick={getWeather}>get the weather</button> */}
      
                 <span>{weatherStats} </span>

                 <p className={fontBackground}>{clock}</p>
  </div>;
};
