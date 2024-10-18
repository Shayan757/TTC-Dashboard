import { AlertCircle, CheckCircle } from 'lucide-react';

const Badge = ({ type }) => {
  const badgeStyles = {
    base: 'inline-flex items-center text-sm font-semibold px-3 py-1 rounded-full',
    urgent: 'bg-red-100 text-red-600',
    verified: 'bg-green-100 text-green-600',
  };

  return (
    <div className={`
      ${badgeStyles.base} 
      ${type === 'urgent' ? badgeStyles.urgent : badgeStyles.verified}
    `}>
      {type === 'urgent' ? (
        <>
          <AlertCircle className="w-4 h-4 mr-1 text-xs" />
          <span className='text-xs'>Urgent</span> 
        </>
      ) : (
        <>
          <CheckCircle className="w-4 h-4 mr-1 text-xs" />
          <span className='text-xs'>Verified</span>
        </>
      )}
    </div>
  );
};

export default Badge;
