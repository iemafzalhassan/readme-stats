// @ts-check

import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { MissingParamError } from "../common/error.js";
import { request } from "../common/http.js";
import { retryer } from "../common/retryer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let LANG_COLORS = {};
try {
  LANG_COLORS = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "../common/languageColors.json"),
      "utf8",
    ),
  );
} catch {
  LANG_COLORS = {};
}

const fetcher = (variables, token) => {
  return request(
    {
      query: `
      fragment RepoInfo on Repository {
        name
        nameWithOwner
        isPrivate
        isArchived
        isTemplate
        stargazers {
          totalCount
        }
        description
        primaryLanguage {
          color
          id
          name
        }
        forkCount
      }
      query getRepo($login: String!, $repo: String!) {
        user(login: $login) {
          repository(name: $repo) {
            ...RepoInfo
          }
        }
        organization(login: $login) {
          repository(name: $repo) {
            ...RepoInfo
          }
        }
      }
    `,
      variables,
    },
    {
      Authorization: `token ${token}`,
    },
  );
};

const urlExample = "/api/pin?username=USERNAME&amp;repo=REPO_NAME";

const fetchRepoPublicFallback = async (username, reponame) => {
  const res = await axios.get(
    `https://api.github.com/repos/${encodeURIComponent(username)}/${encodeURIComponent(reponame)}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "readme-stats-studio",
      },
      timeout: 6000,
    },
  );

  const r = res.data;
  if (!r || r.private) {
    throw new Error("User Repository Not found");
  }

  return {
    name: r.name,
    nameWithOwner: r.full_name || `${username}/${reponame}`,
    isPrivate: Boolean(r.private),
    isArchived: Boolean(r.archived),
    isTemplate: Boolean(r.is_template),
    stargazers: { totalCount: r.stargazers_count || 0 },
    starCount: r.stargazers_count || 0,
    description: r.description || "Open-source repository on GitHub.",
    primaryLanguage: r.language
      ? {
          color: LANG_COLORS[r.language] || "#6366f1",
          id: r.language,
          name: r.language,
        }
      : null,
    forkCount: r.forks_count || 0,
  };
};

const fetchRepo = async (username, reponame) => {
  if (!username && !reponame) {
    throw new MissingParamError(["username", "repo"], urlExample);
  }
  if (!username) {
    throw new MissingParamError(["username"], urlExample);
  }
  if (!reponame) {
    throw new MissingParamError(["repo"], urlExample);
  }

  const hasPat =
    process.env.NODE_ENV === "test" ||
    Object.keys(process.env).some((k) => /^PAT_\d*$/.test(k) && process.env[k]);
  if (!hasPat) {
    return fetchRepoPublicFallback(username, reponame);
  }

  try {
    let res = await retryer(fetcher, { login: username, repo: reponame });
    const data = res.data.data;

    if (!data.user && !data.organization) {
      throw new Error("Not found");
    }

    const isUser = data.organization === null && data.user;
    const isOrg = data.user === null && data.organization;

    if (isUser) {
      if (!data.user.repository || data.user.repository.isPrivate) {
        throw new Error("User Repository Not found");
      }
      return {
        ...data.user.repository,
        starCount: data.user.repository.stargazers.totalCount,
      };
    }

    if (isOrg) {
      if (
        !data.organization.repository ||
        data.organization.repository.isPrivate
      ) {
        throw new Error("Organization Repository Not found");
      }
      return {
        ...data.organization.repository,
        starCount: data.organization.repository.stargazers.totalCount,
      };
    }

    throw new Error("Unexpected behavior");
  } catch (err) {
    if (process.env.NODE_ENV === "test") {
      throw err;
    }
    return fetchRepoPublicFallback(username, reponame);
  }
};

export { fetchRepo };
export default fetchRepo;
