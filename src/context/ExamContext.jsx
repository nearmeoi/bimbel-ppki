import React, { createContext, useContext, useState, useEffect } from 'react';
import defaultQuestions from '../data/soal.json';
import { evaluateExamSubmission } from '../utils/formatters';

const ExamContext = createContext(null);

export const ExamProvider = ({ children }) => {
  const [questions, setQuestions] = useState(defaultQuestions);
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

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bimbel_exam_answers', JSON.stringify(answers));
      localStorage.setItem('bimbel_exam_flagged', JSON.stringify(flagged));
      localStorage.setItem('bimbel_exam_submitted', String(isSubmitted));
      if (examResult) {
        localStorage.setItem('bimbel_exam_result', JSON.stringify(examResult));
      }
    } catch (e) {
      console.warn('Failed to sync exam state to localStorage', e);
    }
  }, [answers, flagged, isSubmitted, examResult]);

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

  const submitExam = () => {
    const evaluation = evaluateExamSubmission(answers, questions);
    setExamResult(evaluation);
    setIsSubmitted(true);
    return evaluation;
  };

  const resetExam = () => {
    setAnswers({});
    setFlagged({});
    setIsSubmitted(false);
    setExamResult(null);
    setCurrentQuestionIndex(0);
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
        currentQuestionIndex,
        currentQuestion: questions[currentQuestionIndex],
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
