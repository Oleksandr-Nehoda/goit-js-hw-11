import Notiflix from 'notiflix';
import GalleryApi from './gallery-api';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const refs = {
    searchForm: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn:  document.querySelector('.load-more'),

}

const galleryApi = new GalleryApi();
console.log(galleryApi);


refs.searchForm.addEventListener('submit', onCreateGallery);

function onCreateGallery(event) {
    event.preventDefault();
   
    galleryApi.valueInp = event.currentTarget.elements.searchQuery.value;
    galleryApi.resetPage();
    galleryApi.catchImg().then(({hits, total, totalHits}) => {
        console.log(hits, total, totalHits);
        hits.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
            refs.gallery.insertAdjacentHTML('beforeend', createMarkupCard(webformatURL, largeImageURL, tags, likes, views, comments, downloads) )
        })

    });
    
}

refs.gallery.addEventListener('click', onOpenLightbox);

function onOpenLightbox(event) {

    event.preventDefault();

    if (event.target.nodeName !== 'IMG'){
        return
    }
    var lightbox = new SimpleLightbox('.gallery a', { 
        captionDelay: '250',   
 });
 lightbox.refresh();


}

function createMarkupCard (webformatURL, largeImageURL, tags, likes, views, comments, downloads) {
return `<div class="photo-card">
<a class="gallery__item" href="${largeImageURL}">
<img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" width=600 />
</a>
<div class="info">
  <p class="info-item">
    <b class="info-name">Likes: </b>
    ${likes}
  </p>
  <p class="info-item">
    <b class="info-name">Views: </b>
    ${views}
  </p>
  <p class="info-item">
    <b class="info-name">Comments: </b>
    ${comments}
  </p>
  <p class="info-item">
    <b class="info-name">Downloads: </b>
    ${downloads}
  </p>
</div>

</div>`
}

refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onLoadMore(){
    
    galleryApi.catchImg().then(({hits, total, totalHits}) => {
        console.log(hits, total, totalHits);
        hits.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
            refs.gallery.insertAdjacentHTML('beforeend', createMarkupCard(webformatURL, largeImageURL, tags, likes, views, comments, downloads) )
        })
        
    });
    
}


  
  
