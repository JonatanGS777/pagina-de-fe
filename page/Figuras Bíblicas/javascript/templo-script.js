// ARCHIVO: templo-script-compatible.js - Versión compatible con navegadores antiguos

// Clase para la aplicación principal
function TempleApp() {
    // Constructor
    this.init();
}

// Métodos de la clase TempleApp
TempleApp.prototype.init = function() {
    // Determinar qué página estamos viendo
    var isMainPage = !document.querySelector('.temple-3d-page');
    
    if (isMainPage) {
        this.initMainPage();
    } else {
        this.init3DPage();
    }
};

// Inicialización de la página principal
TempleApp.prototype.initMainPage = function() {
    this.initLoader();
    this.initNavigation();
    this.initSmoothScroll();
};

// Inicialización de la página 3D
TempleApp.prototype.init3DPage = function() {
    this.initLoader();
    this.setup3DModel();
    this.setupPartsList();
    this.setupModalEvents();
    this.setupFilterButtons();
};

// Manejar el loader inicial
TempleApp.prototype.initLoader = function() {
    var loader = document.querySelector('.loader');
    
    if (loader) {
        setTimeout(function() {
            loader.classList.add('hidden');
        }, 1000);
    }
};

// Inicializar navegación
TempleApp.prototype.initNavigation = function() {
    var header = document.querySelector('.main-header');
    var self = this;
    
    // Efecto de scroll en el header
    window.addEventListener('scroll', function() {
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // Destacar enlace activo
    var navLinks = document.querySelectorAll('.nav-links a');
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                for (var j = 0; j < navLinks.length; j++) {
                    navLinks[j].classList.remove('active');
                }
                this.classList.add('active');
            }
        });
    }
};

