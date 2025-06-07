// Script for exhibitions.js - Handles the exhibition listing, creation, editing and deletion functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load all exhibitions
    loadExhibitions();
    
    // Load artworks for the multi-select
    loadArtworksForSelect();
    
    // Set up form submission for adding new exhibitions
    const exhibitionForm = document.getElementById('add-exhibition-form');
    if (exhibitionForm) {
        exhibitionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            createNewExhibition();
        });
    }
    
    // Set up modal listeners
    setupModalListeners();
    
    // Set up edit form submission
    const editForm = document.getElementById('edit-exhibition-form');
    if (editForm) {
        editForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updateExhibitionData();
        });
    }
});

// Function to load all exhibitions
async function loadExhibitions() {
    try {
        const exhibitions = await fetchExhibitions();
        
        // Get the container for exhibitions
        const exhibitionsGrid = document.getElementById('exhibitions-grid');
        
        // Clear loading message
        exhibitionsGrid.innerHTML = '';
        
        // If no exhibitions found
        if (exhibitions.length === 0) {
            exhibitionsGrid.innerHTML = '<p>Nenhuma exposição encontrada.</p>';
            return;
        }
        
        // Display all exhibitions
        exhibitions.forEach(exhibition => {
            const card = createExhibitionCard(exhibition);
            exhibitionsGrid.appendChild(card);
        });
        
    } catch (error) {
        console.error('Error loading exhibitions:', error);
        showNotification('error', 'Erro ao carregar exposições');
    }
}

