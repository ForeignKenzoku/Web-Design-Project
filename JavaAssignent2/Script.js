// Define the Anime class 
class Anime {
    constructor(id, title, image, description, url) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.description = description;
        this.url = url;
    }

    // Method to display anime details in the UI
    displaySummary() {
        const animeDetails = document.getElementById('animeDetails');
        animeDetails.innerHTML = `
            <h3>${this.title}</h3>
            <img src="${this.image}" alt="${this.title}" style="width:300px;">
            <p>${this.description}</p>
            <a href="${this.url}" target="_blank">More Info</a>
            <button id="addToWatchlistBtn">Add to Watchlist</button>
        `;
        const addToWatchlistBtn = document.getElementById('addToWatchlistBtn');
        addToWatchlistBtn.addEventListener('click', () => {
            addToWatchlist(this);
        });
    }
}

// Define the RecommendedAnime class
class RecommendedAnime extends Anime {
    // Method to display recommended in the UI
    displayRecommendation() {
        const recommendedAnimesSection = document.getElementById('recommendedAnimeList');
        const listItem = document.createElement('div');
        listItem.classList.add('anime-card');
        listItem.innerHTML = `
            <h4>${this.title}</h4>
            <img src="${this.image}" alt="${this.title}">
            <a href="${this.url}" target="_blank">More Info</a>
        `;
        recommendedAnimesSection.appendChild(listItem);
    }
}

// asyncto fetch data based on user query
async function fetchAnimeData(query) {
    const url = `https://api.jikan.moe/v4/anime?q=${query}&limit=1`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.data && data.data.length > 0) {
            const anime = data.data[0];
            const animeData = new Anime(anime.mal_id, anime.title, anime.images.jpg.large_image_url, anime.synopsis, anime.url);
            animeData.displaySummary(); // Display the fetched anime details
            fetchRecommendedAnime(anime.mal_id); // Fetch and display recommended 
        } else {
            throw new Error("Anime not found.");
        }
    } catch (error) {
        console.error("Error fetching anime data:", error);
        alert("Sorry, we couldn't fetch that anime.");
    }
}

// async to fetch recommended based on ID
async function fetchRecommendedAnime(animeId) {
    const url = `https://api.jikan.moe/v4/anime/${animeId}/recommendations`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.data && data.data.length > 0) {
            const filteredRecommendedAnime = data.data.slice(0, 5);
            displayRecommendedAnime(filteredRecommendedAnime); // Display recommended 
        } else {
            console.log("No recommended anime found.");
            const recommendedAnimesSection = document.getElementById('recommendedAnimes');
            recommendedAnimesSection.innerHTML = "<h3>No recommended anime found.</h3>";
        }
    } catch (error) {
        console.error("Error fetching recommended anime:", error);
        const recommendedAnimesSection = document.getElementById('recommendedAnimes');
        recommendedAnimesSection.innerHTML = "<h3>Error fetching recommended anime. Please try again later.</h3>";
    }
}

// Function to display recommended in the UI
function displayRecommendedAnime(recommendedAnimes) {
    const recommendedAnimesSection = document.getElementById('recommendedAnimeList');
    recommendedAnimesSection.innerHTML = ""; // Clear existing content
    if (recommendedAnimes.length === 0) {
        recommendedAnimesSection.innerHTML = "<h3>No recommended anime found.</h3>";
    } else {
        recommendedAnimes.forEach(anime => {
            const recommendedAnime = new RecommendedAnime(
                anime.entry.mal_id, 
                anime.entry.title, 
                anime.entry.images.jpg.image_url, 
                '', 
                anime.entry.url
            );
            recommendedAnime.displayRecommendation(); // Display recommended 
        });
    }
}

// Function to add an anime to the watchlist and save it to localStorage
function addToWatchlist(anime) {
    const watchlist = getWatchlistFromStorage();

    // Check if anime is in the watchlist
    if (!watchlist.some(item => item.title === anime.title)) {
        saveWatchlistItemToStorage(anime); // Save to the watchlist
        updateWatchlistDisplay(); // Update the watchlist display in the UI
    } else {
        alert("This anime is already in your watchlist!");
    }
}

// Function to save a single watchlist item to localStorage
function saveWatchlistItemToStorage(item) {
    const watchlist = getWatchlistFromStorage();
    const updatedWatchlist = [...watchlist, item];
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist)); // Stringify and save the updated watchlist
}

// Function to retrieve the watchlist from localStorage
function getWatchlistFromStorage() {
    const watchlist = localStorage.getItem('watchlist');
    return watchlist ? JSON.parse(watchlist) : []; // Parse and return the watchlist or an empty array
}
// Function to clear the watchlist 
function clearWatchlist() {
    localStorage.removeItem('watchlist'); // Remove the watchlist from localStorage
    updateWatchlistDisplay(); // Update the watchlist display in the UI
}

// Event listener for a clear button 
document.getElementById('clearWatchlistButton').addEventListener('click', clearWatchlist);

// Update watchlist display function to reflect the empty watchlist
function updateWatchlistDisplay() {
    const watchlist = getWatchlistFromStorage();
    const watchlistItems = document.getElementById('watchlistItems');
    watchlistItems.innerHTML = '';

    if (watchlist.length === 0) {
        watchlistItems.innerHTML = '<li>Your watchlist is empty.</li>';
    } else {
        watchlist.forEach(anime => {
            const listItem = document.createElement('li');
            listItem.textContent = anime.title;
            watchlistItems.appendChild(listItem); // Display anime in the watchlist
        });
    }
}


// Event listener to initiate the anime search
document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('animeSearch').value;
    if (query) {
        fetchAnimeData(query); // Fetch anime data based on query
    }
});

// Event listener to update the watchlist display
document.addEventListener('DOMContentLoaded', () => {
    updateWatchlistDisplay(); // Load + display the watchlist from localStorage
});
