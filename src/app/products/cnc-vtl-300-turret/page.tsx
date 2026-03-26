import type { Metadata } from "next";
import ProductDetailsClient from "./product-details-client";
import { getStaticProduct } from "@/lib/static-products";

export const metadata: Metadata = {
  title: "CNC VTL 300 Turret | Sahil Machines",
  description:
    "Discover precision with Sahil Machines' CNC VTL 300 Turret vertical turning lathe. View features, specifications, accessories, and applications.",
};

export default function ProductDetailsPage() {
  const product = getStaticProduct("cnc-vtl-300-turret");
  if (!product) return null;
  return <ProductDetailsClient product={product} />;
}

