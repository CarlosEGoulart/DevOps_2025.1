var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
function listarArtes() {
    fetch('/api/arts')
        .then(function (res) { return res.json(); })
        .then(function (arts) {
        var artsList = document.getElementById('arts-list');
        if (artsList) {
            artsList.innerHTML = '';
            arts.forEach(function (art) {
                var li = document.createElement('li');
                li.textContent = "ID: ".concat(art.id, ", T\u00EDtulo: ").concat(art.title, ", Descri\u00E7\u00E3o: ").concat(art.description);
                artsList.appendChild(li);
            });
        }
    });
}
function listarArtistas() {
    fetch('/api/artists')
        .then(function (res) { return res.json(); })
        .then(function (artists) {
        var artistsList = document.getElementById('artists-list');
        if (artistsList) {
            artistsList.innerHTML = '';
            artists.forEach(function (artist) {
                var li = document.createElement('li');
                li.textContent = "ID: ".concat(artist.id, ", Nome: ").concat(artist.name, ", Bio: ").concat(artist.bio);
                artistsList.appendChild(li);
            });
        }
    });
}
function listarExibicoes() {
    fetch('/api/exhibitions')
        .then(function (res) { return res.json(); })
        .then(function (exhibitions) {
        var exhibitionsList = document.getElementById('exhibitions-list');
        if (exhibitionsList) {
            exhibitionsList.innerHTML = '';
            exhibitions.forEach(function (exhibition) {
                var li = document.createElement('li');
                li.textContent = "ID: ".concat(exhibition.id, ", Nome: ").concat(exhibition.name, ", Data: ").concat(exhibition.date);
                exhibitionsList.appendChild(li);
            });
        }
    });
}
function criarArte(e) {
    var _a, _b, _c, _d;
    if (e)
        e.preventDefault();
    var title = (_a = document.getElementById('art-title')) === null || _a === void 0 ? void 0 : _a.value;
    var description = (_b = document.getElementById('art-description')) === null || _b === void 0 ? void 0 : _b.value;
    var year = parseInt((_c = document.getElementById('art-year')) === null || _c === void 0 ? void 0 : _c.value);
    var imageUrl = (_d = document.getElementById('art-image-url')) === null || _d === void 0 ? void 0 : _d.value;
    fetch('/api/arts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title, description: description, year: year, imageUrl: imageUrl })
    })
        .then(function (res) { return res.json(); })
        .then(function () {
        var _a;
        listarArtes();
        (_a = document.getElementById('add-artwork-form')) === null || _a === void 0 ? void 0 : _a.reset();
    });
}
function criarArtista(e) {
    var _a, _b, _c, _d;
    if (e)
        e.preventDefault();
    var name = (_a = document.getElementById('artist-name')) === null || _a === void 0 ? void 0 : _a.value;
    var bio = (_b = document.getElementById('artist-bio')) === null || _b === void 0 ? void 0 : _b.value;
    var birthYear = parseInt((_c = document.getElementById('artist-birth-year')) === null || _c === void 0 ? void 0 : _c.value);
    var instagram = (_d = document.getElementById('artist-instagram')) === null || _d === void 0 ? void 0 : _d.value;
    fetch('/api/artists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, bio: bio, birthYear: birthYear, instagram: instagram })
    })
        .then(function (res) { return res.json(); })
        .then(function () {
        var _a;
        listarArtistas();
        (_a = document.getElementById('add-artist-form')) === null || _a === void 0 ? void 0 : _a.reset();
    });
}
function criarExibicao(e) {
    var _a, _b, _c, _d, _e;
    if (e)
        e.preventDefault();
    var name = (_a = document.getElementById('exhibition-name')) === null || _a === void 0 ? void 0 : _a.value;
    var date = (_b = document.getElementById('exhibition-date')) === null || _b === void 0 ? void 0 : _b.value;
    var location = (_c = document.getElementById('exhibition-location')) === null || _c === void 0 ? void 0 : _c.value;
    var artistId = parseInt((_d = document.getElementById('exhibition-artist-id')) === null || _d === void 0 ? void 0 : _d.value);
    var artId = parseInt((_e = document.getElementById('exhibition-art-id')) === null || _e === void 0 ? void 0 : _e.value);
    fetch('/api/exhibitions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, date: date, location: location, artistId: artistId, artId: artId })
    })
        .then(function (res) { return res.json(); })
        .then(function () {
        var _a;
        listarExibicoes();
        (_a = document.getElementById('add-exhibition-form')) === null || _a === void 0 ? void 0 : _a.reset();
    });
}
function deletarArte() {
    var _a;
    var id = parseInt((_a = document.getElementById('art-id')) === null || _a === void 0 ? void 0 : _a.value);
    fetch("/api/arts/".concat(id), { method: 'DELETE' })
        .then(function (res) { return res.json(); })
        .then(function () { return listarArtes(); });
}
function atualizarArte() {
    var _a, _b, _c, _d;
    var id = parseInt((_a = document.getElementById('art-id')) === null || _a === void 0 ? void 0 : _a.value);
    var title = (_b = document.getElementById('art-title')) === null || _b === void 0 ? void 0 : _b.value;
    var description = (_c = document.getElementById('art-description')) === null || _c === void 0 ? void 0 : _c.value;
    var year = parseInt((_d = document.getElementById('art-year')) === null || _d === void 0 ? void 0 : _d.value);
    fetch("/api/arts/".concat(id), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title, description: description, year: year })
    })
        .then(function (res) { return res.json(); })
        .then(function () { return listarArtes(); });
}
function deletarArtista() {
    var _a;
    var id = parseInt((_a = document.getElementById('artist-id')) === null || _a === void 0 ? void 0 : _a.value);
    fetch("/api/artists/".concat(id), { method: 'DELETE' })
        .then(function (res) { return res.json(); })
        .then(function () { return listarArtistas(); });
}
function atualizarArtista() {
    var _a, _b, _c, _d, _e;
    var id = parseInt((_a = document.getElementById('artist-id')) === null || _a === void 0 ? void 0 : _a.value);
    var name = (_b = document.getElementById('artist-name')) === null || _b === void 0 ? void 0 : _b.value;
    var bio = (_c = document.getElementById('artist-bio')) === null || _c === void 0 ? void 0 : _c.value;
    var birthYear = parseInt((_d = document.getElementById('artist-birth-year')) === null || _d === void 0 ? void 0 : _d.value);
    var instagram = (_e = document.getElementById('artist-instagram')) === null || _e === void 0 ? void 0 : _e.value;
    fetch("/api/artists/".concat(id), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, bio: bio, birthYear: birthYear, instagram: instagram })
    })
        .then(function (res) { return res.json(); })
        .then(function () { return listarArtistas(); });
}
function deletarExibicao() {
    var _a;
    var id = parseInt((_a = document.getElementById('exhibition-id')) === null || _a === void 0 ? void 0 : _a.value);
    fetch("/api/exhibitions/".concat(id), { method: 'DELETE' })
        .then(function (res) { return res.json(); })
        .then(function () { return listarExibicoes(); });
}
function atualizarExibicao() {
    var _a, _b, _c, _d, _e, _f;
    var id = parseInt((_a = document.getElementById('exhibition-id')) === null || _a === void 0 ? void 0 : _a.value);
    var name = (_b = document.getElementById('exhibition-name')) === null || _b === void 0 ? void 0 : _b.value;
    var date = (_c = document.getElementById('exhibition-date')) === null || _c === void 0 ? void 0 : _c.value;
    var location = (_d = document.getElementById('exhibition-location')) === null || _d === void 0 ? void 0 : _d.value;
    var artistId = parseInt((_e = document.getElementById('exhibition-artist-id')) === null || _e === void 0 ? void 0 : _e.value);
    var artId = parseInt((_f = document.getElementById('exhibition-art-id')) === null || _f === void 0 ? void 0 : _f.value);
    fetch("/api/exhibitions/".concat(id), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, date: date, location: location, artistId: artistId, artId: artId })
    })
        .then(function (res) { return res.json(); })
        .then(function () { return listarExibicoes(); });
}
function atribuirArtista() {
    var _a, _b;
    var artId = parseInt((_a = document.getElementById('art-id')) === null || _a === void 0 ? void 0 : _a.value);
    var artistId = parseInt((_b = document.getElementById('artist-id')) === null || _b === void 0 ? void 0 : _b.value);
    fetch("/api/arts/".concat(artId, "/assign/").concat(artistId), { method: 'POST' })
        .then(function (res) { return res.json(); })
        .then(function () { return listarArtes(); });
}
function atribuirArteExibicao() {
    var _a, _b;
    var exhibitionId = parseInt((_a = document.getElementById('exhibition-id')) === null || _a === void 0 ? void 0 : _a.value);
    var artId = parseInt((_b = document.getElementById('art-id')) === null || _b === void 0 ? void 0 : _b.value);
    fetch("/api/exhibitions/".concat(exhibitionId, "/assign/").concat(artId), { method: 'POST' })
        .then(function (res) { return res.json(); })
        .then(function () { return listarExibicoes(); });
}
document.addEventListener('DOMContentLoaded', function () {
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
    var loadData = function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, artistsRes, artsRes, exhibitionsRes, _b, artists, arts, exhibitions, artistsGrid, artsGrid, exhibitionsGrid;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, Promise.all([
                        fetch('/api/artists'),
                        fetch('/api/arts'),
                        fetch('/api/exhibitions'),
                    ])];
                case 1:
                    _a = _c.sent(), artistsRes = _a[0], artsRes = _a[1], exhibitionsRes = _a[2];
                    return [4 /*yield*/, Promise.all([
                            artistsRes.json(),
                            artsRes.json(),
                            exhibitionsRes.json(),
                        ])];
                case 2:
                    _b = _c.sent(), artists = _b[0], arts = _b[1], exhibitions = _b[2];
                    artistsGrid = document.getElementById('artists-grid');
                    if (artistsGrid) {
                        artistsGrid.innerHTML = artists.map(function (a) { return "<div>".concat(a.name, "</div>"); }).join('');
                    }
                    artsGrid = document.getElementById('artworks-grid');
                    if (artsGrid) {
                        artsGrid.innerHTML = arts.map(function (a) { return "<div>".concat(a.title, "</div>"); }).join('');
                    }
                    exhibitionsGrid = document.getElementById('exhibitions-grid');
                    if (exhibitionsGrid) {
                        exhibitionsGrid.innerHTML = exhibitions.map(function (e) { return "<div>".concat(e.name, "</div>"); }).join('');
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    loadData();
});
