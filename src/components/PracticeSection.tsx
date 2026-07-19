import { ChevronLeft, Brain, Trophy, Play, CheckCircle2, XCircle, RotateCcw, Mic, Volume2, Video, BookOpen, Layers } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PracticeSectionProps {
  setCurrentPage: (page: any) => void;
}

type TabType = 'menu' | 'quiz' | 'recitation' | 'tajwid' | 'flashcards';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'সূরা আল-ফাতিহা এর পরে সাধারণত কোন সূরাটি ছোটরা বেশি পড়ে?',
    options: ['সূরা আল-ইখলাস', 'সূরা আল-আসর', 'সূরা আল-কাউসার', 'সবগুলোই'],
    correct: 3,
    explanation: "সবগুলোই ছোট সূরা এবং এগুলো নামাজে বেশি ব্যবহার হয়।"
  },
  {
    id: 2,
    question: '"কুল হুয়াল্লাহু আহাদ" - এটি কোন সূরার প্রথম আয়াত?',
    options: ['সূরা আন-নাস', 'সূরা আল-ফালাক', 'সূরা আল-ইখলাস', 'সূরা আল-কাউসার'],
    correct: 2,
    explanation: "এটি সূরা আল-ইখলাস এর প্রথম আয়াত।"
  },
  {
    id: 3,
    question: 'নামাজে রুকুতে কোন তাসবীহ পড়তে হয়?',
    options: ['সুবহানা রাব্বিয়াল আলা', 'সুবহানা রাব্বিয়াল আযীম', 'সামিয়াল্লাহু লিমান হামিদাহ', 'আল্লাহু আকবার'],
    correct: 1,
    explanation: "রুকুতে 'সুবহানা রাব্বিয়াল আযীম' পড়তে হয়।"
  }
];

const FLASHCARDS = [
  { front: 'সূরা আল-ফাতিহা ১', back: 'আলহামদু লিল্লাহি রাব্বিল আলামীন', meaning: 'সমস্ত প্রশংসা জগতসমূহের প্রতিপালক আল্লাহর জন্য।' },
  { front: 'সূরা আল-ইখলাস ১', back: 'কুল হুয়াল্লাহু আহাদ', meaning: 'বলুন, তিনি আল্লাহ, এক।' },
  { front: 'সূরা আল-কাউসার ১', back: 'ইন্না আতাইনা কাল কাউসার', meaning: 'নিশ্চয় আমি আপনাকে কাউসার দান করেছি।' },
];

