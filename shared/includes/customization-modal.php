<!-- ========================================================
     PEACHY PLATE — UNIVERSAL FOOD CUSTOMIZATION MODAL
     ======================================================== -->
<div id="peachyCustomModal" class="custom-modal-backdrop" aria-hidden="true" role="dialog" aria-labelledby="customModalDishTitle">
    <div class="custom-modal-dialog">
        <button type="button" class="custom-modal-close" onclick="closeCustomizationModal()" aria-label="Close modal">&times;</button>
        
        <div class="custom-modal-header">
            <img id="customModalThumb" src="" alt="Dish Preview" class="custom-modal-thumb">
            <div class="custom-modal-header-info">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span id="customModalVegBadge" class="dot-veg" style="display: inline-block;"></span>
                    <span id="customModalCategory" style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b;">CATEGORY</span>
                </div>
                <h3 id="customModalDishTitle" class="custom-modal-title">Dish Title</h3>
                <p id="customModalDishDesc" class="custom-modal-desc">Dish description and fresh ingredients.</p>
                <div id="customModalBasePrice" class="custom-modal-base-price">₹0</div>
            </div>
        </div>

        <form id="customModalForm" onsubmit="handleCustomizationSubmit(event)">
            <input type="hidden" id="customModalItemId" name="item_id" value="">
            
            <div id="customModalGroupsContainer" class="custom-modal-groups-wrap">
                <!-- Dynamically generated groups & options -->
            </div>

            <div class="custom-modal-instructions">
                <label for="customModalInstructions" style="font-size: 12px; font-weight: 700; text-transform: uppercase;">Kitchen Instructions (Optional)</label>
                <input type="text" id="customModalInstructions" name="special_instructions" class="custom-modal-input" placeholder="e.g. Less spicy, dressing on the side...">
            </div>

            <div class="custom-modal-footer">
                <div class="custom-modal-qty-wrap">
                    <button type="button" class="custom-qty-btn" onclick="adjustCustomModalQty(-1)">&minus;</button>
                    <span id="customModalQtyDisplay" class="custom-qty-num">1</span>
                    <button type="button" class="custom-qty-btn" onclick="adjustCustomModalQty(1)">&plus;</button>
                </div>
                <button type="submit" id="customModalAddBtn" class="custom-modal-submit-btn">
                    <span>Add to Feast &bull; </span>
                    <span id="customModalTotalPrice">₹0</span>
                </button>
            </div>
        </form>
    </div>
</div>

<style>
.custom-modal-backdrop {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.7);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    z-index: 9999999;
    align-items: center;
    justify-content: center;
    padding: 20px;
    opacity: 0;
    transition: opacity 0.3s ease;
}
.custom-modal-backdrop.active {
    display: flex;
    opacity: 1;
}

.custom-modal-dialog {
    background: #ffffff;
    color: #1e293b;
    width: 100%;
    max-width: 580px;
    max-height: 90vh;
    border-radius: 24px;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    animation: modalPop 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes modalPop {
    0% { transform: scale(0.92) translateY(20px); opacity: 0; }
    100% { transform: scale(1) translateY(0); opacity: 1; }
}

.custom-modal-close {
    position: absolute;
    top: 16px;
    right: 18px;
    background: rgba(0, 0, 0, 0.06);
    border: none;
    border-radius: 50%;
    width: 34px;
    height: 34px;
    font-size: 22px;
    color: #475569;
    cursor: pointer;
    z-index: 10;
    transition: background 0.2s;
}
.custom-modal-close:hover { background: rgba(0, 0, 0, 0.12); }

.custom-modal-header {
    display: flex;
    gap: 18px;
    padding: 24px;
    border-bottom: 1px solid #f1f5f9;
}
.custom-modal-thumb {
    width: 90px;
    height: 90px;
    border-radius: 14px;
    object-fit: cover;
    flex-shrink: 0;
}
.custom-modal-header-info {
    flex: 1;
    min-width: 0;
}
.custom-modal-title {
    font-size: 18px;
    font-weight: 800;
    color: #0f172a;
    margin: 4px 0 6px;
}
.custom-modal-desc {
    font-size: 12.5px;
    color: #64748b;
    line-height: 1.45;
    margin-bottom: 8px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.custom-modal-base-price {
    font-size: 16px;
    font-weight: 800;
    color: #e11d48;
}

.custom-modal-groups-wrap {
    flex: 1;
    overflow-y: auto;
    padding: 20px 24px;
    display: flex;
    flex-direction: column;
    gap: 22px;
}

.custom-group-card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    padding: 18px;
}
.custom-group-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
}
.custom-group-title {
    font-size: 14px;
    font-weight: 700;
    color: #0f172a;
}
.custom-group-badge {
    font-size: 11px;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 4px;
    background: #e2e8f0;
    color: #475569;
}
.badge-required { background: #fee2e2; color: #dc2626; }

.custom-options-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.custom-option-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    font-size: 13.5px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease;
}
.custom-option-label:hover { border-color: #cbd5e1; }
.custom-option-label input:checked + .option-custom-text { font-weight: 700; }
.custom-option-left {
    display: flex;
    align-items: center;
    gap: 10px;
}
.custom-option-delta {
    font-size: 13px;
    font-weight: 700;
    color: #e11d48;
}

.custom-modal-instructions {
    padding: 14px 24px;
    background: #ffffff;
    border-top: 1px solid #f1f5f9;
}
.custom-modal-input {
    width: 100%;
    margin-top: 6px;
    padding: 10px 14px;
    border: 1px solid #cbd5e1;
    border-radius: 10px;
    font-size: 13px;
    outline: none;
    box-sizing: border-box;
}
.custom-modal-input:focus { border-color: #e11d48; }

.custom-modal-footer {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 18px 24px;
    background: #f8fafc;
    border-top: 1px solid #e2e8f0;
}
.custom-modal-qty-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 12px;
    padding: 6px 12px;
}
.custom-qty-btn {
    background: none;
    border: none;
    font-size: 18px;
    font-weight: 800;
    cursor: pointer;
    color: #0f172a;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.custom-qty-num {
    font-size: 15px;
    font-weight: 800;
    min-width: 20px;
    text-align: center;
}
.custom-modal-submit-btn {
    flex: 1;
    background: #0f172a;
    color: #ffffff;
    border: none;
    border-radius: 14px;
    padding: 15px 20px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s, transform 0.15s;
}
.custom-modal-submit-btn:hover {
    background: #1e293b;
    transform: translateY(-1px);
}
</style>
