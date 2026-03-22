/**
 * Re-export Strapi GraphQL client and request helper.
 * Usage:
 *   import { strapiClient, strapiRequest } from '@/lib/api';
 *   const data = await strapiRequest<{ pages: ... }>(PAGES_QUERY);
 */
export { strapiClient, strapiRequest, STRAPI_MEDIA_BASE, strapiMediaUrl } from "./strapi";
