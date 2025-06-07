// Script for artists.js - Handles the artist listing, creation, editing and deletion functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load all artists
    loadArtists();
    
    // Set up form submission for adding new artists
    const artistForm = document.getElementById('add-artist-form');
    if (artistForm) {
        artistForm.addEventListener('submit', function(e) {
            e.preventDefault();
            createNewArtist();
        });
    }
    
    // Set up modal listeners
    setupModalListeners();
    
    // Set up edit form submission
    const editForm = document.getElementById('edit-artist-form');
    if (editForm) {
        editForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updateArtistData();
        });
    }
});

// Function to load all artists
async function loadArtists() {
    try {
        const artists = await fetchArtists();
        
        // Get the container for artists
        const artistsGrid = document.getElementById('artists-grid');
        
        // Clear loading message
        artistsGrid.innerHTML = '';
        
        // If no artists found
        if (artists.length === 0) {
            artistsGrid.innerHTML = '<p>Nenhum artista encontrado.</p>';
            return;
        }
        
        // Display all artists
        artists.forEach(artist => {
            const card = createArtistCard(artist);
            artistsGrid.appendChild(card);
        });
        
    } catch (error) {
        console.error('Error loading artists:', error);
        showNotification('error', 'Erro ao carregar artistas');
    }
}

// Function to create an artist card element
function createArtistCard(artist) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.id = artist.artist_id;
    
    card.innerHTML = `
        <div class="card-content">
            <h3 class="card-title">${artist.name}</h3>
            <p class="card-text">${artist.bio || 'Sem biografia'}</p>
            <p class="card-text">Nascimento: ${artist.year || 'Desconhecido'}</p>
            <p class="card-text">Instagram: ${artist.instagram || 'Não informado'}</p>
            <div class="card-actions">
                <button class="btn-edit" data-id="${artist.artist_id}">Editar</button>
                <button class="btn-delete" data-id="${artist.artist_id}">Excluir</button>
            </div>
        </div>
    `;
    
    // Add event listeners for edit and delete buttons
    const editBtn = card.querySelector('.btn-edit');
    const deleteBtn = card.querySelector('.btn-delete');
    
    editBtn.addEventListener('click', () => openEditModal(artist));
    deleteBtn.addEventListener('click', () => confirmDelete(artist.artist_id, artist.name));
    
    return card;
}

// Function to create a new artist
async function createNewArtist() {
    try {
        // Get form values
        const name = document.getElementById('artist-name').value;
        const bio = document.getElementById('artist-bio').value;
        const year = parseInt(document.getElementById('artist-year').value);
        const instagram = document.getElementById('artist-instagram').value;
        
        // Create artist data object
        const artistData = {
            name,
            bio,
            year,
            instagram
        };
        
        // Send data to API
        const result = await createArtist(artistData);
        
        if (result.success) {
            // Clear form
            document.getElementById('add-artist-form').reset();
            
            // Reload artists
            loadArtists();
            
            // Show success notification
            showNotification('success', 'Artista criado com sucesso!');
        } else {
            throw new Error(result.error || 'Erro desconhecido');
        }
    } catch (error) {
        console.error('Error creating artist:', error);
        showNotification('error', 'Erro ao criar artista. Tente novamente.');
    }
}

// Function to open edit modal
function openEditModal(artist) {
    // Fill form with artist data
    document.getElementById('edit-artist-id').value = artist.artist_id;
    document.getElementById('edit-artist-name').value = artist.name;
    document.getElementById('edit-artist-bio').value = artist.bio || '';
    document.getElementById('edit-artist-year').value = artist.year || '';
    document.getElementById('edit-artist-instagram').value = artist.instagram || '';
    
    // Show modal
    const modal = document.getElementById('artist-modal');
    if (modal) {
        modal.classList.add('active');
    }
}

// Function to update artist
async function updateArtistData() {
    try {
        // Get form values
        const id = document.getElementById('edit-artist-id').value;
        const name = document.getElementById('edit-artist-name').value;
        const bio = document.getElementById('edit-artist-bio').value;
        const year = parseInt(document.getElementById('edit-artist-year').value);
        const instagram = document.getElementById('edit-artist-instagram').value;
        
        // Create artist data object
        const artistData = {
            name,
            bio,
            year,
            instagram
        };
        
        // Send data to API
        const result = await updateArtist(id, artistData);
        
        if (result.success) {
            // Close modal
            closeModal();
            
            // Reload artists
            loadArtists();
            
            // Show success notification
            showNotification('success', 'Artista atualizado com sucesso!');
        } else {
            throw new Error(result.error || 'Erro desconhecido');
        }
    } catch (error) {
        console.error('Error updating artist:', error);
        showNotification('error', 'Erro ao atualizar artista. Tente novamente.');
    }
}

// Function to confirm deletion
function confirmDelete(id, name) {
    if (confirm(`Tem certeza que deseja excluir "${name}"?`)) {
        deleteArtistData(id);
    }
}

// Function to delete artist
async function deleteArtistData(id) {
    try {
        // Send delete request to API
        const result = await deleteArtist(id);
        
        if (result.success) {
            // Reload artists
            loadArtists();
            
            // Show success notification
            showNotification('success', 'Artista excluído com sucesso!');
        } else {
            throw new Error(result.error || 'Erro desconhecido');
        }
    } catch (error) {
        console.error('Error deleting artist:', error);
        showNotification('error', 'Erro ao excluir artista. Tente novamente.');
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
