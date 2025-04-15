
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import FeedbackForm from "@/components/feedback/FeedbackForm";
import { CheckCircle } from "lucide-react";

export default function CheckoutSuccess() {
  const { t } = useLanguage();
  
  // In a real app, we would get the order ID from the URL or context
  const orderId = "1234";
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  const handleFeedbackSubmit = (rating: number, comment: string) => {
    // In a real app, we would save the feedback to the backend
    console.log("Feedback submitted:", { orderId, rating, comment });
  };
  
  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4">{t('orderConfirmed')}</h1>
          <p className="text-lg text-gray-600 mb-6">
            Thank you for your order! Your food is being prepared and will be served shortly.
          </p>
          <div className="flex justify-center space-x-4">
            <Button 
              variant="outline"
              className="flex items-center" 
              asChild
            >
              <Link to="/menu">
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-8 mb-12">
          <h2 className="text-xl font-semibold mb-6">{t('orderDetails')}</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Order ID</p>
                <p className="font-medium">{orderId}</p>
              </div>
              <div>
                <p className="text-gray-500">Date</p>
                <p className="font-medium">{new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-500">Status</p>
                <p className="font-medium text-green-600">Confirmed</p>
              </div>
              <div>
                <p className="text-gray-500">Payment</p>
                <p className="font-medium">Completed</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t">
            <h3 className="font-medium mb-4">{t('payment')}</h3>
            <div className="flex items-center bg-green-50 text-green-700 p-3 rounded-md">
              <CheckCircle className="h-5 w-5 mr-2" />
              <p>Payment successful</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-8">
          <h2 className="text-xl font-semibold mb-6">{t('feedback')}</h2>
          <FeedbackForm orderId={orderId} onSubmit={handleFeedbackSubmit} />
        </div>
      </div>
    </Layout>
  );
}
