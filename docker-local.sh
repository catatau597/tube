#!/bin/bash

# Instala dependências
npm ci

# Compila TypeScript
npm run build

# Build da imagem Docker
docker build -t tube:local .

# (Opcional) Para publicar no GHCR, faça login e envie:
# docker login ghcr.io -u <seu-usuario>
# docker tag tube:local ghcr.io/<seu-usuario>/tube:local
# docker push ghcr.io/<seu-usuario>/tube:local

echo "Build local concluído. Use: docker run -it --rm -p 3000:3000 tube:local"