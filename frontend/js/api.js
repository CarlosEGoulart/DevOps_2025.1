// API utility functions for Goski Gallery
const API_BASE_URL = '../backend';

// Function to show notification
function showNotification(type, message) {
    const notification = document.getElementById(`${type}-notification`);
    if (!notification) return;
    
    // Set message
    notification.textContent = message;
    
    // Show notification
    notification.classList.add('active');
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('active');
    }, 3000);
}

// Function to fetch all art pieces
async function fetchArts() {
    try {
        const response = await fetch(`${API_BASE_URL}/read.php`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching art pieces:', error);
        showNotification('error', 'Erro ao carregar obras de arte');
        return [];
    }
}

// Function to create a new art piece
async function createArt(artData) {
    try {
        const response = await fetch(`${API_BASE_URL}/create.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(artData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error creating art piece:', error);
        showNotification('error', 'Erro ao criar obra de arte');
        throw error;
    }
}

// Function to update an art piece
async function updateArt(id, artData) {
    try {
        const response = await fetch(`${API_BASE_URL}/update.php?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(artData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error updating art piece:', error);
        showNotification('error', 'Erro ao atualizar obra de arte');
        throw error;
    }
}

// Function to delete an art piece
async function deleteArt(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/delete.php?id=${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error deleting art piece:', error);
        showNotification('error', 'Erro ao excluir obra de arte');
        throw error;
    }
}

// Function to fetch all artists
async function fetchArtists() {
    try {
        const response = await fetch(`${API_BASE_URL}/read_artists.php`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching artists:', error);
        showNotification('error', 'Erro ao carregar artistas');
        return [];
    }
}

// Function to create a new artist
async function createArtist(artistData) {
    try {
        const response = await fetch(`${API_BASE_URL}/create_artist.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(artistData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error creating artist:', error);
        showNotification('error', 'Erro ao criar artista');
        throw error;
    }
}

// Function to update an artist
async function updateArtist(id, artistData) {
    try {
        const response = await fetch(`${API_BASE_URL}/update_artist.php?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(artistData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error updating artist:', error);
        showNotification('error', 'Erro ao atualizar artista');
        throw error;
    }
}

// Function to delete an artist
async function deleteArtist(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/delete_artist.php?id=${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error deleting artist:', error);
        showNotification('error', 'Erro ao excluir artista');
        throw error;
    }
}

// Function to fetch all exhibitions
async function fetchExhibitions() {
    try {
        const response = await fetch(`${API_BASE_URL}/read_exhibitions.php`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching exhibitions:', error);
        showNotification('error', 'Erro ao carregar exposições');
        return [];
    }
}

// Function to create a new exhibition
async function createExhibition(exhibitionData) {
    try {
        const response = await fetch(`${API_BASE_URL}/create_exhibition.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(exhibitionData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error creating exhibition:', error);
        showNotification('error', 'Erro ao criar exposição');
        throw error;
    }
}

// Function to update an exhibition
async function updateExhibition(id, exhibitionData) {
    try {
        const response = await fetch(`${API_BASE_URL}/update_exhibition.php?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(exhibitionData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error updating exhibition:', error);
        showNotification('error', 'Erro ao atualizar exposição');
        throw error;
    }
}

// Function to delete an exhibition
async function deleteExhibition(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/delete_exhibition.php?id=${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error deleting exhibition:', error);
        showNotification('error', 'Erro ao excluir exposição');
        throw error;
    }
}
