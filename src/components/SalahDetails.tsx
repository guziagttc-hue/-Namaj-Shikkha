import { ChevronLeft, Info } from 'lucide-react';
import { motion } from 'motion/react';

interface SalahDetailsProps {
  setCurrentPage: (page: 'dashboard' | 'wudu-details' | 'surah-details' | 'salah-details' | 'prayer-times' | 'child-salah-education' | 'dua-details') => void;
}

export default function SalahDetails({ setCurrentPage }: SalahDetailsProps) {
  return (
    <div className="flex-1 flex flex-col bg-gray-50 pb-10">
      {/* Sticky Header */}
      <div className="bg-white px-4 py-4 flex items-center border-b border-gray-100 shadow-sm sticky top-0 z-10">
        <button 
          onClick={() => setCurrentPage('dashboard')} 
          className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-2"
        >
          <ChevronLeft className="w-6 h-6 text-[#1c7a7c]" />
        </button>
        <h1 className="text-xl font-bold text-[#1c7a7c]">সালাত পড়ার নিয়ম</h1>
      </div>

      <div className="p-4 space-y-6">
        <motion.section 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100"
        >
          <h2 className="text-lg font-bold text-[#1c7a7c] mb-3 flex items-center gap-2">
            <div className="bg-[#1c7a7c]/10 p-1.5 rounded-lg"><Info className="w-4 h-4" /></div>
            ১. সালাতের প্রস্তুতি
          </h2>
          <ul className="space-y-3">
            {[
              'শরীর ও পোশাক পবিত্র হওয়া (ওজু বা গোসল)',
              'নামাজের স্থান পবিত্র হওয়া',
              'সতর ঢাকা (শালীন পোশাক ও টুপি)',
              'কিবলামুখী হয়ে দাঁড়ানো'
            ].map((text, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-600">
                <span className="text-[#1c7a7c] font-bold">•</span>
                {text}
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100"
        >
          <h2 className="text-lg font-bold text-[#1c7a7c] mb-4">২. প্রথম রাকাতের নিয়ম</h2>
          <div className="space-y-4">
            <div className="border-l-2 border-[#1c7a7c]/20 pl-4 py-1">
              <h3 className="font-bold text-gray-800 text-sm mb-1">তাকবীরে তাহরীমা</h3>
              <p className="text-xs text-gray-500 italic leading-relaxed">"আল্লাহু আকবার" বলে হাত বেঁধে প্রথমে ছানা, এরপর আউযুবিল্লাহ-বিসমিল্লাহসহ সূরা ফাতিহা ও অন্য সূরা পড়ুন।</p>
            </div>
            <div className="border-l-2 border-[#1c7a7c]/20 pl-4 py-1">
              <h3 className="font-bold text-gray-800 text-sm mb-1">রুকু ও সাজদাহ</h3>
              <p className="text-xs text-gray-500 italic leading-relaxed">রুকুতে ৩ বার "সুবহানা রাব্বিয়াল আযীম" এবং সাজদায় ৩ বার "সুবহানা রাব্বিয়াল আলা" পড়ুন।</p>
            </div>
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1c7a7c] text-white p-6 rounded-2xl shadow-lg"
        >
          <h2 className="text-lg font-bold mb-3">৩. শেষ বৈঠক ও সমাপ্তি</h2>
          <p className="text-sm opacity-90 leading-relaxed mb-4">শেষ বৈঠকে বসে তাশাহহুদ, দুরুদে ইব্রাহিম ও দোয়া মাসূরা পড়ে ডানে ও বামে সালাম ফিরিয়ে নামাজ শেষ করুন।</p>
          <div className="bg-white/10 p-3 rounded-xl border border-white/20">
             <p className="text-xs italic">"সালাম: আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহ"</p>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
