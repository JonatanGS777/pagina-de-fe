// dynamic-guide.js - Sistema de Guías Dinámicas para Nuevos Creyentes

const dynamicGuide = {
    // Perfil del usuario (inicializado completamente)
    userProfile: {
        completedQuestions: [],
        stage: 'beginner',
        startDate: null,
        lastActivity: null,
        currentPath: [],
        preferences: {
            savedQuestions: [],
            preferredTopics: []
        }
    },

    // Banco de preguntas guía por etapa del creyente
    guideQuestions: {
        beginner: [
            {
                question: "¿Qué significa ser un cristiano?",
                answer: "Ser cristiano significa haber aceptado a Jesucristo como tu Salvador personal, creyendo que Él murió por tus pecados y resucitó. Es tener una relación personal con Dios a través de Jesús.",
                verses: ["Juan 3:16", "Romanos 10:9-10"],
                nextSteps: ["Leer el Evangelio de Juan", "Comenzar a orar diariamente", "Buscar una iglesia local"],
                relatedDoctrine: 5,
                priority: 1
            },
            {
                question: "¿Cómo puedo estar seguro de mi salvación?",
                answer: "La seguridad de la salvación viene de confiar en las promesas de Dios en Su Palabra. Si has confesado con tu boca que Jesús es el Señor y creído en tu corazón que Dios lo levantó de los muertos, eres salvo.",
                verses: ["1 Juan 5:13", "Juan 10:28-29", "Efesios 2:8-9"],
                nextSteps: ["Memorizar versículos sobre la seguridad de salvación", "Compartir tu testimonio con alguien"],
                relatedDoctrine: 6,
                priority: 1
            },
            {
                question: "¿Por qué es importante leer la Biblia?",
                answer: "La Biblia es la Palabra de Dios y es nuestro alimento espiritual. A través de ella conocemos a Dios, entendemos Su voluntad, recibimos dirección y crecemos espiritualmente.",
                verses: ["2 Timoteo 3:16-17", "Salmos 119:105", "Mateo 4:4"],
                nextSteps: ["Establecer un tiempo diario de lectura", "Comenzar con el Nuevo Testamento", "Usar un plan de lectura bíblica"],
                relatedDoctrine: 1,
                priority: 1
            },
            {
                question: "¿Cómo debo orar?",
                answer: "La oración es hablar con Dios como hablarías con un padre amoroso. No necesitas palabras especiales, solo un corazón sincero. Puedes alabarle, darle gracias, confesarle tus pecados y pedirle por tus necesidades.",
                verses: ["Mateo 6:9-13", "Filipenses 4:6-7", "1 Tesalonicenses 5:17"],
                nextSteps: ["Dedicar tiempo específico para orar", "Llevar un diario de oración", "Aprender el Padre Nuestro"],
                relatedDoctrine: 9,
                priority: 2
            },
            {
                question: "¿Por qué debo congregarme?",
                answer: "La iglesia es la familia de Dios. Necesitamos la comunión con otros creyentes para crecer, ser animados, servir y adorar juntos a Dios. No fuimos diseñados para vivir la fe cristiana en soledad.",
                verses: ["Hebreos 10:24-25", "Hechos 2:42", "1 Corintios 12:12-27"],
                nextSteps: ["Visitar iglesias locales", "Involucrarse en un grupo pequeño", "Considerar el bautismo"],
                relatedDoctrine: 8,
                priority: 2
            },
            {
                question: "¿Qué pasa después de aceptar a Cristo?",
                answer: "Después de aceptar a Cristo, comienzas una nueva vida. El Espíritu Santo viene a vivir en ti, eres adoptado como hijo de Dios, y comienzas un proceso de crecimiento espiritual llamado santificación.",
                verses: ["2 Corintios 5:17", "Juan 1:12", "Romanos 8:15-16"],
                nextSteps: ["Bautizarte como testimonio público", "Unirte a una iglesia local", "Comenzar a estudiar doctrina básica"],
                relatedDoctrine: 7,
                priority: 1
            },
            {
                question: "¿Cómo puedo conocer la voluntad de Dios?",
                answer: "Conocemos la voluntad de Dios principalmente a través de Su Palabra. También mediante la oración, el consejo de creyentes maduros, y la paz del Espíritu Santo. Dios quiere guiarte en cada decisión.",
                verses: ["Romanos 12:1-2", "Proverbios 3:5-6", "Santiago 1:5"],
                nextSteps: ["Estudiar principios bíblicos para decisiones", "Buscar consejería pastoral", "Desarrollar sensibilidad espiritual"],
                relatedDoctrine: 3,
                priority: 3
            }
        ],
        intermediate: [
            {
                question: "¿Cómo puedo vencer la tentación?",
                answer: "La tentación es común a todos, pero Dios provee una salida. Debes conocer la Palabra, orar, huir de las situaciones tentadoras y buscar la rendición de cuentas con otros creyentes maduros.",
                verses: ["1 Corintios 10:13", "Santiago 4:7", "Efesios 6:10-18"],
                nextSteps: ["Identificar áreas de debilidad", "Memorizar versículos sobre la victoria", "Buscar un mentor espiritual"],
                relatedDoctrine: 4,
                priority: 1
            },
            {
                question: "¿Qué son los dones espirituales?",
                answer: "Los dones espirituales son capacidades especiales que el Espíritu Santo da a cada creyente para edificar la iglesia y servir a otros. Todos tenemos al menos un don que debemos descubrir y usar.",
                verses: ["1 Corintios 12:4-11", "Romanos 12:6-8", "1 Pedro 4:10"],
                nextSteps: ["Hacer un test de dones espirituales", "Servir en diferentes ministerios", "Pedir feedback de otros creyentes"],
                relatedDoctrine: 7,
                priority: 2
            },
            {
                question: "¿Cómo puedo compartir mi fe?",
                answer: "Compartir tu fe comienza con tu testimonio personal de lo que Cristo ha hecho en tu vida. Sé auténtico, muestra amor genuino, y está preparado para explicar la esperanza que hay en ti.",
                verses: ["1 Pedro 3:15", "Mateo 28:19-20", "Hechos 1:8"],
                nextSteps: ["Escribir tu testimonio", "Aprender un método de evangelismo", "Orar por oportunidades"],
                relatedDoctrine: 8,
                priority: 1
            },
            {
                question: "¿Cómo manejar las dudas en la fe?",
                answer: "Las dudas son normales en el camino de fe. No las ignores, sino llévalas a Dios en oración y busca respuestas en Su Palabra. Habla con cristianos maduros y recuerda las obras de Dios en tu vida.",
                verses: ["Marcos 9:24", "Judas 1:22", "Hebreos 11:1"],
                nextSteps: ["Estudiar apologética básica", "Llevar un diario de las obras de Dios", "Unirse a un grupo de estudio"],
                relatedDoctrine: 1,
                priority: 2
            },
            {
                question: "¿Qué significa vivir en el Espíritu?",
                answer: "Vivir en el Espíritu significa dejar que el Espíritu Santo controle tu vida diaria. Es rendirle cada área, obedecer Sus impulsos, y manifestar Su fruto en tu carácter.",
                verses: ["Gálatas 5:16-25", "Romanos 8:5-14", "Efesios 5:18"],
                nextSteps: ["Practicar la rendición diaria", "Identificar el fruto del Espíritu en tu vida", "Aprender a escuchar Su voz"],
                relatedDoctrine: 7,
                priority: 1
            }
        ],
        advanced: [
            {
                question: "¿Cómo puedo profundizar mi vida de oración?",
                answer: "La oración profunda incluye adoración extendida, intercesión por otros, ayuno, meditación en la Palabra y tiempos de silencio para escuchar a Dios. Es desarrollar una conversación continua con Él.",
                verses: ["Mateo 6:6", "Efesios 6:18", "Colosenses 4:2"],
                nextSteps: ["Practicar diferentes tipos de oración", "Hacer retiros de oración", "Estudiar sobre la oración contemplativa"],
                relatedDoctrine: 9,
                priority: 1
            },
            {
                question: "¿Qué significa ser un discípulo que hace discípulos?",
                answer: "Hacer discípulos es reproducir en otros lo que Cristo ha hecho en ti. Es caminar junto a nuevos creyentes, enseñándoles a obedecer todo lo que Jesús mandó, siendo un ejemplo y mentor.",
                verses: ["2 Timoteo 2:2", "Mateo 28:19-20", "1 Corintios 11:1"],
                nextSteps: ["Identificar a alguien para discipular", "Desarrollar un plan de discipulado", "Continuar siendo discipulado"],
                relatedDoctrine: 8,
                priority: 1
            },
            {
                question: "¿Cómo puedo desarrollar una cosmovisión bíblica?",
                answer: "Una cosmovisión bíblica es ver todo aspecto de la vida a través del lente de las Escrituras. Significa aplicar principios bíblicos a cada área: trabajo, familia, sociedad, cultura y decisiones diarias.",
                verses: ["Romanos 12:2", "Colosenses 2:8", "2 Corintios 10:5"],
                nextSteps: ["Estudiar teología sistemática", "Leer autores cristianos sólidos", "Aplicar la Biblia a temas actuales"],
                relatedDoctrine: 1,
                priority: 2
            },
            {
                question: "¿Cómo prepararme para el sufrimiento y las pruebas?",
                answer: "El sufrimiento es parte de la vida cristiana. Debemos prepararnos fortaleciendo nuestra fe, memorizando promesas de Dios, y entendiendo que Él usa las pruebas para nuestro crecimiento y Su gloria.",
                verses: ["1 Pedro 4:12-13", "Santiago 1:2-4", "Romanos 8:28"],
                nextSteps: ["Estudiar la teología del sufrimiento", "Preparar un 'kit espiritual' de emergencia", "Aprender de testimonios de perseverancia"],
                relatedDoctrine: 10,
                priority: 2
            }
        ]
    },

    // Configuración del sistema
    config: {
        maxQuestionsPerSession: 3,
        daysForInactivityCheck: 7,
        stageTransitionThresholds: {
            intermediate: 3, // Doctrinas completadas
            advanced: 7
        }
    },

    // Inicializar el sistema de guías
    init() {
        console.log('Inicializando sistema de guías...');
        try {
            this.loadUserProfile();
            
            // Actualizar barra de progreso al inicializar (con manejo de conflictos)
            setTimeout(() => {
                this.forceBarUpdate();
            }, 100);
            
            this.checkAndShowGuide();
            this.setupPeriodicChecks();
            this.initializeTooltips();
            this.setupProgressListeners();
            
            console.log('Sistema de guías inicializado correctamente');
        } catch (error) {
            console.error('Error al inicializar guías:', error);
            // Mostrar guía básica en caso de error
            this.showWelcomeGuide();
        }
    },

    // Configurar listeners de progreso
    setupProgressListeners() {
        // Escuchar cuando se completa una doctrina
        window.addEventListener('markCompleted', (event) => {
            console.log('Doctrina completada detectada:', event.detail);
            setTimeout(() => {
                this.forceBarUpdate();
            }, 100);
        });
        
        // Escuchar cambios en localStorage (incluso de otros módulos)
        window.addEventListener('storage', (event) => {
            if (['completedDoctrines', 'doctrineProgress', 'doctrineQuizHistory'].includes(event.key)) {
                console.log(`Cambio detectado en ${event.key}`);
                setTimeout(() => {
                    this.forceBarUpdate();
                }, 100);
            }
        });
        
        // Escuchar eventos personalizados de progreso de todos los módulos
        ['doctrineCompleted', 'progressUpdated', 'quizCompleted'].forEach(eventName => {
            window.addEventListener(eventName, () => {
                setTimeout(() => {
                    this.forceBarUpdate();
                }, 100);
            });
        });
        
        // Verificación periódica para prevenir conflictos entre módulos
        setInterval(() => {
            const completedDoctrines = this.getCompletedDoctrines();
            const expectedPercentage = Math.round((completedDoctrines.length / 10) * 100);
            const currentProgressText = document.querySelector('.progress-percentage')?.textContent;
            
            if (currentProgressText && !currentProgressText.startsWith(expectedPercentage + '%')) {
                console.log(`🔧 Conflicto detectado: esperado ${expectedPercentage}%, actual ${currentProgressText}`);
                this.forceBarUpdate();
            }
            
            // También verificar el certificado
            const certificateSection = document.getElementById('certificateSection');
            const shouldShowCert = expectedPercentage >= 100;
            const isShowingCert = certificateSection?.classList.contains('show') || false;
            
            if (shouldShowCert !== isShowingCert) {
                console.log(`🏆 Conflicto en certificado: debería ${shouldShowCert ? 'mostrarse' : 'ocultarse'}`);
                if (shouldShowCert) {
                    certificateSection?.classList.add('show');
                } else {
                    certificateSection?.classList.remove('show');
                }
            }
        }, 5000); // Verificar cada 5 segundos
    },

    // Cargar perfil del usuario
    loadUserProfile() {
        try {
            const saved = localStorage.getItem('userGrowthProfile');
            if (saved) {
                const parsedProfile = JSON.parse(saved);
                this.userProfile = { 
                    ...this.userProfile, 
                    ...parsedProfile,
                    // Asegurar que propiedades críticas existan
                    completedQuestions: parsedProfile.completedQuestions || [],
                    preferences: {
                        savedQuestions: [],
                        preferredTopics: [],
                        ...parsedProfile.preferences
                    }
                };
                console.log('Perfil cargado desde localStorage:', this.userProfile);
            } else {
                // Inicializar nuevo perfil
                this.userProfile.startDate = new Date().toISOString();
                this.userProfile.stage = 'beginner';
                this.userProfile.completedQuestions = [];
                this.saveUserProfile();
                console.log('Nuevo perfil creado:', this.userProfile);
            }
        } catch (error) {
            console.error('Error al cargar perfil:', error);
            // Usar valores por defecto
            this.userProfile.startDate = new Date().toISOString();
            this.userProfile.stage = 'beginner';
            this.userProfile.completedQuestions = [];
        }
    },

    // Guardar perfil del usuario
    saveUserProfile() {
        try {
            this.userProfile.lastActivity = new Date().toISOString();
            localStorage.setItem('userGrowthProfile', JSON.stringify(this.userProfile));
            console.log('Perfil guardado');
        } catch (error) {
            console.error('Error al guardar perfil:', error);
        }
    },

    // Verificar y mostrar guía si es necesario
    checkAndShowGuide() {
        console.log('Verificando qué guía mostrar...');
        
        const guideSection = document.getElementById('guideSection');
        if (!guideSection) {
            console.error('No se encontró la sección de guías');
            return;
        }

        // Forzar visibilidad
        guideSection.style.display = 'block';
        guideSection.classList.remove('hidden');

        try {
            const completedDoctrines = window.progressTracker ? 
                window.progressTracker.getCompletedCount() : 0;
            
            console.log('Doctrinas completadas:', completedDoctrines);
            console.log('Etapa actual:', this.userProfile.stage);
            console.log('Es primera vez:', this.isFirstTimeUser());
            
            // Lógica de decisión para mostrar guías
            if (this.isFirstTimeUser()) {
                console.log('Mostrando guía de bienvenida');
                this.showWelcomeGuide();
            } else if (this.shouldAdvanceStage(completedDoctrines)) {
                console.log('Debe avanzar de etapa');
                this.promptStageAdvancement(this.getNextStage());
            } else if (this.hasUnansweredQuestions()) {
                console.log('Tiene preguntas sin responder');
                this.updateGuideSection();
            } else {
                console.log('Mostrando completación de etapa');
                this.showStageCompletion();
            }
        } catch (error) {
            console.error('Error al verificar guía:', error);
            // En caso de error, mostrar bienvenida
            this.showWelcomeGuide();
        }
    },

    // Verificar si es primera vez
    isFirstTimeUser() {
        return !this.userProfile.completedQuestions || 
               this.userProfile.completedQuestions.length === 0;
    },

    // Verificar si debe avanzar de etapa
    shouldAdvanceStage(completedDoctrines) {
        const thresholds = this.config.stageTransitionThresholds;
        
        if (this.userProfile.stage === 'beginner' && completedDoctrines >= thresholds.intermediate) {
            return true;
        } else if (this.userProfile.stage === 'intermediate' && completedDoctrines >= thresholds.advanced) {
            return true;
        }
        return false;
    },

    // Verificar si hay preguntas sin responder
    hasUnansweredQuestions() {
        const questions = this.guideQuestions[this.userProfile.stage] || [];
        const completedQuestions = this.userProfile.completedQuestions || [];
        return questions.some(q => !completedQuestions.includes(q.question));
    },

    // Mostrar guía de bienvenida
    showWelcomeGuide() {
        console.log('Mostrando guía de bienvenida');
        
        const guideSection = document.getElementById('guideSection');
        if (!guideSection) {
            console.error('No se encontró guideSection');
            return;
        }

        guideSection.classList.remove('hidden');
        guideSection.style.display = 'block';
        
        const guideContent = document.getElementById('guideContent');
        if (!guideContent) {
            console.error('No se encontró guideContent');
            return;
        }

        guideContent.innerHTML = `
            <div class="welcome-guide">
                <div class="guide-card special-welcome">
                    <div class="welcome-animation">
                        <i class="fas fa-praying-hands"></i>
                    </div>
                    <h3>¡Bienvenido a tu viaje de fe!</h3>
                    <p>Nos alegra mucho que hayas decidido crecer en tu conocimiento de Dios. 
                       Este curso te ayudará a establecer bases sólidas para tu vida cristiana.</p>
                    <div class="welcome-features">
                        <div class="feature-item">
                            <i class="fas fa-book-open"></i>
                            <span>10 Doctrinas Fundamentales</span>
                        </div>
                        <div class="feature-item">
                            <i class="fas fa-comments"></i>
                            <span>Guías Personalizadas</span>
                        </div>
                        <div class="feature-item">
                            <i class="fas fa-trophy"></i>
                            <span>Sistema de Logros</span>
                        </div>
                    </div>
                    <div class="guide-actions">
                        <button class="btn btn-primary btn-large" onclick="dynamicGuide.startJourney()">
                            <i class="fas fa-play"></i> Comenzar mi viaje
                        </button>
                        <button class="btn btn-secondary" onclick="dynamicGuide.showAllQuestions()">
                            <i class="fas fa-list"></i> Ver todas las preguntas
                        </button>
                        <button class="btn btn-outline" onclick="dynamicGuide.showResetOptions()">
                            <i class="fas fa-refresh"></i> Reiniciar Progreso
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Scroll suave a la sección después de un momento
        setTimeout(() => {
            guideSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 500);
    },

    // Iniciar el viaje
    startJourney() {
        console.log('Iniciando viaje de fe');
        this.userProfile.currentPath = ['welcome'];
        this.saveUserProfile();
        
        // Mostrar primera pregunta después de un breve delay
        setTimeout(() => {
            this.updateGuideSection();
        }, 500);
    },

    // Mostrar todas las preguntas (función auxiliar)
    showAllQuestions() {
        this.updateGuideSection();
    },

    // Mostrar opciones de reinicio
    showResetOptions() {
        const modal = document.createElement('div');
        modal.className = 'reset-options-modal';
        modal.innerHTML = `
            <div class="reset-content">
                <span class="modal-close" onclick="dynamicGuide.closeResetModal()">&times;</span>
                <h2>Opciones de Reinicio</h2>
                <p>¿Qué te gustaría reiniciar?</p>
                <div class="reset-options">
                    <div class="reset-option" onclick="dynamicGuide.resetGuides()">
                        <i class="fas fa-refresh"></i>
                        <h4>Reset Completo</h4>
                        <p>Reinicia TODO: doctrinas, guías, quizzes, puntos y estadísticas a 0%</p>
                    </div>
                    <div class="reset-option" onclick="dynamicGuide.resetDoctrinesToo()">
                        <i class="fas fa-copy"></i>
                        <h4>Reset Completo (Copia)</h4>
                        <p>Hace exactamente lo mismo que "Reset Completo" (misma función)</p>
                    </div>
                    <div class="reset-option warning" onclick="dynamicGuide.resetEverything()">
                        <i class="fas fa-trash-alt"></i>
                        <h4>Eliminar y Recargar</h4>
                        <p>Elimina todo Y recarga la página para empezar completamente limpio</p>
                    </div>
                </div>
                <div class="reset-actions">
                    <button class="btn btn-secondary" onclick="dynamicGuide.closeResetModal()">
                        Cancelar
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('show'), 10);
    },

    // Reiniciar solo guías
    resetGuides() {
        if (confirm('¿Estás seguro de que quieres reiniciar las guías? Podrás volver a responder todas las preguntas.')) {
            console.log('🔄 Iniciando reset completo de todos los módulos...');
            
            // 1. Limpiar guías del userProfile
            this.userProfile.completedQuestions = [];
            this.userProfile.stage = 'beginner';
            
            // 2. Limpiar TODOS los datos de localStorage de todos los módulos
            const keysToRemove = [
                'completedDoctrines',      // doctrine-cards.js
                'doctrineProgress',        // progress-tracker.js  
                'doctrineQuizHistory',     // doctrine-quiz.js
                'doctrineQuizStats',       // doctrine-quiz.js
                'userGrowthProfile'        // dynamic-guide.js (será recreado)
            ];
            
            keysToRemove.forEach(key => {
                localStorage.removeItem(key);
                console.log(`✅ Limpiado: ${key}`);
            });
            
            // 3. Recrear perfil básico
            this.userProfile.startDate = new Date().toISOString();
            this.saveUserProfile();
            
            // 4. Forzar actualización de barra
            this.forceBarUpdate();
            
            // 5. Reinicializar TODOS los módulos para que lean los datos limpios
            console.log('🔄 Reinicializando módulos...');
            
            if (window.doctrineCards) {
                setTimeout(() => {
                    window.doctrineCards.init();
                    console.log('✅ doctrine-cards reinicializado');
                }, 100);
            }
            
            if (window.progressTracker) {
                setTimeout(() => {
                    // Resetear el progress tracker completamente
                    window.progressTracker.progressData = {
                        completedDoctrines: [],
                        quizScores: [],
                        studyTime: 0,
                        lastStudyDate: null,
                        achievements: [],
                        streakDays: 0,
                        totalPoints: 0,
                        level: 1
                    };
                    window.progressTracker.init();
                    console.log('✅ progress-tracker reinicializado');
                }, 150);
            }
            
            if (window.doctrineQuiz) {
                setTimeout(() => {
                    window.doctrineQuiz.init();
                    console.log('✅ doctrine-quiz reinicializado');
                }, 200);
            }
            
            // 6. Ocultar certificado y panel de estadísticas
            const certificateSection = document.getElementById('certificateSection');
            if (certificateSection) {
                certificateSection.classList.remove('show');
                console.log('✅ Certificado ocultado');
            }
            
            // Cerrar panel de estadísticas si está abierto
            const statsPanel = document.getElementById('statsPanel');
            if (statsPanel) {
                statsPanel.classList.remove('expanded');
            }
            
            // 7. Mostrar resultado
            this.closeResetModal();
            
            setTimeout(() => {
                this.showWelcomeGuide();
                this.showNotification('✅ Sistema completamente reiniciado. ¡Todo en 0%!', 'success');
                console.log('🎉 Reset completo finalizado exitosamente');
            }, 300);
        }
    },

    // Reiniciar guías y doctrinas
    resetDoctrinesToo() {
        if (confirm('¿Estás seguro? Esto reiniciará las guías y marcará todas las doctrinas como no completadas.')) {
            console.log('🔄 Reinicio completo (igual que "Reiniciar Todo")...');
            
            // Usar la misma lógica que resetGuides() para consistencia
            this.userProfile.completedQuestions = [];
            this.userProfile.stage = 'beginner';
            
            // Limpiar TODOS los datos de localStorage de todos los módulos
            const keysToRemove = [
                'completedDoctrines',      // doctrine-cards.js
                'doctrineProgress',        // progress-tracker.js  
                'doctrineQuizHistory',     // doctrine-quiz.js
                'doctrineQuizStats',       // doctrine-quiz.js
                'userGrowthProfile'        // dynamic-guide.js (será recreado)
            ];
            
            keysToRemove.forEach(key => {
                localStorage.removeItem(key);
                console.log(`✅ Limpiado: ${key}`);
            });
            
            // Recrear perfil básico
            this.userProfile.startDate = new Date().toISOString();
            this.saveUserProfile();
            this.closeResetModal();
            
            // Forzar actualización completa con manejo de conflictos
            this.forceBarUpdate();
            
            // Reinicializar todos los módulos
            if (window.doctrineCards) {
                setTimeout(() => {
                    window.doctrineCards.init();
                }, 100);
            }
            
            if (window.progressTracker) {
                setTimeout(() => {
                    window.progressTracker.progressData = {
                        completedDoctrines: [],
                        quizScores: [],
                        studyTime: 0,
                        lastStudyDate: null,
                        achievements: [],
                        streakDays: 0,
                        totalPoints: 0,
                        level: 1
                    };
                    window.progressTracker.init();
                }, 150);
            }
            
            // Ocultar certificado y cerrar panel
            const certificateSection = document.getElementById('certificateSection');
            if (certificateSection) {
                certificateSection.classList.remove('show');
            }
            
            const statsPanel = document.getElementById('statsPanel');
            if (statsPanel) {
                statsPanel.classList.remove('expanded');
            }
            
            setTimeout(() => {
                this.showWelcomeGuide();
                this.showNotification('✅ Sistema completamente reiniciado.', 'success');
            }, 300);
        }
    },

    // Reiniciar todo
    resetEverything() {
        if (confirm('⚠️ ATENCIÓN: Esto eliminará COMPLETAMENTE todo tu progreso. ¿Estás absolutamente seguro?')) {
            if (confirm('¿Realmente quieres eliminar TODOS tus datos de progreso, logros, puntuaciones y certificados?')) {
                console.log('🚨 Ejecutando eliminación total del sistema...');
                
                // Eliminar todos los datos de todos los módulos
                const allKeys = [
                    'userGrowthProfile',      // dynamic-guide.js
                    'completedDoctrines',     // doctrine-cards.js
                    'doctrineProgress',       // progress-tracker.js
                    'doctrineQuizHistory',    // doctrine-quiz.js
                    'doctrineQuizStats'       // doctrine-quiz.js
                ];
                
                allKeys.forEach(key => {
                    localStorage.removeItem(key);
                    console.log(`🗑️ Eliminado completamente: ${key}`);
                });
                
                this.closeResetModal();
                this.showNotification('🔥 Eliminación completa iniciada. La página se recargará.', 'info');
                
                console.log('💥 Eliminación total completada. Recargando página...');
                
                // Recargar la página después de un momento para empezar completamente limpio
                setTimeout(() => {
                    location.reload();
                }, 2000);
            }
        }
    },

    // Cerrar modal de reinicio
    closeResetModal() {
        const modal = document.querySelector('.reset-options-modal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        }
    },

    // Actualizar sección de guía
    updateGuideSection() {
        console.log('Actualizando sección de guías');
        
        const guideContent = document.getElementById('guideContent');
        if (!guideContent) {
            console.error('No se encontró guideContent');
            return;
        }

        const questions = this.getRelevantQuestions();
        console.log('Preguntas relevantes encontradas:', questions.length);
        
        if (questions.length === 0) {
            this.showStageCompletion();
            return;
        }

        const guideSection = document.getElementById('guideSection');
        guideSection.classList.remove('hidden');
        guideSection.style.display = 'block';

        // Agregar navegación de preguntas
        const totalQuestions = this.guideQuestions[this.userProfile.stage]?.length || 0;
        const answeredCount = (this.userProfile.completedQuestions || []).filter(q => 
            this.guideQuestions[this.userProfile.stage]?.some(gq => gq.question === q)
        ).length;

        guideContent.innerHTML = `
            <div class="guide-header">
                <h2 class="guide-title">
                    <i class="fas fa-compass"></i> 
                    Guía para ${this.translateStage(this.userProfile.stage)}
                </h2>
                <div class="guide-progress">
                    <span>${answeredCount} de ${totalQuestions} completadas</span>
                    <div class="mini-progress-bar">
                        <div class="mini-progress-fill" style="width: ${totalQuestions > 0 ? (answeredCount/totalQuestions)*100 : 0}%"></div>
                    </div>
                </div>
            </div>
            <div class="guide-controls">
                <button class="btn btn-outline btn-small" onclick="dynamicGuide.showResetOptions()">
                    <i class="fas fa-refresh"></i> Reiniciar
                </button>
                <button class="btn btn-secondary btn-small" onclick="dynamicGuide.showSavedQuestions()">
                    <i class="fas fa-bookmark"></i> Guardadas (${this.userProfile.preferences?.savedQuestions?.length || 0})
                </button>
            </div>
            ${questions.map((q, index) => this.renderQuestionCard(q, index)).join('')}
        `;

        // Animar entrada de tarjetas
        this.animateCards();
    },

    // Renderizar tarjeta de pregunta
    renderQuestionCard(question, index) {
        const relatedDoctrine = window.doctrineCards ? 
            window.doctrineCards.doctrines.find(d => d.id === question.relatedDoctrine) : null;
        
        return `
            <div class="guide-card fade-in" style="animation-delay: ${index * 0.1}s">
                <div class="guide-card-header">
                    <h3 class="guide-question">
                        <i class="fas fa-question-circle"></i> ${question.question}
                    </h3>
                    ${question.priority === 1 ? '<span class="priority-badge">Importante</span>' : ''}
                </div>
                <div class="guide-answer">
                    <p>${question.answer}</p>
                </div>
                <div class="guide-verses">
                    <strong><i class="fas fa-bible"></i> Versículos clave:</strong>
                    <div class="verse-tags">
                        ${question.verses.map(verse => `
                            <span class="verse-tag" onclick="dynamicGuide.showVerse('${verse}')">
                                ${verse}
                            </span>
                        `).join('')}
                    </div>
                </div>
                <div class="guide-next-steps">
                    <strong><i class="fas fa-shoe-prints"></i> Próximos pasos:</strong>
                    <ul class="steps-list">
                        ${question.nextSteps.map((step, stepIndex) => `
                            <li>
                                <input type="checkbox" id="step-${index}-${stepIndex}" 
                                       onchange="dynamicGuide.toggleStep(this)">
                                <label for="step-${index}-${stepIndex}">${step}</label>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                ${relatedDoctrine ? `
                    <div class="related-doctrine">
                        <i class="fas fa-link"></i>
                        <span>Relacionado con: <strong>${relatedDoctrine.title}</strong></span>
                    </div>
                ` : ''}
                <div class="guide-actions">
                    <button class="btn btn-secondary" onclick="dynamicGuide.markAsRead('${question.question}')">
                        <i class="fas fa-check"></i> Entendido
                    </button>
                    <button class="btn btn-outline" onclick="dynamicGuide.saveForLater('${question.question}')">
                        <i class="fas fa-bookmark"></i> Guardar
                    </button>
                    <button class="btn btn-primary" onclick="dynamicGuide.needMoreHelp('${question.question}')">
                        <i class="fas fa-hands-helping"></i> Necesito ayuda
                    </button>
                </div>
            </div>
        `;
    },

    // Obtener preguntas relevantes
    getRelevantQuestions() {
        const stage = this.userProfile.stage || 'beginner';
        const allQuestions = this.guideQuestions[stage] || [];
        const completedQuestions = this.userProfile.completedQuestions || [];
        
        // Filtrar preguntas no completadas y ordenar por prioridad
        return allQuestions
            .filter(q => !completedQuestions.includes(q.question))
            .sort((a, b) => a.priority - b.priority)
            .slice(0, this.config.maxQuestionsPerSession);
    },

    // Mostrar preguntas guardadas
    showSavedQuestions() {
        const savedQuestions = this.userProfile.preferences?.savedQuestions || [];
        
        if (savedQuestions.length === 0) {
            this.showNotification('No tienes preguntas guardadas aún.', 'info');
            return;
        }

        // Encontrar los objetos de pregunta completos
        const fullQuestions = [];
        Object.values(this.guideQuestions).forEach(stageQuestions => {
            stageQuestions.forEach(q => {
                if (savedQuestions.includes(q.question)) {
                    fullQuestions.push(q);
                }
            });
        });

        const modal = document.createElement('div');
        modal.className = 'saved-questions-modal';
        modal.innerHTML = `
            <div class="saved-content">
                <span class="modal-close" onclick="dynamicGuide.closeSavedModal()">&times;</span>
                <h2>Preguntas Guardadas</h2>
                <div class="saved-questions-list">
                    ${fullQuestions.map((q, index) => `
                        <div class="saved-question-item">
                            <h4>${q.question}</h4>
                            <p>${q.answer}</p>
                            <div class="saved-actions">
                                <button class="btn btn-secondary btn-small" onclick="dynamicGuide.removeSaved('${q.question}')">
                                    <i class="fas fa-trash"></i> Eliminar
                                </button>
                                <button class="btn btn-primary btn-small" onclick="dynamicGuide.studySaved('${q.question}')">
                                    <i class="fas fa-eye"></i> Estudiar
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="saved-modal-actions">
                    <button class="btn btn-outline" onclick="dynamicGuide.clearAllSaved()">
                        <i class="fas fa-trash-alt"></i> Limpiar Todo
                    </button>
                    <button class="btn btn-secondary" onclick="dynamicGuide.closeSavedModal()">
                        Cerrar
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('show'), 10);
    },

    // Cerrar modal de preguntas guardadas
    closeSavedModal() {
        const modal = document.querySelector('.saved-questions-modal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        }
    },

    // Eliminar pregunta guardada
    removeSaved(question) {
        if (!this.userProfile.preferences.savedQuestions) return;
        
        const index = this.userProfile.preferences.savedQuestions.indexOf(question);
        if (index > -1) {
            this.userProfile.preferences.savedQuestions.splice(index, 1);
            this.saveUserProfile();
            this.closeSavedModal();
            this.showNotification('Pregunta eliminada de guardadas.', 'info');
        }
    },

    // Estudiar pregunta guardada
    studySaved(question) {
        this.closeSavedModal();
        // Buscar y mostrar la pregunta específica
        // Implementar navegación a la pregunta específica
        this.showNotification('Navegando a la pregunta...', 'info');
    },

    // Limpiar todas las preguntas guardadas
    clearAllSaved() {
        if (confirm('¿Estás seguro de que quieres eliminar todas las preguntas guardadas?')) {
            this.userProfile.preferences.savedQuestions = [];
            this.saveUserProfile();
            this.closeSavedModal();
            this.showNotification('Todas las preguntas guardadas fueron eliminadas.', 'info');
        }
    },

    // Marcar pregunta como leída
    markAsRead(question) {
        if (!this.userProfile.completedQuestions) {
            this.userProfile.completedQuestions = [];
        }
        
        if (!this.userProfile.completedQuestions.includes(question)) {
            this.userProfile.completedQuestions.push(question);
            this.saveUserProfile();
            
            console.log('Pregunta marcada como leída:', question);
            
            // Actualizar barra de progreso superior (manejo de conflictos)
            this.forceBarUpdate();
            
            // Efecto visual de completado
            this.showCompletionEffect(question);
            
            // Actualizar vista después de animación
            setTimeout(() => {
                this.updateGuideSection();
            }, 1000);
            
            // Mostrar mensaje de ánimo
            this.showEncouragement();
            
            // Verificar logros
            this.checkGuideAchievements();
        }
    },

    // Guardar para después
    saveForLater(question) {
        if (!this.userProfile.preferences) {
            this.userProfile.preferences = {};
        }
        if (!this.userProfile.preferences.savedQuestions) {
            this.userProfile.preferences.savedQuestions = [];
        }
        
        if (!this.userProfile.preferences.savedQuestions.includes(question)) {
            this.userProfile.preferences.savedQuestions.push(question);
            this.saveUserProfile();
            this.showNotification('Pregunta guardada para revisar después', 'info');
        } else {
            this.showNotification('Esta pregunta ya está guardada', 'warning');
        }
    },

    // Toggle paso completado
    toggleStep(checkbox) {
        const isChecked = checkbox.checked;
        if (isChecked) {
            checkbox.parentElement.classList.add('completed');
            this.showMiniEncouragement();
        } else {
            checkbox.parentElement.classList.remove('completed');
        }
    },

    // Mostrar versículo
    showVerse(verse) {
        const verseTexts = {
            'Juan 3:16': 'Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.',
            'Romanos 10:9-10': 'que si confesares con tu boca que Jesús es el Señor, y creyeres en tu corazón que Dios le levantó de los muertos, serás salvo. Porque con el corazón se cree para justicia, pero con la boca se confiesa para salvación.',
            '2 Timoteo 3:16-17': 'Toda la Escritura es inspirada por Dios, y útil para enseñar, para redargüir, para corregir, para instruir en justicia, a fin de que el hombre de Dios sea perfecto, enteramente preparado para toda buena obra.',
            '1 Juan 5:13': 'Estas cosas os he escrito a vosotros que creéis en el nombre del Hijo de Dios, para que sepáis que tenéis vida eterna, y para que creáis en el nombre del Hijo de Dios.',
            'Mateo 6:9-13': 'Vosotros, pues, oraréis así: Padre nuestro que estás en los cielos, santificado sea tu nombre...',
            'Hebreos 10:24-25': 'Y considerémonos unos a otros para estimularnos al amor y a las buenas obras; no dejando de congregarnos, como algunos tienen por costumbre...'
        };

        const modal = document.createElement('div');
        modal.className = 'verse-modal';
        modal.innerHTML = `
            <div class="verse-modal-content">
                <span class="modal-close" onclick="this.parentElement.parentElement.remove()">&times;</span>
                <h3><i class="fas fa-bible"></i> ${verse}</h3>
                <p class="verse-text">
                    <em>"${verseTexts[verse] || 'Texto del versículo no disponible en caché. Búscalo en tu Biblia.'}"</em>
                </p>
                <div class="verse-actions">
                    <button class="btn btn-secondary" onclick="dynamicGuide.copyVerse('${verse}')">
                        <i class="fas fa-copy"></i> Copiar
                    </button>
                    <button class="btn btn-primary" onclick="this.parentElement.parentElement.parentElement.remove()">
                        <i class="fas fa-times"></i> Cerrar
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('show'), 10);
    },

    // Copiar versículo
    copyVerse(verse) {
        navigator.clipboard.writeText(verse).then(() => {
            this.showNotification('Versículo copiado al portapapeles', 'success');
        }).catch(() => {
            this.showNotification('No se pudo copiar el versículo', 'error');
        });
    },

    // Necesita más ayuda
    needMoreHelp(question) {
        const modal = document.createElement('div');
        modal.className = 'guide-help-modal';
        modal.innerHTML = `
            <div class="help-modal-content">
                <span class="modal-close" onclick="dynamicGuide.closeHelpModal()">&times;</span>
                <h2><i class="fas fa-hands-helping"></i> Recursos de Ayuda</h2>
                <p>Para la pregunta: <strong>"${question}"</strong></p>
                <div class="help-tabs">
                    <button class="tab-btn active" onclick="dynamicGuide.showHelpTab('resources')">
                        <i class="fas fa-book"></i> Recursos
                    </button>
                    <button class="tab-btn" onclick="dynamicGuide.showHelpTab('contact')">
                        <i class="fas fa-user-friends"></i> Contacto
                    </button>
                    <button class="tab-btn" onclick="dynamicGuide.showHelpTab('prayer')">
                        <i class="fas fa-pray"></i> Oración
                    </button>
                </div>
                <div class="help-content">
                    <div id="resources-tab" class="tab-content active">
                        <div class="help-resources">
                            <div class="help-resource">
                                <i class="fas fa-user-friends"></i>
                                <h4>Habla con un Mentor</h4>
                                <p>Conecta con un cristiano maduro que pueda guiarte personalmente.</p>
                                <button class="btn btn-secondary">Solicitar Mentor</button>
                            </div>
                            <div class="help-resource">
                                <i class="fas fa-book-open"></i>
                                <h4>Estudios Adicionales</h4>
                                <p>Profundiza en el tema con materiales de estudio específicos.</p>
                                <button class="btn btn-secondary">Ver Materiales</button>
                            </div>
                            <div class="help-resource">
                                <i class="fas fa-users"></i>
                                <h4>Grupo de Estudio</h4>
                                <p>Únete a un grupo pequeño donde puedas hacer preguntas.</p>
                                <button class="btn btn-secondary">Buscar Grupos</button>
                            </div>
                            <div class="help-resource">
                                <i class="fas fa-video"></i>
                                <h4>Videos Explicativos</h4>
                                <p>Mira videos que explican este tema de forma visual.</p>
                                <button class="btn btn-secondary">Ver Videos</button>
                            </div>
                        </div>
                    </div>
                    <div id="contact-tab" class="tab-content">
                        <div class="contact-info">
                            <p>Si necesitas ayuda personalizada, no dudes en contactarnos:</p>
                            <div class="contact-methods">
                                <a href="mailto:yonatanguerrero555@gmail.com" class="contact-method">
                                    <i class="fas fa-envelope"></i>
                                    <span>yonatanguerrero555@gmail.com</span>
                                </a>
                                <a href="tel:+17873456940" class="contact-method">
                                    <i class="fas fa-phone"></i>
                                    <span>+1 787-345-6940</span>
                                </a>
                                <div class="contact-form">
                                    <h4>Envía tu pregunta:</h4>
                                    <textarea placeholder="Escribe tu pregunta aquí..." rows="4" id="helpQuestion"></textarea>
                                    <button class="btn btn-primary" onclick="dynamicGuide.sendHelpRequest()">
                                        <i class="fas fa-paper-plane"></i> Enviar Pregunta
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="prayer-tab" class="tab-content">
                        <div class="prayer-guide">
                            <h3>Guía de Oración</h3>
                            <p>Ora sobre esta pregunta usando esta guía:</p>
                            <ol class="prayer-steps">
                                <li>Agradece a Dios por Su Palabra y Su deseo de enseñarte</li>
                                <li>Pide sabiduría y entendimiento (Santiago 1:5)</li>
                                <li>Pide que el Espíritu Santo te revele la verdad</li>
                                <li>Comprométete a obedecer lo que Dios te muestre</li>
                            </ol>
                            <div class="prayer-example">
                                <h4>Oración sugerida:</h4>
                                <p class="prayer-text">
                                    "Padre celestial, gracias por tu Palabra. Dame entendimiento sobre 
                                    <em>'${question}'</em>. Ilumina mi mente y corazón para comprender 
                                    tu verdad. En el nombre de Jesús, Amén."
                                </p>
                                <button class="btn btn-outline" onclick="dynamicGuide.copyPrayer('${question}')">
                                    <i class="fas fa-copy"></i> Copiar Oración
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('show'), 10);
    },

    // Mostrar tab de ayuda
    showHelpTab(tabName) {
        // Cambiar tabs activos
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        event.target.classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');
    },

    // Enviar solicitud de ayuda
    sendHelpRequest() {
        const question = document.getElementById('helpQuestion').value;
        if (question.trim()) {
            // Simular envío
            this.showNotification('Tu pregunta ha sido enviada. Te responderemos pronto.', 'success');
            document.getElementById('helpQuestion').value = '';
        } else {
            this.showNotification('Por favor escribe tu pregunta.', 'warning');
        }
    },

    // Copiar oración
    copyPrayer(question) {
        const prayer = `Padre celestial, gracias por tu Palabra. Dame entendimiento sobre "${question}". Ilumina mi mente y corazón para comprender tu verdad. En el nombre de Jesús, Amén.`;
        navigator.clipboard.writeText(prayer).then(() => {
            this.showNotification('Oración copiada al portapapeles', 'success');
        });
    },

    // Cerrar modal de ayuda
    closeHelpModal() {
        const modal = document.querySelector('.guide-help-modal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        }
    },

    // Mostrar efecto de completado
    showCompletionEffect(question) {
        const cards = document.querySelectorAll('.guide-card');
        cards.forEach(card => {
            if (card.innerHTML.includes(question)) {
                card.classList.add('completing');
                
                // Crear partículas
                for (let i = 0; i < 10; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'completion-particle';
                    particle.style.left = Math.random() * 100 + '%';
                    particle.style.animationDelay = Math.random() * 0.5 + 's';
                    card.appendChild(particle);
                    
                    // Remover partícula después de la animación
                    setTimeout(() => {
                        if (particle.parentNode) {
                            particle.parentNode.removeChild(particle);
                        }
                    }, 1000);
                }
            }
        });
    },

    // Mostrar mensaje de ánimo
    showEncouragement() {
        const messages = [
            {
                text: "¡Excelente! Cada paso cuenta en tu crecimiento espiritual.",
                icon: "fa-heart",
                color: "#EF4444"
            },
            {
                text: "¡Sigue adelante! Dios se alegra de tu deseo de conocerle más.",
                icon: "fa-smile",
                color: "#F59E0B"
            },
            {
                text: "¡Muy bien! La Palabra de Dios está transformando tu vida.",
                icon: "fa-star",
                color: "#3B82F6"
            },
            {
                text: "¡Continúa así! Estás construyendo un fundamento sólido.",
                icon: "fa-thumbs-up",
                color: "#10B981"
            },
            {
                text: "¡Gloria a Dios! Tu fe está creciendo día a día.",
                icon: "fa-cross",
                color: "#8B5CF6"
            }
        ];

        const message = messages[Math.floor(Math.random() * messages.length)];
        
        const notification = document.createElement('div');
        notification.className = 'guide-encouragement';
        notification.innerHTML = `
            <i class="fas ${message.icon}" style="color: ${message.color}"></i>
            <span>${message.text}</span>
        `;

        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    },

    // Mini mensaje de ánimo
    showMiniEncouragement() {
        const miniMessages = ["¡Bien!", "¡Genial!", "¡Sigue así!", "¡Excelente!", "¡Muy bien!"];
        const message = miniMessages[Math.floor(Math.random() * miniMessages.length)];
        
        const mini = document.createElement('div');
        mini.className = 'mini-encouragement';
        mini.textContent = message;
        mini.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: linear-gradient(135deg, #1E40AF 0%, #3B82F6 50%, #10B981 100%);
            color: white;
            padding: 0.8rem 1.5rem;
            border-radius: 50px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
            font-weight: 600;
            z-index: 1000;
            transition: transform 0.5s ease;
        `;
        
        document.body.appendChild(mini);
        
        setTimeout(() => {
            mini.style.transform = 'translateX(-50%) translateY(0)';
        }, 10);
        
        setTimeout(() => {
            mini.style.transform = 'translateX(-50%) translateY(-100px)';
            setTimeout(() => mini.remove(), 300);
        }, 2000);
    },

    // Mostrar completación de etapa
    showStageCompletion() {
        const guideContent = document.getElementById('guideContent');
        const nextStage = this.getNextStage();
        
        const completionMessages = {
            beginner: "Has establecido las bases de tu fe.",
            intermediate: "Has profundizado en tu caminar con Cristo.",
            advanced: "Has alcanzado madurez en tu conocimiento bíblico."
        };
        
        guideContent.innerHTML = `
            <div class="stage-completion">
                <div class="completion-animation">
                    <div class="completion-icon">
                        <i class="fas fa-trophy"></i>
                    </div>
                    <div class="completion-stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                </div>
                <h2>¡Felicitaciones!</h2>
                <p class="completion-message">
                    ${completionMessages[this.userProfile.stage]}
                </p>
                <p>Has completado todas las guías de la etapa <strong>${this.translateStage(this.userProfile.stage)}</strong>.</p>
                
                ${nextStage ? `
                    <div class="next-stage-preview">
                        <h3>Próxima Etapa: ${this.translateStage(nextStage)}</h3>
                        <p>Nuevos temas te esperan para continuar creciendo.</p>
                    </div>
                    <button class="btn btn-primary btn-large" onclick="dynamicGuide.advanceStage()">
                        <i class="fas fa-arrow-right"></i> Avanzar a ${this.translateStage(nextStage)}
                    </button>
                ` : `
                    <div class="course-completed">
                        <p>¡Has completado todo el programa de guías!</p>
                        <p>Tu fundamento en la fe está bien establecido.</p>
                        <div class="completion-actions">
                            <a href="../doctrina-intermedia.html" class="btn btn-primary">
                                <i class="fas fa-graduation-cap"></i> Doctrina Intermedia
                            </a>
                            <button class="btn btn-secondary" onclick="dynamicGuide.viewCertificate()">
                                <i class="fas fa-certificate"></i> Ver Certificado
                            </button>
                        </div>
                    </div>
                `}
                
                <div class="stage-stats">
                    <h4>Tus Estadísticas:</h4>
                    <div class="stats-grid">
                        <div class="stat">
                            <i class="fas fa-check-circle"></i>
                            <span class="stat-number">${this.userProfile.completedQuestions?.length || 0}</span>
                            <span class="stat-label">Preguntas Completadas</span>
                        </div>
                        <div class="stat">
                            <i class="fas fa-calendar-alt"></i>
                            <span class="stat-number">${this.calculateDaysInJourney()}</span>
                            <span class="stat-label">Días de Estudio</span>
                        </div>
                    </div>
                </div>
                
                <div class="completion-options">
                    <button class="btn btn-outline" onclick="dynamicGuide.reviewQuestions()">
                        <i class="fas fa-redo"></i> Revisar Preguntas
                    </button>
                    <button class="btn btn-secondary" onclick="dynamicGuide.showResetOptions()">
                        <i class="fas fa-refresh"></i> Comenzar de Nuevo
                    </button>
                </div>
            </div>
        `;
    },

    // Solicitar avance de etapa
    promptStageAdvancement(newStage) {
        if (this.userProfile.stage === newStage) return;

        const modal = document.createElement('div');
        modal.className = 'stage-advancement-modal';
        modal.innerHTML = `
            <div class="advancement-content">
                <div class="advancement-icon">
                    <i class="fas fa-level-up-alt"></i>
                </div>
                <h2>¡Es hora de avanzar!</h2>
                <p>Has demostrado un excelente progreso en tu etapa actual.</p>
                <div class="advancement-comparison">
                    <div class="current-stage">
                        <h4>Etapa Actual</h4>
                        <p>${this.translateStage(this.userProfile.stage)}</p>
                    </div>
                    <i class="fas fa-arrow-right"></i>
                    <div class="new-stage">
                        <h4>Nueva Etapa</h4>
                        <p>${this.translateStage(newStage)}</p>
                    </div>
                </div>
                <p>La nueva etapa incluye preguntas más profundas y desafiantes.</p>
                <div class="advancement-actions">
                    <button class="btn btn-secondary" onclick="dynamicGuide.closeAdvancementModal()">
                        Más tarde
                    </button>
                    <button class="btn btn-primary" onclick="dynamicGuide.confirmAdvancement('${newStage}')">
                        <i class="fas fa-check"></i> ¡Estoy listo!
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('show'), 10);
    },

    // Confirmar avance
    confirmAdvancement(newStage) {
        this.userProfile.stage = newStage;
        this.userProfile.completedQuestions = []; // Resetear para nueva etapa
        this.saveUserProfile();
        
        this.closeAdvancementModal();
        
        // Animación de celebración
        this.createConfettiEffect();
        
        // Actualizar guías
        setTimeout(() => {
            this.updateGuideSection();
        }, 1000);
        
        // Mostrar notificación
        this.showNotification(`¡Bienvenido a la etapa ${this.translateStage(newStage)}!`, 'success');
    },

    // Cerrar modal de avance
    closeAdvancementModal() {
        const modal = document.querySelector('.stage-advancement-modal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        }
    },

    // Avanzar etapa
    advanceStage() {
        const nextStage = this.getNextStage();
        if (nextStage) {
            this.confirmAdvancement(nextStage);
        }
    },

    // Revisar preguntas
    reviewQuestions() {
        // Resetear algunas preguntas para revisión
        this.userProfile.completedQuestions = [];
        this.saveUserProfile();
        this.updateGuideSection();
        this.showNotification('Ahora puedes revisar todas las preguntas de nuevo.', 'info');
    },

    // Forzar actualización de barra (maneja conflictos entre módulos)
    forceBarUpdate() {
        console.log('🔄 Forzando actualización de barra (resolviendo conflictos)...');
        
        // Obtener elementos de la barra
        const progressFill = document.getElementById('progressFill');
        const progressText = document.querySelector('.progress-percentage');
        
        // Leer datos reales de localStorage
        const completedDoctrines = this.getCompletedDoctrines();
        const percentage = Math.round((completedDoctrines.length / 10) * 100);
        
        // Actualizar directamente (sobreescribir otros módulos)
        if (progressFill) {
            progressFill.style.width = percentage + '%';
            progressFill.style.setProperty('width', percentage + '%', 'important');
            
            // Cambiar color según progreso
            if (percentage === 0) {
                progressFill.style.background = '#DBEAFE'; // Color inicial
            } else if (percentage >= 100) {
                progressFill.style.background = 'var(--gradient-faith)';
            } else if (percentage >= 75) {
                progressFill.style.background = 'linear-gradient(135deg, #10B981 0%, #059669 100%)';
            } else if (percentage >= 50) {
                progressFill.style.background = 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)';
            }
        }
        
        if (progressText) {
            progressText.textContent = percentage + '% Completado';
        }
        
        console.log(`✅ Barra forzada a: ${percentage}% (${completedDoctrines.length}/10 doctrinas)`);
        
        // Manejar certificado basado en progreso real
        const certificateSection = document.getElementById('certificateSection');
        if (certificateSection) {
            if (percentage >= 100) {
                certificateSection.classList.add('show');
                console.log('🏆 Certificado mostrado');
            } else {
                certificateSection.classList.remove('show');
                console.log('📋 Certificado ocultado');
            }
        }
        
        // Verificar después de un momento que no haya sido sobreescrita
        setTimeout(() => {
            const currentWidth = progressFill?.style.width;
            if (currentWidth !== percentage + '%') {
                console.warn('⚠️ Barra fue sobreescrita por otro módulo, corrigiendo...');
                if (progressFill) progressFill.style.width = percentage + '%';
                if (progressText) progressText.textContent = percentage + '% Completado';
            }
        }, 500);
    },

    // Actualizar barra de progreso principal
    updateMainProgressBar() {
        try {
            // Obtener progreso de doctrinas completadas
            const completedDoctrines = this.getCompletedDoctrines();
            const totalDoctrines = 10; // Total de doctrinas
            const percentage = Math.round((completedDoctrines.length / totalDoctrines) * 100);
            
            // Actualizar barra de progreso
            const progressFill = document.getElementById('progressFill');
            const progressPercentage = document.querySelector('.progress-percentage');
            
            if (progressFill) {
                progressFill.style.width = percentage + '%';
                console.log('Barra de progreso actualizada:', percentage + '%', 
                           `(${completedDoctrines.length}/${totalDoctrines} doctrinas)`);
            }
            
            if (progressPercentage) {
                progressPercentage.textContent = percentage + '% Completado';
            }
            
            // Manejar certificado basado en progreso real
            const certificateSection = document.getElementById('certificateSection');
            if (certificateSection) {
                if (percentage >= 100) {
                    certificateSection.classList.add('show');
                } else {
                    certificateSection.classList.remove('show');
                }
            }
            
            // Actualizar tracker de progreso si existe
            if (window.progressTracker) {
                window.progressTracker.updateProgress();
            }
            
            // Disparar evento de actualización de progreso
            window.dispatchEvent(new CustomEvent('progressUpdated', {
                detail: { 
                    completed: completedDoctrines.length,
                    total: totalDoctrines,
                    percentage: percentage
                }
            }));
            
        } catch (error) {
            console.error('Error al actualizar barra de progreso:', error);
        }
    },

    // Obtener doctrinas completadas
    getCompletedDoctrines() {
        try {
            const saved = localStorage.getItem('completedDoctrines');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error al obtener doctrinas completadas:', error);
            return [];
        }
    },

    // Verificar y corregir inconsistencias de datos
    verifyDataConsistency() {
        console.log('🔍 Verificando consistencia entre TODOS los módulos...');
        
        // Obtener datos de todos los módulos
        const completedDoctrines = this.getCompletedDoctrines();
        const userQuestions = this.userProfile.completedQuestions || [];
        const progressData = JSON.parse(localStorage.getItem('doctrineProgress') || '{}');
        const quizHistory = JSON.parse(localStorage.getItem('doctrineQuizHistory') || '[]');
        const quizStats = JSON.parse(localStorage.getItem('doctrineQuizStats') || '{}');
        
        console.log('📊 Estado detallado de todos los módulos:');
        console.log('- Doctrinas completadas (doctrine-cards):', completedDoctrines.length);
        console.log('- Doctrinas en progress-tracker:', progressData.completedDoctrines?.length || 0);
        console.log('- Preguntas de guías completadas:', userQuestions.length);
        console.log('- Etapa del usuario:', this.userProfile.stage);
        console.log('- Quizzes realizados:', quizHistory.length);
        console.log('- Puntos totales:', progressData.totalPoints || 0);
        console.log('- Nivel actual:', progressData.level || 1);
        
        // Detectar inconsistencias específicas
        const inconsistencies = [];
        
        // Inconsistencia entre doctrine-cards y progress-tracker
        const doctrinesTracker = progressData.completedDoctrines?.length || 0;
        if (completedDoctrines.length !== doctrinesTracker) {
            inconsistencies.push(`doctrine-cards: ${completedDoctrines.length} vs progress-tracker: ${doctrinesTracker}`);
        }
        
        // Verificar si hay doctrinas completadas pero no hay progreso de usuario
        if (completedDoctrines.length > 0 && (!this.userProfile.startDate || userQuestions.length === 0)) {
            inconsistencies.push('Hay doctrinas pero no progreso de usuario iniciado');
        }
        
        // Verificar certificado vs progreso real
        const certificateVisible = document.getElementById('certificateSection')?.classList.contains('show');
        const shouldShowCertificate = completedDoctrines.length >= 10;
        if (certificateVisible !== shouldShowCertificate) {
            inconsistencies.push(`Certificado ${certificateVisible ? 'visible' : 'oculto'} pero debería estar ${shouldShowCertificate ? 'visible' : 'oculto'}`);
        }
        
        // Mostrar resultado
        if (inconsistencies.length > 0) {
            console.log('⚠️ INCONSISTENCIAS DETECTADAS:');
            inconsistencies.forEach(inc => console.log(`  - ${inc}`));
        } else {
            console.log('✅ Todos los módulos están consistentes');
        }
        
        return {
            doctrines: completedDoctrines.length,
            questions: userQuestions.length,
            quizzes: quizHistory.length,
            points: progressData.totalPoints || 0,
            level: progressData.level || 1,
            consistent: inconsistencies.length === 0,
            inconsistencies: inconsistencies
        };
    },

    // Forzar actualización de todo el progreso (versión avanzada)
    forceProgressUpdate() {
        console.log('🔄 Forzando actualización completa del sistema...');
        
        // 1. Verificar consistencia primero
        const consistency = this.verifyDataConsistency();
        
        if (!consistency.consistent) {
            console.log('⚠️ Inconsistencias detectadas, corrigiendo automáticamente...');
            
            // Si hay demasiadas inconsistencias, sugerir reset
            if (consistency.inconsistencies.length > 2) {
                console.log('🚨 Muchas inconsistencias detectadas. Considera usar resetearCompleto()');
            }
        }
        
        // 2. Actualizar barra principal con manejo de conflictos
        this.forceBarUpdate();
        
        // 3. Sincronizar con progress tracker
        if (window.progressTracker) {
            setTimeout(() => {
                console.log('🔄 Sincronizando progress-tracker...');
                window.progressTracker.syncWithDoctrineCards();
                window.progressTracker.syncWithQuizHistory();
                window.progressTracker.updateUI();
            }, 100);
        }
        
        // 4. Actualizar tarjetas de doctrina
        if (window.doctrineCards) {
            setTimeout(() => {
                console.log('🔄 Actualizando doctrine-cards...');
                window.doctrineCards.loadCompletedDoctrines();
            }, 150);
        }
        
        // 5. Actualizar quiz si es necesario
        if (window.doctrineQuiz) {
            setTimeout(() => {
                console.log('🔄 Verificando doctrine-quiz...');
                // El quiz generalmente no necesita actualización, pero verificamos
            }, 200);
        }
        
        // 6. Verificación final después de todas las actualizaciones
        setTimeout(() => {
            const finalCheck = this.verifyDataConsistency();
            if (finalCheck.consistent) {
                console.log('✅ Sistema completamente sincronizado');
            } else {
                console.log('⚠️ Aún hay inconsistencias después de la actualización');
                console.log('💡 Tip: Ejecuta resetearCompleto() si persisten los problemas');
            }
        }, 500);
    },
    getNextStage() {
        const stages = ['beginner', 'intermediate', 'advanced'];
        const currentIndex = stages.indexOf(this.userProfile.stage);
        return currentIndex < stages.length - 1 ? stages[currentIndex + 1] : null;
    },

    // Traducir etapa
    translateStage(stage) {
        const translations = {
            'beginner': 'Principiante',
            'intermediate': 'Intermedio',
            'advanced': 'Avanzado'
        };
        return translations[stage] || stage;
    },

    // Calcular días en el viaje
    calculateDaysInJourney() {
        if (!this.userProfile.startDate) return 0;
        
        const start = new Date(this.userProfile.startDate);
        const now = new Date();
        const diffTime = Math.abs(now - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return diffDays;
    },

    // Ver certificado
    viewCertificate() {
        // Integración con el sistema de certificados
        const certificateSection = document.getElementById('certificateSection');
        if (certificateSection) {
            certificateSection.classList.add('show');
            certificateSection.scrollIntoView({ behavior: 'smooth' });
        }
    },

    // Configurar verificaciones periódicas
    setupPeriodicChecks() {
        console.log('Configurando verificaciones periódicas');
        
        // Verificar cada vez que se completa una doctrina
        window.addEventListener('doctrineCompleted', () => {
            this.checkAndShowGuide();
        });

        // Verificar al cargar la página
        window.addEventListener('load', () => {
            this.checkForReturningUser();
        });

        // Verificar cambios en el almacenamiento local
        window.addEventListener('storage', (e) => {
            if (e.key === 'doctrineProgress' || e.key === 'completedDoctrines') {
                this.checkAndShowGuide();
            }
        });
    },

    // Verificar usuario que regresa
    checkForReturningUser() {
        if (!this.userProfile.lastActivity) return;

        const lastActivity = new Date(this.userProfile.lastActivity);
        const now = new Date();
        const daysSinceLastActivity = Math.floor((now - lastActivity) / (1000 * 60 * 60 * 24));

        if (daysSinceLastActivity > this.config.daysForInactivityCheck) {
            this.showWelcomeBackMessage(daysSinceLastActivity);
        }
    },

    // Mostrar mensaje de bienvenida de regreso
    showWelcomeBackMessage(daysAway) {
        const notification = document.createElement('div');
        notification.className = 'welcome-back-notification';
        notification.innerHTML = `
            <div class="welcome-back-content">
                <i class="fas fa-smile"></i>
                <h3>¡Qué bueno verte de nuevo!</h3>
                <p>Has estado ausente por ${daysAway} días. Tu progreso te está esperando.</p>
                <div class="welcome-back-stats">
                    <div class="stat-item">
                        <i class="fas fa-book"></i>
                        <span>${this.userProfile.completedQuestions?.length || 0} preguntas completadas</span>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-layer-group"></i>
                        <span>Etapa: ${this.translateStage(this.userProfile.stage)}</span>
                    </div>
                </div>
                <button class="btn btn-primary" onclick="dynamicGuide.continueJourney()">
                    <i class="fas fa-play"></i> Continuar donde lo dejé
                </button>
            </div>
        `;

        document.body.appendChild(notification);
        setTimeout(() => notification.classList.add('show'), 500);
    },

    // Continuar viaje
    continueJourney() {
        const notification = document.querySelector('.welcome-back-notification');
        if (notification) {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }

        this.updateGuideSection();
        const guideSection = document.getElementById('guideSection');
        if (guideSection) {
            guideSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    },

    // Animar tarjetas
    animateCards() {
        const cards = document.querySelectorAll('.guide-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 150);
        });
    },

    // Inicializar tooltips
    initializeTooltips() {
        // Implementar tooltips para elementos interactivos
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', this.showTooltip);
            element.addEventListener('mouseleave', this.hideTooltip);
        });
    },

    // Mostrar tooltip
    showTooltip(event) {
        const text = event.target.getAttribute('data-tooltip');
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;
        document.body.appendChild(tooltip);
        
        const rect = event.target.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    },

    // Ocultar tooltip
    hideTooltip() {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) tooltip.remove();
    },

    // Crear efecto confetti
    createConfettiEffect() {
        const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'guide-confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 2 + 's';
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 3000);
        }
    },

    // Verificar logros de guías
    checkGuideAchievements() {
        const completedCount = this.userProfile.completedQuestions?.length || 0;
        
        // Logros específicos de guías
        if (completedCount === 1) {
            this.unlockAchievement('first_guide_question', 'Primera Pregunta Respondida');
        } else if (completedCount === 5) {
            this.unlockAchievement('guide_explorer', 'Explorador de Guías');
        } else if (completedCount === 10) {
            this.unlockAchievement('guide_master', 'Maestro de Guías');
        }
    },

    // Desbloquear logro
    unlockAchievement(id, name) {
        // Integración con el sistema de logros principal
        if (window.progressTracker) {
            window.progressTracker.checkAchievements();
        }
        
        this.showAchievementNotification(name);
    },

    // Mostrar notificación de logro
    showAchievementNotification(achievementName) {
        const notification = document.createElement('div');
        notification.className = 'guide-achievement';
        notification.innerHTML = `
            <i class="fas fa-trophy"></i>
            <span>¡Logro desbloqueado: ${achievementName}!</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    },

    // Mostrar notificación general
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `guide-notification notification-${type}`;
        
        const bgColors = {
            'info': '#3B82F6',
            'success': '#10B981',
            'warning': '#F59E0B',
            'error': '#EF4444'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            background: ${bgColors[type] || bgColors.info};
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            gap: 1rem;
            transform: translateX(100%);
            transition: transform 0.5s ease;
            z-index: 1000;
            max-width: 300px;
        `;
        
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'warning' ? 'fa-exclamation-triangle' : type === 'error' ? 'fa-times-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
};

// Función global para diagnosticar el estado
window.diagnosticarProgreso = function() {
    console.log('🔍 === DIAGNÓSTICO COMPLETO DEL PROGRESO ===');
    
    if (window.dynamicGuide) {
        const result = window.dynamicGuide.verifyDataConsistency();
        console.log('✅ Verificación completada:', result);
    } else {
        console.log('❌ dynamicGuide no está cargado');
    }
    
    // Mostrar todos los datos de localStorage de todos los módulos
    console.log('\n📦 Datos en localStorage:');
    const allKeys = [
        'completedDoctrines',    // doctrine-cards.js
        'doctrineProgress',      // progress-tracker.js
        'doctrineQuizHistory',   // doctrine-quiz.js  
        'doctrineQuizStats',     // doctrine-quiz.js
        'userGrowthProfile'      // dynamic-guide.js
    ];
    
    allKeys.forEach(key => {
        const value = localStorage.getItem(key);
        if (value) {
            try {
                const parsed = JSON.parse(value);
                console.log(`- ${key}:`, parsed);
                
                // Mostrar detalles importantes
                if (key === 'completedDoctrines') {
                    console.log(`  └─ ${parsed.length}/10 doctrinas completadas`);
                } else if (key === 'doctrineProgress' && parsed.completedDoctrines) {
                    console.log(`  └─ Tracker: ${parsed.completedDoctrines.length} doctrinas, ${parsed.totalPoints || 0} puntos, nivel ${parsed.level || 1}`);
                } else if (key === 'doctrineQuizHistory') {
                    console.log(`  └─ ${parsed.length} quizzes realizados`);
                } else if (key === 'userGrowthProfile' && parsed.completedQuestions) {
                    console.log(`  └─ ${parsed.completedQuestions.length} preguntas de guías, etapa: ${parsed.stage}`);
                }
            } catch {
                console.log(`- ${key}:`, value);
            }
        } else {
            console.log(`- ${key}: (vacío) ✅`);
        }
    });
    
    // Estado de la barra de progreso
    const progressFill = document.getElementById('progressFill');
    const progressText = document.querySelector('.progress-percentage');
    console.log('\n📊 Estado de la barra:');
    console.log('- Ancho:', progressFill?.style.width || 'no definido');
    console.log('- Texto:', progressText?.textContent || 'no definido');
    
    // Estado del certificado
    const certificate = document.getElementById('certificateSection');
    console.log('\n🏆 Estado del certificado:');
    console.log('- Visible:', certificate?.classList.contains('show') ? 'SÍ' : 'NO');
    
    // Estado del panel de estadísticas
    const statsPanel = document.getElementById('statsPanel');
    console.log('\n📈 Panel de estadísticas:');
    console.log('- Abierto:', statsPanel?.classList.contains('expanded') ? 'SÍ' : 'NO');
    
    // Verificar inconsistencias
    console.log('\n⚠️ Verificación de Inconsistencias:');
    const doctrinesMain = JSON.parse(localStorage.getItem('completedDoctrines') || '[]').length;
    const progressData = JSON.parse(localStorage.getItem('doctrineProgress') || '{}');
    const doctrinesTracker = progressData.completedDoctrines?.length || 0;
    
    if (doctrinesMain !== doctrinesTracker) {
        console.log(`❌ INCONSISTENCIA: doctrine-cards dice ${doctrinesMain}, progress-tracker dice ${doctrinesTracker}`);
    } else {
        console.log(`✅ Consistencia: ${doctrinesMain} doctrinas en ambos módulos`);
    }
};

// Función de reseteo completo (para emergencias)
window.resetearCompleto = function() {
    console.log('🚨 Ejecutando reseteo de emergencia...');
    
    // Limpiar TODOS los datos de TODOS los módulos
    const allKeys = [
        'completedDoctrines', 'doctrineProgress', 'userGrowthProfile', 
        'doctrineQuizHistory', 'doctrineQuizStats'
    ];
    
    allKeys.forEach(key => {
        localStorage.removeItem(key);
        console.log(`🗑️ Eliminado: ${key}`);
    });
    
    // Resetear barra manualmente
    const progressFill = document.getElementById('progressFill');
    const progressText = document.querySelector('.progress-percentage');
    if (progressFill) {
        progressFill.style.width = '0%';
        progressFill.style.setProperty('width', '0%', 'important');
        progressFill.style.background = '#DBEAFE';
    }
    if (progressText) progressText.textContent = '0% Completado';
    
    // Ocultar certificado
    const cert = document.getElementById('certificateSection');
    if (cert) cert.classList.remove('show');
    
    // Cerrar panel de estadísticas
    const statsPanel = document.getElementById('statsPanel');
    if (statsPanel) statsPanel.classList.remove('expanded');
    
    // Reinicializar todos los módulos
    setTimeout(() => {
        if (window.dynamicGuide) window.dynamicGuide.init();
        if (window.progressTracker) window.progressTracker.init();
        if (window.doctrineCards) window.doctrineCards.init();
        if (window.doctrineQuiz) window.doctrineQuiz.init();
        console.log('🔄 Todos los módulos reinicializados');
    }, 100);
    
    console.log('✅ Reset de emergencia completado - Todo en 0%');
};

// Funciones de utilidad global para el progreso
window.updateProgress = function() {
    console.log('🔄 Actualizando progreso desde función global (avanzado)...');
    if (window.dynamicGuide) {
        window.dynamicGuide.forceProgressUpdate();
    }
};

window.refreshProgressBar = function() {
    console.log('🔄 Refrescando barra de progreso (manejo inteligente de conflictos)...');
    if (window.dynamicGuide) {
        window.dynamicGuide.forceBarUpdate();
        
        // También reinicializar módulos si están en estado inconsistente
        setTimeout(() => {
            const completedMain = JSON.parse(localStorage.getItem('completedDoctrines') || '[]');
            const progressData = JSON.parse(localStorage.getItem('doctrineProgress') || '{}');
            const completedTracker = progressData.completedDoctrines || [];
            
            // Si hay inconsistencia entre módulos, corregir
            if (completedMain.length !== completedTracker.length) {
                console.log('⚠️ Inconsistencia detectada entre módulos, corrigiendo...');
                
                if (window.progressTracker) {
                    window.progressTracker.syncWithDoctrineCards();
                    window.progressTracker.updateUI();
                }
                
                window.dynamicGuide.forceBarUpdate();
            }
        }, 200);
    }
};

// Función de reseteo completo (para emergencias)
window.resetearCompleto = function() {
    console.log('🚨 Ejecutando reseteo de emergencia...');
    
    // Limpiar TODOS los datos
    ['completedDoctrines', 'doctrineProgress', 'userGrowthProfile', 
     'doctrineQuizHistory', 'doctrineQuizStats'].forEach(key => {
        localStorage.removeItem(key);
    });
    
    // Resetear barra manualmente
    const progressFill = document.getElementById('progressFill');
    const progressText = document.querySelector('.progress-percentage');
    if (progressFill) {
        progressFill.style.width = '0%';
        progressFill.style.setProperty('width', '0%', 'important');
    }
    if (progressText) progressText.textContent = '0% Completado';
    
    // Ocultar certificado
    const cert = document.getElementById('certificateSection');
    if (cert) cert.classList.remove('show');
    
    // Reinicializar módulos
    setTimeout(() => {
        if (window.dynamicGuide) window.dynamicGuide.init();
        if (window.progressTracker) window.progressTracker.init();
        if (window.doctrineCards) window.doctrineCards.init();
    }, 100);
    
    console.log('✅ Reset de emergencia completado');
};

// Funciones de prueba para debugging
window.testGuideSimple = function() {
    console.log('Test básico del sistema de guías');
    const guideContent = document.getElementById('guideContent');
    if (guideContent) {
        guideContent.innerHTML = `
            <div class="guide-card">
                <h3>Prueba Básica</h3>
                <p>El sistema de guías está funcionando correctamente.</p>
                <button class="btn btn-primary" onclick="dynamicGuide.showWelcomeGuide()">
                    Mostrar Bienvenida
                </button>
            </div>
        `;
        console.log('Contenido de prueba mostrado');
    } else {
        console.error('No se encontró guideContent');
    }
};

window.testGuide = function() {
    console.log('Ejecutando test de guías...');
    if (window.dynamicGuide) {
        window.dynamicGuide.showWelcomeGuide();
    } else {
        console.error('dynamicGuide no está disponible');
    }
};

window.initGuides = function() {
    console.log('Inicializando guías manualmente...');
    if (window.dynamicGuide) {
        window.dynamicGuide.init();
    } else {
        console.error('dynamicGuide no está disponible');
    }
};

// Estilos completos para el sistema de guías (agregados a los existentes)
const additionalGuideStyles = `
<style>
/* Estilos adicionales que faltaban */
.btn-small {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
}

.guide-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
}

.reset-options-modal,
.saved-questions-modal {
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

.reset-options-modal.show,
.saved-questions-modal.show {
    opacity: 1;
}

.reset-content,
.saved-content {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    max-width: 700px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    position: relative;
    transform: scale(0.9);
    transition: transform 0.3s ease;
}

.reset-options-modal.show .reset-content,
.saved-questions-modal.show .saved-content {
    transform: scale(1);
}

.reset-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
}

.reset-option {
    background: var(--soft-gray);
    border-radius: 12px;
    padding: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
    border: 2px solid transparent;
}

.reset-option:hover {
    background: var(--soft-blue);
    transform: translateY(-3px);
    border-color: var(--primary-blue);
}

.reset-option.warning {
    background: #FEF3C7;
    border-color: #F59E0B;
}

.reset-option.warning:hover {
    background: #FCD34D;
    border-color: #D97706;
}

.reset-option i {
    font-size: 2rem;
    color: var(--primary-blue);
    margin-bottom: 1rem;
}

.reset-option.warning i {
    color: #D97706;
}

.saved-questions-list {
    max-height: 400px;
    overflow-y: auto;
    margin: 2rem 0;
}

.saved-question-item {
    background: var(--soft-gray);
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    border-left: 4px solid var(--primary-blue);
}

.saved-question-item h4 {
    color: var(--primary-blue);
    margin-bottom: 0.5rem;
}

.saved-actions {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
    flex-wrap: wrap;
}

.verse-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
    justify-content: center;
}

.tooltip {
    position: absolute;
    background: var(--text-dark);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-size: 0.8rem;
    z-index: 3000;
    pointer-events: none;
}

.completion-stars i {
    animation: starAppear 0.5s ease forwards;
    opacity: 0;
}

.completion-stars i:nth-child(1) { animation-delay: 0.2s; }
.completion-stars i:nth-child(2) { animation-delay: 0.4s; }
.completion-stars i:nth-child(3) { animation-delay: 0.6s; }

@keyframes starAppear {
    to { 
        opacity: 1; 
        transform: scale(1.2) rotate(360deg); 
    }
}

.completion-options {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 2rem;
    flex-wrap: wrap;
}

.welcome-back-notification {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    z-index: 2000;
    opacity: 0;
    transition: opacity 0.3s ease;
    max-width: 500px;
    width: 90%;
}

.welcome-back-notification.show {
    opacity: 1;
}

.welcome-back-content {
    text-align: center;
}

.welcome-back-content i {
    font-size: 3rem;
    color: var(--warm-yellow);
    margin-bottom: 1rem;
}

.welcome-back-stats {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin: 2rem 0;
    padding: 1rem;
    background: var(--soft-gray);
    border-radius: 8px;
}

.guide-confetti {
    position: fixed;
    top: -10px;
    width: 10px;
    height: 10px;
    z-index: 4000;
    animation: confettiFall 3s linear forwards;
}

@keyframes confettiFall {
    to {
        transform: translateY(100vh) rotate(720deg);
    }
}

/* Responsive adicional */
@media (max-width: 768px) {
    .guide-controls {
        justify-content: center;
        text-align: center;
    }
    
    .reset-options {
        grid-template-columns: 1fr;
    }
    
    .saved-actions {
        justify-content: center;
    }
    
    .verse-actions {
        flex-direction: column;
    }
    
    .completion-options {
        flex-direction: column;
        align-items: center;
    }
    
    .welcome-back-stats {
        flex-direction: column;
        gap: 1rem;
    }
}
</style>
`;

// Agregar estilos adicionales al documento
document.head.insertAdjacentHTML('beforeend', additionalGuideStyles);

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM listo, inicializando dynamic guide...');
    
    // Dar tiempo para que otros scripts se carguen
    setTimeout(() => {
        try {
            dynamicGuide.init();
            
            // Hacer accesible globalmente
            window.dynamicGuide = dynamicGuide;
            
            console.log('Dynamic guide inicializado y disponible globalmente');
        } catch (error) {
            console.error('Error al inicializar dynamic guide:', error);
        }
    }, 500);
});

// También inicializar en window.load como respaldo
window.addEventListener('load', () => {
    console.log('Window loaded, verificando guías...');
    
    setTimeout(() => {
        if (window.dynamicGuide) {
            if (!document.querySelector('.guide-card')) {
                console.log('Guías no visibles, reinicializando...');
                window.dynamicGuide.init();
            }
            
            // Siempre actualizar la barra de progreso al cargar (con manejo de conflictos)
            console.log('Actualizando barra de progreso al cargar página...');
            window.dynamicGuide.forceBarUpdate();
        }
    }, 1000);
    
    // Verificación adicional después de 3 segundos
    setTimeout(() => {
        if (window.dynamicGuide) {
            window.dynamicGuide.forceBarUpdate();
            console.log('Verificación final de barra de progreso completada');
        }
    }, 3000);
});