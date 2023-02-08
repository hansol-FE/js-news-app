const ajax = new XMLHttpRequest();

const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";

function getData(url) {
  ajax.open("GET", url, false);
  ajax.send();

  return JSON.parse(ajax.response);
}

const newsFeed = getData(NEWS_URL);
console.log("newsFeed", newsFeed);

const container = document.getElementById("root");
const ul = document.createElement("ul");
const content = document.createElement("div");

window.addEventListener("hashchange", () => {
  console.log("hash 변경됨");
  // id 가져오기
  const id = location.hash.substring(1);
  // content 가져오기
  const newsContent = getData(CONTENT_URL.replace("@id", id));

  container.innerHTML = `
        <h1>${newsContent.title}</h1>
        <div>
            <a href="#">목록으로</a>
        </div>
    `;
});

const newsList = [];
newsList.push("<ul>");

for (let i = 0; i < 10; i++) {
  newsList.push(`
    <li>
    <a href="#${newsFeed[i].id}"> ${newsFeed[i].title} 댓글(${newsFeed[i].comments_count})</a>
    </li>`);
}
newsList.push("</ul>");

container.innerHTML = newsList.join("");
