/** @function displayMaps
 * This function updates the div with id "forecast" on the 
 * page to display the forcast contained in the data argument.
 * @param {object} data - the forecast object from api.weather.gov 
 */
function displayMaps(data){
    var display = document.getElementById("showmaps");
    display.textContent = "";
    const url = "https://open.mapquestapi.com/staticmap/v4/getmap?key=xUKTW6hFYMieaxS4W19rh5JAVaZQ8xNU&size=600,400&zoom=13&pois=purple,";
    for(let i = 0; i<data.length; i++){
      var card = document.createElement("div");
      var map = document.createElement("img");
      map.src = url + data[i].lat + "," + data[i].lng + ",-20,-20";
      var loc = document.createElement("p");
      loc.textContent = data[i].name;
      card.appendChild(map);
      card.appendChild(loc);
      display.appendChild(card);
    };
}
/** @function useXHR 
 * Uses an XMLHttpRequest to fetch data from box-locations.JSON
 */
function useXHR(){
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', ()=>{
      displayMaps(JSON.parse(xhr.responseText));
      
    });
    xhr.onreadystatechange = function(event){
      if(xhr.readyState === 4 && request.status === 200) {
        displayMaps(JSON.parse(request.responseText));
      }
    }
    xhr.open("GET", "box-locations.json");
    xhr.send();
}


useXHR();

console.log("hello world");