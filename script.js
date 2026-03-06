///////////////////////////////
// AIPune Feed - script.js
// Fully tested fallback version
// Verified News + Trending / Unverified News
///////////////////////////////

/* -----------------------
   VERIFIED NEWS (Fallback)
------------------------- */
const newsContainer = document.querySelector("#news-container");

const sampleNews = [
    { title: "Pune Weather Today", url: "#", publishedAt: new Date(), description: "Sunny skies and warm temperatures in Pune today." },
    { title: "Traffic Update", url: "#", publishedAt: new Date(), description: "Heavy traffic on FC Road and JM Road, commuters advised to take alternate routes." },
    { title: "Local Event", url: "#", publishedAt: new Date(), description: "Art exhibition opens at Pune Central Park from today." }
];

function loadVerifiedNews() {
    const newsHtml = sampleNews.map(article => `
        <div class="news-card">
            <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
            <p>${article.publishedAt.toLocaleString()}</p>
            <p>${article.description}</p>
        </div>
    `).join("");
    newsContainer.innerHTML = newsHtml;
}

/* -----------------------
   TRENDING / UNVERIFIED NEWS
------------------------- */
const trendingContainer = document.querySelector("#trending-container");

const sampleTrending = [
    { title: "New Cafe Opens in Pune", url: "#" },
    { title: "Traffic Diversion on FC Road", url: "#" },
    { title: "Local Startup Raises Funding", url: "#" }
];

function loadTrendingNews() {
    const trendingHtml = sampleTrending.map(item => `
        <div class="news-card">
            <h3><a href="${item.url}" target="_blank">${item.title}</a></h3>
        </div>
    `).join("");
    trendingContainer.innerHTML = trendingHtml;
}

/* -----------------------
   INITIALIZE EVERYTHING
------------------------- */
window.addEventListener("DOMContentLoaded", () => {
    loadVerifiedNews();
    loadTrendingNews();
});