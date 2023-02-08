const ajax = new XMLHttpRequest();

const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";

ajax.open("GET", NEWS_URL, false);
ajax.send();

const newsFeed = JSON.parse(ajax.response);
console.log("newsFeed", newsFeed);

const container = document.getElementById("root");
const ul = document.createElement("ul");
const content = document.createElement("div");

window.addEventListener("hashchange", () => {
  console.log("hash 변경됨");
  // id 가져오기
  const id = location.hash.substring(1);

  // content 가져오기
  ajax.open("GET", CONTENT_URL.replace("@id", id), false);
  ajax.send();
  const newsContent = JSON.parse(ajax.response);

  console.log("newsContent", newsContent);
  const title = document.createElement("h1");
  title.innerHTML = newsContent.title;
  content.appendChild(title);
});

for (let i = 0; i < 10; i++) {
  const div = document.createElement("div");

  div.innerHTML = `
    <li>
        <a href="#${newsFeed[i].id}"> ${newsFeed[i].title} 댓글(${newsFeed[i].comments_count})</a>
    </li>
  `;

  ul.appendChild(div.firstElementChild);
}

container.appendChild(ul);
container.appendChild(content);
