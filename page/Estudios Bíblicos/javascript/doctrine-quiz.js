// doctrine-quiz.js - Sistema de Examen Bíblico de Doctrina Básica

const doctrineQuiz = {
    // Banco de preguntas por doctrina
    questionBank: {
        1: [ // Autoridad de las Escrituras
            {
                question: "¿Cuál es la fuente de autoridad suprema para la fe cristiana?",
                options: [
                    "La tradición de la iglesia",
                    "La Biblia (Sagradas Escrituras)",
                    "Los líderes religiosos",
                    "La experiencia personal"
                ],
                correct: 1,
                explanation: "La Biblia es la Palabra de Dios inspirada y nuestra autoridad final en asuntos de fe y práctica."
            },
            {
                question: "Según 2 Timoteo 3:16, ¿para qué es útil la Escritura?",
                options: [
                    "Solo para leer historias antiguas",
                    "Para enseñar, redargüir, corregir e instruir en justicia",
                    "Únicamente para los pastores",
                    "Para entretenimiento espiritual"
                ],
                correct: 1,
                explanation: "La Escritura tiene múltiples propósitos prácticos para nuestra vida espiritual."
            },
            {
                question: "¿Quién inspiró las Sagradas Escrituras?",
                options: [
                    "Los profetas por su propia cuenta",
                    "Los apóstoles",
                    "Dios el Espíritu Santo",
                    "Los concilios de la iglesia"
                ],
                correct: 2,
                explanation: "2 Pedro 1:21 nos dice que los hombres hablaron siendo inspirados por el Espíritu Santo."
            }
        ],
        2: [ // La Trinidad
            {
                question: "¿Cuántas personas hay en la Trinidad?",
                options: [
                    "Una",
                    "Dos",
                    "Tres",
                    "Cuatro"
                ],
                correct: 2,
                explanation: "La Trinidad consiste en tres personas distintas: Padre, Hijo y Espíritu Santo."
            },
            {
                question: "¿Cuántos Dioses adoramos los cristianos?",
                options: [
                    "Tres dioses diferentes",
                    "Un solo Dios verdadero",
                    "Varios según la situación",
                    "Dos: el Padre y el Hijo"
                ],
                correct: 1,
                explanation: "Adoramos a un solo Dios que existe en tres personas."
            },
            {
                question: "En Mateo 28:19, ¿en nombre de quién debemos bautizar?",
                options: [
                    "Solo en el nombre de Jesús",
                    "En el nombre de la iglesia",
                    "En el nombre del Padre, del Hijo y del Espíritu Santo",
                    "En el nombre del pastor"
                ],
                correct: 2,
                explanation: "El bautismo se hace en el nombre de las tres personas de la Trinidad."
            }
        ],
        3: [ // Naturaleza de Dios
            {
                question: "Según 1 Juan 4:8, Dios es:",
                options: [
                    "Solo justicia",
                    "Amor",
                    "Solo poder",
                    "Indiferente"
                ],
                correct: 1,
                explanation: "La esencia misma de Dios es amor, aunque también es justo y santo."
            },
            {
                question: "¿Qué significa que Dios es omnipotente?",
                options: [
                    "Que está en todo lugar",
                    "Que todo lo sabe",
                    "Que es todopoderoso",
                    "Que es eterno"
                ],
                correct: 2,
                explanation: "Omnipotente significa que Dios tiene todo el poder y puede hacer todas las cosas."
            },
            {
                question: "¿Cuál de estos NO es un atributo de Dios?",
                options: [
                    "Santo",
                    "Limitado",
                    "Eterno",
                    "Justo"
                ],
                correct: 1,
                explanation: "Dios no tiene limitaciones; Él es infinito en todos Sus atributos."
            }
        ],
        4: [ // El Hombre y el Pecado
            {
                question: "Según Romanos 3:23, ¿cuántos han pecado?",
                options: [
                    "Solo algunos",
                    "La mayoría",
                    "Todos",
                    "Solo los no creyentes"
                ],
                correct: 2,
                explanation: "Todos los seres humanos han pecado y están destituidos de la gloria de Dios."
            },
            {
                question: "¿A imagen de quién fue creado el hombre?",
                options: [
                    "De los ángeles",
                    "De los animales",
                    "De Dios",
                    "De la naturaleza"
                ],
                correct: 2,
                explanation: "Génesis 1:27 dice que Dios creó al hombre a Su imagen."
            },
            {
                question: "¿Cuál es la consecuencia del pecado según Romanos 6:23?",
                options: [
                    "Una vida difícil",
                    "La muerte",
                    "La pobreza",
                    "La enfermedad"
                ],
                correct: 1,
                explanation: "La paga del pecado es muerte, separación eterna de Dios."
            }
        ],
        5: [ // Jesucristo
            {
                question: "Jesús es:",
                options: [
                    "Solo un gran maestro",
                    "Un ángel especial",
                    "Verdadero Dios y verdadero hombre",
                    "Solo un profeta"
                ],
                correct: 2,
                explanation: "Jesús es 100% Dios y 100% hombre, la segunda persona de la Trinidad."
            },
            {
                question: "¿Cuántos pecados cometió Jesús?",
                options: [
                    "Algunos pequeños",
                    "Ninguno",
                    "Solo uno",
                    "Varios pero fue perdonado"
                ],
                correct: 1,
                explanation: "Hebreos 4:15 dice que Jesús fue tentado pero sin pecado."
            },
            {
                question: "Según Juan 14:6, Jesús dijo ser:",
                options: [
                    "Un camino entre muchos",
                    "Una verdad relativa",
                    "El camino, la verdad y la vida",
                    "Una buena opción"
                ],
                correct: 2,
                explanation: "Jesús es el único camino al Padre."
            }
        ],
        6: [ // Salvación
            {
                question: "¿Cómo se obtiene la salvación según Efesios 2:8?",
                options: [
                    "Por hacer buenas obras",
                    "Por gracia mediante la fe",
                    "Por ser una buena persona",
                    "Por asistir a la iglesia"
                ],
                correct: 1,
                explanation: "La salvación es por gracia por medio de la fe, es un regalo de Dios."
            },
            {
                question: "¿Qué debemos hacer para ser salvos según Romanos 10:9?",
                options: [
                    "Solo creer en el corazón",
                    "Solo confesar con la boca",
                    "Confesar con la boca y creer en el corazón que Jesús es el Señor",
                    "Hacer penitencia"
                ],
                correct: 2,
                explanation: "La salvación requiere confesar y creer en Jesús como Señor y Salvador."
            },
            {
                question: "La salvación es:",
                options: [
                    "Algo que podemos perder fácilmente",
                    "Un regalo eterno y seguro de Dios",
                    "Algo que debemos ganar",
                    "Solo para algunas personas"
                ],
                correct: 1,
                explanation: "La salvación es eterna y segura en Cristo Jesús."
            }
        ],
        7: [ // Espíritu Santo
            {
                question: "El Espíritu Santo es:",
                options: [
                    "Una fuerza impersonal",
                    "Un ángel",
                    "La tercera persona de la Trinidad",
                    "Una energía"
                ],
                correct: 2,
                explanation: "El Espíritu Santo es Dios, la tercera persona de la Trinidad."
            },
            {
                question: "¿Cuál es una función del Espíritu Santo según Juan 16:8?",
                options: [
                    "Entretener a los creyentes",
                    "Convencer al mundo de pecado",
                    "Hacer milagros solamente",
                    "Castigar a los pecadores"
                ],
                correct: 1,
                explanation: "El Espíritu Santo convence de pecado, justicia y juicio."
            },
            {
                question: "Según Juan 14:26, el Espíritu Santo:",
                options: [
                    "Solo hace milagros",
                    "Nos enseña y recuerda las palabras de Jesús",
                    "Solo da dones",
                    "No interactúa con nosotros"
                ],
                correct: 1,
                explanation: "El Espíritu Santo es nuestro maestro y consolador."
            }
        ],
        8: [ // La Iglesia
            {
                question: "¿Qué es la Iglesia según las Escrituras?",
                options: [
                    "Un edificio religioso",
                    "El Cuerpo de Cristo, todos los creyentes",
                    "Una organización humana",
                    "Un club social"
                ],
                correct: 1,
                explanation: "La Iglesia es el conjunto de todos los verdaderos creyentes en Cristo."
            },
            {
                question: "¿Quién es la cabeza de la Iglesia?",
                options: [
                    "El pastor principal",
                    "El Papa",
                    "Jesucristo",
                    "Los ancianos"
                ],
                correct: 2,
                explanation: "Cristo es la cabeza de la Iglesia según Colosenses 1:18."
            },
            {
                question: "Según Hechos 2:42, los primeros cristianos perseveraban en:",
                options: [
                    "Solo la oración",
                    "La doctrina, comunión, partimiento del pan y oraciones",
                    "Solo los milagros",
                    "Sus propios intereses"
                ],
                correct: 1,
                explanation: "La iglesia primitiva tenía estas cuatro prácticas fundamentales."
            }
        ],
        9: [ // Vida Cristiana
            {
                question: "Según 2 Pedro 3:18, debemos crecer en:",
                options: [
                    "Riquezas materiales",
                    "Popularidad",
                    "Gracia y conocimiento de Cristo",
                    "Poder político"
                ],
                correct: 2,
                explanation: "El crecimiento espiritual es en gracia y conocimiento de nuestro Señor."
            },
            {
                question: "¿Con qué frecuencia debemos orar según 1 Tesalonicenses 5:17?",
                options: [
                    "Solo los domingos",
                    "Una vez al día",
                    "Sin cesar",
                    "Cuando tengamos problemas"
                ],
                correct: 2,
                explanation: "Debemos mantener una actitud constante de oración."
            },
            {
                question: "Hebreos 10:25 nos exhorta a:",
                options: [
                    "Dejar de congregarnos",
                    "No dejar de congregarnos",
                    "Congregarnos solo en Navidad",
                    "Congregarnos solo cuando queramos"
                ],
                correct: 1,
                explanation: "Es importante la comunión regular con otros creyentes."
            }
        ],
        10: [ // Eventos Futuros
            {
                question: "¿Qué prometió Jesús en Juan 14:3?",
                options: [
                    "Que nunca moriríamos",
                    "Que seríamos ricos",
                    "Que volvería por nosotros",
                    "Que no tendríamos problemas"
                ],
                correct: 2,
                explanation: "Jesús prometió volver para llevarnos con Él."
            },
            {
                question: "Según la Biblia, habrá resurrección de:",
                options: [
                    "Solo los justos",
                    "Solo los injustos",
                    "Justos e injustos",
                    "Nadie resucitará"
                ],
                correct: 2,
                explanation: "Todos resucitarán, unos para vida eterna y otros para condenación."
            },
            {
                question: "El destino eterno de los salvos es:",
                options: [
                    "La reencarnación",
                    "El cielo con Dios",
                    "Dejar de existir",
                    "Vagar como espíritus"
                ],
                correct: 1,
                explanation: "Los salvos pasarán la eternidad con Dios en el cielo."
            }
        ]
    },

    // Estado del quiz
    currentQuiz: {
        questions: [],
        currentQuestion: 0,
        answers: [],
        score: 0,
        mode: 'practice', // 'practice' o 'exam'
        doctrineFilter: null
    },

    // Inicializar el quiz
    init() {
        this.setupQuizModes();
        this.renderQuizInterface();
    },

    // Configurar modos de quiz
    setupQuizModes() {
        const quizContainer = document.getElementById('quizContent');
        if (!quizContainer) return;

        quizContainer.innerHTML = `
            <div class="quiz-mode-selection">
                <h3>Selecciona el modo de evaluación:</h3>
                <div class="quiz-modes">
                    <div class="quiz-mode-card" onclick="doctrineQuiz.startPracticeMode()">
                        ${faIcon('fa-graduation-cap')}
                        <h4>Modo Práctica</h4>
                        <p>Practica con preguntas aleatorias y retroalimentación inmediata</p>
                    </div>
                    <div class="quiz-mode-card" onclick="doctrineQuiz.startExamMode()">
                        ${faIcon('fa-clipboard-check')}
                        <h4>Modo Examen</h4>
                        <p>Evaluación completa de 20 preguntas sin retroalimentación hasta el final</p>
                    </div>
                    <div class="quiz-mode-card" onclick="doctrineQuiz.startFocusMode()">
                        ${faIcon('fa-bullseye')}
                        <h4>Modo Enfocado</h4>
                        <p>Practica preguntas de una doctrina específica</p>
                    </div>
                </div>
            </div>
        `;
    },

    // Modo práctica
    startPracticeMode() {
        this.currentQuiz.mode = 'practice';
        this.currentQuiz.questions = this.generateRandomQuestions(10);
        this.currentQuiz.currentQuestion = 0;
        this.currentQuiz.answers = [];
        this.currentQuiz.score = 0;
        this.renderQuestion();
    },

    // Modo examen
    startExamMode() {
        this.currentQuiz.mode = 'exam';
        this.currentQuiz.questions = this.generateRandomQuestions(20);
        this.currentQuiz.currentQuestion = 0;
        this.currentQuiz.answers = [];
        this.currentQuiz.score = 0;
        this.renderQuestion();
    },

    // Modo enfocado
    startFocusMode() {
        const quizContainer = document.getElementById('quizContent');
        
        const doctrineOptions = Object.keys(this.questionBank).map(key => {
            const doctrine = window.doctrineCards ? 
                window.doctrineCards.doctrines.find(d => d.id === parseInt(key)) : 
                { title: `Doctrina ${key}` };
            
            return `
                <button class="btn btn-secondary doctrine-select-btn" 
                        onclick="doctrineQuiz.selectDoctrine(${key})">
                    ${doctrine.title}
                </button>
            `;
        }).join('');

        quizContainer.innerHTML = `
            <div class="doctrine-selection">
                <h3>Selecciona una doctrina para practicar:</h3>
                <div class="doctrine-buttons">
                    ${doctrineOptions}
                </div>
                <button class="btn btn-secondary" onclick="doctrineQuiz.setupQuizModes()">
                    ${faIcon('fa-arrow-left')} Volver
                </button>
            </div>
        `;
    },

    // Seleccionar doctrina específica
    selectDoctrine(doctrineId) {
        this.currentQuiz.mode = 'practice';
        this.currentQuiz.doctrineFilter = doctrineId;
        this.currentQuiz.questions = this.questionBank[doctrineId];
        this.currentQuiz.currentQuestion = 0;
        this.currentQuiz.answers = [];
        this.currentQuiz.score = 0;
        this.renderQuestion();
    },

    // Generar preguntas aleatorias
    generateRandomQuestions(count) {
        const allQuestions = [];
        
        Object.values(this.questionBank).forEach(doctrineQuestions => {
            allQuestions.push(...doctrineQuestions);
        });

        // Mezclar y seleccionar
        const shuffled = allQuestions.sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
    },

    // Renderizar pregunta actual
    renderQuestion() {
        const quizContainer = document.getElementById('quizContent');
        const question = this.currentQuiz.questions[this.currentQuiz.currentQuestion];
        
        if (!question) {
            this.showResults();
            return;
        }

        const optionsHtml = question.options.map((option, index) => `
            <div class="quiz-option" onclick="doctrineQuiz.selectAnswer(${index})">
                ${option}
            </div>
        `).join('');

        quizContainer.innerHTML = `
            <div class="quiz-question active">
                <div class="quiz-header">
                    <span class="quiz-progress">
                        Pregunta ${this.currentQuiz.currentQuestion + 1} de ${this.currentQuiz.questions.length}
                    </span>
                    <span class="quiz-score">
                        Puntuación: ${this.currentQuiz.score}
                    </span>
                </div>
                <div class="question-text">${question.question}</div>
                <div class="quiz-options" id="quizOptions">
                    ${optionsHtml}
                </div>
                <div class="quiz-feedback" id="quizFeedback"></div>
                <div class="quiz-navigation">
                    <button class="btn btn-secondary" onclick="doctrineQuiz.setupQuizModes()">
                        ${faIcon('fa-times')} Salir
                    </button>
                    <button class="btn btn-primary" id="nextQuestionBtn" style="display: none;" 
                            onclick="doctrineQuiz.nextQuestion()">
                        Siguiente ${faIcon('fa-arrow-right')}
                    </button>
                </div>
            </div>
        `;
    },

    // Seleccionar respuesta
    selectAnswer(optionIndex) {
        const question = this.currentQuiz.questions[this.currentQuiz.currentQuestion];
        const options = document.querySelectorAll('.quiz-option');
        const feedbackDiv = document.getElementById('quizFeedback');
        
        // Deshabilitar todas las opciones
        options.forEach(option => {
            option.style.pointerEvents = 'none';
        });

        // Marcar la opción seleccionada
        options[optionIndex].classList.add('selected');
        
        // Guardar respuesta
        this.currentQuiz.answers.push({
            questionIndex: this.currentQuiz.currentQuestion,
            selectedAnswer: optionIndex,
            correct: optionIndex === question.correct
        });

        if (optionIndex === question.correct) {
            options[optionIndex].classList.add('correct');
            this.currentQuiz.score++;
            
            if (this.currentQuiz.mode === 'practice') {
                feedbackDiv.innerHTML = `
                    <div class="feedback-correct">
                        ${faIcon('fa-check-circle')} ¡Correcto! ${question.explanation}
                    </div>
                `;
            }
        } else {
            options[optionIndex].classList.add('incorrect');
            options[question.correct].classList.add('correct');
            
            if (this.currentQuiz.mode === 'practice') {
                feedbackDiv.innerHTML = `
                    <div class="feedback-incorrect">
                        ${faIcon('fa-times-circle')} Incorrecto. ${question.explanation}
                    </div>
                `;
            }
        }

        // Mostrar botón siguiente
        document.getElementById('nextQuestionBtn').style.display = 'inline-flex';
    },

    // Siguiente pregunta
    nextQuestion() {
        this.currentQuiz.currentQuestion++;
        
        if (this.currentQuiz.currentQuestion < this.currentQuiz.questions.length) {
            this.renderQuestion();
        } else {
            this.showResults();
        }
    },

    // Mostrar resultados
    showResults() {
        const quizContainer = document.getElementById('quizContent');
        const percentage = Math.round((this.currentQuiz.score / this.currentQuiz.questions.length) * 100);
        
        let message, grade, icon;
        
        if (percentage >= 90) {
            message = "¡Excelente! Dominas muy bien las doctrinas básicas.";
            grade = "A+";
            icon = "fa-trophy";
        } else if (percentage >= 80) {
            message = "¡Muy bien! Tienes un buen conocimiento de las doctrinas.";
            grade = "A";
            icon = "fa-star";
        } else if (percentage >= 70) {
            message = "¡Bien! Continúa estudiando para mejorar.";
            grade = "B";
            icon = "fa-thumbs-up";
        } else if (percentage >= 60) {
            message = "Regular. Te recomendamos repasar las doctrinas.";
            grade = "C";
            icon = "fa-book-reader";
        } else {
            message = "Necesitas estudiar más las doctrinas básicas.";
            grade = "D";
            icon = "fa-graduation-cap";
        }

        quizContainer.innerHTML = `
            <div class="quiz-results">
                <div class="results-icon">
                    ${faIcon(icon)}
                </div>
                <h2>Resultados del ${this.currentQuiz.mode === 'exam' ? 'Examen' : 'Quiz'}</h2>
                <div class="results-score">
                    <div class="score-circle">
                        <span class="score-number">${percentage}%</span>
                        <span class="score-grade">${grade}</span>
                    </div>
                </div>
                <p class="results-message">${message}</p>
                <div class="results-stats">
                    <div class="stat-item">
                        ${faIcon('fa-check')}
                        <span>Correctas: ${this.currentQuiz.score}</span>
                    </div>
                    <div class="stat-item">
                        ${faIcon('fa-times')}
                        <span>Incorrectas: ${this.currentQuiz.questions.length - this.currentQuiz.score}</span>
                    </div>
                    <div class="stat-item">
                        ${faIcon('fa-question')}
                        <span>Total: ${this.currentQuiz.questions.length}</span>
                    </div>
                </div>
                <div class="results-actions">
                    <button class="btn btn-primary" onclick="doctrineQuiz.reviewAnswers()">
                        ${faIcon('fa-eye')} Revisar Respuestas
                    </button>
                    <button class="btn btn-secondary" onclick="doctrineQuiz.setupQuizModes()">
                        ${faIcon('fa-redo')} Nuevo Quiz
                    </button>
                </div>
                ${percentage >= 80 ? `
                    <div class="achievement-unlocked">
                        ${faIcon('fa-medal')}
                        <span>¡Logro desbloqueado: Conocedor de Doctrinas!</span>
                    </div>
                ` : ''}
            </div>
        `;

        // Guardar resultados
        this.saveQuizResults(percentage);
    },

    // Revisar respuestas
    reviewAnswers() {
        const quizContainer = document.getElementById('quizContent');
        
        const reviewHtml = this.currentQuiz.questions.map((question, index) => {
            const answer = this.currentQuiz.answers[index];
            const isCorrect = answer && answer.correct;
            
            return `
                <div class="review-item ${isCorrect ? 'review-correct' : 'review-incorrect'}">
                    <div class="review-header">
                        <span class="review-number">Pregunta ${index + 1}</span>
                        <span class="review-status">
                            ${isCorrect ? faIcon('fa-check') + ' Correcta' : faIcon('fa-times') + ' Incorrecta'}
                        </span>
                    </div>
                    <div class="review-question">${question.question}</div>
                    <div class="review-answer">
                        Tu respuesta: ${answer ? question.options[answer.selectedAnswer] : 'Sin responder'}
                    </div>
                    ${!isCorrect ? `
                        <div class="review-correct-answer">
                            Respuesta correcta: ${question.options[question.correct]}
                        </div>
                        <div class="review-explanation">
                            ${faIcon('fa-lightbulb')} ${question.explanation}
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');

        quizContainer.innerHTML = `
            <div class="quiz-review">
                <h2>Revisión de Respuestas</h2>
                <div class="review-list">
                    ${reviewHtml}
                </div>
                <div class="review-actions">
                    <button class="btn btn-primary" onclick="doctrineQuiz.showResults()">
                        ${faIcon('fa-arrow-left')} Volver a Resultados
                    </button>
                </div>
            </div>
        `;
    },

    // Guardar resultados del quiz
    saveQuizResults(percentage) {
        const results = this.getQuizHistory();
        
        results.push({
            date: new Date().toISOString(),
            mode: this.currentQuiz.mode,
            score: this.currentQuiz.score,
            total: this.currentQuiz.questions.length,
            percentage: percentage,
            doctrineFilter: this.currentQuiz.doctrineFilter
        });

        // Mantener solo los últimos 50 resultados
        if (results.length > 50) {
            results.shift();
        }

        localStorage.setItem('doctrineQuizHistory', JSON.stringify(results));
        
        // Actualizar estadísticas
        this.updateStatistics();
    },

    // Obtener historial de quiz
    getQuizHistory() {
        const saved = localStorage.getItem('doctrineQuizHistory');
        return saved ? JSON.parse(saved) : [];
    },

    // Actualizar estadísticas
    updateStatistics() {
        const history = this.getQuizHistory();
        
        if (history.length > 0) {
            const avgScore = history.reduce((acc, result) => acc + result.percentage, 0) / history.length;
            const highScore = Math.max(...history.map(r => r.percentage));
            const totalQuizzes = history.length;
            
            // Guardar estadísticas
            localStorage.setItem('doctrineQuizStats', JSON.stringify({
                avgScore: Math.round(avgScore),
                highScore: highScore,
                totalQuizzes: totalQuizzes,
                lastUpdated: new Date().toISOString()
            }));
        }
    },

    // Renderizar interfaz del quiz
    renderQuizInterface() {
        // Se llama desde init()
    }
};

// Estilos adicionales para el quiz
const quizStyles = `
<style>
.quiz-mode-selection {
    text-align: center;
}

.quiz-modes {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin: 2rem 0;
}

.quiz-mode-card {
    background: var(--soft-gray);
    border-radius: 12px;
    padding: 2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
}

.quiz-mode-card:hover {
    background: var(--soft-blue);
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.quiz-mode-card i {
    font-size: 3rem;
    color: var(--primary-blue);
    margin-bottom: 1rem;
}

.quiz-mode-card h4 {
    color: var(--text-dark);
    margin-bottom: 0.5rem;
}

.quiz-mode-card p {
    color: var(--text-medium);
    font-size: 0.9rem;
}

.quiz-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    font-family: var(--font-ui);
    color: var(--text-medium);
}

.quiz-score {
    color: var(--growth-green);
    font-weight: 600;
}

.quiz-feedback {
    margin: 2rem 0;
}

.feedback-correct,
.feedback-incorrect {
    padding: 1rem;
    border-radius: 8px;
    display: flex;
    align-items: flex-start;
    gap: 1rem;
}

.feedback-correct {
    background: var(--light-green);
    color: var(--growth-green);
}

.feedback-incorrect {
    background: #FEE2E2;
    color: #DC2626;
}

.doctrine-selection {
    text-align: center;
}

.doctrine-buttons {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin: 2rem 0;
}

.doctrine-select-btn {
    padding: 1rem;
    white-space: normal;
    text-align: center;
}

.quiz-results {
    text-align: center;
    padding: 2rem;
}

.results-icon {
    font-size: 4rem;
    color: var(--golden-yellow);
    margin-bottom: 2rem;
}

.results-score {
    margin: 2rem 0;
}

.score-circle {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: var(--gradient-faith);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.score-number {
    font-size: 2.5rem;
    font-weight: 700;
    color: white;
}

.score-grade {
    font-size: 1.5rem;
    color: white;
    opacity: 0.9;
}

.results-stats {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin: 2rem 0;
}

.stat-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.1rem;
}

.results-actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 2rem;
}

.achievement-unlocked {
    background: var(--gradient-warm);
    border-radius: 8px;
    padding: 1rem 2rem;
    margin-top: 2rem;
    display: inline-flex;
    align-items: center;
    gap: 1rem;
    color: var(--primary-blue);
    font-weight: 600;
    animation: bounce 0.5s ease;
}

@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}

.quiz-review {
    max-height: 70vh;
    overflow-y: auto;
}

.review-item {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    border-left: 4px solid transparent;
}

.review-correct {
    border-left-color: var(--growth-green);
}

.review-incorrect {
    border-left-color: #DC2626;
}

.review-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    font-weight: 600;
}

.review-question {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    color: var(--text-dark);
}

.review-answer {
    margin-bottom: 0.5rem;
    color: var(--text-medium);
}

.review-correct-answer {
    color: var(--growth-green);
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.review-explanation {
    background: var(--light-yellow);
    padding: 1rem;
    border-radius: 6px;
    font-size: 0.9rem;
    color: var(--text-dark);
}

.review-actions {
    text-align: center;
    margin-top: 2rem;
}
</style>
`;

// Agregar estilos al documento
document.head.insertAdjacentHTML('beforeend', quizStyles);

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    doctrineQuiz.init();
});