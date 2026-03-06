// script.js
async function loadNews() {
  const container = document.getElementById("news-container");
  container.innerHTML = "Loading verified news...";

  const rssUrl = "https://news.google.com/rss/search?q=pune&hl=en-IN&gl=IN&ceid=IN:en";

  try {
    const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`);
    const data = await response.json();

    // Parse RSS XML
    const parser = new DOMParser();
    const xml = parser.parseFromString(data.contents, "text/xml");
    const items = xml.querySelectorAll("item");

    container.innerHTML = "";

    if (!items || items.length === 0) {
      container.innerHTML = "<p>No news available right now.</p>";
      return;
    }

    // Display top 5 news
    items.forEach((item, index) => {
      if (index >= 5) return;

      const title = item.querySelector("title").textContent;
      const link = item.querySelector("link").textContent;
      const pubDate = item.querySelector("pubDate").textContent;

      const card = document.createElement("div");
      card.classList.add("news-card");

      card.innerHTML = `
        <h3>${title}</h3>
        <p><small>${new Date(pubDate).toLocaleString()}</small></p>
        <a href="${link}" target="_blank">Read full article</a>
        <hr>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.log("Error fetching news:", error);
    container.innerHTML = "<p>Unable to load news right now. Please refresh.</p>";
  }
}

loadNews();