import Link from 'next/link';
import { FiLayers, FiStar, FiDownload } from 'react-icons/fi';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            Mockup Designer
          </Link>
          <div className="space-x-4">
            <Link href="/designer" className="text-gray-700 hover:text-primary">
              Designer
            </Link>
            <Link href="/templates" className="text-gray-700 hover:text-primary">
              Templates
            </Link>
            <Link href="/signin" className="text-gray-700 hover:text-primary">
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Create Stunning Mockups Effortlessly
            </h1>
            <p className="text-xl mb-8">
              Transform your ideas into reality with our easy-to-use mockup designer.
            </p>
            <Link href="/designer" className="btn-primary text-lg px-8 py-3">
              Start Designing
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg text-center">
              <FiLayers className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">User-Friendly</h3>
              <p className="text-gray-600">
                Our intuitive interface makes mockup creation a breeze.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg text-center">
              <FiStar className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">High-Quality Templates</h3>
              <p className="text-gray-600">
                Access a wide range of premium templates.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg text-center">
              <FiDownload className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Flexible Export Options</h3>
              <p className="text-gray-600">
                Download your designs in various formats.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 