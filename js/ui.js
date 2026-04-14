/* ===== Thomasino Casino - UI Helpers ===== */

function openDepositModal() {
  const modal = document.getElementById('deposit-modal');
  if (modal) modal.classList.add('active');
}

function closeDepositModal() {
  const modal = document.getElementById('deposit-modal');
  if (modal) modal.classList.remove('active');
}

function depositAmount(amount) {
  Balance.deposit(amount);
  closeDepositModal();
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
  }
});

// Build the common navbar HTML
function getNavbarHTML() {
  return `
    <nav class="navbar">
      <a href="index.html" class="navbar-brand">
        <span class="logo-icon">🎰</span>
        THOMASINO
      </a>
      <div class="navbar-right">
        <div class="balance-display">
          <span class="coin-icon">💰</span>
          <span id="balance-amount" class="balance-amount">0.00</span>
          <span style="color: var(--text-muted);">€</span>
        </div>
        <button class="btn btn-primary btn-sm" onclick="openDepositModal()">Einzahlen</button>
      </div>
    </nav>
  `;
}

// Build the sidebar HTML
function getSidebarHTML(activePage) {
  const items = [
    { href: 'index.html', icon: '🏠', label: 'Lobby', id: 'lobby' },
    { href: 'games/slots.html', icon: '🎰', label: 'Slots', id: 'slots' },
    { href: 'games/blackjack.html', icon: '🃏', label: 'Blackjack', id: 'blackjack' },
    { href: 'games/roulette.html', icon: '🎡', label: 'Roulette', id: 'roulette' },
    { href: 'games/dice.html', icon: '🎲', label: 'Dice', id: 'dice' },
    { href: 'games/mines.html', icon: '💎', label: 'Mines', id: 'mines' },
  ];

  // Adjust paths if we are in the games/ subdirectory
  const inGames = window.location.pathname.includes('/games/');
  const navItems = items.map(item => {
    let href = item.href;
    if (inGames) {
      href = href.startsWith('games/') ? href.replace('games/', '') : '../' + href;
    }
    const activeClass = activePage === item.id ? ' active' : '';
    return `<li><a href="${href}" class="${activeClass}"><span class="nav-icon">${item.icon}</span>${item.label}</a></li>`;
  }).join('');

  return `
    <aside class="sidebar">
      <div class="sidebar-section-title">Menü</div>
      <ul class="sidebar-nav">
        ${navItems}
      </ul>
    </aside>
  `;
}

// Build deposit modal HTML
function getDepositModalHTML() {
  return `
    <div class="modal-overlay" id="deposit-modal">
      <div class="modal">
        <button class="modal-close" onclick="closeDepositModal()">&times;</button>
        <h2>💰 Spielgeld einzahlen</h2>
        <p style="color: var(--text-secondary); margin-bottom: 16px;">Wähle einen Betrag zum Einzahlen:</p>
        <div class="deposit-amounts">
          <button onclick="depositAmount(1000)">+1.000 €</button>
          <button onclick="depositAmount(5000)">+5.000 €</button>
          <button onclick="depositAmount(10000)">+10.000 €</button>
          <button onclick="depositAmount(50000)">+50.000 €</button>
        </div>
        <button class="btn btn-secondary" style="width:100%; margin-top:12px;" onclick="Balance.reset(); closeDepositModal();">Zurücksetzen (10.000 €)</button>
      </div>
    </div>
  `;
}