// Scroll suave para enlaces internos
TempleApp.prototype.initSmoothScroll = function() {
    var anchors = document.querySelectorAll('a[href^="#"]');
    for (var i = 0; i < anchors.length; i++) {
        anchors[i].addEventListener('click', function(e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                var headerOffset = 80;
                var elementPosition = target.getBoundingClientRect().top;
                var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
};

// Inicializar el modelo 3D
TempleApp.prototype.setup3DModel = function() {
    this.temple3D = new Temple3D();
};

// Configurar botones de filtro
TempleApp.prototype.setupFilterButtons = function() {
    var filterButtons = document.querySelectorAll('.filter-btn');
    if (!filterButtons.length) return;
    
    var self = this;
    for (var i = 0; i < filterButtons.length; i++) {
        filterButtons[i].addEventListener('click', function() {
            // Remover clase active de todos los botones
            for (var j = 0; j < filterButtons.length; j++) {
                filterButtons[j].classList.remove('active');
            }
            
            // Añadir clase active al botón clickeado
            this.classList.add('active');
            
            // Filtrar tarjetas
            var filter = this.dataset.filter;
            self.filterPartCards(filter);
        });
    }
};

// Filtrar tarjetas de partes
TempleApp.prototype.filterPartCards = function(filter) {
    var cards = document.querySelectorAll('.part-card');
    if (!cards.length) return;
    
    for (var i = 0; i < cards.length; i++) {
        if (filter === 'all') {
            cards[i].style.display = 'block';
            continue;
        }
        
        var category = cards[i].dataset.category || 'exterior'; // Categoría por defecto
        
        if (category === filter) {
            cards[i].style.display = 'block';
        } else {
            cards[i].style.display = 'none';
        }
    }
};

// Configurar la lista de partes del templo
TempleApp.prototype.setupPartsList = function() {
    var partsGrid = document.getElementById('parts-grid');
    if (!partsGrid) return;
    
    var self = this;
    
    // Si tenemos datos del templo definidos
    if (typeof window.templeData !== 'undefined') {
        for (var id in window.templeData) {
            if (window.templeData.hasOwnProperty(id)) {
                var data = window.templeData[id];
                
                var card = document.createElement('div');
                card.className = 'part-card';
                card.dataset.partId = id;
                card.dataset.category = data.category || 'exterior';
                
                card.innerHTML = '<h3>' + data.title + '</h3>' +
                                '<p>' + data.description.substring(0, 80) + '...</p>' +
                                '<a href="#" class="view-part-btn">Ver detalles</a>';
                
                card.addEventListener('click', function() {
                    var cardId = this.dataset.partId;
                    self.showDetailModal(window.templeData[cardId]);
                    if (self.temple3D) {
                        self.temple3D.focusOnPart(cardId);
                    }
                });
                
                partsGrid.appendChild(card);
            }
        }
    } else {
        // Datos de ejemplo en caso de que no exista temple-data.js
        var sampleData = {
            'atrio': {
                title: 'El Atrio',
                description: 'Área exterior del templo donde se reunía el pueblo para la adoración.',
                symbolism: 'Representa el mundo y la entrada al reino de Dios.',
                category: 'exterior'
            },
            'lugar-santo': {
                title: 'El Lugar Santo (Hekal)',
                description: 'Primera cámara interior del templo, donde solo los sacerdotes podían entrar.',
                symbolism: 'Representa el camino de santificación y servicio a Dios.',
                category: 'interior'
            },
            'lugar-santisimo': {
                title: 'El Lugar Santísimo (Debir)',
                description: 'La cámara más interior y sagrada del templo, separada por un velo.',
                symbolism: 'Representa la morada celestial de Dios y Su presencia.',
                category: 'interior'
            },
            'columnas': {
                title: 'Columnas Jaquín y Boaz',
                description: 'Dos grandes columnas de bronce que flanqueaban la entrada del templo.',
                symbolism: 'Representan la estabilidad y la fuerza.',
                category: 'exterior'
            },
            'mar-bronce': {
                title: 'El Mar de Bronce',
                description: 'Una enorme fuente circular de bronce sostenida por doce bueyes.',
                symbolism: 'Simboliza la purificación necesaria para acercarse a Dios.',
                category: 'exterior'
            },
            'altar-holocaustos': {
                title: 'Altar de los Holocaustos',
                description: 'Una gran estructura de bronce donde se ofrecían los sacrificios diarios.',
                symbolism: 'Representa la necesidad de expiación por el pecado.',
                category: 'exterior'
            },
            'menora': {
                title: 'El Candelabro de Oro (Menorá)',
                description: 'Candelabro de oro puro con siete brazos que iluminaba el Lugar Santo.',
                symbolism: 'Representa la luz divina y la presencia del Espíritu de Dios.',
                category: 'mobiliario'
            },
            'mesa-pan': {
                title: 'Mesa para el Pan de la Proposición',
                description: 'Mesa de oro donde se colocaban doce panes, que se renovaban cada sábado.',
                symbolism: 'Representa la provisión continua de Dios para Su pueblo.',
                category: 'mobiliario'
            },
            'altar-incienso': {
                title: 'Altar del Incienso',
                description: 'Pequeño altar de oro ubicado frente al velo, donde se quemaba incienso.',
                symbolism: 'Simboliza las oraciones de los fieles ascendiendo a Dios.',
                category: 'mobiliario'
            }
        };
        
        // Crear tarjetas con los datos de ejemplo
        for (var id in sampleData) {
            if (sampleData.hasOwnProperty(id)) {
                var data = sampleData[id];
                
                var card = document.createElement('div');
                card.className = 'part-card';
                card.dataset.partId = id;
                card.dataset.category = data.category;
                
                card.innerHTML = '<h3>' + data.title + '</h3>' +
                                '<p>' + data.description.substring(0, 80) + '...</p>' +
                                '<a href="#" class="view-part-btn">Ver detalles</a>';
                
                (function(partId, partData) {
                    card.addEventListener('click', function() {
                        self.showDetailModal(partData);
                        if (self.temple3D) {
                            self.temple3D.focusOnPart(partId);
                        }
                    });
                })(id, data);
                
                partsGrid.appendChild(card);
            }
        }
    }
};

// Mostrar modal con detalles
TempleApp.prototype.showDetailModal = function(data) {
    var modal = document.getElementById('detail-modal');
    if (!modal) return;

    modal.classList.remove('hidden');
    modal.querySelector('.modal-title').textContent = data.title || 'Detalle';
    
    var descEl = modal.querySelector('.description-text');
    var symEl = modal.querySelector('.symbolism-text');
    
    if (descEl) descEl.textContent = data.description || 'Sin descripción disponible';
    if (symEl) symEl.textContent = data.symbolism || 'Sin información de simbología';
    
    // Añadir imagen si existe
    var imageContainer = modal.querySelector('.modal-image-container');
    if (imageContainer) {
        imageContainer.innerHTML = '';
        if (data.image) {
            var img = document.createElement('img');
            img.src = data.image;
            img.alt = data.title;
            imageContainer.appendChild(img);
        } else {
            // Placeholder para cuando no hay imagen
            imageContainer.innerHTML = '<div class="image-placeholder">' +
                                     '<span class="temple-icon">✡</span>' +
                                     '<p>Selecciona "Enfocar en el modelo" para ver esta parte en 3D</p>' +
                                     '</div>';
        }
    }
};

// Configurar eventos del modal
TempleApp.prototype.setupModalEvents = function() {
    var self = this;
    
    // Cerrar modal al hacer clic en el botón de cerrar
    document.addEventListener('click', function(e) {
        if (e.target.matches('.close-modal') || e.target.matches('.btn-close-modal')) {
            var modal = document.getElementById('detail-modal');
            if (modal) modal.classList.add('hidden');
        }
    });

    // Cerrar modal al hacer clic fuera del contenido
    document.addEventListener('click', function(e) {
        if (e.target.matches('.detail-modal')) {
            e.target.classList.add('hidden');
        }
    });
    
    // Botón de enfocar parte
    document.addEventListener('click', function(e) {
        if (e.target.matches('.btn-focus-part')) {
            var modal = document.getElementById('detail-modal');
            var title = modal ? modal.querySelector('.modal-title').textContent : null;
            
            if (title && self.temple3D) {
                var partId = self.getPartIdFromTitle(title);
                if (partId) {
                    self.temple3D.focusOnPart(partId);
                    // Cerrar el modal después de enfocar
                    modal.classList.add('hidden');
                }
            }
        }
    });
};

// Utilidad para convertir título a ID
TempleApp.prototype.getPartIdFromTitle = function(title) {
    // Mapa simple de títulos a IDs
    var titleMap = {
        'El Atrio': 'atrio',
        'El Lugar Santo (Hekal)': 'lugar-santo',
        'El Lugar Santísimo (Debir)': 'lugar-santisimo',
        'Columnas Jaquín y Boaz': 'columnas',
        'El Mar de Bronce': 'mar-bronce',
        'Altar de los Holocaustos': 'altar-holocaustos',
        'El Candelabro de Oro (Menorá)': 'menora',
        'Mesa para el Pan de la Proposición': 'mesa-pan',
        'Altar del Incienso': 'altar-incienso'
    };
    
    return titleMap[title] || title.toLowerCase().replace(/\s+/g, '-');
};

// Clase para el modelo 3D
function Temple3D() {
    // Propiedades principales
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.templeParts = {};
    this.infoPoints = [];
    this.clock = null;
    
    // Estado
    this.isLoaded = false;
    this.isAnimating = false;
    this.targetPosition = null;
    this.currentPosition = null;
    this.selectedPart = null;
    
    // Inicializar
    this.init();
}

// Métodos de la clase Temple3D
Temple3D.prototype.init = function() {
    try {
        this.clock = new THREE.Clock();
        this.targetPosition = new THREE.Vector3();
        this.currentPosition = new THREE.Vector3();
        
        this.setupScene();
        this.setupCamera();
        this.setupRenderer();
        this.setupLights();
        this.setupControls();
        this.createTempleModel();
        this.setupEventListeners();
        this.animate();
        this.hideLoader();
        this.isLoaded = true;
        this.focusOnPartFromURL();
        console.log('Modelo 3D inicializado correctamente');
    } catch (error) {
        console.error('Error initializing 3D scene:', error);
        this.handleInitError();
    }
};

Temple3D.prototype.setupScene = function() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0d1b2a);
};

Temple3D.prototype.setupCamera = function() {
    var container = document.getElementById('canvas-container');
    if (!container) return;
    
    var aspect = container.clientWidth / container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    this.camera.position.set(30, 20, 40);
    this.currentPosition.copy(this.camera.position);
};

Temple3D.prototype.setupRenderer = function() {
    var container = document.getElementById('canvas-container');
    if (!container) return;
    
    this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    container.appendChild(this.renderer.domElement);
};

Temple3D.prototype.setupLights = function() {
    // Luz ambiental
    var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    // Luz direccional principal
    var mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
    mainLight.position.set(20, 30, 20);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    this.scene.add(mainLight);

    // Luz adicional para rellenar sombras
    var fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-20, 20, -20);
    this.scene.add(fillLight);
};

