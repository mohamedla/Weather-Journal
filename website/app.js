/* Global Variables */
"{zip code},{country code} &#0176;C";
const zipBaseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=bc64de2e168d38cc1c9b60077ea17b6e&units=metric"; // Personal API Key for OpenWeatherMap API
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

if (typeof window !== 'undefined'){
  // Event listener to add function to existing HTML DOM element
  document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const zip = document.getElementById("zip").value;
    const feel = document.getElementById("feelings").value;
    const error = document.getElementById("error");
    if (/^\d+$/.test(zip)) {
      getWeatherAPI(zipBaseURL, zip + ",us", apiKey)
        .then((data) => {
          sendWeather("http://localhost:8000/add", {
            temp: data.main.temp,
            data: data,
            date: d.toLocaleString("en-GB"),
            feel: feel,
          });
        })
        .then(() => {
          getWeatherApp("http://localhost:8000/getdata");
        });
        error.style.display = "none";
    } else {
      error.style.display = "block";
      error.querySelector("div").innerText =
        "Make sure the zipcode contain only numbers";
    }
  });
}


/* Function to GET Web API Data*/
const getWeatherAPI = async (baseURL, zip, key) => {
  const res = await fetch(baseURL + zip + key);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error); // appropriately handle the error
  }
};
/* Function to POST data */
const sendWeather = async (url = "", data = {}) => {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  try {
    const postData = await res.json();
    return postData;
  } catch (error) {
    console.log("error", error);
  }
};
/* Function to GET Project Data */
const getWeatherApp = async (url = "") => {
  const res = await fetch(url);
  try {
    const endPointData = await res.json();
    document.getElementById("date-span").innerHTML = endPointData.date;
    document.getElementById("temp-span").innerHTML =
      Math.round(endPointData.temp) + "&#0176;C";
    document.getElementById("cont-span").innerHTML = endPointData.feel;
  } catch (error) {
    console.log("error", error);
  }
};