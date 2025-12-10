let currentPage = 1;
let currentLang = "en";
let currentSeed = 1;
let currentLikes = 3.5;
let limit = 20;

// ===========================
// DOM ELEMENTS
// ===========================

const tableView = document.getElementById("tableView");
const galleryView = document.getElementById("galleryView");
const tableBody = document.getElementById("songTableBody");
const pagination = document.getElementById("pagination");

const btnTable = document.getElementById("btnTable");
const btnGallery = document.getElementById("btnGallery");

const inputLang = document.getElementById("lang");
const inputSeed = document.getElementById("seed");
const inputLikes = document.getElementById("likes");

// ===========================
// INITIAL LOAD
// ===========================

loadSongs();

// ===========================
// LOAD SONGS FROM API
// ===========================

function loadSongs() {
    const url = `/api/songs?lang=${currentLang}&seed=${currentSeed}&likes=${currentLikes}&page=${currentPage}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            renderTable(data.items);
            renderPagination(data.page);
        })
        .catch(err => console.error("API error:", err));
}

// ===========================
// RENDER TABLE
// ===========================

function renderTable(songs) {
    tableBody.innerHTML = "";

    songs.forEach(song => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${song.index}</td>
            <td>${song.title}</td>
            <td>${song.artist}</td>
            <td>${song.album}</td>
            <td>${song.genre}</td>
        `;

        tableBody.appendChild(row);
    });
}

// ===========================
// RENDER PAGINATION
// ===========================

function renderPagination(page) {
    pagination.innerHTML = "";

    // Determine pages to show (current - 1, current, current + 1)
    // But ensure we start at least at 1
    let startPage = Math.max(1, page - 1);
    // If we are at page 1, show 1, 2, 3
    if (page === 1) startPage = 1;
    
    const pagesToShow = [startPage, startPage + 1, startPage + 2];

    // Prev button
    const prev = document.createElement("li");
    prev.className = "page-item" + (page === 1 ? " disabled" : "");
    prev.innerHTML = `<a class="page-link" href="#">Previous</a>`;
    prev.onclick = (e) => {
        e.preventDefault();
        if (page > 1) {
            currentPage--;
            loadSongs();
        }
    };
    pagination.appendChild(prev);

    // Page numbers
    pagesToShow.forEach(num => {
        const item = document.createElement("li");
        item.className = "page-item" + (num === page ? " active" : "");
        item.innerHTML = `<a class="page-link" href="#">${num}</a>`;
        item.onclick = (e) => {
            e.preventDefault();
            currentPage = num;
            loadSongs();
        };
        pagination.appendChild(item);
    });

    // Next button
    const next = document.createElement("li");
    next.className = "page-item";
    next.innerHTML = `<a class="page-link" href="#">Next</a>`;
    next.onclick = (e) => {
        e.preventDefault();
        currentPage++;
        loadSongs();
    };
    pagination.appendChild(next);
}


// ===========================
// EVENT LISTENERS
// ===========================

inputLang.addEventListener("change", () => {
    currentLang = inputLang.value;
    currentPage = 1;
    loadSongs();
});

inputSeed.addEventListener("input", () => {
    currentSeed = inputSeed.value;
    currentPage = 1;
    loadSongs();
});

inputLikes.addEventListener("input", () => {
    currentLikes = inputLikes.value;
    document.getElementById("likesNum").innerText = currentLikes;
    currentPage = 1;
    loadSongs();
});

btnTable.addEventListener("click", () => {
    btnTable.classList.add("active");
    btnGallery.classList.remove("active");

    tableView.classList.remove("d-none");
    galleryView.classList.add("d-none");
});

btnGallery.addEventListener("click", () => {
    btnGallery.classList.add("active");
    btnTable.classList.remove("active");

    tableView.classList.add("d-none");
    galleryView.classList.remove("d-none");
});
