import React, { useState, useEffect } from 'react';
import { PageShell } from '../components/layout/PageShell';
import { PricingCard } from '../components/cards/PricingCard';
import paketList from '../data/paket.json';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

/**
 * Bimbel Paket Belajar & Membership Screen
 * @param {Object} props
 * @param {Function} props.onNavigate
 */
export const PaketPage = ({ onNavigate }) => {
  // [BACKEND-DYNAMIC]: Sinkronisasi data paket membership aktif & harga promo dari tabel public.paket_langganan
  const [packages, setPackages] = useState(paketList);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    const fetchPackages = async () => {
      try {
        const { data, error } = await supabase
          .from('paket_langganan')
          .select('*');

        if (error) {
          console.warn('Gagal memuat paket dari Supabase:', error);
          return;
        }

        if (data && data.length > 0) {
          setPackages(
            data.map((row) => ({
              id: row.id,
              name: row.name,
              price: row.price,
              originalPrice: row.original_price,
              period: row.period,
              description: row.description,
              popular: row.popular,
              features: Array.isArray(row.features)
                ? row.features
                : JSON.parse(row.features || '[]'),
            }))
          );
        }
      } catch (err) {
        console.warn('Error load packages:', err);
      }
    };

    fetchPackages();
  }, []);

  const handleSelectPackage = (paket) => {
    if (onNavigate) {
      onNavigate(`/paket/checkout?id=${paket.id}`);
    }
  };

  return (
    <PageShell currentPath="/paket" onNavigate={onNavigate}>
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink">
            Pilihan Paket Belajar SKD CPNS 2026
          </h1>
          <p className="text-sm font-medium text-gray-600">
            Investasi terbaik untuk masa depan karier abdi negaramu. Pilih paket yang sesuai dengan target persiapanmu.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 items-stretch">
          {packages.map((p) => (
            <PricingCard
              key={p.id}
              name={p.name}
              price={p.price}
              originalPrice={p.originalPrice}
              period={p.period}
              description={p.description}
              features={p.features}
              popular={p.popular}
              onSelect={() => handleSelectPackage(p)}
            />
          ))}
        </div>
      </div>
    </PageShell>
  );
};

export default PaketPage;
