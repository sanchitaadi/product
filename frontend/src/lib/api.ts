/**
 * Universal Peachy Plate 2.0 API Client
 * Compatible with Local Dev (http://localhost:8000) and Shared cPanel Production (same-origin /shared/api)
 */

export const API_BASE_URL =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:8000/shared/api'
    : '/shared/api';

export const ASSET_BASE_URL =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:8000/'
    : '/';

export function resolveImageUrl(path: string | undefined): string {
  if (!path) return '/images/fallback-food.svg';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  
  // Clean up any leading slash or prefix
  let clean = path.replace(/^\/?(shared\/assets\/images\/|images\/)?/, '');
  return `/images/${clean}`;
}

export function formatPrice(amount: number | string): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return `₹${(num || 0).toFixed(2)}`;
}

export async function apiFetch<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}/${endpoint}`;
  
  const headers = new Headers(options.headers || {});
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include', // Ensures PHP session cookies are transmitted
    });

    if (!response.ok) {
      console.warn(`[apiFetch] API returned ${response.status} ${response.statusText} for ${url}`);
      return { success: false, error: `API error: ${response.status} ${response.statusText}` } as unknown as T;
    }

    return await response.json();
  } catch (err: any) {
    console.warn(`[apiFetch] Request failed for ${url}:`, err);
    return { success: false, error: err?.message || 'Network request failed' } as unknown as T;
  }
}

// ----------------------------------------------------
// Public APIs
// ----------------------------------------------------

export async function getMenu(params: {
  category?: string;
  search?: string;
  sort?: string;
  diet?: string;
  bestseller?: string;
} = {}) {
  const query = new URLSearchParams();
  if (params.category && params.category !== 'all') query.set('category', params.category);
  if (params.search) query.set('search', params.search);
  if (params.sort) query.set('sort', params.sort);
  if (params.diet && params.diet !== 'all') query.set('diet', params.diet);
  if (params.bestseller) query.set('bestseller', params.bestseller);

  const qs = query.toString();
  return apiFetch(`menu.php${qs ? `?${qs}` : ''}`);
}

export async function getMenuItem(id: number) {
  return apiFetch(`menu.php?id=${id}`);
}

export async function getItemCustomizations(itemId: number) {
  return apiFetch(`customization.php?item_id=${itemId}`);
}

export async function getCart() {
  return apiFetch('cart.php?action=get');
}

export async function addToCart(
  itemId: number,
  quantity = 1,
  customizations: number[] = [],
  instructions = ''
) {
  return apiFetch('cart.php?action=add', {
    method: 'POST',
    body: JSON.stringify({
      item_id: itemId,
      quantity,
      customizations,
      special_instructions: instructions,
    }),
  });
}

export async function updateCartQuantity(cartKey: string, quantity: number) {
  return apiFetch('cart.php?action=update_qty', {
    method: 'POST',
    body: JSON.stringify({ cart_key: cartKey, quantity }),
  });
}

export async function removeFromCart(cartKey: string) {
  return apiFetch('cart.php?action=remove', {
    method: 'POST',
    body: JSON.stringify({ cart_key: cartKey }),
  });
}

export async function clearCart() {
  return apiFetch('cart.php?action=clear', { method: 'POST' });
}

export async function applyCoupon(code: string) {
  return apiFetch('coupon.php?action=apply', {
    method: 'POST',
    body: JSON.stringify({ code }),
  });
}

export async function removeCoupon() {
  return apiFetch('coupon.php?action=remove', { method: 'POST' });
}

export async function createOrder(data: any) {
  return apiFetch('order.php?action=create', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function trackOrder(orderNumber: string, phone: string) {
  return apiFetch('order.php?action=track', {
    method: 'POST',
    body: JSON.stringify({ order_number: orderNumber, phone }),
  });
}

export async function getOrder(orderNumber: string) {
  return apiFetch(`order.php?action=get&order_number=${encodeURIComponent(orderNumber)}`);
}

export async function getWishlist() {
  return apiFetch('wishlist.php?action=get');
}

export async function toggleWishlist(itemId: number) {
  return apiFetch('wishlist.php?action=toggle', {
    method: 'POST',
    body: JSON.stringify({ item_id: itemId }),
  });
}

export async function getReviews(limit = 20) {
  return apiFetch(`reviews.php?action=list&limit=${limit}`);
}

export async function submitReview(data: {
  customer_name: string;
  customer_email?: string;
  rating: number;
  dish_recommended?: string;
  review_text: string;
  concept_source?: string;
}) {
  return apiFetch('reviews.php?action=submit', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function createReservation(data: {
  name: string;
  phone: string;
  email: string;
  reservation_date: string;
  reservation_time: string;
  guests: number;
  seating_area?: string;
  special_requests?: string;
  concept_source?: string;
}) {
  return apiFetch('reservation.php?action=create', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function submitContact(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  concept_source?: string;
}) {
  return apiFetch('contact.php', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getSettings() {
  return apiFetch('settings.php');
}

export async function authLogin(email: string, password: string) {
  return apiFetch('auth.php?action=login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function authRegister(data: {
  full_name: string;
  email: string;
  phone: string;
  password: string;
}) {
  return apiFetch('auth.php?action=register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function authLogout() {
  return apiFetch('auth.php?action=logout', { method: 'POST' });
}

export async function authMe() {
  return apiFetch('auth.php?action=me');
}

export async function authSaveAddress(data: {
  address_line: string;
  city?: string;
  pincode: string;
  landmark?: string;
}) {
  return apiFetch('auth.php?action=save_address', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ----------------------------------------------------
// Admin SaaS Dashboard APIs
// ----------------------------------------------------

export async function adminLogin(username: string, password: string) {
  return apiFetch('admin.php?action=login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
}

export async function adminLogout() {
  return apiFetch('admin.php?action=logout', { method: 'POST' });
}

export async function adminMe() {
  return apiFetch('admin.php?action=me');
}

export async function adminGetStats() {
  return apiFetch('admin.php?action=stats');
}

export async function adminGetOrders(params: { search?: string; status?: string; order_type?: string } = {}) {
  const query = new URLSearchParams();
  if (params.search) query.set('search', params.search);
  if (params.status && params.status !== 'all') query.set('status', params.status);
  if (params.order_type && params.order_type !== 'all') query.set('order_type', params.order_type);
  const qs = query.toString();
  return apiFetch(`admin.php?action=orders_list${qs ? `&${qs}` : ''}`);
}

export async function adminGetOrderDetails(orderId: number) {
  return apiFetch(`admin.php?action=order_details&order_id=${orderId}`);
}

export async function adminUpdateOrderStatus(orderId: number, status: string) {
  return apiFetch('admin.php?action=order_update_status', {
    method: 'POST',
    body: JSON.stringify({ order_id: orderId, status }),
  });
}

export async function adminGetMenu() {
  return apiFetch('admin.php?action=menu_list');
}

export async function adminSaveMenuItem(data: any) {
  return apiFetch('admin.php?action=menu_save', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function adminDeleteMenuItem(id: number) {
  return apiFetch('admin.php?action=menu_delete', {
    method: 'POST',
    body: JSON.stringify({ id }),
  });
}

export async function adminToggleMenuItemAvailable(id: number) {
  return apiFetch('admin.php?action=menu_toggle_available', {
    method: 'POST',
    body: JSON.stringify({ id }),
  });
}

export async function adminGetReservations(params: { date?: string; status?: string } = {}) {
  const query = new URLSearchParams();
  if (params.date) query.set('date', params.date);
  if (params.status && params.status !== 'all') query.set('status', params.status);
  const qs = query.toString();
  return apiFetch(`admin.php?action=reservations_list${qs ? `&${qs}` : ''}`);
}

export async function adminUpdateReservationStatus(reservationId: number, status: string) {
  return apiFetch('admin.php?action=reservation_update_status', {
    method: 'POST',
    body: JSON.stringify({ reservation_id: reservationId, status }),
  });
}

export async function adminGetCoupons() {
  return apiFetch('admin.php?action=coupons_list');
}

export async function adminSaveCoupon(data: any) {
  return apiFetch('admin.php?action=coupon_save', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function adminDeleteCoupon(id: number) {
  return apiFetch('admin.php?action=coupon_delete', {
    method: 'POST',
    body: JSON.stringify({ id }),
  });
}

export async function adminGetReviews() {
  return apiFetch('admin.php?action=reviews_list');
}

export async function adminUpdateReviewStatus(id: number, status: string) {
  return apiFetch('admin.php?action=review_update_status', {
    method: 'POST',
    body: JSON.stringify({ id, status }),
  });
}

export async function adminGetCustomers() {
  return apiFetch('admin.php?action=customers_list');
}

export async function adminGetMessages() {
  return apiFetch('admin.php?action=messages_list');
}

export async function adminUpdateMessageStatus(id: number, status: string) {
  return apiFetch('admin.php?action=message_update_status', {
    method: 'POST',
    body: JSON.stringify({ id, status }),
  });
}

export async function adminGetSettings() {
  return apiFetch('admin.php?action=settings_get');
}

export async function adminUpdateSettings(settings: Record<string, string>) {
  return apiFetch('admin.php?action=settings_update', {
    method: 'POST',
    body: JSON.stringify({ settings }),
  });
}

export async function adminGetCategories() {
  return apiFetch('admin.php?action=categories_list');
}

export async function adminSaveCategory(data: {
  id?: number;
  name: string;
  slug?: string;
  description?: string;
  display_order?: number;
  is_active?: number;
}) {
  return apiFetch('admin.php?action=category_save', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function adminDeleteCategory(id: number) {
  return apiFetch('admin.php?action=category_delete', {
    method: 'POST',
    body: JSON.stringify({ id }),
  });
}

export async function adminGetAnalytics() {
  return apiFetch('admin.php?action=analytics');
}

export async function adminUpdateProfile(data: { full_name: string; email: string }) {
  return apiFetch('admin.php?action=profile_update', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function adminUpdatePassword(data: { current_password: string; new_password: string }) {
  return apiFetch('admin.php?action=password_update', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

