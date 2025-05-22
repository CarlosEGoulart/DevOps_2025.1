// Script para a página de biblioteca
document.addEventListener('DOMContentLoaded', function() {
    // Carregar dados iniciais
    loadData();
    
    // Configurar listeners para modais
    setupModalListeners();
    
    // Configurar listeners para notificações
    setupNotificationListeners();
});

// Função para carregar dados da API
async function loadData() {
    try {
        // Buscar dados da API
        const artistsResponse = await fetch('/api/artists');
        const artsResponse = await fetch('/api/arts');
        const exhibitionsResponse = await fetch('/api/exhibitions');
        
        const artists = await artistsResponse.json();
        const arts = await artsResponse.json();
        const exhibitions = await exhibitionsResponse.json();
        
        // Renderizar os dados nas grids
        renderArtists(artists);
        renderArtworks(arts);
        renderExhibitions(exhibitions);
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        showNotification('error', 'Erro ao carregar dados. Tente novamente.');
    }
}

// Função para renderizar artistas
function renderArtists(artists) {
    const grid = document.getElementById('artists-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    artists.forEach(artist => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-content">
                <h3 class="card-title">${artist.name}</h3>
                <p class="card-text">${artist.bio || 'Sem biografia'}</p>
                <p class="card-text">Nascimento: ${artist.year}</p>
                <p class="card-text">Instagram: ${artist.instagram || 'Não informado'}</p>
                <div class="card-actions">
                    <button class="btn-edit" data-id="${artist.artist_id}" data-type="artist">Editar</button>
                    <button class="btn-delete" data-id="${artist.artist_id}" data-type="artist">Excluir</button>
                </div>
            </div>
        `;
        
        // Adicionar event listeners para os botões
        const editBtn = card.querySelector('.btn-edit');
        const deleteBtn = card.querySelector('.btn-delete');
        
        editBtn.addEventListener('click', () => openEditModal('artist', artist));
        deleteBtn.addEventListener('click', () => confirmDelete('artist', artist.artist_id, artist.name));
        
        grid.appendChild(card);
    });
}

// Função para renderizar obras de arte
function renderArtworks(artworks) {
    const grid = document.getElementById('artworks-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    artworks.forEach(artwork => {
        const card = document.createElement('div');
        card.className = 'card';
        
        // Verificar se há URL de imagem
        const imageUrl = artwork.url_image || 'https://via.placeholder.com/300x200?text=Sem+Imagem';
        
        card.innerHTML = `
            <div class="card-image" style="background-image: url('${imageUrl}')"></div>
            <div class="card-content">
                <h3 class="card-title">${artwork.title}</h3>
                <p class="card-text">${artwork.description || 'Sem descrição'}</p>
                <p class="card-text">Ano: ${artwork.year}</p>
                <p class="card-text">Artista: ${artwork.artist_name || 'Desconhecido'}</p>
                <div class="card-actions">
                    <button class="btn-edit" data-id="${artwork.art_id}" data-type="artwork">Editar</button>
                    <button class="btn-delete" data-id="${artwork.art_id}" data-type="artwork">Excluir</button>
                </div>
            </div>
        `;
        
        // Adicionar event listeners para os botões
        const editBtn = card.querySelector('.btn-edit');
        const deleteBtn = card.querySelector('.btn-delete');
        
        editBtn.addEventListener('click', () => openEditModal('artwork', artwork));
        deleteBtn.addEventListener('click', () => confirmDelete('artwork', artwork.art_id, artwork.title));
        
        grid.appendChild(card);
    });
}

// Função para renderizar exposições
function renderExhibitions(exhibitions) {
    const grid = document.getElementById('exhibitions-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    exhibitions.forEach(exhibition => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-content">
                <h3 class="card-title">${exhibition.name}</h3>
                <p class="card-text">${exhibition.description || 'Sem descrição'}</p>
                <div class="card-actions">
                    <button class="btn-edit" data-id="${exhibition.exhibition_id}" data-type="exhibition">Editar</button>
                    <button class="btn-delete" data-id="${exhibition.exhibition_id}" data-type="exhibition">Excluir</button>
                </div>
            </div>
        `;
        
        // Adicionar event listeners para os botões
        const editBtn = card.querySelector('.btn-edit');
        const deleteBtn = card.querySelector('.btn-delete');
        
        editBtn.addEventListener('click', () => openEditModal('exhibition', exhibition));
        deleteBtn.addEventListener('click', () => confirmDelete('exhibition', exhibition.exhibition_id, exhibition.name));
        
        grid.appendChild(card);
    });
}

