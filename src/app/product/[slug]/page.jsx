import ProductDetail from "./ProductDetail";
import {
  getPopularProducts,
  getLatestProducts,
  getRelatedProducts,
} from "@/app/api/getProducts";

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const cleanSlug = slug?.toLowerCase();

  const [popular, latest, related] = await Promise.all([
    getPopularProducts(),
    getLatestProducts(),
    getRelatedProducts(),
  ]);

  const allProducts = [...popular, ...latest, ...related];

  const product = allProducts.find(
    (item) => item.name.toLowerCase().replace(/\s+/g, "-") === cleanSlug
  );

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-semibold text-gray-700">
          Product not found
        </h1>
      </div>
    );
  }

  return <ProductDetail product={product} />;
}

export async function generateStaticParams() {
  const [popular, latest, related] = await Promise.all([
    getPopularProducts(),
    getLatestProducts(),
    getRelatedProducts(),
  ]);
  const allProducts = [...popular, ...latest, ...related];
  return allProducts.map((item) => ({
    slug: item.name.toLowerCase().replace(/\s+/g, "-"),
  }));
}
