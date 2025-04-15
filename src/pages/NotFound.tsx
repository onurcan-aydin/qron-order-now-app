
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

export default function NotFound() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <h1 className="text-9xl font-bold text-gray-200">404</h1>
        <h2 className="text-3xl font-bold mt-4 mb-6">Page Not Found</h2>
        <p className="max-w-md text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="bg-qron-primary hover:bg-qron-primary/90">
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </Layout>
  );
}
