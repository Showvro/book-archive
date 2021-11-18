//Get Input
const resultDiv = document.getElementById('book-result');
const searchField = document.getElementById('search-value');
const error = document.getElementById('error');
// console.log(error);


//display Book
const searchBook = () => {
    error.textContent = '';
    resultDiv.textContent = '';
    const searchText = searchField.value;
    searchField.value = '';
    if (searchText != '') {
        const url = ` https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayResults(data.docs, data))

    } else {
        error.innerHTML = `
        <h1 class="text-center text-warning mt-5">Enter a valid input!</h1>
        `
    }
}
//Display Result
const displayResults = (books, data) => {
    // console.log(books);
    if (books.length == 0) {
        error.innerHTML = `
        <h1 class="text-center text-warning mt-5">No Result Found!</h1>
        `
    } else {
        error.innerHTML = `
        <p>${books.length} found of ${data.numFound}</p>
        `
        books.forEach(book => {

            // console.log(book);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top p-3">
                <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p>By <span class="text-danger">${book.author_name}</span></p>
                <p class="card-text"></p>
                <p class="card-text">First Published in ${book.first_publish_year}</p>
                <p class="card-text"><span class="fw-bold">Publisher:</span> ${book.publisher}</p>
                </div>
            </div>`
            resultDiv.appendChild(div);
        })
    }
}
