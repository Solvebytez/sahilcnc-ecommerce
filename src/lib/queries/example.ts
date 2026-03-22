/**
 * Example Strapi GraphQL queries.
 * Adjust query and types to match your Strapi schema (e.g. from Strapi GraphQL playground).
 */

export const EXAMPLE_PAGES_QUERY = /* GraphQL */ `
  query GetPages {
    pages {
      data {
        id
        attributes {
          title
          slug
          createdAt
        }
      }
    }
  }
`;

export type ExamplePagesResponse = {
  pages: {
    data: Array<{
      id: string;
      attributes: {
        title: string;
        slug: string;
        createdAt: string;
      };
    }>;
  };
};
