#!/usr/bin/env bash
# Build combinado para Vercel: sitio estático legado + comunidad-app (Vite/React)
# montada bajo /comunidad. outputDirectory de Vercel debe apuntar a ./dist.
set -euo pipefail
shopt -s dotglob nullglob

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

rm -rf dist
mkdir -p dist

# 1. Copiar el sitio estático tal cual (sin rsync: no está garantizado en el
#    entorno de build de Vercel), excluyendo este script, la app React fuente
#    (se copia aparte ya compilada), el respaldo del foro legado y .git.
for item in *; do
  case "$item" in
    dist|deploy|comunidad-app|_archive|.git) continue ;;
  esac
  cp -a "$item" dist/
done

# 2. Compilar comunidad-app y copiar su salida a dist/comunidad
npm --prefix comunidad-app ci
npm --prefix comunidad-app run build
mkdir -p dist/comunidad
cp -a comunidad-app/dist/. dist/comunidad/

echo "✅ Build combinado listo en ./dist (sitio legado + /comunidad)"
