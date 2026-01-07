import { request } from "../common/http.js";
import { retryer } from "../common/retryer.js";
import { MissingParamError, CustomError } from "../common/error.js";
import { logger } from "../common/log.js";

const GRAPHQL_STREAK_QUERY = `
  query userInfo($login: String!) {
    user(login: $login) {
      createdAt
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

const fetcher = (variables, token) => {
  return request(
    {
      query: GRAPHQL_STREAK_QUERY,
      variables,
    },
    {
      Authorization: `bearer ${token}`,
    },
  );
};

const streakFetcher = async (username) => {
  if (!username) {
    throw new MissingParamError(["username"]);
  }

  const res = await retryer(fetcher, { login: username });

  if (res.data.errors) {
    logger.error(res.data.errors);
    if (res.data.errors[0].type === "NOT_FOUND") {
      throw new CustomError(
        res.data.errors[0].message || "Could not fetch user.",
        CustomError.USER_NOT_FOUND,
      );
    }
    throw new CustomError(
      "Something went wrong while trying to retrieve the streak data.",
      CustomError.GRAPHQL_ERROR,
    );
  }

  const user = res.data.data.user;
  const calendar = user.contributionsCollection.contributionCalendar;

  const days = calendar.weeks.flatMap((week) => week.contributionDays);

  // Calculate streaks
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  // Reverse days to check from most recent backwards for current streak
  // But for longest streak, we can just iterate.

  // CURRENT STREAK
  // We check from the last day.
  // Note: GitHub returns days up to "now".
  // Check if today has contributions.
  // If today has 0, checking yesterday. If yesterday has 0, streak is 0.
  // const today = new Date().toISOString().split('T')[0];
  // const lastDay = days[days.length - 1];

  // If strict mode, we might handle "frozen" streaks, but for now simple logic:
  // If today > 0, streak includes today.
  // If today == 0, but yesterday > 0, streak includes yesterday and is active (but waiting for today).
  // If today == 0 and yesterday == 0, streak is broken (0).

  // However, simpler approach: Iterate backwards counting consecutive non-zero days.
  // Exception: If the VERY LAST day (today) is 0, we treat it as valid if yesterday was > 0.

  let i = days.length - 1;
  // Skip today if count is 0, but don't break streak yet, just move to yesterday
  if (days[i].contributionCount === 0) {
    i--;
  }

  while (i >= 0) {
    if (days[i].contributionCount > 0) {
      currentStreak++;
      i--;
    } else {
      break;
    }
  }

  // LONGEST STREAK
  days.forEach((day) => {
    if (day.contributionCount > 0) {
      tempStreak++;
    } else {
      if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
      }
      tempStreak = 0;
    }
  });
  // Check fast finish
  if (tempStreak > longestStreak) {
    longestStreak = tempStreak;
  }

  return {
    total: calendar.totalContributions,
    currentStreak,
    longestStreak,
  };
};

export { streakFetcher };
export default streakFetcher;
