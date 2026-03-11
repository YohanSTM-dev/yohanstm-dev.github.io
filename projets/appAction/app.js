const dataFiles = {
  roles: 'data/roles.json',
  contrats: 'data/contrats.json',
  magasins: 'data/magasins.json',
  couleurs: 'data/couleurs-taches.json',
  taches: 'data/taches.json',
  employes: 'data/employes.json',
  employeRole: 'data/employe_role.json',
  plannings: 'data/plannings.json',
  tachePlanning: 'data/tache_planning.json',
  messages: 'data/messages.json',
  produits: 'data/produits.json',
  emplacements: 'data/emplacements.json',
  stock: 'data/stock.json',
  demandes: 'data/demandes-reapro.json'
};

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const formatDate = (value) => {
  if (!value) return '';
  const date = new Date(`${value}T00:00:00`);
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short'
  });
};

const formatRange = (start, end) => {
  if (start === end) return formatDate(start);
  return `${formatDate(start)} - ${formatDate(end)}`;
};

const loadJson = async (path) => {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Chargement impossible: ${path}`);
  }
  return response.json();
};

const init = async () => {
  try {
    const [
      roles,
      contrats,
      magasins,
      couleurs,
      taches,
      employes,
      employeRole,
      plannings,
      tachePlanning,
      messages,
      produits,
      emplacements,
      stock,
      demandes
    ] = await Promise.all(Object.values(dataFiles).map(loadJson));

    const rolesById = new Map(roles.map((r) => [r.id, r]));
    const contratsById = new Map(contrats.map((c) => [c.id, c]));
    const magasinsById = new Map(magasins.map((m) => [m.id, m]));
    const couleursById = new Map(couleurs.map((c) => [c.id, c]));
    const tachesById = new Map(taches.map((t) => [t.id, t]));
    const produitsById = new Map(produits.map((p) => [p.id, p]));
    const emplacementsById = new Map(emplacements.map((e) => [e.id, e]));

    const rolesByEmploye = new Map();
    employeRole.forEach((entry) => {
      const list = rolesByEmploye.get(entry.employe_id) || [];
      const role = rolesById.get(entry.role_id);
      if (role) list.push(role.nomRole);
      rolesByEmploye.set(entry.employe_id, list);
    });

    const tachesByPlanning = new Map();
    tachePlanning.forEach((entry) => {
      const list = tachesByPlanning.get(entry.planning_id) || [];
      const task = tachesById.get(entry.tache_id);
      if (task) list.push(task.nomTache);
      tachesByPlanning.set(entry.planning_id, list);
    });

    const lowStock = stock.filter((item) => {
      const produit = produitsById.get(item.produit_id);
      if (!produit) return false;
      return item.quantite <= Number(produit.seuilAlerteStock || 0);
    });

    const pendingReapro = demandes.filter((d) => d.statut === 'en_attente');

    document.getElementById('metricEmployees').textContent = employes.length;
    document.getElementById('metricStores').textContent = `${magasins.length} magasins`;
    document.getElementById('metricTasks').textContent = taches.length;
    document.getElementById('metricPlanning').textContent = `${plannings.filter((p) => p.statut === 'en_cours').length} en cours`;
    document.getElementById('metricStock').textContent = lowStock.length;
    document.getElementById('metricReapro').textContent = pendingReapro.length;

    renderEmployees(employes, rolesByEmploye, magasinsById, contratsById);
    renderPlannings(plannings, employes, tachesByPlanning);
    renderTasks(taches, couleursById);
    renderStock(stock, produitsById, emplacementsById);
    renderDemandes(demandes, produitsById, employes);
    renderMessages(messages, employes);
  } catch (error) {
    console.error(error);
    const shell = document.querySelector('.app-shell');
    if (shell) {
      const alert = document.createElement('div');
      alert.className = 'panel';
      alert.textContent = 'Impossible de charger les donnees JSON.';
      shell.appendChild(alert);
    }
  }
};

const renderEmployees = (employes, rolesByEmploye, magasinsById, contratsById) => {
  const container = document.getElementById('employeesList');
  container.innerHTML = employes
    .map((emp) => {
      const magasin = magasinsById.get(emp.magasin_id);
      const contrat = contratsById.get(emp.type_contrat_id);
      const roles = rolesByEmploye.get(emp.id) || [];
      return `
        <li class="employee-card">
          <div class="employee-name">${escapeHtml(emp.prenomEmploye)} ${escapeHtml(emp.nomEmploye)}</div>
          <div class="employee-meta">Magasin: ${escapeHtml(magasin?.ville || 'N/A')} | Contrat: ${escapeHtml(contrat?.nomTypeContrat || 'N/A')} ${escapeHtml(contrat?.heureContrat || '')}</div>
          <div class="tags">${roles.map((role) => `<span class="tag">${escapeHtml(role)}</span>`).join('')}</div>
        </li>
      `;
    })
    .join('');
};

const renderPlannings = (plannings, employes, tachesByPlanning) => {
  const container = document.getElementById('planningList');
  const employeesById = new Map(employes.map((e) => [e.id, e]));
  container.innerHTML = plannings
    .map((plan) => {
      const emp = employeesById.get(plan.employe_id);
      const tasks = tachesByPlanning.get(plan.id) || [];
      return `
        <div class="plan-card">
          <div class="plan-header">
            <div class="plan-title">${escapeHtml(emp ? `${emp.prenomEmploye} ${emp.nomEmploye}` : 'Employe')}
            </div>
            <span class="badge ${escapeHtml(plan.statut)}">${escapeHtml(plan.statut.replace('_', ' '))}</span>
          </div>
          <div class="plan-meta">${escapeHtml(formatRange(plan.dateDebut, plan.dateFin))} | Taches: ${escapeHtml(tasks.join(', ') || 'Aucune')}</div>
        </div>
      `;
    })
    .join('');
};

const renderTasks = (taches, couleursById) => {
  const container = document.getElementById('tasksList');
  container.innerHTML = taches
    .map((task) => {
      const color = couleursById.get(task.couleur_tache_id)?.couleur || '#1f6feb';
      return `
        <div class="task-card">
          <span class="task-dot" style="background:${escapeHtml(color)}"></span>
          <div>${escapeHtml(task.nomTache)}</div>
        </div>
      `;
    })
    .join('');
};

const renderStock = (stock, produitsById, emplacementsById) => {
  const container = document.getElementById('stockTable');
  const rows = stock
    .map((item) => {
      const produit = produitsById.get(item.produit_id);
      const emplacement = emplacementsById.get(item.emplacement_id);
      const seuil = Number(produit?.seuilAlerteStock || 0);
      const flag = item.quantite <= seuil ? 'low' : 'ok';
      return `
        <tr>
          <td>${escapeHtml(produit?.libelleProduit || 'Produit')}</td>
          <td>${escapeHtml(emplacement?.nomZone || 'Zone')}</td>
          <td>${escapeHtml(item.quantite)}</td>
          <td>${escapeHtml(seuil)}</td>
          <td><span class="stock-flag ${flag}">${flag === 'low' ? 'alerte' : 'ok'}</span></td>
        </tr>
      `;
    })
    .join('');

  container.innerHTML = `
    <table class="stock-table">
      <thead>
        <tr>
          <th>Produit</th>
          <th>Zone</th>
          <th>Stock</th>
          <th>Seuil</th>
          <th>Etat</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
};

