import React, { useState } from 'react';
import { searchGithubUsers } from '../services/githubService';

export default function Search() {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [perPage, setPerPage] = useState(10);
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function doSearch({ nextPage = 1, append = false } = {}) {
    console.log('[Search] doSearch params:', { query, location, minRepos, perPage, nextPage, append });

    setError(null);
    const isFresh = nextPage === 1 && !append;
    if (isFresh && !query.trim() && !location.trim() && (!minRepos || Number(minRepos) <= 0)) {
      setError('Please enter a username, location, or minimum repos to search.');
      return;
    }

    setLoading(true);
    try {
      const resp = await searchGithubUsers({
        query,
        location,
        minRepos: minRepos ? Number(minRepos) : 0,
        page: nextPage,
        per_page: perPage
      });
      console.log('[Search] service response:', resp);

      setTotal(resp.total_count || 0);
      setPage(nextPage);

      if (append) {
        setResults(prev => [...prev, ...(resp.items || [])]);
      } else {
        setResults(resp.items || []);
      }
    } catch (err) {
      console.error('[Search] search error:', err);
      setError(err?.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <form
        className="bg-white shadow rounded-lg p-4 grid grid-cols-1 gap-4 sm:grid-cols-3"
        onSubmit={e => {
          e.preventDefault();
          doSearch({ nextPage: 1, append: false });
        }}
      >
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Username / Query</label>
          <input
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            type="text"
            placeholder="octocat or any query"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>

        <div className="sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            type="text"
            placeholder="San Francisco"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
        </div>

        <div className="sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Min repos</label>
          <input
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            type="number"
            min="0"
            placeholder="0"
            value={minRepos}
            onChange={e => setMinRepos(e.target.value)}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Results per page</label>
          <select
            className="mt-1 block w-40 rounded-md border-gray-300 shadow-sm"
            value={perPage}
            onChange={e => setPerPage(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={30}>30</option>
          </select>
        </div>

        <div className="sm:col-span-1 flex items-end">
          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      <div className="mt-6">
        {error && <div className="text-red-600 mb-4">{error}</div>}

        <div className="text-sm text-gray-600 mb-2">Total results: {total}</div>

        <ul className="space-y-4">
          {results.map(user => {
            const details = user.details || {};
            return (
              <li key={user.id} className="flex items-center bg-white shadow rounded-lg p-3">
                <img src={user.avatar_url} alt={user.login} className="w-12 h-12 rounded-full mr-4" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <a
                      href={user.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 font-medium truncate"
                    >
                      {user.login}
                    </a>
                    <div className="text-sm text-gray-500">Score: {typeof user.score === 'number' ? user.score.toFixed(2) : '-'}</div>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    <span>{details.location || 'Location not available'}</span>
                    <span className="mx-2">•</span>
                    <span>{details.public_repos != null ? `${details.public_repos} repos` : 'Repos unknown'}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {results.length > 0 && results.length < total && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => doSearch({ nextPage: page + 1, append: true })}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium bg-white hover:bg-gray-50"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Load more'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
