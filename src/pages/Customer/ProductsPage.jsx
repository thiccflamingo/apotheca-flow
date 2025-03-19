
import { useAppContext } from '@/context/AppContext';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Package, 
  X,
  SlidersHorizontal 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ProductCard from '@/components/UI/ProductCard';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from '@/hooks/use-mobile';

const ProductsPage = () => {
  const { products } = useAppContext();
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Parse query parameters
  const queryParams = new URLSearchParams(location.search);
  const initialSearchQuery = queryParams.get('search') || '';
  const initialCategoryFilter = queryParams.get('category') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [categoryFilter, setCategoryFilter] = useState(initialCategoryFilter);
  const [sortOrder, setSortOrder] = useState('name-asc');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [inStockOnly, setInStockOnly] = useState(false);
  
  // Extract unique categories
  const categories = [...new Set(products.map(product => product.category))];
  
  // Apply filters and sorting
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === '' || product.category === categoryFilter;
    
    const matchesPrice = 
      (priceRange.min === '' || product.price >= parseFloat(priceRange.min)) &&
      (priceRange.max === '' || product.price <= parseFloat(priceRange.max));
    
    const matchesStock = !inStockOnly || product.stock > 0;
    
    return matchesSearch && matchesCategory && matchesPrice && matchesStock;
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOrder) {
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      default:
        return 0;
    }
  });
  
  const clearFilters = () => {
    setSearchQuery('');
    setCategoryFilter('');
    setSortOrder('name-asc');
    setPriceRange({ min: '', max: '' });
    setInStockOnly(false);
  };
  
  const hasActiveFilters = () => {
    return (
      searchQuery !== '' || 
      categoryFilter !== '' || 
      priceRange.min !== '' || 
      priceRange.max !== '' || 
      inStockOnly
    );
  };
  
  // Filter component based on screen size (mobile: drawer, desktop: sidebar)
  const renderFilters = () => {
    const filterContent = (
      <div className="space-y-6">
        <div className="space-y-3">
          <h3 className="font-medium">Categories</h3>
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="all-categories" 
                checked={categoryFilter === ''} 
                onCheckedChange={() => setCategoryFilter('')}
              />
              <Label htmlFor="all-categories">All Categories</Label>
            </div>
            
            {categories.map(category => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox 
                  id={`category-${category}`} 
                  checked={categoryFilter === category} 
                  onCheckedChange={() => setCategoryFilter(category)}
                />
                <Label htmlFor={`category-${category}`}>{category}</Label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="font-medium">Price Range</h3>
          <div className="flex items-center space-x-2">
            <Input 
              type="number" 
              placeholder="Min" 
              value={priceRange.min} 
              onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })} 
              className="w-20" 
            />
            <span>to</span>
            <Input 
              type="number" 
              placeholder="Max" 
              value={priceRange.max} 
              onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })} 
              className="w-20" 
            />
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="font-medium">Availability</h3>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="in-stock" 
              checked={inStockOnly} 
              onCheckedChange={setInStockOnly} 
            />
            <Label htmlFor="in-stock">In Stock Only</Label>
          </div>
        </div>
        
        {hasActiveFilters() && (
          <Button 
            variant="outline" 
            onClick={clearFilters} 
            className="w-full"
          >
            <X className="h-4 w-4 mr-2" /> Clear All Filters
          </Button>
        )}
      </div>
    );
    
    if (isMobile) {
      return (
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" className="gap-2 w-full">
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Filters</DrawerTitle>
                <DrawerDescription>
                  Narrow down products by applying filters
                </DrawerDescription>
              </DrawerHeader>
              
              <div className="px-4 pb-4">
                {filterContent}
              </div>
              
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button>Apply Filters</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      );
    }
    
    return (
      <div className="sticky top-24">
        <h2 className="font-semibold text-lg mb-4">Filters</h2>
        {filterContent}
      </div>
    );
  };
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Products</h1>
        <p className="text-muted-foreground">
          Browse our wide selection of pharmaceutical products
        </p>
      </div>
      
      {/* Search and Sort Controls */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <div className="w-full md:w-[200px]">
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger>
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Sort By" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Name A-Z</SelectItem>
              <SelectItem value="name-desc">Name Z-A</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Mobile Filter Button (only shown on mobile) */}
      {isMobile && (
        <div className="mb-4">
          {renderFilters()}
        </div>
      )}
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Desktop Filter Sidebar (only shown on desktop) */}
        {!isMobile && (
          <div className="w-full md:w-64 shrink-0">
            {renderFilters()}
          </div>
        )}
        
        {/* Products Grid */}
        <div className="flex-1">
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-muted/50 p-4 rounded-full mb-4">
                <Package className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria
              </p>
              
              <Button 
                variant="outline" 
                onClick={clearFilters}
                size="sm"
              >
                <X className="h-4 w-4 mr-2" /> Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
