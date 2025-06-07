// Script for index.js - Handles the homepage functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load featured artworks
    loadFeaturedArts();
});

// Function to load featured artworks
async function loadFeaturedArts() {
    try {
        const arts = await fetchArts();
        
        // Get the container for featured arts
        const featuredGrid = document.getElementById('featured-arts');
        
        // Clear loading message
        featuredGrid.innerHTML = '';
        
        // If no arts found
        if (arts.length === 0) {
            featuredGrid.innerHTML = '<p>Nenhuma obra encontrada.</p>';
            return;
        }
        
        // Display up to 3 featured arts
        const featuredArts = arts.slice(0, 3);
        
        featuredArts.forEach(art => {
            const card = createArtCard(art);
            featuredGrid.appendChild(card);
        });
        
    } catch (error) {
        console.error('Error loading featured arts:', error);
        showNotification('error', 'Erro ao carregar obras em destaque');
    }
}

// Function to create an art card element
function createArtCard(art) {
    const card = document.createElement('div');
    card.className = 'card';
    
    // Use a placeholder image if url_image is not available
    const imageUrl = art.url_image || 'https://via.placeholder.com/300x200?text=Sem+Imagem';
    
    card.innerHTML = `
        <div class="card-image" style="background-image: url('${imageUrl}')"></div>
        <div class="card-content">
            <h3 class="card-title">${art.title}</h3>
            <p class="card-text">${art.description || 'Sem descrição'}</p>
            <p class="card-text">Ano: ${art.year || 'Desconhecido'}</p>
            <p class="card-text">Artista: ${art.artist_name || 'Desconhecido'}</p>
        </div>
    `;
    
    return card;
}
