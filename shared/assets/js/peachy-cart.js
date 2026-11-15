/**
 * PEACHY PLATE — UNIFIED E-COMMERCE JAVASCRIPT ENGINE
 * Drives Cart Drawer, Customization Modal, Wishlist, and Live Calculations
 * Compatible with Concept A, Concept B, and Concept C
 */

let currentCustomItem = null;
let currentCustomQty = 1;

// --------------------------------------------------------
// Cart Drawer Open / Close
// --------------------------------------------------------
function openCartDrawer() {
    const drawer = document.getElementById('peachyCartDrawer');
    const overlay = document.getElementById('peachyCartOverlay');
    if (drawer && overlay) {
        drawer.classList.add('open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        refreshCartUI();
    }
}

function closeCartDrawer() {
    const drawer = document.getElementById('peachyCartDrawer');
    const overlay = document.getElementById('peachyCartOverlay');
    if (drawer && overlay) {
        drawer.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// --------------------------------------------------------
// Fetch & Refresh Cart UI
// --------------------------------------------------------
async function refreshCartUI() {
    try {
        const res = await fetch('../shared/api/cart.php?action=get');
        const data = await res.json();
        if (data.success && data.cart) {
            renderCartDrawer(data.cart);
            updateCartBadges(data.cart.item_count);
        }
    } catch (err) {
        console.error('Error updating cart:', err);
    }
}

function updateCartBadges(count) {
    const badges = document.querySelectorAll('.peachy-cart-count, #cartDrawerCountBadge');
    badges.forEach(b => {
        if (b.id === 'cartDrawerCountBadge') {
            b.textContent = `${count} ${count === 1 ? 'item' : 'items'}`;
        } else {
            b.textContent = count;
            b.style.display = count > 0 ? 'inline-flex' : 'none';
        }
    });
}

function renderCartDrawer(cart) {
    const container = document.getElementById('cartDrawerItemsList');
    const subtotalEl = document.getElementById('cartDrawerSubtotal');
    const deliveryMsgEl = document.getElementById('cartDeliveryMsg');
    const deliveryProgEl = document.getElementById('cartDeliveryProgress');

    if (subtotalEl) subtotalEl.textContent = cart.subtotal_formatted;

    // Delivery progress
    if (deliveryMsgEl && deliveryProgEl) {
        if (cart.subtotal >= cart.free_delivery_threshold) {
            deliveryMsgEl.innerHTML = '🎉 <strong>Congratulations!</strong> You unlocked FREE Delivery!';
            deliveryProgEl.style.width = '100%';
            deliveryProgEl.style.background = '#10B981';
        } else {
            const diff = cart.free_delivery_threshold - cart.subtotal;
            const percent = Math.min(100, Math.round((cart.subtotal / cart.free_delivery_threshold) * 100));
            deliveryMsgEl.innerHTML = `Add <strong>₹${diff.toFixed(0)}</strong> more for <strong>FREE Delivery</strong>!`;
            deliveryProgEl.style.width = `${percent}%`;
            deliveryProgEl.style.background = '#E11D48';
        }
    }

    if (!container) return;

    if (!cart.items || cart.items.length === 0) {
        container.innerHTML = `
            <div class="cart-empty-state">
                <span class="cart-empty-icon">🍰</span>
                <h4 class="cart-empty-title">Your Cart is Empty</h4>
                <p class="cart-empty-text">Good food brings cute moods. Add your favorite pasta or dessert to start feasting!</p>
                <button type="button" class="cart-btn-checkout" style="background:#0f172a;" onclick="closeCartDrawer()">Explore Our Menu</button>
            </div>
        `;
        return;
    }

    let html = '';
    cart.items.forEach(item => {
        let customHtml = '';
        if (item.customizations && item.customizations.length > 0) {
            const tags = item.customizations.map(c => c.option).join(', ');
            customHtml = `<div class="cart-item-customizations">${tags}</div>`;
        }
        if (item.special_instructions) {
            customHtml += `<div style="font-size:11px;color:#94a3b8;font-style:italic;">Note: ${item.special_instructions}</div>`;
        }

        html += `
            <div class="cart-item-row" data-key="${item.cart_key}">
                <img src="${item.image_url}" alt="${item.name}" class="cart-item-thumb" loading="lazy" onerror="this.onerror=null;this.src='../shared/assets/images/fallback-food.svg';">
                <div class="cart-item-info">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;">
                        <h4 class="cart-item-name">${item.name}</h4>
                        <button type="button" class="cart-item-delete" onclick="removeCartItem('${item.cart_key}')" title="Remove">&times;</button>
                    </div>
                    ${customHtml}
                    <div class="cart-item-controls">
                        <div class="cart-qty-spinner">
                            <button type="button" class="cart-qty-btn" onclick="changeCartItemQty('${item.cart_key}', ${item.quantity - 1})">&minus;</button>
                            <span class="cart-qty-num">${item.quantity}</span>
                            <button type="button" class="cart-qty-btn" onclick="changeCartItemQty('${item.cart_key}', ${item.quantity + 1})">&plus;</button>
                        </div>
                        <span class="cart-item-price">${item.line_total_formatted}</span>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// --------------------------------------------------------
// Cart Actions (Add, Qty Change, Remove)
// --------------------------------------------------------
async function quickAddToCart(itemId, buttonEl) {
    if (buttonEl) {
        const origText = buttonEl.innerHTML;
        buttonEl.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Adding...';
        buttonEl.disabled = true;

        try {
            const formData = new FormData();
            formData.append('item_id', itemId);
            formData.append('quantity', 1);

            const res = await fetch('../shared/api/cart.php?action=add', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            if (data.success) {
                openCartDrawer();
            } else {
                alert(data.error || 'Could not add to cart.');
            }
        } catch (err) {
            console.error(err);
        } finally {
            buttonEl.innerHTML = origText;
            buttonEl.disabled = false;
        }
    }
}

async function changeCartItemQty(cartKey, newQty) {
    try {
        const formData = new FormData();
        formData.append('cart_key', cartKey);
        formData.append('quantity', newQty);

        const res = await fetch('../shared/api/cart.php?action=update_qty', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        if (data.success && data.cart) {
            renderCartDrawer(data.cart);
            updateCartBadges(data.cart.item_count);
            // If on cart.php page, reload or sync
            if (typeof updateCartPageTable === 'function') {
                updateCartPageTable(data.cart);
            }
        }
    } catch (err) {
        console.error(err);
    }
}

async function removeCartItem(cartKey) {
    try {
        const formData = new FormData();
        formData.append('cart_key', cartKey);

        const res = await fetch('../shared/api/cart.php?action=remove', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        if (data.success && data.cart) {
            renderCartDrawer(data.cart);
            updateCartBadges(data.cart.item_count);
            if (typeof updateCartPageTable === 'function') {
                updateCartPageTable(data.cart);
            }
        }
    } catch (err) {
        console.error(err);
    }
}

// --------------------------------------------------------
// Customization Modal Logic
// --------------------------------------------------------
async function openCustomizationModal(itemId) {
    currentCustomQty = 1;
    const modal = document.getElementById('peachyCustomModal');
    if (!modal) return;

    try {
        const res = await fetch(`../shared/api/customization.php?item_id=${itemId}`);
        const data = await res.json();
        if (!data.success) {
            alert(data.error || 'Failed to load options.');
            return;
        }

        currentCustomItem = data.item;

        // Populate header
        document.getElementById('customModalItemId').value = data.item.id;
        document.getElementById('customModalDishTitle').textContent = data.item.name;
        document.getElementById('customModalDishDesc').textContent = data.item.description;
        document.getElementById('customModalBasePrice').textContent = data.item.price_formatted;
        document.getElementById('customModalCategory').textContent = data.item.category;
        document.getElementById('customModalThumb').src = data.item.image_url;
        document.getElementById('customModalQtyDisplay').textContent = currentCustomQty;
        document.getElementById('customModalInstructions').value = '';

        const vegBadge = document.getElementById('customModalVegBadge');
        if (vegBadge) {
            vegBadge.className = data.item.is_veg ? 'dot-veg' : 'dot-nonveg';
        }

        // Render groups
        const groupsContainer = document.getElementById('customModalGroupsContainer');
        groupsContainer.innerHTML = '';

        if (!data.groups || data.groups.length === 0) {
            groupsContainer.innerHTML = '<p style="color:#64748b;font-size:13px;text-align:center;">This item has no additional customization groups. Click Add below to enjoy standard chef preparation!</p>';
        } else {
            data.groups.forEach((g, gIdx) => {
                const isSingle = g.type === 'single';
                const inputType = isSingle ? 'radio' : 'checkbox';
                const inputName = isSingle ? `group_${g.id}` : `group_${g.id}[]`;

                let optionsHtml = '';
                g.options.forEach((opt, oIdx) => {
                    const isChecked = (isSingle && oIdx === 0) || opt.is_default;
                    const deltaLabel = opt.price_delta > 0 ? `+₹${parseFloat(opt.price_delta).toFixed(0)}` : 'FREE';

                    optionsHtml += `
                        <label class="custom-option-label">
                            <div class="custom-option-left">
                                <input type="${inputType}" name="${inputName}" value="${opt.id}" data-delta="${opt.price_delta}" ${isChecked ? 'checked' : ''} onchange="calculateCustomModalTotal()">
                                <span class="option-custom-text">${opt.name}</span>
                            </div>
                            <span class="custom-option-delta">${deltaLabel}</span>
                        </label>
                    `;
                });

                groupsContainer.innerHTML += `
                    <div class="custom-group-card">
                        <div class="custom-group-header">
                            <span class="custom-group-title">${g.title}</span>
                            <span class="custom-group-badge ${g.is_required ? 'badge-required' : ''}">
                                ${g.is_required ? 'REQUIRED &bull; 1' : 'OPTIONAL'}
                            </span>
                        </div>
                        <div class="custom-options-list">
                            ${optionsHtml}
                        </div>
                    </div>
                `;
            });
        }

        calculateCustomModalTotal();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    } catch (err) {
        console.error(err);
    }
}

function closeCustomizationModal() {
    const modal = document.getElementById('peachyCustomModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function adjustCustomModalQty(delta) {
    currentCustomQty = Math.max(1, Math.min(50, currentCustomQty + delta));
    document.getElementById('customModalQtyDisplay').textContent = currentCustomQty;
    calculateCustomModalTotal();
}

function calculateCustomModalTotal() {
    if (!currentCustomItem) return;

    let base = parseFloat(currentCustomItem.price);
    let addons = 0.0;

    const checkedInputs = document.querySelectorAll('#customModalGroupsContainer input:checked');
    checkedInputs.forEach(inp => {
        const delta = parseFloat(inp.getAttribute('data-delta') || 0);
        addons += delta;
    });

    const total = (base + addons) * currentCustomQty;
    document.getElementById('customModalTotalPrice').textContent = `₹${total.toFixed(0)}`;
}

async function handleCustomizationSubmit(e) {
    e.preventDefault();
    const itemId = document.getElementById('customModalItemId').value;
    const instructions = document.getElementById('customModalInstructions').value;
    const submitBtn = document.getElementById('customModalAddBtn');

    const selectedOptionIds = [];
    const checkedInputs = document.querySelectorAll('#customModalGroupsContainer input:checked');
    checkedInputs.forEach(inp => selectedOptionIds.push(parseInt(inp.value)));

    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Adding to Feast...';

    try {
        const formData = new FormData();
        formData.append('item_id', itemId);
        formData.append('quantity', currentCustomQty);
        selectedOptionIds.forEach(id => formData.append('customizations[]', id));
        formData.append('special_instructions', instructions);

        const res = await fetch('../shared/api/cart.php?action=add', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        if (data.success) {
            closeCustomizationModal();
            openCartDrawer();
        } else {
            alert(data.error || 'Failed to add item.');
        }
    } catch (err) {
        console.error(err);
    } finally {
        submitBtn.disabled = false;
        calculateCustomModalTotal();
    }
}

// --------------------------------------------------------
// Wishlist Toggle
// --------------------------------------------------------
async function toggleWishlist(itemId, btnEl) {
    try {
        const formData = new FormData();
        formData.append('item_id', itemId);

        const res = await fetch('../shared/api/wishlist.php?action=toggle', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        if (data.success) {
            if (btnEl) {
                const icon = btnEl.querySelector('i');
                if (icon) {
                    if (data.is_favorited) {
                        icon.className = 'fa-solid fa-heart';
                        icon.style.color = '#e11d48';
                    } else {
                        icon.className = 'fa-regular fa-heart';
                        icon.style.color = '';
                    }
                }
            }
            // Update wishlist count in header
            const wishlistBadges = document.querySelectorAll('.peachy-wishlist-count');
            wishlistBadges.forEach(b => {
                b.textContent = data.count;
                b.style.display = data.count > 0 ? 'inline-flex' : 'none';
            });
        }
    } catch (err) {
        console.error(err);
    }
}

// Auto init on page load
document.addEventListener('DOMContentLoaded', function () {
    refreshCartUI();
});
