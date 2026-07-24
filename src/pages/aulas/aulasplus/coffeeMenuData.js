export const MENU_ITEMS = [
  { id: 'espresso', name: 'Espresso', category: 'coffee', followupType: 'shots', basePrice: 2.75 },
  { id: 'americano', name: 'Americano', category: 'coffee', followupType: 'sizeTemp', basePrice: 3.25 },
  { id: 'cappuccino', name: 'Cappuccino', category: 'coffee', followupType: 'sizeTemp', basePrice: 4.25 },
  { id: 'latte', name: 'Latte', category: 'coffee', followupType: 'sizeTemp', basePrice: 4.50 },
  { id: 'mocha', name: 'Mocha', category: 'coffee', followupType: 'sizeTemp', basePrice: 4.75 },
  { id: 'coldbrew', name: 'Cold Brew', category: 'cold', followupType: 'sizeOnly', basePrice: 4.00 },
  { id: 'icedlatte', name: 'Iced Latte', category: 'cold', followupType: 'sizeOnly', basePrice: 4.75 },
  { id: 'icedamericano', name: 'Iced Americano', category: 'cold', followupType: 'sizeOnly', basePrice: 3.75 },
  { id: 'greentea', name: 'Green Tea', category: 'tea', followupType: 'sizeTemp', basePrice: 3.00 },
  { id: 'earlgrey', name: 'Earl Grey Tea', category: 'tea', followupType: 'sizeTemp', basePrice: 3.00 },
  { id: 'chamomile', name: 'Chamomile Tea', category: 'tea', followupType: 'sizeTemp', basePrice: 3.00 },
  { id: 'croissant', name: 'Butter Croissant', category: 'bakery', followupType: 'warm', basePrice: 3.50 },
  { id: 'muffin', name: 'Blueberry Muffin', category: 'bakery', followupType: 'warm', basePrice: 3.25 },
  { id: 'cinnamonroll', name: 'Cinnamon Roll', category: 'bakery', followupType: 'warm', basePrice: 3.75 },
  { id: 'cookie', name: 'Chocolate Chip Cookie', category: 'sweets', followupType: 'none', basePrice: 2.25 },
  { id: 'brownie', name: 'Brownie', category: 'sweets', followupType: 'none', basePrice: 2.75 },
  { id: 'bananabread', name: 'Banana Bread', category: 'sweets', followupType: 'warm', basePrice: 3.25 },
  { id: 'sandwichham', name: 'Ham & Cheese Sandwich', category: 'kitchen', followupType: 'toast', basePrice: 6.50 },
  { id: 'sandwichturkey', name: 'Turkey Sandwich', category: 'kitchen', followupType: 'toast', basePrice: 6.75 },
];

export const CATEGORIES = [
  { id: 'coffee', label: '☕ Coffee Classics' },
  { id: 'cold', label: '🧊 Cold Favorites' },
  { id: 'tea', label: '🍵 Tea Selection' },
  { id: 'bakery', label: '🥐 Fresh Bakery' },
  { id: 'sweets', label: '🍪 Sweet Treats' },
  { id: 'kitchen', label: '🥪 Café Kitchen' },
];

export const FOLLOWUP_SEQUENCES = {
  shots: [{ key: 'shot', question: 'Single or double shot?', tip: 'A single shot contains one serving of espresso. A double shot contains two servings.', options: [{ value: 'single', label: 'Single shot' }, { value: 'double', label: 'Double shot' }] }],
  sizeTemp: [
    { key: 'size', question: 'What size would you like?', options: [{ value: 'small', label: 'Small' }, { value: 'medium', label: 'Medium' }, { value: 'large', label: 'Large' }] },
    { key: 'temperature', question: 'Hot or iced?', options: [{ value: 'hot', label: 'Hot' }, { value: 'iced', label: 'Iced' }] },
  ],
  sizeOnly: [{ key: 'size', question: 'What size would you like?', options: [{ value: 'small', label: 'Small' }, { value: 'medium', label: 'Medium' }, { value: 'large', label: 'Large' }] }],
  warm: [{ key: 'warm', question: 'Would you like it warmed up?', options: [{ value: 'yes', label: 'Yes, please.' }, { value: 'no', label: 'No, thanks.' }] }],
  toast: [{ key: 'toast', question: 'Would you like that toasted?', options: [{ value: 'yes', label: 'Yes, please.' }, { value: 'no', label: 'No, thanks.' }] }],
  none: [],
};

export const ORDER_PHRASES = [
  { key: 'canihave', label: 'Can I have...' },
  { key: 'illhave', label: "I'll have..." },
  { key: 'idlike', label: "I'd like..." },
];

export const BADGES = [
  { id: 'firstOrder', icon: '☕', name: 'First Order', desc: 'Placed your first café order.' },
  { id: 'cafeExplorer', icon: '🧭', name: 'Café Explorer', desc: 'Browsed every menu category.' },
  { id: 'listeningPro', icon: '🎧', name: 'Listening Pro', desc: 'Practiced pronunciation with the listen button.' },
  { id: 'speakingStar', icon: '🎤', name: 'Speaking Star', desc: 'Recorded yourself speaking twice.' },
  { id: 'perfectCustomer', icon: '🏆', name: 'Perfect Customer', desc: 'Completed the order like a pro.' },
];

export const TRANSLATIONS = {
  'Anything else today?': 'Mais alguma coisa hoje?',
  'Anything to drink with that?': 'Algo para beber com isso?',
  'For here or to go?': 'Para comer aqui ou para levar?',
  'Cash or card?': 'Dinheiro ou cartão?',
  'Single or double shot?': 'Dose única ou dupla?',
  'What size would you like?': 'Qual tamanho você gostaria?',
  'Hot or iced?': 'Quente ou gelado?',
  'Would you like it warmed up?': 'Gostaria de esquentar?',
  'Would you like that toasted?': 'Gostaria que fosse tostado?',
  "We're gonna call your name when your order is ready.": 'Vamos chamar seu nome quando seu pedido estiver pronto.',
  'Thank you.': 'Obrigado(a).',
  'Have a good one!': 'Tenha um bom dia! (informal)',
  'Thank you, you too.': 'Obrigado(a), você também.',
  'Tap here.': 'Toque aqui.',
  'You paid with a $20 bill.': 'Você pagou com uma nota de $20.',
};
