const artworks = [
  {
    id: 1,
    image: "images/capet.jpg",
    title: "自画像",
    artist: "マリー＝ガブリエル・カペ",
    country: "フランス"
  },
  {
    id: 2,
    image: "images/schiele_self_portrait.jpg",
    title: "ホオズキの実のある自画像",
    artist: "エゴン・シーレ",
    country: "オーストリア"
  },
  {
    id: 3,
    image: "images/gauguin_yellow_christ.jpg",
    title: "黄色いキリストのある自画像",
    artist: "ポール・ゴーギャン",
    country: "フランス"
  },
  {
    id: 4,
    image: "images/van_gogh_felt_hat.jpg",
    title: "灰色のフェルト帽の自画像",
    artist: "フィンセント・ファン・ゴッホ",
    country: "オランダ"
  },
  {
    id: 5,
    image: "images/yasui_kotaro_self_portrait.jpg",
    title: "自画像",
    artist: "安井曽太郎",
    country: "日本"
  },
  {
    id: 6,
    image: "images/tamara_bugatti.jpg",
    title: "自画像（緑色のブガッティを運転するタマラ）",
    artist: "タマラ・ド・レンピッカ",
    country: "ポーランド"
  },
  {
    id: 7,
    image: "images/miroku_bosatsu.jpg",
    title: "弥勒菩薩像（半跏思惟像）",
    artist: "作者不詳",
    country: "日本"
  },
  {
    id: 8,
    image: "images/buddha_head.jpg",
    title: "仏頭",
    artist: "作者不詳",
    country: "日本"
  },
  {
    id: 9,
    image: "images/ashura.jpg",
    title: "阿修羅像",
    artist: "作者不詳",
    country: "日本"
  },
  {
    id: 10,
    image: "images/todaiji_nandaimon.jpg",
    title: "東大寺南大門",
    artist: "作者不詳",
    country: "日本"
  },
  {
    id: 11,
    image: "images/kongorikishi.jpg",
    title: "金剛力士像",
    artist: "運慶・快慶",
    country: "日本"
  },
  {
    id: 12,
    image: "images/desperate_man.jpg",
    title: "絶望（絶望する男）",
    artist: "ギュスターヴ・クールベ",
    country: "フランス"
  },
  {
    id: 13,
    image: "images/matsuda_masahira_self_portrait.jpg",
    title: "自画像",
    artist: "松田正平",
    country: "日本"
  },
  {
    id: 14,
    image: "images/schiele_striped_shirt.jpg",
    title: "ストライプのシャツを着た自画像",
    artist: "エゴン・シーレ",
    country: "オーストリア"
  },
  {
    id: 15,
    image: "images/migishi_setsuko_self_portrait.jpg",
    title: "自画像",
    artist: "三岸節子",
    country: "日本"
  },
  {
    id: 16,
    image: "images/foujita_self_portrait.jpg",
    title: "自画像",
    artist: "藤田嗣治",
    country: "日本"
  },
  {
    id: 17,
    image: "images/dubuffet_self_portrait_ii.jpg",
    title: "自画像 II",
    artist: "ジャン・デュビュッフェ",
    country: "フランス"
  },
  {
    id: 18,
    image: "images/escher_hand_with_reflecting_sphere.jpg",
    title: "写像球体を持つ手",
    artist: "M.C.エッシャー",
    country: "オランダ"
  }
];

const extraOptions = {
  title: ["ひまわり", "ゲルニカ", "落穂拾い", "叫び", "笛を吹く少年", "民衆を導く自由の女神"],
  artist: ["フィンセント・ファン・ゴッホ", "パブロ・ピカソ", "ジャン＝フランソワ・ミレー", "エドヴァルド・ムンク", "エドゥアール・マネ", "ウジェーヌ・ドラクロワ"],
  country: ["スペイン", "ノルウェー", "ドイツ", "アメリカ", "イギリス", "イタリア"]
};

const screens = {
  start: document.getElementById("start-screen"),
  list: document.getElementById("list-screen"),
  quiz: document.getElementById("quiz-screen"),
  typing: document.getElementById("typing-screen"),
  result: document.getElementById("result-screen")
};

const startButton = document.getElementById("start-button");
const typingStartButtons = document.querySelectorAll(".typing-start-button");
const showListButton = document.getElementById("show-list-button");
const backToStartButton = document.getElementById("back-to-start-button");
const retryButton = document.getElementById("retry-button");
const answerForm = document.getElementById("answer-form");
const typingAnswerForm = document.getElementById("typing-answer-form");
const questionNumber = document.getElementById("question-number");
const scoreProgress = document.getElementById("score-progress");
const artworkImage = document.getElementById("artwork-image");
const imageFallback = document.getElementById("image-fallback");
const typingModeLabel = document.getElementById("typing-mode-label");
const typingQuestionNumber = document.getElementById("typing-question-number");
const typingScoreProgress = document.getElementById("typing-score-progress");
const typingArtworkImage = document.getElementById("typing-artwork-image");
const typingImageFallback = document.getElementById("typing-image-fallback");
const typingAnswerLabel = document.getElementById("typing-answer-label");
const typingAnswerInput = document.getElementById("typing-answer-input");
const warningMessage = document.getElementById("warning-message");
const typingWarningMessage = document.getElementById("typing-warning-message");
const totalScore = document.getElementById("total-score");
const accuracyRate = document.getElementById("accuracy-rate");
const resultList = document.getElementById("result-list");
const answerList = document.getElementById("answer-list");
const artworkList = document.getElementById("artwork-list");
const imageVersion = "20260614-jpeg";

