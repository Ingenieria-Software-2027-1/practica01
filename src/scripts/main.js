const questionBank = [
	{ romanization: "ga", hangul: "가" },
	{ romanization: "na", hangul: "나" },
	{ romanization: "da", hangul: "다" },
	{ romanization: "ra", hangul: "라" },
	{ romanization: "ma", hangul: "마" },
	{ romanization: "ba", hangul: "바" },
	{ romanization: "sa", hangul: "사" },
	{ romanization: "a", hangul: "아" },
	{ romanization: "ja", hangul: "자" },
	{ romanization: "cha", hangul: "차" },
	{ romanization: "ka", hangul: "카" },
	{ romanization: "ta", hangul: "타" },
	{ romanization: "pa", hangul: "파" },
	{ romanization: "ha", hangul: "하" }
];

const rounds = 8;

const state = {
	queue: [],
	current: 0,
	score: 0,
	checked: false
};

const getById = (id) => document.getElementById(id);

const ui = {
	startBtn: getById("start-game-btn"),
	section: getById("game-section"),
	progress: getById("game-progress"),
	romanization: getById("game-romanization"),
	form: getById("game-form"),
	answer: getById("game-answer"),
	feedback: getById("game-feedback"),
	score: getById("game-score"),
	nextBtn: getById("game-next-btn"),
	restartBtn: getById("game-restart-btn")
};

const shuffle = (items) => {
	const copy = [...items];

	for (let i = copy.length - 1; i > 0; i -= 1) {
		const j = Math.floor(Math.random() * (i + 1));
		[copy[i], copy[j]] = [copy[j], copy[i]];
	}

	return copy;
};

const updateProgress = () => {
	ui.progress.innerText = `Pregunta ${Math.min(state.current + 1, state.queue.length)}/${state.queue.length}`;
	ui.score.innerText = `Puntos: ${state.score}`;
};

const showQuestion = () => {
	const question = state.queue[state.current];

	ui.romanization.innerText = question.romanization;
	ui.answer.value = "";
	ui.answer.disabled = false;
	ui.answer.focus();
	ui.feedback.classList.remove("status-correct", "status-wrong");
	ui.feedback.innerText = "Escribe el carácter en hangul y comprueba tu respuesta.";
	ui.nextBtn.classList.add("hidden");
	state.checked = false;

	updateProgress();
};

const finishGame = () => {
	ui.romanization.innerText = "완료!";
	ui.answer.disabled = true;
	ui.nextBtn.classList.add("hidden");
	ui.restartBtn.classList.remove("hidden");
	ui.feedback.classList.remove("status-wrong");
	ui.feedback.classList.add("status-correct");
	ui.feedback.innerText = `Juego terminado. Resultado final: ${state.score}/${state.queue.length}.`;
	ui.progress.innerText = `Pregunta ${state.queue.length}/${state.queue.length}`;
};

const goNext = () => {
	if (!state.checked) {
		return;
	}

	state.current += 1;

	if (state.current >= state.queue.length) {
		finishGame();
		return;
	}

	showQuestion();
};

const checkAnswer = () => {
	if (state.checked) {
		return;
	}

	const question = state.queue[state.current];
	const userAnswer = ui.answer.value.trim();
	const isCorrect = userAnswer === question.hangul;

	state.checked = true;

	if (isCorrect) {
		state.score += 1;
		ui.feedback.classList.remove("status-wrong");
		ui.feedback.classList.add("status-correct");
		ui.feedback.innerText = `Correcto: ${question.romanization} = ${question.hangul}`;
	} else {
		ui.feedback.classList.remove("status-correct");
		ui.feedback.classList.add("status-wrong");
		ui.feedback.innerText = `Casi. ${question.romanization} se escribe ${question.hangul}.`;
	}

	updateProgress();
	ui.nextBtn.classList.remove("hidden");
};

const startGame = () => {
	state.queue = shuffle(questionBank).slice(0, rounds);
	state.current = 0;
	state.score = 0;
	state.checked = false;

	ui.section.classList.remove("hidden");
	ui.restartBtn.classList.add("hidden");
	ui.startBtn.innerText = "Reiniciar partida";

	showQuestion();
};

const loadGame = () => {
	ui.startBtn.addEventListener("click", startGame);

	ui.form.addEventListener("submit", (event) => {
		event.preventDefault();
		checkAnswer();
	});

	ui.nextBtn.addEventListener("click", goNext);
	ui.restartBtn.addEventListener("click", startGame);
};

window.addEventListener("DOMContentLoaded", loadGame);
