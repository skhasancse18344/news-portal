const loadAllNews = async() =>{
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    const res = await fetch(url);
    const data = await res.json();
    AllCategorysNews(data.data.news_category);
}
// Adding Dynamic Category Section 

const AllCategorysNews =(newsCategories)=>{

    // All Category 

    const btnCategory = document.getElementById('btn-category');
  for(const newsCategory of newsCategories){
    // console.log(newsCategory); 
    const button = document.createElement('div');
    button.classList.add('border');
    button.classList.add('rounded')
    button.classList.add('px-4')
    button.innerHTML = `
     <p class="pt-3 pe-2 text-center text-success" style="cursor: pointer;" onclick=showDetails('${newsCategory.category_id}') class="mx-4">${newsCategory.category_name}</p>
    `;
    btnCategory.appendChild(button);
  }
}
loadAllNews();

// Adding News Section 

const showDetails = async(id) =>{
  toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    const res = await fetch(url)
    const data = await res.json()
    displayDetails(data.data);

}
const displayDetails = newsCards =>{

  

  
  console.log(newsCards);
    const itemCount = newsCards.length;
    const selectedItem = document.getElementById('selected-item');
    selectedItem.innerText = itemCount;
    const newsItem = document.getElementById('news-item');
    newsItem.innerHTML = ``;
    if(newsCards.length == 0){
        const card = document.createElement('div');
        card.innerHTML=`
        <p class="fs-1 text-center text-info " style ="height: 400px; margin-top:200px">There Have No News.......!!!!!!!!</p>
        `;
        newsItem.appendChild(card);

    }else{
      newsCards.sort((a,b) =>{
  
        return b.total_view - a.total_view;
      });

      for(const newsCard of newsCards){
            // console.log(highestToLowest);
            const card = document.createElement('div');
            card.classList.add('card');
            card.classList.add('mb-3');
            card.innerHTML = `
    
            <div class="row g-0">
                          <div class="col-md-4">
                            <img src="${newsCard.image_url}" class="img-fluid rounded-start" alt="...">
                          </div>
                          <div class="col-md-8">
                            <div class="card-body">
                              <h5 class="card-title">${newsCard.title}</h5>
                              <p class="card-text">${newsCard.details.slice(0,200)}</p>
                              <div class="row">
                                <div class="col-md-4">
                                    <p class="card-text ">
                                    <div class="row">
                                    <div class="col-4 col-md-4 col-sm-4">
                                    <img src="${newsCard.author.img}" class="img-fluid rounded-circle" alt="...">
                                    </div>
                                    <div class="col-8 col-md-8 col-sm-8">
                                    <p>${newsCard.author.name ? newsCard.author.name : 'No Author Found'}</p>
                                    <p>${newsCard.author.published_date ? newsCard.author.published_date : 'No Date Found'}</p>
                                    </div>
                                    </div>
                                    </p>
                                </div>
                                <div class="col-md-4">
                                    <p class="card-text "><small class="text-muted ">Total View : ${newsCard.total_view  ? newsCard.total_view : '0'}K</small></p>
                                </div>
                                <div class="col-md-4">
                                    <a onclick="modalDetails('${newsCard._id}')" data-bs-toggle="modal" data-bs-target="#exampleModal") class="card-text "><svg xmlns="http://www.w3.org/2000/svg" width="40" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
                                  </svg></a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
            `;
            newsItem.appendChild(card);

                }
    }
    toggleSpinner(false);
}
showDetails("01");


// Modal 

const modalDetails = async(news_id) =>{
    const url = ` https://openapi.programming-hero.com/api/news/${news_id}`;
    const res = await fetch(url)
    const data = await res.json()
    displayModalDetails(data.data);

}
const displayModalDetails = modalDatas =>{
            console.log(modalDatas);
            for(const modalData of modalDatas){
                // console.log(modalData);
            const modalButton = document.getElementById('modal-section');
            modalButton.innerHTML = ``;
            const modalDiv = document.createElement('div');
            modalDiv.innerHTML = `

            <img src="${modalData.image_url}" class="img-fluid rounded-start" alt="...">
            <p class="card-text">${modalData.details}</p>
            <p>Author : ${modalData.author.name ? modalData.author.name : 'No Author Found'}</p>
            <p >Published Date :${modalData.author.published_date ? modalData.author.published_date : 'No Date Found'}</p>
             `;
             modalButton.appendChild(modalDiv);

            }
    }

// Spinner 

const toggleSpinner = isLoading =>{
  const loaderSection = document.getElementById('loader');
  if(isLoading){
      loaderSection.classList.remove('d-none');
  }
  else{
      loaderSection.classList.add('d-none');
  }
}
// toggleSpinner(true);
