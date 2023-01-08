import { getBaseUrl } from "./utils";

export const login = () => {
  location.assign(
    `${getBaseUrl()}/github-api/request?referrer=${location.href}`
  );
};
