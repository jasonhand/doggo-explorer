document.addEventListener('DOMContentLoaded', function() {
    const select = document.getElementById('breed-select');
    const container = document.getElementById('dog-image-container');

    // Fetch the list of breeds and populate the dropdown
    fetch('https://dog.ceo/api/breeds/list/all')
        .then(response => response.json())
        .then(data => {
            const breeds = data.message;
            for (const breed in breeds) {
                const option = document.createElement('option');
                option.value = breed;
                option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
                select.appendChild(option);
            }
        });

    // Function to fetch and display images for the selected breed
    function fetchAndDisplayImages(breed) {
        const url = `https://dog.ceo/api/breed/${breed}/images/random/3`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                container.innerHTML = ''; // Clear existing images
                data.message.forEach(imageUrl => {
                    const wrapDiv = document.createElement('div');
                    wrapDiv.className = 'image-wrap'; // Ensure this matches your CSS

                    const img = document.createElement('img');
                    img.src = imageUrl;
                    img.alt = `Image of ${breed}`;

                    wrapDiv.appendChild(img);
                    container.appendChild(wrapDiv);
                });
            });
    }

    // Handle breed selection
    select.addEventListener('change', function() {
        const breed = this.value;
        if (breed) {
            fetchAndDisplayImages(breed);
        }
    });
});
