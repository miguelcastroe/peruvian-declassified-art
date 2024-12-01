// Select elements from the DOM
const gallery = document.getElementById("gallery");
const loadMoreBtn = document.getElementById("loadMore");
let currentPage = 1; // Start with the first page
const totalPages = 8; // Total number of pages

// Function to load images from a specific page
async function loadImages(page) {
  try {
    // Fetch the JSON file for the given page
    const response = await fetch(`images_page${page}.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON response
    const imageUrls = await response.json();

    // Validate the JSON format
    if (!Array.isArray(imageUrls)) {
      throw new Error("Invalid JSON format: Expected an array of image URLs");
    }

    // Iterate over the image URLs and create image elements
    imageUrls.forEach((url) => {
      const img = document.createElement("img");
      img.src = url; // Set the image source
      img.alt = "Peruvian Art"; // Alt text for accessibility
      img.loading = "lazy"; // Use lazy loading for performance
      img.classList.add("gallery-image"); // Add a CSS class for styling

      // Handle image load errors
      img.onerror = (event) => {
        console.error(`Image failed to load: ${event.target.src}`);
        img.remove(); // Remove the broken image
      };

      // Append the image to the gallery
      gallery.appendChild(img);
    });
  } catch (error) {
    // Log errors to the console
    console.error(`Failed to load images for page ${page}:`, error.message);
  }
}

// Event listener for the "Load More" button
loadMoreBtn.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage += 1; // Increment the current page
    loadImages(currentPage); // Load images from the next page
  }

  // Hide the "Load More" button if all pages are loaded
  if (currentPage === totalPages) {
    loadMoreBtn.style.display = "none";
  }
});

// Initial load of the first page
loadImages(currentPage);
