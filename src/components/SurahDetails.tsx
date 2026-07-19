import { ChevronLeft, Book, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SurahDetailsProps {
  setCurrentPage: (page: 'dashboard' | 'wudu-details' | 'surah-details' | 'salah-details' | 'prayer-times' | 'child-salah-education' | 'dua-details') => void;
}

const SURAH_LIST = [
  {
    id: 1,
    name: 'সূরা আল-ফাতিহা',
    arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\nالْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ\nالرَّحْمَٰنِ الرَّحِيمِ\nمَالِكِ يَوْمِ الدِّينِ\nإِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ\nاهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ\nصِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
    transliteration: '১. বিসমিল্লাহির রহমানির রহিম।\n২. আলহামদু লিল্লাহি রব্বিল আ\'লামিন।\n৩. আর-রহমানির রহিম।\n৪. মালিকি ইয়াওমিদ্দিন।\n৫. ইয়্যাকানা\' বুদু ওয়া ইয়্যাকানাছতা\'ইন।\n৬. ইহদিনাছ ছিরাত্বাল মুছতাক্বিম।\n৭. ছিরাত্বাল্লাজিনা আনআ\'মতা আলাইহিম, গইরিল মাগদ্বুবি আলাইহিম ওয়ালাদ্ব দ্ব-ল্লিন। (আমীন)',
    meaning: '১. পরম করুণাময় অসীম দয়ালু আল্লাহর নামে (শুরু করছি)।\n২. যাবতীয় প্রশংসা জগৎসমূহের প্রতিপালক আল্লাহরই জন্য।\n৩. তিনি পরম করুণাময়, অতি দয়ালু।\n৪. তিনি বিচার দিবসের মালিক।\n৫. আমরা একমাত্র আপনারই ইবাদত করি এবং একমাত্র আপনারই কাছে সাহায্য চাই।\n৬. আমাদের সরল-সঠিক পথ প্রদর্শন করুন।\n৭. তাদের পথ, যাদের আপনি নিয়ামত দান করেছেন; তাদের পথ নয় যারা ক্রোধে পতিত হয়েছে এবং যারা পথভ্রষ্ট হয়েছে।'
  },
  { id: 2, name: 'সূরা আল-আসর', arabic: '', transliteration: '', meaning: '' },
  { id: 3, name: 'সূরা আল-হামাযাহ', arabic: '', transliteration: '', meaning: '' },
  { id: 4, name: 'সূরা আল-ফিল', arabic: '', transliteration: '', meaning: '' },
  { id: 5, name: 'সূরা কুরাইশ', arabic: '', transliteration: '', meaning: '' },
  { id: 6, name: 'সূরা আল-মাউন', arabic: '', transliteration: '', meaning: '' },
  { id: 7, name: 'সূরা আল-কাউসার', arabic: '', transliteration: '', meaning: '' },
  { id: 8, name: 'সূরা আল-কাফিরুন', arabic: '', transliteration: '', meaning: '' },
  { id: 9, name: 'সূরা আন-নাসর', arabic: '', transliteration: '', meaning: '' },
  { id: 10, name: 'সূরা আল-লাহাব', arabic: '', transliteration: '', meaning: '' },
  { id: 11, name: 'সূরা আল-ইখলাস', arabic: '', transliteration: '', meaning: '' },
  { id: 12, name: 'সূরা আল-ফালাক', arabic: '', transliteration: '', meaning: '' },
  { id: 13, name: 'সূরা আন-নাস', arabic: '', transliteration: '', meaning: '' },
  { id: 14, name: 'সূরা আত-তাকাসুর', arabic: '', transliteration: '', meaning: '' },
  { id: 15, name: 'সূরা আল-কারিআহ', arabic: '', transliteration: '', meaning: '' },
  { id: 16, name: 'সূরা আল-আদিয়াত', arabic: '', transliteration: '', meaning: '' },
  { id: 17, name: 'সূরা আয-যিলযাল', arabic: '', transliteration: '', meaning: '' },
  { id: 18, name: 'সূরা আল-বাইয়িনাহ', arabic: '', transliteration: '', meaning: '' },
  { id: 19, name: 'সূরা আল-কদর', arabic: '', transliteration: '', meaning: '' },
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
                <div className="bg-white p-5 rounded-2xl shadow-inner border border-gray-100 space-y-4">
                  <p className="text-xl text-gray-800 leading-loose text-center font-medium font-arabic">
                    {selectedSurah.arabic || "এই সূরার বিস্তারিত তথ্য শীঘ্রই যোগ করা হবে।"}
                  </p>
                  <p className="text-md text-gray-700 italic text-center">
                    {selectedSurah.transliteration}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed text-justify">
                    {selectedSurah.meaning}
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
