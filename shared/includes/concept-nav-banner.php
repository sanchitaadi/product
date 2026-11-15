<!-- Peachy Plate Client Concept Switcher Bar -->
<div id="peachyConceptSwitcher" class="peachy-switcher-bar">
    <div class="peachy-switcher-inner">
        <div class="peachy-switcher-left">
            <a href="../index.html" class="switcher-brand-badge" title="Return to Portal">
                <span class="switcher-dot"></span>
                <strong>PEACHY PLATE</strong>
                <span class="switcher-tag">Client Preview</span>
            </a>
            <span class="switcher-current-label">Active: <em><?php echo htmlspecialchars($active_concept_name ?? 'Concept View'); ?></em></span>
        </div>
        <div class="peachy-switcher-nav">
            <a href="../concept-a/index.php" class="switcher-link <?php echo (($active_concept_id ?? '') === 'a') ? 'active' : ''; ?>">
                <span>🌸</span> Concept A: Coquette
            </a>
            <a href="../concept-b/index.php" class="switcher-link <?php echo (($active_concept_id ?? '') === 'b') ? 'active' : ''; ?>">
                <span>⚡</span> Concept B: Retro Gen-Z
            </a>
            <a href="../concept-c/index.php" class="switcher-link <?php echo (($active_concept_id ?? '') === 'c') ? 'active' : ''; ?>">
                <span>🍸</span> Concept C: Luxury Cute
            </a>
            <a href="../admin/login.php" class="switcher-link switcher-admin" target="_blank" title="Open Admin CMS">
                <span>🎛️</span> Admin Portal
            </a>
            <button type="button" class="switcher-order-btn" onclick="openPaymentModal()">
                <span>💳</span> Order / Pay (Coming Soon)
            </button>
        </div>
        <button type="button" class="switcher-toggle-btn" onclick="toggleSwitcherBar()" aria-label="Toggle switcher bar">
            <span id="switcherToggleIcon">▲</span>
        </button>
    </div>
</div>

<style>
.peachy-switcher-bar {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99990;
    background: #09090b;
    color: #fafafa;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    font-size: 13px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
    transition: transform 0.3s ease;
}
.peachy-switcher-bar.minimized {
    transform: translateY(-80%);
}
.peachy-switcher-inner {
    max-width: 1400px;
    margin: 0 auto;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
}
.peachy-switcher-left {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
}
.switcher-brand-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    text-decoration: none;
    padding: 5px 12px;
    border-radius: 999px;
    font-weight: 700;
    font-size: 11px;
    letter-spacing: 0.05em;
    border: 1px solid rgba(255, 255, 255, 0.15);
    transition: background 0.2s;
}
.switcher-brand-badge:hover {
    background: rgba(255, 255, 255, 0.2);
}
.switcher-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #f43f5e;
}
.switcher-tag {
    color: #a1a1aa;
    font-weight: 500;
    font-size: 10px;
    text-transform: uppercase;
}
.switcher-current-label {
    color: #d4d4d8;
    font-size: 12px;
}
.switcher-current-label em {
    color: #fb7185;
    font-style: normal;
    font-weight: 600;
}
.peachy-switcher-nav {
    display: flex;
    align-items: center;
    gap: 6px;
    overflow-x: auto;
    scrollbar-width: none;
}
.peachy-switcher-nav::-webkit-scrollbar { display: none; }
.switcher-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    border-radius: 999px;
    color: #a1a1aa;
    text-decoration: none;
    font-size: 12px;
    font-weight: 500;
    white-space: nowrap;
    transition: all 0.2s ease;
    border: 1px solid transparent;
}
.switcher-link:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.08);
}
.switcher-link.active {
    background: #ffffff;
    color: #09090b;
    font-weight: 700;
}
.switcher-link.switcher-admin {
    background: rgba(245, 158, 11, 0.15);
    color: #fbbf24;
    border-color: rgba(245, 158, 11, 0.3);
}
.switcher-link.switcher-admin:hover {
    background: #f59e0b;
    color: #000;
}
.switcher-order-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    border-radius: 999px;
    background: linear-gradient(135deg, #f43f5e, #e11d48);
    color: #fff;
    border: none;
    font-size: 11px;
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
    letter-spacing: 0.03em;
    transition: opacity 0.2s, transform 0.15s;
}
.switcher-order-btn:hover {
    opacity: 0.92;
    transform: translateY(-1px);
}
.switcher-toggle-btn {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #a1a1aa;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 10px;
    cursor: pointer;
    flex-shrink: 0;
}
@media (max-width: 900px) {
    .switcher-current-label { display: none; }
}
@media (max-width: 680px) {
    .peachy-switcher-inner { flex-wrap: wrap; }
    .switcher-tag { display: none; }
}
</style>

<script>
function toggleSwitcherBar() {
    var bar = document.getElementById('peachyConceptSwitcher');
    var icon = document.getElementById('switcherToggleIcon');
    if (!bar) return;
    bar.classList.toggle('minimized');
    if (bar.classList.contains('minimized')) {
        icon.textContent = '▼';
    } else {
        icon.textContent = '▲';
    }
}
</script>
