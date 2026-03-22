const { GraphQLClient } = require("graphql-request");

async function main() {
  const endpoint = process.env.NEXT_PUBLIC_STRAPI_URL;
  const token = process.env.STRAPI_API_KEY;

  if (!endpoint) {
    console.error("Missing NEXT_PUBLIC_STRAPI_URL in environment.");
    process.exit(1);
  }

  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const client = new GraphQLClient(endpoint, { headers });

  const query = `
    query {
      __type(name: "Query") {
        fields {
          name
        }
      }
    }
  `;

  const data = await client.request(query);
  const fields = data?.__type?.fields?.map((f) => f.name) ?? [];
  const matched = fields.filter((n) => /product|products/i.test(n));
  console.log("Product-related Query fields:");
  for (const name of matched.sort()) console.log("-", name);

  // Also print the closest candidates (sometimes uses different casing)
  const starts = fields.filter((n) => /^allStrapi/i.test(n)).sort();
  console.log("\nAllStrapi* Query fields (first 60):");
  for (const name of starts.slice(0, 60)) console.log("-", name);
}

main().catch((e) => {
  console.error("Introspection failed:", e?.message ?? e);
  process.exit(1);
});

