# cloneflix

# Instruções

1. para executar localmente é necessário ter instalado o node.js https://nodejs.org/en/download
2. IMPORTANTE adicione um arquivo .env dentro da pasta server com o seguinte conteúdo: MONGO_URI=mongodb+srv://cloneflixClient:OtFrO89HTbxpiZ18@cloneflix.24gwory.mongodb.net/?appName=cloneflix 
PORT=5000 
JWT_SECRET=string
3. IMPORTANTE adicione um arquivo .env dentro da pasta client com o seguinte conteúdo: 
VITE_API_URL=http://localhost:5000/api 
VITE_OMDB_KEY=(key para a api OMDB)
4. com a ferramenta de linha comando navegue até a pasta server e insira o seguinte comando: npm run dev
5. com outra ferramenta de linha comando navegue até a pasta client e insira o seguinte comando: npm run dev
6. irá aparecer o link na linha de comando para acessar a aplicação, por padrão é: http://localhost:3000/
