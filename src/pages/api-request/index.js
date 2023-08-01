let hasNextPage = true
let loading = false
let currentPage = 1

window.onload = function() {
  getData();
};

document.addEventListener('animationstart', function (e) {
  if (e.animationName === 'fade-in') {
      e.target.classList.add('did-fade-in');
  }
});

document.addEventListener('animationend', function (e) {
  if (e.animationName === 'fade-out') {
      e.target.classList.remove('did-fade-in');
   }
});

function showOverlay() {
  document.getElementById("overlay").style.display = "block";
};

function hideOverlay() {
  document.getElementById("overlay").style.display = "none";
};

function disableButton(buttonName) {
  const buttonNext = document.getElementById(buttonName);

  buttonNext.setAttribute("disabled", "");
  buttonNext.classList.add("button-disabled");
};

function increasePage() {
  currentPage += 1;

  disableButtonsAndGetData()
};

function decreasePage() {
  currentPage -= 1;

  disableButtonsAndGetData()
};

function disableButtonsAndGetData() {
  disableButton('previous-button');
  disableButton('next-button');
  getData();
}

async function getData() {
  showOverlay()

  try {
    const response = await fetch(`https://api.jikan.moe/v4/top/anime?page=${currentPage}`);

    if (response.ok) {
      const data = await response.json();
      const animes = data.data;
  
      hasNextPage = data.pagination.has_next_page;
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    
      formatItems(animes)
    } else {
      window.alert('Error: try again')
    }
  } catch(e) {
    window.alert(e)
  } finally {
    hideOverlay();
    adjustButtons();
  }
};

function adjustButtons() {
  const buttonNext = document.getElementById("next-button");
  const buttonPrevious = document.getElementById("previous-button");

  if (!hasNextPage && !buttonNext.hasAttribute('disabled')) {
    disableButton('next-button')
  } else {
    buttonNext.removeAttribute("disabled");
    buttonNext.classList.remove("button-disabled");
  }

  if (currentPage === 1 || !buttonPrevious.hasAttribute('disabled')) {
    disableButton("previous-button");
  } else {
    buttonPrevious.removeAttribute("disabled");
    buttonPrevious.classList.remove("button-disabled");
  }
};

function getElement(anime, genres, startDate, endDate) {
  return `
    <div class="col-2 d-flex justify-center">
      <div class="card card-animes">
        <div class="card-rating d-flex justify-center align-center">
          <span class="card-rating-text">${(anime.rank ?? 0)}</span>
        </div>
        <div class="row">
          <div class="col d-flex justify-center card-image">
            <img src="${anime.images.jpg.image_url}" alt="" width="225px" height="321px">
            <div class="card-description">
              <div class="row card-description-content">
                <div class="col">
                  <div class="d-flex justify-center align-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                      <path fill="currentColor" d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22Z"/>
                    </svg>
                    <p class="card-text">${anime.score}</p>
                  </div>
                </div>
                <div class="col card-text-align">
                  <p class="card-text">${(anime.title_english ?? anime.title_japanese)}</p>
                </div>
                <div class="col card-detail-hidden">
                  <div class="d-flex justify-center align-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M16 17v2H2v-2s0-4 7-4s7 4 7 4m-3.5-9.5A3.5 3.5 0 1 0 9 11a3.5 3.5 0 0 0 3.5-3.5m3.44 5.5A5.32 5.32 0 0 1 18 17v2h4v-2s0-3.63-6.06-4M15 4a3.39 3.39 0 0 0-1.93.59a5 5 0 0 1 0 5.82A3.39 3.39 0 0 0 15 11a3.5 3.5 0 0 0 0-7Z"/>
                  </svg>
                    <p class="card-text">${anime.members}</p>
                  </div>
                </div>
                <div class="col card-detail-hidden">
                  <div class="d-flex justify-center align-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 4V2m0 2v2m0-2h-4.5M3 10v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9H3Zm0 0V6a2 2 0 0 1 2-2h2m0-2v4m14 4V6a2 2 0 0 0-2-2h-.5"/>
                    </svg>
                    <p class="card-text">${startDate}</p>
                  </div>
                </div>
                <div class="col card-detail-hidden">
                  <div class="d-flex justify-center align-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 4V2m0 2v2m0-2h-4.5M3 10v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9H3Zm0 0V6a2 2 0 0 1 2-2h2m0-2v4m14 4V6a2 2 0 0 0-2-2h-.5"/>
                    </svg>
                    <p class="card-text">${endDate}</p>
                  </div>
                </div>
                <div class="col card-detail-hidden">
                  <div class="d-flex justify-center align-center">
                    <p class="card-text">${genres}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function formatItems(animes) {
  const divs = animes.reduce((acummulator, anime) => {
    const genres = anime.genres.reduce((accumulator, genre, index) => {
      if (index === 0) {
        accumulator += `${genre.name}`
      } else {
        accumulator += `, ${genre.name}`
      }
      return accumulator
    }, '');

    const startDate = new Date(anime.aired.from).toLocaleDateString();
    let endDate =  new Date().toLocaleDateString();

    if (anime.aired.to) {
      endDate = new Date(anime.aired.to).toLocaleDateString();
    }

    const element = getElement(anime, genres, startDate, endDate);

    return acummulator += element;
  }, '');

  document.getElementById("data").innerHTML = divs;
};
