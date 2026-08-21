#!/usr/bin/env bash
# Build combinado para Vercel: sitio estático legado + comunidad-app (Vite/React)
# montada bajo /comunidad. outputDirectory de Vercel debe apuntar a ./dist.
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

rm -rf dist
mkdir -p dist

# 1. Copiar el sitio estático tal cual, excluyendo el propio script de build,
#    la carpeta de la app React (se copia aparte ya compilada) y el archivo
#    de la carpeta legada retirada.
rsync -a \
  --exclude ".git" \
  --exclude "deploy" \
  --exclude "dist" \
  --exclude "comunidad-app" \
  --exclude "_archive" \
  ./ dist/

# 2. Compilar comunidad-app y copiar su salida a dist/comunidad
npm --prefix comunidad-app ci
npm --prefix comunidad-app run build
mkdir -p dist/comunidad
cp -R comunidad-app/dist/. dist/comunidad/

echo "✅ Build combinado listo en ./dist (sitio legado + /comunidad)"
