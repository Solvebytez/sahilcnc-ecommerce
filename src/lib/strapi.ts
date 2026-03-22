import { GraphQLClient } from "graphql-request";

// Your .env: NEXT_PUBLIC_STRAPI_URL=https://admin.sahilcnc.com/graphql
const graphqlEndpoint = process.env.NEXT_PUBLIC_STRAPI_URL ?? "";

if (!graphqlEndpoint) {
  console.warn("NEXT_PUBLIC_STRAPI_URL is not set. Strapi API calls will fail.");
}

const headers: HeadersInit = {
  "Content-Type": "application/json",
};
// Server-side only: add API token for protected Strapi content
if (typeof window === "undefined" && process.env.STRAPI_API_KEY) {
  (headers as Record<string, string>)["Authorization"] = `Bearer ${process.env.STRAPI_API_KEY}`;
}

export const strapiClient = new GraphQLClient(graphqlEndpoint, { headers });

/**
 * Run a GraphQL query or mutation against Strapi.
 * Use in Server Components, Route Handlers, or client-side (e.g. in useEffect or server action).
 */
export async function strapiRequest<T>(
  document: string,
  variables?: Record<string, unknown>
): Promise<T> {
  if (!graphqlEndpoint) {
    throw new Error("NEXT_PUBLIC_STRAPI_URL is not configured.");
  }
  return strapiClient.request<T>(document, variables);
}

/** Base URL for Strapi uploads (no /graphql). Use for building full image URLs. */
export const STRAPI_MEDIA_BASE =
  process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/graphql\/?$/, "") ?? "https://admin.sahilcnc.com";

/**
 * Build full URL for Strapi media. Strapi returns relative URLs like /uploads/image.webp
 */
export function strapiMediaUrl(url: string | undefined | null): string {
  if (!url) return "";
  return url.startsWith("http") ? url : `${STRAPI_MEDIA_BASE}${url}`;
}
