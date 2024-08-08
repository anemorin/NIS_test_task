import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const apiPath = "https://api.GitHub.com";
const headers = {
  accept: "text/plain",
  "Content-Type": "application/json",
};

const baseQuery = fetchBaseQuery({
  baseUrl: apiPath,
  prepareHeaders: (headers) => {
    headers.set("accept", "application/json");
    headers.set("Content-Type", "application/json");
    // if (token) {
    //   headers.set("Authorization", "Bearer " + token);
    // }

    return headers;
  },
});

const formatDate = (
  date?: Date | null,
  format: string = "YYYY-MM-DD"
): string => {
  if (!date) {
    return "";
  }
  return format
    .replace(/\bDD\b/, date.getDate().toString().padStart(2, "0"))
    .replace(/\bMM\b/, (date.getMonth() + 1).toString().padStart(2, "0"))
    .replace(/\bYYYY\b/, date.getFullYear().toString());
};

const formatSortFields = (sort?: string) => {
  switch (sort) {
    case "updated_at":
      return "updated";
    case "stargazers_count":
      return "stars";
    case "forks_count":
      return "forks";
    default:
      return "";
  }
};

export { apiPath, headers, baseQuery, formatDate, formatSortFields };
