import ProductDetail from "./ProductDetail";
import {
  getPopularProducts,
  getLatestProducts,
  getRelatedProducts,
} from "@/app/api/getProducts";

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const cleanSlug = slug?.toLowerCase();

  let allProducts = [];
  let error = null;

  try {
    const [popular, latest, related] = await Promise.all([
      getPopularProducts(),
      getLatestProducts(),
      getRelatedProducts(),
    ]);
    allProducts = [...popular, ...latest, ...related];
  } catch (err) {
    console.error("Error fetching product data:", err);
    error = err;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-700 mb-2">
            Unable to load product
          </h1>
          <p className="text-gray-500">
            Please make sure the backend server is running
          </p>
        </div>
      </div>
    );
  }

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


