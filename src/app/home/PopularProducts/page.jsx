"use client";
import Image from "next/image";
import Link from "next/link";
import ProductModal from "@/components/ui/ProductModal";
import Spinner from "@/components/ui/spinner";
import { useEffect, useState } from "react";
import { IoBagAdd } from "react-icons/io5";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { HiArrowsPointingOut } from "react-icons/hi2";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/app/redux/cartSlice";
import { getPopularProducts } from "@/app/api/getProducts";

export default function PopularProducts() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(null);
  const [openItemId, setOpenItemId] = useState(null);

  const clicked = cartItems
    .filter((item) => item.quantity > 0)
    .map((item) => item.name);

  const selectedProduct = products.find((p) => p._id === openItemId);
  const slugify = (name) => name.toLowerCase().replace(/\s+/g, "-");

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getPopularProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-500 text-lg">Loading products...</p>
      </div>
    );
  }

  return (
    <section className="w-full px-3 sm:px-10 bg-gray-50">
      <div className="max-w-[1456px] py-10 md:py-12 lg:py-16 mx-auto">
        <div className="text-center w-full lg:w-2/5 mx-auto mb-8">
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-800">
            Popular Products for Daily Shopping
          </h2>
          <p className="text-gray-600 mt-2 text-md leading-6">
            See all our popular products in this week. You can choose your daily
            needs products from this list and get some special offer with free
            shipping.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6 gap-2 sm:gap-3 mt-10">
          {products.length > 0 ? (
            products.map((item) => {
              const slug = slugify(item.name);
              const cartItem = cartItems.find((i) => i.name === item.name);
              const quantity = cartItem ? cartItem.quantity : 0;

              return (
                <div
                  key={item._id || item.id}
                  onMouseEnter={() => setHovered(item._id || item.id)}
                  onMouseLeave={() => setHovered(null)}
                  className="relative bg-white rounded-xl border border-gray-100 hover:border-emerald-400 overflow-hidden shadow-[rgba(0,0,0,0.09)_0px_3px_12px] transition-all duration-150"
                >
                  {item.discount && (
                    <span className="absolute top-3 right-3 border border-rose-200 text-rose-500 font-semibold text-[12px] px-2 py-0.5 rounded-full z-10">
                      {item.discount}
                    </span>
                  )}

                  <div className="relative flex justify-center transition-all bg-gray-100">
                    <Link href={`/product/${slug}`}>
                      <Image
                        src={
                          item.image && item.image.trim() !== ""
                            ? item.image
                            : "/assets/placeholder_kvepfp.png"
                        }
                        alt={item.name || "Product image"}
                        width={192}
                        height={192}
                        className={`object-cover p-2 xl:p-0 lg:my-2 cursor-pointer duration-300 transform ${
                          hovered === (item._id || item.id)
                            ? "scale-105"
                            : "scale-100"
                        }`}
                      />
                    </Link>

                    <button
                      onClick={() => setOpenItemId(item._id || item.id)}
                      className={`absolute bottom-4 flex items-center gap-1 bg-white text-gray-700 text-xs px-4 py-2 rounded-full shadow hover:text-emerald-400 hover:bg-gray-50 transition-all duration-150 ease-out transform ${
                        hovered === (item._id || item.id)
                          ? "lg:translate-y-0 lg:opacity-100"
                          : "lg:translate-y-5 lg:opacity-0 lg:pointer-events-none"
                      } translate-y-0 opacity-100 lg:transition-all lg:duration-150 lg:ease-out`}
                    >
                      <HiArrowsPointingOut />
                      <span className="hidden lg:block">Quick View</span>
                    </button>

                    <button
                      onClick={() => dispatch(addToCart(item))}
                      className="absolute bottom-3 right-3 bg-emerald-700 text-white p-2.5 rounded-full shadow-lg hover:bg-emerald-700 transition-all duration-200 border-2 hover:border-emerald-700 border-gray-200"
                    >
                      <IoBagAdd className="text-[20px]" />
                    </button>

                    {clicked.includes(item.name) && (
                      <div className="absolute bottom-2.5 right-2.5 border-2 border-gray-50 bg-emerald-500 text-white flex flex-col items-center rounded-full overflow-hidden">
                        <button
                          onClick={() => dispatch(removeFromCart(item.name))}
                          className="px-3.5 py-1.5 w-full"
                        >
                          <HiOutlineMinus className="text-md font-sans font-medium" />
                        </button>

                        <span className="px-3.5 py-1.5 text-sm font-medium font-sans w-full text-center">
                          {quantity}
                        </span>

                        <button
                          onClick={() => dispatch(addToCart(item))}
                          className="px-3.5 py-1.5 w-full"
                        >
                          <HiPlus className="text-[16px] text-gray-200 mx-auto font-sans font-medium" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="px-4 py-2">
                    <Link href={`/product/${slug}`}>
                      <h4 className="text-sm font-medium text-gray-700 truncate hover:text-emerald-600 cursor-pointer">
                        {item.name}
                      </h4>
                    </Link>

                    <div className="flex items-center mt-1 text-yellow-400">
                      {[1, 2, 3, 4, 5].map((star, i) =>
                        i < Math.round(item.rating) ? (
                          <AiFillStar key={i} className="text-xs" />
                        ) : (
                          <AiOutlineStar key={i} className="text-xs" />
                        )
                      )}
                      <p className="text-gray-400 text-xs ml-2 flex flex-wrap gap-1 font-sans">
                        <span className="font-medium font-sans">
                          {item.rating}
                        </span>
                        ( {item.reviews} reviews )
                      </p>
                    </div>

                    <div className="flex items-center gap-1 my-2">
                      <p className="text-black font-bold text-md font-sans">
                        ${item.price}
                      </p>
                      {item.oldPrice && (
                        <p className="text-gray-400 text-sm mt-0.5">
                          ${item.oldPrice}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full flex justify-center items-center py-20">
              <Spinner />
            </div>
          )}
        </div>

        {openItemId && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setOpenItemId(null)}
          />
        )}
      </div>
    </section>
  );
}
