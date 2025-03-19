
import { useAppContext } from '@/context/AppContext';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pill, Search, ShoppingBag, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import ProductCard from '@/components/UI/ProductCard';

const HomePage = () => {
  const { products } = useAppContext();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredProducts, setFeaturedProducts] = useState([]);
  
  // Extract unique categories
  const categories = [...new Set(products.map(product => product.category))];
  
  useEffect(() => {
    // Pick 4 random products for featured section
    const randomProducts = [...products]
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
    
    setFeaturedProducts(randomProducts);
  }, [products]);
  
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products?search=${searchQuery}`);
  };
  
  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category}`);
  };
  
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-pharma-500 to-pharma-700 text-white py-16 px-4 rounded-xl mb-8">
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Your Health Is Our Priority
          </h1>
          <p className="text-pharma-50 mb-8 text-lg max-w-2xl mx-auto">
            Access quality healthcare products delivered right to your doorstep with our trusted pharmacy service.
          </p>
          
          <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-pharma-700" />
            <Input 
              type="search" 
              placeholder="Search for medicines, healthcare products..." 
              className="w-full pl-10 h-12 text-foreground bg-white border-0 shadow-md focus-visible:ring-pharma-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              type="submit"
              className="absolute right-1 top-1 bg-pharma-600 hover:bg-pharma-700 h-10"
            >
              Search
            </Button>
          </form>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-white"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-white"></div>
          <div className="absolute top-1/2 left-1/3 w-12 h-12 rounded-full bg-white"></div>
        </div>
      </div>
      
      {/* Categories */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Categories</h2>
          <Button variant="ghost" size="sm" className="gap-1 text-pharma-600" onClick={() => navigate('/products')}>
            View All <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {categories.map((category) => (
            <button 
              key={category}
              onClick={() => handleCategoryClick(category)}
              className="flex flex-col items-center justify-center p-4 rounded-lg bg-white border border-border hover:border-pharma-300 hover:shadow-sm transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-pharma-50 flex items-center justify-center mb-3">
                <Pill className="h-6 w-6 text-pharma-600" />
              </div>
              <span className="text-sm font-medium text-center">{category}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Featured Products */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Featured Products</h2>
          <Button variant="ghost" size="sm" className="gap-1 text-pharma-600" onClick={() => navigate('/products')}>
            View All <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      
      {/* Why Choose Us */}
      <div className="mb-12">
        <h2 className="text-xl font-bold mb-6">Why Choose Us</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-4">
                <ShoppingBag className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium text-lg mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground">Get your medicines delivered at your doorstep within hours.</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-pharma-50 flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-pharma-600" />
              </div>
              <h3 className="font-medium text-lg mb-2">Quality Products</h3>
              <p className="text-muted-foreground">All our products are genuine and sourced from authorized distributors.</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mb-4">
                <Pill className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="font-medium text-lg mb-2">Wide Selection</h3>
              <p className="text-muted-foreground">We offer a comprehensive range of medicines and healthcare products.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