// Função para abrir modal de edição
function openEditModal(type, item) {
    const modal = document.getElementById(`${type}-modal`);
    if (!modal) return;
    
    // Preencher o formulário com os dados do item
    const form = modal.querySelector('form');
    
    switch (type) {
        case 'artist':
            document.getElementById('edit-artist-id').value = item.artist_id;
            document.getElementById('edit-artist-name').value = item.name;
            document.getElementById('edit-artist-bio').value = item.bio || '';
            document.getElementById('edit-artist-year').value = item.year;
            document.getElementById('edit-artist-instagram').value = item.instagram || '';
            break;
            
        case 'artwork':
            document.getElementById('edit-artwork-id').value = item.art_id;
            document.getElementById('edit-artwork-title').value = item.title;
            document.getElementById('edit-artwork-description').value = item.description || '';
            document.getElementById('edit-artwork-year').value = item.year;
            document.getElementById('edit-artwork-url').value = item.url_image || '';
            break;
            
        case 'exhibition':
            document.getElementById('edit-exhibition-id').value = item.exhibition_id;
            document.getElementById('edit-exhibition-name').value = item.name;
            document.getElementById('edit-exhibition-description').value = item.description || '';
            break;
    }
    
    // Configurar o formulário para submissão
    form.onsubmit = function(e) {
        e.preventDefault();
        saveItem(type);
    };
    
    // Mostrar o modal
    modal.classList.add('active');
}

// Função para salvar item editado
async function saveItem(type) {
    try {
        let id, data, endpoint;
        
        switch (type) {
            case 'artist':
                id = document.getElementById('edit-artist-id').value;
                data = {
                    name: document.getElementById('edit-artist-name').value,
                    bio: document.getElementById('edit-artist-bio').value,
                    year: parseInt(document.getElementById('edit-artist-year').value),
                    instagram: document.getElementById('edit-artist-instagram').value
                };
                endpoint = `/api/artists/${id}`;
                break;
                
            case 'artwork':
                id = document.getElementById('edit-artwork-id').value;
                data = {
                    title: document.getElementById('edit-artwork-title').value,
                    description: document.getElementById('edit-artwork-description').value,
                    year: parseInt(document.getElementById('edit-artwork-year').value),
                    urlImage: document.getElementById('edit-artwork-url').value
                };
                endpoint = `/api/arts/${id}`;
                break;
                
            case 'exhibition':
                id = document.getElementById('edit-exhibition-id').value;
                data = {
                    name: document.getElementById('edit-exhibition-name').value,
                    description: document.getElementById('edit-exhibition-description').value
                };
                endpoint = `/api/exhibitions/${id}`;
                break;
        }
        
        // Enviar requisição para a API
        const response = await fetch(endpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error('Erro ao salvar item');
        }
        
        // Fechar o modal
        closeModal(type);
        
        // Recarregar os dados
        loadData();
        
        // Mostrar notificação de sucesso
        showNotification('success', 'Item atualizado com sucesso!');
    } catch (error) {
        console.error('Erro ao salvar item:', error);
        showNotification('error', 'Erro ao salvar item. Tente novamente.');
    }
}

// Função para confirmar exclusão
function confirmDelete(type, id, name) {
    if (confirm(`Tem certeza que deseja excluir "${name}"?`)) {
        deleteItem(type, id);
    }
}

// Função para excluir item
async function deleteItem(type, id) {
    try {
        let endpoint;
        
        switch (type) {
            case 'artist':
                endpoint = `/api/artists/${id}`;
                break;
            case 'artwork':
                endpoint = `/api/arts/${id}`;
                break;
            case 'exhibition':
                endpoint = `/api/exhibitions/${id}`;
                break;
        }
        
        // Enviar requisição para a API
        const response = await fetch(endpoint, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Erro ao excluir item');
        }
        
        // Recarregar os dados
        loadData();
        
        // Mostrar notificação de sucesso
        showNotification('success', 'Item excluído com sucesso!');
    } catch (error) {
        console.error('Erro ao excluir item:', error);
        showNotification('error', 'Erro ao excluir item. Tente novamente.');
    }
}

// Função para fechar modal
function closeModal(type) {
    const modal = document.getElementById(`${type}-modal`);
    if (modal) {
        modal.classList.remove('active');
    }
}

// Configurar listeners para modais
function setupModalListeners() {
    // Fechar modal ao clicar no botão de fechar ou fora do conteúdo
    document.querySelectorAll('.modal-close, .modal-close-btn').forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
            }
        });
    });
    
    // Fechar modal ao clicar fora do conteúdo
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });
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
