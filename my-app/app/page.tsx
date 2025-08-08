import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageGallery from '../components/ImageGallery';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-5xl font-bold mb-4">Welcome to Our Awesome App!</h1>
            {/* <p className="text-xl mb-8">Your one-stop solution for all your needs.</p> */}
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300">
              Learn More
            </button>
          </div>
        </section>

        {/* Features Section */}
        {/* <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h3 className="text-xl font-semibold mb-4">Feature One</h3>
                <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h3 className="text-xl font-semibold mb-4">Feature Two</h3>
                <p className="text-gray-600">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h3 className="text-xl font-semibold mb-4">Feature Three</h3>
                <p className="text-gray-600">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
              </div>
            </div>
          </div>
        </section> */}

        {/* Image Gallery Section */}
        <ImageGallery />

        {/* The Call to Action section has been removed as per your request. */}

      </main>

      <Footer />
    </div>
  );
}
