import React from 'react';
import { SearchX } from 'lucide-react';
import { Button } from './Button';

/**
 * Neo-brutalist Empty State Component
 * @param {Object} props
 * @param {React.ReactNode} [props.icon]
 * @param {string} [props.title='Data Belum Tersedia']
 * @param {string} [props.description='Belum ada data untuk ditampilkan saat ini.']
 * @param {string} [props.actionLabel]
 * @param {Function} [props.onAction]
 * @param {React.ReactNode} [props.customAction]
 * @param {string} [props.className='']
 */
export const EmptyState = ({
  icon,
  title = 'Data Belum Tersedia',
  description = 'Belum ada data untuk ditampilkan saat ini.',
  actionLabel,
  onAction,
  customAction,
  className = '',
}) => {
  return (
    <div
      className={`border-2 border-black border-dashed rounded-neo p-8 md:p-12 text-center bg-white flex flex-col items-center justify-center gap-4 ${className}`}
    >
      <div className="w-16 h-16 rounded-full bg-accent/40 border-2 border-black flex items-center justify-center text-ink mb-1">
        {icon || <SearchX size={32} strokeWidth={2} />}
      </div>

      <div className="max-w-md space-y-1">
        <h3 className="text-xl font-extrabold text-ink">{title}</h3>
        <p className="text-sm font-medium text-gray-600">{description}</p>
      </div>

      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction} className="mt-2">
          {actionLabel}
        </Button>
      )}

      {customAction && <div className="mt-2">{customAction}</div>}
    </div>
  );
};

export default EmptyState;
