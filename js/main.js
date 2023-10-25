const moviesArray = movies.slice(0, 10);

const elMovieWrapper = document.querySelector(".movie__wrapper");
const elForm = document.querySelector(".hero__form");
const elInputRating = document.querySelector(".form__rating");
const elResult = document.querySelector(".hero__render__result")
const elTemplate = document.querySelector("#movies__template__card").content;


// function normolizeArray(array) {
//     const newArray = []
//     array.forEach(item => {
//         const newObject = {}

//         newObject.title = item.Title.toString();
//         newObject.img = `https://i.ytimg.com/vi/${item.ytid}/mqdefault.jpg`
//         newObject.moviesYear = item.movie_year;
//         newObject.rating = item.imdb_rating;
//         newObject.videoUrl = `https://www.youtube.com/watch?v=${item.ytid}`;
//         newObject.categories = item.Categories
//         newArray.push(newObject)
//     });
//     return newArray
// }


const newArray1 = moviesArray.map(function(item) {
    return {
        title: item.Title.toString(),
        img: `https://i.ytimg.com/vi/${item.ytid}/mqdefault.jpg`,
        moviesYear: item.movie_year,
        rating: item.imdb_rating,
        videoUrl: `https://www.youtube.com/watch?v=${item.ytid}`,
        categories: item.Categories.split("|")
    }
});

function renderMovies(array, wrapper) {
    wrapper.innerHTML = null;
    elResult.textContent = array.length
    const tempFragment = document.createDocumentFragment()

    for (const item of array) {
        const templateItem = elTemplate.cloneNode(true);

        templateItem.querySelector(".movies__img").src = item.img;
        templateItem.querySelector(".movies__title").textContent = item.title;
        templateItem.querySelector(".movies__year").textContent = item.moviesYear;
        templateItem.querySelector(".movies__rating").textContent = item.rating;
        templateItem.querySelector(".movies__categories").textContent = item.categories;
        templateItem.querySelector(".movies__url").href = item.videoUrl
        templateItem.querySelector(".movies__url").target = "_blank"

        tempFragment.appendChild(templateItem)
    }
    wrapper.appendChild(tempFragment)
}

renderMovies(newArray1, elMovieWrapper);

elForm.addEventListener("submit", function(evt) {
    evt.preventDefault()

    const inputRating = elInputRating.value.trim();
    console.log(inputRating);
})

const filteredMoviesByYear = newArray1.filter(function (item) {
    const result = ((item.moviesYear >= 2017) && (item.rating >= 7))
    return result
})
renderMovies(filteredMoviesByYear, elMovieWrapper);