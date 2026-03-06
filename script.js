// -----------------------------
// AIPune Feed - script.js
// -----------------------------

// Your API key (replace with your own if needed)
const apiKey = "add20b6368414bf3be252076d7d1b0b2";

// RSS feed URL (Times of India Pune)
const rssUrl = "https://timesofindia.indiatimes.com/rssfeeds/1221656.cms";

// Container in HTML
const newsContainer = document.querySelector("#news-container");

// Function to fetch verified news
async function loadNews() {
    // Show loading message
    newsContainer.innerHTML = `<p>Loading latest news...</p>`;

    try {
        // Fetch news from RSS2JSON API
        const response = await fetch(
            `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}&api_key=${apiKey}`
        );

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();

        if (!data.items || data.items.length === 0) {
            newsContainer.innerHTML = `<p>No news available right now.</p>`;
            return;
        }

        // Build news cards
        const newsHtml = data.items.slice(0, 5).map(item => {
            return `
                <div class="news-card">
                    <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
                    <p>${item.pubDate ? new Date(item.pubDate).toLocaleString() : ""}</p>
                    <p>${item.description ? item.description.slice(0, 120) + "..." : ""}</p>
                </div>
            `;
        }).join("");

        newsContainer.innerHTML = newsHtml;

    } catch (error) {
        console.error("Error loading news:", error);
        newsContainer.innerHTML = `<p>Unable to load news right now. Please refresh.</p>`;
    }
}

// Call loadNews when page loads
window.addEventListener("DOMContentLoaded", loadNews);

// -----------------------------
// Placeholder: Hot Trending / Unverified News
// -----------------------------
const trendingContainer = document.querySelector(".trending-news");
if (trendingContainer) {
    trendingContainer.innerHTML = `
        <p>Hot trending topics will appear here soon.</p>
        <p>⚠️ Disclaimer: These are unverified topics.</p>
    `;
}