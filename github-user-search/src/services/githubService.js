// in src/api/githubService.js

const githubToken = import.meta.env.VITE_APP_GITHUB_API_KEY;
const API_Base = import.meta.env.VITE_API_BASE_URL;

async function searchGithubRepos(query) {
  const response = await fetch(
    `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}`,
    {
      headers: {
        Authorization: `Bearer ${githubToken}`
      }
    }
  );
  const data = await response.json();
  return data;
}

export { searchGithubRepos };
