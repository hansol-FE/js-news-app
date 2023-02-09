const ajax = new XMLHttpRequest();

const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";

const container = document.getElementById("root");

const store = {
  currentPage: 1,
};

function getData(url) {
  ajax.open("GET", url, false);
  ajax.send();

  return JSON.parse(ajax.response);
}

function newsFeed() {
  const newsFeed = getData(NEWS_URL);
  const newsList = [];

  let template = `
    <div class="bg-gray-600 min-h-screen">
        <div class="bg-white text-xl">
            <div class="mx-auto px-4">
                <div class="flex justify-between items-center py-6">
                    <div class="flex justify-start">
                        <h1 class="font-extrabold">Hacker News</h1>
                    </div>
                    <div class="items-center justify-end">
                        <a href="#/page/{{__prev_page__}}" class="text-gray-500">이전페이지</a>
                        <a href="#/page/{{__next_page__}}" class="text-gray-500 ml-4">다음페이지</a>
                    </div>


                </div>
            </div>
        </div>
        <div class="p-4 text-2xl text-gray-700">
            <ul>
                {{__news_feed__}}
            </ul>
        </div>
    </div>
  `;

  for (let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
    newsList.push(`
        <li>
          <a href="#/show/${newsFeed[i].id}"> 
            ${newsFeed[i].title} 댓글(${newsFeed[i].comments_count})
          </a>
        </li>`);
  }

  template = template.replace("{{__news_feed__}}", newsList.join(""));
  template = template.replace(
    "{{__prev_page__}}",
    store.currentPage > 1 ? store.currentPage - 1 : 1
  );
  template = template.replace("{{__next_page__}}", store.currentPage + 1);

  container.innerHTML = template;
}

function newsDetail() {
  console.log("hash 변경됨");
  // id 가져오기
  const id = location.hash.substring(7);
  // content 가져오기
  const newsContent = getData(CONTENT_URL.replace("@id", id));

  container.innerHTML = `
          <h1>${newsContent.title}</h1>
          <div>
              <a href="#/page/${store.currentPage}">목록으로</a>
          </div>
      `;
}

function router() {
  const routePath = location.hash;

  if (routePath === "") {
    newsFeed();
  } else if (routePath.indexOf("#/page/") >= 0) {
    store.currentPage = Number(routePath.substring(7));
    newsFeed();
  } else {
    newsDetail();
  }
}
window.addEventListener("hashchange", router);

router();
