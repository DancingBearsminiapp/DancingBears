  // Example array of updates and future news
  const updates = [
    { title: "Dancing Bears", content: "memecoin game on telegram" },
    { title: "Dancing Bears", content: "following ours officals channel for more INFORMATION / news" },
];

const futureNews = [
    { title: "Dancing Bears", content: "Free PartnerShip for promotion Dancing Bear Competition " },
    { title: "Dancing Bears", content: "More Categories Option to More Earn Bear Coin will be available " },
];

// Function to display the posts
function displayPosts() {
    const updatesList = document.getElementById('updates-list');
    const futureNewsList = document.getElementById('future-news-list');
    
    // Display updates
    updates.forEach(update => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<h3>${update.title}</h3><p>${update.content}</p>`;
        updatesList.appendChild(listItem);
    });
    
    // Display future news
    futureNews.forEach(news => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<h3>${news.title}</h3><p>${news.content}</p>`;
        futureNewsList.appendChild(listItem);
    });
}

// Run the function on page load
window.onload = displayPosts;

// Check if there are saved posts in localStorage
const savedUpdates = JSON.parse(localStorage.getItem('updates')) || updates;
const savedFutureNews = JSON.parse(localStorage.getItem('futureNews')) || futureNews;

// Function to save new posts
function savePosts() {
    localStorage.setItem('updates', JSON.stringify(savedUpdates));
    localStorage.setItem('futureNews', JSON.stringify(savedFutureNews));
}