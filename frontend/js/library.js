// Script for library.js - Handles the artwork listing, editing and deletion functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load all artworks
    loadArtworks();
    
    // Set up modal listeners
    setupModalListeners();
    
    // Set up edit form submission
    const editForm = document.getElementById('edit-artwork-form');
    if (editForm) {
        editForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updateArtwork();
        });
    }
});

// Function to load all artworks
async function loadArtworks() {
    try {
        const arts = await fetchArts();
        
        // Get the container for artworks
        const artworksGrid = document.getElementById('artworks-grid');
        
        // Clear loading message
        artworksGrid.innerHTML = '';
        
        // If no arts found
        if (arts.length === 0) {
            artworksGrid.innerHTML = '<p>Nenhuma obra encontrada.</p>';
            return;
        }
        
        // Display all arts
        arts.forEach(art => {
            const card = createArtCard(art);
            artworksGrid.appendChild(card);
        });
        
    } catch (error) {
        console.error('Error loading artworks:', error);
        showNotification('error', 'Erro ao carregar obras de arte');
    }
}

// Function to create an art card element with edit and delete buttons
function createArtCard(art) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.id = art.art_id;
    
    // Use a placeholder image if url_image is not available
    const imageUrl = art.url_image || 'https://via.placeholder.com/300x200?text=Sem+Imagem';
    
    card.innerHTML = `
        <div class="card-image" style="background-image: url('${imageUrl}')"></div>
        <div class="card-content">
            <h3 class="card-title">${art.title}</h3>
            <p class="card-text">${art.description || 'Sem descrição'}</p>
            <p class="card-text">Ano: ${art.year || 'Desconhecido'}</p>
            <p class="card-text">Artista: ${art.artist_name || 'Desconhecido'}</p>
            <div class="card-actions">
                <button class="btn-edit" data-id="${art.art_id}">Editar</button>
                <button class="btn-delete" data-id="${art.art_id}">Excluir</button>
            </div>
        </div>
    `;
    
    // Add event listeners for edit and delete buttons
    const editBtn = card.querySelector('.btn-edit');
    const deleteBtn = card.querySelector('.btn-delete');
    
    editBtn.addEventListener('click', () => openEditModal(art));
    deleteBtn.addEventListener('click', () => confirmDelete(art.art_id, art.title));
    
    return card;
}

// Function to open edit modal
function openEditModal(art) {
    // Fill form with art data
    document.getElementById('edit-artwork-id').value = art.art_id;
    document.getElementById('edit-artwork-title').value = art.title;
    document.getElementById('edit-artwork-description').value = art.description || '';
    document.getElementById('edit-artwork-year').value = art.year || '';
    document.getElementById('edit-artwork-url').value = art.url_image || '';
    document.getElementById('edit-artwork-artist').value = art.artist_name || '';
    
    // Show modal
    const modal = document.getElementById('artwork-modal');
    if (modal) {
        modal.classList.add('active');
    }
}

// Function to update artwork
async function updateArtwork() {
    try {
        // Get form values
        const id = document.getElementById('edit-artwork-id').value;
        const title = document.getElementById('edit-artwork-title').value;
        const description = document.getElementById('edit-artwork-description').value;
        const year = parseInt(document.getElementById('edit-artwork-year').value);
        const url_image = document.getElementById('edit-artwork-url').value;
        const artist_name = document.getElementById('edit-artwork-artist').value;
        
        // Create artwork data object
        const artworkData = {
            title,
            description,
            year,
            url_image,
            artist_name
        };
        
        // Send data to API
        const result = await updateArt(id, artworkData);
        
        if (result.success) {
            // Close modal
            closeModal();
            
            // Reload artworks
            loadArtworks();
            
            // Show success notification
            showNotification('success', 'Obra de arte atualizada com sucesso!');
        } else {
            throw new Error(result.error || 'Erro desconhecido');
        }
    } catch (error) {
        console.error('Error updating artwork:', error);
        showNotification('error', 'Erro ao atualizar obra de arte. Tente novamente.');
    }
}

// Function to confirm deletion
function confirmDelete(id, title) {
    if (confirm(`Tem certeza que deseja excluir "${title}"?`)) {
        deleteArtwork(id);
    }
}

// Function to delete artwork
async function deleteArtwork(id) {
    try {
        // Send delete request to API
        const result = await deleteArt(id);
        
        if (result.success) {
            // Reload artworks
            loadArtworks();
            
            // Show success notification
            showNotification('success', 'Obra de arte excluída com sucesso!');
        } else {
            throw new Error(result.error || 'Erro desconhecido');
        }
    } catch (error) {
        console.error('Error deleting artwork:', error);
        showNotification('error', 'Erro ao excluir obra de arte. Tente novamente.');
    }
}

// Function to set up modal listeners
function setupModalListeners() {
    // Close modal when clicking on close button or outside content
    document.querySelectorAll('.modal-close, .modal-close-btn').forEach(button => {
        button.addEventListener('click', closeModal);
    });
    
    // Close modal when clicking outside content
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    });
}

// Function to close modal
function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
}