// Function to load artworks for the multi-select
async function loadArtworksForSelect() {
    try {
        const arts = await fetchArts();
        
        // Get the select elements
        const exhibitionArtworks = document.getElementById('exhibition-artworks');
        const editExhibitionArtworks = document.getElementById('edit-exhibition-artworks');
        
        if (exhibitionArtworks) {
            // Clear existing options
            exhibitionArtworks.innerHTML = '';
            
            // Add artwork options
            arts.forEach(art => {
                const option = document.createElement('option');
                option.value = art.art_id;
                option.textContent = `${art.title} (${art.artist_name || 'Artista desconhecido'})`;
                exhibitionArtworks.appendChild(option);
            });
        }
        
        if (editExhibitionArtworks) {
            // Clear existing options
            editExhibitionArtworks.innerHTML = '';
            
            // Add artwork options
            arts.forEach(art => {
                const option = document.createElement('option');
                option.value = art.art_id;
                option.textContent = `${art.title} (${art.artist_name || 'Artista desconhecido'})`;
                editExhibitionArtworks.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error loading artworks for select:', error);
        showNotification('error', 'Erro ao carregar obras de arte');
    }
}

// Function to create an exhibition card element
function createExhibitionCard(exhibition) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.id = exhibition.exhibition_id;
    
    // Create the list of artworks linked to the exhibition
    let artworksList = '<p class="no-artworks">Nenhuma obra vinculada a esta exposição.</p>';
    
    if (exhibition.artworks && exhibition.artworks.length > 0) {
        const artworksItems = exhibition.artworks.map(artwork => 
            `<li class="artwork-item">${artwork.title}</li>`
        ).join('');
        
        artworksList = `
            <div class="exhibition-artworks">
                <h4 class="artworks-title">Obras nesta exposição:</h4>
                <ul class="artworks-list">
                    ${artworksItems}
                </ul>
            </div>
        `;
    }
    
    card.innerHTML = `
        <div class="card-content">
            <h3 class="card-title">${exhibition.name}</h3>
            <p class="card-text">${exhibition.description || 'Sem descrição'}</p>
            
            ${artworksList}
            
            <div class="card-actions">
                <button class="btn-edit" data-id="${exhibition.exhibition_id}">Editar</button>
                <button class="btn-delete" data-id="${exhibition.exhibition_id}">Excluir</button>
            </div>
        </div>
    `;
    
    // Add event listeners for edit and delete buttons
    const editBtn = card.querySelector('.btn-edit');
    const deleteBtn = card.querySelector('.btn-delete');
    
    editBtn.addEventListener('click', () => openEditModal(exhibition));
    deleteBtn.addEventListener('click', () => confirmDelete(exhibition.exhibition_id, exhibition.name));
    
    return card;
}

// Function to create a new exhibition
async function createNewExhibition() {
    try {
        // Get form values
        const name = document.getElementById('exhibition-name').value;
        const description = document.getElementById('exhibition-description').value;
        
        // Get selected artworks
        const artworksSelect = document.getElementById('exhibition-artworks');
        const selectedArtworks = Array.from(artworksSelect.selectedOptions).map(option => parseInt(option.value));
        
        // Create exhibition data object
        const exhibitionData = {
            name,
            description,
            artworks: selectedArtworks
        };
        
        // Send data to API
        const result = await createExhibition(exhibitionData);
        
        if (result.success) {
            // Clear form
            document.getElementById('add-exhibition-form').reset();
            
            // Reload exhibitions
            loadExhibitions();
            
            // Show success notification
            showNotification('success', 'Exposição criada com sucesso!');
        } else {
            throw new Error(result.error || 'Erro desconhecido');
        }
    } catch (error) {
        console.error('Error creating exhibition:', error);
        showNotification('error', 'Erro ao criar exposição. Tente novamente.');
    }
}

// Function to open edit modal
function openEditModal(exhibition) {
    // Fill form with exhibition data
    document.getElementById('edit-exhibition-id').value = exhibition.exhibition_id;
    document.getElementById('edit-exhibition-name').value = exhibition.name;
    document.getElementById('edit-exhibition-description').value = exhibition.description || '';
    
    // Select the artworks
    const artworksSelect = document.getElementById('edit-exhibition-artworks');
    
    // Clear all selections
    for (let i = 0; i < artworksSelect.options.length; i++) {
        artworksSelect.options[i].selected = false;
    }
    
    // Select the artworks that are part of this exhibition
    if (exhibition.artworks && exhibition.artworks.length > 0) {
        const artworkIds = exhibition.artworks.map(artwork => artwork.art_id.toString());
        
        for (let i = 0; i < artworksSelect.options.length; i++) {
            if (artworkIds.includes(artworksSelect.options[i].value)) {
                artworksSelect.options[i].selected = true;
            }
        }
    }
    
    // Show modal
    const modal = document.getElementById('exhibition-modal');
    if (modal) {
        modal.classList.add('active');
    }
}

// Function to update exhibition
async function updateExhibitionData() {
    try {
        // Get form values
        const id = document.getElementById('edit-exhibition-id').value;
        const name = document.getElementById('edit-exhibition-name').value;
        const description = document.getElementById('edit-exhibition-description').value;
        
        // Get selected artworks
        const artworksSelect = document.getElementById('edit-exhibition-artworks');
        const selectedArtworks = Array.from(artworksSelect.selectedOptions).map(option => parseInt(option.value));
        
        // Create exhibition data object
        const exhibitionData = {
            name,
            description,
            artworks: selectedArtworks
        };
        
        // Send data to API
        const result = await updateExhibition(id, exhibitionData);
        
        if (result.success) {
            // Close modal
            closeModal();
            
            // Reload exhibitions
            loadExhibitions();
            
            // Show success notification
            showNotification('success', 'Exposição atualizada com sucesso!');
        } else {
            throw new Error(result.error || 'Erro desconhecido');
        }
    } catch (error) {
        console.error('Error updating exhibition:', error);
        showNotification('error', 'Erro ao atualizar exposição. Tente novamente.');
    }
}

// Function to confirm deletion
function confirmDelete(id, name) {
    if (confirm(`Tem certeza que deseja excluir "${name}"?`)) {
        deleteExhibitionData(id);
    }
}

// Function to delete exhibition
async function deleteExhibitionData(id) {
    try {
        // Send delete request to API
        const result = await deleteExhibition(id);
        
        if (result.success) {
            // Reload exhibitions
            loadExhibitions();
            
            // Show success notification
            showNotification('success', 'Exposição excluída com sucesso!');
        } else {
            throw new Error(result.error || 'Erro desconhecido');
        }
    } catch (error) {
        console.error('Error deleting exhibition:', error);
        showNotification('error', 'Erro ao excluir exposição. Tente novamente.');
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
