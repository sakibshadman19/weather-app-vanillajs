window.addEventListener("load",()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let degreeSection = document.querySelector(".degree-section")
    let degreeSpan = document.querySelector(".degree-section span")

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
           long = position.coords.longitude;
           lat = position.coords.latitude;

           const proxy = "https://cors-anywhere.herokuapp.com/";
            // const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
            const key  ="349604ed83ccf1f3df7cfeddd55d2810";

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=349604ed83ccf1f3df7cfeddd55d2810`;

            fetch(api).then(response => {
                return response.json();
            }).then(data=>{
                console.log(data);
                 const {main} = data;
                const celcius = main.temp - 273.15;
                 const fahren = 1.8*(main.temp - 273)+ 32;

                temperatureDegree.textContent =fahren.toFixed(2);
                  temperatureDescription.textContent = data.weather[0].description;
                   locationTimezone.textContent = data.sys.country;


                degreeSection.addEventListener("click",()=>{
                    if(degreeSpan.textContent === "F")
                    {degreeSpan.textContent= "C";
                        temperatureDegree.textContent = celcius.toFixed(2);    
                }

                    else
                     {
                        degreeSpan.textContent ="F";
                        temperatureDegree.textContent =fahren.toFixed(2);
                    }
                })
            })

        })
    }
})