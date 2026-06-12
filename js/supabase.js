// ============================================================
// DIGITAL HOME — Supabase Client & Utilities
// ============================================================

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── Auth helpers ──────────────────────────────────────────────
export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    window.location.href = '/studio/login';
    return null;
  }
  return session;
}

export async function signOut() {
  await supabase.auth.signOut();
  window.location.href = '/studio/login';
}

// ── Settings helper ───────────────────────────────────────────
export async function getSetting(key) {
  const { data } = await supabase
    .from('settings')
    .select('value')
    .eq('key', key)
    .single();
  return data?.value ?? null;
}

export async function getSettings(keys) {
  const { data } = await supabase
    .from('settings')
    .select('key, value')
    .in('key', keys);
  if (!data) return {};
  return Object.fromEntries(data.map(r => [r.key, r.value]));
}

// ── Storage helpers ───────────────────────────────────────────
export async function uploadFile(bucket, path, file) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { upsert: true });
  if (error) throw error;
  const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(path);
  return publicUrl;
}

export async function deleteFile(bucket, path) {
  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) throw error;
}

export function getPublicUrl(bucket, path) {
  const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(path);
  return publicUrl;
}

// ── Reading time ──────────────────────────────────────────────
export function readingTime(text) {
  const words = text?.trim().split(/\s+/).length || 0;
  const mins = Math.ceil(words / 200);
  return mins < 1 ? '< 1 min read' : `${mins} min read`;
}

// ── Slug generator ────────────────────────────────────────────
export function slugify(text) {
  return text.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ── Date formatter ────────────────────────────────────────────
export function formatDate(dateStr, opts = {}) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric', ...opts
  });
}

export function formatDateShort(dateStr) {
  return formatDate(dateStr, { year: 'numeric', month: 'short', day: 'numeric' });
}

// ── Toast notifications ───────────────────────────────────────
export function toast(msg, type = 'success') {
  const el = document.createElement('div');
  el.className = `dh-toast dh-toast--${type}`;
  el.textContent = msg;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('dh-toast--visible'));
  setTimeout(() => {
    el.classList.remove('dh-toast--visible');
    setTimeout(() => el.remove(), 300);
  }, 3000);
}

// ── Debounce ──────────────────────────────────────────────────
export function debounce(fn, delay = 300) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
}

// ── Render empty state ────────────────────────────────────────
export function emptyState(container, msg = 'Nothing here yet.') {
  container.innerHTML = `<div class="dh-empty"><span>${msg}</span></div>`;
}
