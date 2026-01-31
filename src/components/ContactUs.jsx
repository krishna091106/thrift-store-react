export default function ContactUs() {
  return (
    <footer className="bg-[#0b0b0b] text-gray-400 px-8 py-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        
        {/* Left */}
        <div>
          <h2 className="text-2xl text-white mb-6 tracking-wider">
            GET IN TOUCH
          </h2>

          <div className="space-y-4 text-sm">
            <div>
              <p className="text-gray-500">Phone</p>
              <p className="text-white">+91 98765 43210</p>
            </div>

            <div>
              <p className="text-gray-500">Email</p>
              <p className="text-white">support@yourbrand.com</p>
            </div>

            <div>
              <p className="text-gray-500">Address</p>
              <p className="text-white">
                India, Gujrat
              </p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-end justify-end text-xs">
          © 2026 Your Brand. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
