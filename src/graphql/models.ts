/**
 * Models section query (as provided).
 */
export const MODELS_WE_OFFERS_QUERY = /* GraphQL */ `
  query MyQuery {
    products(pagination: { limit: 16 }) {
      data {
        id
        attributes {
          Title
          Slug
          Thumbnail {
            data {
              attributes {
                url
              }
            }
          }
          Category {
            data {
              attributes {
                Title
                Slug
              }
            }
          }
        }
      }
    }
  }
`;

export type ModelsWeOffersResponse = {
  products?: {
    data?: Array<{
      id?: string;
      attributes?: {
        Title?: string;
        Slug?: string;
        Thumbnail?: {
          data?: {
            attributes?: { url?: string };
          } | null;
        } | null;
        Category?: {
          data?: {
            attributes?: { Title?: string; Slug?: string };
          } | null;
        } | null;
      } | null;
    } | null>;
  } | null;
};

