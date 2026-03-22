/**
 * Featured products query – same structure as mobile app (Banner.products).
 * Use with strapiRequest<FeaturedProductsResponse>(GET_FEATURED_PRODUCTS).
 */

export const GET_FEATURED_PRODUCTS = /* GraphQL */ `
  query GetFeaturedProducts {
    homePage {
      data {
        id
        attributes {
          Banner {
            products {
              data {
                id
                attributes {
                  Title
                  Slug
                  Tag
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
        }
      }
    }
  }
`;

/** Single featured product (normalized for UI) */
export interface FeaturedProduct {
  id: string;
  title: string;
  slug: string;
  tag: string | null;
  thumbnailUrl: string | null;
  category: { title: string; slug: string } | null;
}

/** Raw GraphQL response shape */
export interface FeaturedProductsResponse {
  homePage?: {
    data?: {
      id?: string;
      attributes?: {
        Banner?: {
          products?: {
            data?: Array<{
              id?: string;
              attributes?: {
                Title?: string;
                Slug?: string;
                Tag?: string | null;
                Thumbnail?: {
                  data?: {
                    attributes?: { url?: string };
                  };
                } | null;
                Category?: {
                  data?: {
                    attributes?: { Title?: string; Slug?: string };
                  };
                } | null;
              };
            }>;
          };
        };
      };
    };
  };
}

/** Map Strapi response to FeaturedProduct[] */
export function mapToFeaturedProducts(
  res: FeaturedProductsResponse | null,
  mediaBaseUrl: string = ""
): FeaturedProduct[] {
  const list =
    res?.homePage?.data?.attributes?.Banner?.products?.data ?? [];
  return list.map((item) => {
    const attrs = item?.attributes;
    const thumbUrl = attrs?.Thumbnail?.data?.attributes?.url;
    const categoryData = attrs?.Category?.data?.attributes;
    return {
      id: item?.id ?? "",
      title: attrs?.Title ?? "",
      slug: attrs?.Slug ?? "",
      tag: attrs?.Tag ?? null,
      thumbnailUrl: thumbUrl
        ? (thumbUrl.startsWith("http") ? thumbUrl : `${mediaBaseUrl}${thumbUrl}`)
        : null,
      category: categoryData
        ? { title: categoryData.Title ?? "", slug: categoryData.Slug ?? "" }
        : null,
    };
  });
}
