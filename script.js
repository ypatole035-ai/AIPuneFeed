// -----------------------------
// AIPune Feed - Verified News
// Using NewsAPI.org
// -----------------------------

const apiKey = add20b6368414bf3be252076d7d1b0b2
const newsContainer = document.querySelector("#news-container");

async function loadNews() {
    newsContainer.innerHTML = `<p>Loading latest news...</p>`;

    try {
        const response = await fetch(
            `https://newsapi.org/v2/top-headlines?country=in&category=general&q=Pune&pageSize=5&apiKey=${apiKey}`
        );

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();

        if (!data.articles || data.articles.length === 0) {
            newsContainer.innerHTML = `<p>No news available right now.</p>`;
            return;
        }

        // Build news cards
        const newsHtml = data.articles.map(article => {
            return `
                <div class="news-card">
                    <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
                    <p>${article.publishedAt ? new Date(article.publishedAt).toLocaleString() : ""}</p>
                    <p>${article.description ? article.description.slice(0, 120) + "..." : ""}</p>
                </div>
            `;
        }).join("");

        newsContainer.innerHTML = newsHtml;

    } catch (error) {
        console.error("Error loading news:", error);
        newsContainer.innerHTML = `<p>Unable to load news right now. Please refresh.</p>`;
    }
}

window.addEventListener("DOMContentLoaded", loadNews);