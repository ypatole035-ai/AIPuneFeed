// -----------------------------
// AIPune Feed - Verified News
// Using NewsAPI.org with CORS Proxy
// -----------------------------

const apiKey = "add20b6368414bf3be252076d7d1b0b2"; // your NewsAPI key
const newsContainer = document.querySelector("#news-container");

async function loadNews() {
    newsContainer.innerHTML = `<p>Loading latest news...</p>`;

    try {
        // Free CORS proxy to bypass browser restrictions
        const proxyUrl = "https://cors-anywhere.herokuapp.com/";
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&category=general&q=Pune&pageSize=5&apiKey=${apiKey}`;

        const response = await fetch(proxyUrl + apiUrl);

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();

        if (!data.articles || data.articles.length === 0) {
            newsContainer.innerHTML = `<p>No news available right now.</p>`;
            return;
        }

        // Build news cards dynamically
        const newsHtml = data.articles.map(article => `
            <div class="news-card">
                <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
                <p>${article.publishedAt ? new Date(article.publishedAt).toLocaleString() : ""}</p>
                <p>${article.description ? article.description.slice(0, 120) + "..." : ""}</p>
            </div>
        `).join("");

        newsContainer.innerHTML = newsHtml;

    } catch (error) {
        console.error("Error loading news:", error);
        newsContainer.innerHTML = `<p>Unable to load news right now. Please refresh.</p>`;
    }
}

// Load news after page fully loads
window.addEventListener("DOMContentLoaded", loadNews);