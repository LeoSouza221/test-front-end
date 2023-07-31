let hasNextPage = true
let loading = false

window.onload = function() {
  getData();
};

async function getData() {
  loading = true

  try {
    const response = await fetch("https://api.jikan.moe/v4/top/anime");

    if (response.ok) {
      const data = await response.json();
      const animes = data.data;
  
      hasNextPage = data.has_next_page;
  
      console.log(animes);
  
      const divs = animes.reduce((acummulator, anime) => {
        const element = `
          <div class="col-2">
            <div class="card">
              <div class="card-rating d-flex justify-center align-center">
                <span class="card-rating-text">${anime.score}</span>
              </div>
              <div class="row">
                <div class="col d-flex justify-center">
                  <img src="${anime.images.jpg.image_url}" alt="" width="225px" height="321px">
                </div>
                <div class="col card-text-align">
                  <p class="card-text">${anime.title_english}</p>
                </div>
              </div>
            </div>
          </div>
        `;

        return acummulator += element;
      });
  
      document.getElementById("data").innerHTML = divs
      
      return
    }
  } catch(e) {
    console.error(e);
  } finally {
    loading = false;
  }
};