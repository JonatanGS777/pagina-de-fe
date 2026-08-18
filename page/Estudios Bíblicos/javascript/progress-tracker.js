// progress-tracker.js - Sistema Integral de Seguimiento de Progreso

const progressTracker = {
    // Estado del progreso
    progressData: {
        completedDoctrines: [],
        quizScores: [],
        studyTime: 0,
        lastStudyDate: null,
        achievements: [],
        streakDays: 0,
        totalPoints: 0,
        level: 1
    },

    // Sistema de logros
    achievements: [
        {
            id: 'first_doctrine',
            name: 'Primer Paso',
            description: 'Completa tu primera doctrina',
            icon: 'fa-baby-carriage',
            points: 10,
            condition: (data) => data.completedDoctrines.length >= 1
        },
        {
            id: 'halfway_there',
            name: 'A Medio Camino',
            description: 'Completa 5 doctrinas',
            icon: 'fa-star-half-alt',
            points: 50,
            condition: (data) => data.completedDoctrines.length >= 5
        },
        {
            id: 'doctrine_master',
            name: 'Maestro de Doctrinas',
            description: 'Completa todas las 10 doctrinas',
            icon: 'fa-crown',
            points: 100,
            condition: (data) => data.completedDoctrines.length >= 10
        },
        {
            id: 'quiz_ace',
            name: 'As del Quiz',
            description: 'Obtén 90% o más en un quiz',
            icon: 'fa-brain',
            points: 30,
            condition: (data) => data.quizScores.some(score => score >= 90)
        },
        {
            id: 'perfect_score',
            name: 'Puntuación Perfecta',
            description: 'Obtén 100% en un quiz',
            icon: 'fa-medal',
            points: 50,
            condition: (data) => data.quizScores.some(score => score === 100)
        },
        {
            id: 'consistent_learner',
            name: 'Aprendiz Constante',
            description: 'Estudia 7 días seguidos',
            icon: 'fa-fire',
            points: 40,
            condition: (data) => data.streakDays >= 7
        },
        {
            id: 'dedicated_student',
            name: 'Estudiante Dedicado',
            description: 'Estudia 30 días seguidos',
            icon: 'fa-fire-alt',
            points: 100,
            condition: (data) => data.streakDays >= 30
        },
        {
            id: 'knowledge_seeker',
            name: 'Buscador de Conocimiento',
            description: 'Completa 10 quizzes',
            icon: 'fa-book-reader',
            points: 60,
            condition: (data) => data.quizScores.length >= 10
        },
        {
            id: 'study_veteran',
            name: 'Veterano del Estudio',
            description: 'Acumula 10 horas de estudio',
            icon: 'fa-hourglass',
            points: 80,
            condition: (data) => data.studyTime >= 600 // 10 horas en minutos
        },
        {
            id: 'level_5',
            name: 'Nivel 5 Alcanzado',
            description: 'Alcanza el nivel 5',
            icon: 'fa-layer-group',
            points: 75,
            condition: (data) => data.level >= 5
        }
    ],

    // Niveles del sistema
    levels: [
        { level: 1, name: 'Nuevo Creyente', minPoints: 0, color: '#94A3B8' },
        { level: 2, name: 'Aprendiz', minPoints: 50, color: '#3B82F6' },
        { level: 3, name: 'Estudiante', minPoints: 150, color: '#10B981' },
        { level: 4, name: 'Conocedor', minPoints: 300, color: '#F59E0B' },
        { level: 5, name: 'Discípulo', minPoints: 500, color: '#8B5CF6' },
        { level: 6, name: 'Maestro', minPoints: 800, color: '#EF4444' },
        { level: 7, name: 'Embajador de la Fe', minPoints: 1200, color: '#EC4899' }
    ],

    // Inicializar el sistema
    init() {
        this.loadProgress();
        this.updateUI();
        this.checkStreak();
        this.startTimeTracking();
        this.setupEventListeners();
        this.checkAchievements();
    },

    // Cargar progreso guardado
    loadProgress() {
        const saved = localStorage.getItem('doctrineProgress');
        if (saved) {
            this.progressData = { ...this.progressData, ...JSON.parse(saved) };
        }

        // Sincronizar con otros módulos
        this.syncWithDoctrineCards();
        this.syncWithQuizHistory();
    },

    // Sincronizar con tarjetas de doctrina
    syncWithDoctrineCards() {
        const completedFromCards = localStorage.getItem('completedDoctrines');
        if (completedFromCards) {
            const completed = JSON.parse(completedFromCards);
            // Merge sin duplicados
            this.progressData.completedDoctrines = [...new Set([
                ...this.progressData.completedDoctrines,
                ...completed
            ])];
        }
    },

    // Sincronizar con historial de quiz
    syncWithQuizHistory() {
        const quizHistory = localStorage.getItem('doctrineQuizHistory');
        if (quizHistory) {
            const history = JSON.parse(quizHistory);
            this.progressData.quizScores = history.map(h => h.percentage);
        }
    },

    // Guardar progreso
    saveProgress() {
        localStorage.setItem('doctrineProgress', JSON.stringify(this.progressData));
        
        // Disparar evento personalizado
        window.dispatchEvent(new CustomEvent('progressUpdated', {
            detail: this.progressData
        }));
    },

    // Actualizar UI
    updateUI() {
        this.updateProgressBar();
        this.updateStatistics();
        this.updateLevel();
        this.displayAchievements();
    },

    // Actualizar barra de progreso
    updateProgressBar() {
        const progressFill = document.getElementById('progressFill');
        const progressPercentage = document.querySelector('.progress-percentage');
        
        if (!progressFill || !progressPercentage) return;

        const total = 10; // Total de doctrinas
        const completed = this.progressData.completedDoctrines.length;
        const percentage = Math.round((completed / total) * 100);

        progressFill.style.width = percentage + '%';
        progressPercentage.textContent = percentage + '% Completado';

        // Cambiar color según progreso
        if (percentage >= 100) {
            progressFill.style.background = 'var(--gradient-faith)';
            this.showCompletionCelebration();
        } else if (percentage >= 75) {
            progressFill.style.background = 'linear-gradient(135deg, #10B981 0%, #059669 100%)';
        } else if (percentage >= 50) {
            progressFill.style.background = 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)';
        }
    },

    // Actualizar estadísticas
    updateStatistics() {
        // Crear panel de estadísticas si no existe
        if (!document.getElementById('statsPanel')) {
            this.createStatsPanel();
        }

        const stats = {
            doctrinesCompleted: this.progressData.completedDoctrines.length,
            quizzesTaken: this.progressData.quizScores.length,
            averageScore: this.calculateAverageScore(),
            studyStreak: this.progressData.streakDays,
            totalStudyTime: this.formatStudyTime(this.progressData.studyTime),
            currentLevel: this.getCurrentLevel().name
        };

        // Actualizar valores en el panel
        Object.keys(stats).forEach(key => {
            const element = document.querySelector(`[data-stat="${key}"]`);
            if (element) {
                element.textContent = stats[key];
            }
        });
    },

    // Crear panel de estadísticas
    createStatsPanel() {
        const statsHTML = `
            <div id="statsPanel" class="stats-panel">
                <button class="stats-toggle" onclick="progressTracker.toggleStats()">
                    ${faIcon('fa-chart-line')}
                </button>
                <div class="stats-content">
                    <h3>Tu Progreso</h3>
                    <div class="stats-grid">
                        <div class="stat-item">
                            ${faIcon('fa-book')}
                            <span class="stat-value" data-stat="doctrinesCompleted">0</span>
                            <span class="stat-label">Doctrinas</span>
                        </div>
                        <div class="stat-item">
                            ${faIcon('fa-clipboard-check')}
                            <span class="stat-value" data-stat="quizzesTaken">0</span>
                            <span class="stat-label">Quizzes</span>
                        </div>
                        <div class="stat-item">
                            ${faIcon('fa-percentage')}
                            <span class="stat-value" data-stat="averageScore">0%</span>
                            <span class="stat-label">Promedio</span>
                        </div>
                        <div class="stat-item">
                            ${faIcon('fa-fire')}
                            <span class="stat-value" data-stat="studyStreak">0</span>
                            <span class="stat-label">Racha días</span>
                        </div>
                        <div class="stat-item">
                            ${faIcon('fa-clock')}
                            <span class="stat-value" data-stat="totalStudyTime">0h</span>
                            <span class="stat-label">Tiempo total</span>
                        </div>
                        <div class="stat-item">
                            ${faIcon('fa-layer-group')}
                            <span class="stat-value" data-stat="currentLevel">-</span>
                            <span class="stat-label">Nivel</span>
                        </div>
                    </div>
                    <div class="level-progress">
                        <div class="level-info">
                            <span class="current-level"></span>
                            <span class="next-level"></span>
                        </div>
                        <div class="level-bar">
                            <div class="level-fill"></div>
                        </div>
                        <div class="points-info">
                            <span class="current-points"></span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', statsHTML);
    },

    // Toggle panel de estadísticas
    toggleStats() {
        const panel = document.getElementById('statsPanel');
        if (panel) {
            panel.classList.toggle('expanded');
        }
    },

    // Calcular promedio de puntuación
    calculateAverageScore() {
        if (this.progressData.quizScores.length === 0) return '0%';
        
        const sum = this.progressData.quizScores.reduce((acc, score) => acc + score, 0);
        const average = Math.round(sum / this.progressData.quizScores.length);
        return average + '%';
    },

    // Formatear tiempo de estudio
    formatStudyTime(minutes) {
        if (minutes < 60) return minutes + 'm';
        
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours + 'h ' + (mins > 0 ? mins + 'm' : '');
    },

    // Sistema de niveles
    getCurrentLevel() {
        const points = this.progressData.totalPoints;
        let currentLevel = this.levels[0];
        
        for (let i = this.levels.length - 1; i >= 0; i--) {
            if (points >= this.levels[i].minPoints) {
                currentLevel = this.levels[i];
                break;
            }
        }
        
        return currentLevel;
    },

    // Actualizar nivel
    updateLevel() {
        const currentLevel = this.getCurrentLevel();
        const nextLevelIndex = this.levels.findIndex(l => l.level === currentLevel.level) + 1;
        const nextLevel = this.levels[nextLevelIndex] || currentLevel;
        
        this.progressData.level = currentLevel.level;
        
        // Actualizar UI de nivel
        const levelInfo = document.querySelector('.current-level');
        const nextLevelInfo = document.querySelector('.next-level');
        const levelFill = document.querySelector('.level-fill');
        const pointsInfo = document.querySelector('.current-points');
        
        if (levelInfo) {
            levelInfo.textContent = `Nivel ${currentLevel.level}: ${currentLevel.name}`;
            levelInfo.style.color = currentLevel.color;
        }
        
        if (nextLevelInfo && nextLevelIndex < this.levels.length) {
            nextLevelInfo.textContent = `→ Nivel ${nextLevel.level}`;
        }
        
        if (levelFill && nextLevelIndex < this.levels.length) {
            const currentLevelPoints = this.progressData.totalPoints - currentLevel.minPoints;
            const pointsNeeded = nextLevel.minPoints - currentLevel.minPoints;
            const percentage = (currentLevelPoints / pointsNeeded) * 100;
            levelFill.style.width = percentage + '%';
            levelFill.style.background = currentLevel.color;
        }
        
        if (pointsInfo) {
            pointsInfo.textContent = `${this.progressData.totalPoints} puntos`;
        }
    },

    // Sistema de racha
    checkStreak() {
        const today = new Date().toDateString();
        const lastStudy = this.progressData.lastStudyDate;
        
        if (!lastStudy) {
            this.progressData.streakDays = 1;
            this.progressData.lastStudyDate = today;
        } else {
            const lastDate = new Date(lastStudy);
            const todayDate = new Date(today);
            const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));
            
            if (diffDays === 0) {
                // Ya estudió hoy
                return;
            } else if (diffDays === 1) {
                // Estudió ayer, continúa la racha
                this.progressData.streakDays++;
                this.progressData.lastStudyDate = today;
            } else {
                // Perdió la racha
                this.progressData.streakDays = 1;
                this.progressData.lastStudyDate = today;
                this.showStreakLostMessage();
            }
        }
        
        this.saveProgress();
    },

    // Seguimiento de tiempo
    startTimeTracking() {
        this.sessionStartTime = Date.now();
        
        // Actualizar cada minuto
        this.timeTrackingInterval = setInterval(() => {
            const minutesStudied = Math.floor((Date.now() - this.sessionStartTime) / 60000);
            if (minutesStudied > 0) {
                this.progressData.studyTime++;
                this.sessionStartTime = Date.now();
                this.saveProgress();
                this.updateStatistics();
            }
        }, 60000); // Cada minuto
    },

    // Sistema de logros
    checkAchievements() {
        const newAchievements = [];
        
        this.achievements.forEach(achievement => {
            if (!this.progressData.achievements.includes(achievement.id)) {
                if (achievement.condition(this.progressData)) {
                    this.progressData.achievements.push(achievement.id);
                    this.progressData.totalPoints += achievement.points;
                    newAchievements.push(achievement);
                }
            }
        });
        
        if (newAchievements.length > 0) {
            this.saveProgress();
            this.updateLevel();
            newAchievements.forEach(achievement => {
                this.showAchievementUnlocked(achievement);
            });
        }
    },

    // Mostrar logro desbloqueado
    showAchievementUnlocked(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-content">
                <div class="achievement-icon">
                    ${faIcon(achievement.icon)}
                </div>
                <div class="achievement-info">
                    <h4>¡Logro Desbloqueado!</h4>
                    <p class="achievement-name">${achievement.name}</p>
                    <p class="achievement-desc">${achievement.description}</p>
                    <p class="achievement-points">+${achievement.points} puntos</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 500);
        }, 5000);
    },

    // Mostrar todos los logros
    displayAchievements() {
        // Esto se puede implementar para mostrar una página de logros
    },

    // Mostrar celebración de completación
    showCompletionCelebration() {
        if (this.celebrationShown) return;
        this.celebrationShown = true;
        
        // Confetti effect
        this.createConfetti();
        
        // Show certificate section
        const certificateSection = document.getElementById('certificateSection');
        if (certificateSection) {
            setTimeout(() => {
                certificateSection.classList.add('show');
                certificateSection.scrollIntoView({ behavior: 'smooth' });
            }, 1000);
        }
    },

    // Crear efecto confetti
    createConfetti() {
        const colors = ['#1E40AF', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'];
        const confettiCount = 100;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }
    },

    // Mostrar mensaje de racha perdida
    showStreakLostMessage() {
        const notification = document.createElement('div');
        notification.className = 'streak-lost-notification';
        notification.innerHTML = `
            ${faIcon('fa-fire-extinguisher')}
            <p>¡Oh no! Perdiste tu racha de estudio. ¡Pero no te desanimes, comienza una nueva hoy!</p>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 500);
        }, 4000);
    },

    // Marcar doctrina como completada (llamado desde doctrine-cards.js)
    markDoctrineCompleted(doctrineId) {
        if (!this.progressData.completedDoctrines.includes(doctrineId)) {
            this.progressData.completedDoctrines.push(doctrineId);
            this.progressData.totalPoints += 20; // Puntos por completar doctrina
            this.saveProgress();
            this.updateUI();
            this.checkAchievements();
            
            // Disparar evento
            window.dispatchEvent(new CustomEvent('doctrineCompleted', {
                detail: { doctrineId }
            }));
        }
    },

    // Registrar puntuación de quiz
    registerQuizScore(score) {
        this.progressData.quizScores.push(score);
        
        // Bonus de puntos según la puntuación
        if (score === 100) {
            this.progressData.totalPoints += 50;
        } else if (score >= 90) {
            this.progressData.totalPoints += 30;
        } else if (score >= 80) {
            this.progressData.totalPoints += 20;
        } else if (score >= 70) {
            this.progressData.totalPoints += 10;
        } else {
            this.progressData.totalPoints += 5;
        }
        
        this.saveProgress();
        this.updateUI();
        this.checkAchievements();
    },

    // Configurar event listeners
    setupEventListeners() {
        // Escuchar cuando se completa una doctrina
        window.addEventListener('markCompleted', (event) => {
            if (event.detail && event.detail.doctrineId) {
                this.markDoctrineCompleted(event.detail.doctrineId);
            }
        });
        
        // Escuchar resultados de quiz
        window.addEventListener('quizCompleted', (event) => {
            if (event.detail && event.detail.score !== undefined) {
                this.registerQuizScore(event.detail.score);
            }
        });
        
        // Guardar progreso antes de cerrar
        window.addEventListener('beforeunload', () => {
            this.saveProgress();
        });
    },

    // Obtener conteo de doctrinas completadas
    getCompletedCount() {
        return this.progressData.completedDoctrines.length;
    },

    // Obtener datos de progreso
    getProgressData() {
        return this.progressData;
    },

    // Reiniciar progreso (con confirmación)
    resetProgress() {
        if (confirm('¿Estás seguro de que quieres reiniciar todo tu progreso? Esta acción no se puede deshacer.')) {
            localStorage.removeItem('doctrineProgress');
            localStorage.removeItem('completedDoctrines');
            localStorage.removeItem('doctrineQuizHistory');
            localStorage.removeItem('userGrowthProfile');
            location.reload();
        }
    },

    // Actualizar progreso manualmente
    updateProgress() {
        this.syncWithDoctrineCards();
        this.syncWithQuizHistory();
        this.saveProgress();
        this.updateUI();
        this.checkAchievements();
    }
};

