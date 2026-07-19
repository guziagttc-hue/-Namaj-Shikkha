import { motion } from 'motion/react';
import { User, Trophy, Calendar, Clock, ChevronRight, Settings, Heart, Award, Star } from 'lucide-react';

interface ProfileSectionProps {
  setCurrentPage: (page: any) => void;
  totalMinutes: number;
}

export default function ProfileSection({ setCurrentPage, totalMinutes }: ProfileSectionProps) {
  // Mock data - in a real app these would come from local storage or a database
  const user = {
    name: 'ব্যবহারকারী',
    level: 'শিক্ষানবিশ',
    completedSurahs: 3,
    streak: 5,
    badges: [
      { id: 1, name: '৫ সূরা বিজয়ী', icon: <Award className="text-yellow-500" />, color: 'bg-yellow-100' },
      { id: 2, name: 'সপ্তাহজুড়ে নিয়মিত', icon: <Star className="text-blue-500" />, color: 'bg-blue-100' },
    ]
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-hidden">
      {/* Profile Header */}
      <div className="bg-[#1c7a7c] pt-8 pb-12 px-6 rounded-b-[2.5rem] shadow-lg relative shrink-0">
        <div className="flex justify-between items-start mb-6 text-white">
          <button onClick={() => setCurrentPage('dashboard')} className="p-2 bg-white/20 rounded-full">
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          <button className="p-2 bg-white/20 rounded-full">
            <Settings className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-white rounded-full p-1 shadow-md">
            <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
               <User className="w-12 h-12 text-[#1c7a7c]" />
            </div>
          </div>
          <div className="text-white">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-white/80 text-sm font-medium">{user.level}</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 -mt-8 flex-1 overflow-y-auto pb-10">
        <div className="grid grid-cols-2 gap-4 mb-8">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center"
          >
            <div className="p-3 bg-orange-100 rounded-xl mb-2">
              <Calendar className="w-6 h-6 text-orange-500" />
            </div>
            <span className="text-xl font-bold text-gray-800">{user.streak} দিন</span>
            <span className="text-xs text-gray-400">ডেইলি স্ট্রিক</span>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center"
          >
            <div className="p-3 bg-blue-100 rounded-xl mb-2">
              <Clock className="w-6 h-6 text-blue-500" />
            </div>
            <span className="text-xl font-bold text-gray-800">{totalMinutes} মিনিট</span>
            <span className="text-xs text-gray-400">শেখার সময়</span>
          </motion.div>
        </div>

        {/* Badges Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800 text-lg">আপনার অর্জিত ব্যাজ</h3>
            <span className="text-xs text-[#1c7a7c] font-bold">সব দেখুন</span>
          </div>
          <div className="flex space-x-4">
            {user.badges.map(badge => (
              <div key={badge.id} className="flex flex-col items-center">
                <div className={`${badge.color} p-4 rounded-2xl shadow-sm mb-2`}>
                  {badge.icon}
                </div>
                <span className="text-[10px] font-bold text-gray-600 text-center w-20">{badge.name}</span>
              </div>
            ))}
            <div className="flex flex-col items-center">
              <div className="bg-gray-100 p-4 rounded-2xl shadow-sm mb-2 opacity-50 border-2 border-dashed border-gray-300">
                <Trophy className="w-6 h-6 text-gray-400" />
              </div>
              <span className="text-[10px] font-bold text-gray-400">পরবর্তী...</span>
            </div>
          </div>
        </div>

        {/* Settings/Options List */}
        <div className="bg-white rounded-3xl p-2 shadow-sm border border-gray-100 overflow-hidden">
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-pink-100 rounded-lg text-pink-500"><Heart className="w-5 h-5" /></div>
              <span className="font-bold text-gray-700">প্রিয় সূরা ও দোয়া</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
          <div className="h-px bg-gray-50 mx-4"></div>
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-100 rounded-lg text-green-500"><Trophy className="w-5 h-5" /></div>
              <span className="font-bold text-gray-700">লিডারবোর্ড</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
          <div className="h-px bg-gray-50 mx-4"></div>
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gray-100 rounded-lg text-gray-500"><Settings className="w-5 h-5" /></div>
              <span className="font-bold text-gray-700">অ্যাকাউন্ট সেটিংস</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Donate Section */}
        <div className="mt-8 bg-[#1c7a7c]/5 border border-[#1c7a7c]/10 rounded-[2.5rem] p-6 text-center relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-20 h-20 bg-white rounded-2xl shadow-sm mx-auto flex items-center justify-center mb-4 border border-[#1c7a7c]/10">
              <div className="relative">
                <Heart className="w-10 h-10 text-pink-500 animate-pulse" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white"></div>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">সদকা ও সহযোগিতা</h3>
            <p className="text-sm text-gray-500 mb-6 px-4">
              এই অ্যাপটি বিনামূল্যে সবার কাছে পৌঁছে দিতে আপনার ছোট একটি অনুদান অনেক সাহায্য করবে।
            </p>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {['৳৫০', '৳১০০', '৳৫০০'].map((amount) => (
                <button key={amount} className="py-2 px-1 bg-white border border-gray-100 rounded-xl font-bold text-gray-700 text-sm hover:border-[#1c7a7c] transition-colors">
                  {amount}
                </button>
              ))}
            </div>
            <button className="w-full bg-[#1c7a7c] text-white py-4 rounded-2xl font-bold shadow-lg shadow-[#1c7a7c]/20 active:scale-95 transition-transform">
              সহযোগিতা করুন
            </button>
          </div>
          <div className="absolute -right-10 -bottom-10 opacity-5">
            <Heart className="w-40 h-40 text-[#1c7a7c]" />
          </div>
        </div>
      </div>
    </div>
  );
}
