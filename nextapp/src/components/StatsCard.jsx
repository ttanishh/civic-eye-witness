
export default function StatsCard({ title, value, icon: Icon, change, changeType = 'increase', color = 'blue' }) {
  const colorVariants = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    green: 'bg-green-50 text-green-700 border-green-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    red: 'bg-red-50 text-red-700 border-red-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
    gray: 'bg-gray-50 text-gray-700 border-gray-200',
  };

  const iconBackground = {
    blue: 'bg-blue-100',
    green: 'bg-green-100',
    amber: 'bg-amber-100',
    red: 'bg-red-100',
    purple: 'bg-purple-100',
    gray: 'bg-gray-100',
  };

  const changeColor = changeType === 'increase' ? 'text-green-600' : 'text-red-600';

  return (
    <div className={`rounded-lg border p-4 ${colorVariants[color]}`}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${iconBackground[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      
      <div className="mt-3">
        <p className="text-2xl font-bold">
          {value}
        </p>
        
        {change && (
          <div className="mt-1 flex items-center text-xs">
            <span className={changeColor}>
              {changeType === 'increase' ? '↑' : '↓'} {change}
            </span>
            <span className="ml-1 text-gray-500">vs last month</span>
          </div>
        )}
      </div>
    </div>
  );
}