export default function PracticeSection({ setCurrentPage }: PracticeSectionProps) {
  const [activeTab, setActiveTab] = useState<TabType>('menu');
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleOptionClick = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    
    if (idx === QUIZ_QUESTIONS[quizIndex].correct) {
      setScore(s => s + 1);
    }

    setTimeout(() => {
      if (quizIndex < QUIZ_QUESTIONS.length - 1) {
        setQuizIndex(i => i + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setQuizIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center border-b border-gray-100 shadow-sm sticky top-0 z-10">
        <button 
          onClick={() => activeTab === 'menu' ? setCurrentPage('dashboard') : setActiveTab('menu')} 
          className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-2"
        >
          <ChevronLeft className="w-6 h-6 text-[#1c7a7c]" />
        </button>
        <h1 className="text-xl font-bold text-[#1c7a7c]">
          {activeTab === 'menu' && 'অনুশীলন সেকশন'}
          {activeTab === 'quiz' && 'কুইজ'}
          {activeTab === 'recitation' && 'তেলাওয়াত যাচাই'}
          {activeTab === 'tajwid' && 'তাজবিদ অনুশীলন'}
          {activeTab === 'flashcards' && 'ফ্ল্যাশ কার্ড'}
        </h1>
      </div>

      <div className="p-4 flex-1">
        <AnimatePresence mode="wait">
          {activeTab === 'menu' && (
            <motion.div 
              key="menu"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4 pb-10"
            >
              <div className="grid grid-cols-1 gap-3">
                {/* Menu Buttons */}
                <PracticeMenuButton 
                  icon={<Play className="w-6 h-6" />} 
                  color="bg-blue-100 text-blue-600" 
                  title="সূরা ও নামাজ কুইজ" 
                  desc="আপনার জ্ঞান যাচাই করুন" 
                  onClick={() => setActiveTab('quiz')} 
                />
                <PracticeMenuButton 
                  icon={<Mic className="w-6 h-6" />} 
                  color="bg-red-100 text-red-600" 
                  title="তেলাওয়াত যাচাই" 
                  desc="ভয়েস রেকর্ড করে মিলিয়ে দেখুন" 
                  onClick={() => setActiveTab('recitation')} 
                />
                <PracticeMenuButton 
                  icon={<Video className="w-6 h-6" />} 
                  color="bg-green-100 text-green-600" 
                  title="তাজবিদ টিউটোরিয়াল" 
                  desc="ভিডিওর মাধ্যমে মাখরাজ শিখুন" 
                  onClick={() => setActiveTab('tajwid')} 
                />
                <PracticeMenuButton 
                  icon={<Layers className="w-6 h-6" />} 
                  color="bg-orange-100 text-orange-600" 
                  title="ফ্ল্যাশ কার্ড" 
                  desc="স্মৃতিশক্তি পরীক্ষা করুন" 
                  onClick={() => setActiveTab('flashcards')} 
                />
              </div>
            </motion.div>
          )}

          {/* QUIZ SECTION */}
          {activeTab === 'quiz' && !showResult && (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center px-1">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">প্রশ্ন {quizIndex + 1}/{QUIZ_QUESTIONS.length}</span>
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${((quizIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                        className="bg-[#1c7a7c] h-full"
                    />
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 leading-relaxed">
                  {QUIZ_QUESTIONS[quizIndex].question}
                </h2>
              </div>

              <div className="space-y-3">
                {QUIZ_QUESTIONS[quizIndex].options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleOptionClick(idx)}
                    className={`w-full p-5 rounded-2xl text-left font-bold transition-all border-2 flex items-center justify-between ${
                      selectedOption === null 
                        ? 'bg-white border-gray-100 text-gray-700 hover:border-[#1c7a7c]' 
                        : idx === QUIZ_QUESTIONS[quizIndex].correct 
                          ? 'bg-green-50 border-green-500 text-green-700' 
                          : selectedOption === idx 
                            ? 'bg-red-50 border-red-500 text-red-700' 
                            : 'bg-white border-gray-100 text-gray-400'
                    }`}
                  >
                    <span>{option}</span>
                    {selectedOption !== null && idx === QUIZ_QUESTIONS[quizIndex].correct && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                    {selectedOption === idx && idx !== QUIZ_QUESTIONS[quizIndex].correct && <XCircle className="w-5 h-5 text-red-500" />}
                  </motion.button>
                ))}
              </div>

              {selectedOption !== null && (
                 <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-2xl ${selectedOption === QUIZ_QUESTIONS[quizIndex].correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                 >
                    <p className="text-sm font-bold">সঠিক উত্তর ব্যাখ্যা:</p>
                    <p className="text-xs">{QUIZ_QUESTIONS[quizIndex].explanation}</p>
                 </motion.div>
              )}
            </motion.div>
          )}

          {/* RECITATION CHECKER */}
          {activeTab === 'recitation' && (
            <motion.div 
              key="recitation"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 text-center">
                 <h2 className="text-2xl font-bold mb-4 text-[#1c7a7c]">সূরা আল-ইখলাস</h2>
                 <p className="text-2xl font-arabic leading-loose mb-6">قُلْ هُوَ اللَّهُ أَحَدٌ</p>
                 
                 <div className="flex justify-center items-center space-x-6">
                    <button className="flex flex-col items-center group">
                       <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-2 group-active:scale-90 transition-transform">
                          <Volume2 className="w-6 h-6" />
                       </div>
                       <span className="text-[10px] font-bold text-gray-400">মূল তেলাওয়াত</span>
                    </button>

                    <button 
                       onClick={() => setIsRecording(!isRecording)}
                       className={`w-24 h-24 rounded-full flex items-center justify-center shadow-lg transition-all ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-[#1c7a7c] text-white'}`}
                    >
                       <Mic className="w-10 h-10" />
                    </button>

                    <button className="flex flex-col items-center group">
                       <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-2 group-active:scale-90 transition-transform">
                          <RotateCcw className="w-6 h-6" />
                       </div>
                       <span className="text-[10px] font-bold text-gray-400">পুনরায় রেকর্ড</span>
                    </button>
                 </div>
                 
                 <p className="mt-8 text-sm font-bold text-gray-400 uppercase tracking-widest">
                    {isRecording ? 'রেকর্ড হচ্ছে...' : 'রেকর্ড করতে বাটনে চাপ দিন'}
                 </p>
              </div>

              <div className="bg-[#1c7a7c]/10 p-6 rounded-3xl border border-[#1c7a7c]/20">
                 <h3 className="font-bold text-[#1c7a7c] mb-2 flex items-center gap-2">
                    <Brain className="w-5 h-5" /> টিপস
                 </h3>
                 <p className="text-sm text-gray-700 leading-relaxed">
                    আয়াতের উচ্চারণ সঠিকভাবে করার জন্য 'আহাদ' শব্দের শেষের 'দ' বর্ণটি কলকলা করে পড়ুন।
                 </p>
              </div>
            </motion.div>
          )}

          {/* TAJWID SECTION */}
          {activeTab === 'tajwid' && (
            <motion.div key="tajwid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
               {[
                 { title: 'মাখরাজ: ক্বফ (ق)', desc: 'জিহ্বার গোড়া থেকে উচ্চারণ হয়', icon: '🗣️' },
                 { title: 'মাখরাজ: খা (خ)', desc: 'গলার উপরের অংশ থেকে', icon: '🌬️' },
                 { title: 'গুননাহ নিয়ম', desc: 'নাক দিয়ে উচ্চারণ করার নিয়ম', icon: '👃' },
               ].map((item, i) => (
                 <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="text-3xl">{item.icon}</div>
                    <div className="flex-1">
                       <h3 className="font-bold text-gray-800">{item.title}</h3>
                       <p className="text-xs text-gray-400">{item.desc}</p>
                    </div>
                    <button className="p-2 bg-[#1c7a7c] text-white rounded-lg">
                       <Video className="w-4 h-4" />
                    </button>
                 </div>
               ))}
            </motion.div>
          )}

          {/* FLASHCARDS */}
          {activeTab === 'flashcards' && (
            <motion.div key="flashcards" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center space-y-10 py-10">
               <motion.div 
                  onClick={() => setIsFlipped(!isFlipped)}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, type: 'spring' }}
                  className="relative w-full max-w-[300px] h-[400px] cursor-pointer"
                  style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
               >
                  {/* Front */}
                  <div 
                    className="absolute inset-0 bg-white rounded-[2.5rem] shadow-xl border-2 border-[#1c7a7c]/10 p-8 flex flex-col items-center justify-center text-center backface-hidden"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                     <BookOpen className="w-12 h-12 text-[#1c7a7c] mb-6 opacity-20" />
                     <h3 className="text-2xl font-bold text-gray-800">{FLASHCARDS[flashcardIndex].front}</h3>
                     <p className="mt-10 text-xs text-gray-400 font-bold uppercase tracking-widest">কার্ডটি উল্টাতে ক্লিক করুন</p>
                  </div>

                  {/* Back */}
                  <div 
                    className="absolute inset-0 bg-[#1c7a7c] rounded-[2.5rem] shadow-xl p-8 flex flex-col items-center justify-center text-center text-white backface-hidden"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                     <p className="text-3xl font-arabic mb-6 leading-relaxed">{FLASHCARDS[flashcardIndex].back}</p>
                     <div className="h-px w-20 bg-white/30 mb-6"></div>
                     <p className="text-sm font-medium opacity-90">{FLASHCARDS[flashcardIndex].meaning}</p>
                  </div>
               </motion.div>

               <div className="flex items-center space-x-6">
                  <button 
                    disabled={flashcardIndex === 0}
                    onClick={() => { setFlashcardIndex(prev => prev - 1); setIsFlipped(false); }}
                    className="p-4 bg-white rounded-full shadow-md text-[#1c7a7c] disabled:opacity-30"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <span className="font-bold text-gray-400">{flashcardIndex + 1} / {FLASHCARDS.length}</span>
                  <button 
                    disabled={flashcardIndex === FLASHCARDS.length - 1}
                    onClick={() => { setFlashcardIndex(prev => prev + 1); setIsFlipped(false); }}
                    className="p-4 bg-white rounded-full shadow-md text-[#1c7a7c] disabled:opacity-30"
                  >
                    <ChevronLeft className="w-6 h-6 rotate-180" />
                  </button>
               </div>
            </motion.div>
          )}

          {showResult && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-10 space-y-6 text-center"
            >
              <div className="bg-yellow-100 p-8 rounded-full border-4 border-yellow-200">
                <Trophy className="w-20 h-20 text-yellow-600" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-gray-800 mb-2">মাশাআল্লাহ!</h2>
                <p className="text-gray-500">আপনি কুইজটি সম্পন্ন করেছেন।</p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-md border border-gray-100 w-full">
                <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">আপনার স্কোর</p>
                <p className="text-5xl font-black text-[#1c7a7c]">{score}/{QUIZ_QUESTIONS.length}</p>
                <div className="mt-4 flex justify-center gap-1">
                    {[...Array(QUIZ_QUESTIONS.length)].map((_, i) => (
                        <div key={i} className={`w-3 h-3 rounded-full ${i < score ? 'bg-green-500' : 'bg-gray-200'}`} />
                    ))}
                </div>
              </div>
              <button 
                onClick={resetQuiz}
                className="w-full bg-[#1c7a7c] text-white p-5 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg"
              >
                <RotateCcw className="w-5 h-5" /> পুনরায় শুরু করুন
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function PracticeMenuButton({ icon, color, title, desc, onClick }: { icon: any, color: string, title: string, desc: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between group active:scale-95 transition-transform"
    >
      <div className="flex items-center gap-4">
        <div className={`${color} p-3 rounded-2xl`}>
          {icon}
        </div>
        <div className="text-left">
          <h3 className="font-bold text-gray-800">{title}</h3>
          <p className="text-[10px] text-gray-400 font-medium">{desc}</p>
        </div>
      </div>
      <ChevronLeft className="w-5 h-5 text-gray-300 rotate-180" />
    </button>
  );
}
