const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");
const searchInput = document.getElementById("searchInput");
const displayDiv = document.getElementById("displayDiv");
const submitBtn = document.getElementById("submitBtn");
const nameinput = document.getElementById("nameinput");
const surnameinput = document.getElementById("surnameinput");
const emailinput = document.getElementById("emailinput");
const helpinput = document.getElementById("helpinput");

searchBtn.addEventListener("click",recommend)
clearBtn.addEventListener("click",serchclear)
submitBtn.addEventListener("click",submit)

document.addEventListener("DOMContentLoaded", () => {
    changewebpage('home');
});

function changewebpage(sectionId) {
    if (sectionId === 'home') {
        searchbar.style.display = 'flex'; 
    } else {
        searchbar.style.display = 'none'; 
    }
    const sections = document.querySelectorAll('section');
    sections.forEach(section => section.classList.remove('active'));
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

function recommend(){
    var xhr = new XMLHttpRequest();
    var url = './travel_recommendation_api.json';
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    var results;
    xhr.onload = function() {
        if (searchInput.value.toLowerCase().includes("beach") || searchInput.value.toLowerCase().includes("temple")){
            displayDiv.innerHTML = "";
            if (searchInput.value.toLowerCase().includes("beach")){
                results = xhr.response.beaches;
            }
            else if (searchInput.value.toLowerCase().includes("temple")){
                results = xhr.response.temples;
            }
            results.forEach(result => {
                var destinationDiv = document.createElement('div');
                destinationDiv.classList.add('destinationDiv');
                var img = document.createElement("img");
                img.src = result.imageUrl
                img.width = 500;                            
                img.height = 300;   
                var name = document.createElement('p');
                name.classList.add('name');
                name.textContent = result.name;
                var description = document.createElement('p');
                description.classList.add('description');
                description.textContent = result.description;
                var visitBtn = document.createElement('button');
                visitBtn.classList.add('visitBtn');
                visitBtn.innerHTML = "Visit";
                destinationDiv.appendChild(img);
                destinationDiv.appendChild(name);
                destinationDiv.appendChild(description);
                destinationDiv.appendChild(visitBtn);
                displayDiv.appendChild(destinationDiv);
            });
        }
        else if(searchInput.value.toLowerCase().includes("australia") || searchInput.value.toLowerCase().includes("japan") ||searchInput.value.toLowerCase().includes("brazil") ){ 
            if (searchInput.value.toLowerCase().includes("australia")){
                var country_value = "Australia";
            }
            else if (searchInput.value.toLowerCase().includes("japan")){
                var country_value = "Japan";
            }
            else{
                var country_value = "Brazil";
            }
            displayDiv.innerHTML = "";
            results = xhr.response.countries;
            results.forEach(result => {
                if (result.name == country_value){
                    result.cities.forEach(city => {
                        var destinationDiv = document.createElement('div');
                        destinationDiv.classList.add('destinationDiv');
                        var img = document.createElement("img");
                        img.src = city.imageUrl
                        img.width = 500;                            
                        img.height = 300;   
                        var name = document.createElement('p');
                        name.classList.add('name');
                        name.textContent = city.name;
                        var description = document.createElement('p');
                        description.classList.add('description');
                        description.textContent = city.description;
                        var visitBtn = document.createElement('button');
                        visitBtn.classList.add('visitBtn');
                        visitBtn.innerHTML = "Visit";
                        destinationDiv.appendChild(img);
                        destinationDiv.appendChild(name);
                        destinationDiv.appendChild(description);
                        destinationDiv.appendChild(visitBtn)
                        displayDiv.appendChild(destinationDiv);
                    });
                }
            }
            );
        }
        else{
            if (searchInput.value != ""){
                alert("Destination is not found. Please try others keyword e.g. beach,temple, or country name.");
                displayDiv.innerHTML = "";
            }
        }
    } 
    xhr.send();
}

function serchclear(){
    searchInput.value = "";
    displayDiv.innerHTML = "";
}
function submit(){
    alert("The form has been send");
    nameinput.value = "";
    surnameinput.value = "";
    emailinput.value = "";
    helpinput.value = "";
}