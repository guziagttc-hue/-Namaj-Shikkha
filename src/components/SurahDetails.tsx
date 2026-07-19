import { ChevronLeft, Book, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SurahDetailsProps {
  setCurrentPage: (page: 'dashboard' | 'wudu-details' | 'surah-details' | 'salah-details' | 'prayer-times' | 'child-salah-education' | 'dua-details') => void;
}

const SURAH_LIST = [
  { id: 1, name: 'সূরা আল-ফাতিহা', text: 'বিসমিল্লাহির রহমানির রহিম। আলহামদু লিল্লাহি রাব্বিল আলামিন। আর রহমানির রহিম। মালিকি ইয়াওমিদ্দিন। ইয়্যাকা না\'বুদু ওয়া ইয়্যাকা নাস্তা\'ইন। ইহদিনাস সিরাতাল মুস্তাকিম। সিরাতাল্লাজিনা আন\'আমতা আলাইহিম, গাইরিল মাগদুবি আলাইহিম ওয়ালাদ্দল্লিন। আমিন।' },
  { id: 2, name: 'সূরা আল-আসর', text: 'বিসমিল্লাহির রহমানির রহিম। ওয়াল আসরি। ইন্নাল ইনসানা লাফি খুসরিন। ইল্লাল্লাজিনা আমানু ওয়া আমিলুস সালিহাতি ওয়া তাওয়াসাও বিল হাক্কি ওয়া তাওয়াসাও বিস সাবর।' },
  { id: 3, name: 'সূরা আল-হামাযাহ', text: 'সূরা আল-হামাযাহ এর পূর্ণ টেক্সট এখানে থাকবে...' },
  { id: 4, name: 'সূরা আল-ফিল', text: 'সূরা আল-ফিল এর পূর্ণ টেক্সট এখানে থাকবে...' },
  { id: 5, name: 'সূরা কুরাইশ', text: 'সূরা কুরাইশ এর পূর্ণ টেক্সট এখানে থাকবে...' },
  { id: 6, name: 'সূরা আল-মাউন', text: 'সূরা আল-মাউন এর পূর্ণ টেক্সট এখানে থাকবে...' },
  { id: 7, name: 'সূরা আল-কাউসার', text: 'সূরা আল-কাউসার এর পূর্ণ টেক্সট এখানে থাকবে...' },
  { id: 8, name: 'সূরা আল-কাফিরুন', text: 'সূরা আল-কাফিরুন এর পূর্ণ টেক্সট এখানে থাকবে...' },
  { id: 9, name: 'সূরা আন-নাসর', text: 'সূরা আন-নাসর এর পূর্ণ টেক্সট এখানে থাকবে...' },
  { id: 10, name: 'সূরা আল-লাহাব', text: 'সূরা আল-লাহাব এর পূর্ণ টেক্সট এখানে থাকবে...' },
  { id: 11, name: 'সূরা আল-ইখলাস', text: 'বিসমিল্লাহির রহমানির রহিম। কুল হুয়াল্লাহু আহাদ। আল্লাহু সামাদ। লাম ইয়ালিদ ওয়া লাম ইউলাদ। ওয়া লাম ইয়াকুল্লাহু কুফুওয়ান আহাদ।' },
  { id: 12, name: 'সূরা আল-ফালাক', text: 'সূরা আল-ফালাক এর পূর্ণ টেক্সট এখানে থাকবে...' },
  { id: 13, name: 'সূরা আন-নাস', text: 'সূরা আন-নাস এর পূর্ণ টেক্সট এখানে থাকবে...' },
  { id: 14, name: 'সূরা আত-তাকাসুর', text: 'সূরা আত-তাকাসুর এর পূর্ণ টেক্সট এখানে থাকবে...' },
  { id: 15, name: 'সূরা আল-কারিআহ', text: 'সূরা আল-কারিআহ এর পূর্ণ টেক্সট এখানে থাকবে...' },
  { id: 16, name: 'সূরা আল-আদিয়াত', text: 'সূরা আল-আদিয়াত এর পূর্ণ টেক্সট এখানে থাকবে...' },
  { id: 17, name: 'সূরা আয-যিলযাল', text: 'সূরা আয-যিলযাল এর পূর্ণ টেক্সট এখানে থাকবে...' },
  { id: 18, name: 'সূরা আল-বাইয়িনাহ', text: 'সূরা আল-বাইয়িনাহ এর পূর্ণ টেক্সট এখানে থাকবে...' },
  { id: 19, name: 'সূরা আল-কদর', text: 'সূরা আল-কদর এর পূর্ণ টেক্সট এখানে থাকবে...' },
  { id: 20, name: 'সূরা আয-যিলযাল (২)', text: 'সূরার পূর্ণ টেক্সট...' },
  { id: 21, name: 'সূরা আদ-দুহা', text: 'সূরার পূর্ণ টেক্সট...' },
  { id: 22, name: 'সূরা আল-ইনশিরাহ', text: 'সূরার পূর্ণ টেক্সট...' },
  { id: 23, name: 'সূরা আত-তীন', text: 'সূরার পূর্ণ টেক্সট...' },
  { id: 24, name: 'সূরা আল-আলাক', text: 'সূরার পূর্ণ টেক্সট...' },
  { id: 25, name: 'সূরা আয-যিলযাল (৩)', text: 'সূরার পূর্ণ টেক্সট...' },
  { id: 26, name: 'সূরা আল-আদিয়াত (২)', text: 'সূরার পূর্ণ টেক্সট...' },
  { id: 27, name: 'সূরা আল-কারিআহ (২)', text: 'সূরার পূর্ণ টেক্সট...' },
  { id: 28, name: 'সূরা আত-তাকাসুর (২)', text: 'সূরার পূর্ণ টেক্সট...' },
  { id: 29, name: 'সূরা আল-আস্র (২)', text: 'সূরার পূর্ণ টেক্সট...' },
  { id: 30, name: 'সূরা আল-মাউন (২)', text: 'সূরার পূর্ণ টেক্সট...' },
  { id: 31, name: 'সূরা আল-কাউসার (২)', text: 'সূরার পূর্ণ টেক্সট...' },
  { id: 32, name: 'সূরা আল-কাফিরুন (২)', text: 'সূরার পূর্ণ টেক্সট...' },
  { id: 33, name: 'সূরা আন-নাসর (২)', text: 'সূরার পূর্ণ টেক্সট...' },
  { id: 34, name: 'সূরা আল-লাহাব (২)', text: 'সূরার পূর্ণ টেক্সট...' },
  { id: 35, name: 'সূরা আল-ইখলাস (২)', text: 'সূরার পূর্ণ টেক্সট...' },
  { id: 36, name: 'সূরা আল-ফালাক (২)', text: 'সূরার পূর্ণ টেক্সট...' },
  { id: 37, name: 'সূরা আন-নাস (২)', text: 'সূরার পূর্ণ টেক্সট...' },
  { id: 38, name: 'সূরা আশ-শামস', text: 'সূরার পূর্ণ টেক্সট...' },
  { id: 39, name: 'সূরা আল-লাইল', text: 'সূরার পূর্ণ টেক্সট...' },
  { id: 40, name: 'সূরা আদ-দুহা (২)', text: 'সূরার পূর্ণ টেক্সট...' },
  { id: 41, name: 'সূরা আল-ইনশিরাহ (২)', text: 'সূরার পূর্ণ টেক্সট...' },
  { id: 42, name: 'সূরা আত-তীন (২)', text: 'সূরার পূর্ণ টেক্সট...' },
  { id: 43, name: 'সূরা আল-আলাক (২)', text: 'সূরার পূর্ণ টেক্সট...' },
  { id: 44, name: 'সূরা আল-কদর (২)', text: 'সূরার পূর্ণ টেক্সট...' },
  { id: 45, name: 'সূরা আল-বাইয়িনাহ (২)', text: 'সূরার পূর্ণ টেক্সট...' },
  { id: 46, name: 'সূরা আল-ফিল (২)', text: 'সূরার পূর্ণ টেক্সট...' },
  { id: 47, name: 'সূরা কুরাইশ (২)', text: 'সূরার পূর্ণ টেক্সট...' },
  { id: 48, name: 'সূরা আল-মাউন (৩)', text: 'সূরার পূর্ণ টেক্সট...' },
  { id: 49, name: 'সূরা আল-কাউসার (৩)', text: 'সূরার পূর্ণ টেক্সট...' },
  { id: 50, name: 'সূরা আল-লাহাব (৩)', text: 'সূরার পূর্ণ টেক্সট...' },
];

export default function SurahDetails({ setCurrentPage }: SurahDetailsProps) {
  const [selectedSurah, setSelectedSurah] = useState<typeof SURAH_LIST[0] | null>(null);

  return (
    <div className="flex-1 flex flex-col bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center border-b border-gray-100 shadow-sm sticky top-0 z-10">
        <button 
          onClick={() => setCurrentPage('dashboard')} 
          className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-2"
        >
          <ChevronLeft className="w-6 h-6 text-[#1c7a7c]" />
        </button>
        <h1 className="text-xl font-bold text-[#1c7a7c]">সূরা ও দোয়া</h1>
      </div>

      {/* Surah List */}
      <div className="p-4 grid grid-cols-1 gap-2">
        {SURAH_LIST.map((surah) => (
          <motion.div
            key={surah.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedSurah(surah)}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer active:bg-gray-50"
          >
            <div className="flex items-center gap-4">
              <div className="bg-[#1c7a7c]/10 text-[#1c7a7c] w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs">
                {surah.id.toString().padStart(2, '0')}
              </div>
              <span className="font-bold text-gray-700">{surah.name}</span>
            </div>
            <Book className="w-4 h-4 text-gray-300" />
          </motion.div>
        ))}
      </div>

      {/* Modal / Popup */}
      <AnimatePresence>
        {selectedSurah && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSurah(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]"
            >
              <div className="bg-[#1c7a7c] p-5 text-white flex justify-between items-center">
                <h3 className="text-lg font-bold">{selectedSurah.name}</h3>
                <button onClick={() => setSelectedSurah(null)} className="p-1 hover:bg-white/20 rounded-full">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto bg-gray-50 flex-1">
                <div className="bg-white p-5 rounded-2xl shadow-inner border border-gray-100">
                  <p className="text-lg text-gray-800 leading-loose text-center font-medium">
                    {selectedSurah.text}
                  </p>
                </div>
                <p className="text-center text-xs text-gray-400 mt-6">আল্লাহ তায়ালা আমাদের সহীহভাবে আমল করার তৌফিক দান করুন। আমিন।</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
