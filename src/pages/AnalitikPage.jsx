import React from 'react';
import { PageShell } from '../components/layout/PageShell';
import { OutlineCard } from '../components/cards/OutlineCard';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/cards/StatCard';
import analitikData from '../data/analitik.json';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { AlertCircle, Target, Award, TrendingUp } from 'lucide-react';

/**
 * Bimbel Analitik Nilai & Diagnosa Kelemahan Screen
 * @param {Object} props
 * @param {Function} props.onNavigate
 */
export const AnalitikPage = ({ onNavigate }) => {
  const { summary, scoreHistory, subjectPerformance, weakTopics } = analitikData;

  return (
    <PageShell currentPath="/analitik" onNavigate={onNavigate}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink">Analitik &amp; Performa</h1>
          <p className="text-sm font-medium text-gray-600 mt-1">
            Pantau perkembangan skor berkala, pemenuhan passing grade, dan peta kelemahan sub-materi.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard value={summary.averageScore} label="Rata-rata Skor" />
          <StatCard value={summary.targetScore} label="Target Skor Anda" />
          <StatCard value={summary.highestScore} label="Skor Tertinggi" />
          <StatCard value={summary.passingRate} label="Tingkat Kelulusan PG" />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Progress Over Time (Line Chart) */}
          <OutlineCard className="space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp size={20} className="text-primary" />
              <h2 className="text-lg md:text-xl font-extrabold text-ink">
                Tren Nilai Total per Batch
              </h2>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={scoreHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="batch" stroke="#374151" fontSize={12} fontStyle="bold" />
                  <YAxis domain={[250, 480]} stroke="#374151" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      border: '2px solid #000000',
                      borderRadius: '12px',
                      fontWeight: 'bold',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Total"
                    stroke="#2239E5"
                    strokeWidth={3}
                    dot={{ fill: '#F9FF33', stroke: '#000000', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </OutlineCard>

          {/* Subject Comparison (Bar Chart) */}
          <OutlineCard className="space-y-4">
            <div className="flex items-center gap-2">
              <Target size={20} className="text-primary" />
              <h2 className="text-lg md:text-xl font-extrabold text-ink">
                Skor Anda vs Passing Grade
              </h2>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="subject" stroke="#374151" fontSize={12} fontStyle="bold" />
                  <YAxis domain={[0, 200]} stroke="#374151" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      border: '2px solid #000000',
                      borderRadius: '12px',
                      fontWeight: 'bold',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="user" fill="#2239E5" name="Nilai Anda" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="passingGrade" fill="#F9FF33" stroke="#000000" strokeWidth={1} name="Passing Grade" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </OutlineCard>
        </div>

        {/* Diagnosa Topik Lemah */}
        <OutlineCard className="space-y-4">
          <div className="flex items-center gap-2">
            <AlertCircle size={20} className="text-red-500" />
            <h2 className="text-xl font-extrabold text-ink">
              Rekomendasi Pembenahan Sub-Bab Lemah
            </h2>
          </div>
          <p className="text-xs md:text-sm font-medium text-gray-600">
            Berdasarkan analisis algoritma pintar, materi di bawah ini memiliki tingkat akurasi paling rendah dan disarankan untuk dipelajari ulang:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surfacelight border-b-2 border-black text-xs font-extrabold text-ink">
                  <th className="p-3.5">Modul</th>
                  <th className="p-3.5">Nama Sub-Bab</th>
                  <th className="p-3.5 text-center">Akurasi Jawaban</th>
                  <th className="p-3.5 text-center">Prioritas</th>
                </tr>
              </thead>
              <tbody>
                {weakTopics.map((item, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-100 hover:bg-gray-50 text-xs md:text-sm font-medium text-ink"
                  >
                    <td className="p-3.5 font-bold">
                      <Badge variant={item.subject.toLowerCase()}>{item.subject}</Badge>
                    </td>
                    <td className="p-3.5 font-bold">{item.topic}</td>
                    <td className="p-3.5 text-center font-extrabold text-red-600">
                      {item.accuracy}
                    </td>
                    <td className="p-3.5 text-center">
                      <Badge
                        variant={
                          item.priority === 'Tinggi'
                            ? 'danger'
                            : item.priority === 'Sedang'
                            ? 'warning'
                            : 'surface'
                        }
                      >
                        {item.priority}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </OutlineCard>
      </div>
    </PageShell>
  );
};

export default AnalitikPage;
