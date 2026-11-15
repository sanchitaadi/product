<!-- Payment Gateway Coming Soon Modal (Razorpay Ready) -->
<div id="paymentModal" class="payment-modal-backdrop" aria-hidden="true" role="dialog" aria-labelledby="paymentModalTitle">
    <div class="payment-modal-card">
        <button type="button" class="payment-modal-close" onclick="closePaymentModal()" aria-label="Close modal">&times;</button>
        <div class="payment-modal-badge">
            <span class="pulse-dot"></span> ARCHITECTURE READY
        </div>
        <div class="payment-icon-wrapper">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                <line x1="2" y1="10" x2="22" y2="10"></line>
            </svg>
        </div>
        <h3 id="paymentModalTitle" class="payment-modal-title">Online Payment & Table Pre-Pay</h3>
        <p class="payment-modal-subtitle">Coming Soon — Direct Razorpay Integration</p>
        <div class="payment-modal-body">
            <p>Our secure contactless payment checkout is currently undergoing certification. You will soon be able to pre-pay deposits, order table feasts, and gift dining vouchers seamlessly.</p>
            <div class="payment-supported-pill">
                <span>Supported at Launch:</span>
                <div class="payment-method-tags">
                    <span class="pay-tag">UPI (GPay / PhonePe / Paytm)</span>
                    <span class="pay-tag">Credit / Debit Cards</span>
                    <span class="pay-tag">Net Banking</span>
                    <span class="pay-tag">Dining Vouchers</span>
                </div>
            </div>
            <div class="payment-notice-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                <span>Zero Advance Charge Today: All reservations are 100% complimentary to book. Settle your bill at the cafe table via Cash, UPI, or Card!</span>
            </div>
        </div>
        <div class="payment-modal-footer">
            <button type="button" class="payment-btn-primary" onclick="closePaymentModal()">Understood & Continue</button>
        </div>
    </div>
</div>

<style>
.payment-modal-backdrop {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 999999;
    background: rgba(15, 12, 10, 0.75);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    align-items: center;
    justify-content: center;
    padding: 20px;
    opacity: 0;
    transition: opacity 0.3s ease;
}
.payment-modal-backdrop.active {
    display: flex;
    opacity: 1;
}
.payment-modal-card {
    background: #ffffff;
    color: #1e293b;
    width: 100%;
    max-width: 520px;
    border-radius: 24px;
    padding: 36px 32px 30px;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
    position: relative;
    text-align: center;
    animation: modalPopIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes modalPopIn {
    0% { transform: scale(0.92) translateY(20px); opacity: 0; }
    100% { transform: scale(1) translateY(0); opacity: 1; }
}
.payment-modal-close {
    position: absolute;
    top: 18px;
    right: 20px;
    background: transparent;
    border: none;
    font-size: 28px;
    color: #94a3b8;
    cursor: pointer;
    line-height: 1;
    transition: color 0.2s;
}
.payment-modal-close:hover { color: #0f172a; }
.payment-modal-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 5px 14px;
    border-radius: 999px;
    background: #f1f5f9;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: #475569;
    margin-bottom: 16px;
}
.pulse-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #10b981;
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
    animation: pulseDot 1.8s infinite;
}
@keyframes pulseDot {
    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
    70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}
.payment-icon-wrapper {
    width: 72px;
    height: 72px;
    margin: 0 auto 16px;
    border-radius: 20px;
    background: linear-gradient(135deg, #FFF1F2, #FFE4E6);
    color: #E11D48;
    display: flex;
    align-items: center;
    justify-content: center;
}
.payment-modal-title {
    font-size: 22px;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 6px;
}
.payment-modal-subtitle {
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #E11D48;
    margin-bottom: 16px;
}
.payment-modal-body p {
    font-size: 14px;
    line-height: 1.6;
    color: #475569;
    margin-bottom: 18px;
}
.payment-supported-pill {
    background: #f8fafc;
    border: 1px dashed #cbd5e1;
    border-radius: 14px;
    padding: 12px;
    margin-bottom: 16px;
    font-size: 12px;
    color: #64748b;
}
.payment-supported-pill span {
    font-weight: 600;
    display: block;
    margin-bottom: 8px;
    color: #334155;
}
.payment-method-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    justify-content: center;
}
.pay-tag {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 11px;
    font-weight: 600;
    color: #1e293b;
}
.payment-notice-box {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    background: #FFFBEB;
    border: 1px solid #FDE68A;
    border-radius: 12px;
    padding: 12px 14px;
    text-align: left;
    font-size: 12px;
    line-height: 1.5;
    color: #92400E;
    margin-bottom: 24px;
}
.payment-notice-box svg { flex-shrink: 0; margin-top: 1px; }
.payment-btn-primary {
    display: inline-block;
    width: 100%;
    padding: 14px 24px;
    background: #0f172a;
    color: #ffffff;
    font-size: 14px;
    font-weight: 600;
    border: none;
    border-radius: 14px;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
}
.payment-btn-primary:hover {
    background: #1e293b;
    transform: translateY(-1px);
}
</style>

<script>
function openPaymentModal() {
    var modal = document.getElementById('paymentModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}
function closePaymentModal() {
    var modal = document.getElementById('paymentModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}
window.addEventListener('click', function(e) {
    var modal = document.getElementById('paymentModal');
    if (e.target === modal) {
        closePaymentModal();
    }
});
</script>
