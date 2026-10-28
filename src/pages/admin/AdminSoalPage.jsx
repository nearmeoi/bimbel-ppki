import React, { useState } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { OutlineCard } from '../../components/cards/OutlineCard';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Modal } from '../../components/ui/Modal';
import { Tabs } from '../../components/ui/Tabs';
import { Plus, Search, Trash2, Edit2, Eye } from 'lucide-react';
import defaultQuestions from '../../data/soal.json';
import { useToast } from '../../components/ui/Toast';

/**
 * Bimbel Admin Bank Soal Management with Live Preview Form
 * @param {Object} props
 * @param {Function} props.onNavigate
 */
export const AdminSoalPage = ({ onNavigate }) => {
  const toast = useToast();
  const [questions, setQuestions] = useState(defaultQuestions);
  const [search, setSearch] = useState('');
  const [filterSubject, setFilterSubject] = useState('Semua');
  const [modalOpen, setModalOpen] = useState(false);

  // Form State with Live Preview
  const [formSubject, setFormSubject] = useState('TWK');
  const [formTopic, setFormTopic] = useState('Pancasila & Pilar Negara');
  const [formQuestion, setFormQuestion] = useState('');
  const [formOptions, setFormOptions] = useState([
    'A. Pilihan jawaban satu',
    'B. Pilihan jawaban dua',
    'C. Pilihan jawaban tiga',
    'D. Pilihan jawaban empat',
    'E. Pilihan jawaban lima',
  ]);
  const [formCorrect, setFormCorrect] = useState(0);
  const [formExplanation, setFormExplanation] = useState('');

  const filterTabs = [
    { id: 'Semua', label: 'Semua Soal' },
    { id: 'TWK', label: 'TWK' },
    { id: 'TIU', label: 'TIU' },
    { id: 'TKP', label: 'TKP' },
  ];

  const filtered = questions.filter((q) => {
    const matchFilter = filterSubject === 'Semua' || q.subject === filterSubject;
    const matchSearch =
      q.question.toLowerCase().includes(search.toLowerCase()) ||
      q.topic.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const handleSaveQuestion = (e) => {
    e.preventDefault();
    if (!formQuestion.trim()) {
      toast.error('Pertanyaan soal tidak boleh kosong!');
      return;
    }

    const newQ = {
      id: Date.now(),
      subject: formSubject,
      topic: formTopic,
      question: formQuestion,
      options: formOptions,
      correctAnswer: Number(formCorrect),
      explanation: formExplanation,
    };

    setQuestions([newQ, ...questions]);
    setModalOpen(false);
    toast.success('Soal baru berhasil ditambahkan ke bank soal CAT!');
    // Reset form
    setFormQuestion('');
    setFormExplanation('');
  };

  const handleDelete = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
    toast.info('Soal berhasil dihapus dari sistem.');
  };

  return (
    <AdminLayout currentPath="/admin/soal" onNavigate={onNavigate}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-ink">Bank Soal CAT</h1>
            <p className="text-sm font-medium text-gray-600">
              Kelola butir soal ujian SKD, kunci jawaban, dan pembahasan materi.
            </p>
          </div>
          <Button
            variant="primary"
            leftIcon={<Plus size={18} />}
            onClick={() => setModalOpen(true)}
          >
            Tambah Soal Baru
          </Button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
          <div className="flex-1">
            <Input
              placeholder="Cari kata kunci butir soal atau topik..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search size={18} />}
            />
          </div>
          <Tabs
            items={filterTabs}
            activeTab={filterSubject}
            onChange={setFilterSubject}
            variant="pill"
          />
        </div>

        {/* Questions Table */}
        <OutlineCard className="p-0 overflow-hidden shadow-neo-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm">
              <thead>
                <tr className="bg-surfacelight border-b-2 border-black font-extrabold text-gray-700">
                  <th className="p-4 w-12 text-center">ID</th>
                  <th className="p-4 w-28">Kategori</th>
                  <th className="p-4">Pertanyaan Soal</th>
                  <th className="p-4 w-28 text-center">Kunci</th>
                  <th className="p-4 w-28 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {filtered.map((q, idx) => (
                  <tr key={q.id} className="hover:bg-gray-50">
                    <td className="p-4 text-center font-bold text-gray-400">{idx + 1}</td>
                    <td className="p-4">
                      <Badge variant={q.subject.toLowerCase()}>{q.subject}</Badge>
                      <div className="text-[10px] text-gray-500 font-bold mt-1 truncate max-w-[120px]">
                        {q.topic}
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-ink line-clamp-2">{q.question}</p>
                    </td>
                    <td className="p-4 text-center">
                      <span className="font-extrabold px-2.5 py-1 rounded-md bg-green-100 text-green-800 border border-green-300">
                        {String.fromCharCode(65 + (q.correctAnswer || 0))}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleDelete(q.id)}
                          className="p-1.5 rounded-lg border border-black hover:bg-red-50 text-red-600 transition-colors"
                          title="Hapus Soal"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </OutlineCard>
      </div>

      {/* Form Soal with Live Preview Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Tambah Soal Ujian CAT Baru"
        description="Lengkapi butir pertanyaan, pilihan opsi, kunci, dan pembahasan."
        size="xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          {/* Left Column: Form Fields */}
          <form onSubmit={handleSaveQuestion} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Select
                label="Kategori Modul"
                value={formSubject}
                onChange={(e) => setFormSubject(e.target.value)}
                options={[
                  { value: 'TWK', label: 'TWK (Wawasan Kebangsaan)' },
                  { value: 'TIU', label: 'TIU (Intelegensia Umum)' },
                  { value: 'TKP', label: 'TKP (Karakteristik Pribadi)' },
                ]}
              />
              <Input
                label="Sub-Bab / Topik"
                value={formTopic}
                onChange={(e) => setFormTopic(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-ink mb-1">
                Teks Pertanyaan Soal
              </label>
              <textarea
                rows={4}
                value={formQuestion}
                onChange={(e) => setFormQuestion(e.target.value)}
                placeholder="Tuliskan butir soal ujian di sini..."
                className="w-full border-2 border-black rounded-xl p-3 text-sm font-medium focus:ring-3 focus:ring-accent focus:outline-none"
                required
              />
            </div>

            {/* Options */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-ink">
                Opsi Pilihan (A - E)
              </label>
              {formOptions.map((opt, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="font-extrabold text-xs w-6 text-center">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => {
                      const updated = [...formOptions];
                      updated[i] = e.target.value;
                      setFormOptions(updated);
                    }}
                    className="flex-1 border-2 border-black rounded-lg px-3 py-1.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <input
                    type="radio"
                    name="correctOption"
                    checked={Number(formCorrect) === i}
                    onChange={() => setFormCorrect(i)}
                    title="Pilih sebagai kunci jawaban"
                    className="w-4 h-4 accent-primary cursor-pointer"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-bold text-ink mb-1">
                Pembahasan &amp; Kunci Solusi
              </label>
              <textarea
                rows={3}
                value={formExplanation}
                onChange={(e) => setFormExplanation(e.target.value)}
                placeholder="Jelaskan alasan kunci jawaban benar..."
                className="w-full border-2 border-black rounded-xl p-3 text-xs font-medium focus:ring-3 focus:ring-accent focus:outline-none"
              />
            </div>

            <Button variant="primary" fullWidth type="submit" className="py-3">
              Simpan Soal ke Database
            </Button>
          </form>

          {/* Right Column: Live Preview matching Exam View */}
          <div className="space-y-3 bg-surfacelight p-4 rounded-neo border-2 border-dashed border-black/30">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase text-gray-500">
              <Eye size={16} /> Pratinjau Tampilan Ujian (Live Preview)
            </div>

            <div className="bg-white border-2 border-black rounded-neo p-5 space-y-4 shadow-neo-sm">
              <div className="flex justify-between items-center pb-2 border-b">
                <Badge variant={formSubject.toLowerCase()}>
                  {formSubject} - {formTopic}
                </Badge>
                <span className="text-xs font-extrabold text-gray-500">Pratinjau CAT</span>
              </div>

              <p className="font-bold text-sm text-ink leading-relaxed">
                {formQuestion || 'Contoh butir pertanyaan soal ujian akan ditampilkan langsung di sini...'}
              </p>

              <div className="space-y-2">
                {formOptions.map((opt, i) => (
                  <div
                    key={i}
                    className={`p-2.5 rounded-lg border-2 text-xs font-medium flex items-center gap-2 ${
                      Number(formCorrect) === i
                        ? 'border-primary bg-blue-50 font-bold'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full border border-black flex items-center justify-center text-[10px]">
                      {Number(formCorrect) === i ? '✓' : ''}
                    </div>
                    <span>{opt}</span>
                  </div>
                ))}
              </div>

              {formExplanation && (
                <div className="p-3 rounded-lg bg-blue-50 text-[11px] text-gray-700 border border-primary/20">
                  <strong className="text-primary block mb-0.5">Kunci Jawaban &amp; Solusi:</strong>
                  {formExplanation}
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
};

export default AdminSoalPage;
