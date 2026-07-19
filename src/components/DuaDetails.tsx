import { ChevronLeft } from 'lucide-react';

interface DuaDetailsProps {
  setCurrentPage: (page: 'dashboard' | 'wudu-details' | 'surah-details' | 'salah-details' | 'prayer-times' | 'child-salah-education' | 'dua-details') => void;
}

export default function DuaDetails({ setCurrentPage }: DuaDetailsProps) {
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
        <h1 className="text-xl font-bold text-[#1c7a7c]">দোয়া ও যিকির</h1>
      </div>

      <div className="p-4">
        {/* Donate Box */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center space-y-4 mt-4">
            <img 
                src="https://res.cloudinary.com/djginu4oz/image/upload/v1784447669/pngtree-donation-box-png-image_9046187_kb7cro.png" 
                alt="Donate Box" 
                className="w-32 h-32 object-contain"
            />
            <h2 className="text-xl font-bold text-gray-800">আমাদের সাহায্য করুন</h2>
            <p className="text-gray-600 text-sm">আপনার সামান্য অনুদান আমাদের অ্যাপটিকে আরও উন্নত করতে সাহায্য করবে।</p>
            <button className="bg-[#1c7a7c] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#156062] transition-colors w-full">
                অনুদান দিন
            </button>
        </div>
      </div>
    </div>
  );
}
