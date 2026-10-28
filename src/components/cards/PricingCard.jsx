import React from 'react';
import { Check, Star } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

/**
 * Bimbel Pricing Package Card Component
 * @param {Object} props
 * @param {string} props.name - Plan name e.g. "Paket Garuda PRO"
 * @param {string} props.price - Price string e.g. "Rp 199.000"
 * @param {string} [props.originalPrice] - Strikethrough price
 * @param {string} [props.period='Akses 6 Bulan']
 * @param {string} [props.description]
 * @param {Array<string>} [props.features=[]]
 * @param {boolean} [props.popular=false]
 * @param {Function} props.onSelect
 * @param {string} [props.buttonText='Pilih Paket Ini']
 * @param {string} [props.className='']
 */
export const PricingCard = ({
  name = 'Paket Pejuang SKD',
  price = 'Rp 149.000',
  originalPrice,
  period = 'Akses 6 Bulan',
  description = 'Solusi lengkap persiapan SKD CPNS dari dasar hingga mahir.',
  features = [],
  popular = false,
  onSelect,
  buttonText = 'Pilih Paket Ini',
  className = '',
}) => {
  return (
    <div
      className={`
        border-2 border-black rounded-neo p-6 md:p-8 flex flex-col relative overflow-hidden transition-all duration-150
        ${
          popular
            ? 'bg-white shadow-neo ring-4 ring-accent/60 -translate-y-1'
            : 'bg-white shadow-neo-sm hover:-translate-y-1'
        }
        ${className}
      `}
    >
      {/* Popular Badge */}
      {popular && (
        <div className="absolute top-0 right-0 bg-accent border-b-2 border-l-2 border-black px-4 py-1.5 rounded-bl-xl font-extrabold text-xs text-ink flex items-center gap-1 shadow-sm">
          <Star size={14} className="fill-black" /> Paling Populer
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-xl md:text-2xl font-extrabold text-ink">{name}</h3>
        {description && (
          <p className="text-xs md:text-sm text-gray-600 mt-1 font-medium">{description}</p>
        )}
      </div>

      {/* Pricing Header */}
      <div className="my-4 pb-4 border-b-2 border-gray-100">
        {originalPrice && (
          <span className="text-xs text-gray-400 line-through font-bold block mb-0.5">
            {originalPrice}
          </span>
        )}
        <div className="flex items-baseline gap-2">
          <span className="text-3xl md:text-4xl font-extrabold text-primary">{price}</span>
          <span className="text-xs font-bold text-gray-500">{period}</span>
        </div>
      </div>

      {/* Features Checklist */}
      <div className="flex-1 space-y-3 mb-8">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
          Fitur Termasuk:
        </p>
        <ul className="space-y-2.5">
          {features.map((feat, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm font-semibold text-gray-800">
              <div className="w-5 h-5 rounded-full bg-green-100 border border-green-500 flex items-center justify-center flex-shrink-0 mt-0.5 text-green-700">
                <Check size={12} strokeWidth={3} />
              </div>
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <Button
        variant={popular ? 'accent' : 'primary'}
        fullWidth
        onClick={onSelect}
        className="text-sm md:text-base"
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default PricingCard;
