// Script para a página de criação
document.addEventListener('DOMContentLoaded', function() {
    // Configurar formulários
    setupForms();
    
    // Configurar listeners para notificações
    setupNotificationListeners();
});

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
        const birthYear = parseInt(document.getElementById('artist-birth-year').value);
        const instagram = document.getElementById('artist-instagram').value;
        
        const response = await fetch('/api/artists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                bio,
                birthYear,
                instagram
            })
        });
        
        if (!response.ok) {
            throw new Error('Erro ao criar artista');
        }
        
        // Limpar formulário
        document.getElementById('add-artist-form').reset();
        
        // Mostrar notificação de sucesso
        showNotification('success', 'Artista criado com sucesso!');
    } catch (error) {
        console.error('Erro ao criar artista:', error);
        showNotification('error', 'Erro ao criar artista. Tente novamente.');
    }
}

// Criar obra de arte
async function createArtwork() {
    try {
        const title = document.getElementById('artwork-title').value;
        const description = document.getElementById('artwork-description').value;
        const year = parseInt(document.getElementById('artwork-year').value);
        const imageUrl = document.getElementById('artwork-url').value;
        
        const response = await fetch('/api/arts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                year,
                imageUrl
            })
        });
        
        if (!response.ok) {
            throw new Error('Erro ao criar obra de arte');
        }
        
        // Limpar formulário
        document.getElementById('add-artwork-form').reset();
        
        // Mostrar notificação de sucesso
        showNotification('success', 'Obra de arte criada com sucesso!');
    } catch (error) {
        console.error('Erro ao criar obra de arte:', error);
        showNotification('error', 'Erro ao criar obra de arte. Tente novamente.');
    }
}

// Criar exposição
async function createExhibition() {
    try {
        const name = document.getElementById('exhibition-name').value;
        const date = document.getElementById('exhibition-date').value;
        const location = document.getElementById('exhibition-location').value;
        const description = document.getElementById('exhibition-description').value;
        
        const response = await fetch('/api/exhibitions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                date,
                location,
                description
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
