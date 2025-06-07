// Script for create.js - Handles the artwork creation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Set up form submission
    const artworkForm = document.getElementById('add-artwork-form');
    if (artworkForm) {
        artworkForm.addEventListener('submit', function(e) {
            e.preventDefault();
            createArtwork();
        });
    }
});

// Function to create a new artwork
async function createArtwork() {
    try {
        // Get form values
        const title = document.getElementById('artwork-title').value;
        const description = document.getElementById('artwork-description').value;
        const year = parseInt(document.getElementById('artwork-year').value);
        const url_image = document.getElementById('artwork-url').value;
        const artist_name = document.getElementById('artwork-artist').value;
        
        // Create artwork data object
        const artworkData = {
            title,
            description,
            year,
            url_image,
            artist_name
        };
        
        // Send data to API
        const result = await createArt(artworkData);
        
        if (result.success) {
            // Clear form
            document.getElementById('add-artwork-form').reset();
            
            // Show success notification
            showNotification('success', 'Obra de arte criada com sucesso!');
        } else {
            throw new Error(result.error || 'Erro desconhecido');
        }
    } catch (error) {
        console.error('Error creating artwork:', error);
        showNotification('error', 'Erro ao criar obra de arte. Tente novamente.');
    }
}
