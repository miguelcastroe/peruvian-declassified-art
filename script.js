let currentPage = 1;
const imagesPerPage = 50;

// Load images dynamically
async function loadImages(page = 1) {
  const gallery = document.getElementById('gallery');
  const loadMoreButton = document.getElementById('load-more');

  try {
    // Fetch the corresponding JSON file for the page
    const response = await fetch(`images_page${page}.json`);
    if (!response.ok) throw new Error(`Failed to fetch images for page ${page}`);
    
    const images = await response.json();

    if (images.length === 0) {
      loadMoreButton.style.display = 'none';
      return;
    }

    // Render the images
    images.forEach((url) => {
      const container = document.createElement('div');
      container.className = 'image-container';

      const img = document.createElement('img');
      img.src = url;
      img.alt = 'Peruvian Artwork';
      img.loading = 'lazy';

      // Remove container if image fails to load
      img.onerror = () => {
        container.remove();
      };

      container.appendChild(img);
      gallery.appendChild(container);
    });
  } catch (error) {
    console.error('Error loading images:', error);
    loadMoreButton.style.display = 'none';
    gallery.innerHTML += `<p style="color: var(--color-error);">Failed to load images. Please try again later.</p>`;
  }
}

// Load the next page when the "Load More" button is clicked
function loadNextPage() {
  currentPage += 1;
  loadImages(currentPage);
}

// Initial load
document.addEventListener('DOMContentLoaded', () => {
  loadImages(currentPage);

  // Add event listener to "Load More" button
  const loadMoreButton = document.getElementById('load-more');
  loadMoreButton.addEventListener('click', loadNextPage);
});

