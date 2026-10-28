import React from 'react';

/**
 * Neo-brutalist Accessible Tabs Component
 * @param {Object} props
 * @param {Array<{id: string, label: string, icon?: React.ReactNode, count?: number}>} props.items
 * @param {string} props.activeTab
 * @param {Function} props.onChange
 * @param {'pill' | 'underline'} [props.variant='pill']
 * @param {string} [props.className='']
 */
export const Tabs = ({
  items = [],
  activeTab,
  onChange,
  variant = 'pill',
  className = '',
}) => {
  if (variant === 'underline') {
    return (
      <div
        role="tablist"
        className={`flex gap-6 border-b-2 border-gray-200 overflow-x-auto no-scrollbar ${className}`}
      >
        {items.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(item.id)}
              className={`
                flex items-center gap-2 pb-3 font-bold text-sm md:text-base whitespace-nowrap transition-all duration-150 relative cursor-pointer
                ${
                  isActive
                    ? 'text-primary border-b-4 border-primary -mb-[2px]'
                    : 'text-gray-500 hover:text-black'
                }
              `}
            >
              {item.icon && <span>{item.icon}</span>}
              <span>{item.label}</span>
              {item.count !== undefined && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-primary/10 text-primary' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // Default 'pill' variant
  return (
    <div
      role="tablist"
      className={`flex gap-2 overflow-x-auto pb-1 md:pb-0 no-scrollbar items-center ${className}`}
    >
      {items.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(item.id)}
            className={`
              font-bold rounded-full border-2 border-black px-5 py-2 text-sm transition-all duration-150
              flex items-center gap-2 cursor-pointer whitespace-nowrap active:scale-95 select-none
              ${
                isActive
                  ? 'bg-primary text-white shadow-neo-sm'
                  : 'bg-white text-black hover:bg-gray-100 shadow-neo-sm'
              }
            `}
          >
            {item.icon && <span>{item.icon}</span>}
            <span>{item.label}</span>
            {item.count !== undefined && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-surfacelight text-black'
                }`}
              >
                {item.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
