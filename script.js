// Fetch images from the JSON file
fetch('images.json')
  .then(response => response.json())
  .then(data => {
    const gallery = document.querySelector('.gallery');
    data.forEach(image => {
      const imgContainer = document.createElement('div');
      imgContainer.classList.add('thumb');
      
      const img = document.createElement('img');
      img.src = image.src;
      img.alt = image.alt;
      img.classList.add('thumbnail-image');
      
      imgContainer.appendChild(img);
      gallery.appendChild(imgContainer);
    });
  })
  .catch(error => console.error('Error loading images:', error));
