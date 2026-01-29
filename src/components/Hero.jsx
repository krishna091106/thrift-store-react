import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative h-[80vh] bg-[url('/hero.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-white text-center">
        <h1 className="text-6xl font-extrabold tracking-widest">
          STYLE<br />VIBE<br />REFLECT
        </h1>
        <p className="mt-4 text-gray-300">Add a little bit of body text</p>
        <Link to="/products" className="mt-6 px-8 py-3 bg-white text-black text-sm tracking-widest hover:bg-gray-200 inline-block">
          SHOP NOW
        </Link>
      </div>
    </section>
  );
}
