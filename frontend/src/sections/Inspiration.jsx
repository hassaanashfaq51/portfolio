import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';
import { sectionReveal, titleReveal, subtitleReveal } from '../utils/animations';

const COLLECTIONS = [
  {
    weekName: "Week 1: Motivation",
    quotes: [
      { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
      { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
      { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
      { text: "It’s not a bug – it’s an undocumented feature.", author: "Anonymous" },
      { text: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" },
      { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
      { text: "Clean code always looks like it was written by someone who cares.", author: "Michael Feathers" },
      { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
      { text: "You might not think that programmers are artists, but programming is an extremely creative profession.", author: "John Romero" },
      { text: "The most disastrous thing that you can ever learn is your first programming language.", author: "Alan Kay" },
      { text: "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.", author: "Antoine de Saint-Exupéry" }
    ]
  },
  {
    weekName: "Week 2: Software Development",
    quotes: [
      { text: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "Harold Abelson" },
      { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
      { text: "Measuring programming progress by lines of code is like measuring aircraft building progress by weight.", author: "Bill Gates" },
      { text: "Nine people cannot make a baby in a month.", author: "Fred Brooks" },
      { text: "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.", author: "Brian Kernighan" },
      { text: "Before software can be reusable it first has to be usable.", author: "Ralph Johnson" },
      { text: "Software is a great combination between artistry and engineering.", author: "Bill Gates" },
      { text: "There are only two hard things in Computer Science: cache invalidation and naming things.", author: "Phil Karlton" },
      { text: "The best error message is the one that never shows up.", author: "Thomas Fuchs" },
      { text: "If you construct your code as a work of art, you will find beauty in every block.", author: "Anonymous" },
      { text: "Good software, like wine, takes time.", author: "Joel Spolsky" }
    ]
  },
  {
    weekName: "Week 3: Innovation & Technology",
    quotes: [
      { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
      { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
      { text: "Technology is best when it brings people together.", author: "Matt Mullenweg" },
      { text: "Any sufficiently advanced technology is indistinguishable from magic.", author: "Arthur C. Clarke" },
      { text: "The art of challenges is to make something new from what is already there.", author: "Anonymous" },
      { text: "Simple things should be simple, complex things should be possible.", author: "Alan Kay" },
      { text: "Computers are useless. They can only give you answers.", author: "Pablo Picasso" },
      { text: "Innovation is taking two things that already exist and putting them together in a new way.", author: "Tom Freston" },
      { text: "The technology you use impresses no one. The experience you create with it is everything.", author: "Sean Gerety" },
      { text: "What one programmer can do in one month, two programmers can do in two months.", author: "Fred Brooks" },
      { text: "The computer was born to solve problems that did not exist before.", author: "Bill Gates" }
    ]
  },
  {
    weekName: "Week 4: Career Growth & Learning",
    quotes: [
      { text: "Learning to write programs stretches your mind, and helps you think better, creates a way of thinking about things that I think is helpful in all domains.", author: "Bill Gates" },
      { text: "Continuous learning is the minimum requirement for success in any field.", author: "Brian Tracy" },
      { text: "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.", author: "Brian Herbert" },
      { text: "Intellectual growth should commence at birth and cease only at death.", author: "Albert Einstein" },
      { text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin" },
      { text: "Tell me and I forget. Teach me and I remember. Involve me and I learn.", author: "Benjamin Franklin" },
      { text: "Always write code as if the guy who ends up maintaining it will be a violent psychopath who knows where you live.", author: "John Woods" },
      { text: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde" },
      { text: "It is not that I'm so smart. But I stay with the questions much longer.", author: "Albert Einstein" },
      { text: "Do not fear failure. Fear being in the exact same place next year as you are today.", author: "Anonymous" },
      { text: "Code never lies, comments sometimes do.", author: "Ron Jeffries" }
    ]
  }
];

const getWeekIndex = () => {
  const currentDate = new Date();
  const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
  const pastDaysOfYear = (currentDate - firstDayOfYear) / 86400000;
  const weekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  return (weekNumber - 1) % 4; // Cycles from index 0 to 3
};

const quoteVariants = {
  enter: {
    opacity: 0,
    y: 15,
    filter: "blur(4px)"
  },
  center: {
    opacity: 1,
    y: 0,
    filter: "none",
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  exit: {
    opacity: 0,
    y: -15,
    filter: "blur(4px)",
    transition: {
      duration: 0.4,
      ease: "easeIn"
    }
  }
};

const FAMOUS_AUTHORS = [
  "Steve Jobs",
  "Linus Torvalds",
  "Bill Gates",
  "Martin Fowler",
  "Albert Einstein",
  "Benjamin Franklin",
  "Pablo Picasso",
  "Oscar Wilde",
  "Arthur C. Clarke",
  "Alan Kay",
  "Fred Brooks",
  "Brian Kernighan"
];

const Inspiration = () => {
  const weekIdx = getWeekIndex();
  const currentCollection = COLLECTIONS[weekIdx];
  const quotes = currentCollection.quotes;

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let intervalId;

    const startInterval = () => {
      intervalId = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % quotes.length);
      }, 10000);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(intervalId);
      } else {
        startInterval();
      }
    };

    startInterval();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [quotes]);

  const activeQuote = quotes[currentIndex];
  const showAuthor = FAMOUS_AUTHORS.includes(activeQuote.author);

  return (
    <motion.section 
      id="inspiration" 
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="py-20 relative bg-transparent border-t border-slate-200/20 dark:border-slate-800/10"
    >
      {/* Background decoration */}
      <div className="absolute top-[40%] left-[10%] w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.h2 
            variants={titleReveal}
            className="font-outfit font-extrabold text-3xl sm:text-4xl tracking-tight text-slate-800 dark:text-slate-100"
          >
            Developer <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-cyan-400">Inspiration</span>
          </motion.h2>
          <motion.div 
            variants={subtitleReveal}
            className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-cyan-400 mx-auto mt-4 rounded-full"
          />
        </div>

        {/* Quotes Display Card */}
        <div className="max-w-3xl mx-auto relative min-h-[220px] sm:min-h-[180px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              variants={quoteVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="glass-panel w-full p-8 sm:p-10 rounded-3xl relative text-center flex flex-col justify-center items-center shadow-lg border border-slate-200/30 dark:border-slate-800/20"
            >
              {/* Quote Icon */}
              <div className="mb-4 text-indigo-500/80 dark:text-cyan-400/80 opacity-60">
                <Quote size={28} className="fill-current rotate-180" />
              </div>

              {/* Quote Text */}
              <blockquote className="text-slate-700 dark:text-slate-200 text-lg sm:text-xl font-medium font-sans leading-relaxed max-w-2xl">
                "{activeQuote.text}"
              </blockquote>

              {/* Quote Author */}
              {showAuthor && (
                <cite className="mt-4 block not-italic text-[11px] font-bold text-slate-400/80 dark:text-slate-500/80 font-outfit uppercase tracking-widest">
                  — {activeQuote.author}
                </cite>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </motion.section>
  );
};

export default Inspiration;
