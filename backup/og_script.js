//This Javascript is before instrumenting Datadog browser logging

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

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
            console.log('Successfully fetched the list of breeds');
            const breeds = data.message;
            for (const breed in breeds) {
                const option = document.createElement('option');
                option.value = breed;
                option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
                select.appendChild(option);
            }
        })
        .catch(error => {
            console.error('Failed to fetch the list of breeds:', error);
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
                console.log(`Successfully fetched images for ${breed}`);
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
            })
            .catch(error => {
                console.error(`Failed to fetch images for ${breed}:`, error);
            });
    }

    // Handle breed selection
    select.addEventListener('change', function() {
        const breed = this.value;
        if (breed) {
            console.log(`Breed selected: ${breed}`);
            fetchAndDisplayImages(breed);
        }
    });

// Remove this code block to fix the error
//    try {
//        document.getElementById('non-existent-element').setAttribute('data-fake-attribute', 'true');
//    } catch (error) {
//        console.error('Silent error: Attempted to manipulate a non-existent element.', error);
//    }
// End of error-causing code block    
});
