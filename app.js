const ajax = new XMLHttpRequest();

const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";

ajax.open("GET", NEWS_URL, false);
ajax.send();

const newsFeed = JSON.parse(ajax.response);
console.log("newsFeed", newsFeed);

const ul = document.createElement("ul");

window.addEventListener("hashchange", () => {
  console.log("hash 변경됨");
  // id 가져오기
  const id = location.hash.substring(1);

  // content 가져오기
  ajax.open("GET", CONTENT_URL.replace("@id", id), false);
  ajax.send();
  const newsContent = JSON.parse(ajax.response);

  console.log("newsContent", newsContent);
});

for (let i = 0; i < 10; i++) {
  const li = document.createElement("li");
  const a = document.createElement("a");

  a.href = `#${newsFeed[i].id}`;
  a.innerHTML = `${newsFeed[i].title} 댓글(${newsFeed[i].comments_count})`;

  li.appendChild(a);
  ul.appendChild(li);
}

document.getElementById("root").appendChild(ul);