Temple3D.prototype.setupControls = function() {
    if (!this.camera || !this.renderer) return;
    
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.screenSpacePanning = false;
    this.controls.minDistance = 5;
    this.controls.maxDistance = 100;
    this.controls.maxPolarAngle = Math.PI / 2.1;
    
    var self = this;
    this.controls.addEventListener('start', function() {
        self.isAnimating = false;
    });
};

Temple3D.prototype.createTempleModel = function() {
    // Materiales simples (sin texturas)
    var materials = {
        marble: new THREE.MeshStandardMaterial({
            color: 0xf5f5f5,
            metalness: 0.1,
            roughness: 0.7
        }),
        gold: new THREE.MeshStandardMaterial({
            color: 0xd4af37,
            metalness: 0.9,
            roughness: 0.1
        }),
        bronze: new THREE.MeshStandardMaterial({
            color: 0x8c7853,
            metalness: 0.8,
            roughness: 0.3
        }),
        wood: new THREE.MeshStandardMaterial({
            color: 0x5d4037,
            metalness: 0.0,
            roughness: 0.8
        }),
        purple: new THREE.MeshStandardMaterial({
            color: 0x4a148c,
            metalness: 0.1,
            roughness: 0.7,
            transparent: true,
            opacity: 0.9,
            side: THREE.DoubleSide
        })
    };
    
    // Crear las diferentes partes del templo
    this.createBase(materials);
    this.createAtrium(materials);
    this.createMainBuilding(materials);
    this.createColumns(materials);
    this.createHolyPlaces(materials);
    this.createTempleObjects(materials);
    this.createEnvironment(materials);
    this.createInfoPoints();
};

Temple3D.prototype.createBase = function(materials) {
    // Base principal del templo
    var baseGeometry = new THREE.BoxGeometry(60, 3, 80);
    var base = new THREE.Mesh(baseGeometry, materials.marble);
    base.position.y = -1.5;
    base.receiveShadow = true;
    this.scene.add(base);
    
    // Escaleras frontales
    var stairsGroup = new THREE.Group();
    stairsGroup.name = "stairs";
    
    for (var i = 0; i < 5; i++) {
        var width = 30 - i * 2;
        var depth = 2;
        var stairGeometry = new THREE.BoxGeometry(width, 0.6, depth);
        var stair = new THREE.Mesh(stairGeometry, materials.marble);
        stair.position.set(0, -1.5 + (i * 0.6), 40 - (i * depth));
        stair.receiveShadow = true;
        stairsGroup.add(stair);
    }
    
    this.scene.add(stairsGroup);
};

Temple3D.prototype.createAtrium = function(materials) {
    // Grupo para el atrio
    var atriumGroup = new THREE.Group();
    atriumGroup.name = "atrio";
    
    // Suelo del atrio
    var floorGeometry = new THREE.PlaneGeometry(50, 60);
    var floor = new THREE.Mesh(floorGeometry, materials.marble);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = true;
    atriumGroup.add(floor);
    
    // Muros exteriores simplificados
    var wallThickness = 1;
    var wallHeight = 4;
    
    // Muro delantero con apertura
    var frontWallLeft = new THREE.Mesh(
        new THREE.BoxGeometry(19, wallHeight, wallThickness),
        materials.marble
    );
    frontWallLeft.position.set(-10, wallHeight / 2, 30);
    frontWallLeft.castShadow = true;
    frontWallLeft.receiveShadow = true;
    atriumGroup.add(frontWallLeft);
    
    var frontWallRight = new THREE.Mesh(
        new THREE.BoxGeometry(19, wallHeight, wallThickness),
        materials.marble
    );
    frontWallRight.position.set(10, wallHeight / 2, 30);
    frontWallRight.castShadow = true;
    frontWallRight.receiveShadow = true;
    atriumGroup.add(frontWallRight);
    
    // Muros laterales
    var leftWall = new THREE.Mesh(
        new THREE.BoxGeometry(wallThickness, wallHeight, 60),
        materials.marble
    );
    leftWall.position.set(-25, wallHeight / 2, 0);
    leftWall.castShadow = true;
    leftWall.receiveShadow = true;
    atriumGroup.add(leftWall);
    
    var rightWall = new THREE.Mesh(
        new THREE.BoxGeometry(wallThickness, wallHeight, 60),
        materials.marble
    );
    rightWall.position.set(25, wallHeight / 2, 0);
    rightWall.castShadow = true;
    rightWall.receiveShadow = true;
    atriumGroup.add(rightWall);
    
    // Muro trasero
    var backWall = new THREE.Mesh(
        new THREE.BoxGeometry(50, wallHeight, wallThickness),
        materials.marble
    );
    backWall.position.set(0, wallHeight / 2, -30);
    backWall.castShadow = true;
    backWall.receiveShadow = true;
    atriumGroup.add(backWall);
    
    // Crear altar de holocaustos
    var altarGroup = this.createAltar(materials);
    altarGroup.position.set(0, 0, 15);
    atriumGroup.add(altarGroup);
    this.templeParts['altar-holocaustos'] = altarGroup;
    
    // Crear mar de bronce
    var seaGroup = this.createSeaOfBrass(materials);
    seaGroup.position.set(15, 0, 0);
    atriumGroup.add(seaGroup);
    this.templeParts['mar-bronce'] = seaGroup;
    
    this.scene.add(atriumGroup);
    this.templeParts['atrio'] = atriumGroup;
};

