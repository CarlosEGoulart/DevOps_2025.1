"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function listarArtes() {
    fetch('/api/arts')
        .then(res => res.json())
        .then(arts => {
        const artsList = document.getElementById('arts-list');
        if (artsList) {
            artsList.innerHTML = '';
            arts.forEach((art) => {
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
            artists.forEach((artist) => {
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
            exhibitions.forEach((exhibition) => {
                const li = document.createElement('li');
                li.textContent = `ID: ${exhibition.id}, Nome: ${exhibition.name}, Data: ${exhibition.date}`;
                exhibitionsList.appendChild(li);
            });
        }
    });
}
function criarArte(e) {
    var _a, _b, _c, _d;
    if (e)
        e.preventDefault();
    const title = (_a = document.getElementById('art-title')) === null || _a === void 0 ? void 0 : _a.value;
    const description = (_b = document.getElementById('art-description')) === null || _b === void 0 ? void 0 : _b.value;
    const year = parseInt((_c = document.getElementById('art-year')) === null || _c === void 0 ? void 0 : _c.value);
    const imageUrl = (_d = document.getElementById('art-image-url')) === null || _d === void 0 ? void 0 : _d.value;
    fetch('/api/arts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, year, imageUrl })
    })
        .then(res => res.json())
        .then(() => {
        var _a;
        listarArtes();
        (_a = document.getElementById('add-artwork-form')) === null || _a === void 0 ? void 0 : _a.reset();
    });
}
function criarArtista(e) {
    var _a, _b, _c, _d;
    if (e)
        e.preventDefault();
    const name = (_a = document.getElementById('artist-name')) === null || _a === void 0 ? void 0 : _a.value;
    const bio = (_b = document.getElementById('artist-bio')) === null || _b === void 0 ? void 0 : _b.value;
    const birthYear = parseInt((_c = document.getElementById('artist-birth-year')) === null || _c === void 0 ? void 0 : _c.value);
    const instagram = (_d = document.getElementById('artist-instagram')) === null || _d === void 0 ? void 0 : _d.value;
    fetch('/api/artists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, bio, birthYear, instagram })
    })
        .then(res => res.json())
        .then(() => {
        var _a;
        listarArtistas();
        (_a = document.getElementById('add-artist-form')) === null || _a === void 0 ? void 0 : _a.reset();
    });
}
function criarExibicao(e) {
    var _a, _b, _c, _d, _e;
    if (e)
        e.preventDefault();
    const name = (_a = document.getElementById('exhibition-name')) === null || _a === void 0 ? void 0 : _a.value;
    const date = (_b = document.getElementById('exhibition-date')) === null || _b === void 0 ? void 0 : _b.value;
    const location = (_c = document.getElementById('exhibition-location')) === null || _c === void 0 ? void 0 : _c.value;
    const artistId = parseInt((_d = document.getElementById('exhibition-artist-id')) === null || _d === void 0 ? void 0 : _d.value);
    const artId = parseInt((_e = document.getElementById('exhibition-art-id')) === null || _e === void 0 ? void 0 : _e.value);
    fetch('/api/exhibitions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, date, location, artistId, artId })
    })
        .then(res => res.json())
        .then(() => {
        var _a;
        listarExibicoes();
        (_a = document.getElementById('add-exhibition-form')) === null || _a === void 0 ? void 0 : _a.reset();
    });
}
function deletarArte() {
    var _a;
    const id = parseInt((_a = document.getElementById('art-id')) === null || _a === void 0 ? void 0 : _a.value);
    fetch(`/api/arts/${id}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(() => listarArtes());
}
function atualizarArte() {
    var _a, _b, _c, _d;
    const id = parseInt((_a = document.getElementById('art-id')) === null || _a === void 0 ? void 0 : _a.value);
    const title = (_b = document.getElementById('art-title')) === null || _b === void 0 ? void 0 : _b.value;
    const description = (_c = document.getElementById('art-description')) === null || _c === void 0 ? void 0 : _c.value;
    const year = parseInt((_d = document.getElementById('art-year')) === null || _d === void 0 ? void 0 : _d.value);
    fetch(`/api/arts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, year })
    })
        .then(res => res.json())
        .then(() => listarArtes());
}
function deletarArtista() {
    var _a;
    const id = parseInt((_a = document.getElementById('artist-id')) === null || _a === void 0 ? void 0 : _a.value);
    fetch(`/api/artists/${id}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(() => listarArtistas());
}
function atualizarArtista() {
    var _a, _b, _c, _d, _e;
    const id = parseInt((_a = document.getElementById('artist-id')) === null || _a === void 0 ? void 0 : _a.value);
    const name = (_b = document.getElementById('artist-name')) === null || _b === void 0 ? void 0 : _b.value;
    const bio = (_c = document.getElementById('artist-bio')) === null || _c === void 0 ? void 0 : _c.value;
    const birthYear = parseInt((_d = document.getElementById('artist-birth-year')) === null || _d === void 0 ? void 0 : _d.value);
    const instagram = (_e = document.getElementById('artist-instagram')) === null || _e === void 0 ? void 0 : _e.value;
    fetch(`/api/artists/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, bio, birthYear, instagram })
    })
        .then(res => res.json())
        .then(() => listarArtistas());
}
function deletarExibicao() {
    var _a;
    const id = parseInt((_a = document.getElementById('exhibition-id')) === null || _a === void 0 ? void 0 : _a.value);
    fetch(`/api/exhibitions/${id}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(() => listarExibicoes());
}
function atualizarExibicao() {
    var _a, _b, _c, _d, _e, _f;
    const id = parseInt((_a = document.getElementById('exhibition-id')) === null || _a === void 0 ? void 0 : _a.value);
    const name = (_b = document.getElementById('exhibition-name')) === null || _b === void 0 ? void 0 : _b.value;
    const date = (_c = document.getElementById('exhibition-date')) === null || _c === void 0 ? void 0 : _c.value;
    const location = (_d = document.getElementById('exhibition-location')) === null || _d === void 0 ? void 0 : _d.value;
    const artistId = parseInt((_e = document.getElementById('exhibition-artist-id')) === null || _e === void 0 ? void 0 : _e.value);
    const artId = parseInt((_f = document.getElementById('exhibition-art-id')) === null || _f === void 0 ? void 0 : _f.value);
    fetch(`/api/exhibitions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, date, location, artistId, artId })
    })
        .then(res => res.json())
        .then(() => listarExibicoes());
}
function atribuirArtista() {
    var _a, _b;
    const artId = parseInt((_a = document.getElementById('art-id')) === null || _a === void 0 ? void 0 : _a.value);
    const artistId = parseInt((_b = document.getElementById('artist-id')) === null || _b === void 0 ? void 0 : _b.value);
    fetch(`/api/arts/${artId}/assign/${artistId}`, { method: 'POST' })
        .then(res => res.json())
        .then(() => listarArtes());
}
function atribuirArteExibicao() {
    var _a, _b;
    const exhibitionId = parseInt((_a = document.getElementById('exhibition-id')) === null || _a === void 0 ? void 0 : _a.value);
    const artId = parseInt((_b = document.getElementById('art-id')) === null || _b === void 0 ? void 0 : _b.value);
    fetch(`/api/exhibitions/${exhibitionId}/assign/${artId}`, { method: 'POST' })
        .then(res => res.json())
        .then(() => listarExibicoes());
}
document.addEventListener('DOMContentLoaded', () => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    // Listagem inicial
    listarArtes();
    listarArtistas();
    listarExibicoes();
    // Botões
    (_a = document.getElementById('create-art')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', criarArte);
    (_b = document.getElementById('delete-art')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', deletarArte);
    (_c = document.getElementById('update-art')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', atualizarArte);
    (_d = document.getElementById('assign-artist')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', atribuirArtista);
    (_e = document.getElementById('create-artist')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', criarArtista);
    (_f = document.getElementById('delete-artist')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', deletarArtista);
    (_g = document.getElementById('update-artist')) === null || _g === void 0 ? void 0 : _g.addEventListener('click', atualizarArtista);
    (_h = document.getElementById('create-exhibition')) === null || _h === void 0 ? void 0 : _h.addEventListener('click', criarExibicao);
    (_j = document.getElementById('delete-exhibition')) === null || _j === void 0 ? void 0 : _j.addEventListener('click', deletarExibicao);
    (_k = document.getElementById('update-exhibition')) === null || _k === void 0 ? void 0 : _k.addEventListener('click', atualizarExibicao);
    (_l = document.getElementById('assign-art-to-exhibition')) === null || _l === void 0 ? void 0 : _l.addEventListener('click', atribuirArteExibicao);
    // Formulários
    (_m = document.getElementById('add-artist-form')) === null || _m === void 0 ? void 0 : _m.addEventListener('submit', criarArtista);
    (_o = document.getElementById('add-artwork-form')) === null || _o === void 0 ? void 0 : _o.addEventListener('submit', criarArte);
    (_p = document.getElementById('add-exhibition-form')) === null || _p === void 0 ? void 0 : _p.addEventListener('submit', criarExibicao);
    // Listagem dinâmica para grids (ex: library.html)
    const loadData = () => __awaiter(void 0, void 0, void 0, function* () {
        const [artistsRes, artsRes, exhibitionsRes] = yield Promise.all([
            fetch('/api/artists'),
            fetch('/api/arts'),
            fetch('/api/exhibitions'),
        ]);
        const [artists, arts, exhibitions] = yield Promise.all([
            artistsRes.json(),
            artsRes.json(),
            exhibitionsRes.json(),
        ]);
        const artistsGrid = document.getElementById('artists-grid');
        if (artistsGrid) {
            artistsGrid.innerHTML = artists.map((a) => `<div>${a.name}</div>`).join('');
        }
        const artsGrid = document.getElementById('artworks-grid');
        if (artsGrid) {
            artsGrid.innerHTML = arts.map((a) => `<div>${a.title}</div>`).join('');
        }
        const exhibitionsGrid = document.getElementById('exhibitions-grid');
        if (exhibitionsGrid) {
            exhibitionsGrid.innerHTML = exhibitions.map((e) => `<div>${e.name}</div>`).join('');
        }
    });
    loadData();
});
