
import React from "react";
import { Badge } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const DiscountBanner = () => {
  return (
    <div className="bg-gradient-to-r from-green-50 to-primary/5 border border-green-100 rounded-lg p-4 text-center my-4">
      <div className="flex items-center justify-center mb-2">
        <Badge className="h-5 w-5 text-primary mr-2" />
        <h3 className="text-lg font-medium text-green-700">Rewards Program</h3>
      </div>
      <p className="text-gray-600 mb-3">
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