Temple3D.prototype.createAltar = function(materials) {
    var altarGroup = new THREE.Group();
    altarGroup.name = "altar-holocaustos";
    
    // Base del altar
    var baseGeometry = new THREE.BoxGeometry(10, 1, 10);
    var base = new THREE.Mesh(baseGeometry, materials.marble);
    base.position.y = 0.5;
    base.receiveShadow = true;
    base.castShadow = true;
    altarGroup.add(base);
    
    // Estructura principal del altar
    var altarGeometry = new THREE.BoxGeometry(8, 4, 8);
    var altar = new THREE.Mesh(altarGeometry, materials.bronze);
    altar.position.y = 3;
    altar.receiveShadow = true;
    altar.castShadow = true;
    altarGroup.add(altar);
    
    // Cuernos en las esquinas
    var hornGeometry = new THREE.ConeGeometry(0.5, 1.5, 4);
    var hornPositions = [
        [-3.5, 5.5, -3.5],
        [3.5, 5.5, -3.5],
        [-3.5, 5.5, 3.5],
        [3.5, 5.5, 3.5]
    ];
    
    for (var i = 0; i < hornPositions.length; i++) {
        var pos = hornPositions[i];
        var horn = new THREE.Mesh(hornGeometry, materials.bronze);
        horn.position.set(pos[0], pos[1], pos[2]);
        horn.castShadow = true;
        altarGroup.add(horn);
    }
    
    return altarGroup;
};

Temple3D.prototype.createSeaOfBrass = function(materials) {
    var seaGroup = new THREE.Group();
    seaGroup.name = "mar-bronce";
    
    // Base con forma de bueyes (simplificado)
    var baseGeometry = new THREE.CylinderGeometry(5, 6, 2, 16);
    var base = new THREE.Mesh(baseGeometry, materials.bronze);
    base.position.y = 1;
    base.castShadow = true;
    base.receiveShadow = true;
    seaGroup.add(base);
    
    // Cuenco principal
    var bowlGeometry = new THREE.CylinderGeometry(7, 5, 2.5, 32);
    var bowl = new THREE.Mesh(bowlGeometry, materials.bronze);
    bowl.position.y = 3.25;
    bowl.castShadow = true;
    bowl.receiveShadow = true;
    seaGroup.add(bowl);
    
    // Agua (superficie plana azul)
    var waterGeometry = new THREE.CircleGeometry(5, 32);
    var waterMaterial = new THREE.MeshBasicMaterial({
        color: 0x3e95e8,
        transparent: true,
        opacity: 0.7
    });
    var water = new THREE.Mesh(waterGeometry, waterMaterial);
    water.rotation.x = -Math.PI / 2;
    water.position.y = 4.51;
    seaGroup.add(water);
    
    return seaGroup;
};

Temple3D.prototype.createMainBuilding = function(materials) {
    // Grupo para el edificio principal
    var buildingGroup = new THREE.Group();
    buildingGroup.name = "main-building";
    
    // Paredes exteriores
    var wallsGeometry = new THREE.BoxGeometry(20, 14, 40);
    var walls = new THREE.Mesh(wallsGeometry, materials.marble);
    walls.position.y = 7;
    walls.position.z = -10;
    walls.castShadow = true;
    walls.receiveShadow = true;
    buildingGroup.add(walls);
    
    // Techo
    var roofGeometry = new THREE.BoxGeometry(22, 2, 42);
    var roof = new THREE.Mesh(roofGeometry, materials.wood);
    roof.position.y = 15;
    roof.position.z = -10;
    roof.castShadow = true;
    buildingGroup.add(roof);
    
    // Entrada
    var entranceGeometry = new THREE.BoxGeometry(10, 10, 1);
    var entrance = new THREE.Mesh(entranceGeometry, materials.wood);
    entrance.position.set(0, 5, 10);
    entrance.castShadow = true;
    buildingGroup.add(entrance);
    
    this.scene.add(buildingGroup);
};

Temple3D.prototype.createColumns = function(materials) {
    // Grupo para las columnas
    var columnsGroup = new THREE.Group();
    columnsGroup.name = "columnas";
    
    // Crear columna Jaquín (derecha)
    var rightColumn = this.createColumn(materials, "jaquin");
    rightColumn.position.set(6, 0, 10);
    columnsGroup.add(rightColumn);
    
    // Crear columna Boaz (izquierda)
    var leftColumn = this.createColumn(materials, "boaz");
    leftColumn.position.set(-6, 0, 10);
    columnsGroup.add(leftColumn);
    
    this.scene.add(columnsGroup);
    this.templeParts['columnas'] = columnsGroup;
};

Temple3D.prototype.createColumn = function(materials, name) {
    var columnGroup = new THREE.Group();
    columnGroup.name = name;
    
    // Base
    var baseGeometry = new THREE.CylinderGeometry(1.5, 1.5, 1, 16);
    var base = new THREE.Mesh(baseGeometry, materials.bronze);
    base.position.y = 0.5;
    base.castShadow = true;
    base.receiveShadow = true;
    columnGroup.add(base);
    
    // Fuste
    var shaftGeometry = new THREE.CylinderGeometry(1.2, 1.2, 10, 16);
    var shaft = new THREE.Mesh(shaftGeometry, materials.bronze);
    shaft.position.y = 6;
    shaft.castShadow = true;
    shaft.receiveShadow = true;
    columnGroup.add(shaft);
    
    // Capitel
    var capitalGeometry = new THREE.CylinderGeometry(2, 1.2, 2, 16);
    var capital = new THREE.Mesh(capitalGeometry, materials.bronze);
    capital.position.y = 12;
    capital.castShadow = true;
    columnGroup.add(capital);
    
    // Decoración simple
    var decorationGeometry = new THREE.SphereGeometry(0.4, 8, 8);
    var decoration = new THREE.Mesh(decorationGeometry, materials.gold);
    decoration.position.y = 13;
    decoration.castShadow = true;
    columnGroup.add(decoration);
    
    return columnGroup;
};

