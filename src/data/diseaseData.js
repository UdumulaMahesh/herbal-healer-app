export const diseaseDatabase = {
  'Common Cold': {
    symptoms: ['runny nose', 'sneezing', 'sore throat', 'cough', 'congestion', 'mild fever'],
    description: 'A viral infection affecting the upper respiratory tract',
    herbalRemedies: [
      { 
        name: 'Ginger Tea', 
        usage: 'Boil fresh ginger in water, add honey. Drink 2-3 times daily', 
        benefits: 'Reduces inflammation and soothes throat' 
      },
      { 
        name: 'Tulsi (Holy Basil)', 
        usage: 'Chew 5-6 fresh leaves or make tea. Take twice daily', 
        benefits: 'Boosts immunity and fights viral infections' 
      },
      { 
        name: 'Turmeric Milk', 
        usage: 'Mix 1 tsp turmeric in warm milk. Drink before bed', 
        benefits: 'Anti-inflammatory and antibacterial properties' 
      }
    ],
    prevention: 'Wash hands frequently, avoid close contact with sick people, stay hydrated',
    imageKeywords: ['cold', 'sneeze', 'tissue', 'sick person', 'runny nose']
  },
  'Headache': {
    symptoms: ['head pain', 'pressure in head', 'throbbing', 'sensitivity to light', 'nausea'],
    description: 'Pain or discomfort in the head or face area',
    herbalRemedies: [
      { 
        name: 'Peppermint Oil', 
        usage: 'Apply diluted oil to temples. Massage gently', 
        benefits: 'Provides cooling effect and relieves tension' 
      },
      { 
        name: 'Lavender Tea', 
        usage: 'Steep dried lavender in hot water for 10 mins. Drink slowly', 
        benefits: 'Reduces stress and tension headaches' 
      },
      { 
        name: 'Ginger', 
        usage: 'Make fresh ginger tea or chew small piece', 
        benefits: 'Reduces inflammation and migraine pain' 
      }
    ],
    prevention: 'Stay hydrated, maintain regular sleep schedule, reduce stress',
    imageKeywords: ['headache', 'head pain', 'migraine', 'person holding head']
  },
  'Indigestion': {
    symptoms: ['stomach pain','stomachache', 'bloating', 'nausea', 'heartburn', 'gas', 'fullness'],
    description: 'Discomfort in the upper abdomen during or after eating',
    herbalRemedies: [
      { 
        name: 'Fennel Seeds', 
        usage: 'Chew 1 tsp seeds after meals or make tea', 
        benefits: 'Relieves bloating and improves digestion' 
      },
      { 
        name: 'Ajwain (Carom Seeds)', 
        usage: 'Take 1 tsp with warm water after meals', 
        benefits: 'Reduces gas and stomach discomfort' 
      },
      { 
        name: 'Mint Leaves', 
        usage: 'Chew fresh leaves or make mint tea', 
        benefits: 'Soothes stomach and reduces nausea' 
      }
    ],
    prevention: 'Eat smaller meals, avoid spicy foods, don\'t lie down after eating',
    imageKeywords: ['stomach pain', 'belly ache', 'bloating', 'indigestion']
  },
  'Cough': {
    symptoms: ['persistent cough', 'throat irritation', 'phlegm', 'chest congestion'],
    description: 'Reflex action to clear airways of mucus and irritants',
    herbalRemedies: [
      { 
        name: 'Honey & Black Pepper', 
        usage: 'Mix 1 tsp honey with pinch of black pepper. Take 2-3 times daily', 
        benefits: 'Soothes throat and reduces cough' 
      },
      { 
        name: 'Tulsi & Ginger Tea', 
        usage: 'Boil tulsi leaves with ginger. Drink warm', 
        benefits: 'Clears congestion and fights infection' 
      },
      { 
        name: 'Mulethi (Licorice)', 
        usage: 'Chew small piece or make tea. Use 2-3 times daily', 
        benefits: 'Soothes throat and reduces inflammation' 
      }
    ],
    prevention: 'Avoid cold drinks, stay warm, avoid allergens',
    imageKeywords: ['coughing', 'person coughing', 'throat', 'chest congestion']
  },
  'Acidity': {
    symptoms: ['burning sensation', 'sour taste', 'chest pain', 'difficulty swallowing', 'regurgitation'],
    description: 'Excess acid production in the stomach',
    herbalRemedies: [
      { 
        name: 'Cumin Water', 
        usage: 'Boil 1 tsp cumin seeds in water. Drink on empty stomach', 
        benefits: 'Neutralizes stomach acid' 
      },
      { 
        name: 'Aloe Vera Juice', 
        usage: 'Drink 2 tbsp pure aloe vera juice before meals', 
        benefits: 'Soothes digestive tract and reduces inflammation' 
      },
      { 
        name: 'Coconut Water', 
        usage: 'Drink fresh coconut water 2-3 times daily', 
        benefits: 'Natural alkaline, reduces acidity' 
      }
    ],
    prevention: 'Avoid spicy and fried foods, eat regular meals, reduce stress',
    imageKeywords: ['heartburn', 'acid reflux', 'chest burn', 'stomach acid']
  },
  'Constipation': {
    symptoms: ['difficulty passing stool', 'hard stool', 'abdominal pain', 'bloating', 'straining'],
    description: 'Infrequent or difficult bowel movements',
    herbalRemedies: [
      { 
        name: 'Triphala Powder', 
        usage: 'Mix 1 tsp in warm water before bed', 
        benefits: 'Gentle laxative, improves digestion' 
      },
      { 
        name: 'Psyllium Husk (Isabgol)', 
        usage: 'Mix 1-2 tsp in water or milk. Drink immediately', 
        benefits: 'Adds bulk to stool, promotes regularity' 
      },
      { 
        name: 'Warm Lemon Water', 
        usage: 'Drink glass of warm water with lemon juice on empty stomach', 
        benefits: 'Stimulates bowel movement' 
      }
    ],
    prevention: 'Drink plenty of water, eat fiber-rich foods, exercise regularly',
    imageKeywords: ['constipation', 'stomach discomfort', 'digestive issue']
  },
  'Joint Pain': {
    symptoms: ['joint stiffness', 'swelling', 'pain in joints', 'reduced mobility', 'warmth in joints'],
    description: 'Discomfort, aches, and soreness in body joints',
    herbalRemedies: [
      { 
        name: 'Turmeric Paste', 
        usage: 'Mix turmeric with warm mustard oil. Apply to joints', 
        benefits: 'Reduces inflammation and pain' 
      },
      { 
        name: 'Ginger Tea', 
        usage: 'Drink ginger tea 2-3 times daily', 
        benefits: 'Anti-inflammatory properties' 
      },
      { 
        name: 'Ashwagandha', 
        usage: 'Take 1 tsp powder with warm milk at night', 
        benefits: 'Reduces inflammation and strengthens joints' 
      }
    ],
    prevention: 'Maintain healthy weight, exercise regularly, avoid prolonged sitting',
    imageKeywords: ['joint pain', 'knee pain', 'arthritis', 'swollen joint']
  },
  'Insomnia': {
    symptoms: ['difficulty falling asleep', 'waking up frequently', 'fatigue', 'irritability', 'daytime sleepiness'],
    description: 'Persistent problems falling and staying asleep',
    herbalRemedies: [
      { 
        name: 'Chamomile Tea', 
        usage: 'Drink 1 cup 30 minutes before bed', 
        benefits: 'Promotes relaxation and sleep' 
      },
      { 
        name: 'Ashwagandha', 
        usage: 'Mix 1 tsp powder in warm milk. Drink before bed', 
        benefits: 'Reduces stress and improves sleep quality' 
      },
      { 
        name: 'Brahmi', 
        usage: 'Take as tea or supplement in evening', 
        benefits: 'Calms mind and promotes restful sleep' 
      }
    ],
    prevention: 'Maintain regular sleep schedule, avoid caffeine, create relaxing bedtime routine',
    imageKeywords: ['insomnia', 'sleepless', 'person awake', 'tired eyes']
  },
  'Skin Allergies': {
    symptoms: ['itching', 'redness', 'rash', 'swelling', 'hives', 'dry skin'],
    description: 'Immune system reaction causing skin irritation',
    herbalRemedies: [
      { 
        name: 'Neem Paste', 
        usage: 'Grind neem leaves into paste. Apply to affected area', 
        benefits: 'Antibacterial and anti-inflammatory' 
      },
      { 
        name: 'Aloe Vera Gel', 
        usage: 'Apply fresh aloe vera gel directly to skin', 
        benefits: 'Soothes irritation and reduces inflammation' 
      },
      { 
        name: 'Turmeric & Sandalwood Paste', 
        usage: 'Mix both powders with rose water. Apply as face pack', 
        benefits: 'Reduces redness and heals skin' 
      }
    ],
    prevention: 'Avoid allergens, use mild soaps, keep skin moisturized',
    imageKeywords: ['skin rash', 'allergy', 'red skin', 'itchy skin', 'hives']
  },
  'Anxiety': {
    symptoms: ['excessive worry', 'restlessness', 'rapid heartbeat', 'difficulty concentrating', 'sleep problems'],
    description: 'Persistent feelings of worry, nervousness, or fear',
    herbalRemedies: [
      { 
        name: 'Ashwagandha', 
        usage: 'Take 300-500mg twice daily with meals', 
        benefits: 'Reduces cortisol and stress levels' 
      },
      { 
        name: 'Brahmi Tea', 
        usage: 'Steep brahmi leaves in hot water. Drink daily', 
        benefits: 'Calms nervous system and improves mental clarity' 
      },
      { 
        name: 'Lavender Oil', 
        usage: 'Add to diffuser or apply diluted to wrists', 
        benefits: 'Promotes relaxation and reduces anxiety' 
      }
    ],
    prevention: 'Practice meditation, exercise regularly, maintain social connections',
    imageKeywords: ['anxiety', 'stress', 'worried person', 'panic']
  },
  'Fever': {
    symptoms: ['high temperature', 'sweating', 'chills', 'weakness', 'body ache', 'dehydration'],
    description: 'Elevated body temperature, usually due to infection',
    herbalRemedies: [
      { 
        name: 'Tulsi Tea', 
        usage: 'Boil 10-12 tulsi leaves in water. Drink 3 times daily', 
        benefits: 'Reduces fever and fights infection' 
      },
      { 
        name: 'Ginger & Honey', 
        usage: 'Mix ginger juice with honey. Take twice daily', 
        benefits: 'Natural antipyretic, reduces body temperature' 
      },
      { 
        name: 'Coriander Seeds', 
        usage: 'Soak 1 tsp seeds overnight. Drink water in morning', 
        benefits: 'Cooling effect, reduces fever' 
      }
    ],
    prevention: 'Maintain hygiene, stay hydrated, boost immunity',
    imageKeywords: ['fever', 'thermometer', 'high temperature', 'sick person with fever']
  },
  'Diabetes Symptoms': {
    symptoms: ['frequent urination', 'excessive thirst', 'fatigue', 'blurred vision', 'slow healing'],
    description: 'Signs indicating high blood sugar levels',
    herbalRemedies: [
      { 
        name: 'Bitter Gourd (Karela)', 
        usage: 'Drink fresh bitter gourd juice on empty stomach', 
        benefits: 'Helps regulate blood sugar levels' 
      },
      { 
        name: 'Fenugreek Seeds', 
        usage: 'Soak 1 tbsp seeds overnight. Eat in morning', 
        benefits: 'Improves glucose tolerance' 
      },
      { 
        name: 'Cinnamon', 
        usage: 'Add 1 tsp powder to food or take with warm water', 
        benefits: 'Lowers blood sugar and improves insulin sensitivity' 
      }
    ],
    prevention: 'Maintain healthy weight, exercise regularly, balanced diet',
    imageKeywords: ['diabetes', 'blood sugar', 'glucose meter', 'insulin']
  }
};

