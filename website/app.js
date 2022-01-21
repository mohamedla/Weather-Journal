/* Global Variables */
"{zip code},{country code}";
const zipBaseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=bc64de2e168d38cc1c9b60077ea17b6e&units=imperial';// Personal API Key for OpenWeatherMap API
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', async ()=>{
  getWeatherAPI(zipBaseURL,'94040,us',apiKey)
    .then((data)=>{
      sendWeather('/add',{temp: Math.round(data.main.temp) , data: data});
    })
    .then(()=>{
      getWeatherApp('/getdata');
    });
});
/* Function to GET Web API Data*/
const getWeatherAPI = async (baseURL, zip, key)=>{
  const res = await fetch(baseURL+zip+key);
  try {
    const data = await res.json();
    console.log(Math.round(data.main.temp));
    console.log(data);
    return data;
  }  catch(error) {
    console.log("error", error); // appropriately handle the error
  }
}
/* Function to POST data */
const sendWeather = async ( url = '', data = {})=>{
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json',},
    body: JSON.stringify(data),
  });
    try {
      const postData = await res.json();
      return postData
    }catch(error) {
      console.log("error", error);
    }
}
/* Function to GET Project Data */
const getWeatherApp = async (url='')=>{
  const res = await fetch(url);
  try {
    const data = await res.json();
    console.log(data.temp);
    console.log(data.data);
  }  catch(error) {
    console.log("error", error);
  }
}