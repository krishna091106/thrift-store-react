import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const items = [
  { img: "/models/model1.jpg" },
  { img: "/models/model2.jpg" },
  { img: "/models/model3.jpg" },
];

export default function RecommendedSlider() {
  const [index, setIndex] = useState(0);

  // Auto slide ONLY for mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="text-white px-6 md:px-10 pt-10 overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-xl md:text-3xl tracking-[0.35em] uppercase text-gray-200">
          You may also like
        </h2>

        <Link
          to="/products"
          className="hidden md:flex items-center gap-2 text-[11px] tracking-widest text-gray-400 hover:text-white transition"
        >
          View catalog
          <span className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-600">
            ↗
          </span>
        </Link>
      </div>

      {/* 🔥 Mobile Slider */}
      <div className="md:hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="min-w-full flex justify-center"
            >
              <img
                src={item.img}
                alt="model"
                className="w-[350px] h-[460px] object-cover"
              />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {items.map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full ${
                index === i ? "bg-white" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>

      {/* 🖥 Desktop Grid */}
      <div className="hidden md:flex justify-center">
        <div className="grid grid-cols-3 gap-4">
          {items.map((item, index) => (
            <div key={index} className="overflow-hidden bg-[#1b1b1b]">
              <img
                src={item.img}
                alt="model"
                className="w-[330px] h-[450px] object-cover"
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
