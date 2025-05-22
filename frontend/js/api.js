// API simulada para o frontend
// Este arquivo fornece uma API simulada para o frontend funcionar sem backend real

// Dados iniciais
let artists = [
  { artist_id: 1, name: 'Pablo Picasso', bio: 'Artista espanhol, fundador do cubismo', year: 1881, instagram: '@picasso_legacy' },
  { artist_id: 2, name: 'Frida Kahlo', bio: 'Pintora mexicana conhecida por seus autorretratos', year: 1907, instagram: '@frida_kahlo_foundation' },
  { artist_id: 3, name: 'Salvador Dalí', bio: 'Mestre do surrealismo', year: 1904, instagram: '@dali_universe' }
];

let arts = [
  { art_id: 1, title: 'Guernica', description: 'Obra-prima que retrata os horrores da Guerra Civil Espanhola', year: 1937, url_image: 'https://upload.wikimedia.org/wikipedia/en/7/74/PicassoGuernica.jpg', artist_id: 1 },
  { art_id: 2, title: 'As Duas Fridas', description: 'Autorretrato duplo de Frida Kahlo', year: 1939, url_image: 'https://upload.wikimedia.org/wikipedia/en/8/8f/The_Two_Fridas.jpg', artist_id: 2 },
  { art_id: 3, title: 'A Persistência da Memória', description: 'Famosa obra surrealista com relógios derretidos', year: 1931, url_image: 'https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg', artist_id: 3 }
];

let exhibitions = [
  { exhibition_id: 1, name: 'Modernismo Europeu', description: 'Exposição sobre o movimento modernista na Europa' },
  { exhibition_id: 2, name: 'Arte Latino-Americana', description: 'Celebração da arte e cultura latino-americana' },
  { exhibition_id: 3, name: 'Surrealismo e Além', description: 'Explorando o movimento surrealista e seu legado' }
];

let exhibition_arts = [
  { exhibition_art_id: 1, exhibition_id: 1, art_id: 1 },
  { exhibition_art_id: 2, exhibition_id: 2, art_id: 2 },
  { exhibition_art_id: 3, exhibition_id: 3, art_id: 3 }
];

// Função para simular atraso de rede
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Intercepta chamadas fetch para simular API
const originalFetch = window.fetch;
window.fetch = async function(url, options) {
  // Simula atraso de rede (100-300ms)
  await delay(Math.random() * 200 + 100);
  
  // Extrai o caminho da URL
  const path = url.split('/').slice(2).join('/');
  
  // Simula respostas da API
  if (path.startsWith('api/')) {
    const apiPath = path.substring(4);
    
    // Método HTTP
    const method = options ? options.method || 'GET' : 'GET';
    
    // Corpo da requisição
    let body = null;
    if (options && options.body) {
      body = JSON.parse(options.body);
    }
    
    // Processa a requisição
    let response = await processApiRequest(apiPath, method, body);
    
    // Retorna uma resposta simulada
    return {
      ok: response.status >= 200 && response.status < 300,
      status: response.status,
      json: async () => response.data
    };
  }
  
  // Para outras requisições, usa o fetch original
  return originalFetch.apply(window, arguments);
};

