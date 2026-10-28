import React, { useState } from 'react';
import { FocusLayout } from '../components/layout/FocusLayout';
import { OutlineCard } from '../components/cards/OutlineCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { useExam } from '../context/ExamContext';
import { useTimer } from '../hooks/useTimer';
import { useToast } from '../components/ui/Toast';
import { X, Check } from 'lucide-react';

/**
 * Bimbel Focus Exam Pengerjaan Soal Screen
 * @param {Object} props
 * @param {Function} props.onNavigate
 */
export const ExamPage = ({ onNavigate }) => {
  const toast = useToast();
  const {
    questions,
    currentQuestionIndex,
    currentQuestion,
    answers,
    flagged,
    selectAnswer,
    toggleFlag,
    goToQuestion,
    nextQuestion,
    prevQuestion,
    submitExam,
  } = useExam();

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [mobileGridOpen, setMobileGridOpen] = useState(false);

  // 45 minute countdown timer
  const { formattedTime, isWarning } = useTimer({
    initialSeconds: 2700,
    onTimeout: () => {
      toast.error('Waktu ujian habis! Lembar jawaban dikumpulkan otomatis.');
      handleConfirmSubmit();
    },
  });

  const selectedOption = answers[currentQuestion.id];
  const isCurrentFlagged = Boolean(flagged[currentQuestion.id]);

  const handleConfirmSubmit = () => {
    setConfirmModalOpen(false);
    submitExam();
    toast.success('Ujian berhasil dikumpulkan!');
    if (onNavigate) onNavigate('/hasil/1');
  };

  const answeredCount = Object.keys(answers).length;
  const flaggedCount = Object.values(flagged).filter(Boolean).length;

  return (
    <FocusLayout
      title="Simulasi SKD Campuran Set 1"
      formattedTime={formattedTime}
      isTimeWarning={isWarning}
      onFinishExam={() => setConfirmModalOpen(true)}
    >
      <div className="flex flex-col lg:flex-row gap-6 flex-1">
        {/* Main Question Column */}
        <div className="flex-[3] flex flex-col gap-6 justify-between">
          <OutlineCard className="space-y-6">
            {/* Question Header */}
            <div className="flex justify-between items-center pb-2 border-b-2 border-gray-100">
              <Badge variant={currentQuestion.subject.toLowerCase()}>
                {currentQuestion.subject} - {currentQuestion.topic}
              </Badge>
              <span className="font-extrabold text-sm text-gray-500">
                Soal No. {currentQuestionIndex + 1} dari {questions.length}
              </span>
            </div>

            {/* Question Statement */}
            <p className="text-lg md:text-xl font-bold text-ink leading-relaxed">
              {currentQuestion.question}
            </p>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => selectAnswer(currentQuestion.id, idx)}
                    className={`
                      border-2 rounded-xl p-4 cursor-pointer transition-all duration-150 font-medium flex items-center gap-3.5 select-none
                      ${
                        isSelected
                          ? 'border-primary bg-blue-50 text-ink shadow-sm'
                          : 'border-gray-200 hover:border-black bg-white'
                      }
                    `}
                  >
                    <div
                      className={`
                        w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors
                        ${
                          isSelected
                            ? 'border-primary bg-primary text-white'
                            : 'border-gray-400 bg-white'
                        }
                      `}
                    >
                      {isSelected && <Check size={14} strokeWidth={3} />}
                    </div>
                    <span className="text-sm md:text-base leading-snug">{opt}</span>
                  </div>
                );
              })}
            </div>
          </OutlineCard>

          {/* Action Navigation Controls */}
          <div className="flex flex-wrap justify-between items-center gap-3">
            <Button
              variant="secondary"
              disabled={currentQuestionIndex === 0}
              onClick={prevQuestion}
              className="flex-1 md:flex-none min-w-[120px]"
            >
              Sebelumnya
            </Button>
            <Button
              variant={isCurrentFlagged ? 'accent' : 'secondary'}
              onClick={() => toggleFlag(currentQuestion.id)}
              className="flex-1 md:flex-none min-w-[130px]"
            >
              {isCurrentFlagged ? '★ Ditandai Ragu' : 'Tandai Ragu'}
            </Button>
            <Button
              variant="primary"
              disabled={currentQuestionIndex === questions.length - 1}
              onClick={nextQuestion}
              className="flex-1 md:flex-none min-w-[120px]"
            >
              Selanjutnya
            </Button>
          </div>
        </div>

        {/* Desktop Sidebar: Question Number Grid */}
        <div className="flex-1 hidden lg:block">
          <OutlineCard className="sticky top-20 h-[calc(100vh-120px)] flex flex-col">
            <h3 className="font-extrabold text-base mb-3 text-ink">Navigasi Soal</h3>

            {/* Legend */}
            <div className="flex gap-3 mb-4 text-xs font-bold border-b border-gray-100 pb-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 bg-primary rounded border border-black" />
                <span>Dijawab</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 bg-accent rounded border border-black" />
                <span>Ragu</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 bg-white rounded border border-black" />
                <span>Kosong</span>
              </div>
            </div>

            {/* Numbers Grid */}
            <div className="grid grid-cols-5 gap-2 overflow-y-auto pr-1 flex-1">
              {questions.map((q, idx) => {
                const isCurrent = currentQuestionIndex === idx;
                const isAnswered = answers[q.id] !== undefined;
                const isFlag = Boolean(flagged[q.id]);

                let stateClass = 'bg-white text-ink';
                if (isFlag) stateClass = 'bg-accent text-ink';
                else if (isAnswered) stateClass = 'bg-primary text-white';

                return (
                  <button
                    key={q.id}
                    onClick={() => goToQuestion(idx)}
                    className={`
                      h-10 border-2 border-black rounded-lg font-bold text-xs flex items-center justify-center transition-all cursor-pointer
                      ${stateClass}
                      ${isCurrent ? 'ring-4 ring-accent ring-offset-1 border-primary scale-105' : 'hover:-translate-y-0.5'}
                    `}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <Button
              variant="primary"
              fullWidth
              onClick={() => setConfirmModalOpen(true)}
              className="mt-4"
            >
              Kumpulkan Ujian
            </Button>
          </OutlineCard>
        </div>
      </div>

      {/* Mobile Question Grid Toggle Button */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-3 bg-white border-t-2 border-black flex justify-center z-40">
        <Button
          variant="secondary"
          fullWidth
          onClick={() => setMobileGridOpen(true)}
          className="max-w-md shadow-neo"
        >
          Buka Navigasi Soal ({answeredCount}/{questions.length} Terjawab)
        </Button>
      </div>

      {/* Mobile Number Grid Modal Sheet */}
      {mobileGridOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/60 flex items-end justify-center p-0"
          onClick={(e) => {
            if (e.target === e.currentTarget) setMobileGridOpen(false);
          }}
        >
          <div className="bg-white border-t-2 border-black rounded-t-neo-lg w-full max-h-[80vh] p-5 flex flex-col gap-4 animate-in slide-in-from-bottom">
            <div className="flex justify-between items-center pb-2 border-b-2 border-gray-100">
              <h3 className="font-extrabold text-lg text-ink">Daftar Nomor Soal</h3>
              <button
                onClick={() => setMobileGridOpen(false)}
                className="w-8 h-8 rounded-full border border-black flex items-center justify-center"
              >
                <X size={16} />
              </button>
            </div>

            <div className="grid grid-cols-6 gap-2 overflow-y-auto max-h-[50vh] p-1">
              {questions.map((q, idx) => {
                const isCurrent = currentQuestionIndex === idx;
                const isAnswered = answers[q.id] !== undefined;
                const isFlag = Boolean(flagged[q.id]);

                let stateClass = 'bg-white text-ink';
                if (isFlag) stateClass = 'bg-accent text-ink';
                else if (isAnswered) stateClass = 'bg-primary text-white';

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      goToQuestion(idx);
                      setMobileGridOpen(false);
                    }}
                    className={`h-11 border-2 border-black rounded-lg font-bold text-xs flex items-center justify-center ${stateClass} ${
                      isCurrent ? 'border-primary ring-2 ring-primary' : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <Button
              variant="primary"
              fullWidth
              onClick={() => {
                setMobileGridOpen(false);
                setConfirmModalOpen(true);
              }}
            >
              Akhiri &amp; Kumpulkan Jawaban
            </Button>
          </div>
        </div>
      )}

      {/* Confirm Submission Modal */}
      <Modal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        title="Akhiri Ujian Sekarang?"
        description="Periksa kembali kelengkapan lembar jawabanmu sebelum mengirimkannya ke sistem CAT."
        footer={
          <>
            <Button variant="secondary" onClick={() => setConfirmModalOpen(false)}>
              Periksa Kembali
            </Button>
            <Button variant="primary" onClick={handleConfirmSubmit}>
              Kumpulkan Ujian
            </Button>
          </>
        }
      >
        <div className="space-y-3 py-2">
          <div className="flex justify-between items-center p-3.5 rounded-xl bg-surfacelight border border-black/10">
            <span className="font-bold text-sm text-ink">Soal Terjawab</span>
            <span className="font-extrabold text-primary text-base">
              {answeredCount} / {questions.length}
            </span>
          </div>

          <div className="flex justify-between items-center p-3.5 rounded-xl bg-accent/20 border border-black/10">
            <span className="font-bold text-sm text-ink">Soal Ditandai Ragu</span>
            <span className="font-extrabold text-ink text-base">
              {flaggedCount} Soal
            </span>
          </div>

          <div className="flex justify-between items-center p-3.5 rounded-xl bg-red-50 border border-red-200">
            <span className="font-bold text-sm text-red-800">Soal Belum Terjawab</span>
            <span className="font-extrabold text-red-700 text-base">
              {questions.length - answeredCount} Soal
            </span>
          </div>
        </div>
      </Modal>
    </FocusLayout>
  );
};

export default ExamPage;
