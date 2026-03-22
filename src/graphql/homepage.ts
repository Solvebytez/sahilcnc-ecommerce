/**
 * Full homepage GraphQL query (production reference).
 * Sections: seo, Banner, CategorySection, Discover, WorkpieceByIndustriesSection, FAQSection, Clients, FooterContent.
 */

export const HOME_PAGE_QUERY = /* GraphQL */ `
  query HomePage {
    homePage {
      data {
        attributes {
          seo {
            metaTitle
            metaDescription
            keywords
            canonicalURL
            metaImage {
              data {
                attributes {
                  url
                }
              }
            }
          }

          Banner {
            Title
            Description
            Background {
              data {
                attributes {
                  url
                }
              }
            }
            ActionButton {
              Name
              URL
            }
            products(pagination: { limit: 25 }) {
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

          CategorySection {
            Title
            Description
            Categories {
              data {
                attributes {
                  Title
                  Slug
                  PreviewIcon {
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

          Discover {
            Title
            HighlightedText
            ContentBlock1 {
              Title
              Description
              RedirectURL
            }
            ContentBlock2 {
              Title
              Description
              RedirectURL
            }
          }

          WorkpieceByIndustriesSection {
            Title
            Description
            Image {
              data {
                attributes {
                  url
                }
              }
            }
            Industries {
              data {
                attributes {
                  Title
                  Slug
                }
              }
            }
          }

          FAQSection {
            Title
            Description
            faqs {
              data {
                attributes {
                  Question
                  Answer
                }
              }
            }
          }

          Clients {
            data {
              attributes {
                url
              }
            }
          }

          FooterContent
        }
      }
    }
  }
`;

export type HomePageAttributes = {
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string;
    canonicalURL?: string;
    metaImage?: {
      data?: {
        attributes?: { url?: string };
      };
    };
  };
  Banner?: {
    Title?: string;
    Description?: string;
    Background?: {
      data?: {
        attributes?: { url?: string };
      };
    };
    ActionButton?: {
      Name?: string;
      URL?: string;
    };
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
  CategorySection?: {
    Title?: string;
    Description?: string;
    Categories?: {
      data?: Array<{
        attributes?: {
          Title?: string;
          Slug?: string;
          PreviewIcon?: {
            data?: {
              attributes?: { url?: string };
            } | null;
          } | null;
        };
      }>;
    };
  };
  Discover?: {
    Title?: string;
    HighlightedText?: string;
    ContentBlock1?: {
      Title?: string;
      Description?: string;
      RedirectURL?: string;
    };
    ContentBlock2?: {
      Title?: string;
      Description?: string;
      RedirectURL?: string;
    };
  };
  WorkpieceByIndustriesSection?: {
    Title?: string;
    Description?: string;
    Image?: {
      data?: {
        attributes?: { url?: string };
      };
    };
    Industries?: {
      data?: Array<{
        attributes?: { Title?: string; Slug?: string };
      }>;
    };
  };
  FAQSection?: {
    Title?: string;
    Description?: string;
    faqs?: {
      data?: Array<{
        attributes?: { Question?: string; Answer?: string };
      }>;
    };
  };
  Clients?: {
    data?: Array<{
      attributes?: { url?: string };
    }>;
  };
  FooterContent?: unknown;
};

export type HomePageResponse = {
  homePage?: {
    data?: {
      attributes?: HomePageAttributes;
    };
  };
};
