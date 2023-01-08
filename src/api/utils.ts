export function createAuthHeaders() {
  const Authorization = localStorage.getItem("authorization");
  if (Authorization != null) {
    return { Authorization } as const;
  } else {
    return {} as any;
  }
}

export const getBaseUrl = () => {
  if (typeof window === "undefined") {
    return "https://app.divops.kr";
  }

  if (window.location.hostname === "localhost") {
    return "https://app.divops.kr";
  } else if (window.location.hostname === "www.creco.services") {
    return "https://app.divops.kr";
  }
};