Temple3D.prototype.createHolyPlaces = function(materials) {
    // Lugar Santo
    var holyPlaceGroup = new THREE.Group();
    holyPlaceGroup.name = "lugar-santo";
    
    // Suelo del Lugar Santo
    var floorGeometry = new THREE.BoxGeometry(18, 0.5, 20);
    var floor = new THREE.Mesh(floorGeometry, materials.gold);
    floor.position.set(0, 0.25, -10);
    floor.receiveShadow = true;
    holyPlaceGroup.add(floor);
    
    // Paredes interiores (invertidas para ver desde dentro)
    var wallsGeometry = new THREE.BoxGeometry(17.9, 12, 19.9);
    var wallsMaterial = materials.gold.clone();
    wallsMaterial.side = THREE.BackSide;
    
    var walls = new THREE.Mesh(wallsGeometry, wallsMaterial);
    walls.position.set(0, 6.5, -10);
    walls.userData.excludeFromFocus = true;
    holyPlaceGroup.add(walls);
    
    this.scene.add(holyPlaceGroup);
    this.templeParts['lugar-santo'] = holyPlaceGroup;
    
    // Lugar Santísimo
    var holiestPlaceGroup = new THREE.Group();
    holiestPlaceGroup.name = "lugar-santisimo";
    
    // Suelo del Lugar Santísimo
    var holyFloorGeometry = new THREE.BoxGeometry(15, 0.5, 15);
    var holyFloor = new THREE.Mesh(holyFloorGeometry, materials.gold);
    holyFloor.position.set(0, 0.25, -25);
    holyFloor.receiveShadow = true;
    holiestPlaceGroup.add(holyFloor);
    
    // Paredes interiores
    var holyWallsGeometry = new THREE.BoxGeometry(14.9, 12, 14.9);
    var holyWallsMaterial = materials.gold.clone();
    holyWallsMaterial.side = THREE.BackSide;
    
    var holyWalls = new THREE.Mesh(holyWallsGeometry, holyWallsMaterial);
    holyWalls.position.set(0, 6.5, -25);
    holyWalls.userData.excludeFromFocus = true;
    holiestPlaceGroup.add(holyWalls);
    
    // Velo separador
    var veilGeometry = new THREE.PlaneGeometry(15, 12);
    var veil = new THREE.Mesh(veilGeometry, materials.purple);
    veil.position.set(0, 6, -17.5);
    veil.castShadow = true;
    holiestPlaceGroup.add(veil);
    
    // Arca de la Alianza simplificada
    var arkGroup = this.createArk(materials);
    arkGroup.position.set(0, 1, -25);
    holiestPlaceGroup.add(arkGroup);
    
    this.scene.add(holiestPlaceGroup);
    this.templeParts['lugar-santisimo'] = holiestPlaceGroup;
};

Temple3D.prototype.createArk = function(materials) {
    var arkGroup = new THREE.Group();
    
    // Base del Arca
    var baseGeometry = new THREE.BoxGeometry(3, 0.5, 5);
    var base = new THREE.Mesh(baseGeometry, materials.wood);
    base.position.y = 0.25;
    base.receiveShadow = true;
    arkGroup.add(base);
    
    // Arca (caja)
    var arkGeometry = new THREE.BoxGeometry(2.5, 1.5, 4);
    var ark = new THREE.Mesh(arkGeometry, materials.gold);
    ark.position.y = 1.25;
    ark.castShadow = true;
    ark.receiveShadow = true;
    arkGroup.add(ark);
    
    // Propiciatorio (tapa)
    var coverGeometry = new THREE.BoxGeometry(2.8, 0.2, 4.3);
    var cover = new THREE.Mesh(coverGeometry, materials.gold);
    cover.position.y = 2.1;
    cover.castShadow = true;
    arkGroup.add(cover);
    
    // Querubines simplificados
    var cherubGeometry = new THREE.BoxGeometry(1, 1.5, 0.5);
    
    // Querubín izquierdo
    var leftCherub = new THREE.Mesh(cherubGeometry, materials.gold);
    leftCherub.position.set(-0.9, 2.85, 0);
    leftCherub.castShadow = true;
    arkGroup.add(leftCherub);
    
    // Alas
    var leftWingGeometry = new THREE.BoxGeometry(1.5, 0.1, 3);
    var leftWing = new THREE.Mesh(leftWingGeometry, materials.gold);
    leftWing.position.set(-0.9, 3.5, 0);
    leftWing.rotation.z = Math.PI / 8;
    leftWing.castShadow = true;
    arkGroup.add(leftWing);
    
    // Querubín derecho
    var rightCherub = new THREE.Mesh(cherubGeometry, materials.gold);
    rightCherub.position.set(0.9, 2.85, 0);
    rightCherub.castShadow = true;
    arkGroup.add(rightCherub);
    
    // Alas
    var rightWingGeometry = new THREE.BoxGeometry(1.5, 0.1, 3);
    var rightWing = new THREE.Mesh(rightWingGeometry, materials.gold);
    rightWing.position.set(0.9, 3.5, 0);
    rightWing.rotation.z = -Math.PI / 8;
    rightWing.castShadow = true;
    arkGroup.add(rightWing);
    
    return arkGroup;
};

Temple3D.prototype.createTempleObjects = function(materials) {
    // Crear Menorá (candelabro)
    var menorahGroup = this.createMenorah(materials);
    menorahGroup.position.set(-6, 0, -5);
    this.scene.add(menorahGroup);
    this.templeParts['menora'] = menorahGroup;
    
    // Crear Mesa del Pan
    var tableGroup = this.createTable(materials);
    tableGroup.position.set(6, 0, -5);
    this.scene.add(tableGroup);
    this.templeParts['mesa-pan'] = tableGroup;
    
    // Crear Altar del Incienso
    var incenseAltarGroup = this.createIncenseAltar(materials);
    incenseAltarGroup.position.set(0, 0, -15);
    this.scene.add(incenseAltarGroup);
    this.templeParts['altar-incienso'] = incenseAltarGroup;
};

Temple3D.prototype.createMenorah = function(materials) {
    var menorahGroup = new THREE.Group();
    menorahGroup.name = "menora";
    
    // Base
    var baseGeometry = new THREE.CylinderGeometry(0.7, 1, 0.5, 16);
    var base = new THREE.Mesh(baseGeometry, materials.gold);
    base.position.y = 0.25;
    base.castShadow = true;
    base.receiveShadow = true;
    menorahGroup.add(base);
    
    // Tallo central
    var stemGeometry = new THREE.CylinderGeometry(0.2, 0.2, 5, 8);
    var stem = new THREE.Mesh(stemGeometry, materials.gold);
    stem.position.y = 3;
    stem.castShadow = true;
    menorahGroup.add(stem);
    
    // Lámpara central
    var lampGeometry = new THREE.SphereGeometry(0.3, 8, 8);
    var lamp = new THREE.Mesh(lampGeometry, materials.gold);
    lamp.position.y = 5.5;
    lamp.castShadow = true;
    menorahGroup.add(lamp);
    
    // Brazos laterales (simplificados)
    for (var i = -3; i <= 3; i += 2) {
        // Brazo curvado
        var curve = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(0, 1, 0),
            new THREE.Vector3(i * 0.4, 3, 0),
            new THREE.Vector3(i, 5, 0)
        );
        
        var points = curve.getPoints(10);
        var branchGeometry = new THREE.BufferGeometry().setFromPoints(points);
        var branchMaterial = new THREE.LineBasicMaterial({ color: 0xd4af37 });
        var branch = new THREE.Line(branchGeometry, branchMaterial);
        menorahGroup.add(branch);
        
        // Lámpara en el extremo
        var sideLamp = new THREE.Mesh(lampGeometry, materials.gold);
        sideLamp.position.set(i, 5, 0);
        sideLamp.castShadow = true;
        menorahGroup.add(sideLamp);
    }
    
    return menorahGroup;
};

