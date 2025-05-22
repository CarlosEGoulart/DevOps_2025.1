// API simulada para o frontend
// Este arquivo fornece uma API simulada para o frontend funcionar sem backend real

// Dados iniciais
let artists = [
  { id: 1, name: 'Pablo Picasso', bio: 'Artista espanhol, fundador do cubismo', birth_year: 1881, instagram: '@picasso_legacy' },
  { id: 2, name: 'Frida Kahlo', bio: 'Pintora mexicana conhecida por seus autorretratos', birth_year: 1907, instagram: '@frida_kahlo_foundation' },
  { id: 3, name: 'Salvador Dalí', bio: 'Mestre do surrealismo', birth_year: 1904, instagram: '@dali_universe' }
];

let arts = [
  { id: 1, title: 'Guernica', description: 'Obra-prima que retrata os horrores da Guerra Civil Espanhola', year: 1937, image_url: 'https://upload.wikimedia.org/wikipedia/en/7/74/PicassoGuernica.jpg', artist_id: 1 },
  { id: 2, title: 'As Duas Fridas', description: 'Autorretrato duplo de Frida Kahlo', year: 1939, image_url: 'https://upload.wikimedia.org/wikipedia/en/8/8f/The_Two_Fridas.jpg', artist_id: 2 },
  { id: 3, title: 'A Persistência da Memória', description: 'Famosa obra surrealista com relógios derretidos', year: 1931, image_url: 'https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg', artist_id: 3 }
];

let exhibitions = [
  { id: 1, name: 'Modernismo Europeu', date: '2025-06-15', location: 'Museu de Arte Moderna', description: 'Exposição sobre o movimento modernista na Europa' },
  { id: 2, name: 'Arte Latino-Americana', date: '2025-07-20', location: 'Galeria Nacional', description: 'Celebração da arte e cultura latino-americana' },
  { id: 3, name: 'Surrealismo e Além', date: '2025-08-10', location: 'Centro Cultural', description: 'Explorando o movimento surrealista e seu legado' }
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
      id: artists.length > 0 ? Math.max(...artists.map(a => a.id)) + 1 : 1,
      name: body.name,
      bio: body.bio,
      birth_year: body.birthYear,
      instagram: body.instagram
    };
    artists.push(newArtist);
    return { status: 201, data: newArtist };
  }
  
  if (path.startsWith('artists/') && method === 'GET') {
    const id = parseInt(path.split('/')[1]);
    const artist = artists.find(a => a.id === id);
    if (artist) {
      return { status: 200, data: artist };
    }
    return { status: 404, data: { error: 'Artista não encontrado' } };
  }
  
  if (path.startsWith('artists/') && method === 'PUT') {
    const id = parseInt(path.split('/')[1]);
    const index = artists.findIndex(a => a.id === id);
    if (index !== -1) {
      artists[index] = {
        ...artists[index],
        name: body.name,
        bio: body.bio,
        birth_year: body.birthYear,
        instagram: body.instagram
      };
      return { status: 200, data: { success: true } };
    }
    return { status: 404, data: { error: 'Artista não encontrado' } };
  }
  
  if (path.startsWith('artists/') && method === 'DELETE') {
    const id = parseInt(path.split('/')[1]);
    const index = artists.findIndex(a => a.id === id);
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
      id: arts.length > 0 ? Math.max(...arts.map(a => a.id)) + 1 : 1,
      title: body.title,
      description: body.description,
      year: body.year,
      image_url: body.imageUrl
    };
    arts.push(newArt);
    return { status: 201, data: newArt };
  }
  
  if (path.startsWith('arts/') && method === 'GET') {
    const id = parseInt(path.split('/')[1]);
    const art = arts.find(a => a.id === id);
    if (art) {
      return { status: 200, data: art };
    }
    return { status: 404, data: { error: 'Obra de arte não encontrada' } };
  }
  
  if (path.startsWith('arts/') && method === 'PUT') {
    const id = parseInt(path.split('/')[1]);
    const index = arts.findIndex(a => a.id === id);
    if (index !== -1) {
      arts[index] = {
        ...arts[index],
        title: body.title,
        description: body.description,
        year: body.year,
        image_url: body.imageUrl
      };
      return { status: 200, data: { success: true } };
    }
    return { status: 404, data: { error: 'Obra de arte não encontrada' } };
  }
  
  if (path.startsWith('arts/') && method === 'DELETE') {
    const id = parseInt(path.split('/')[1]);
    const index = arts.findIndex(a => a.id === id);
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
      id: exhibitions.length > 0 ? Math.max(...exhibitions.map(e => e.id)) + 1 : 1,
      name: body.name,
      date: body.date,
      location: body.location,
      description: body.description
    };
    exhibitions.push(newExhibition);
    return { status: 201, data: newExhibition };
  }
  
  if (path.startsWith('exhibitions/') && method === 'GET') {
    const id = parseInt(path.split('/')[1]);
    const exhibition = exhibitions.find(e => e.id === id);
    if (exhibition) {
      return { status: 200, data: exhibition };
    }
    return { status: 404, data: { error: 'Exposição não encontrada' } };
  }
  
  if (path.startsWith('exhibitions/') && method === 'PUT') {
    const id = parseInt(path.split('/')[1]);
    const index = exhibitions.findIndex(e => e.id === id);
    if (index !== -1) {
      exhibitions[index] = {
        ...exhibitions[index],
        name: body.name,
        date: body.date,
        location: body.location,
        description: body.description
      };
      return { status: 200, data: { success: true } };
    }
    return { status: 404, data: { error: 'Exposição não encontrada' } };
  }
  
  if (path.startsWith('exhibitions/') && method === 'DELETE') {
    const id = parseInt(path.split('/')[1]);
    const index = exhibitions.findIndex(e => e.id === id);
    if (index !== -1) {
      exhibitions.splice(index, 1);
      return { status: 200, data: { success: true } };
    }
    return { status: 404, data: { error: 'Exposição não encontrada' } };
  }
  
  // Rota não encontrada
  return { status: 404, data: { error: 'Rota não encontrada' } };
}
