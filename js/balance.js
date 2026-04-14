/* ===== Thomasino Casino - Balance / Spielgeld System ===== */

const Balance = {
  STORAGE_KEY: 'thomasino_balance',
  DEFAULT_BALANCE: 10000,

  get() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored === null) {
      this.set(this.DEFAULT_BALANCE);
      return this.DEFAULT_BALANCE;
    }
    return parseFloat(stored);
  },

  set(amount) {
    localStorage.setItem(this.STORAGE_KEY, amount.toFixed(2));
    this.updateDisplay();
  },

  add(amount) {
    const current = this.get();
    this.set(current + amount);
  },

  subtract(amount) {
    const current = this.get();
    this.set(current - amount);
  },

  canAfford(amount) {
    return this.get() >= amount;
  },

  format(amount) {
    if (amount === undefined) amount = this.get();
    return amount.toLocaleString('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  },

  updateDisplay() {
    const el = document.getElementById('balance-amount');
    if (el) {
      el.textContent = this.format();
    }
  },

  deposit(amount) {
    this.add(amount);
  },

  reset() {
    this.set(this.DEFAULT_BALANCE);
  }
};

// Initialize balance display when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  Balance.updateDisplay();
});
