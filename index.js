const formEl = document.getElementById("form-element")
const inputEl = document.getElementById("input-element")

formEl.addEventListener("submit", function(e){
    e.preventDefault()

    let inputValue = inputEl.value

    inputEl.value = ""

    getResults(inputValue)


})

let resultIdsArr = []

async function getResults(title) {

    let url =  `http://www.omdbapi.com/?s=${title}&apikey=548efc4e`

    const response = await fetch(url)
    const data = await response.json()

    for (let item of data.Search) {
        resultIdsArr.push(item.imdbID)
    }

    getSearchData()

}

const renderDivEl = document.getElementById("render-here")

function getSearchData() {

    renderDivEl.innerHTML = ""

    for(let id of resultIdsArr) {

    let url =  `http://www.omdbapi.com/?i=${id}&apikey=548efc4e`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            renderSearchData(data)
           
        })
    }

    resultIdsArr = []

}


function renderSearchData(item) {

renderDivEl.innerHTML += `
    <div class="movie margin">
        <img class="movie-poster" src="${item.Poster}" alt="">
        <div class="movie-info">
            <div class="title">
                <h3>${item.Title}</h3>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
                    <path d="M5.78671 1.19529C6.01122 0.504306 6.98878 0.504305 7.21329 1.19529L8.01547 3.66413C8.11588 3.97315 8.40384 4.18237 8.72876 4.18237H11.3247C12.0512 4.18237 12.3533 5.11208 11.7655 5.53913L9.66537 7.06497C9.40251 7.25595 9.29251 7.59447 9.39292 7.90349L10.1951 10.3723C10.4196 11.0633 9.62875 11.6379 9.04097 11.2109L6.94084 9.68503C6.67797 9.49405 6.32203 9.49405 6.05916 9.68503L3.95903 11.2109C3.37125 11.6379 2.58039 11.0633 2.8049 10.3723L3.60708 7.90349C3.70749 7.59448 3.59749 7.25595 3.33463 7.06497L1.2345 5.53914C0.646715 5.11208 0.948796 4.18237 1.67534 4.18237H4.27124C4.59616 4.18237 4.88412 3.97315 4.98453 3.66414L5.78671 1.19529Z" fill="#FEC654"/>
                </svg>
                <p>${item.imdbRating}</p>
            </div>
            <div class="genre">
                <p>${item.Runtime}</p>
                <p>${item.Genre}</p>
                <div class="add-to-watchlist">
                    <i class="fa-solid fa-plus" style="color: #ffffff;"></i>
                    <p data-imdbid="${item.imdbID}">Add to Watchlist</p>
                </div>
            </div>
            <div>
                <p class="desc" id="content">
                    ${item.Plot}
                </p>
            </div>
        </div>
    
    </div>
<hr>

`
}

document.getElementById("render-here").addEventListener("click", function(e){
    const imdbID = e.target.getAttribute("data-imdbid");
    if(imdbID !== null){
        console.log("doctor")
        addtoWatchlist(imdbID)
        }
    
})

function addtoWatchlist(id) {
    let watchList = JSON.parse(localStorage.getItem("watchList")) || [];

    if (!watchList.includes(id)) {
        watchList.push(id);

        // Update the WatchList in localStorage
        localStorage.setItem("watchList", JSON.stringify(watchList));
    }

    console.log(watchList)

}