const renderDemandes = (demandes, produitsById, employes) => {
  const container = document.getElementById('reaproList');
  const employeesById = new Map(employes.map((e) => [e.id, e]));
  container.innerHTML = demandes
    .map((demande) => {
      const produit = produitsById.get(demande.produit_id);
      const emp = employeesById.get(demande.employe_id);
      return `
        <div class="reapro-card">
          <div class="reapro-header">
            <div>${escapeHtml(produit?.libelleProduit || 'Produit')}</div>
            <span class="priority ${escapeHtml(demande.priorite)}">${escapeHtml(demande.priorite)}</span>
          </div>
          <div class="plan-meta">Demande par ${escapeHtml(emp ? `${emp.prenomEmploye} ${emp.nomEmploye}` : 'Employe')} | ${escapeHtml(formatDate(demande.dateDemande))}</div>
          <div class="plan-meta">Statut: ${escapeHtml(demande.statut)}</div>
        </div>
      `;
    })
    .join('');
};

const renderMessages = (messages, employes) => {
  const container = document.getElementById('messagesList');
  const employeesById = new Map(employes.map((e) => [e.id, e]));
  container.innerHTML = messages
    .map((message) => {
      const emp = employeesById.get(message.employe_id);
      return `
        <div class="message-card">
          <div class="message-meta">
            <span>${escapeHtml(emp ? `${emp.prenomEmploye} ${emp.nomEmploye}` : 'Equipe')}</span>
            <span>${escapeHtml(formatDate(message.dateEnvoi))}</span>
          </div>
          <div>${escapeHtml(message.texteMessagerie)}</div>
          ${message.est_lu ? '' : '<span class="message-unread">Non lu</span>'}
        </div>
      `;
    })
    .join('');
};

init();
