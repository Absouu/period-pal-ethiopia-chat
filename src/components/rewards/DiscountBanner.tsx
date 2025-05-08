
import React from "react";
import { Badge } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const DiscountBanner = () => {
  return (
    <div className="bg-gradient-to-r from-green-100 to-primary/10 border border-green-200 rounded-lg p-5 text-center my-5 shadow-sm">
      <div className="flex items-center justify-center mb-3">
        <Badge className="h-6 w-6 text-primary mr-2" />
        <h3 className="text-lg font-medium text-green-700">Rewards Program</h3>
      </div>
      <p className="text-gray-600 mb-4">
        Use your points to get 10% off your next purchase of sustainable products!
      </p>
      <Link to="/products">
        <Button variant="outline" size="sm" className="border-green-500 text-green-600 hover:bg-green-50">
          View Products
        </Button>
      </Link>
    </div>
  );
};

export default DiscountBanner;