Temple3D.prototype.createTable = function(materials) {
    var tableGroup = new THREE.Group();
    tableGroup.name = "mesa-pan";
    
    // Patas
    var legGeometry = new THREE.BoxGeometry(0.4, 2, 0.4);
    var legPositions = [
        [-0.8, 1, -0.8],
        [0.8, 1, -0.8],
        [-0.8, 1, 0.8],
        [0.8, 1, 0.8]
    ];
    
    for (var i = 0; i < legPositions.length; i++) {
        var pos = legPositions[i];
        var leg = new THREE.Mesh(legGeometry, materials.gold);
        leg.position.set(pos[0], pos[1], pos[2]);
        leg.castShadow = true;
        tableGroup.add(leg);
    }
    
    // Tablero
    var topGeometry = new THREE.BoxGeometry(2.5, 0.2, 2.5);
    var top = new THREE.Mesh(topGeometry, materials.gold);
    top.position.y = 2.1;
    top.castShadow = true;
    top.receiveShadow = true;
    tableGroup.add(top);
    
    // Panes (simplificados)
    var breadGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.1, 8);
    var breadMaterial = new THREE.MeshStandardMaterial({
        color: 0xe0c088,
        roughness: 0.8
    });
    
    for (var row = 0; row < 2; row++) {
        for (var col = 0; col < 3; col++) {
            var bread = new THREE.Mesh(breadGeometry, breadMaterial);
            bread.rotation.x = Math.PI / 2;
            bread.position.set(
                -0.6 + col * 0.6,
                2.25,
                -0.3 + row * 0.6
            );
            bread.castShadow = true;
            tableGroup.add(bread);
        }
    }
    
    return tableGroup;
};

Temple3D.prototype.createIncenseAltar = function(materials) {
    var altarGroup = new THREE.Group();
    altarGroup.name = "altar-incienso";
    
    // Base
    var baseGeometry = new THREE.BoxGeometry(1.5, 0.3, 1.5);
    var base = new THREE.Mesh(baseGeometry, materials.gold);
    base.position.y = 0.15;
    base.castShadow = true;
    base.receiveShadow = true;
    altarGroup.add(base);
    
    // Cuerpo
    var bodyGeometry = new THREE.BoxGeometry(1, 2, 1);
    var body = new THREE.Mesh(bodyGeometry, materials.gold);
    body.position.y = 1.3;
    body.castShadow = true;
    body.receiveShadow = true;
    altarGroup.add(body);
    
    // Parte superior
    var topGeometry = new THREE.BoxGeometry(1.5, 0.3, 1.5);
    var top = new THREE.Mesh(topGeometry, materials.gold);
    top.position.y = 2.45;
    top.castShadow = true;
    altarGroup.add(top);
    
    // Cuernos
    var hornGeometry = new THREE.ConeGeometry(0.15, 0.5, 4);
    var hornPositions = [
        [-0.6, 2.7, -0.6],
        [0.6, 2.7, -0.6],
        [-0.6, 2.7, 0.6],
        [0.6, 2.7, 0.6]
    ];
    
    for (var i = 0; i < hornPositions.length; i++) {
        var pos = hornPositions[i];
        var horn = new THREE.Mesh(hornGeometry, materials.gold);
        horn.position.set(pos[0], pos[1], pos[2]);
        horn.castShadow = true;
        altarGroup.add(horn);
    }
    
    return altarGroup;
};

Temple3D.prototype.createEnvironment = function(materials) {
    // Suelo del entorno
    var groundGeometry = new THREE.PlaneGeometry(200, 200);
    var groundMaterial = new THREE.MeshStandardMaterial({
        color: 0xd0cca9,
        roughness: 0.9,
        metalness: 0.1
    });
    
    var ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.01;
    ground.receiveShadow = true;
    this.scene.add(ground);
};

Temple3D.prototype.createInfoPoints = function() {
    // Material para los puntos de información
    var pointMaterial = new THREE.MeshBasicMaterial({ color: 0xffcc00 });
    
    // Datos de los puntos (posición e ID de la parte)
    var pointsData = [
        { position: [0, 2, 15], partId: 'atrio' },
        { position: [0, 5, 15], partId: 'altar-holocaustos' },
        { position: [15, 5, 0], partId: 'mar-bronce' },
        { position: [0, 10, 10], partId: 'columnas' },
        { position: [0, 7, -5], partId: 'lugar-santo' },
        { position: [0, 7, -25], partId: 'lugar-santisimo' },
        { position: [-6, 5, -5], partId: 'menora' },
        { position: [6, 5, -5], partId: 'mesa-pan' },
        { position: [0, 3, -15], partId: 'altar-incienso' }
    ];
    
    for (var i = 0; i < pointsData.length; i++) {
        var data = pointsData[i];
        
        // Crear geometría del punto
        var pointGeometry = new THREE.SphereGeometry(0.3, 8, 8);
        var point = new THREE.Mesh(pointGeometry, pointMaterial);
        
        // Posicionar
        point.position.set(data.position[0], data.position[1], data.position[2]);
        
        // Guardar datos
        point.userData = { partId: data.partId };
        
        // Añadir a la escena
        this.scene.add(point);
        
        // Guardar referencia
        this.infoPoints.push(point);
    }
};

