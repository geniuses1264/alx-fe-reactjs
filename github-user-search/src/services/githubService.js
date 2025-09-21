const DEFAULT_API = 'https://api.github.com';

// read Vite envs safely and only accept absolute http(s) URLs
let API_BASE = DEFAULT_API;
try {
  const raw = (import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_BASE || '').toString().trim();
  if (raw) {
    if (/^https?:\/\//i.test(raw)) {
      API_BASE = raw.replace(/\/$/, '');
    } else {
      console.warn('[githubService] VITE_API_BASE* is set but not an absolute URL — ignoring:', raw);
    }
  }
} catch (e) {
  console.warn('[githubService] error reading env vars', e);
}

console.log('[githubService] API_BASE =', API_BASE);

const githubToken = import.meta.env.VITE_APP_GITHUB_API_KEY || '';
const defaultHeaders = {
  Accept: 'application/vnd.github.v3+json',
  ...(githubToken ? { Authorization: `Bearer ${githubToken}` } : {})
};

const userCache = new Map();

async function fetchUserDetails(username) {
  if (userCache.has(username)) return userCache.get(username);

  const url = new URL(`/users/${encodeURIComponent(username)}`, API_BASE).href;
  console.log('[githubService] fetchUserDetails URL =', url);
  const res = await fetch(url, { headers: defaultHeaders });

  if (!res.ok) {
    const fallback = { login: username, public_repos: null, location: null, html_url: `https://github.com/${username}` };
    userCache.set(username, fallback);
    return fallback;
  }

  const json = await res.json();
  userCache.set(username, json);
  return json;
}

/**
 * Advanced user search
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
  const url = new URL('/search/users', API_BASE);
  url.searchParams.set('q', q);
  url.searchParams.set('page', String(page));
  url.searchParams.set('per_page', String(per_page));

  console.log('[githubService] searchGithubUsers URL =', url.href);
  const res = await fetch(url.href, { headers: defaultHeaders });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`GitHub API error: ${res.status} ${res.statusText} ${text}`);
  }

  const data = await res.json();

  // Enrich items with user details (one request per item). Cached by fetchUserDetails.
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
}

async function searchGithubRepos(query) {
  const url = new URL('/search/repositories', API_BASE);
  url.searchParams.set('q', query);
  console.log('[githubService] searchGithubRepos URL =', url.href);
  const response = await fetch(url.href, { headers: defaultHeaders });
  const data = await response.json();
  return data;
}

export { searchGithubRepos, searchGithubUsers, fetchUserDetails };
