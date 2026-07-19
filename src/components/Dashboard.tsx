import { Home, BookOpen, GraduationCap, User } from 'lucide-react';
import { motion } from 'motion/react';

interface DashboardProps {
  setCurrentPage: (page: 'dashboard' | 'wudu-details' | 'surah-details' | 'salah-details' | 'prayer-times' | 'child-salah-education' | 'dua-details' | 'practice' | 'profile') => void;
}

const menuItems = [
  { id: 'wudu-details', title: 'অজু ও পবিত্রতা', img: 'https://res.cloudinary.com/djginu4oz/image/upload/v1784351368/Gemini_Generated_Image_b20ua2b20ua2b20u_copy_zvhpeu.jpg', color: '#3a8789' },
  { id: 'surah-details', title: 'নামাজের সূরা ও দোয়া', img: 'https://res.cloudinary.com/djginu4oz/image/upload/v1784351997/Gemini_Generated_Image_rczinprczinprczi_copy_ouzifa.jpg', color: '#395a89' },
  { id: 'salah-details', title: 'সালাত পড়ার নিয়ম', img: 'https://res.cloudinary.com/djginu4oz/image/upload/v1784352565/Gemini_Generated_Image_e4mupve4mupve4mu_copy_ocdsqm.jpg', color: '#3a8789' },
  { id: 'prayer-times', title: 'নামাজের ওয়াক্ত ও কিবলা', img: 'https://res.cloudinary.com/djginu4oz/image/upload/v1784353476/Gemini_Generated_Image_e6osghe6osghe6os_r2qgyv.png', color: '#e4f6f6' },
  { id: 'child-salah-education', title: 'শিশুদের নামাজ শিক্ষা', img: 'https://res.cloudinary.com/djginu4oz/image/upload/v1784354590/Gemini_Generated_Image_n35tfrn35tfrn35t_cn24e4.png', color: '#3a8789' },
  { id: 'dua-details', title: 'দোয়া ও যিকির', img: '', color: '#3a8789' },
];

export default function Dashboard({ setCurrentPage }: DashboardProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemAnim = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <>
      {/* App Header */}
      <div className="bg-[#1c7a7c] text-white px-5 py-5 flex justify-between items-center shadow-md shrink-0">
        <span className="text-xl font-bold tracking-wide">নামাজ শিক্ষা</span>
        <button onClick={() => setCurrentPage('profile')}>
          <User className="w-6 h-6 opacity-80" />
        </button>
      </div>

      {/* Content Area - Scrollable */}
      <div className="px-4 flex-1 overflow-y-auto pt-6 pb-24">
        <motion.h2 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-lg font-bold text-gray-800 mb-6"
        >
          আসসালামু আলাইকুম, ব্যবহারকারী!
        </motion.h2>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 gap-4 mb-4"
        >
          {menuItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemAnim}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage(item.id as any)}
              className="bg-[#3a8789] rounded-2xl p-0 flex flex-col items-center justify-center text-center h-[170px] cursor-pointer shadow-md overflow-hidden transition-all active:shadow-inner"
            >
              {item.img ? (
                <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center text-white p-4">
                  <BookOpen className="w-12 h-12 mb-2" />
                  <span className="font-bold">{item.title}</span>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Navigation - Fixed at bottom of the container */}
      <div className="bg-white/95 backdrop-blur-md border-t border-gray-100 flex justify-around items-center py-3 text-gray-400 text-[10px] shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-40 shrink-0 px-2 pb-8 md:pb-3">
        <button onClick={() => setCurrentPage('dashboard')} className="flex flex-col items-center space-y-1 text-[#1c7a7c] font-bold">
          <Home className="w-5 h-5" /><span>হোম</span>
        </button>
        <button onClick={() => setCurrentPage('surah-details')} className="flex flex-col items-center space-y-1">
          <BookOpen className="w-5 h-5" /><span>শিখুন</span>
        </button>
        <button onClick={() => setCurrentPage('practice')} className="flex flex-col items-center space-y-1">
          <GraduationCap className="w-5 h-5" /><span>অনুশীলন</span>
        </button>
        <button onClick={() => setCurrentPage('profile')} className="flex flex-col items-center space-y-1">
          <User className="w-5 h-5" /><span>প্রোফাইল</span>
        </button>
      </div>
    </>
  );
}
