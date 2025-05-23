// Script para a página de criação com suporte a vínculos
document.addEventListener('DOMContentLoaded', function() {
    // Carregar dados iniciais
    loadArtists();
    loadArtworks();
    
    // Configurar formulários
    setupForms();
    
    // Configurar listeners para notificações
    setupNotificationListeners();
});

// Carregar lista de artistas para o dropdown
async function loadArtists() {
    try {
        const response = await fetch('/api/artists');
        const artists = await response.json();
        
        const artistSelect = document.getElementById('artwork-artist');
        if (artistSelect) {
            // Limpar opções existentes, mantendo apenas a opção padrão
            artistSelect.innerHTML = '<option value="">Selecione um artista</option>';
            
            // Adicionar artistas ao dropdown
            artists.forEach(artist => {
                const option = document.createElement('option');
                option.value = artist.artist_id;
                option.textContent = artist.name;
                artistSelect.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Erro ao carregar artistas:', error);
        showNotification('error', 'Erro ao carregar lista de artistas');
    }
}

// Carregar lista de obras para o multi-select
async function loadArtworks() {
    try {
        const response = await fetch('/api/arts');
        const artworks = await response.json();
        
        const artworksSelect = document.getElementById('exhibition-artworks');
        if (artworksSelect) {
            // Limpar opções existentes
            artworksSelect.innerHTML = '';
            
            // Adicionar obras ao multi-select
            artworks.forEach(artwork => {
                const option = document.createElement('option');
                option.value = artwork.art_id;
                option.textContent = `${artwork.title} (${artwork.artist_name || 'Artista desconhecido'})`;
                artworksSelect.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Erro ao carregar obras de arte:', error);
        showNotification('error', 'Erro ao carregar lista de obras de arte');
    }
}

// Configurar formulários
function setupForms() {
    // Formulário de artistas
    const artistForm = document.getElementById('add-artist-form');
    if (artistForm) {
        artistForm.addEventListener('submit', function(e) {
            e.preventDefault();
            createArtist();
        });
    }
    
    // Formulário de obras de arte
    const artworkForm = document.getElementById('add-artwork-form');
    if (artworkForm) {
        artworkForm.addEventListener('submit', function(e) {
            e.preventDefault();
            createArtwork();
        });
    }
    
    // Formulário de exposições
    const exhibitionForm = document.getElementById('add-exhibition-form');
    if (exhibitionForm) {
        exhibitionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            createExhibition();
        });
    }
}

// Criar artista
async function createArtist() {
    try {
        const name = document.getElementById('artist-name').value;
        const bio = document.getElementById('artist-bio').value;
        const year = parseInt(document.getElementById('artist-year').value);
        const instagram = document.getElementById('artist-instagram').value;
        
        const response = await fetch('/api/artists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                bio,
                year,
                instagram
            })
        });
        
        if (!response.ok) {
            throw new Error('Erro ao criar artista');
        }
        
        // Limpar formulário
        document.getElementById('add-artist-form').reset();
        
        // Recarregar lista de artistas
        loadArtists();
        
        // Mostrar notificação de sucesso
        showNotification('success', 'Artista criado com sucesso!');
    } catch (error) {
        console.error('Erro ao criar artista:', error);
        showNotification('error', 'Erro ao criar artista. Tente novamente.');
    }
}

// Criar obra de arte com vínculo ao artista
async function createArtwork() {
    try {
        const title = document.getElementById('artwork-title').value;
        const description = document.getElementById('artwork-description').value;
        const year = parseInt(document.getElementById('artwork-year').value);
        const urlImage = document.getElementById('artwork-url').value;
        const artistId = document.getElementById('artwork-artist').value;
        
        // Verificar se um artista foi selecionado
        if (!artistId) {
            showNotification('error', 'Por favor, selecione um artista');
            return;
        }
        
        const response = await fetch('/api/arts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                year,
                urlImage,
                artistId: parseInt(artistId)
            })
        });
        
        if (!response.ok) {
            throw new Error('Erro ao criar obra de arte');
        }
        
        // Limpar formulário
        document.getElementById('add-artwork-form').reset();
        
        // Recarregar lista de obras para o multi-select de exposições
        loadArtworks();
        
        // Mostrar notificação de sucesso
        showNotification('success', 'Obra de arte criada com sucesso!');
    } catch (error) {
        console.error('Erro ao criar obra de arte:', error);
        showNotification('error', 'Erro ao criar obra de arte. Tente novamente.');
    }
}

// Criar exposição com vínculo a múltiplas obras
async function createExhibition() {
    try {
        const name = document.getElementById('exhibition-name').value;
        const description = document.getElementById('exhibition-description').value;
        
        // Obter obras selecionadas
        const artworksSelect = document.getElementById('exhibition-artworks');
        const selectedArtworks = Array.from(artworksSelect.selectedOptions).map(option => parseInt(option.value));
        
        // Verificar se pelo menos uma obra foi selecionada
        if (selectedArtworks.length === 0) {
            showNotification('error', 'Por favor, selecione pelo menos uma obra de arte');
            return;
        }
        
        // Primeiro, criar a exposição
        const response = await fetch('/api/exhibitions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                description,
                artworks: selectedArtworks // Enviando a lista de IDs das obras selecionadas
            })
        });
        
        if (!response.ok) {
            throw new Error('Erro ao criar exposição');
        }
        
        // Limpar formulário
        document.getElementById('add-exhibition-form').reset();
        
        // Mostrar notificação de sucesso
        showNotification('success', 'Exposição criada com sucesso!');
    } catch (error) {
        console.error('Erro ao criar exposição:', error);
        showNotification('error', 'Erro ao criar exposição. Tente novamente.');
    }
}

// Configurar listeners para notificações
function setupNotificationListeners() {
    // Nada a fazer aqui por enquanto
}

// Função para mostrar notificação
function showNotification(type, message) {
    const notification = document.getElementById(`${type}-notification`);
    if (!notification) return;
    
    // Definir a mensagem
    notification.textContent = message;
    
    // Mostrar a notificação
    notification.classList.add('active');
    
    // Esconder a notificação após 3 segundos
    setTimeout(() => {
        notification.classList.remove('active');
    }, 3000);
}
