import { ChevronLeft, Heart } from 'lucide-react';
import { motion } from 'motion/react';

interface ChildSalahEducationProps {
  setCurrentPage: (page: 'dashboard' | 'wudu-details' | 'surah-details' | 'salah-details' | 'prayer-times' | 'child-salah-education' | 'dua-details') => void;
}

export default function ChildSalahEducation({ setCurrentPage }: ChildSalahEducationProps) {
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
        <h1 className="text-xl font-bold text-[#1c7a7c]">শিশুদের নামাজ শিক্ষা</h1>
      </div>

      <div className="p-4 space-y-6">
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-3 text-pink-500">
            <Heart className="w-6 h-6 fill-current" />
            <h2 className="text-lg font-bold text-[#1c7a7c]">কখন শুরু করবেন?</h2>
          </div>
          <div className="space-y-4 text-sm text-gray-600">
            <div className="bg-gray-50 p-3 rounded-xl">
                <p className="font-bold text-[#1c7a7c]">৭ বছর বয়স:</p>
                <p>আদর ও ভালোবাসা দিয়ে নামাজের নিয়ম শেখাতে হবে।</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl">
                <p className="font-bold text-[#1c7a7c]">১০ বছর বয়স:</p>
                <p>নামাজে অনিহা দেখালে সামান্য শাসনের মাধ্যমে অভ্যস্ত করতে হবে।</p>
            </div>
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <h2 className="text-lg font-bold text-[#1c7a7c] px-1">উৎসাহিত করার কৌশল</h2>
          <div className="grid gap-3">
            {[
              { t: 'একসাথে নামাজ পড়া', d: 'শিশুরা অনুকরণপ্রিয়, তাই তাদের সাথে নিয়ে নামাজ পড়ুন।' },
              { t: 'আকর্ষণীয় সরঞ্জাম', d: 'পছন্দের জায়নামাজ, টুপি বা হিজাব কিনে দিন।' },
              { t: 'পুরস্কার ও প্রশংসা', d: 'নামাজে দাঁড়ালে প্রশংসা করুন ও ছোট উপহার দিন।' }
            ].map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex gap-3">
                    <div className="bg-[#1c7a7c] text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                        {idx + 1}
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 text-sm">{item.t}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">{item.d}</p>
                    </div>
                </div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
