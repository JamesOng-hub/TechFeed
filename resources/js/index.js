

let ID = () => Math.random().toString(36).substr(2, 9);

let createAccordionItem = (title, id) => {
  return `
    <div class="accordion-item" id=card-${id}>
        <h2 class="accordion-header custom-accordion-header" id="heading${id}">
            <button class="btn custom-accordion-header" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${id}" aria-expanded="true" aria-controls="collapse${id}">
               ${title}
            </button>
        </h2>
        <div id="collapse${id}" class="collapse" aria-labelledby="heading${id}">

        </div>
    </div>`;
};

let createCarousel = (id, innerId) => {
  return `
    <div id="carousel${id}" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner custom-carousel-inner" id="${innerId}">
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carousel${id}" data-bs-slide="prev">
            <span class="carousel-control-prev-icon custom-carosel-btn" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next custom-carosel-btn" type="button" data-bs-target="#carousel${id}" data-bs-slide="next">
            <span class="carousel-control-next-icon custom-carosel-btn" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
    `;
};




let createCarouselItem = (id, active) => {
    return `
        <div class="carousel-item ${active ? "active": ""}" id="${id}">
            
        </div>
    `;
}

let createCard = (item, versionOne, versionTwo) => {
    if(versionOne){
        return `
        <div class="card d-block custom-card">
            <img src="${item["thumbnail"]}" class="card-img-top image-fluid carousel-img custom-card-img" alt="card-image">            
            <div class="card-body">
            <h5 class="card-title">${item["title"]}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${item["author"]}</h6>
            <p class="card-subtitle text-secondary">${item["pubDate"]}</p>
            <p class="card-text">${item['description']}</p>
            <a href="${item['link']}" class="stretched-link" target="_blank"></a>
            </div>
        </div>
    `;
    }else if (versionTwo){
        return `
        <div class="card d-block custom-card">
        <img src="${item["enclosure"]["link"]}" class="card-img-top image-fluid carousel-img custom-card-img" alt="card-image">
        <div class="card-body">
            <h5 class="card-title">${item["title"]}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${item["author"]}</h6>
            <p class="card-subtitle text-secondary">${item["pubDate"]}</p>
            <p class="card-text">${item['description']}</p>
            <a href="${item['link']}" class="stretched-link" target="_blank"></a>
            </div>
        </div>
    `;
    }
     
    //for flipboard, nyt-tech
    // <p class="card-subtitle text-secondary">${item["author"]["pubDate"]}</p>


    //cnet, techcrunch, MIT Tech Review, vulcan. v1
    // <img src="${item["thumbnail"]}" class="card-img-top image-fluid carousel-img custom-card-img" alt="card-image">


    // nyt-tech v2
    // <img src="${item["enclosure"]["link"]}" class="card-img-top image-fluid carousel-img custom-card-img" alt="card-image">


}






let addContent = async () => {
  for (let i = 0; i < magazines.length; i++) {
    let {url, version} = magazines[i];
    let v1 = false; 
    let v2 = false;
    if (version === "v1"){
        v1 = true; 
    }else{
        v2 = true; 
    }
    let res = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURI(url)}`
    );
    let data = await res.json();
    console.log(data); 
      //accordion
      let accordionId = ID(); 
      let accordion = createAccordionItem(data['feed']['title'], accordionId);
      document.getElementById("accordionBody").innerHTML += accordion;

      if (i == 0) {
          document.getElementById(`collapse${accordionId}`).classList.add('show');
      }

      //carousel
      let carouselId = ID(); 
      let carouselInnerId = ID(); 
      let carousel = createCarousel(carouselId, carouselInnerId); 
      document.getElementById(`collapse${accordionId}`).innerHTML = carousel;

      //add cards in carousel
      let items = data['items']; 
      for (j in items) {
          let card = createCard(items[j], v1, v2 ); //items[item]
          let carouselItemId = ID(); 
          let carouselItem = createCarouselItem(carouselItemId, j == 0); //when j==0 is true, we set the active
          //carouselItem into carousel inner 
          document.getElementById(`${carouselInnerId}`).innerHTML += carouselItem;

          //card in to carousel Item
          document.getElementById(`${carouselItemId}`).innerHTML += card;
          //carousel innerId to add the carousel image. 

          //carousel carouselId to add the body. s
          
      }
  }
};

addContent(); 
