async function loadVerifiedNews() {
  const container = document.getElementById("verified-news");

  if (!container) return;

  container.innerHTML = "Loading latest Pune news...";

  try {
    const response = await fetch("https://e0d54977-8468-453a-83b5-0ce70b37e321-00-28n59oqee5h74.worf.replit.dev/verified-news");

    const data = await response.json();

    container.innerHTML = "";

    if (!data.articles || data.articles.length === 0) {
      container.innerHTML = "No news available right now.";
      return;
    }

    data.articles.forEach(article => {
      const card = document.createElement("div");
      card.className = "news-card";

      const title = document.createElement("h3");
      title.textContent = article.title;

      const source = document.createElement("p");
      source.textContent = "Source: " + article.source.name;

      const date = document.createElement("p");
      const d = new Date(article.publishedAt);
      date.textContent = "Published: " + d.toLocaleString();

      const link = document.createElement("a");
      link.href = article.url;
      link.textContent = "Read Full Article";
      link.target = "_blank";

      card.appendChild(title);
      card.appendChild(source);
      card.appendChild(date);
      card.appendChild(link);

      container.appendChild(card);
    });

  } catch (error) {
    console.error(error);
    container.innerHTML = "Failed to load news.";
  }
}

document.addEventListener("DOMContentLoaded", loadVerifiedNews);