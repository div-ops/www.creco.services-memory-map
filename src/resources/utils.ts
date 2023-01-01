export function createAuthHeaders() {
  const Authorization = localStorage.getItem("authorization");
  if (Authorization != null) {
    return { Authorization } as const;
  } else {
    return {} as any;
  }
}
