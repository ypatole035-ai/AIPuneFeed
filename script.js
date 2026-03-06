const newsContainer = document.querySelector("#news-container");

const sampleNews = [
    { title: "Pune Weather Today", url: "#", publishedAt: new Date(), description: "Sunny skies and warm temperatures in Pune today." },
    { title: "Traffic Update", url: "#", publishedAt: new Date(), description: "Heavy traffic on FC Road and JM Road, commuters advised to take alternate routes." },
    { title: "Local Event", url: "#", publishedAt: new Date(), description: "Art exhibition opens at Pune Central Park from today." }
];

function loadNews() {
    const newsHtml = sampleNews.map(article => `
        <div class="news-card">
            <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
            <p>${article.publishedAt.toLocaleString()}</p>
            <p>${article.description}</p>
        </div>
    `).join("");
    newsContainer.innerHTML = newsHtml;
}

window.addEventListener("DOMContentLoaded", loadNews);