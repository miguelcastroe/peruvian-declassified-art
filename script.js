const gallery = document.getElementById("gallery");
const loadMoreBtn = document.getElementById("loadMore");
let currentPage = 1;
const totalPages = 8;

// Function to load images from JSON files
async function loadImages(page) {
  console.log(`Loading images from images_page${page}.json`);
  try {
    const response = await fetch(`images_page${page}.json`);
    if (!response.ok) {
      console.error(`Failed to load JSON file images_page${page}.json: ${response.status}`);
      return;
    }

    const imageUrls = await response.json();

    // Verify the imageUrls is an array
    if (!Array.isArray(imageUrls)) {
      console.error("Invalid JSON format: Expected an array of URLs.");
      return;
    }

    // Create image elements
    imageUrls.forEach((url) => {
      const imgContainer = document.createElement("div");
      imgContainer.classList.add("image-container");

      const img = document.createElement("img");
      img.src = url.trim(); // Ensure no extra whitespace
      img.alt = "Peruvian Art";
      img.loading = "lazy";
      img.classList.add("gallery-image");

      // Handle successful loading
      img.onload = () => {
        console.log(`Image successfully loaded: ${url}`);
      };

      // Handle failed loading
      img.onerror = () => {
        console.warn(`Image failed to load: ${url}`);
        imgContainer.innerHTML = `<div class="error-placeholder">Image not available</div>`;
      };

      imgContainer.appendChild(img);
      gallery.appendChild(imgContainer);
    });
  } catch (error) {
    console.error(`Error loading images from page ${page}:`, error);
  }
}

// Event listener for "Load More" button
loadMoreBtn.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    loadImages(currentPage);
  }
  if (currentPage === totalPages) {
    loadMoreBtn.style.display = "none";
  }
});

// Load the first page
loadImages(currentPage);
