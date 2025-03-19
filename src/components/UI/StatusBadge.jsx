
import { Badge } from "@/components/ui/badge";

const StatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200';
      case 'assigned':
        return 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200';
      case 'in-transit':
        return 'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200';
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'assigned':
        return 'Assigned';
      case 'in-transit':
        return 'In Transit';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  return (
    <Badge className={`font-medium ${getStatusStyles()}`} variant="outline">
      {getStatusLabel()}
    </Badge>
  );
};

export default StatusBadge;
