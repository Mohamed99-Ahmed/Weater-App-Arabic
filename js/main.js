// search btns
const search = document.querySelector('#search');
// cols days
const cols = document.querySelectorAll('main .col')
// today variable
const day = document.querySelector('.day');
const city = document.querySelector('.city');
const todayTemp = document.querySelector('.todayTemp');
const todayImg = document.querySelector('#today-img')
const infoDay = document.querySelector('.info-day');
const wind = document.querySelector('.wind');
const windSpeed = document.querySelector('.wind-speed');
const windDir = document.querySelector('.wind-dir');
// tommorow variables
// const tommorow = document.querySelector('.tommorow');
const dateDay = document.querySelector('.date-day');
const tommorowMax = document.querySelector('.tommorow-max');
const tommorowMin = document.querySelector('.tommorow-min');
const tommorowImg = document.querySelector('.tommorow-img');
const infoTommorow = document.querySelector('.info-tommorow');
// next Tommorwo varibles
const nextDay = document.querySelectorAll('.next-today');
const nextTodayMax  = document.querySelectorAll('.next-today-max');
const nextTodayMin  = document.querySelectorAll('.next-today-min');
const infoNext  = document.querySelectorAll('.info-next');
const nextImg = document.querySelectorAll('.next-img');


// Date varible in js
const week = ["الاحد", "الاثنين", "الثلاثاء", "الاربعاء", "الخميس", "الجمعه", "السبت"];
let d = new Date('2024-12-02');
let dayDate;
let options = {
    month: 'short',
    day: 'numeric',
   };
let dAr = d.toLocaleDateString('ar-SA',options);

// put absolute city in api
let cityApi = `القاهرة`;

// search by name of city
search.addEventListener('input',async ()=>{
    cityApi = search.value;
    await callFucntions();
    // Adding Acitve class to cols after making data from Api
    cols.forEach((El)=>{
        El.classList.add('active');
        // after 2s remove active class from cols
        setTimeout(()=>{
            El.classList.remove('active')
        },2000)
    })
});

// fetching Data wether from api
async function weather(){
    let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=f64708755c8342898c612833242610&q=${cityApi}&lang=ar&days=3`);
    let weather = await data.json();
    // console.log(weather);
    return weather;
}

// today 
function today(data){
    todayImg.setAttribute('src', data.current.condition.icon)
    infoDay.innerHTML = data.current.condition.text ;
    wind.innerHTML = data.current.humidity + '%';
    city.innerHTML = data.location.name;
    todayTemp.innerHTML = data.current.temp_c + `<sup>0</sup>c`;
    windSpeed.innerHTML  =` ${data.current.wind_kph } km\h`;
    windDir.innerHTML = data.current.wind_dir;
        // start date
     d = new Date(data.forecast.forecastday[0].date);
    dayDate = week[d.getDay()];
    day.innerHTML = dayDate;
    dAr = d.toLocaleDateString('ar-SA',options);
    dateDay.innerHTML = dAr;
    
}

// Next Today  >  loop in depend on how many of day you want after today

function nextTommorow(data){
    for(let i = 0; i < 2; i++){
        nextTodayMax[i].innerHTML = data.forecast.forecastday[i + 1].day.maxtemp_c +`<sup>0</sup>c`;
        nextTodayMin[i].innerHTML = data.forecast.forecastday[i + 1].day.mintemp_c + `<sup>0</sup>c`;
        infoNext[i].innerHTML = data.forecast.forecastday[i + 1].day.condition.text;
        nextImg[i].setAttribute('src',data.forecast.forecastday[i +1].day.condition.icon);
        d = new Date(data.forecast.forecastday[i + 1].date);
        dayDate = week[d.getDay()];
        nextDay[i].innerHTML = dayDate;
    }
}
//  call functions 
async function callFucntions(){

    let data = await weather(); 
    today(data);
    nextTommorow(data);
}

callFucntions();


