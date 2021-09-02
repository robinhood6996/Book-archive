
const loadBooks = () => {
    const inputField = document.getElementById('search-field');
    const parentDiv = document.getElementById('search-result');

    //Clear element while searching
    messageToggle('none', '');
    parentDiv.textContent = '';
    inputField.textContent = '';
    spinnerToggle('block');

    //get input value and fetch data from api
    const inputValue = inputField.value;
    const url = `http://openlibrary.org/search.json?q=${inputValue}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data));
}

//Result Count styles for hide and show
const messageToggle = (style, text, color = 'white') => {
    const count = document.getElementById('message');
    count.style.display = style;
    count.style.color = color;
    count.innerText = text;
}


//Loading spinner toggle
const spinnerToggle = style => {
    const spinner = document.getElementById('spinner');
    spinner.style.display = style;
}

//display books functionality
const displayBooks = books => {
    console.log(books);
    //check the input value, if no realted result found show Error
    if (books.docs.length === 0) {
        spinnerToggle('none');
        messageToggle('block', 'No Result Found', 'red');
    }

    //Loop throung over found book list
    books.docs.forEach(item => {
        const parentDiv = document.getElementById('search-result');
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `<div class="card h-100">
                        <img width="250px" height="400px" src="https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg"
                            class="card-img-top" alt="img">
                        <div class="card-body">
                            <h5 class="card-title">${item.title}</h5><hr>
                            <p class="card-text author" ><span class='label'>Author:</span>  ${item.author_name ? item.author_name[0] : ' No Author found'} </p>
                            <p class="card-text"><span class='label'>Publisher:</span> ${item.publisher ? item.publisher : ' No Publisher found'} </p>
                            <p class="card-text"><span class='label'>First Published At:</span> ${item.first_publish_year ? item.first_publish_year : ' First Publish Date Not Found'} </p>
                        </div>
                       
                    </div>`;

        //Append result and hide spinner, show array length           
        parentDiv.appendChild(div);
        spinnerToggle('none');
        messageToggle('block', `Showing ${books.docs.length} fo ${books.numFound} Books`);
    }
    )
};