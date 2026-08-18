// doctrine-cards.js - Sistema de Tarjetas de Estudio de Doctrina Básica

const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

const doctrineCards = {
    // Datos de las 10 doctrinas fundamentales
    doctrines: [
        {
            id: 1,
            title: "Autoridad de las Escrituras",
            verse: "Toda la Escritura es inspirada por Dios",
            icon: "fa-book",
            description: "La Biblia es la Palabra de Dios escrita, completamente inspirada, inerrante e infalible. Es nuestra autoridad suprema para la fe y la vida cristiana.",
            keyPoints: [
                "Dios inspiró a los autores humanos",
                "Las Escrituras son sin error en los originales",
                "La Biblia es nuestra guía para la vida",
                "Debemos estudiarla y obedecerla"
            ],
            bibleReference: {
                text: "Toda la Escritura es inspirada por Dios, y útil para enseñar, para redargüir, para corregir, para instruir en justicia.",
                cite: "2 Timoteo 3:16"
            },
            additionalVerses: [
                "2 Pedro 1:21",
                "Salmos 119:105",
                "Hebreos 4:12",
                "Mateo 4:4"
            ]
        },
        {
            id: 2,
            title: "La Trinidad",
            verse: "Un solo Dios en tres personas",
            icon: "fa-infinity",
            description: "Dios existe eternamente en tres personas distintas: Padre, Hijo y Espíritu Santo. Cada persona es completamente Dios, pero hay un solo Dios.",
            keyPoints: [
                "Un solo Dios, tres personas",
                "Cada persona es completamente Dios",
                "Las tres personas son coeternas",
                "Trabajan en perfecta unidad"
            ],
            bibleReference: {
                text: "Por tanto, id, y haced discípulos a todas las naciones, bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu Santo.",
                cite: "Mateo 28:19"
            },
            additionalVerses: [
                "2 Corintios 13:14",
                "Génesis 1:26",
                "Juan 1:1-3",
                "1 Juan 5:7"
            ]
        },
        {
            id: 3,
            title: "Naturaleza de Dios",
            verse: "Dios es amor, santo y justo",
            icon: "fa-crown",
            description: "Dios es eterno, omnipotente, omnisciente, omnipresente, inmutable, santo, justo, misericordioso y amoroso. Él es el Creador y Sustentador de todas las cosas.",
            keyPoints: [
                "Omnipotente - Todo poderoso",
                "Omnisciente - Todo lo sabe",
                "Omnipresente - Está en todo lugar",
                "Santo, justo y amoroso"
            ],
            bibleReference: {
                text: "El que no ama, no ha conocido a Dios; porque Dios es amor.",
                cite: "1 Juan 4:8"
            },
            additionalVerses: [
                "Isaías 6:3",
                "Salmos 139:7-12",
                "Apocalipsis 4:8",
                "Jeremías 23:24"
            ]
        },
        {
            id: 4,
            title: "El Hombre y el Pecado",
            verse: "Todos pecaron y están destituidos",
            icon: "fa-user",
            description: "El hombre fue creado a imagen de Dios, pero cayó en pecado. Todos los seres humanos son pecadores por naturaleza y necesitan la salvación que solo Cristo puede proveer.",
            keyPoints: [
                "Creado a imagen de Dios",
                "Caído en pecado por Adán",
                "Separado de Dios por el pecado",
                "Necesita un Salvador"
            ],
            bibleReference: {
                text: "Por cuanto todos pecaron, y están destituidos de la gloria de Dios.",
                cite: "Romanos 3:23"
            },
            additionalVerses: [
                "Génesis 1:27",
                "Romanos 5:12",
                "Isaías 59:2",
                "Efesios 2:1-3"
            ]
        },
        {
            id: 5,
            title: "Jesucristo",
            verse: "Verdadero Dios y verdadero hombre",
            icon: "fa-cross",
            description: "Jesucristo es la segunda persona de la Trinidad. Es verdadero Dios y verdadero hombre, nacido de la virgen María, vivió sin pecado, murió en la cruz por nuestros pecados y resucitó al tercer día.",
            keyPoints: [
                "100% Dios y 100% hombre",
                "Nacido de la virgen María",
                "Vivió sin pecado",
                "Murió y resucitó por nosotros"
            ],
            bibleReference: {
                text: "Yo soy el camino, y la verdad, y la vida; nadie viene al Padre, sino por mí.",
                cite: "Juan 14:6"
            },
            additionalVerses: [
                "Juan 1:14",
                "Filipenses 2:5-8",
                "1 Corintios 15:3-4",
                "Hebreos 4:15"
            ]
        },
        {
            id: 6,
            title: "Salvación por Gracia",
            verse: "Por gracia sois salvos por medio de la fe",
            icon: "fa-heart",
            description: "La salvación es un don gratuito de Dios, no se puede ganar por obras. Es recibida por fe en Jesucristo únicamente. Include justificación, santificación y glorificación.",
            keyPoints: [
                "Un don gratuito de Dios",
                "Por fe, no por obras",
                "Solo a través de Cristo",
                "Eterna y segura"
            ],
            bibleReference: {
                text: "Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios.",
                cite: "Efesios 2:8"
            },
            additionalVerses: [
                "Romanos 10:9-10",
                "Juan 3:16",
                "Tito 3:5",
                "Hechos 4:12"
            ]
        },
        {
            id: 7,
            title: "El Espíritu Santo",
            verse: "Consolador y Guía",
            icon: "fa-dove",
            description: "El Espíritu Santo es la tercera persona de la Trinidad. Convence de pecado, regenera, bautiza, sella, llena y guía a los creyentes. Da dones espirituales para el servicio.",
            keyPoints: [
                "Convence de pecado",
                "Regenera al creyente",
                "Bautiza en el Cuerpo de Cristo",
                "Guía y consuela"
            ],
            bibleReference: {
                text: "Mas el Consolador, el Espíritu Santo, a quien el Padre enviará en mi nombre, él os enseñará todas las cosas.",
                cite: "Juan 14:26"
            },
            additionalVerses: [
                "Juan 16:8",
                "1 Corintios 12:13",
                "Efesios 1:13",
                "Gálatas 5:22-23"
            ]
        },
        {
            id: 8,
            title: "La Iglesia",
            verse: "Cuerpo de Cristo",
            icon: "fa-church",
            description: "La Iglesia es el Cuerpo de Cristo, compuesta por todos los verdaderos creyentes. Tiene el propósito de adorar, edificar, evangelizar y servir. Cristo es la cabeza de la Iglesia.",
            keyPoints: [
                "El Cuerpo de Cristo",
                "Todos los verdaderos creyentes",
                "Una comunidad de fe",
                "Llamada a la misión"
            ],
            bibleReference: {
                text: "Y él es la cabeza del cuerpo que es la iglesia, él que es el principio, el primogénito de entre los muertos.",
                cite: "Colosenses 1:18"
            },
            additionalVerses: [
                "1 Corintios 12:27",
                "Efesios 4:11-16",
                "Mateo 16:18",
                "Hechos 2:42"
            ]
        },
        {
            id: 9,
            title: "Vida Cristiana",
            verse: "Crecer en gracia y conocimiento",
            icon: "fa-seedling",
            description: "El creyente está llamado a vivir una vida santa, creciendo en santificación. Esto incluye la obediencia a la Palabra, la oración, la comunión con otros creyentes y el servicio.",
            keyPoints: [
                "Estudiar la Palabra de Dios",
                "Orar constantemente",
                "Congregarse con otros",
                "Servir a Dios y otros"
            ],
            bibleReference: {
                text: "Antes bien, creced en la gracia y el conocimiento de nuestro Señor y Salvador Jesucristo.",
                cite: "2 Pedro 3:18"
            },
            additionalVerses: [
                "Filipenses 2:12-13",
                "1 Tesalonicenses 5:17",
                "Hebreos 10:25",
                "Gálatas 5:13"
            ]
        },
        {
            id: 10,
            title: "Eventos Futuros",
            verse: "Cristo volverá en gloria",
            icon: "fa-hourglass-end",
            description: "Cristo volverá visiblemente para juzgar a vivos y muertos. Habrá resurrección de justos e injustos, cielo eterno para los salvos e infierno eterno para los perdidos.",
            keyPoints: [
                "Segunda venida de Cristo",
                "Resurrección de los muertos",
                "Juicio final",
                "Cielo e infierno eternos"
            ],
            bibleReference: {
                text: "Y si me fuere y os preparare lugar, vendré otra vez, y os tomaré a mí mismo.",
                cite: "Juan 14:3"
            },
            additionalVerses: [
                "1 Tesalonicenses 4:16-17",
                "Apocalipsis 20:11-15",
                "Mateo 25:31-46",
                "2 Pedro 3:10"
            ]
        }
    ],

    // Inicializar las tarjetas de doctrina
    init() {
        this.renderDoctrineCards();
        this.loadCompletedDoctrines();
        this.setupEventListeners();
        this.setupAnimations();
    },

    // Renderizar las tarjetas en el DOM
    renderDoctrineCards() {
        const grid = document.getElementById('doctrinesGrid');
        if (!grid) return;

        grid.innerHTML = '';

        this.doctrines.forEach(doctrine => {
            const card = this.createDoctrineCard(doctrine);
            grid.appendChild(card);
        });
    },

    // Crear una tarjeta de doctrina
    createDoctrineCard(doctrine) {
        const card = document.createElement('div');
        card.className = 'doctrine-card fade-in';
        card.setAttribute('data-doctrine', doctrine.id);

        card.innerHTML = `
            <div class="doctrine-header">
                <div class="doctrine-number">${ROMAN_NUMERALS[doctrine.id - 1] || doctrine.id}</div>
                <div class="doctrine-icon">
                    ${faIcon(doctrine.icon)}
                </div>
                <h3 class="doctrine-title">${doctrine.title}</h3>
                <p class="doctrine-verse">"${doctrine.verse}"</p>
            </div>
            <div class="doctrine-content">
                <p class="doctrine-description">
                    ${doctrine.description}
                </p>
                <div class="key-points">
                    <h4>Puntos Clave:</h4>
                    <ul>
                        ${doctrine.keyPoints.map(point => `<li>${point}</li>`).join('')}
                    </ul>
                </div>
                <div class="bible-reference">
                    <div class="bible-reference-text">
                        "${doctrine.bibleReference.text}"
                    </div>
                    <div class="bible-reference-cite">${doctrine.bibleReference.cite}</div>
                </div>
                <div class="action-buttons">
                    <button class="btn btn-primary" onclick="doctrineCards.markCompleted(${doctrine.id})">
                        ${faIcon('fa-check')}
                        Entendido
                    </button>
                    <button class="btn btn-secondary" onclick="doctrineCards.showDetails(${doctrine.id})">
                        ${faIcon('fa-info-circle')}
                        Más Info
                    </button>
                </div>
            </div>
        `;

        return card;
    },

    // Marcar doctrina como completada
    markCompleted(doctrineId) {
        const card = document.querySelector(`[data-doctrine="${doctrineId}"]`);
        if (!card) return;

        card.classList.add('completed');
        
        const button = card.querySelector('.btn-primary');
        button.innerHTML = faIcon('fa-check') + ' Completado';
        button.classList.remove('btn-primary');
        button.classList.add('btn-success');
        button.disabled = true;

        // Guardar en localStorage
        let completed = this.getCompletedDoctrines();
        if (!completed.includes(doctrineId)) {
            completed.push(doctrineId);
            localStorage.setItem('completedDoctrines', JSON.stringify(completed));
        }

        // Actualizar progreso
        if (window.progressTracker) {
            window.progressTracker.updateProgress();
        }

        // Efectos visuales
        this.celebrateCompletion(card);
    },

    // Mostrar detalles adicionales
    showDetails(doctrineId) {
        const doctrine = this.doctrines.find(d => d.id === doctrineId);
        if (!doctrine) return;

        // Crear modal con información adicional
        const modal = document.createElement('div');
        modal.className = 'doctrine-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close" onclick="doctrineCards.closeModal()">&times;</span>
                <h2>${doctrine.title}</h2>
                <h3>Versículos Adicionales para Estudio:</h3>
                <ul class="additional-verses">
                    ${doctrine.additionalVerses.map(verse => `<li>${verse}</li>`).join('')}
                </ul>
                <h3>Preguntas de Reflexión:</h3>
                <ul class="reflection-questions">
                    <li>¿Cómo esta doctrina impacta tu vida diaria?</li>
                    <li>¿Qué aspectos de esta verdad necesitas profundizar más?</li>
                    <li>¿Cómo puedes compartir esta verdad con otros?</li>
                </ul>
                <button class="btn btn-primary" onclick="doctrineCards.startDeepStudy(${doctrineId})">
                    ${faIcon('fa-book-reader')}
                    Iniciar Estudio Profundo
                </button>
            </div>
        `;

        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('show'), 10);
    },

    // Cerrar modal
    closeModal() {
        const modal = document.querySelector('.doctrine-modal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        }
    },

    // Iniciar estudio profundo
    startDeepStudy(doctrineId) {
        this.closeModal();
        
        // Aquí se podría implementar un estudio más detallado
        alert(`Iniciando estudio profundo de la Doctrina ${doctrineId}. En una implementación completa, esto abriría un módulo de estudio interactivo con videos, ejercicios y más recursos.`);
    },

    // Cargar doctrinas completadas
    loadCompletedDoctrines() {
        const completed = this.getCompletedDoctrines();
        completed.forEach(id => {
            const card = document.querySelector(`[data-doctrine="${id}"]`);
            if (card) {
                card.classList.add('completed');
                const button = card.querySelector('.btn-primary');
                if (button) {
                    button.innerHTML = faIcon('fa-check') + ' Completado';
                    button.classList.remove('btn-primary');
                    button.classList.add('btn-success');
                    button.disabled = true;
                }
            }
        });
    },

    // Obtener doctrinas completadas
    getCompletedDoctrines() {
        const saved = localStorage.getItem('completedDoctrines');
        return saved ? JSON.parse(saved) : [];
    },

    // Configurar event listeners
    setupEventListeners() {
        // Click fuera del modal para cerrar
        window.addEventListener('click', (event) => {
            if (event.target.classList.contains('doctrine-modal')) {
                this.closeModal();
            }
        });

        // Atajos de teclado
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.closeModal();
            }
        });
    },

    // Configurar animaciones
    setupAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.fade-in').forEach(element => {
            observer.observe(element);
        });
    },

    // Celebrar cuando se completa una doctrina
    celebrateCompletion(card) {
        // Animación de confetti o similar
        card.style.animation = 'pulse 0.5s ease-in-out';
        
        // Sonido de logro (si se implementa)
        // this.playCompletionSound();

        // Mensaje motivacional
        const messages = [
            "¡Excelente! Sigue adelante en tu crecimiento.",
            "¡Bien hecho! La Palabra de Dios te está transformando.",
            "¡Gloria a Dios! Continúa profundizando en Su verdad.",
            "¡Maravilloso! Cada paso te acerca más a Cristo."
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        // Mostrar notificación temporal
        this.showNotification(randomMessage, 'success');
    },

    // Mostrar notificación
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            ${faIcon('fa-check-circle')}
            <span>${message}</span>
        `;

        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
};

// Estilos adicionales para el modal y notificaciones
const modalStyles = `
<style>
.doctrine-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.doctrine-modal.show {
    opacity: 1;
}

.modal-content {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    max-width: 600px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    position: relative;
    transform: scale(0.9);
    transition: transform 0.3s ease;
}

.doctrine-modal.show .modal-content {
    transform: scale(1);
}

.modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 2rem;
    cursor: pointer;
    color: var(--text-light);
    transition: color 0.3s ease;
}

.modal-close:hover {
    color: var(--text-dark);
}

.additional-verses,
.reflection-questions {
    list-style: none;
    padding: 0;
    margin: 1rem 0;
}

.additional-verses li,
.reflection-questions li {
    padding: 0.5rem 0;
    padding-left: 1.5rem;
    position: relative;
}

.additional-verses li::before {
    content: "📖";
    position: absolute;
    left: 0;
}

.reflection-questions li::before {
    content: "💭";
    position: absolute;
    left: 0;
}

.notification {
    position: fixed;
    top: 100px;
    right: 20px;
    background: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    gap: 1rem;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    z-index: 3000;
}

.notification.show {
    transform: translateX(0);
}

.notification-success {
    border-left: 4px solid var(--growth-green);
}

.notification-success i {
    color: var(--growth-green);
    font-size: 1.5rem;
}
</style>
`;

// Agregar estilos al documento
document.head.insertAdjacentHTML('beforeend', modalStyles);

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    doctrineCards.init();
});