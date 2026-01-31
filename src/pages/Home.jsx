import Hero from "../components/Hero";
import Mission from "../components/Mission";
import products from "../data/products.json";
import RecommendedSlider from "../components/RecommendedSlider";
import { Link } from "react-router-dom";
import ContactUs from "../components/ContactUs";

const categories = [
  { name: "Jeans", slug: "jeans", image: "img/p1.jpg" },
  { name: "Shirts", slug: "shirts", image: "img/p2.jpg" },
  { name: "Tees", slug: "tees", image: "img/p3.jpg" },
];

export default function Home() {
  const latestProducts = products.slice(-4).reverse();

  return (
    <>
      <Hero />
{/* CATEGORIES */}
      <div className="px-10 pt-16">
        <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar scroll-smooth">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/products?category=${cat.slug}`}
              className="group shrink-0 "
            >
              <div className="relative overflow-hidden rounded-xl  h-20 w-20 md:h-35 md:w-35">
                <img
                  src={cat.image}
                  className="h-full w-full object-cover "
                />
              </div>
              <p className="text-center mt-3 font-semibold">
                {cat.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
      
      {/* NEW DROPS */}
      <div className="px-10 ">
        <h1 className="text-2xl font-bold tracking-widest mb-12 text-center">
          NEW DROPS
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 md:gap-2 gap-1.5">
          {latestProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group"
            >
              <img
                src={product.images?.[0]}
                className="h-50 md:h-90 w-full object-cover"
              />
              <h3 className="mt-4 text-sm">{product.name}</h3>
              <p className="text-gray-400 text-sm">₹{product.price}</p>
            </Link>
          ))}
        </div>
      </div>
        <RecommendedSlider />
      <Mission />
      <ContactUs/>
    </>
  );
}