Temple3D.prototype.setupEventListeners = function() {
    var self = this;
    
    // Redimensionamiento
    window.addEventListener('resize', function() {
        self.onWindowResize();
    });
    
    // Botones de control
    var zoomInBtn = document.getElementById('zoom-in');
    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', function() {
            self.zoomIn();
        });
    }
    
    var zoomOutBtn = document.getElementById('zoom-out');
    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', function() {
            self.zoomOut();
        });
    }
    
    var resetViewBtn = document.getElementById('reset-view');
    if (resetViewBtn) {
        resetViewBtn.addEventListener('click', function() {
            self.resetView();
        });
    }
    
    // Interacción con el modelo 3D
    if (this.renderer && this.renderer.domElement) {
        this.renderer.domElement.addEventListener('click', function(e) {
            self.onClick(e);
        });
    }
    
    // Botón de pantalla completa
    var fullscreenBtn = document.getElementById('fullscreen');
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', function() {
            self.toggleFullscreen();
        });
    }
    
    // Panel de información
    var infoPanelHeader = document.querySelector('.info-panel-header');
    if (infoPanelHeader) {
        infoPanelHeader.addEventListener('click', function() {
            var infoPanel = document.querySelector('.info-panel');
            if (infoPanel) {
                infoPanel.classList.toggle('minimized');
            }
        });
    }
};

Temple3D.prototype.onWindowResize = function() {
    var container = document.getElementById('canvas-container');
    if (!container || !this.camera || !this.renderer) return;
    
    var width = container.clientWidth;
    var height = container.clientHeight;
    
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
};

Temple3D.prototype.onClick = function(event) {
    if (!this.camera || !this.renderer) return;
    
    // Calcular posición del mouse en coordenadas normalizadas
    var rect = this.renderer.domElement.getBoundingClientRect();
    var mouse = new THREE.Vector2();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    // Raycaster para detectar objetos
    var raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, this.camera);
    
    // Buscar objetos que intersectan con el rayo
    var intersects = raycaster.intersectObjects(this.scene.children, true);
    
    if (intersects.length > 0) {
        // Buscar el objeto principal o su ancestro
        var targetObject = intersects[0].object;
        
        // Buscar hacia arriba en la jerarquía hasta encontrar un objeto con nombre
        while (targetObject && !targetObject.name && targetObject.parent) {
            targetObject = targetObject.parent;
        }
        
        // Si encontramos un objeto identificable
        if (targetObject && (targetObject.name || targetObject.userData && targetObject.userData.partId)) {
            var partId = targetObject.userData && targetObject.userData.partId ? targetObject.userData.partId : targetObject.name;
            
            // Actualizar estado actual
            if (partId) {
                this.focusOnPart(partId);
                this.updateCurrentSelection(partId);
            }
        }
    }
};

Temple3D.prototype.updateCurrentSelection = function(partId) {
    var currentPartElement = document.getElementById('current-part-name');
    if (currentPartElement) {
        // Convertir ID a nombre más legible
        var partNames = {
            'atrio': 'El Atrio',
            'altar-holocaustos': 'Altar de Holocaustos',
            'mar-bronce': 'Mar de Bronce',
            'columnas': 'Columnas Jaquín y Boaz',
            'lugar-santo': 'Lugar Santo',
            'lugar-santisimo': 'Lugar Santísimo',
            'menora': 'Menorá (Candelabro de Oro)',
            'mesa-pan': 'Mesa del Pan de la Proposición',
            'altar-incienso': 'Altar del Incienso'
        };
        
        currentPartElement.textContent = partNames[partId] || partId;
    }
};

// Vistas fijas para las cámaras interiores (Lugar Santo y Lugar Santísimo):
// el cálculo genérico por caja envolvente ubica la cámara siguiendo la
// línea recta desde su posición anterior hasta el centro de la parte, y
// para estas dos habitaciones anidadas esa línea atraviesa los muros de
// las salas exteriores, dejando la cámara encerrada dentro de una pared.
var INTERIOR_FOCUS_VIEWS = {
    'lugar-santo': { camera: [0, 10, 5], target: [0, 3, -10] },
    'lugar-santisimo': { camera: [4, 5, -21], target: [0, 2, -25] }
};

Temple3D.prototype.focusOnPart = function(partId) {
    // Buscar la parte
    var part = this.templeParts[partId];
    if (!part) {
        console.warn('Parte no encontrada: ' + partId);
        return;
    }

    var interiorView = INTERIOR_FOCUS_VIEWS[partId];
    if (interiorView) {
        this.targetPosition.set(interiorView.camera[0], interiorView.camera[1], interiorView.camera[2]);
        this.currentPosition.copy(this.camera.position);
        this.controls.target.set(interiorView.target[0], interiorView.target[1], interiorView.target[2]);
        this.isAnimating = true;
        this.animationStartTime = this.clock.getElapsedTime();
        this.animationDuration = 1.5;
        this.showPartDetails(partId);
        return;
    }

    // Calcular la posición central a partir de las mallas relevantes
    // (ignora paredes envolventes marcadas con excludeFromFocus, para que
    // la cámara no termine encerrada dentro de una habitación)
    var box = new THREE.Box3();
    part.updateMatrixWorld(true);
    part.traverse(function(child) {
        if (child.isMesh && !child.userData.excludeFromFocus) {
            box.expandByObject(child);
        }
    });
    if (box.isEmpty()) {
        box.setFromObject(part);
    }
    var center = new THREE.Vector3();
    box.getCenter(center);
    var size = new THREE.Vector3();
    box.getSize(size);
    
    // Calcular la mejor posición para la cámara
    var distance = Math.max(size.x, size.y, size.z) * 2;
    var direction = new THREE.Vector3();
    direction.subVectors(this.camera.position, center).normalize();
    
    // Establecer destino
    this.targetPosition.copy(center).add(direction.multiplyScalar(distance));
    this.currentPosition.copy(this.camera.position);
    
    // Establecer objetivo de los controles
    this.controls.target.copy(center);
    
    // Iniciar animación
    this.isAnimating = true;
    this.animationStartTime = this.clock.getElapsedTime();
    this.animationDuration = 1.5;
    
    // Mostrar detalles de la parte
    this.showPartDetails(partId);
};

// Enfoca automáticamente el componente indicado en la URL (?part=menora),
// usado por los enlaces "Ver en 3D" de cada tarjeta en templo-figuras.html
Temple3D.prototype.focusOnPartFromURL = function() {
    var params = new URLSearchParams(window.location.search);
    var partId = params.get('part');
    if (!partId || !this.templeParts[partId]) return;

    this.focusOnPart(partId);
    this.updateCurrentSelection(partId);
};

