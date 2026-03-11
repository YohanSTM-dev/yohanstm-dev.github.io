let goalsData = { personal: [], group: [] };
let currentFilter = 'personal';

const goalsList = document.getElementById('goalsList');
const detailDrawer = document.getElementById('goalDetail');
const detailTitle = document.getElementById('detailTitle');
const detailDesc = document.getElementById('detailDesc');
const detailMeta = document.getElementById('detailMeta');
const detailSteps = document.getElementById('detailSteps');
const modal = document.getElementById('goalModal');
const form = document.getElementById('goalForm');

const formatDate = (value) => {
  const date = new Date(`${value}T00:00:00`);
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

const renderGoals = () => {
  const goals = goalsData[currentFilter] || [];
  goalsList.innerHTML = goals
    .map((goal) => `
      <article class="goal-card" data-id="${goal.id}">
        <div class="goal-title">${goal.title}</div>
        <div class="goal-desc">${goal.description}</div>
        <div class="progress-track">
          <div class="progress-bar" style="width: ${Math.round(goal.progress * 100)}%"></div>
        </div>
        <div class="goal-meta">
          <span>${Math.round(goal.progress * 100)}% avance</span>
          <span>${formatDate(goal.due)}</span>
        </div>
      </article>
    `)
    .join('');

  goalsList.querySelectorAll('.goal-card').forEach((card) => {
    card.addEventListener('click', () => {
      const id = Number(card.dataset.id);
      const goal = goals.find((g) => g.id === id);
      if (goal) openDetail(goal);
    });
  });
};

const openDetail = (goal) => {
  detailTitle.textContent = goal.title;
  detailDesc.textContent = goal.description;
  detailMeta.innerHTML = `
    <div><strong>Statut</strong><br>${goal.status}</div>
    <div><strong>Echeance</strong><br>${formatDate(goal.due)}</div>
  `;
  detailSteps.innerHTML = goal.steps
    .map((step) => `<div class="step">${step}</div>`)
    .join('');
  detailDrawer.classList.add('open');
  detailDrawer.setAttribute('aria-hidden', 'false');
};

const closeDetail = () => {
  detailDrawer.classList.remove('open');
  detailDrawer.setAttribute('aria-hidden', 'true');
};

const openModal = () => {
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
};

const closeModal = () => {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
};

const setupFilters = () => {
  document.querySelectorAll('.segmented-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.segmented-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderGoals();
    });
  });
};

const setupActions = () => {
  document.getElementById('newGoalBtn').addEventListener('click', openModal);
  document.getElementById('closeDetail').addEventListener('click', closeDetail);
  document.getElementById('closeModal').addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });
};

const setupForm = () => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const type = data.get('type');
    const goal = {
      id: Date.now(),
      title: String(data.get('title')),
      description: String(data.get('description')),
      progress: 0.05,
      due: String(data.get('due')),
      status: 'en_cours',
      steps: ['Planifier', 'Executer', 'Verifier']
    };
    goalsData[type].unshift(goal);
    form.reset();
    closeModal();
    renderGoals();
  });
};

const renderDate = () => {
  const today = new Date();
  document.getElementById('todayDate').textContent = today.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });
};

const init = async () => {
  const response = await fetch('data/goals.json');
  goalsData = await response.json();
  renderDate();
  setupFilters();
  setupActions();
  setupForm();
  renderGoals();
};

init();
