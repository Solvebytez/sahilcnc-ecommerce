export const PRODUCT_DETAIL_QUERY = /* GraphQL */ `
  query ProductDetailQuery($product: String!, $subCategory: String) {
    product: products(filters: { Slug: { eq: $product } }, pagination: { limit: 1 }) {
      data {
        id
        attributes {
          seo {
            metaTitle
            metaDescription
            canonicalURL
            metaImage {
              data {
                attributes {
                  url
                }
              }
            }
          }
          Title
          Slug
          youtubePlaylist
          Description

          Thumbnail {
            data {
              attributes {
                url
              }
            }
          }

          Brochure {
            data {
              attributes {
                url
                name
              }
            }
          }

          Category {
            data {
              attributes {
                Title
                Slug
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

          Images {
            data {
              id
              attributes {
                url
              }
            }
          }

          DataSheet {
            title
            pdfFile {
              data {
                attributes {
                  url
                }
              }
            }
          }

          Specifications {
            id
            TableHeading
            TableData(pagination: { limit: 500 }) {
              id
              Name
            }
          }

          ComponentsAndAccessories {
            id
            Heading
            Content {
              id
              Title
              List(pagination: { limit: 500 }) {
                id
                Name
              }
            }
          }
        }
      }
    }

    similarProducts: products(
      filters: { Slug: { ne: $product }, Category: { Slug: { eq: $subCategory } } }
      pagination: { limit: 10 }
    ) {
      data {
        id
        attributes {
          Title
          Slug
          Description
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
                Slug
                Category {
                  data {
                    attributes {
                      Slug
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

// Minimal TS shape for the fields we read in Next app.
export type ProductDetailResponse = {
  product?: {
    data?: Array<{
      id?: string | null;
      attributes?: {
        seo?: {
          metaTitle?: string | null;
          metaDescription?: string | null;
          canonicalURL?: string | null;
          metaImage?: { data?: { attributes?: { url?: string | null } | null } | null } | null;
        } | null;
        Title?: string | null;
        Slug?: string | null;
        youtubePlaylist?: string | null;
        Description?: string | null;
        Thumbnail?: { data?: { attributes?: { url?: string | null } | null } | null } | null;
        Brochure?: { data?: { attributes?: { url?: string | null; name?: string | null } | null } | null } | null;
        Category?: {
          data?: {
            attributes?: {
              Title?: string | null;
              Slug?: string | null;
              Category?: {
                data?: { attributes?: { Title?: string | null; Slug?: string | null } | null } | null;
              } | null;
            } | null;
          } | null;
        } | null;
        Images?: {
          data?: Array<{ id?: string | null; attributes?: { url?: string | null } | null } | null> | null;
        } | null;
        DataSheet?: Array<
          | {
              title?: string | null;
              pdfFile?: { data?: { attributes?: { url?: string | null } | null } | null } | null;
            }
          | null
        > | null;
        Specifications?: Array<
          | {
              id?: string | null;
              TableHeading?: string | null;
              TableData?: Array<{ id?: string | null; Name?: string | null } | null> | null;
            }
          | null
        > | null;
        ComponentsAndAccessories?: Array<
          | {
              id?: string | null;
              Heading?: string | null;
              Content?: Array<
                | {
                    id?: string | null;
                    Title?: string | null;
                    List?: Array<{ id?: string | null; Name?: string | null } | null> | null;
                  }
                | null
              > | null;
            }
          | null
        > | null;
      } | null;
    } | null> | null;
  } | null;
  similarProducts?: {
    data?: Array<
      | {
          id?: string | null;
          attributes?: {
            Title?: string | null;
            Slug?: string | null;
            Description?: string | null;
            Thumbnail?: { data?: { attributes?: { url?: string | null } | null } | null } | null;
            Category?: {
              data?: {
                attributes?: {
                  Slug?: string | null;
                  Category?: { data?: { attributes?: { Slug?: string | null } | null } | null } | null;
                } | null;
              } | null;
            } | null;
          } | null;
        }
      | null
    > | null;
  } | null;
};

