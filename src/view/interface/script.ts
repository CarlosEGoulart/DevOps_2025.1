function listarArtes() {
    fetch('/api/arts')
        .then(res => res.json())
        .then(arts => {
            const artsList = document.getElementById('arts-list');
            if (artsList) {
                artsList.innerHTML = '';
                arts.forEach((art: { id: any; title: any; description: any; }) => {
                    const li = document.createElement('li');
                    li.textContent = `ID: ${art.id}, Título: ${art.title}, Descrição: ${art.description}`;
                    artsList.appendChild(li);
                });
            }
        });
}

function listarArtistas() {
    fetch('/api/artists')
        .then(res => res.json())
        .then(artists => {
            const artistsList = document.getElementById('artists-list');
            if (artistsList) {
                artistsList.innerHTML = '';
                artists.forEach((artist: { id: any; name: any; bio: any; }) => {
                    const li = document.createElement('li');
                    li.textContent = `ID: ${artist.id}, Nome: ${artist.name}, Bio: ${artist.bio}`;
                    artistsList.appendChild(li);
                });
            }
        });
}

function listarExibicoes() {
    fetch('/api/exhibitions')
        .then(res => res.json())
        .then(exhibitions => {
            const exhibitionsList = document.getElementById('exhibitions-list');
            if (exhibitionsList) {
                exhibitionsList.innerHTML = '';
                exhibitions.forEach((exhibition: { id: any; name: any; date: any; }) => {
                    const li = document.createElement('li');
                    li.textContent = `ID: ${exhibition.id}, Nome: ${exhibition.name}, Data: ${exhibition.date}`;
                    exhibitionsList.appendChild(li);
                });
            }
        });
}

function criarArte(e?: Event) {
    if (e) e.preventDefault();
    const title = (document.getElementById('art-title') as HTMLInputElement)?.value;
    const description = (document.getElementById('art-description') as HTMLInputElement)?.value;
    const year = parseInt((document.getElementById('art-year') as HTMLInputElement)?.value);
    const imageUrl = (document.getElementById('art-image-url') as HTMLInputElement)?.value;

    fetch('/api/arts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, year, imageUrl })
    })
        .then(res => res.json())
        .then(() => {
            listarArtes();
            (document.getElementById('add-artwork-form') as HTMLFormElement)?.reset();
        });
}

function criarArtista(e?: Event) {
    if (e) e.preventDefault();
    const name = (document.getElementById('artist-name') as HTMLInputElement)?.value;
    const bio = (document.getElementById('artist-bio') as HTMLInputElement)?.value;
    const birthYear = parseInt((document.getElementById('artist-birth-year') as HTMLInputElement)?.value);
    const instagram = (document.getElementById('artist-instagram') as HTMLInputElement)?.value;

    fetch('/api/artists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, bio, birthYear, instagram })
    })
        .then(res => res.json())
        .then(() => {
            listarArtistas();
            (document.getElementById('add-artist-form') as HTMLFormElement)?.reset();
        });
}

function criarExibicao(e?: Event) {
    if (e) e.preventDefault();
    const name = (document.getElementById('exhibition-name') as HTMLInputElement)?.value;
    const date = (document.getElementById('exhibition-date') as HTMLInputElement)?.value;
    const location = (document.getElementById('exhibition-location') as HTMLInputElement)?.value;
    const artistId = parseInt((document.getElementById('exhibition-artist-id') as HTMLInputElement)?.value);
    const artId = parseInt((document.getElementById('exhibition-art-id') as HTMLInputElement)?.value);

    fetch('/api/exhibitions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, date, location, artistId, artId })
    })
        .then(res => res.json())
        .then(() => {
            listarExibicoes();
            (document.getElementById('add-exhibition-form') as HTMLFormElement)?.reset();
        });
}

function deletarArte() {
    const id = parseInt((document.getElementById('art-id') as HTMLInputElement)?.value);
    fetch(`/api/arts/${id}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(() => listarArtes());
}

function atualizarArte() {
    const id = parseInt((document.getElementById('art-id') as HTMLInputElement)?.value);
    const title = (document.getElementById('art-title') as HTMLInputElement)?.value;
    const description = (document.getElementById('art-description') as HTMLInputElement)?.value;
    const year = parseInt((document.getElementById('art-year') as HTMLInputElement)?.value);

    fetch(`/api/arts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, year })
    })
        .then(res => res.json())
        .then(() => listarArtes());
}

