export const backend_url = import.meta.env.VITE_BACKEND_URL;
export const supportedlangs = ["python", "cpp", "javascript"] as const;
export type SupportedLangsType = typeof supportedlangs[number];
