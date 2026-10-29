import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const fragment = document.createDocumentFragment();
  images.forEach(image => {
    const item = document.createElement('li');
    item.className = 'gallery-item';
    const link = document.createElement('a');
    link.href = image.largeImageURL;
    const thumbnail = document.createElement('img');
    thumbnail.src = image.webformatURL;
    thumbnail.alt = image.tags;
    thumbnail.loading = 'lazy';
    thumbnail.width = 360;
    thumbnail.height = 200;
    link.append(thumbnail);
    const stats = document.createElement('div');
    stats.className = 'image-stats';
    ['likes', 'views', 'comments', 'downloads'].forEach(name => {
      const stat = document.createElement('p');
      const label = document.createElement('b');
      label.textContent = name[0].toUpperCase() + name.slice(1);
      const value = document.createElement('span');
      value.textContent = image[name];
      stat.append(label, value);
      stats.append(stat);
    });
    item.append(link, stats);
    fragment.append(item);
  });
  gallery.append(fragment);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.replaceChildren();
  lightbox.refresh();
}

export function showLoader() {
  loader.classList.add('is-visible');
}

export function hideLoader() {
  loader.classList.remove('is-visible');
}

export function showLoadMoreButton() {
  loadMoreButton.classList.add('is-visible');
}

export function hideLoadMoreButton() {
  loadMoreButton.classList.remove('is-visible');
}
