document.addEventListener('DOMContentLoaded', function() {
    window.DD_LOGS && window.DD_LOGS.logger.info('DOM fully loaded and parsed. Lets browse the doggos @ Google Next 24');


    const select = document.getElementById('breed-select');
    const container = document.getElementById('dog-image-container');

    // Fetch the list of breeds and populate the dropdown
    fetch('https://dog.ceo/api/breeds/list/all')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            window.DD_LOGS && window.DD_LOGS.logger.info('Successfully fetched the list of breeds');
            const breeds = data.message;
            for (const breed in breeds) {
                const option = document.createElement('option');
                option.value = breed;
                option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
                select.appendChild(option);
            }
            window.DD_LOGS && window.DD_LOGS.logger.info('Dropdown populated with breeds');
        })
        .catch(error => {
            window.DD_LOGS && window.DD_LOGS.logger.error('Failed to fetch the list of breeds', { error: error.toString() });
        });

    // Function to fetch and display images for the selected breed
    function fetchAndDisplayImages(breed) {
        const url = `https://dog.ceo/api/breed/${breed}/images/random/3`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                window.DD_LOGS && window.DD_LOGS.logger.info(`Successfully fetched images for ${breed}`);
                container.innerHTML = ''; // Clear existing images
                data.message.forEach(imageUrl => {
                    const wrapDiv = document.createElement('div');
                    wrapDiv.className = 'image-wrap';

                    const img = document.createElement('img');
                    img.src = imageUrl;
                    img.alt = `Image of ${breed}`;

                    wrapDiv.appendChild(img);
                    container.appendChild(wrapDiv);
                });
                window.DD_LOGS && window.DD_LOGS.logger.info(`Images displayed for ${breed}`);
            })
            .catch(error => {
                window.DD_LOGS && window.DD_LOGS.logger.error(`Failed to fetch images for ${breed}`, { error: error.toString() });
            });
    }

    // Handle breed selection
    select.addEventListener('change', function() {
        const breed = this.value;
        if (breed) {
            window.DD_LOGS && window.DD_LOGS.logger.info(`${breed} selected from dropdown`);
            fetchAndDisplayImages(breed);
        }
    });
try {
    // Intentionally cause a reference error by trying to access a method on an undefined object
    window.DD_LOGS && window.DD_LOGS.logger.nonExistentMethod('Attempting to call a non-existent method.');
} catch (error) {
    // Catch the error to prevent it from affecting the rest of the script
    window.DD_LOGS && window.DD_LOGS.logger.error('Yo! Error found!');
}    
});
