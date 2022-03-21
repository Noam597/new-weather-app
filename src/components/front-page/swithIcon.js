

const switchIcon =(value)=>{

    let icon = '';

    if(value == 'Clouds'){
        icon ="fas fa-cloud"
    }
    if(value === "Rain"){
        icon ='fas fa-cloud-showers-heavy';
    }
    if(value === "Thunderstorm"){
        icon ='fas fa-cloud-showers-heavy';
    }
     if(value == "Drizzle"){
        icon ='fas fa-cloud-sun-rain';
     }
        if(value === "Snow"){
            icon ='fas fa-snowflake';
        }
        if(value === "Clear"){
            icon ="fas fa-sun";
        }
                // else{
                //     icon ='fas fa-wind';
                // }
                return icon
}

export default switchIcon