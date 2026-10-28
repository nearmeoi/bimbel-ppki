import React from 'react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

/**
 * Bimbel Try Out Simulation Item Card
 * @param {Object} props
 * @param {number|string} props.setNumber - Simulation set e.g. 1, 2
 * @param {string} [props.category='Try Out Mini']
 * @param {string} props.title - Title e.g. "Simulasi SKD Campuran Set 1"
 * @param {number} [props.questionCount=30]
 * @param {string} [props.duration='45 Menit']
 * @param {string} [props.status='available'] - 'available' | 'completed'
 * @param {number} [props.score]
 * @param {Function} props.onStart
 * @param {string} [props.className='']
 */
export const TryOutItem = ({
  setNumber = 1,
  category = 'Try Out Mini',
  title = 'Simulasi SKD Campuran Set 1',
  questionCount = 30,
  duration = '45 Menit',
  status = 'available',
  score,
  onStart,
  className = '',
}) => {
  const isCompleted = status === 'completed';

  return (
    <div
      className={`
        border-2 border-black bg-white rounded-neo p-6 flex flex-col h-full relative overflow-visible shadow-neo-sm
        hover:-translate-y-1 transition-all duration-150
        ${className}
      `}
    >
      {/* Floating Set Badge */}
      <div className="absolute -top-3.5 -right-3.5 w-12 h-12 bg-accent border-2 border-black rounded-full flex items-center justify-center transform rotate-12 z-10 shadow-neo-sm">
        <span className="font-extrabold text-base md:text-lg text-ink">#{setNumber}</span>
      </div>

      <Badge variant="surface" className="w-max mb-3">
        {category}
      </Badge>

      <h3 className="text-lg md:text-xl font-extrabold mb-3 flex-1 text-ink leading-snug">
        {title}
      </h3>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-2 mb-6">
        <div className="bg-surfacelight border border-black/10 p-2.5 rounded-xl text-center">
          <div className="text-[11px] font-bold text-gray-500 uppercase">Jumlah Soal</div>
          <div className="font-extrabold text-ink text-base md:text-lg">{questionCount}</div>
        </div>
        <div className="bg-surfacelight border border-black/10 p-2.5 rounded-xl text-center">
          <div className="text-[11px] font-bold text-gray-500 uppercase">Durasi</div>
          <div className="font-extrabold text-ink text-base md:text-lg">{duration}</div>
        </div>
      </div>

      {isCompleted ? (
        <div className="space-y-2">
          <div className="flex justify-between items-center px-3 py-1.5 rounded-lg bg-green-50 border border-green-200 text-xs font-bold text-green-700">
            <span>Skor Tercapai:</span>
            <span className="text-sm font-extrabold">{score}</span>
          </div>
          <Button variant="secondary" fullWidth onClick={onStart}>
            Ulangi Simulasi
          </Button>
        </div>
      ) : (
        <Button variant="primary" fullWidth onClick={onStart}>
          Mulai Kerjakan
        </Button>
      )}
    </div>
  );
};

export default TryOutItem;
