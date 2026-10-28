import React, { useState } from 'react';
import { PageShell } from '../components/layout/PageShell';
import { OutlineCard } from '../components/cards/OutlineCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ArrowLeft, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';
import { useExam } from '../context/ExamContext';
import defaultQuestions from '../data/soal.json';

/**
 * Bimbel Review Kunci & Pembahasan Soal Screen
 * @param {Object} props
 * @param {Function} props.onNavigate
 */
export const PembahasanPage = ({ onNavigate }) => {
  const { questions = defaultQuestions, answers } = useExam();
  const [filter, setFilter] = useState('Semua');

  const getQuestionStatus = (q) => {
    const userAns = answers[q.id];
    if (userAns === undefined) return 'kosong';
    if (q.subject === 'TKP') return 'benar'; // TKP all answers have points
    return userAns === q.correctAnswer ? 'benar' : 'salah';
  };

  const filteredQuestions = questions.filter((q) => {
    if (filter === 'Semua') return true;
    return getQuestionStatus(q) === filter.toLowerCase();
  });

  return (
    <PageShell currentPath="/latihan" onNavigate={onNavigate}>
      {/* Top Header */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <button
            onClick={() => onNavigate && onNavigate('/hasil/1')}
            className="flex items-center gap-2 font-bold text-ink mb-2 hover:underline cursor-pointer group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Kembali ke Ringkasan Nilai
          </button>
          <h1 className="text-2xl md:text-3xl font-extrabold text-ink">
            Kunci Jawaban &amp; Pembahasan
          </h1>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2">
          {['Semua', 'Benar', 'Salah'].map((f) => (
            <Button
              key={f}
              size="sm"
              variant={filter === f ? 'primary' : 'secondary'}
              onClick={() => setFilter(f)}
            >
              {f}
            </Button>
          ))}
        </div>
      </div>

      {/* Questions Review List */}
      <div className="space-y-6">
        {filteredQuestions.map((q, idx) => {
          const userAns = answers[q.id];
          const isCorrect = getQuestionStatus(q) === 'benar';

          return (
            <OutlineCard key={q.id} className="space-y-4">
              {/* Question Header */}
              <div className="flex justify-between items-center pb-2 border-b-2 border-gray-100">
                <div className="flex items-center gap-2">
                  <Badge variant={q.subject.toLowerCase()}>{q.subject}</Badge>
                  <span className="font-extrabold text-sm text-ink">
                    Soal No. {idx + 1}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold">
                  {isCorrect ? (
                    <span className="flex items-center gap-1 text-green-700 bg-green-100 px-3 py-1 rounded-full border border-green-300">
                      <CheckCircle2 size={14} /> Jawaban Tepat (+5)
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-700 bg-red-100 px-3 py-1 rounded-full border border-red-300">
                      <XCircle size={14} /> Kurang Tepat (0)
                    </span>
                  )}
                </div>
              </div>

              {/* Question Text */}
              <p className="font-bold text-base md:text-lg text-ink leading-relaxed">
                {q.question}
              </p>

              {/* Options List */}
              <div className="space-y-2">
                {q.options.map((opt, optIdx) => {
                  const isUserChoice = userAns === optIdx;
                  const isKey = q.correctAnswer === optIdx;

                  let styleClass = 'border-gray-200 bg-white';
                  if (isKey) {
                    styleClass = 'border-green-600 bg-green-50 font-bold text-green-950 ring-2 ring-green-600/20';
                  } else if (isUserChoice && !isKey) {
                    styleClass = 'border-red-500 bg-red-50 font-bold text-red-950';
                  }

                  return (
                    <div
                      key={optIdx}
                      className={`p-3 rounded-xl border-2 text-xs md:text-sm flex items-center justify-between ${styleClass}`}
                    >
                      <span>{opt}</span>
                      <div className="flex items-center gap-2">
                        {isUserChoice && (
                          <Badge variant="surface" className="text-[10px]">
                            Jawaban Anda
                          </Badge>
                        )}
                        {isKey && (
                          <Badge variant="success" className="text-[10px]">
                            Kunci Jawaban
                          </Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pembahasan Box */}
              <div className="p-4 rounded-xl bg-blue-50 border-2 border-primary/20 space-y-1.5 mt-2">
                <div className="flex items-center gap-1.5 font-extrabold text-xs text-primary uppercase tracking-wide">
                  <HelpCircle size={14} /> Pembahasan &amp; Solusi:
                </div>
                <p className="text-xs md:text-sm font-medium text-gray-800 leading-relaxed">
                  {q.explanation}
                </p>
              </div>
            </OutlineCard>
          );
        })}
      </div>
    </PageShell>
  );
};

export default PembahasanPage;
