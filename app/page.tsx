import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen text-black bg-gradient-to-b from-white to-gray-50/50 flex flex-col items-center">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:6rem_4rem]" />

      <nav className="flex justify-between items-center w-full max-w-6xl p-6">
        <h1 className="text-2xl font-bold">Assistly - AI Chatbot</h1>
        <ul className="flex space-x-6">
          <li>Features</li>
          <li>Use Cases</li>
          <li>Pricing</li>
          <li>Contact Us</li>
        </ul>
      </nav>

      <section className="flex flex-col items-center text-center mt-16">
        <h2 className="text-5xl font-extrabold bg-black text-transparent bg-clip-text">
          AI Chatbot for Your Business
        </h2>
        <p className="mt-4 text-black max-w-2xl">
          Deploy a customizable AI chatbot for customer service. Train it in
          real time and integrate it seamlessly into your business website.
        </p>

        <div className="mt-6 flex space-x-4">
          <button className="px-6 py-2 bg-black text-white rounded-lg">
            Get Started
          </button>
        </div>
      </section>

      <section className="mt-16 px-6 text-center">
        <h3 className="text-3xl font-semibold mb-8">Why Choose Us?</h3>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="max-w-sm w-full p-6 bg-white border-2 border-gray-300 rounded-lg shadow-lg">
            <h4 className="text-xl font-bold">Instant Support</h4>
            <p className="mt-2 text-gray-600">
              Get immediate assistance with our AI-powered chatbot, available at
              any time.
            </p>
          </div>

          <div className="max-w-sm w-full p-6 bg-white border-2 border-gray-300 rounded-lg shadow-lg">
            <h4 className="text-xl font-bold">Customizable Responses</h4>
            <p className="mt-2 text-gray-600">
              Tailor responses to fit your business needs and tone.
            </p>
          </div>

          <div className="max-w-sm w-full p-6 bg-white border-2 border-gray-300 rounded-lg shadow-lg">
            <h4 className="text-xl font-bold">Seamless Integration</h4>
            <p className="mt-2 text-gray-600">
              Easily integrate the chatbot with your website and other tools.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