Temple3D.prototype.showPartDetails = function(partId) {
    var partData = typeof window.templeData !== 'undefined' ? window.templeData[partId] : null;
    
    if (!partData) return;
    
    // Actualizar modal
    var modal = document.getElementById('detail-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.querySelector('.modal-title').textContent = partData.title;
        modal.querySelector('.description-text').textContent = partData.description;
        modal.querySelector('.symbolism-text').textContent = partData.symbolism;
    }
};

Temple3D.prototype.zoomIn = function() {
    if (!this.camera || !this.controls) return;
    
    var zoomFactor = 0.8;
    var direction = new THREE.Vector3();
    direction.subVectors(
        this.camera.position,
        this.controls.target
    );
    
    direction.multiplyScalar(zoomFactor);
    this.camera.position.copy(this.controls.target).add(direction);
    
    this.controls.update();
};

Temple3D.prototype.zoomOut = function() {
    if (!this.camera || !this.controls) return;
    
    var zoomFactor = 1.2;
    var direction = new THREE.Vector3();
    direction.subVectors(
        this.camera.position,
        this.controls.target
    );
    
    direction.multiplyScalar(zoomFactor);
    this.camera.position.copy(this.controls.target).add(direction);
    
    this.controls.update();
};

Temple3D.prototype.resetView = function() {
    if (!this.camera || !this.controls) return;
    
    // Animar a la posición inicial
    this.targetPosition.set(30, 20, 40);
    this.currentPosition.copy(this.camera.position);
    this.controls.target.set(0, 0, 0);
    
    this.isAnimating = true;
    this.animationStartTime = this.clock.getElapsedTime();
    this.animationDuration = 1.5;
};

Temple3D.prototype.toggleFullscreen = function() {
    var container = document.getElementById('canvas-container');
    if (!container) return;
    
    if (!document.fullscreenElement) {
        if (container.requestFullscreen) {
            container.requestFullscreen();
        } else if (container.mozRequestFullScreen) { // Firefox
            container.mozRequestFullScreen();
        } else if (container.webkitRequestFullscreen) { // Chrome, Safari, Opera
            container.webkitRequestFullscreen();
        } else if (container.msRequestFullscreen) { // IE/Edge
            container.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari, Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
    }
};

Temple3D.prototype.animate = function() {
    var self = this;
    requestAnimationFrame(function() {
        self.animate();
    });
    
    // Actualizar controles
    if (this.controls) {
        this.controls.update();
    }
    
    // Actualizar animación de cámara
    if (this.isAnimating) {
        var elapsed = this.clock.getElapsedTime() - this.animationStartTime;
        var progress = Math.min(elapsed / this.animationDuration, 1.0);
        
        // Función de ease-out para suavizar
        var easeOutProgress = 1 - Math.pow(1 - progress, 3);
        
        // Interpolar posición de cámara
        this.camera.position.x = this.currentPosition.x + (this.targetPosition.x - this.currentPosition.x) * easeOutProgress;
        this.camera.position.y = this.currentPosition.y + (this.targetPosition.y - this.currentPosition.y) * easeOutProgress;
        this.camera.position.z = this.currentPosition.z + (this.targetPosition.z - this.currentPosition.z) * easeOutProgress;
        
        // Finalizar animación
        if (progress >= 1.0) {
            this.isAnimating = false;
        }
    }
    
    // Renderizar
    if (this.renderer && this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera);
    }
};

Temple3D.prototype.hideLoader = function() {
    var loader = document.getElementById('loading-indicator');
    if (loader) {
        loader.style.display = 'none';
    }
};

Temple3D.prototype.handleInitError = function() {
    var loader = document.getElementById('loading-indicator');
    if (loader) {
        loader.innerHTML = '<p>Error al cargar el modelo 3D. Por favor, recarga la página.</p>';
    }
};

// Datos del templo para demostración (en caso de que no exista temple-data.js)
window.templeData = {
    'atrio': {
        title: 'El Atrio',
        description: 'El área exterior del templo donde se reunía el pueblo para la adoración.',
        symbolism: 'Representa el mundo y la entrada al reino de Dios.',
        category: 'exterior'
    },
    'altar-holocaustos': {
        title: 'Altar de los Holocaustos',
        description: 'Una gran estructura de bronce donde se ofrecían los sacrificios diarios.',
        symbolism: 'Representa la necesidad de expiación por el pecado.',
        category: 'exterior'
    },
    'mar-bronce': {
        title: 'El Mar de Bronce',
        description: 'Una enorme fuente circular de bronce sostenida por doce bueyes.',
        symbolism: 'Simboliza la purificación necesaria para acercarse a Dios.',
        category: 'exterior'
    },
    'columnas': {
        title: 'Columnas Jaquín y Boaz',
        description: 'Dos grandes columnas de bronce que flanqueaban la entrada del templo.',
        symbolism: 'Representan la estabilidad y la fuerza.',
        category: 'exterior'
    },
    'lugar-santo': {
        title: 'El Lugar Santo (Hekal)',
        description: 'Primera cámara interior del templo, donde solo los sacerdotes podían entrar.',
        symbolism: 'Representa el camino de santificación y servicio a Dios.',
        category: 'interior'
    },
    'lugar-santisimo': {
        title: 'El Lugar Santísimo (Debir)',
        description: 'La cámara más interior y sagrada del templo, separada por un velo.',
        symbolism: 'Representa la morada celestial de Dios y Su presencia.',
        category: 'interior'
    },
    'menora': {
        title: 'El Candelabro de Oro (Menorá)',
        description: 'Candelabro de oro puro con siete brazos que iluminaba el Lugar Santo.',
        symbolism: 'Representa la luz divina y la presencia del Espíritu de Dios.',
        category: 'mobiliario'
    },
    'mesa-pan': {
        title: 'Mesa para el Pan de la Proposición',
        description: 'Mesa de oro donde se colocaban doce panes, que se renovaban cada sábado.',
        symbolism: 'Representa la provisión continua de Dios para Su pueblo.',
        category: 'mobiliario'
    },
    'altar-incienso': {
        title: 'Altar del Incienso',
        description: 'Pequeño altar de oro ubicado frente al velo, donde se quemaba incienso.',
        symbolism: 'Simboliza las oraciones de los fieles ascendiendo a Dios.',
        category: 'mobiliario'
    }
};

// Inicializar la aplicación cuando el documento esté listo
document.addEventListener('DOMContentLoaded', function() {
    var app = new TempleApp();
});