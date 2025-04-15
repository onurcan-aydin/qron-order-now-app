
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { QrCode, Utensils, CreditCard, Star } from "lucide-react";

export default function Index() {
  const { t } = useLanguage();

  const features = [
    {
      icon: <QrCode className="h-12 w-12 text-qron-primary" />,
      title: "QR Code Menu Access",
      description: "Scan a QR code to access the digital menu optimized for mobile devices."
    },
    {
      icon: <Utensils className="h-12 w-12 text-qron-primary" />,
      title: "Easy Ordering",
      description: "Browse categories, select items, and place orders with just a few taps."
    },
    {
      icon: <CreditCard className="h-12 w-12 text-qron-primary" />,
      title: "Secure Payments",
      description: "Pay for your order securely online with multiple payment options."
    },
    {
      icon: <Star className="h-12 w-12 text-qron-primary" />,
      title: "Feedback System",
      description: "Rate your experience and provide feedback to help us improve."
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                <span className="text-qron-primary">QRON</span> - QR Code <br />Ordering System
              </h1>
              <p className="text-xl mb-6 text-gray-600 max-w-lg">
                Enhance your dining experience with our innovative QR code ordering and payment solution. 
                No app downloads required!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/menu">
                  <Button className="w-full sm:w-auto bg-qron-primary hover:bg-qron-primary/90 text-white">
                    View Demo Menu
                  </Button>
                </Link>
                <Link to="/admin">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Admin Dashboard
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-qron-secondary rounded-lg -z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=2370&auto=format&fit=crop"
                  alt="Restaurant QR Code"
                  className="rounded-lg shadow-xl w-full"
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-qron-primary rounded-lg -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-center">{feature.title}</h3>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="max-w-3xl mx-auto">
            <ol className="relative border-l border-gray-200">
              <li className="mb-10 ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-qron-primary rounded-full -left-4 ring-4 ring-white text-white">
                  1
                </span>
                <h3 className="flex items-center mb-1 text-lg font-semibold">Scan QR Code</h3>
                <p className="mb-4 text-gray-600">Scan the QR code at your table using your smartphone camera.</p>
              </li>
              <li className="mb-10 ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-qron-primary rounded-full -left-4 ring-4 ring-white text-white">
                  2
                </span>
                <h3 className="flex items-center mb-1 text-lg font-semibold">Browse Menu</h3>
                <p className="mb-4 text-gray-600">Browse the digital menu, view item details, and add items to your cart.</p>
              </li>
              <li className="mb-10 ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-qron-primary rounded-full -left-4 ring-4 ring-white text-white">
                  3
                </span>
                <h3 className="flex items-center mb-1 text-lg font-semibold">Place Order</h3>
                <p className="mb-4 text-gray-600">Review your cart, add special instructions, and place your order.</p>
              </li>
              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-qron-primary rounded-full -left-4 ring-4 ring-white text-white">
                  4
                </span>
                <h3 className="flex items-center mb-1 text-lg font-semibold">Pay & Enjoy</h3>
                <p className="mb-4 text-gray-600">Pay securely online and wait for your delicious food to arrive!</p>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-qron-accent text-white">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to try QRON?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience the future of restaurant ordering with our demo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/menu">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                View Demo Menu
              </Button>
            </Link>
            <Link to="/admin">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white hover:text-qron-accent">
                Try Admin Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
