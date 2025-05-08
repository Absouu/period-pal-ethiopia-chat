
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag, ChevronLeft, Package } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

// Product data with updated images
const products = [
  {
    id: 1,
    name: "Reusable Menstrual Pads (3-Pack)",
    description: "Washable, eco-friendly cotton pads that provide 8+ hours of protection",
    price: "₦1,500",
    image: "/lovable-uploads/6f5c9105-ba8e-4595-9bdb-1e29fcbf5050.png",
    category: "pads"
  },
  {
    id: 2,
    name: "Menstrual Cup (Small)",
    description: "Medical-grade silicone cup that can be worn for up to 12 hours",
    price: "₦3,000",
    image: "/lovable-uploads/00b8a723-9536-4aa2-b4d5-072d32cde11f.png",
    category: "cups"
  },
  {
    id: 3,
    name: "Menstrual Cup (Large)",
    description: "Medical-grade silicone cup that can be worn for up to 12 hours",
    price: "₦3,200",
    image: "/lovable-uploads/0e255ef6-7c39-4733-94ab-f1787d9521ba.png",
    category: "cups"
  },
  {
    id: 4,
    name: "Disposable Pads (10-Pack)",
    description: "Biodegradable sanitary pads made from organic cotton",
    price: "₦900",
    image: "/lovable-uploads/112e1a19-81ae-4d7a-ad87-924437faffdc.png",
    category: "pads"
  },
  {
    id: 5,
    name: "Period Underwear",
    description: "Absorbent, leak-proof underwear that can replace pads and tampons",
    price: "₦2,500",
    image: "/lovable-uploads/18855015-b6c2-4228-873d-b8b87c9042d7.png",
    category: "underwear"
  }
];

const Products = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { authState } = useAuth();
  const { user } = authState;
  
  const filteredProducts = activeTab === "all" 
    ? products 
    : products.filter(product => product.category === activeTab);

  const handleAddToCart = (productName: string) => {
    toast.success(`Added ${productName} to cart`);
  };

  // Logo component for consistent use throughout the app
  const LilyPadLogo = ({ size = "normal" }) => {
    const sizeClasses = size === "large" ? "w-20 h-20" : size === "small" ? "w-8 h-8" : "w-16 h-16";
    
    return (
      <div className={`${sizeClasses} bg-green-100 rounded-full flex items-center justify-center`}>
        <img 
          src="/lovable-uploads/224c8481-a45b-423a-a589-a856a80dbe5d.png" 
          alt="Lily Pad Logo" 
          className="w-3/4 h-3/4 object-contain"
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-muted py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center relative">
          <Link to="/" className="absolute left-0 top-0">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
          </Link>
          
          <div className="flex items-center justify-center mb-2">
            {/* Lily Pad Logo */}
            <LilyPadLogo />
            <h1 className="text-3xl sm:text-4xl font-bold text-green-600 ml-3">Lily Pad Products</h1>
          </div>
          <p className="text-lg text-gray-600">Quality menstrual products for everyone</p>
        </header>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 animate-fade-in">
          <section className="mb-8 text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <h2 className="text-2xl font-bold text-green-600">About Lily Pad</h2>
              {/* Small Lily Pad Logo */}
              <div className="ml-2">
                <LilyPadLogo size="small" />
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Lily Pad works to provide feminine hygiene products and education to women and girls 
              in low-income areas. Our products are sustainable, affordable, and designed for comfort.
            </p>
          </section>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="all">All Products</TabsTrigger>
              <TabsTrigger value="pads">Pads</TabsTrigger>
              <TabsTrigger value="cups">Cups</TabsTrigger>
              <TabsTrigger value="underwear">Underwear</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="focus:outline-none">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map(product => (
                  <Card key={product.id} className="overflow-hidden flex flex-col">
                    <div className="h-64 overflow-hidden relative bg-gradient-to-br from-green-50 to-white">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-contain transition-transform hover:scale-105"
                      />
                      {/* Lily Pad watermark */}
                      <div className="absolute bottom-2 right-2 bg-white/70 rounded-full px-2 py-1 flex items-center">
                        <img 
                          src="/lovable-uploads/224c8481-a45b-423a-a589-a856a80dbe5d.png" 
                          alt="Lily Pad Logo" 
                          className="w-4 h-4 mr-1"
                        />
                        <span className="text-xs text-green-600 font-semibold">Lily Pad</span>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-green-700">{product.name}</CardTitle>
                      <CardDescription className="font-semibold text-green-600">{product.price}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground">{product.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full bg-green-600 hover:bg-green-700" 
                        onClick={() => handleAddToCart(product.name)}
                      >
                        <ShoppingBag className="mr-2 h-4 w-4" /> Add to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-12 bg-green-50 rounded-lg p-6 border border-green-200">
            <div className="flex items-center mb-4">
              <h3 className="text-xl font-bold text-green-700">Access Free or Subsidized Products</h3>
              <div className="ml-2">
                <LilyPadLogo size="small" />
              </div>
            </div>
            <p className="mb-4">
              Through our partnerships with local organizations, we provide free or subsidized 
              menstrual products to those in need. Contact your local Lily Pad representative or 
              ask Selam for more information.
            </p>
            <Link to="/">
              <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
                Chat with Selam
              </Button>
            </Link>
          </div>
        </div>
        
        <footer className="text-center text-sm text-gray-500">
          <div className="flex items-center justify-center mb-2">
            <img 
              src="/lovable-uploads/224c8481-a45b-423a-a589-a856a80dbe5d.png" 
              alt="Lily Pad Logo" 
              className="w-5 h-5 mr-2"
            />
            <p>© 2025 Period Pal Ethiopia - In partnership with Lily Pad</p>
          </div>
          <p className="mt-1">Your data is securely stored and protected</p>
        </footer>
      </div>
    </div>
  );
};

export default Products;
