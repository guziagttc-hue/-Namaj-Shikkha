import { useState, useEffect } from 'react';
import { ChevronLeft, MapPin, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface PrayerTimesProps {
  setCurrentPage: (page: 'dashboard' | 'wudu-details' | 'surah-details' | 'salah-details' | 'prayer-times' | 'child-salah-education' | 'dua-details') => void;
}

interface PrayerTimings {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

const prayerNames: Record<string, string> = {
  Fajr: 'ফজর',
  Dhuhr: 'জোহর',
  Asr: 'আসর',
  Maghrib: 'মাগরিব',
  Isha: 'এশা'
};

export default function PrayerTimes({ setCurrentPage }: PrayerTimesProps) {
  const [times, setTimes] = useState<PrayerTimings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("আপনার ব্রাউজারে লোকেশন সার্ভিস সমর্থিত নয়।");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(`https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=1`);
          const data = await response.json();
          setTimes(data.data.timings);
          setLoading(false);
        } catch (err) {
          setError("নামাজের সময় আনতে ব্যর্থ হয়েছে।");
          setLoading(false);
        }
      },
      () => {
        setError("আপনার লোকেশন পাওয়া যাচ্ছে না।");
        setLoading(false);
      }
    );
  }, []);

  if (loading) return (
    <div className="flex-1 flex flex-col items-center justify-center p-10 space-y-4">
      <div className="w-12 h-12 border-4 border-[#1c7a7c] border-t-transparent rounded-full animate-spin"></div>
      <p className="text-[#1c7a7c] font-medium animate-pulse">সময় আপডেট হচ্ছে...</p>
    </div>
  );

  if (error) return (
    <div className="flex-1 flex flex-col items-center justify-center p-10 text-center space-y-4">
      <p className="text-red-500 font-medium">{error}</p>
      <button onClick={() => window.location.reload()} className="bg-[#1c7a7c] text-white px-6 py-2 rounded-full">পুনরায় চেষ্টা করুন</button>
    </div>
  );

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
        <h1 className="text-xl font-bold text-[#1c7a7c]">নামাজের ওয়াক্ত</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Timing Card */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
        >
          <div className="bg-[#1c7a7c] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">বর্তমান অবস্থান</span>
            </div>
            <Clock className="w-5 h-5" />
          </div>
          <div className="divide-y divide-gray-50">
            {times && Object.entries(times).filter(([key]) => Object.keys(prayerNames).includes(key)).map(([key, time]) => (
              <div key={key} className="flex justify-between items-center p-4 hover:bg-gray-50 transition-colors">
                <span className="text-lg font-bold text-gray-700">{prayerNames[key]}</span>
                <span className="text-xl font-mono font-medium text-[#1c7a7c]">{time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Info Sections */}
        <div className="space-y-6 pt-4">
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <h2 className="text-xl font-bold text-[#1c7a7c] flex items-center gap-2">
                <div className="w-1.5 h-6 bg-[#1c7a7c] rounded-full"></div>
                নামাজের ওয়াক্তসমূহ
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">পবিত্র কুরআনে বলা হয়েছে, "নিশ্চয়ই সালাত মুমিনদের ওপর নির্দিষ্ট সময়ে ফরয করা হয়েছে।" (সূরা আন-নিসা, আয়াত: ১০৩)।</p>
            
            <div className="grid gap-3">
              {[
                { title: 'ফজর', desc: 'সুবহে সাদিক থেকে সূর্যোদয়ের পূর্ব মুহূর্ত পর্যন্ত।' },
                { title: 'জোহর', desc: 'সূর্য পশ্চিম আকাশে হেলে পড়ার পর থেকে আসর পর্যন্ত।' },
                { title: 'আসর', desc: 'জোহরের পর থেকে সূর্যাস্তের পূর্ব মুহূর্ত পর্যন্ত।' },
                { title: 'মাগরিব', desc: 'সূর্যাস্ত থেকে পশ্চিমের লাল আভা মিলিয়ে যাওয়ার আগ পর্যন্ত।' },
                { title: 'এশা', desc: 'মাগরিবের পর থেকে সুবহে সাদিকের পূর্ব পর্যন্ত।' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-[#1c7a7c] mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-[#1c7a7c]/5 p-5 rounded-2xl space-y-3 border border-[#1c7a7c]/10"
          >
            <h2 className="text-xl font-bold text-[#1c7a7c]">কিবলা (দিক নির্ধারণ)</h2>
            <p className="text-sm text-gray-600">নামাজ আদায়ের জন্য পবিত্র কাবার দিকে মুখ করে দাঁড়ানো ফরজ।</p>
            <ul className="grid grid-cols-1 gap-2">
              <li className="flex items-center gap-2 text-sm text-gray-700 bg-white/50 p-2 rounded-lg">
                <div className="w-1.5 h-1.5 bg-[#1c7a7c] rounded-full"></div>
                বাংলাদেশ থেকে: পশ্চিম-উত্তর-পশ্চিম
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-700 bg-white/50 p-2 rounded-lg">
                <div className="w-1.5 h-1.5 bg-[#1c7a7c] rounded-full"></div>
                ডিজিটাল কম্পাস বা অ্যাপ ব্যবহার করুন
              </li>
            </ul>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
