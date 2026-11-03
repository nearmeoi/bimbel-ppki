import React, { createContext, useContext, useState, useEffect } from 'react';
import defaultQuestions from '../data/soal.json';
import { evaluateExamSubmission } from '../utils/formatters';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

const ExamContext = createContext(null);

export const ExamProvider = ({ children }) => {
  const [activeSetId, setActiveSetId] = useState(() => {
    try {
      const saved = localStorage.getItem('bimbel_active_set_id');
      return saved ? Number(saved) : 1;
    } catch {
      return 1;
    }
  });

  const [activeSetTitle, setActiveSetTitle] = useState(() => {
    try {
      return localStorage.getItem('bimbel_active_set_title') || 'Simulasi SKD Campuran Set 1';
    } catch {
      return 'Simulasi SKD Campuran Set 1';
    }
  });

  const [questions, setQuestions] = useState(() => {
    try {
      const saved = localStorage.getItem('bimbel_bank_soal');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Gagal membaca bimbel_bank_soal:', e);
    }
    return defaultQuestions;
  });

  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [answers, setAnswers] = useState(() => {
    try {
      const saved = localStorage.getItem('bimbel_exam_answers');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [flagged, setFlagged] = useState(() => {
    try {
      const saved = localStorage.getItem('bimbel_exam_flagged');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [examResult, setExamResult] = useState(() => {
    try {
      const saved = localStorage.getItem('bimbel_exam_result');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isSubmitted, setIsSubmitted] = useState(() => {
    try {
      return localStorage.getItem('bimbel_exam_submitted') === 'true';
    } catch {
      return false;
    }
  });

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bimbel_active_set_id', String(activeSetId));
      localStorage.setItem('bimbel_active_set_title', activeSetTitle);
      localStorage.setItem('bimbel_exam_answers', JSON.stringify(answers));
      localStorage.setItem('bimbel_exam_flagged', JSON.stringify(flagged));
      localStorage.setItem('bimbel_exam_submitted', String(isSubmitted));
      if (examResult) {
        localStorage.setItem('bimbel_exam_result', JSON.stringify(examResult));
      }
    } catch (e) {
      console.warn('Gagal sinkronisasi state ujian ke localStorage:', e);
    }
  }, [activeSetId, activeSetTitle, answers, flagged, isSubmitted, examResult]);

  /**
   * Muat butir soal dinamis berdasarkan ID Simulasi Set dari Supabase
   */
  const loadQuestionsForSet = async (setId = 1, defaultTitle = '') => {
    const numId = Number(setId) || 1;
    setActiveSetId(numId);
    if (defaultTitle) {
      setActiveSetTitle(defaultTitle);
    }

    if (!isSupabaseConfigured) {
      // Fallback lokal
      return;
    }

    setLoadingQuestions(true);
    try {
      // Ambil metadata simulasi set
      const { data: setData } = await supabase
        .from('simulasi_sets')
        .select('*')
        .eq('id', numId)
        .maybeSingle();

      if (setData?.title) {
        setActiveSetTitle(setData.title);
      }

      // Ambil butir soal untuk set ini
      const { data: soalData, error } = await supabase
        .from('soal')
        .select('*')
        .eq('set_id', numId)
        .order('id', { ascending: true });

      if (error) {
        console.warn('Gagal memuat soal set dari Supabase:', error);
      } else if (soalData && soalData.length > 0) {
        const formatted = soalData.map((row) => ({
          id: row.id,
          subject: row.subject,
          topic: row.topic,
          question: row.question,
          options: Array.isArray(row.options) ? row.options : JSON.parse(row.options || '[]'),
          correctAnswer: row.correct_answer ?? 0,
          explanation: row.explanation || '',
        }));
        setQuestions(formatted);
      } else {
        // Jika tidak ada soal khusus set ini di DB, ambil seluruh bank soal yang tersedia
        const { data: allSoal } = await supabase
          .from('soal')
          .select('*')
          .order('id', { ascending: true });

        if (allSoal && allSoal.length > 0) {
          const formatted = allSoal.map((row) => ({
            id: row.id,
            subject: row.subject,
            topic: row.topic,
            question: row.question,
            options: Array.isArray(row.options) ? row.options : JSON.parse(row.options || '[]'),
            correctAnswer: row.correct_answer ?? 0,
            explanation: row.explanation || '',
          }));
          setQuestions(formatted);
        }
      }
    } catch (err) {
      console.warn('Error saat loadQuestionsForSet:', err);
    } finally {
      setLoadingQuestions(false);
    }
  };

  const selectAnswer = (questionId, optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const toggleFlag = (questionId) => {
    setFlagged((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const goToQuestion = (index) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestionIndex(index);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const submitExam = async (userId = null, setId = null) => {
    const effectiveSetId = Number(setId || activeSetId) || 1;
    const evaluation = evaluateExamSubmission(answers, questions);
    setExamResult(evaluation);
    setIsSubmitted(true);

    if (isSupabaseConfigured && userId) {
      try {
        await supabase.from('exam_attempts').insert({
          user_id: userId,
          set_id: effectiveSetId,
          answers,
          flagged,
          twk_score: evaluation.subjects?.TWK?.score || 0,
          tiu_score: evaluation.subjects?.TIU?.score || 0,
          tkp_score: evaluation.subjects?.TKP?.score || 0,
          total_score: evaluation.totalScore || 0,
          is_lulus: evaluation.isLulus || false,
        });
      } catch (err) {
        console.warn('Gagal menyimpan hasil try out ke Supabase:', err);
      }
    }

    return evaluation;
  };

  const resetExam = (newSetId = null, newTitle = '') => {
    setAnswers({});
    setFlagged({});
    setIsSubmitted(false);
    setExamResult(null);
    setCurrentQuestionIndex(0);
    if (newSetId !== null) {
      setActiveSetId(Number(newSetId));
    }
    if (newTitle) {
      setActiveSetTitle(newTitle);
    }
    try {
      localStorage.removeItem('bimbel_exam_answers');
      localStorage.removeItem('bimbel_exam_flagged');
      localStorage.removeItem('bimbel_exam_submitted');
      localStorage.removeItem('bimbel_exam_result');
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <ExamContext.Provider
      value={{
        questions,
        loadingQuestions,
        activeSetId,
        activeSetTitle,
        loadQuestionsForSet,
        currentQuestionIndex,
        currentQuestion: questions[currentQuestionIndex] || questions[0] || {},
        answers,
        flagged,
        isSubmitted,
        examResult,
        selectAnswer,
        toggleFlag,
        goToQuestion,
        nextQuestion,
        prevQuestion,
        submitExam,
        resetExam,
      }}
    >
      {children}
    </ExamContext.Provider>
  );
};

export const useExam = () => {
  const context = useContext(ExamContext);
  if (!context) {
    throw new Error('useExam must be used within an ExamProvider');
  }
  return context;
};

export default ExamContext;
