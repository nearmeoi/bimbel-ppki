/**
 * Format date string into Indonesian standard date
 * @param {string|Date} date
 * @returns {string} e.g. "28 Oktober 2026"
 */
export const formatTanggalIndonesia = (date) => {
  if (!date) return '-';
  const d = new Date(date);
  if (isNaN(d.getTime())) return String(date);

  const bulan = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  return `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
};

/**
 * Format seconds into mm:ss format
 * @param {number} totalSeconds
 * @returns {string} e.g. "44:59"
 */
export const formatDurasi = (totalSeconds) => {
  if (totalSeconds == null || totalSeconds < 0) return '00:00';
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

/**
 * Format currency into Indonesian Rupiah format
 * @param {number} amount
 * @returns {string} e.g. "Rp 149.000"
 */
export const formatRupiah = (amount) => {
  if (amount == null) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * SKD CPNS Standard Passing Grades (PermenPANRB)
 */
export const PASSING_GRADES = {
  TWK: 65,
  TIU: 80,
  TKP: 166,
  TOTAL: 311,
};

/**
 * Evaluates SKD exam answers and calculates subject breakdown and pass/fail status
 * @param {Object} answers - { [questionId]: selectedOptionIndex }
 * @param {Array<Object>} questions - Array of questions with subject, correctAnswer / points
 * @returns {Object} result summary
 */
export const evaluateExamSubmission = (answers = {}, questions = []) => {
  let twkScore = 0;
  let tiuScore = 0;
  let tkpScore = 0;

  let twkCount = 0;
  let tiuCount = 0;
  let tkpCount = 0;

  let answeredCount = 0;

  questions.forEach((q) => {
    const selected = answers[q.id];
    const isAnswered = selected !== undefined && selected !== null;

    if (isAnswered) answeredCount++;

    if (q.subject === 'TWK') {
      twkCount++;
      if (isAnswered && selected === q.correctAnswer) {
        twkScore += 5;
      }
    } else if (q.subject === 'TIU') {
      tiuCount++;
      if (isAnswered && selected === q.correctAnswer) {
        tiuScore += 5;
      }
    } else if (q.subject === 'TKP') {
      tkpCount++;
      if (isAnswered && q.optionPoints && q.optionPoints[selected] !== undefined) {
        tkpScore += q.optionPoints[selected];
      } else if (isAnswered) {
        tkpScore += 4; // standard default for TKP if not indexed
      }
    }
  });

  // If questions array is mini (30 questions instead of 110), scale appropriately for display
  const totalScore = twkScore + tiuScore + tkpScore;

  const twkPassed = twkScore >= (twkCount <= 10 ? 25 : PASSING_GRADES.TWK);
  const tiuPassed = tiuScore >= (tiuCount <= 10 ? 30 : PASSING_GRADES.TIU);
  const tkpPassed = tkpScore >= (tkpCount <= 10 ? 35 : PASSING_GRADES.TKP);

  const isLulus = twkPassed && tiuPassed && tkpPassed;

  return {
    totalScore,
    answeredCount,
    totalQuestions: questions.length,
    isLulus,
    subjects: {
      TWK: {
        score: twkScore,
        passingGrade: twkCount <= 10 ? 25 : PASSING_GRADES.TWK,
        passed: twkPassed,
      },
      TIU: {
        score: tiuScore,
        passingGrade: tiuCount <= 10 ? 30 : PASSING_GRADES.TIU,
        passed: tiuPassed,
      },
      TKP: {
        score: tkpScore,
        passingGrade: tkpCount <= 10 ? 35 : PASSING_GRADES.TKP,
        passed: tkpPassed,
      },
    },
  };
};
