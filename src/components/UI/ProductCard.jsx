
import { useAppContext } from '@/context/AppContext';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Edit, Trash } from 'lucide-react';

const ProductCard = ({ product, isAdmin = false, onEdit }) => {
  const { addToCart, deleteProduct } = useAppContext();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Card className="hover-scale overflow-hidden h-full flex flex-col">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        {product.stock < 10 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            Low Stock: {product.stock}
          </div>
        )}
      </div>

      <CardContent className="pt-4 flex-1">
        <div className="mb-1">
          <span className="text-xs text-pharma-600 font-medium bg-pharma-50 px-2 py-0.5 rounded-full">
            {product.category}
          </span>
        </div>
        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>
        <div className="mt-2 font-semibold text-lg">${product.price.toFixed(2)}</div>
      </CardContent>

      <CardFooter className="pt-0">
        {isAdmin ? (
          <div className="flex gap-2 w-full">
            <Button
              onClick={() => onEdit(product)}
              variant="outline"
              className="flex-1"
              size="sm"
            >
              <Edit className="h-4 w-4 mr-1" /> Edit
            </Button>
            <Button
              onClick={() => deleteProduct(product.id)}
              variant="outline"
              className="flex-1 text-red-500 hover:text-red-700 hover:bg-red-50"
              size="sm"
            >
              <Trash className="h-4 w-4 mr-1" /> Delete
            </Button>
          </div>
        ) : (
          <Button
            onClick={handleAddToCart}
            className="w-full bg-pharma-500 hover:bg-pharma-600"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
