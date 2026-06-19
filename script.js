const API_KEY = "33538faf591156da859e085226f611f8";

const newsContainer = document.getElementById("newsContainer");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

 
fetchNews("general");

 
async function fetchNews(topic){

    newsContainer.innerHTML = "<h3>Loading...</h3>";

    const url =
    `https://corsproxy.io/?https://gnews.io/api/v4/top-headlines?country=in&lang=en&topic=${topic}&token=${API_KEY}`;

    try{

        const response = await fetch(url);
        const data = await response.json();

        displayNews(data.articles);

    }catch(error){

        newsContainer.innerHTML = "<h3>Failed to load news</h3>";
    }
}

 
function displayNews(articles){

    newsContainer.innerHTML = "";

    if(!articles || articles.length === 0){
        newsContainer.innerHTML = "<h3>No News Found</h3>";
        return;
    }

    articles.forEach(article => {

        const card = document.createElement("div");
        card.className = "news-card";

        card.innerHTML = `
            <img src="${article.image || 'https://via.placeholder.com/300'}">
            <h3>${article.title}</h3>
            <p>${article.description || 'No description available'}</p>
            <a href="${article.url}" target="_blank">Read More</a>
        `;

        newsContainer.appendChild(card);
    });
}
 

async function searchNews(){

    const keyword = searchInput.value.trim();

    if(keyword === ""){
        alert("Enter a topic");
        return;
    }

    const url =
    `https://corsproxy.io/?https://gnews.io/api/v4/search?q=${keyword}&lang=en&token=${API_KEY}`;

    try{

        const response = await fetch(url);
        const data = await response.json();

        displayNews(data.articles);

    }catch(error){

        newsContainer.innerHTML = "<h3>Search Failed</h3>";
    }
}
 

searchBtn.addEventListener("click", searchNews);

 
document.querySelectorAll(".category").forEach(button => {

    button.addEventListener("click", () => {

        fetchNews(button.dataset.topic);

    });

});

 
const darkModeBtn = document.getElementById("darkModeBtn");

darkModeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        darkModeBtn.innerText = "☀️ Light Mode";
    }else{
        darkModeBtn.innerText = "🌙 Dark Mode";
    }

});
