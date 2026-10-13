// @ts-check

import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { retryer } from "../common/retryer.js";
import { logger } from "../common/log.js";
import { excludeRepositories } from "../common/envs.js";
import { CustomError, MissingParamError } from "../common/error.js";
import { wrapTextMultiline } from "../common/fmt.js";
import { request } from "../common/http.js";

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
      query userInfo($login: String!) {
        user(login: $login) {
          repositories(ownerAffiliations: OWNER, isFork: false, first: 100) {
            nodes {
              name
              languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                edges {
                  size
                  node {
                    color
                    name
                  }
                }
              }
            }
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

const fetchTopLanguagesPublicFallback = async (
  username,
  exclude_repo = [],
  size_weight = 1,
  count_weight = 0,
) => {
  const res = await axios.get(
    `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&type=owner`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "readme-stats-studio",
      },
      timeout: 6000,
    },
  );

  const repos = Array.isArray(res.data) ? res.data.filter((r) => !r.fork) : [];
  const allExcludedRepos = new Set([...exclude_repo, ...excludeRepositories]);

  /** @type {Record<string, {name: string, color: string, size: number, count: number}>} */
  const map = {};
  repos.forEach((repo) => {
    if (allExcludedRepos.has(repo.name) || !repo.language) {
      return;
    }
    const lang = repo.language;
    const byteEst = Math.max((repo.size || 10) * 1024, 4096);
    if (map[lang]) {
      map[lang].size += byteEst;
      map[lang].count += 1;
    } else {
      map[lang] = {
        name: lang,
        color: LANG_COLORS[lang] || "#6366f1",
        size: byteEst,
        count: 1,
      };
    }
  });

  Object.keys(map).forEach((name) => {
    map[name].size =
      Math.pow(map[name].size, size_weight) *
      Math.pow(map[name].count, count_weight);
  });

  return Object.keys(map)
    .sort((a, b) => map[b].size - map[a].size)
    .reduce((result, key) => {
      result[key] = map[key];
      return result;
    }, {});
};

const fetchTopLanguages = async (
  username,
  exclude_repo = [],
  size_weight = 1,
  count_weight = 0,
) => {
  if (!username) {
    throw new MissingParamError(["username"]);
  }

  const hasPat =
    process.env.NODE_ENV === "test" ||
    Object.keys(process.env).some((k) => /^PAT_\d*$/.test(k) && process.env[k]);
  if (!hasPat) {
    return fetchTopLanguagesPublicFallback(
      username,
      exclude_repo,
      size_weight,
      count_weight,
    );
  }

  try {
    const res = await retryer(fetcher, { login: username });

    if (res.data.errors) {
      logger.error(res.data.errors);
      if (res.data.errors[0].type === "NOT_FOUND") {
        throw new CustomError(
          res.data.errors[0].message || "Could not fetch user.",
          CustomError.USER_NOT_FOUND,
        );
      }
      if (res.data.errors[0].message) {
        throw new CustomError(
          wrapTextMultiline(res.data.errors[0].message, 90, 1)[0],
          res.statusText,
        );
      }
      throw new CustomError(
        "Something went wrong while trying to retrieve the language data using the GraphQL API.",
        CustomError.GRAPHQL_ERROR,
      );
    }

    let repoNodes = res.data.data.user.repositories.nodes;
    /** @type {Record<string, boolean>} */
    let repoToHide = {};
    const allExcludedRepos = [...exclude_repo, ...excludeRepositories];

    if (allExcludedRepos) {
      allExcludedRepos.forEach((repoName) => {
        repoToHide[repoName] = true;
      });
    }

    repoNodes = repoNodes
      .sort((a, b) => b.size - a.size)
      .filter((name) => !repoToHide[name.name]);

    let repoCount = 0;

    repoNodes = repoNodes
      .filter((node) => node.languages.edges.length > 0)
      .reduce((acc, curr) => curr.languages.edges.concat(acc), [])
      .reduce((acc, prev) => {
        let langSize = prev.size;

        if (
          acc[prev.node.name] &&
          prev.node.name === acc[prev.node.name].name
        ) {
          langSize = prev.size + acc[prev.node.name].size;
          repoCount += 1;
        } else {
          repoCount = 1;
        }
        return {
          ...acc,
          [prev.node.name]: {
            name: prev.node.name,
            color: prev.node.color,
            size: langSize,
            count: repoCount,
          },
        };
      }, {});

    Object.keys(repoNodes).forEach((name) => {
      repoNodes[name].size =
        Math.pow(repoNodes[name].size, size_weight) *
        Math.pow(repoNodes[name].count, count_weight);
    });

    const topLangs = Object.keys(repoNodes)
      .sort((a, b) => repoNodes[b].size - repoNodes[a].size)
      .reduce((result, key) => {
        result[key] = repoNodes[key];
        return result;
      }, {});

    return topLangs;
  } catch (err) {
    if (process.env.NODE_ENV === "test") {
      throw err;
    }
    return fetchTopLanguagesPublicFallback(
      username,
      exclude_repo,
      size_weight,
      count_weight,
    );
  }
};

export { fetchTopLanguages };
export default fetchTopLanguages;