let quizQuestions = [];
let currentIndex = 0;
let answers = [];
let currentQuizType = "choice";
let currentTypingField = "";

const typingModes = {
  artist: {
    label: "人名のみ",
    prompt: "作者名を入力"
  },
  title: {
    label: "タイトルのみ",
    prompt: "作品名を入力"
  },
  country: {
    label: "国名のみ",
    prompt: "国名を入力"
  }
};

function shuffle(items) {
  const copied = [...items];
  for (let i = copied.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }
  return copied;
}

function showScreen(screenName) {
  Object.values(screens).forEach((screen) => screen.classList.remove("is-active"));
  screens[screenName].classList.add("is-active");
}

function getImageSrc(imagePath) {
  const cacheBuster = window.location.protocol.startsWith("http") ? `?v=${imageVersion}` : "";
  return `${imagePath}${cacheBuster}`;
}

function normalizeAnswer(value) {
  return value
    .normalize("NFKC")
    .replace(/\s+/g, "")
    .trim()
    .toLowerCase();
}

function buildOptions(type, correctAnswer) {
  const pool = [
    ...artworks.map((artwork) => artwork[type]),
    ...extraOptions[type]
  ].filter((option) => option !== correctAnswer);

  const wrongOptions = shuffle([...new Set(pool)]).slice(0, 3);
  return shuffle([correctAnswer, ...wrongOptions]);
}

function renderChoices(containerId, name, options) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  options.forEach((option) => {
    const label = document.createElement("label");
    label.className = "choice-label";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = name;
    input.value = option;

    const text = document.createElement("span");
    text.textContent = option;

    label.append(input, text);
    container.append(label);
  });
}

function renderQuestion() {
  const question = quizQuestions[currentIndex];

  warningMessage.textContent = "";
  answerForm.reset();
  questionNumber.textContent = `${currentIndex + 1}`;
  scoreProgress.textContent = `全${quizQuestions.length}問`;
  artworkImage.hidden = false;
  imageFallback.hidden = true;
  artworkImage.alt = `${currentIndex + 1}問目の作品画像`;
  artworkImage.src = getImageSrc(question.image);

  renderChoices("title-options", "title", buildOptions("title", question.title));
  renderChoices("artist-options", "artist", buildOptions("artist", question.artist));
  renderChoices("country-options", "country", buildOptions("country", question.country));
}

function renderTypingQuestion() {
  const question = quizQuestions[currentIndex];
  const mode = typingModes[currentTypingField];

  typingWarningMessage.textContent = "";
  typingAnswerForm.reset();
  typingModeLabel.textContent = mode.label;
  typingAnswerLabel.textContent = mode.prompt;
  typingAnswerInput.placeholder = mode.prompt;
  typingQuestionNumber.textContent = `${currentIndex + 1}`;
  typingScoreProgress.textContent = `全${quizQuestions.length}問`;
  typingArtworkImage.hidden = false;
  typingImageFallback.hidden = true;
  typingArtworkImage.alt = `${currentIndex + 1}問目の作品画像`;
  typingArtworkImage.src = getImageSrc(question.image);
  typingAnswerInput.focus();
}

function renderArtworkList() {
  artworkList.innerHTML = artworks.map((artwork) => {
    return `
      <article class="artwork-card">
        <div class="artwork-thumb">
          <img src="${getImageSrc(artwork.image)}" alt="${artwork.title}" loading="lazy" decoding="async">
        </div>
        <div class="artwork-info">
          <span class="artwork-number">No. ${artwork.id}</span>
          <strong>${artwork.title}</strong>
          <p>
            <span>作者名：${artwork.artist}</span>
            <span>国名：${artwork.country}</span>
          </p>
        </div>
      </article>
    `;
  }).join("");
}

function getSelectedValue(name) {
  const selected = answerForm.querySelector(`input[name="${name}"]:checked`);
  return selected ? selected.value : "";
}

function gradeAnswer(question, selected) {
  return {
    title: selected.title === question.title,
    artist: selected.artist === question.artist,
    country: selected.country === question.country
  };
}

function startQuiz() {
  currentQuizType = "choice";
  currentTypingField = "";
  quizQuestions = shuffle(artworks);
  currentIndex = 0;
  answers = [];
  showScreen("quiz");
  renderQuestion();
}

