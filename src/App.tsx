import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Dashboard from './components/Dashboard';
import SalahDetails from './components/SalahDetails';
import PrayerTimes from './components/PrayerTimes';
import ChildSalahEducation from './components/ChildSalahEducation';
import DuaDetails from './components/DuaDetails';
import SurahDetails from './components/SurahDetails';
import PracticeSection from './components/PracticeSection';

import ProfileSection from './components/ProfileSection';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'wudu-details' | 'surah-details' | 'salah-details' | 'prayer-times' | 'child-salah-education' | 'dua-details' | 'practice' | 'profile'>('dashboard');
  const [totalMinutes, setTotalMinutes] = useState(() => parseInt(localStorage.getItem('totalMinutes') || '0'));

  // Timer: track minutes in app
  useEffect(() => {
    const timer = setInterval(() => {
      setTotalMinutes(prev => {
        const next = prev + 1;
        localStorage.setItem('totalMinutes', next.toString());
        return next;
      });
    }, 60000); // 1 minute
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 md:flex md:items-center md:justify-center md:py-8 md:px-4 font-sans overflow-x-hidden">
      {/* Container - Responsive: Full screen on mobile, Framed on desktop */}
      <div className="relative mx-auto bg-white w-full h-screen md:h-[800px] md:w-[380px] md:border-gray-800 md:border-[14px] md:rounded-[2.5rem] md:shadow-2xl overflow-hidden flex flex-col transition-all duration-300">
        
        {/* Dynamic Island (Desktop Frame only) */}
        <div className="absolute top-0 inset-x-0 hidden md:flex justify-center z-50">
          <div className="bg-black h-[24px] w-[110px] rounded-b-xl shadow-sm"></div>
        </div>

        {/* Screen Content */}
        <div className="flex-1 flex flex-col relative overflow-hidden bg-white md:pt-8 md:pb-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex flex-col h-full overflow-y-auto"
            >
              {currentPage === 'dashboard' && <Dashboard setCurrentPage={setCurrentPage} />}
              {currentPage === 'surah-details' && <SurahDetails setCurrentPage={setCurrentPage} />}
              {currentPage === 'salah-details' && <SalahDetails setCurrentPage={setCurrentPage} />}
              {currentPage === 'prayer-times' && <PrayerTimes setCurrentPage={setCurrentPage} />}
              {currentPage === 'child-salah-education' && <ChildSalahEducation setCurrentPage={setCurrentPage} />}
              {currentPage === 'dua-details' && <DuaDetails setCurrentPage={setCurrentPage} />}
              {currentPage === 'practice' && <PracticeSection setCurrentPage={setCurrentPage} />}
              {currentPage === 'profile' && <ProfileSection setCurrentPage={setCurrentPage} totalMinutes={totalMinutes} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
