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

hideBtnLoadMore();

refs.searchForm.addEventListener('submit', onCreateGallery);

function onCreateGallery(event) {

    event.preventDefault();
    hideBtnLoadMore();

    galleryApi.valueInp = event.currentTarget.elements.searchQuery.value;
    galleryApi.resetPage();

    galleryApi.catchImg().then(({hits, totalHits}) => {

        clearGalleryContainer();
      
        if (totalHits > galleryApi.per_page) {
            visibleBtnLoadMore();
        } else {
            hideBtnLoadMore() ;
        }
       
        if (hits.length < 1) {
            Notiflix.Notify.warning(
                "Sorry, there are no images matching your search query. Please try again.",
                {
                  timeout: 6000,
                },
              );
        } else {
            showTotalHits(totalHits);
        }

        hits.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
            refs.gallery.insertAdjacentHTML('beforeend', createMarkupCard(webformatURL, largeImageURL, tags, likes, views, comments, downloads) )
        })

    }).catch (error => {
        console.error(error);
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

    galleryApi.catchImg().then(({hits, totalHits}) => {
        
        hits.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
            refs.gallery.insertAdjacentHTML('beforeend', createMarkupCard(webformatURL, largeImageURL, tags, likes, views, comments, downloads) )
        })

        if (Math.floor(totalHits / galleryApi.per_page) <= galleryApi.page - 2) {

            hideBtnLoadMore();
            
            Notiflix.Notify.info(
                "We're sorry, but you've reached the end of search results.",
                {
                  timeout: 6000,
                },
              );
        }
    }).catch (error => {
        console.error(error);
      });
    
}

function clearGalleryContainer () {
    return refs.gallery.innerHTML = '';
}

function showTotalHits (totalHits) {
    return Notiflix.Notify.success(
       `"Hooray! We found ${totalHits} images."` ,
        {
          timeout: 6000,
        },
      );
}


function hideBtnLoadMore() {
refs.loadMoreBtn.classList.add('is-hidden')
}
  
function visibleBtnLoadMore() {
    refs.loadMoreBtn.classList.remove('is-hidden')
    }
        
