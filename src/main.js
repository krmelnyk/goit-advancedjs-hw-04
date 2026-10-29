import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const loadMoreButton = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');
let query = '';
let page = 1;
let loadedCount = 0;
let hasMore = false;
let searchVersion = 0;
let isLoading = false;

iziToast.settings({ position: 'topRight', timeout: 4000 });

form.addEventListener('submit', event => {
  event.preventDefault();
  const nextQuery = form.elements.search.value.trim();
  if (!nextQuery) {
    iziToast.warning({ message: 'Please enter a search term.' });
    return;
  }
  query = nextQuery;
  page = 1;
  loadedCount = 0;
  hasMore = false;
  searchVersion += 1;
  clearGallery();
  hideLoadMoreButton();
  loadImages(false);
});

loadMoreButton.addEventListener('click', () => {
  if (!isLoading && hasMore) loadImages(true);
});

async function loadImages(isNextPage) {
  const version = searchVersion;
  const requestedPage = isNextPage ? page + 1 : 1;
  isLoading = true;
  hideLoadMoreButton();
  showLoader();
  gallery.setAttribute('aria-busy', 'true');

  try {
    const { hits, totalHits } = await getImagesByQuery(query, requestedPage);
    // Ignore a previous search that finishes after a newer submission.
    if (version !== searchVersion) return;

    if (hits.length === 0 && !isNextPage) {
      iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    createGallery(hits);
    page = requestedPage;
    loadedCount += hits.length;
    hasMore = hits.length > 0 && loadedCount < totalHits;

    if (!hasMore) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    }

    if (isNextPage && hits.length > 0) {
      const { height } = gallery.firstElementChild.getBoundingClientRect();
      window.scrollBy({ top: height * 2, behavior: 'smooth' });
    }
  } catch (error) {
    if (version !== searchVersion) return;
    iziToast.error({
      message: error.message === 'MISSING_API_KEY'
        ? 'Pixabay API key is not configured.'
        : 'Unable to load images. Please try again.',
    });
  } finally {
    if (version === searchVersion) {
      isLoading = false;
      hideLoader();
      gallery.setAttribute('aria-busy', 'false');
      if (hasMore) showLoadMoreButton();
    }
  }
}
