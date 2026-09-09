# Templo de Salomón · Experiencia inmersiva

Modelo nuevo del primer templo de Jerusalén integrado en `page/Figuras Bíblicas/temple-3d.html`. Los modelos anteriores no se utilizan. Los controles y patrones didácticos continúan la experiencia del tabernáculo; la geometría, los textos, la navegación, el mapa y la identidad visual corresponden al templo de Salomón.

## Compilar desde la raíz de Página de Fe

```sh
npm --prefix deploy/templo-inmersivo ci
npm --prefix deploy/templo-inmersivo test
npm --prefix deploy/templo-inmersivo run build
```

Vite genera el HTML de `temple-3d.html` y los recursos con hash en `page/Figuras Bíblicas/assets/templo-inmersivo/`. `emptyOutDir: false` conserva los demás estudios y el tabernáculo. Se versionan los recursos compilados para el despliegue estático ya existente; no hace falta modificar el build combinado. Las fuentes quedan excluidas del hosting en `deploy/`.

## Funciones

20 componentes con fichas, enlaces bíblicos, voz opcional y progreso local independiente. Recorrido de 18 paradas y seis preguntas con corrección. Vista orbital, selección 3D, aislamiento, apertura del edificio, techos elevados, mapa y caminata con colisiones y altura de escalinata. Controles WASD/flechas, arrastre, E para examinar, Esc para salir y botones de pantalla móvil. Los enlaces `?part=` del estudio conservan su destino mediante alias. La marca regresa a `templo-figuras.html`.

Three.js 0.178, Vite 6.3.5 y JavaScript modular. Geometría procedural sin descargas de modelos; los objetos estáticos se agrupan por material para reducir llamadas de dibujo. WebGL 2 es necesario. La voz y las fuentes externas tienen alternativas mediante texto y tipografía local. `?debug` habilita `window.solomon.getState()` y `getBounds(id)` de solo lectura.

## Criterio histórico

1 Reyes 6–8 y 2 Crónicas 3–5. Escala convencional de 0,5 m/codo. Casa de 60 × 20 × 30 codos, nave de 40 codos y Debir cúbico de 20. Columnas de 18 + 5 codos según Reyes. Dos grandes querubines de 10 codos de altura y envergadura. Mar de 10 codos de diámetro con doce bueyes; diez fuentes móviles, diez candelabros y diez mesas según Crónicas.

Se explicitan las diferencias de altura del pórtico, la mención singular/plural de las mesas y las capacidades del mar. El perímetro, la elevación de la terraza, los peldaños, las ventanas, los relieves y las formas de los muebles son ilustrativos. Las siete ramas de los candelabros son una interpretación por continuidad. Las cámaras laterales se muestran como volúmenes exteriores de tres niveles, sin recorridos internos inventados. Puertas y velo se abren didácticamente y se refuerza la luz interior. No se representa el templo de Herodes ni un levantamiento arqueológico.