// Estilos para el sistema de progreso
const progressStyles = `
<style>
.stats-panel {
    position: fixed;
    right: 20px;
    bottom: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    transition: all 0.3s ease;
}

.stats-toggle {
    background: var(--gradient-faith);
    color: white;
    border: none;
    border-radius: 12px;
    padding: 1rem;
    cursor: pointer;
    font-size: 1.5rem;
    transition: all 0.3s ease;
}

.stats-toggle:hover {
    transform: scale(1.1);
}

.stats-panel.expanded .stats-toggle {
    border-radius: 12px 12px 0 0;
}

.stats-content {
    display: none;
    padding: 2rem;
    max-width: 400px;
}

.stats-panel.expanded .stats-content {
    display: block;
}

.stats-content h3 {
    font-family: var(--font-display);
    color: var(--primary-blue);
    margin-bottom: 1.5rem;
    text-align: center;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;
}

.stat-item {
    text-align: center;
    padding: 1rem;
    background: var(--soft-gray);
    border-radius: 8px;
    transition: all 0.3s ease;
}

.stat-item:hover {
    background: var(--soft-blue);
    transform: translateY(-3px);
}

.stat-item i {
    font-size: 1.5rem;
    color: var(--primary-blue);
    display: block;
    margin-bottom: 0.5rem;
}

.stat-value {
    font-family: var(--font-display);
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--text-dark);
    display: block;
}

.stat-label {
    font-size: 0.8rem;
    color: var(--text-medium);
    display: block;
    margin-top: 0.2rem;
}

.level-progress {
    background: var(--soft-gray);
    border-radius: 8px;
    padding: 1rem;
}

.level-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
}

.current-level {
    font-weight: 600;
}

.next-level {
    color: var(--text-medium);
}

.level-bar {
    height: 8px;
    background: var(--soft-blue);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 0.5rem;
}

.level-fill {
    height: 100%;
    transition: width 0.5s ease;
}

.points-info {
    text-align: center;
    font-size: 0.85rem;
    color: var(--text-medium);
}

.achievement-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    padding: 1.5rem;
    max-width: 350px;
    transform: translateX(400px);
    transition: transform 0.5s ease;
    z-index: 3000;
}

.achievement-notification.show {
    transform: translateX(0);
}

.achievement-content {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.achievement-icon {
    font-size: 2.5rem;
    color: var(--golden-yellow);
    animation: bounce 0.5s ease;
}

.achievement-info h4 {
    color: var(--primary-blue);
    margin-bottom: 0.3rem;
}

.achievement-name {
    font-weight: 600;
    color: var(--text-dark);
    margin-bottom: 0.2rem;
}

.achievement-desc {
    font-size: 0.85rem;
    color: var(--text-medium);
    margin-bottom: 0.3rem;
}

.achievement-points {
    color: var(--growth-green);
    font-weight: 600;
}

.streak-lost-notification {
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    background: #FEE2E2;
    color: #DC2626;
    padding: 1rem 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.2);
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: transform 0.3s ease;
    z-index: 2000;
}

.streak-lost-notification.show {
    transform: translateX(-50%) translateY(0);
}

.streak-lost-notification i {
    font-size: 1.5rem;
}

.confetti {
    position: fixed;
    top: -10px;
    width: 10px;
    height: 10px;
    z-index: 4000;
    animation: confetti-fall linear;
}

@keyframes confetti-fall {
    to {
        transform: translateY(100vh) rotate(360deg);
    }
}

@keyframes bounce {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
}

@media (max-width: 768px) {
    .stats-panel {
        right: 10px;
        bottom: 10px;
    }
    
    .stats-content {
        max-width: calc(100vw - 40px);
    }
    
    .stats-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .achievement-notification {
        right: 10px;
        left: 10px;
        max-width: none;
    }
}
</style>
`;

// Agregar estilos al documento
document.head.insertAdjacentHTML('beforeend', progressStyles);

// Hacer disponible globalmente
window.progressTracker = progressTracker;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    progressTracker.init();
});