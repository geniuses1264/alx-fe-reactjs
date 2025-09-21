
import axios from 'axios';

const DEFAULT_API = 'https://api.github.com';

// Resolve API base from Vite envs — accept only absolute http(s) URLs
let API_BASE = DEFAULT_API;
try {
  const raw = (import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_BASE || '').toString().trim();
  if (raw) {
    if (/^https?:\/\//i.test(raw)) API_BASE = raw.replace(/\/$/, '');
    else console.warn('[githubService] ignored non-absolute VITE_API_BASE*:', raw);
  }
} catch (e) {
  console.warn('[githubService] env read error', e);
}


// Do not log or expose tokens
const GITHUB_TOKEN = import.meta.env.VITE_APP_GITHUB_API_KEY || '';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'github-user-search', // helpful for some endpoints
    ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {})
  }
});



const userCache = new Map();

/**
 * Fetch full user details (cached)
 * @param {string} username
 */
async function fetchUserDetails(username) {
  if (!username) return null;
  if (userCache.has(username)) return userCache.get(username);

  try {
    const path = `/users/${encodeURIComponent(username)}`;
    const res = await api.get(path);
    userCache.set(username, res.data);
    return res.data;
  } catch (err) {
    console.warn('[githubService] fetchUserDetails failed for', username, err?.response?.status || err.message);
    const fallback = { login: username, public_repos: null, location: null, html_url: `https://github.com/${username}` };
    userCache.set(username, fallback);
    return fallback;
  }
}
// alias for compatibility with existing code that expects fetchUserData
const fetchUserData = fetchUserDetails;

/**
 * Advanced user search using GitHub Search API
 * params: { query, location, minRepos, page, per_page }
 */
async function searchGithubUsers({ query = '', location = '', minRepos = 0, page = 1, per_page = 30 } = {}) {
  const qParts = [];
  if (query && query.trim()) qParts.push(query.trim());
  if (location && location.trim()) qParts.push(`location:${location.trim()}`);
  if (minRepos && Number(minRepos) > 0) qParts.push(`repos:>=${Number(minRepos)}`);

  if (qParts.length === 0) {
    throw new Error('Empty search query — provide username, location, or minRepos.');
  }

  const q = qParts.join(' ');
  const params = { q, page, per_page };

  try {
    // Log the final URL for debugging
    const logUrl = new URL('/search/users', API_BASE);
    Object.entries(params).forEach(([k, v]) => logUrl.searchParams.set(k, String(v)));
    

    const res = await api.get('/search/users', { params });
    const data = res.data || { total_count: 0, items: [] };

    // Enrich each item with full user details (cached)
    const itemsWithDetails = await Promise.all(
      (data.items || []).map(async item => {
        const details = await fetchUserDetails(item.login);
        return { ...item, details };
      })
    );

    return {
      total_count: data.total_count,
      incomplete_results: data.incomplete_results,
      items: itemsWithDetails
    };
  } catch (err) {
    const status = err?.response?.status || 'ERR';
    const message = err?.response?.data?.message || err.message;
    throw new Error(`GitHub API error: ${status} ${message}`);
  }
}

/**
 * Repository search helper
 */
async function searchGithubRepos(query) {
  if (!query || !String(query).trim()) throw new Error('Repository search requires a query.');
  try {
    const params = { q: query };
    const logUrl = new URL('/search/repositories', API_BASE);
    logUrl.searchParams.set('q', query);
    

    const res = await api.get('/search/repositories', { params });
    return res.data;
  } catch (err) {
    const status = err?.response?.status || 'ERR';
    const message = err?.response?.data?.message || err.message;
    throw new Error(`GitHub API error: ${status} ${message}`);
  }
}

export { searchGithubRepos, searchGithubUsers, fetchUserDetails, fetchUserData };
// ...existing code...
