export const CATEGORIES = [
  { id: 'all', label: 'All', emoji: '✨' },
  { id: 'motivation', label: 'Motivation', emoji: '🔥' },
  { id: 'success', label: 'Success', emoji: '🏆' },
  { id: 'mindset', label: 'Mindset', emoji: '🧠' },
  { id: 'happiness', label: 'Happiness', emoji: '😊' },
  { id: 'courage', label: 'Courage', emoji: '💪' },
  { id: 'wisdom', label: 'Wisdom', emoji: '🦉' },
  { id: 'love', label: 'Love', emoji: '❤️' },
];

export const FREE_QUOTES = [
  // Motivation
  { id: '1', text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs', category: 'motivation', premium: false },
  { id: '2', text: "Push yourself, because no one else is going to do it for you.", author: 'Unknown', category: 'motivation', premium: false },
  { id: '3', text: "Great things never come from comfort zones.", author: 'Unknown', category: 'motivation', premium: false },
  { id: '4', text: "Dream it. Wish it. Do it.", author: 'Unknown', category: 'motivation', premium: false },
  { id: '5', text: "Success doesn't just find you. You have to go out and get it.", author: 'Unknown', category: 'motivation', premium: false },
  { id: '6', text: "The harder you work for something, the greater you'll feel when you achieve it.", author: 'Unknown', category: 'motivation', premium: false },
  { id: '7', text: "Don't stop when you're tired. Stop when you're done.", author: 'Unknown', category: 'motivation', premium: false },
  { id: '8', text: "Wake up with determination. Go to bed with satisfaction.", author: 'Unknown', category: 'motivation', premium: false },

  // Success
  { id: '9', text: "Success is not the key to happiness. Happiness is the key to success.", author: 'Albert Schweitzer', category: 'success', premium: false },
  { id: '10', text: "It always seems impossible until it's done.", author: 'Nelson Mandela', category: 'success', premium: false },
  { id: '11', text: "Don't watch the clock; do what it does. Keep going.", author: 'Sam Levenson', category: 'success', premium: false },
  { id: '12', text: "The secret of getting ahead is getting started.", author: 'Mark Twain', category: 'success', premium: false },
  { id: '13', text: "Your limitation—it's only your imagination.", author: 'Unknown', category: 'success', premium: false },
  { id: '14', text: "Little things make big days.", author: 'Unknown', category: 'success', premium: false },

  // Mindset
  { id: '15', text: "Whether you think you can or you think you can't, you're right.", author: 'Henry Ford', category: 'mindset', premium: false },
  { id: '16', text: "The mind is everything. What you think you become.", author: 'Buddha', category: 'mindset', premium: false },
  { id: '17', text: "You are what you repeatedly do. Excellence is not an event—it is a habit.", author: 'Aristotle', category: 'mindset', premium: false },
  { id: '18', text: "Believe you can and you're halfway there.", author: 'Theodore Roosevelt', category: 'mindset', premium: false },

  // Happiness
  { id: '19', text: "Happiness is not something ready-made. It comes from your own actions.", author: 'Dalai Lama', category: 'happiness', premium: false },
  { id: '20', text: "The purpose of our lives is to be happy.", author: 'Dalai Lama', category: 'happiness', premium: false },
  { id: '21', text: "Count your age by friends, not years. Count your life by smiles, not tears.", author: 'John Lennon', category: 'happiness', premium: false },

  // Courage
  { id: '22', text: "You gain strength, courage, and confidence by every experience in which you really stop to look fear in the face.", author: 'Eleanor Roosevelt', category: 'courage', premium: false },
  { id: '23', text: "It is never too late to be what you might have been.", author: 'George Eliot', category: 'courage', premium: false },
  { id: '24', text: "Courage is not the absence of fear, but the triumph over it.", author: 'Nelson Mandela', category: 'courage', premium: false },

  // Wisdom
  { id: '25', text: "In the middle of every difficulty lies opportunity.", author: 'Albert Einstein', category: 'wisdom', premium: false },
  { id: '26', text: "Life is what happens when you're busy making other plans.", author: 'John Lennon', category: 'wisdom', premium: false },
  { id: '27', text: "The journey of a thousand miles begins with one step.", author: 'Lao Tzu', category: 'wisdom', premium: false },

  // Love
  { id: '28', text: "The best thing to hold onto in life is each other.", author: 'Audrey Hepburn', category: 'love', premium: false },
  { id: '29', text: "Love yourself first, and everything else falls into line.", author: 'Lucille Ball', category: 'love', premium: false },
  { id: '30', text: "To love and be loved is to feel the sun from both sides.", author: 'David Viscott', category: 'love', premium: false },
];

export const PREMIUM_QUOTES = [
  // Premium Motivation Pack
  { id: 'p1', text: "Act as if what you do makes a difference. It does.", author: 'William James', category: 'motivation', premium: true },
  { id: 'p2', text: "You must be the change you wish to see in the world.", author: 'Mahatma Gandhi', category: 'motivation', premium: true },
  { id: 'p3', text: "Strive not to be a success, but rather to be of value.", author: 'Albert Einstein', category: 'motivation', premium: true },
  { id: 'p4', text: "Two roads diverged in a wood, and I—I took the one less traveled by.", author: 'Robert Frost', category: 'motivation', premium: true },
  { id: 'p5', text: "I have not failed. I've just found 10,000 ways that won't work.", author: 'Thomas Edison', category: 'motivation', premium: true },
  { id: 'p6', text: "A person who never made a mistake never tried anything new.", author: 'Albert Einstein', category: 'mindset', premium: true },
  { id: 'p7', text: "The fear of death follows from the fear of life. A man who lives fully is prepared to die at any time.", author: 'Mark Twain', category: 'wisdom', premium: true },
  { id: 'p8', text: "Only a life lived for others is a life worthwhile.", author: 'Albert Einstein', category: 'wisdom', premium: true },
  { id: 'p9', text: "Do not go where the path may lead, go instead where there is no path and leave a trail.", author: 'Ralph Waldo Emerson', category: 'courage', premium: true },
  { id: 'p10', text: "When one door of happiness closes, another opens; but often we look so long at the closed door that we do not see the one which has been opened for us.", author: 'Helen Keller', category: 'happiness', premium: true },
  { id: 'p11', text: "Life is not measured by the number of breaths we take, but by the moments that take our breath away.", author: 'Maya Angelou', category: 'happiness', premium: true },
  { id: 'p12', text: "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.", author: 'Oprah Winfrey', category: 'mindset', premium: true },
  { id: 'p13', text: "Remember that not getting what you want is sometimes a wonderful stroke of luck.", author: 'Dalai Lama', category: 'wisdom', premium: true },
  { id: 'p14', text: "You can't use up creativity. The more you use, the more you have.", author: 'Maya Angelou', category: 'motivation', premium: true },
  { id: 'p15', text: "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.", author: 'Maya Angelou', category: 'love', premium: true },
  { id: 'p16', text: "Either write something worth reading or do something worth writing.", author: 'Benjamin Franklin', category: 'success', premium: true },
  { id: 'p17', text: "Innovation distinguishes between a leader and a follower.", author: 'Steve Jobs', category: 'success', premium: true },
  { id: 'p18', text: "Your time is limited, so don't waste it living someone else's life.", author: 'Steve Jobs', category: 'mindset', premium: true },
  { id: 'p19', text: "The only impossible journey is the one you never begin.", author: 'Tony Robbins', category: 'courage', premium: true },
  { id: 'p20', text: "In order to succeed, we must first believe that we can.", author: 'Nikos Kazantzakis', category: 'mindset', premium: true },
];

export const ALL_QUOTES = [...FREE_QUOTES, ...PREMIUM_QUOTES];
