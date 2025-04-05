
import { CheckCircle, Clock, AlertCircle, ArrowRight } from 'lucide-react';

export default function StatusTimeline({ events }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'new':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'in_review':
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
      case 'assigned':
        return <ArrowRight className="h-5 w-5 text-purple-500" />;
      case 'resolved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'closed':
        return <CheckCircle className="h-5 w-5 text-gray-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {events.map((event, eventIdx) => (
          <li key={event.id}>
            <div className="relative pb-8">
              {eventIdx !== events.length - 1 ? (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white bg-white">
                    {getStatusIcon(event.status)}
                  </span>
                </div>
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                  <div>
                    <p className="text-sm text-gray-800">
                      {event.description}
                      {event.officer && (
                        <span className="font-medium text-gray-900"> by {event.officer}</span>
                      )}
                    </p>
                    {event.note && (
                      <p className="mt-1 text-sm text-gray-600 italic">{event.note}</p>
                    )}
                  </div>
                  <div className="text-right text-xs whitespace-nowrap text-gray-500">
                    <time dateTime={event.timestamp}>{formatDate(event.timestamp)}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
