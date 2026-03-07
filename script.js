///////////////////////////////
// AIPune Feed - Verified News with GNews API + Trending
///////////////////////////////

const newsContainer = document.querySelector("#news-container");
const trendingContainer = document.querySelector("#trending-container");

// Fallback news
const fallbackNews = [
    { title: "Pune Weather Today", url: "#", publishedAt: new Date(), description: "Sunny skies and warm temperatures in Pune today." },
    { title: "Traffic Update", url: "#", publishedAt: new Date(), description: "Heavy traffic on FC Road and JM Road, commuters advised to take alternate routes." },
    { title: "Local Event", url: "#", publishedAt: new Date(), description: "Art exhibition opens at Pune Central Park from today." }
];

// Sample trending topics
const sampleTrending = [
    { title: "New Cafe Opens in Pune", url: "#" },
    { title: "Traffic Diversion on FC Road", url: "#" },
    { title: "Local Startup Raises Funding", url: "#" }
];

// Load Verified News from GNews
async function loadVerifiedNews() {
    newsContainer.innerHTML = `<p>Loading latest news...</p>`;

    const apiKey = "ed32aa16493784eaf9102ccf02d40243"; // <-- your GNews API key
    const apiUrl = `https://gnews.io/api/v4/search?q=Pune&lang=en&country=in&max=5&token=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("GNews API fetch failed");

        const data = await response.json();

        if (!data.articles || data.articles.length === 0) throw new Error("No articles found");

        const newsHtml = data.articles.map(article => `
            <div class="news-card">
                <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
                <p>${article.publishedAt ? new Date(article.publishedAt).toLocaleString() : ""}</p>
                <p>${article.description ? article.description.slice(0, 120) + "..." : ""}</p>
            </div>
        `).join("");

        newsContainer.innerHTML = newsHtml;

    } catch (error) {
        console.warn("GNews API failed, using fallback news:", error);
        const fallbackHtml = fallbackNews.map(article => `
            <div class="news-card">
                <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
                <p>${article.publishedAt.toLocaleString()}</p>
                <p>${article.description}</p>
            </div>
        `).join("");
        newsContainer.innerHTML = fallbackHtml;
    }
}

// Load trending news
function loadTrendingNews() {
    const trendingHtml = sampleTrending.map(item => `
        <div class="news-card">
            <h3><a href="${item.url}" target="_blank">${item.title}</a></h3>
        </div>
    `).join("");
    trendingContainer.innerHTML = trendingHtml;
}

// Initialize
window.addEventListener("DOMContentLoaded", () => {
    loadVerifiedNews();
    loadTrendingNews();
});