function startTypingQuiz(field) {
  currentQuizType = "typing";
  currentTypingField = field;
  quizQuestions = shuffle(artworks);
  currentIndex = 0;
  answers = [];
  showScreen("typing");
  renderTypingQuestion();
}

function handleSubmit(event) {
  event.preventDefault();

  const selected = {
    title: getSelectedValue("title"),
    artist: getSelectedValue("artist"),
    country: getSelectedValue("country")
  };

  if (!selected.title || !selected.artist || !selected.country) {
    warningMessage.textContent = "作品名・作者名・国名をすべて選んでください。";
    return;
  }

  const question = quizQuestions[currentIndex];
  answers.push({
    question,
    selected,
    result: gradeAnswer(question, selected)
  });

  currentIndex += 1;
  if (currentIndex < quizQuestions.length) {
    renderQuestion();
  } else {
    renderResult();
  }
}

function handleTypingSubmit(event) {
  event.preventDefault();

  const question = quizQuestions[currentIndex];
  const userAnswer = typingAnswerInput.value.trim();
  const correctAnswer = question[currentTypingField];
  const isCorrect = normalizeAnswer(userAnswer) === normalizeAnswer(correctAnswer);

  if (!userAnswer) {
    typingWarningMessage.textContent = "答えを入力してください。";
    return;
  }

  answers.push({
    question,
    selected: {
      [currentTypingField]: userAnswer
    },
    result: {
      [currentTypingField]: isCorrect
    }
  });

  currentIndex += 1;
  if (currentIndex < quizQuestions.length) {
    renderTypingQuestion();
  } else {
    renderResult();
  }
}

function renderMark(isCorrect) {
  return `<span class="mark ${isCorrect ? "correct" : "wrong"}">${isCorrect ? "正" : "誤"}</span>`;
}

function renderResult() {
  const isTyping = currentQuizType === "typing";
  const maxScore = isTyping ? artworks.length : artworks.length * 3;
  const score = answers.reduce((sum, answer) => sum + Object.values(answer.result).filter(Boolean).length, 0);
  const accuracy = Math.round((score / maxScore) * 100);

  totalScore.textContent = `${score} / ${maxScore}点`;
  accuracyRate.textContent = `${accuracy}%`;

  resultList.innerHTML = answers.map((answer, index) => {
    const { question, selected, result } = answer;
    if (isTyping) {
      const mode = typingModes[currentTypingField];
      return `
        <article class="result-card">
          <strong>問題${index + 1}：${question.title}</strong>
          <p class="result-detail">
            <span>${renderMark(result[currentTypingField])} ${mode.prompt.replace("を入力", "")}：${selected[currentTypingField]}</span>
            <span>正解：${question[currentTypingField]}</span>
          </p>
        </article>
      `;
    }

    return `
      <article class="result-card">
        <strong>問題${index + 1}：${question.title}</strong>
        <p class="result-detail">
          <span>${renderMark(result.title)} 作品名：${selected.title}</span>
          <span>${renderMark(result.artist)} 作者名：${selected.artist}</span>
          <span>${renderMark(result.country)} 国名：${selected.country}</span>
        </p>
      </article>
    `;
  }).join("");

  answerList.innerHTML = quizQuestions.map((question, index) => {
    if (isTyping) {
      const mode = typingModes[currentTypingField];
      return `
        <article class="answer-card">
          <strong>問題${index + 1}</strong>
          <p class="result-detail">
            <span>${mode.prompt.replace("を入力", "")}：${question[currentTypingField]}</span>
          </p>
        </article>
      `;
    }

    return `
      <article class="answer-card">
        <strong>問題${index + 1}</strong>
        <p class="result-detail">
          <span>作品名：${question.title}</span>
          <span>作者名：${question.artist}</span>
          <span>国名：${question.country}</span>
        </p>
      </article>
    `;
  }).join("");

  showScreen("result");
}

artworkImage.addEventListener("error", () => {
  artworkImage.hidden = true;
  imageFallback.hidden = false;
});

typingArtworkImage.addEventListener("error", () => {
  typingArtworkImage.hidden = true;
  typingImageFallback.hidden = false;
});

startButton.addEventListener("click", startQuiz);
typingStartButtons.forEach((button) => {
  button.addEventListener("click", () => startTypingQuiz(button.dataset.field));
});
showListButton.addEventListener("click", () => {
  renderArtworkList();
  showScreen("list");
});
backToStartButton.addEventListener("click", () => showScreen("start"));
retryButton.addEventListener("click", () => {
  if (currentQuizType === "typing") {
    startTypingQuiz(currentTypingField);
  } else {
    startQuiz();
  }
});
answerForm.addEventListener("submit", handleSubmit);
typingAnswerForm.addEventListener("submit", handleTypingSubmit);
