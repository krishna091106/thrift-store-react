export default function Mission() {
  return (
    <section className="bg-black text-white px-10 py-20 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
        <p className="text-gray-400 mb-6">
          Pair text with an image to focus on your chosen product, collection, or blog post.
        </p>
        <button className="border px-6 py-2 text-sm hover:bg-white hover:text-black">
          Learn More
        </button>
      </div>
      <img src="/bg2.png" className="w-full h-[400px] object-cover" />
    </section>
  );
}