// Processa requisições da API
async function processApiRequest(path, method, body) {
  // Artistas
  if (path === 'artists' && method === 'GET') {
    return { status: 200, data: artists };
  }
  
  if (path === 'artists' && method === 'POST') {
    const newArtist = {
      artist_id: artists.length > 0 ? Math.max(...artists.map(a => a.artist_id)) + 1 : 1,
      name: body.name,
      bio: body.bio,
      year: body.year,
      instagram: body.instagram
    };
    artists.push(newArtist);
    return { status: 201, data: newArtist };
  }
  
  if (path.startsWith('artists/') && method === 'GET') {
    const id = parseInt(path.split('/')[1]);
    const artist = artists.find(a => a.artist_id === id);
    if (artist) {
      return { status: 200, data: artist };
    }
    return { status: 404, data: { error: 'Artista não encontrado' } };
  }
  
  if (path.startsWith('artists/') && method === 'PUT') {
    const id = parseInt(path.split('/')[1]);
    const index = artists.findIndex(a => a.artist_id === id);
    if (index !== -1) {
      artists[index] = {
        ...artists[index],
        name: body.name,
        bio: body.bio,
        year: body.year,
        instagram: body.instagram
      };
      return { status: 200, data: { success: true } };
    }
    return { status: 404, data: { error: 'Artista não encontrado' } };
  }
  
  if (path.startsWith('artists/') && method === 'DELETE') {
    const id = parseInt(path.split('/')[1]);
    const index = artists.findIndex(a => a.artist_id === id);
    if (index !== -1) {
      artists.splice(index, 1);
      return { status: 200, data: { success: true } };
    }
    return { status: 404, data: { error: 'Artista não encontrado' } };
  }
  
  // Obras de Arte
  if (path === 'arts' && method === 'GET') {
    return { status: 200, data: arts };
  }
  
  if (path === 'arts' && method === 'POST') {
    const newArt = {
      art_id: arts.length > 0 ? Math.max(...arts.map(a => a.art_id)) + 1 : 1,
      title: body.title,
      description: body.description,
      year: body.year,
      url_image: body.urlImage,
      artist_id: body.artistId
    };
    arts.push(newArt);
    return { status: 201, data: newArt };
  }
  
  if (path.startsWith('arts/') && method === 'GET') {
    const id = parseInt(path.split('/')[1]);
    const art = arts.find(a => a.art_id === id);
    if (art) {
      return { status: 200, data: art };
    }
    return { status: 404, data: { error: 'Obra de arte não encontrada' } };
  }
  
  if (path.startsWith('arts/') && method === 'PUT') {
    const id = parseInt(path.split('/')[1]);
    const index = arts.findIndex(a => a.art_id === id);
    if (index !== -1) {
      arts[index] = {
        ...arts[index],
        title: body.title,
        description: body.description,
        year: body.year,
        url_image: body.urlImage,
        artist_id: body.artistId
      };
      return { status: 200, data: { success: true } };
    }
    return { status: 404, data: { error: 'Obra de arte não encontrada' } };
  }
  
  if (path.startsWith('arts/') && method === 'DELETE') {
    const id = parseInt(path.split('/')[1]);
    const index = arts.findIndex(a => a.art_id === id);
    if (index !== -1) {
      arts.splice(index, 1);
      return { status: 200, data: { success: true } };
    }
    return { status: 404, data: { error: 'Obra de arte não encontrada' } };
  }
  
  // Exposições
  if (path === 'exhibitions' && method === 'GET') {
    return { status: 200, data: exhibitions };
  }
  
  if (path === 'exhibitions' && method === 'POST') {
    const newExhibition = {
      exhibition_id: exhibitions.length > 0 ? Math.max(...exhibitions.map(e => e.exhibition_id)) + 1 : 1,
      name: body.name,
      description: body.description
    };
    exhibitions.push(newExhibition);
    return { status: 201, data: newExhibition };
  }
  
  if (path.startsWith('exhibitions/') && method === 'GET') {
    const id = parseInt(path.split('/')[1]);
    const exhibition = exhibitions.find(e => e.exhibition_id === id);
    if (exhibition) {
      return { status: 200, data: exhibition };
    }
    return { status: 404, data: { error: 'Exposição não encontrada' } };
  }
  
  if (path.startsWith('exhibitions/') && method === 'PUT') {
    const id = parseInt(path.split('/')[1]);
    const index = exhibitions.findIndex(e => e.exhibition_id === id);
    if (index !== -1) {
      exhibitions[index] = {
        ...exhibitions[index],
        name: body.name,
        description: body.description
      };
      return { status: 200, data: { success: true } };
    }
    return { status: 404, data: { error: 'Exposição não encontrada' } };
  }
  
  if (path.startsWith('exhibitions/') && method === 'DELETE') {
    const id = parseInt(path.split('/')[1]);
    const index = exhibitions.findIndex(e => e.exhibition_id === id);
    if (index !== -1) {
      exhibitions.splice(index, 1);
      return { status: 200, data: { success: true } };
    }
    return { status: 404, data: { error: 'Exposição não encontrada' } };
  }
  
  // Relacionamento entre Exposições e Obras
  if (path.match(/^exhibitions\/\d+\/arts$/) && method === 'GET') {
    const exhibitionId = parseInt(path.split('/')[1]);
    const exhibitionArtsIds = exhibition_arts
      .filter(ea => ea.exhibition_id === exhibitionId)
      .map(ea => ea.art_id);
    const exhibitionArts = arts.filter(art => exhibitionArtsIds.includes(art.art_id));
    return { status: 200, data: exhibitionArts };
  }
  
  if (path.match(/^exhibitions\/\d+\/arts\/\d+$/) && method === 'POST') {
    const parts = path.split('/');
    const exhibitionId = parseInt(parts[1]);
    const artId = parseInt(parts[3]);
    
    // Verificar se já existe
    const exists = exhibition_arts.some(ea => 
      ea.exhibition_id === exhibitionId && ea.art_id === artId
    );
    
    if (exists) {
      return { status: 400, data: { error: 'Relação já existe' } };
    }
    
    const newExhibitionArt = {
      exhibition_art_id: exhibition_arts.length > 0 ? Math.max(...exhibition_arts.map(ea => ea.exhibition_art_id)) + 1 : 1,
      exhibition_id: exhibitionId,
      art_id: artId
    };
    
    exhibition_arts.push(newExhibitionArt);
    return { status: 201, data: newExhibitionArt };
  }
  
  if (path.match(/^exhibitions\/\d+\/arts\/\d+$/) && method === 'DELETE') {
    const parts = path.split('/');
    const exhibitionId = parseInt(parts[1]);
    const artId = parseInt(parts[3]);
    
    const index = exhibition_arts.findIndex(ea => 
      ea.exhibition_id === exhibitionId && ea.art_id === artId
    );
    
    if (index !== -1) {
      exhibition_arts.splice(index, 1);
      return { status: 200, data: { success: true } };
    }
    
    return { status: 404, data: { error: 'Relação não encontrada' } };
  }
  
  // Rota não encontrada
  return { status: 404, data: { error: 'Rota não encontrada' } };
}
