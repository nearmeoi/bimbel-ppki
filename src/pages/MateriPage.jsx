import React, { useState } from 'react';
import { PageShell } from '../components/layout/PageShell';
import { OutlineCard } from '../components/cards/OutlineCard';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Tabs } from '../components/ui/Tabs';
import { ProgressBar } from '../components/ui/ProgressBar';
import { EmptyState } from '../components/ui/EmptyState';
import { Search } from 'lucide-react';
import materiList from '../data/materi.json';

/**
 * Bimbel Materi Belajar Catalog Page
 * @param {Object} props
 * @param {Function} props.onNavigate
 */
export const MateriPage = ({ onNavigate }) => {
  const [filter, setFilter] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs = [
    { id: 'Semua', label: 'Semua' },
    { id: 'TWK', label: 'TWK' },
    { id: 'TIU', label: 'TIU' },
    { id: 'TKP', label: 'TKP' },
  ];

  const filteredMateri = materiList.filter((m) => {
    const matchesFilter = filter === 'Semua' || m.type === filter;
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <PageShell currentPath="/materi" onNavigate={onNavigate}>
      <div className="mb-8 space-y-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink">Materi Belajar</h1>
          <p className="text-sm font-medium text-gray-600 mt-1">
            Pelajari modul terstruktur sesuai kisi-kisi resmi BKN untuk TWK, TIU, dan TKP.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
          <div className="flex-1">
            <Input
              placeholder="Cari materi SKD..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={18} />}
            />
          </div>
          <Tabs
            items={filterTabs}
            activeTab={filter}
            onChange={setFilter}
            variant="pill"
          />
        </div>

        {/* Materi Cards Grid */}
        {filteredMateri.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {filteredMateri.map((sub) => (
              <div
                key={sub.id}
                onClick={() => onNavigate && onNavigate(`/materi/${sub.id}`)}
                className="border-2 border-black bg-white rounded-neo p-6 flex flex-col justify-between cursor-pointer hover:-translate-y-1 transition-all duration-150 shadow-neo-sm hover:shadow-neo group"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant={sub.type.toLowerCase()}>{sub.type}</Badge>
                    <span
                      className={`text-xs font-bold ${
                        sub.progress === 100 ? 'text-green-600' : 'text-gray-500'
                      }`}
                    >
                      {sub.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-ink group-hover:text-primary transition-colors leading-snug">
                    {sub.title}
                  </h3>
                  <p className="text-xs text-gray-600 font-medium line-clamp-2 mb-6">
                    {sub.summary}
                  </p>
                </div>

                <div className="pt-2">
                  <ProgressBar
                    value={sub.progress}
                    label="Progres Pembelajaran"
                    showLabel
                    color={sub.progress === 100 ? 'green' : 'primary'}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="Materi Tidak Ditemukan"
            description={`Tidak ada materi yang cocok dengan pencarian "${searchQuery}". Coba kata kunci lain atau pilih tab Semua.`}
            actionLabel="Reset Pencarian"
            onAction={() => {
              setSearchQuery('');
              setFilter('Semua');
            }}
          />
        )}
      </div>
    </PageShell>
  );
};

export default MateriPage;
