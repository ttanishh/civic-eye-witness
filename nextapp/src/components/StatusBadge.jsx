
import { Clock, AlertTriangle, CheckCircle, ArrowRight, AlertCircle } from 'lucide-react';

export default function StatusBadge({ status }) {
  const statusConfig = {
    new: {
      label: 'New',
      color: 'bg-amber-100 text-amber-800',
      icon: Clock,
    },
    in_review: {
      label: 'In Review',
      color: 'bg-blue-100 text-blue-800',
      icon: AlertCircle,
    },
    assigned: {
      label: 'Assigned',
      color: 'bg-purple-100 text-purple-800',
      icon: ArrowRight,
    },
    resolved: {
      label: 'Resolved',
      color: 'bg-green-100 text-green-800',
      icon: CheckCircle,
    },
    closed: {
      label: 'Closed',
      color: 'bg-gray-100 text-gray-800',
      icon: AlertTriangle,
    },
  };

  const { label, color, icon: Icon } = statusConfig[status] || statusConfig.new;

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
      <Icon className="h-3 w-3" />
      <span>{label}</span>
    </span>
  );
}
