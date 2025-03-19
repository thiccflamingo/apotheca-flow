
import { Card, CardContent } from '@/components/ui/card';

const StatsCard = ({ title, value, icon: Icon, trend = null, className = '' }) => {
  return (
    <Card className={`hover:shadow-md transition-shadow ${className}`}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-muted-foreground text-sm font-medium">{title}</p>
            <h4 className="text-2xl font-bold mt-1">{value}</h4>
            
            {trend && (
              <div className="flex items-center mt-2">
                <span 
                  className={`text-xs font-medium ${
                    trend.direction === 'up' 
                      ? 'text-green-600' 
                      : trend.direction === 'down' 
                        ? 'text-red-600' 
                        : 'text-gray-600'
                  }`}
                >
                  {trend.value}
                </span>
                <span className="text-xs text-muted-foreground ml-1">
                  {trend.label}
                </span>
              </div>
            )}
          </div>
          
          <div className="bg-pharma-100 p-3 rounded-full">
            <Icon className="h-6 w-6 text-pharma-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
