# Visor del tabernáculo integrado en Página de Fe

Fuente editable de la nueva experiencia 3D. La página pública sigue siendo `page/Figuras Bíblicas/tabernaculo-3d.html`, por lo que los enlaces del estudio no cambian. La marca del visor permite regresar a `tabernaculo-figuras.html`.

Desde la raíz del sitio:

```sh
npm --prefix deploy/tabernaculo-inmersivo ci
npm --prefix deploy/tabernaculo-inmersivo test
npm --prefix deploy/tabernaculo-inmersivo run build
```

La compilación escribe únicamente el HTML del visor y los recursos con hash en `page/Figuras Bíblicas/assets/tabernaculo-inmersivo/`. No vacía el directorio de estudios. Los recursos compilados se versionan para que el despliegue estático existente los copie sin instalar dependencias adicionales. No edites el HTML compilado directamente: modifica `tabernaculo-3d.html` en esta carpeta y vuelve a compilar.

Three.js se sirve desde el propio sitio. Las fuentes tipográficas y los enlaces bíblicos son externos; las fuentes tienen alternativas locales. El motor requiere WebGL 2. La narración usa las voces disponibles en el navegador. El progreso se guarda en localStorage.

La reconstrucción es didáctica: 0,5 m por codo es una convención; las formas no especificadas son ilustrativas, las cuatro cubiertas son esquemáticas y el acceso libre al Santísimo se distingue de las restricciones rituales bíblicas en la ayuda.

Los enlaces históricos `?part=puerta-atrio`, `tienda`, `lugar-santo`, `candelero`, `incensario`, `lugar-santisimo` y `pantalla` se traducen a sus nuevos identificadores. Todos los demás identificadores compatibles se conservan. Los antiguos archivos `javascript/tabernaculo3d/` y `css/tabernaculo-3d-app.css` ya no se cargan, pero permanecen disponibles en el repositorio.
