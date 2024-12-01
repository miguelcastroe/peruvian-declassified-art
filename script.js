const gallery = document.getElementById('gallery');
const loadMoreButton = document.getElementById('loadMoreButton');

let currentPage = 1;
const totalPages = 8; // Number of JSON files

// Create an image container
function createImageContainer(url) {
  const imageContainer = document.createElement('div');
  imageContainer.className = 'image-container';

  const img = document.createElement('img');
  img.src = url;
  img.alt = 'Peruvian Art';
  
  img.onerror = () => {
    console.warn(`Image failed to load: ${url}`);
    imageContainer.remove();
  };

  imageContainer.appendChild(img);
  return imageContainer;
}

// Load images from JSON
async function loadImages(page) {
  try {
    const response = await fetch(`images_page${page}.json`);
    if (!response.ok) {
      console.error(`Failed to load JSON for page ${page}:`, response.status);
      return;
    }
    const imageUrls = await response.json();
    imageUrls.forEach(url => {
      const imageContainer = createImageContainer(url);
      gallery.appendChild(imageContainer);
    });
  } catch (error) {
    console.error(`Error loading images for page ${page}:`, error);
  }
}

// Load more button functionality
loadMoreButton.addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage++;
    loadImages(currentPage);
  }
  if (currentPage >= totalPages) {
    loadMoreButton.style.display = 'none';
  }
});

// Initial load
document.addEventListener('DOMContentLoaded', () => {
  loadImages(currentPage);
});
