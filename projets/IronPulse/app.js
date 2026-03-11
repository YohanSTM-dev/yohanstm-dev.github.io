const data = {
  profile: {
    name: 'Athlete'
  },
  workouts: [
    { id: 1, name: 'Force bas du corps', date: '2026-03-10', status: 'completed', duration: 52 },
    { id: 2, name: 'Interval training', date: '2026-03-08', status: 'completed', duration: 38 },
    { id: 3, name: 'Endurance', date: '2026-03-06', status: 'completed', duration: 44 },
    { id: 4, name: 'Mobilite', date: '2026-03-05', status: 'completed', duration: 26 }
  ],
  records: [
    { id: 1, exercise: 'Squat', value: 140, unit: 'kg', date: '2026-02-26' },
    { id: 2, exercise: 'Deadlift', value: 165, unit: 'kg', date: '2026-02-20' },
    { id: 3, exercise: 'Bench', value: 92, unit: 'kg', date: '2026-02-15' },
    { id: 4, exercise: 'Run 5K', value: 22, unit: 'min', date: '2026-02-10' }
  ],
  planning: [
    { id: 1, day: 'Lundi', focus: 'Force full body', time: '18:30', status: 'prevu' },
    { id: 2, day: 'Mercredi', focus: 'Sprint + core', time: '19:00', status: 'prevu' },
    { id: 3, day: 'Vendredi', focus: 'Haut du corps', time: '18:00', status: 'prevu' },
    { id: 4, day: 'Samedi', focus: 'Endurance', time: '10:30', status: 'optionnel' }
  ]
};

const formatDate = (value) => {
  const date = new Date(`${value}T00:00:00`);
  return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
};

const renderSummary = () => {
  const today = new Date().toISOString().slice(0, 10);
  const todayWorkouts = data.workouts.filter((w) => w.date === today && w.status === 'completed');
  const minutes = todayWorkouts.reduce((acc, w) => acc + w.duration, 0);
  const summary = document.getElementById('summary');
  summary.innerHTML = `
    <div class="summary-card">
      <div class="summary-value">${todayWorkouts.length}</div>
      <div class="summary-label">Seances</div>
    </div>
    <div class="summary-card">
      <div class="summary-value">${minutes}</div>
      <div class="summary-label">Minutes</div>
    </div>
  `;
};

const renderHeatmap = () => {
  const heatmap = document.getElementById('heatmap');
  const cells = Array.from({ length: 84 }, (_, idx) => (idx % 6 === 0 ? 0 : (idx % 4)));
  heatmap.innerHTML = '';
  cells.forEach((level) => {
    const cell = document.createElement('div');
    cell.className = `heat-cell level-${level}`;
    heatmap.appendChild(cell);
  });
};

const renderRecords = () => {
  const list = document.getElementById('recordsList');
  const full = document.getElementById('recordsFullList');
  const items = data.records.map((record) => `
    <div class="list-item">
      <div>
        <div class="title">${record.exercise}</div>
        <div class="meta">${record.value} ${record.unit.toUpperCase()} | ${formatDate(record.date)}</div>
      </div>
      <span class="pill">PR</span>
    </div>
  `);
  list.innerHTML = items.slice(0, 3).join('');
  full.innerHTML = items.join('');
};

const renderWorkouts = () => {
  const list = document.getElementById('workoutsList');
  list.innerHTML = data.workouts.map((workout) => `
    <div class="list-item">
      <div>
        <div class="title">${workout.name}</div>
        <div class="meta">${formatDate(workout.date)} | ${workout.duration} min</div>
      </div>
      <span class="pill">OK</span>
    </div>
  `).join('');
};

const renderPlanning = () => {
  const list = document.getElementById('planningList');
  list.innerHTML = data.planning.map((item) => `
    <div class="list-item">
      <div>
        <div class="title">${item.day} - ${item.focus}</div>
        <div class="meta">${item.time} | ${item.status}</div>
      </div>
      <span class="pill">${item.status}</span>
    </div>
  `).join('');
};

const renderTodayDate = () => {
  const today = new Date();
  const formatted = today.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });
  document.getElementById('todayDate').textContent = formatted;
};

const setupTabs = () => {
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.tab-panel');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((btn) => btn.classList.remove('active'));
      panels.forEach((panel) => panel.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById(`tab-${tab.dataset.tab}`);
      if (target) target.classList.add('active');
    });
  });
};

renderTodayDate();
renderSummary();
renderHeatmap();
renderRecords();
renderWorkouts();
renderPlanning();
setupTabs();
