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
        
        // Criar a lista de obras vinculadas à exposição
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
    const modal = document.getElementById('edit-modal');
    if (!modal) return;
    
    // Limpar campos anteriores
    document.getElementById('edit-fields').innerHTML = '';
    
    // Configurar o tipo e ID do item
    document.getElementById('edit-id').value = item[`${type}_id`] || item.art_id || item.artist_id || item.exhibition_id;
    document.getElementById('edit-type').value = type;
    
    // Atualizar título do modal
    document.querySelector('.modal-title').textContent = `Editar ${getTypeName(type)}`;
    
    // Criar campos específicos para cada tipo
    let fieldsHTML = '';
    
    switch (type) {
        case 'artist':
            fieldsHTML = `
                <div class="form-group">
                    <label for="edit-name">Nome</label>
                    <input type="text" id="edit-name" name="name" value="${item.name}" required>
                </div>
                <div class="form-group">
                    <label for="edit-bio">Biografia</label>
                    <textarea id="edit-bio" name="bio">${item.bio || ''}</textarea>
                </div>
                <div class="form-group">
                    <label for="edit-year">Ano de Nascimento</label>
                    <input type="number" id="edit-year" name="year" value="${item.year}" required>
                </div>
                <div class="form-group">
                    <label for="edit-instagram">Instagram</label>
                    <input type="text" id="edit-instagram" name="instagram" value="${item.instagram || ''}">
                </div>
            `;
            break;
            
        case 'artwork':
            fieldsHTML = `
                <div class="form-group">
                    <label for="edit-title">Título</label>
                    <input type="text" id="edit-title" name="title" value="${item.title}" required>
                </div>
                <div class="form-group">
                    <label for="edit-description">Descrição</label>
                    <textarea id="edit-description" name="description">${item.description || ''}</textarea>
                </div>
                <div class="form-group">
                    <label for="edit-year">Ano</label>
                    <input type="number" id="edit-year" name="year" value="${item.year}" required>
                </div>
                <div class="form-group">
                    <label for="edit-url">URL da Imagem</label>
                    <input type="text" id="edit-url" name="urlImage" value="${item.url_image || ''}">
                </div>
            `;
            break;
            
        case 'exhibition':
            fieldsHTML = `
                <div class="form-group">
                    <label for="edit-name">Nome</label>
                    <input type="text" id="edit-name" name="name" value="${item.name}" required>
                </div>
                <div class="form-group">
                    <label for="edit-description">Descrição</label>
                    <textarea id="edit-description" name="description">${item.description || ''}</textarea>
                </div>
            `;
            break;
    }
    
    document.getElementById('edit-fields').innerHTML = fieldsHTML;
    
    // Configurar o formulário para submissão
    document.getElementById('edit-form').onsubmit = function(e) {
        e.preventDefault();
        saveItem();
    };
    
    // Mostrar o modal
    modal.classList.add('active');
}

// Função para obter nome amigável do tipo
function getTypeName(type) {
    switch (type) {
        case 'artist': return 'Artista';
        case 'artwork': return 'Obra de Arte';
        case 'exhibition': return 'Exposição';
        default: return type;
    }
}

// Função para salvar item editado
async function saveItem() {
    try {
        const type = document.getElementById('edit-type').value;
        const id = document.getElementById('edit-id').value;
        
        // Coletar dados do formulário
        const formData = new FormData(document.getElementById('edit-form'));
        const data = {};
        
        for (const [key, value] of formData.entries()) {
            if (key === 'year') {
                data[key] = parseInt(value);
            } else {
                data[key] = value;
            }
        }
        
        // Determinar o endpoint com base no tipo
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
        closeEditModal();
        
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

// Função para fechar modal de edição
function closeEditModal() {
    const modal = document.getElementById('edit-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Configurar listeners para modais
function setupModalListeners() {
    // Fechar modal ao clicar no botão de fechar
    document.querySelectorAll('.modal-close').forEach(button => {
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