function deletarArtista() {
    const id = parseInt((document.getElementById('artist-id') as HTMLInputElement)?.value);
    fetch(`/api/artists/${id}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(() => listarArtistas());
}

function atualizarArtista() {
    const id = parseInt((document.getElementById('artist-id') as HTMLInputElement)?.value);
    const name = (document.getElementById('artist-name') as HTMLInputElement)?.value;
    const bio = (document.getElementById('artist-bio') as HTMLInputElement)?.value;
    const birthYear = parseInt((document.getElementById('artist-birth-year') as HTMLInputElement)?.value);
    const instagram = (document.getElementById('artist-instagram') as HTMLInputElement)?.value;

    fetch(`/api/artists/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, bio, birthYear, instagram })
    })
        .then(res => res.json())
        .then(() => listarArtistas());
}

function deletarExibicao() {
    const id = parseInt((document.getElementById('exhibition-id') as HTMLInputElement)?.value);
    fetch(`/api/exhibitions/${id}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(() => listarExibicoes());
}

function atualizarExibicao() {
    const id = parseInt((document.getElementById('exhibition-id') as HTMLInputElement)?.value);
    const name = (document.getElementById('exhibition-name') as HTMLInputElement)?.value;
    const date = (document.getElementById('exhibition-date') as HTMLInputElement)?.value;
    const location = (document.getElementById('exhibition-location') as HTMLInputElement)?.value;
    const artistId = parseInt((document.getElementById('exhibition-artist-id') as HTMLInputElement)?.value);
    const artId = parseInt((document.getElementById('exhibition-art-id') as HTMLInputElement)?.value);

    fetch(`/api/exhibitions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, date, location, artistId, artId })
    })
        .then(res => res.json())
        .then(() => listarExibicoes());
}

function atribuirArtista() {
    const artId = parseInt((document.getElementById('art-id') as HTMLInputElement)?.value);
    const artistId = parseInt((document.getElementById('artist-id') as HTMLInputElement)?.value);

    fetch(`/api/arts/${artId}/assign/${artistId}`, { method: 'POST' })
        .then(res => res.json())
        .then(() => listarArtes());
}

function atribuirArteExibicao() {
    const exhibitionId = parseInt((document.getElementById('exhibition-id') as HTMLInputElement)?.value);
    const artId = parseInt((document.getElementById('art-id') as HTMLInputElement)?.value);

    fetch(`/api/exhibitions/${exhibitionId}/assign/${artId}`, { method: 'POST' })
        .then(res => res.json())
        .then(() => listarExibicoes());
}

document.addEventListener('DOMContentLoaded', () => {
    // Listagem inicial
    listarArtes();
    listarArtistas();
    listarExibicoes();

    // Botões
    document.getElementById('create-art')?.addEventListener('click', criarArte);
    document.getElementById('delete-art')?.addEventListener('click', deletarArte);
    document.getElementById('update-art')?.addEventListener('click', atualizarArte);
    document.getElementById('assign-artist')?.addEventListener('click', atribuirArtista);

    document.getElementById('create-artist')?.addEventListener('click', criarArtista);
    document.getElementById('delete-artist')?.addEventListener('click', deletarArtista);
    document.getElementById('update-artist')?.addEventListener('click', atualizarArtista);

    document.getElementById('create-exhibition')?.addEventListener('click', criarExibicao);
    document.getElementById('delete-exhibition')?.addEventListener('click', deletarExibicao);
    document.getElementById('update-exhibition')?.addEventListener('click', atualizarExibicao);
    document.getElementById('assign-art-to-exhibition')?.addEventListener('click', atribuirArteExibicao);

    // Formulários
    (document.getElementById('add-artist-form') as HTMLFormElement)?.addEventListener('submit', criarArtista);
    (document.getElementById('add-artwork-form') as HTMLFormElement)?.addEventListener('submit', criarArte);
    (document.getElementById('add-exhibition-form') as HTMLFormElement)?.addEventListener('submit', criarExibicao);

    // Listagem dinâmica para grids (ex: library.html)
    const loadData = async () => {
        const [artistsRes, artsRes, exhibitionsRes] = await Promise.all([
            fetch('/api/artists'),
            fetch('/api/arts'),
            fetch('/api/exhibitions'),
        ]);
        const [artists, arts, exhibitions] = await Promise.all([
            artistsRes.json(),
            artsRes.json(),
            exhibitionsRes.json(),
        ]);

        const artistsGrid = document.getElementById('artists-grid');
        if (artistsGrid) {
            artistsGrid.innerHTML = artists.map((a: any) => `<div>${a.name}</div>`).join('');
        }

        const artsGrid = document.getElementById('artworks-grid');
        if (artsGrid) {
            artsGrid.innerHTML = arts.map((a: any) => `<div>${a.title}</div>`).join('');
        }

        const exhibitionsGrid = document.getElementById('exhibitions-grid');
        if (exhibitionsGrid) {
            exhibitionsGrid.innerHTML = exhibitions.map((e: any) => `<div>${e.name}</div>`).join('');
        }
    };

    loadData();
});
