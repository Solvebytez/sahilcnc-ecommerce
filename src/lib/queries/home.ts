/**
 * Home page query: banner image, caption text (hero section), and related data.
 * Field names (strapiHomePage, allStrapiHeroSection, etc.) match your provided query.
 * If your Strapi 4 schema differs (e.g. homePage, heroSections), update the query in the playground and paste here.
 */

export const HOME_PAGE_QUERY = /* GraphQL */ `
  query HomePage {
    strapiHomePage {
      seo {
        metaTitle
        metaDescription
        metaImage {
          url
        }
      }
      heroBanner {
        url
        alternativeText
      }
      heroTitle
      heroDescription
    }
    allStrapiHeroSection {
      nodes {
        id
        Title
        Description
      }
    }
    allStrapiBlog(limit: 4, sort: { publishedAt: DESC }) {
      nodes {
        Title
        Slug
        ShortDescription
        category
        Thumbnail {
          url
        }
        publishedAt
      }
    }
    allStrapiPopAvd {
      nodes {
        AdsImage {
          url
        }
        Button {
          Name
          URL
          id
        }
        Descrption
        Heading
        isShowAds
      }
    }
    allStrapiVideoSection {
      nodes {
        SectionTitle
        AddVideos {
          MediaType
          Url
          id
          VideoTitle
          Thumbnail {
            url
          }
        }
      }
    }
  }
`;

/**
 * Strapi 4 schema: homePage, heroSection (per API suggestion).
 * Try (A) with data.attributes first; if it fails, try (B) flat structure in playground.
 */
/**
 * HomePage: seo + hero (lowercase per Strapi schema).
 */
export const BANNER_AND_CAPTION_QUERY = /* GraphQL */ `
  query BannerAndCaption {
    homePage {
      data {
        attributes {
          seo {
            metaTitle
            metaDescription
          }
          hero {
            Title
            Description
            Image {
              data {
                attributes {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;

/** Fallback: if heroSection/homePage don't use data.attributes, use this in playground and paste result here */
export const BANNER_AND_CAPTION_QUERY_FLAT = /* GraphQL */ `
  query BannerAndCaptionFlat {
    heroSection {
      id
      title
      description
    }
    homePage {
      seo {
        metaTitle
        metaDescription
      }
    }
  }
`;

export type HeroSectionNode = {
  id: string;
  Title?: string;
  Description?: string;
  title?: string;
  description?: string;
};

export type HomePageResponse = {
  heroSection?: {
    data: HeroSectionNode | Array<HeroSectionNode> | null;
  };
  homePage?: {
    data?: {
      attributes?: {
        seo?: {
          metaTitle?: string;
          metaDescription?: string;
          metaImage?: { url?: string };
        };
        heroSection?: {
          Title?: string;
          Description?: string;
        };
        hero?:
          | {
              Title?: string;
              Description?: string;
              Image?: {
                data?: {
                  attributes?: { url?: string };
                };
              };
            }
          | Array<{
              Title?: string;
              Description?: string;
              Image?: {
                data?: {
                  attributes?: { url?: string };
                };
              };
            }>;
        heroBanner?: { url?: string; alternativeText?: string };
        heroTitle?: string;
        heroDescription?: string;
      };
    };
  };
  strapiHomePage?: {
    seo?: { metaTitle?: string; metaDescription?: string; metaImage?: { url?: string } };
    heroBanner?: { url?: string; alternativeText?: string };
    heroTitle?: string;
    heroDescription?: string;
  };
  allStrapiHeroSection?: {
    nodes: HeroSectionNode[];
  };
  allStrapiBlog?: {
    nodes: Array<{
      Title?: string;
      Slug?: string;
      ShortDescription?: string;
      category?: string;
      Thumbnail?: { url?: string };
      publishedAt?: string;
    }>;
  };
  allStrapiPopAvd?: {
    nodes: Array<{
      AdsImage?: { url?: string };
      Button?: { Name?: string; URL?: string; id?: string };
      Descrption?: string;
      Heading?: string;
      isShowAds?: boolean;
    }>;
  };
  allStrapiVideoSection?: {
    nodes: Array<{
      SectionTitle?: string;
      AddVideos?: Array<{
        MediaType?: string;
        Url?: string;
        id?: string;
        VideoTitle?: string;
        Thumbnail?: { url?: string };
      }>;
    }>;
  };
};
