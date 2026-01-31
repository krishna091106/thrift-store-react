import products from "../data/products.json";
import { useSearchParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Products() {
  const [searchParams] = useSearchParams();
  const categoryFromURL = searchParams.get("category");

  const [categories, setCategories] = useState(categoryFromURL ? [categoryFromURL] : ["jeans", "shirts", "tees"]);
  const [price, setPrice] = useState(5000);
  const [showFilters, setShowFilters] = useState(false);
  const [adminItems, setAdminItems] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  // Load admin items
  useEffect(() => {
    const savedItems = localStorage.getItem("adminItems");
    if (savedItems) {
      const items = JSON.parse(savedItems);
      // Filter out sold items and convert to product format
      const activeItems = items
        .filter((item) => !item.sold)
        .map((item) => ({
          ...item,
          images: [item.image],
          source: "admin",
        }));
      setAdminItems(activeItems);
      setAllProducts([...products, ...activeItems]);
    } else {
      setAllProducts(products);
    }
  }, []);

  useEffect(() => {
    if (categoryFromURL) {
      setCategories([categoryFromURL]);
    }
  }, [categoryFromURL]);

  const toggleCategory = (cat) => {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const filteredProducts = allProducts.filter((p) => {
    return (
      (categories.length === 0 || categories.includes(p.category)) &&
      p.price <= price
    );
  });

  return (
    <>
      {/* DESKTOP LAYOUT - SIDE BY SIDE */}
      <div className="hidden md:grid md:grid-cols-4 gap-6 px-10 py-8">
        {/* DESKTOP SIDEBAR FILTERS */}
        <div className="md:col-span-1 bg-black border border-gray-700 rounded-lg p-6 h-fit sticky top-20">
          <h3 className="text-lg font-bold uppercase mb-6 tracking-wider">Filters</h3>

          {/* CATEGORY */}
          <div className="mb-8 pb-8 border-b border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm font-semibold uppercase tracking-wide">Category</p>
              <button
                onClick={() => setCategories(["jeans", "shirts", "tees"])}
                className="text-xs text-gray-500 hover:text-white transition font-medium"
              >
                Reset
              </button>
            </div>
            <div className="space-y-3">
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={categories.length === 3}
                  onChange={() => 
                    categories.length === 3 ? setCategories([]) : setCategories(["jeans", "shirts", "tees"])
                  }
                  className="w-4 h-4 accent-blue-600  bg-black border border-gray-600 rounded"
                />
                <span className="ml-3 text-sm font-semibold">All</span>
              </label>
              {["jeans", "shirts", "tees"].map((cat) => (
                <label key={cat} className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={categories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    className="w-4 h-4 accent-blue-600 bg-black border border-gray-600 rounded"
                  />
                  <span className="ml-3 text-sm">{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                </label>
              ))}
            </div>
          </div>

          {/* PRICE */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm font-semibold uppercase tracking-wide">Price</p>
              <span className="text-sm font-bold bg-gray-800 px-2 py-1 rounded">₹{price}</span>
            </div>
            <input
              type="range"
              min="500"
              max="5000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              style={{
                background: `linear-gradient(to right, #ffffff 0%, #ffffff ${(price - 500) / 45}%, #374151 ${(price - 500) / 45}%, #374151 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-3">
              <span>₹500</span>
              <span>₹5000</span>
            </div>
          </div>
        </div>

        {/* DESKTOP PRODUCTS GRID */}
        <div className="md:col-span-3">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                // Check sold status from JSON file first, then localStorage
                const isSoldInJson = product.active === "sold";
                
                // Also check admin items
                const adminItems = JSON.parse(localStorage.getItem("adminItems") || "[]");
                const adminProduct = adminItems.find(
                  (item) => item.id.toString() === product.id.toString() || 
                           item.name.toLowerCase() === product.name.toLowerCase()
                );
                const isSoldInAdmin = adminProduct?.sold || false;
                
                // Combine both sources - sold if either source says sold
                const isSold = isSoldInJson || isSoldInAdmin;

                return (
                  <Link key={product.id} to={`/product/${product.id}`} className="group relative">
                    <div className={`overflow-hidden rounded-lg bg-gray-900 relative ${isSold ? "opacity-60" : ""}`}>
                      <img
                        src={product.images[0]}
                        className="h-72 w-full object-cover"
                      />
                      {/* Sold Badge */}
                      {isSold && (
                        <div className="absolute top-2 right-2">
                          <span className="px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full">
                            SOLD
                          </span>
                        </div>
                      )}
                    </div>
                    <h4 className="mt-3 text-sm font-medium truncate">{product.name}</h4>
                    <p className="text-gray-400 text-sm">₹{product.price}</p>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center text-gray-400">
              <p className="text-lg">No products found</p>
              <button
                onClick={() => {
                  setCategories(["jeans", "shirts", "tees"]);
                  setPrice(5000);
                }}
                className="mt-4 px-4 py-2 bg-white text-black font-bold rounded hover:bg-gray-200 transition"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE LAYOUT */}
      <div className="md:hidden flex flex-col h-screen">
        {/* MOBILE PRODUCTS GRID */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 mt:gap-4 gap-1.5">
              {filteredProducts.map((product) => {
                // Check sold status from JSON file first, then localStorage
                const isSoldInJson = product.active === "sold";
                
                // Also check admin items
                const adminItems = JSON.parse(localStorage.getItem("adminItems") || "[]");
                const adminProduct = adminItems.find(
                  (item) => item.id.toString() === product.id.toString() || 
                           item.name.toLowerCase() === product.name.toLowerCase()
                );
                const isSoldInAdmin = adminProduct?.sold || false;
                
                // Combine both sources - sold if either source says sold
                const isSold = isSoldInJson || isSoldInAdmin;

                return (
                  <Link key={product.id} to={`/product/${product.id}`} className="group relative">
                    <div className={`overflow-hidden bg-black relative ${isSold ? "opacity-60" : ""}`}>
                      <img
                        src={product.images[0]}
                        className="h-60 w-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {/* Sold Badge */}
                      {isSold && (
                        <div className="absolute top-1 right-1">
                          <span className="px-2 py-0.5 bg-purple-600 text-white text-xs font-bold rounded-full">
                            SOLD
                          </span>
                        </div>
                      )}
                    </div>
                    <h4 className="mt-2 text-xs font-medium truncate">{product.name}</h4>
                    <p className="text-gray-400 text-xs">₹{product.price}</p>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center text-gray-400">
              <p className="text-lg">No products found</p>
              <button
                onClick={() => {
                  setCategories(["jeans", "shirts", "tees"]);
                  setPrice(5000);
                }}
                className="mt-4 px-4 py-2 bg-white text-black font-bold rounded hover:bg-gray-200 transition"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* MOBILE BOTTOM BUTTON */}
        <div className="sticky bottom-0 bg-black border-t border-gray-700 px-4 py-3">
          <button
            onClick={() => setShowFilters(true)}
            className="w-full py-3 px-4 bg-white text-black font-bold text-sm uppercase rounded hover:bg-gray-200 transition"
          >
            Open Filters
          </button>
        </div>
      </div>

      {/* MOBILE FILTER MODAL */}
      {showFilters && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowFilters(false)}
          />
          
          {/* Filter Panel */}
          <div className="absolute inset-0 bg-b overflow-y-auto flex flex-col">
            {/* Header */}
            <div className="sticky top-0 bg-black border-b border-gray-700 px-4 py-4 flex justify-between items-center">
              <h3 className="text-lg font-bold uppercase">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-2xl text-white hover:text-gray-300"
              >
                ✕
              </button>
            </div>

            {/* Filter Content */}
            <div className="flex-1 px-4 py-6 space-y-8">
              {/* CATEGORY */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm font-semibold uppercase tracking-wide">Category</p>
                  <button
                    onClick={() => setCategories(["jeans", "shirts", "tees"])}
                    className="text-xs text-gray-500 hover:text-white transition font-medium"
                  >
                    Reset
                  </button>
                </div>
                <div className="space-y-3">
                  <label className="flex items-center cursor-pointer group p-3 bg-gray-900 rounded hover:bg-gray-800 transition">
                    <input
                      type="checkbox"
                      checked={categories.length === 3}
                      onChange={() => 
                        categories.length === 3 ? setCategories([]) : setCategories(["jeans", "shirts", "tees"])
                      }
                      className="w-5 h-5 accent-blue-600 bg-gray-700 border border-gray-600 rounded"
                    />
                    <span className="ml-3 text-sm font-semibold">All Categories</span>
                  </label>
                  {["jeans", "shirts", "tees"].map((cat) => (
                    <label key={cat} className="flex items-center cursor-pointer group p-3 bg-gray-900 rounded hover:bg-gray-800 transition">
                      <input
                        type="checkbox"
                        checked={categories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="w-5 h-5 accent-blue-600 bg-gray-700 border border-gray-600 rounded"
                      />
                      <span className="ml-3 text-sm">
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* PRICE */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm font-semibold uppercase tracking-wide">Price Range</p>
                  <span className="text-sm font-bold bg-gray-800 px-3 py-1 rounded">₹{price}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="5000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  style={{
                    background: `linear-gradient(to right, #ffffff 0%, #ffffff ${(price - 500) / 45}%, #374151 ${(price - 500) / 45}%, #374151 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-3">
                  <span>₹500</span>
                  <span>₹5000</span>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="bg-black border-t border-gray-700 px-4 py-4 space-y-2">
              <button
                onClick={() => {
                  setCategories(["jeans", "shirts", "tees"]);
                  setPrice(5000);
                }}
                className="w-full py-3 px-4 bg-gray-700 text-white font-bold text-sm uppercase rounded hover:bg-gray-600 transition"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="w-full py-3 px-4 bg-white text-black font-bold text-sm uppercase rounded hover:bg-gray-200 transition"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