export const doctors = [
  { 
    id: 1, 
    name: 'Dr. Ayesha Patel', 
    specialization: 'Ayurvedic Medicine',
    experience: '15 years',
    rating: 4.8,
    location: 'Mumbai, Maharashtra',
    availability: 'Mon-Sat, 10AM-6PM',
    fee: '₹500',
    image: '👩‍⚕️'
  },
  { 
    id: 2, 
    name: 'Dr. Rajesh Kumar', 
    specialization: 'Herbal Therapy',
    experience: '12 years',
    rating: 4.6,
    location: 'Bangalore, Karnataka',
    availability: 'Mon-Fri, 9AM-5PM',
    fee: '₹600',
    image: '👨‍⚕️'
  },
  { 
    id: 3, 
    name: 'Dr. Priya Sharma', 
    specialization: 'Naturopathy',
    experience: '10 years',
    rating: 4.9,
    location: 'Delhi, NCR',
    availability: 'Tue-Sun, 11AM-7PM',
    fee: '₹550',
    image: '👩‍⚕️'
  },
  { 
    id: 4, 
    name: 'Dr. Arjun Mehta', 
    specialization: 'Traditional Medicine',
    experience: '20 years',
    rating: 4.7,
    location: 'Pune, Maharashtra',
    availability: 'Mon-Sat, 8AM-4PM',
    fee: '₹700',
    image: '👨‍⚕️'
  },
  { 
    id: 5, 
    name: 'Dr. Sneha Reddy', 
    specialization: 'Holistic Medicine',
    experience: '8 years',
    rating: 4.5,
    location: 'Hyderabad, Telangana',
    availability: 'Mon-Sat, 10AM-5PM',
    fee: '₹450',
    image: '👩‍⚕️'
  }
];