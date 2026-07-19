import { useState } from 'react';
import { ChevronLeft, Copy, Phone, Mail, Check } from 'lucide-react';

interface DuaDetailsProps {
  setCurrentPage: (page: 'dashboard' | 'wudu-details' | 'surah-details' | 'salah-details' | 'prayer-times' | 'child-salah-education' | 'dua-details') => void;
}

export default function DuaDetails({ setCurrentPage }: DuaDetailsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
      navigator.clipboard.writeText('01753567152');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
  };

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
        <h1 className="text-xl font-bold text-[#1c7a7c]">Donate Box</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Donation Info Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <img 
                src="https://res.cloudinary.com/djginu4oz/image/upload/v1784447669/pngtree-donation-box-png-image_9046187_kb7cro.png" 
                alt="Donate Box" 
                className="w-full h-48 object-contain mb-4"
            />
            <h2 className="text-xl font-bold text-gray-800 mb-2">আমাদের অ্যাপটি ফ্রি</h2>
            <p className="text-gray-600 text-sm mb-6">আমাদের এই অ্যাপটি সম্পূর্ণ ফ্রি। আপনার সামান্য অনুদান আমাদের অ্যাপটিকে আরও উন্নত করতে এবং চালিয়ে যেতে সাহায্য করবে।</p>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-4">
                <p className="font-bold text-gray-800 text-sm">বিকাশ/নগদ (পার্সোনাল সেন্ড মানি):</p>
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-bold text-[#1c7a7c] tracking-wider">01753567152</span>
                    <button onClick={handleCopy} className="p-2 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors">
                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-600" />}
                    </button>
                    <a href="tel:01753567152" className="p-2 bg-[#1c7a7c] text-white rounded-lg hover:bg-[#156062] transition-colors">
                        <Phone className="w-4 h-4" />
                    </a>
                </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                <Mail className="w-4 h-4" />
                <span>mdesaislam74@gmail.com</span>
            </div>

            {/* Islamic Donation Information */}
            <div className="border-t border-gray-100 pt-6 mt-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">দান বা সদকার গুরুত্ব</h3>
                <div className="text-gray-600 text-sm space-y-3 leading-relaxed">
                    <p>ইসলাম ধর্মে দান বা সদকা অত্যন্ত গুরুত্বপূর্ণ এবং ফজিলতপূর্ণ একটি ইবাদত। পবিত্র কুরআন এবং হাদিসে দান-সদকার গুরুত্ব, নিয়ম ও এর সওয়াব সম্পর্কে বিস্তারিত নির্দেশনা দেওয়া হয়েছে।</p>
                    <p><span className="font-bold text-gray-800">১. সদকায়ে জারিয়া:</span> এটি এমন এক ধরনের দান, যার সওয়াব মানুষের মৃত্যুর পরও জারি থাকে।</p>
                    <p><span className="font-bold text-gray-800">২. ফজিলত:</span> দান গুনাহ মিটিয়ে দেয় এবং সম্পদ বৃদ্ধি করে।</p>
                    <p className="italic text-gray-500">"তোমরা কখনই কল্যাণের দেখা পাবে না, যতক্ষণ না তোমরা তোমাদের প্রিয় জিনিস থেকে আল্লাহর রাস্তায় খরচ করবে।" (সূরা আল-ইমরান, আয়াত: ৯২)</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
