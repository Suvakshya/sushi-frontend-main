// "use client";

// import React, { createContext, useContext, useState, useEffect } from 'react';

// export type Language = 'en' | 'pt';

// interface LanguageContextType {
//   language: Language;
//   setLanguage: (lang: Language) => void;
//   t: (text: string) => string;
//   isTranslating: boolean;
//   translatePage: () => Promise<void>;
// }

// const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// // Persistent storage for translations
// const getStoredTranslations = (): Record<string, string> => {
//   if (typeof window === 'undefined') return {};
//   try {
//     return JSON.parse(localStorage.getItem('translations') || '{}');
//   } catch {
//     return {};
//   }
// };

// const setStoredTranslations = (translations: Record<string, string>) => {
//   if (typeof window === 'undefined') return;
//   localStorage.setItem('translations', JSON.stringify(translations));
// };

// // Comprehensive translations dictionary
// const translationsDictionary: Record<string, { en: string; pt: string }> = {
//   // Navigation
//   'menu': { en: 'Menu', pt: 'Cardápio' },
//   'mission': { en: 'Mission', pt: 'Missão' },
//   'sushiboat': { en: 'SushiBoat', pt: 'Barco de Sushi' },
//   'cart': { en: 'Cart', pt: 'Carrinho' },
//   'checkout': { en: 'Checkout', pt: 'Finalizar Compra' },
//   'profile': { en: 'Profile', pt: 'Perfil' },
//   'login': { en: 'Login', pt: 'Entrar' },
//   'logout': { en: 'Logout', pt: 'Sair' },
//   'account': { en: 'Account', pt: 'Conta' },
//   'language': { en: 'Language', pt: 'Idioma' },
//   'logged_in_as': { en: 'Logged in as', pt: 'Conectado como' },
  
//   // Common
//   'welcome': { en: 'Welcome', pt: 'Bem-vindo' },
//   'sushi': { en: 'Sushi', pt: 'Sushi' },
//   'fresh': { en: 'Fresh', pt: 'Fresco' },
//   'order': { en: 'Order', pt: 'Pedido' },
//   'delivery': { en: 'Delivery', pt: 'Entrega' },
//   'takeaway': { en: 'Takeaway', pt: 'Retirada' },
//   'price': { en: 'Price', pt: 'Preço' },
//   'quantity': { en: 'Quantity', pt: 'Quantidade' },
//   'add': { en: 'Add', pt: 'Adicionar' },
//   'remove': { en: 'Remove', pt: 'Remover' },
//   'total': { en: 'Total', pt: 'Total' },
//   'subtotal': { en: 'Subtotal', pt: 'Subtotal' },
//   'tax': { en: 'Tax', pt: 'Imposto' },
//   'payment': { en: 'Payment', pt: 'Pagamento' },
//   'cash': { en: 'Cash', pt: 'Dinheiro' },
//   'card': { en: 'Card', pt: 'Cartão' },
//   'settings': { en: 'Settings', pt: 'Configurações' },
//   'search': { en: 'Search', pt: 'Buscar' },
//   'filter': { en: 'Filter', pt: 'Filtrar' },
//   'sort': { en: 'Sort', pt: 'Ordenar' },
//   'view': { en: 'View', pt: 'Ver' },
//   'edit': { en: 'Edit', pt: 'Editar' },
//   'delete': { en: 'Delete', pt: 'Excluir' },
//   'save': { en: 'Save', pt: 'Salvar' },
//   'cancel': { en: 'Cancel', pt: 'Cancelar' },
//   'confirm': { en: 'Confirm', pt: 'Confirmar' },
//   'submit': { en: 'Submit', pt: 'Enviar' },
//   'loading': { en: 'Loading', pt: 'Carregando' },
//   'error': { en: 'Error', pt: 'Erro' },
//   'success': { en: 'Success', pt: 'Sucesso' },
//   'warning': { en: 'Warning', pt: 'Aviso' },
//   'info': { en: 'Info', pt: 'Informação' },
//   'yes': { en: 'Yes', pt: 'Sim' },
//   'no': { en: 'No', pt: 'Não' },
//   'ok': { en: 'OK', pt: 'OK' },
  
//   // Blog specific
//   'latest': { en: 'Latest', pt: 'Mais Recente' },
//   'read more': { en: 'Read More', pt: 'Ler Mais' },
//   'our story': { en: 'Our Story', pt: 'Nossa História' },
//   'join our team': { en: 'Join Our Team', pt: 'Junte-se à Nossa Equipe' },
//   'subscribe': { en: 'Subscribe', pt: 'Assinar' },
//   'stay updated': { en: 'Stay Updated', pt: 'Mantenha-se Atualizado' },
//   'newsletter': { en: 'Newsletter', pt: 'Boletim Informativo' },

//   // Homepage translations
//   'Loading...': { en: 'Loading...', pt: 'Carregando...' },
//   'Failed to load slider': { en: 'Failed to load slider', pt: 'Falha ao carregar o slider' },
//   'Retry': { en: 'Retry', pt: 'Tentar novamente' },
//   'Order Now': { en: 'Order Now', pt: 'Peça Agora' },
//   'Order Online': { en: 'Order Online', pt: 'Pedir Online' },
//   'Previous slide': { en: 'Previous slide', pt: 'Slide anterior' },
//   'Next slide': { en: 'Next slide', pt: 'Próximo slide' },
//   'Go to slide': { en: 'Go to slide', pt: 'Ir para o slide' },
//   'Popular Dishes': { en: 'Popular Dishes', pt: 'Pratos Populares' },
//   'Failed to load menu items': { en: 'Failed to load menu items', pt: 'Falha ao carregar os itens do menu' },
//   'Try Again': { en: 'Try Again', pt: 'Tentar Novamente' },
//   'Add to Cart': { en: 'Add to Cart', pt: 'Adicionar ao Carrinho' },
//   'No popular dishes available at the moment.': { 
//     en: 'No popular dishes available at the moment.', 
//     pt: 'Nenhum prato popular disponível no momento.' 
//   },
//   'Why Choose SushiMaster?': { 
//     en: 'Why Choose SushiMaster?', 
//     pt: 'Por Que Escolher o SushiMaster?' 
//   },
//   'Fresh Daily': { en: 'Fresh Daily', pt: 'Fresco Diariamente' },
//   'We source the freshest fish daily from trusted suppliers': { 
//     en: 'We source the freshest fish daily from trusted suppliers', 
//     pt: 'Fornecemos os peixes mais frescos diariamente de fornecedores confiáveis' 
//   },
//   'Master Chefs': { en: 'Master Chefs', pt: 'Chefes Mestres' },
//   'Our chefs trained in Japan with decades of experience': { 
//     en: 'Our chefs trained in Japan with decades of experience', 
//     pt: 'Nossos chefs treinaram no Japão com décadas de experiência' 
//   },
//   'Fast Delivery': { en: 'Fast Delivery', pt: 'Entrega Rápida' },
//   'Quick delivery to keep your sushi fresh and delicious': { 
//     en: 'Quick delivery to keep your sushi fresh and delicious', 
//     pt: 'Entrega rápida para manter seu sushi fresco e delicioso' 
//   },
//   'Ready to experience the best sushi?': { 
//     en: 'Ready to experience the best sushi?', 
//     pt: 'Pronto para experimentar o melhor sushi?' 
//   },
//   'Order online or visit us today!': { 
//     en: 'Order online or visit us today!', 
//     pt: 'Peça online ou nos visite hoje!' 
//   },
//   'View Cart': { en: 'View Cart', pt: 'Ver Carrinho' },
//   'Added to cart!': { en: 'Added to cart!', pt: 'Adicionado ao carrinho!' },
//   'Select Language': { en: 'Select Language', pt: 'Selecionar Idioma' },
//   'Translating...': { en: 'Translating...', pt: 'Traduzindo...' },
//   'Refresh Translation': { en: 'Refresh Translation', pt: 'Atualizar Tradução' },

//   // Blog page translations
//   'blog_subtitle': {
//     en: 'Stories, Insights, and News from SushiMaster',
//     pt: 'Histórias, Insights e Notícias do SushiMaster'
//   },
//   'our_goal_title': {
//     en: 'Our goal is fresh, freshly made sushi.',
//     pt: 'Nosso objetivo é sushi fresco, feito na hora.'
//   },
//   'our_story_paragraph1': {
//     en: 'At Home Sweet Sushi, we believe that sushi can be much more than a meal; it\'s a way to bring comfort, freshness, and happiness. We started in 2014 in a small kitchen, driven by passion and creativity, and have grown to become your trusted choice, with stores in Lisbon, Seixal, and Porto.',
//     pt: 'No Home Sweet Sushi, acreditamos que o sushi pode ser muito mais que uma refeição; é uma forma de trazer conforto, frescor e felicidade. Começamos em 2014 em uma pequena cozinha, movidos pela paixão e criatividade, e crescemos para nos tornarmos sua escolha de confiança, com lojas em Lisboa, Seixal e Porto.'
//   },
//   'our_story_paragraph2': {
//     en: 'Our mission is clear: to bring the best sushi experience to your home, with freshness and flavor in every order. But deliciousness isn\'t enough—we\'re committed to doing better for the planet. We\'ve said goodbye to plastic, invested in recyclable packaging, and transformed used oil into biodiesel. We work with local suppliers and optimize every detail because we believe sushi can be both fresh and responsible.',
//     pt: 'Nossa missão é clara: levar a melhor experiência de sushi para sua casa, com frescor e sabor em cada pedido. Mas a delícia não é suficiente — estamos comprometidos em fazer melhor pelo planeta. Dissemos adeus ao plástico, investimos em embalagens recicláveis e transformamos óleo usado em biodiesel. Trabalhamos com fornecedores locais e otimizamos cada detalhe porque acreditamos que o sushi pode ser fresco e responsável.'
//   },
//   'our_story_paragraph3': {
//     en: 'And we\'re not stopping here! We want to continue surprising you, brightening your days, and proving that happiness really can come in the form of sushi. After all, we\'re here to make a difference—one piece of sushi at a time.',
//     pt: 'E não paramos por aqui! Queremos continuar surpreendendo você, alegrando seus dias e provando que a felicidade realmente pode vir em forma de sushi. Afinal, estamos aqui para fazer a diferença — um pedaço de sushi de cada vez.'
//   },
//   'our_story_quote': {
//     en: 'Home Sweet Sushi: It\'s all about freshness.',
//     pt: 'Home Sweet Sushi: Tudo gira em torno da frescura.'
//   },
//   'our_story_image_alt': {
//     en: 'Our Sushi Story',
//     pt: 'Nossa História de Sushi'
//   },
//   'careers_title': {
//     en: 'Let\'s get to work... Or rather, to sushi🍣',
//     pt: 'Vamos trabalhar... Ou melhor, ao sushi🍣'
//   },
//   'careers_paragraph1': {
//     en: 'We\'re looking for talented people who are passionate about sushi and eager to grow within a relaxed team focused on the art of Japanese cuisine. Here, you\'ll hone your skills, explore new flavors, and work in a fast-paced, yet always positive environment!',
//     pt: 'Estamos procurando pessoas talentosas que sejam apaixonadas por sushi e ansiosas para crescer dentro de uma equipe descontraída focada na arte da culinária japonesa. Aqui, você aprimorará suas habilidades, explorará novos sabores e trabalhará em um ambiente dinâmico, mas sempre positivo!'
//   },
//   'careers_paragraph2': {
//     en: 'If you have knife skills, attention to detail, and a desire to learn (or perfect) the art of sushi, we want to hear from you!',
//     pt: 'Se você tem habilidades com facas, atenção aos detalhes e desejo de aprender (ou aperfeiçoar) a arte do sushi, queremos ouvir você!'
//   },
//   'careers_quote': {
//     en: 'Submit your application and come join our kitchen.🍙',
//     pt: 'Envie sua inscrição e venha se juntar à nossa cozinha.🍙'
//   },
//   'careers_image_alt': {
//     en: 'Join Our Team',
//     pt: 'Junte-se à Nossa Equipe'
//   },
//   'email_placeholder': {
//     en: 'Enter your email',
//     pt: 'Digite seu e-mail'
//   },

//   // Footer translations
//   'Fresh sushi, authentic flavors, unforgettable experience. Crafted with passion, served with perfection.': {
//     en: 'Fresh sushi, authentic flavors, unforgettable experience. Crafted with passion, served with perfection.',
//     pt: 'Sushi fresco, sabores autênticos, experiência inesquecível. Feito com paixão, servido com perfeição.'
//   },
//   'We Accept': {
//     en: 'We Accept',
//     pt: 'Aceitamos'
//   },
//   'Navigation': {
//     en: 'Navigation',
//     pt: 'Navegação'
//   },
//   'Feedback': {
//     en: 'Feedback',
//     pt: 'Feedback'
//   },
//   'Work with us': {
//     en: 'Work with us',
//     pt: 'Trabalhe conosco'
//   },
//   'Legal': {
//     en: 'Legal',
//     pt: 'Legal'
//   },
//   'Privacy Policy': {
//     en: 'Privacy Policy',
//     pt: 'Política de Privacidade'
//   },
//   'Terms & Conditions': {
//     en: 'Terms & Conditions',
//     pt: 'Termos e Condições'
//   },
//   'FAQ': {
//     en: 'FAQ',
//     pt: 'Perguntas Frequentes'
//   },
//   'Follow Us': {
//     en: 'Follow Us',
//     pt: 'Siga-nos'
//   },
//   'Instagram': {
//     en: 'Instagram',
//     pt: 'Instagram'
//   },
//   'Facebook': {
//     en: 'Facebook',
//     pt: 'Facebook'
//   },
//   'All rights reserved.': {
//     en: 'All rights reserved.',
//     pt: 'Todos os direitos reservados.'
//   },
//   'Crafted with passion': {
//     en: 'Crafted with passion',
//     pt: 'Feito com paixão'
//   },

//   //menu section translation 
//   // Add these to your translationsDictionary
// 'Experience authentic Japanese cuisine crafted with precision and passion. Fresh ingredients, traditional techniques, modern flavors.': {
//   en: 'Experience authentic Japanese cuisine crafted with precision and passion. Fresh ingredients, traditional techniques, modern flavors.',
//   pt: 'Experimente a autêntica culinária japonesa elaborada com precisão e paixão. Ingredientes frescos, técnicas tradicionais, sabores modernos.'
// },

// 'Cart': {
//   en: 'Cart',
//   pt: 'Carrinho'
// },

// 'Sushi Rolls': {
//   en: 'Sushi Rolls',
//   pt: 'Rolos de Sushi'
// },
// 'Handcrafted Traditional Rolls': {
//   en: 'Handcrafted Traditional Rolls',
//   pt: 'Rolos Tradicionais Feitos à Mão'
// },
// 'Sashimi': {
//   en: 'Sashimi',
//   pt: 'Sashimi'
// },
// 'Premium Fresh Seafood': {
//   en: 'Premium Fresh Seafood',
//   pt: 'Frutos do Mar Frescos Premium'
// },
// 'Beverages': {
//   en: 'Beverages',
//   pt: 'Bebidas'
// },
// 'Refreshing Drinks & Sake': {
//   en: 'Refreshing Drinks & Sake',
//   pt: 'Bebidas Refrescantes e Sake'
// },
// 'Appetizers': {
//   en: 'Appetizers',
//   pt: 'Aperitivos'
// },
// 'Perfect Starters': {
//   en: 'Perfect Starters',
//   pt: 'Entradas Perfeitas'
// },
// 'Desserts': {
//   en: 'Desserts',
//   pt: 'Sobremesas'
// },
// 'Sweet Finales': {
//   en: 'Sweet Finales',
//   pt: 'Finais Doces'
// },

// 'No sushi rolls available at the moment.': {
//   en: 'No sushi rolls available at the moment.',
//   pt: 'Nenhum rolo de sushi disponível no momento.'
// },
// 'No sashimi available at the moment.': {
//   en: 'No sashimi available at the moment.',
//   pt: 'Nenhum sashimi disponível no momento.'
// },
// 'No beverages available at the moment.': {
//   en: 'No beverages available at the moment.',
//   pt: 'Nenhuma bebida disponível no momento.'
// },
// 'No appetizers available at the moment.': {
//   en: 'No appetizers available at the moment.',
//   pt: 'Nenhum aperitivo disponível no momento.'
// },
// 'No desserts available at the moment.': {
//   en: 'No desserts available at the moment.',
//   pt: 'Nenhuma sobremesa disponível no momento.'
// },

// 'Order online now or visit us for an authentic Japanese dining experience': {
//   en: 'Order online now or visit us for an authentic Japanese dining experience',
//   pt: 'Peça online agora ou nos visite para uma autêntica experiência de jantar japonês'
// },
// 'Call Us': {
//   en: 'Call Us',
//   pt: 'Ligue para Nós'
// },

// };

// export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [language, setLanguage] = useState<Language>('en');
//   const [translations, setTranslations] = useState<Record<string, string>>({});
//   const [isTranslating, setIsTranslating] = useState(false);

//   // Initialize from localStorage
//   useEffect(() => {
//     const savedLanguage = localStorage.getItem('language') as Language;
//     const savedTranslations = getStoredTranslations();
    
//     if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'pt')) {
//       setLanguage(savedLanguage);
//     }
    
//     setTranslations(savedTranslations);
//   }, []);

//   // Save to localStorage when changes occur
//   useEffect(() => {
//     localStorage.setItem('language', language);
//     document.documentElement.lang = language;
//   }, [language]);

//   useEffect(() => {
//     setStoredTranslations(translations);
//   }, [translations]);

//   // Backend translation function
//   const translateWithBackend = async (texts: string[], targetLang: Language): Promise<Record<string, string>> => {
//     try {
//       const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';
//       const response = await fetch(`${API_BASE_URL}/translate`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           texts: texts,
//           targetLang: targetLang
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Translation service unavailable');
//       }

//       const result = await response.json();
      
//       if (result.success) {
//         return result.data;
//       } else {
//         throw new Error(result.message);
//       }
//     } catch (error) {
//       console.error('Backend translation failed:', error);
//       // Fallback to dictionary-based translation
//       return dictionaryTranslateBatch(texts, targetLang);
//     }
//   };

//   // Dictionary-based translation fallback - FIXED SYNTAX
//   const dictionaryTranslateBatch = (texts: string[], targetLang: Language): Record<string, string> => {
//     const result: Record<string, string> = {};
    
//     texts.forEach(text => {
//       const lowerText = text.toLowerCase();
//       const translation = translationsDictionary[text] || translationsDictionary[lowerText];
      
//       if (translation) {
//         result[text] = translation[targetLang];
//       } else {
//         // Fallback to word-by-word translation for unknown phrases
//         result[text] = simpleWordTranslate(text, targetLang);
//       }
//     });

//     return result;
//   };

//   // Simple word-by-word translation for unknown phrases
//   const simpleWordTranslate = (text: string, targetLang: Language): string => {
//     if (targetLang === 'en') return text;

//     const wordMap: Record<string, string> = {
//       'the': 'o', 'a': 'um', 'an': 'uma', 'and': 'e', 'or': 'ou', 'but': 'mas',
//       'in': 'em', 'on': 'sobre', 'at': 'em', 'to': 'para', 'for': 'para',
//       'with': 'com', 'by': 'por', 'from': 'de', 'about': 'sobre', 'as': 'como',
//       'into': 'em', 'through': 'através', 'during': 'durante', 'before': 'antes',
//       'after': 'depois', 'above': 'acima', 'below': 'abaixo', 'between': 'entre',
//       'among': 'entre', 'under': 'sob', 'over': 'sobre', 'again': 'novamente',
//       'further': 'além', 'then': 'então', 'once': 'uma vez', 'here': 'aqui',
//       'there': 'lá', 'when': 'quando', 'where': 'onde', 'why': 'por que',
//       'how': 'como', 'all': 'todos', 'any': 'qualquer', 'both': 'ambos',
//       'each': 'cada', 'few': 'poucos', 'more': 'mais', 'most': 'mais',
//       'other': 'outro', 'some': 'alguns', 'such': 'tal', 'only': 'somente',
//       'own': 'próprio', 'same': 'mesmo', 'so': 'então', 'than': 'do que',
//       'too': 'também', 'very': 'muito', 'just': 'apenas', 'now': 'agora',
//     };

//     return text.split(' ').map(word => {
//       const cleanWord = word.toLowerCase().replace(/[.,!?;:]$/, '');
//       const translated = wordMap[cleanWord] || word;
      
//       // Preserve capitalization
//       if (word[0] === word[0]?.toUpperCase()) {
//         return translated.charAt(0).toUpperCase() + translated.slice(1);
//       }
//       return translated;
//     }).join(' ');
//   };

//   // Function to translate entire page
//   const translatePage = async (): Promise<void> => {
//     if (language === 'en') return; // No need to translate English
    
//     setIsTranslating(true);
    
//     try {
//       // Collect all unique text nodes from the page
//       const textNodes = new Set<string>();
      
//       const walker = document.createTreeWalker(
//         document.body,
//         NodeFilter.SHOW_TEXT,
//         {
//           acceptNode: function(node) {
//             // Only include text nodes that are visible and not in scripts/styles
//             if (node.parentElement && 
//                 !['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(node.parentElement.tagName) &&
//                 node.textContent?.trim()) {
//               return NodeFilter.FILTER_ACCEPT;
//             }
//             return NodeFilter.FILTER_REJECT;
//           }
//         }
//       );

//       let node;
//       while (node = walker.nextNode()) {
//         const text = node.textContent?.trim();
//         if (text && text.length > 1) { // Ignore single characters
//           textNodes.add(text);
//         }
//       }

//       const textsToTranslate = Array.from(textNodes);
      
//       if (textsToTranslate.length > 0) {
//         const newTranslations = await translateWithBackend(textsToTranslate, language);
//         setTranslations(prev => ({ ...prev, ...newTranslations }));
//       }
//     } catch (error) {
//       console.error('Page translation failed:', error);
//     } finally {
//       setIsTranslating(false);
//     }
//   };

//   // Main translation function
//   const t = (text: string): string => {
//     if (language === 'en') return text;
    
//     // Check if we already have a translation
//     if (translations[text]) {
//       return translations[text];
//     }

//     // Check dictionary first
//     const dictionaryTranslation = translationsDictionary[text] || translationsDictionary[text.toLowerCase()];
//     if (dictionaryTranslation) {
//       return dictionaryTranslation[language];
//     }

//     // For new text, try to translate immediately via backend
//     if (text.trim() && !translations[text]) {
//       // Queue for translation (non-blocking)
//       setTimeout(async () => {
//         try {
//           const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';
//           const response = await fetch(`${API_BASE_URL}/translate-single`, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//               text: text,
//               targetLang: language
//             }),
//           });

//           if (response.ok) {
//             const result = await response.json();
//             if (result.success) {
//               setTranslations(prev => ({
//                 ...prev,
//                 [text]: result.data.translated
//               }));
//             }
//           }
//         } catch (error) {
//           console.error('Single translation failed:', error);
//         }
//       }, 0);
//     }

//     // Return original text while translating
//     return text;
//   };

//   const value: LanguageContextType = {
//     language,
//     setLanguage: (newLang: Language) => {
//       setLanguage(newLang);
//       if (newLang !== 'en') {
//         // Auto-translate when switching to Portuguese
//         setTimeout(() => translatePage(), 100);
//       }
//     },
//     t,
//     isTranslating,
//     translatePage
//   };

//   return (
//     <LanguageContext.Provider value={value}>
//       {children}
//     </LanguageContext.Provider>
//   );
// };

// export const useLanguage = (): LanguageContextType => {
//   const context = useContext(LanguageContext);
//   if (context === undefined) {
//     throw new Error('useLanguage must be used within a LanguageProvider');
//   }
//   return context;
// };
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (text: string) => string;
  isTranslating: boolean;
  translatePage: () => Promise<void>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Persistent storage for translations
const getStoredTranslations = (): Record<string, string> => {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem('translations') || '{}');
  } catch {
    return {};
  }
};

const setStoredTranslations = (translations: Record<string, string>) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('translations', JSON.stringify(translations));
};

// Comprehensive translations dictionary
const translationsDictionary: Record<string, { en: string; pt: string }> = {
  // Navigation
  'menu': { en: 'Menu', pt: 'Cardápio' },
  'mission': { en: 'Mission', pt: 'Missão' },
  'sushiboat': { en: 'SushiBoat', pt: 'Barco de Sushi' },
  'cart': { en: 'Cart', pt: 'Carrinho' },
  'checkout': { en: 'Checkout', pt: 'Finalizar Compra' },
  'profile': { en: 'Profile', pt: 'Perfil' },
  'login': { en: 'Login', pt: 'Entrar' },
  'logout': { en: 'Logout', pt: 'Sair' },
  'account': { en: 'Account', pt: 'Conta' },
  'language': { en: 'Language', pt: 'Idioma' },
  'logged_in_as': { en: 'Logged in as', pt: 'Conectado como' },
  
  // Common
  'welcome': { en: 'Welcome', pt: 'Bem-vindo' },
  'sushi': { en: 'Sushi', pt: 'Sushi' },
  'fresh': { en: 'Fresh', pt: 'Fresco' },
  'order': { en: 'Order', pt: 'Pedido' },
  'delivery': { en: 'Delivery', pt: 'Entrega' },
  'takeaway': { en: 'Takeaway', pt: 'Retirada' },
  'price': { en: 'Price', pt: 'Preço' },
  'quantity': { en: 'Quantity', pt: 'Quantidade' },
  'add': { en: 'Add', pt: 'Adicionar' },
  'remove': { en: 'Remove', pt: 'Remover' },
  'total': { en: 'Total', pt: 'Total' },
  'subtotal': { en: 'Subtotal', pt: 'Subtotal' },
  'tax': { en: 'Tax', pt: 'Imposto' },
  'payment': { en: 'Payment', pt: 'Pagamento' },
  'cash': { en: 'Cash', pt: 'Dinheiro' },
  'card': { en: 'Card', pt: 'Cartão' },
  'settings': { en: 'Settings', pt: 'Configurações' },
  'search': { en: 'Search', pt: 'Buscar' },
  'filter': { en: 'Filter', pt: 'Filtrar' },
  'sort': { en: 'Sort', pt: 'Ordenar' },
  'view': { en: 'View', pt: 'Ver' },
  'edit': { en: 'Edit', pt: 'Editar' },
  'delete': { en: 'Delete', pt: 'Excluir' },
  'save': { en: 'Save', pt: 'Salvar' },
  'cancel': { en: 'Cancel', pt: 'Cancelar' },
  'confirm': { en: 'Confirm', pt: 'Confirmar' },
  'submit': { en: 'Submit', pt: 'Enviar' },
  'loading': { en: 'Loading', pt: 'Carregando' },
  'error': { en: 'Error', pt: 'Erro' },
  'success': { en: 'Success', pt: 'Sucesso' },
  'warning': { en: 'Warning', pt: 'Aviso' },
  'info': { en: 'Info', pt: 'Informação' },
  'yes': { en: 'Yes', pt: 'Sim' },
  'no': { en: 'No', pt: 'Não' },
  'ok': { en: 'OK', pt: 'OK' },
  
  // Blog specific
  'latest': { en: 'Latest', pt: 'Mais Recente' },
  'read more': { en: 'Read More', pt: 'Ler Mais' },
  'our story': { en: 'Our Story', pt: 'Nossa História' },
  'join our team': { en: 'Join Our Team', pt: 'Junte-se à Nossa Equipe' },
  'subscribe': { en: 'Subscribe', pt: 'Assinar' },
  'stay updated': { en: 'Stay Updated', pt: 'Mantenha-se Atualizado' },
  'newsletter': { en: 'Newsletter', pt: 'Boletim Informativo' },

  // Homepage translations
  'Loading...': { en: 'Loading...', pt: 'Carregando...' },
  'Failed to load slider': { en: 'Failed to load slider', pt: 'Falha ao carregar o slider' },
  'Retry': { en: 'Retry', pt: 'Tentar novamente' },
  'Order Now': { en: 'Order Now', pt: 'Peça Agora' },
  'Order Online': { en: 'Order Online', pt: 'Pedir Online' },
  'Previous slide': { en: 'Previous slide', pt: 'Slide anterior' },
  'Next slide': { en: 'Next slide', pt: 'Próximo slide' },
  'Go to slide': { en: 'Go to slide', pt: 'Ir para o slide' },
  'Popular Dishes': { en: 'Popular Dishes', pt: 'Pratos Populares' },
  'Failed to load menu items': { en: 'Failed to load menu items', pt: 'Falha ao carregar os itens do menu' },
  'Try Again': { en: 'Try Again', pt: 'Tentar Novamente' },
  'Add to Cart': { en: 'Add to Cart', pt: 'Adicionar ao Carrinho' },
  'No popular dishes available at the moment.': { 
    en: 'No popular dishes available at the moment.', 
    pt: 'Nenhum prato popular disponível no momento.' 
  },
  'Why Choose SushiMaster?': { 
    en: 'Why Choose SushiMaster?', 
    pt: 'Por Que Escolher o SushiMaster?' 
  },
  'Fresh Daily': { en: 'Fresh Daily', pt: 'Fresco Diariamente' },
  'We source the freshest fish daily from trusted suppliers': { 
    en: 'We source the freshest fish daily from trusted suppliers', 
    pt: 'Fornecemos os peixes mais frescos diariamente de fornecedores confiáveis' 
  },
  'Master Chefs': { en: 'Master Chefs', pt: 'Chefes Mestres' },
  'Our chefs trained in Japan with decades of experience': { 
    en: 'Our chefs trained in Japan with decades of experience', 
    pt: 'Nossos chefs treinaram no Japão com décadas de experiência' 
  },
  'Fast Delivery': { en: 'Fast Delivery', pt: 'Entrega Rápida' },
  'Quick delivery to keep your sushi fresh and delicious': { 
    en: 'Quick delivery to keep your sushi fresh and delicious', 
    pt: 'Entrega rápida para manter seu sushi fresco e delicioso' 
  },
  'Ready to experience the best sushi?': { 
    en: 'Ready to experience the best sushi?', 
    pt: 'Pronto para experimentar o melhor sushi?' 
  },
  'Order online or visit us today!': { 
    en: 'Order online or visit us today!', 
    pt: 'Peça online ou nos visite hoje!' 
  },
  'View Cart': { en: 'View Cart', pt: 'Ver Carrinho' },
  'Added to cart!': { en: 'Added to cart!', pt: 'Adicionado ao carrinho!' },
  'Select Language': { en: 'Select Language', pt: 'Selecionar Idioma' },
  'Translating...': { en: 'Translating...', pt: 'Traduzindo...' },
  'Refresh Translation': { en: 'Refresh Translation', pt: 'Atualizar Tradução' },

  // Blog page translations
  'blog_subtitle': {
    en: 'Stories, Insights, and News from SushiMaster',
    pt: 'Histórias, Insights e Notícias do SushiMaster'
  },
  'our_goal_title': {
    en: 'Our goal is fresh, freshly made sushi.',
    pt: 'Nosso objetivo é sushi fresco, feito na hora.'
  },
  'our_story_paragraph1': {
    en: 'At Home Sweet Sushi, we believe that sushi can be much more than a meal; it\'s a way to bring comfort, freshness, and happiness. We started in 2014 in a small kitchen, driven by passion and creativity, and have grown to become your trusted choice, with stores in Lisbon, Seixal, and Porto.',
    pt: 'No Home Sweet Sushi, acreditamos que o sushi pode ser muito mais que uma refeição; é uma forma de trazer conforto, frescor e felicidade. Começamos em 2014 em uma pequena cozinha, movidos pela paixão e criatividade, e crescemos para nos tornarmos sua escolha de confiança, com lojas em Lisboa, Seixal e Porto.'
  },
  'our_story_paragraph2': {
    en: 'Our mission is clear: to bring the best sushi experience to your home, with freshness and flavor in every order. But deliciousness isn\'t enough—we\'re committed to doing better for the planet. We\'ve said goodbye to plastic, invested in recyclable packaging, and transformed used oil into biodiesel. We work with local suppliers and optimize every detail because we believe sushi can be both fresh and responsible.',
    pt: 'Nossa missão é clara: levar a melhor experiência de sushi para sua casa, com frescor e sabor em cada pedido. Mas a delícia não é suficiente — estamos comprometidos em fazer melhor pelo planeta. Dissemos adeus ao plástico, investimos em embalagens recicláveis e transformamos óleo usado em biodiesel. Trabalhamos com fornecedores locais e otimizamos cada detalhe porque acreditamos que o sushi pode ser fresco e responsável.'
  },
  'our_story_paragraph3': {
    en: 'And we\'re not stopping here! We want to continue surprising you, brightening your days, and proving that happiness really can come in the form of sushi. After all, we\'re here to make a difference—one piece of sushi at a time.',
    pt: 'E não paramos por aqui! Queremos continuar surpreendendo você, alegrando seus dias e provando que a felicidade realmente pode vir em forma de sushi. Afinal, estamos aqui para fazer a diferença — um pedaço de sushi de cada vez.'
  },
  'our_story_quote': {
    en: 'Home Sweet Sushi: It\'s all about freshness.',
    pt: 'Home Sweet Sushi: Tudo gira em torno da frescura.'
  },
  'our_story_image_alt': {
    en: 'Our Sushi Story',
    pt: 'Nossa História de Sushi'
  },
  'careers_title': {
    en: 'Let\'s get to work... Or rather, to sushi🍣',
    pt: 'Vamos trabalhar... Ou melhor, ao sushi🍣'
  },
  'careers_paragraph1': {
    en: 'We\'re looking for talented people who are passionate about sushi and eager to grow within a relaxed team focused on the art of Japanese cuisine. Here, you\'ll hone your skills, explore new flavors, and work in a fast-paced, yet always positive environment!',
    pt: 'Estamos procurando pessoas talentosas que sejam apaixonadas por sushi e ansiosas para crescer dentro de uma equipe descontraída focada na arte da culinária japonesa. Aqui, você aprimorará suas habilidades, explorará novos sabores e trabalhará em um ambiente dinâmico, mas sempre positivo!'
  },
  'careers_paragraph2': {
    en: 'If you have knife skills, attention to detail, and a desire to learn (or perfect) the art of sushi, we want to hear from you!',
    pt: 'Se você tem habilidades com facas, atenção aos detalhes e desejo de aprender (ou aperfeiçoar) a arte do sushi, queremos ouvir você!'
  },
  'careers_quote': {
    en: 'Submit your application and come join our kitchen.🍙',
    pt: 'Envie sua inscrição e venha se juntar à nossa cozinha.🍙'
  },
  'careers_image_alt': {
    en: 'Join Our Team',
    pt: 'Junte-se à Nossa Equipe'
  },
  'email_placeholder': {
    en: 'Enter your email',
    pt: 'Digite seu e-mail'
  },

  // Footer translations
  'Fresh sushi, authentic flavors, unforgettable experience. Crafted with passion, served with perfection.': {
    en: 'Fresh sushi, authentic flavors, unforgettable experience. Crafted with passion, served with perfection.',
    pt: 'Sushi fresco, sabores autênticos, experiência inesquecível. Feito com paixão, servido com perfeição.'
  },
  'We Accept': {
    en: 'We Accept',
    pt: 'Aceitamos'
  },
  'Navigation': {
    en: 'Navigation',
    pt: 'Navegação'
  },
  'Feedback': {
    en: 'Feedback',
    pt: 'Feedback'
  },
  'Work with us': {
    en: 'Work with us',
    pt: 'Trabalhe conosco'
  },
  'Legal': {
    en: 'Legal',
    pt: 'Legal'
  },
  'Privacy Policy': {
    en: 'Privacy Policy',
    pt: 'Política de Privacidade'
  },
  'Terms & Conditions': {
    en: 'Terms & Conditions',
    pt: 'Termos e Condições'
  },
  'FAQ': {
    en: 'FAQ',
    pt: 'Perguntas Frequentes'
  },
  'Follow Us': {
    en: 'Follow Us',
    pt: 'Siga-nos'
  },
  'Instagram': {
    en: 'Instagram',
    pt: 'Instagram'
  },
  'Facebook': {
    en: 'Facebook',
    pt: 'Facebook'
  },
  'All rights reserved.': {
    en: 'All rights reserved.',
    pt: 'Todos os direitos reservados.'
  },
  'Crafted with passion': {
    en: 'Crafted with passion',
    pt: 'Feito com paixão'
  },

  // Menu section translations
  'Experience authentic Japanese cuisine crafted with precision and passion. Fresh ingredients, traditional techniques, modern flavors.': {
    en: 'Experience authentic Japanese cuisine crafted with precision and passion. Fresh ingredients, traditional techniques, modern flavors.',
    pt: 'Experimente a autêntica culinária japonesa elaborada com precisão e paixão. Ingredientes frescos, técnicas tradicionais, sabores modernos.'
  },
  'Cart': {
    en: 'Cart',
    pt: 'Carrinho'
  },
  'Sushi Rolls': {
    en: 'Sushi Rolls',
    pt: 'Rolos de Sushi'
  },
  'Handcrafted Traditional Rolls': {
    en: 'Handcrafted Traditional Rolls',
    pt: 'Rolos Tradicionais Feitos à Mão'
  },
  'Sashimi': {
    en: 'Sashimi',
    pt: 'Sashimi'
  },
  'Premium Fresh Seafood': {
    en: 'Premium Fresh Seafood',
    pt: 'Frutos do Mar Frescos Premium'
  },
  'Beverages': {
    en: 'Beverages',
    pt: 'Bebidas'
  },
  'Refreshing Drinks & Sake': {
    en: 'Refreshing Drinks & Sake',
    pt: 'Bebidas Refrescantes e Sake'
  },
  'Appetizers': {
    en: 'Appetizers',
    pt: 'Aperitivos'
  },
  'Perfect Starters': {
    en: 'Perfect Starters',
    pt: 'Entradas Perfeitas'
  },
  'Desserts': {
    en: 'Desserts',
    pt: 'Sobremesas'
  },
  'Sweet Finales': {
    en: 'Sweet Finales',
    pt: 'Finais Doces'
  },
  'No sushi rolls available at the moment.': {
    en: 'No sushi rolls available at the moment.',
    pt: 'Nenhum rolo de sushi disponível no momento.'
  },
  'No sashimi available at the moment.': {
    en: 'No sashimi available at the moment.',
    pt: 'Nenhum sashimi disponível no momento.'
  },
  'No beverages available at the moment.': {
    en: 'No beverages available at the moment.',
    pt: 'Nenhuma bebida disponível no momento.'
  },
  'No appetizers available at the moment.': {
    en: 'No appetizers available at the moment.',
    pt: 'Nenhum aperitivo disponível no momento.'
  },
  'No desserts available at the moment.': {
    en: 'No desserts available at the moment.',
    pt: 'Nenhuma sobremesa disponível no momento.'
  },
  'Order online now or visit us for an authentic Japanese dining experience': {
    en: 'Order online now or visit us for an authentic Japanese dining experience',
    pt: 'Peça online agora ou nos visite para uma autêntica experiência de jantar japonês'
  },
  'Call Us': {
    en: 'Call Us',
    pt: 'Ligue para Nós'
  },

  // Receipts translations
  'Receipts': {
    en: 'Receipts',
    pt: 'Recibos'
  },
  'No receipts found': {
    en: 'No receipts found',
    pt: 'Nenhum recibo encontrado'
  },
  'View all receipts': {
    en: 'View all receipts',
    pt: 'Ver todos os recibos'
  },
  'Delete Receipt': {
    en: 'Delete Receipt',
    pt: 'Excluir Recibo'
  },
  'Download Receipt': {
    en: 'Download Receipt',
    pt: 'Baixar Recibo'
  },
  'Order Receipt': {
    en: 'Order Receipt',
    pt: 'Recibo do Pedido'
  },
  'Delete Receipt?': {
    en: 'Delete Receipt?',
    pt: 'Excluir Recibo?'
  },
  'Are you sure you want to delete this receipt? This action cannot be undone.': {
    en: 'Are you sure you want to delete this receipt? This action cannot be undone.',
    pt: 'Tem certeza de que deseja excluir este recibo? Esta ação não pode ser desfeita.'
  },
  'Customer Name': {
    en: 'Customer Name',
    pt: 'Nome do Cliente'
  },
  'Customer Email': {
    en: 'Customer Email',
    pt: 'E-mail do Cliente'
  },
  'Order Type': {
    en: 'Order Type',
    pt: 'Tipo de Pedido'
  },
  'Payment Method': {
    en: 'Payment Method',
    pt: 'Método de Pagamento'
  },
  'Order Date': {
    en: 'Order Date',
    pt: 'Data do Pedido'
  },
  'Order Items': {
    en: 'Order Items',
    pt: 'Itens do Pedido'
  },
  'Total Amount': {
    en: 'Total Amount',
    pt: 'Valor Total'
  },
  'Quantity': {
    en: 'Quantity',
    pt: 'Quantidade'
  },
  'Order confirmed!': {
    en: 'Order confirmed!',
    pt: 'Pedido confirmado!'
  },
  'Thank you for your order. We\'re preparing it now.': {
    en: 'Thank you for your order. We\'re preparing it now.',
    pt: 'Obrigado pelo seu pedido. Estamos preparando agora.'
  },
  'Customer Information': {
    en: 'Customer Information',
    pt: 'Informações do Cliente'
  },
  'Order Information': {
    en: 'Order Information',
    pt: 'Informações do Pedido'
  },
  'Order ID': {
    en: 'Order ID',
    pt: 'ID do Pedido'
  },
  'Order Status': {
    en: 'Order Status',
    pt: 'Status do Pedido'
  },
  'What\'s Next?': {
    en: 'What\'s Next?',
    pt: 'O Que Vem A Seguir?'
  },
  'You will receive an order confirmation email shortly': {
    en: 'You will receive an order confirmation email shortly',
    pt: 'Você receberá um e-mail de confirmação do pedido em breve'
  },
  'We\'ll notify you when your order is ready for': {
    en: 'We\'ll notify you when your order is ready for',
    pt: 'Avisaremos quando seu pedido estiver pronto para'
  },
  'Estimated preparation time: 20-30 minutes': {
    en: 'Estimated preparation time: 20-30 minutes',
    pt: 'Tempo estimado de preparação: 20-30 minutos'
  },
  'Delivery time: 30-45 minutes': {
    en: 'Delivery time: 30-45 minutes',
    pt: 'Tempo de entrega: 30-45 minutos'
  },
  'Order Again': {
    en: 'Order Again',
    pt: 'Pedir Novamente'
  },
  'Back to Home': {
    en: 'Back to Home',
    pt: 'Voltar para Home'
  },
  'We have received your order': {
    en: 'We have received your order',
    pt: 'Recebemos seu pedido'
  },
  'Your food is being prepared': {
    en: 'Your food is being prepared',
    pt: 'Sua comida está sendo preparada'
  },
  'Your order is on the way': {
    en: 'Your order is on the way',
    pt: 'Seu pedido está a caminho'
  },
  'Order delivered successfully': {
    en: 'Order delivered successfully',
    pt: 'Pedido entregue com sucesso'
  },
  'Pending': {
    en: 'Pending',
    pt: 'Pendente'
  },
  'Preparing': {
    en: 'Preparing',
    pt: 'Preparando'
  },
  'Out for Delivery': {
    en: 'Out for Delivery',
    pt: 'Saiu para Entrega'
  },
  'Completed': {
    en: 'Completed',
    pt: 'Concluído'
  },
  'Cash': {
    en: 'Cash',
    pt: 'Dinheiro'
  },
  'Card': {
    en: 'Card',
    pt: 'Cartão'
  },
  'Delivery': {
    en: 'Delivery',
    pt: 'Entrega'
  },
  'Takeaway': {
    en: 'Takeaway',
    pt: 'Retirada'
  },
  'Order Not Found': {
    en: 'Order Not Found',
    pt: 'Pedido Não Encontrado'
  },
  'The order you\'re looking for doesn\'t exist.': {
    en: 'The order you\'re looking for doesn\'t exist.',
    pt: 'O pedido que você está procurando não existe.'
  },
  'Back to Menu': {
    en: 'Back to Menu',
    pt: 'Voltar ao Cardápio'
  },
  'Loading order details...': {
    en: 'Loading order details...',
    pt: 'Carregando detalhes do pedido...'
  },
  // Add these to your translationsDictionary in LanguageContext.tsx
'Stories, Insights, and News from SushiMaster': {
  en: 'Stories, Insights, and News from SushiMaster',
  pt: 'Histórias, Insights e Notícias do SushiMaster'
},
'Latest': {
  en: 'Latest',
  pt: 'Mais Recente'
},
'Read More': {
  en: 'Read More',
  pt: 'Ler Mais'
},
'Careers': {
  en: 'Careers',
  pt: 'Carreiras'
},
"Let's get to work... Or rather, to sushi🍣": {
  en: "Let's get to work... Or rather, to sushi🍣",
  pt: "Vamos trabalhar... Ou melhor, ao sushi🍣"
},
"We're looking for talented people who are passionate about sushi and eager to grow within a relaxed team focused on the art of Japanese cuisine. Here, you'll hone your skills, explore new flavors, and work in a fast-paced, yet always positive environment!": {
  en: "We're looking for talented people who are passionate about sushi and eager to grow within a relaxed team focused on the art of Japanese cuisine. Here, you'll hone your skills, explore new flavors, and work in a fast-paced, yet always positive environment!",
  pt: "Estamos procurando pessoas talentosas que sejam apaixonadas por sushi e ansiosas para crescer dentro de uma equipe descontraída focada na arte da culinária japonesa. Aqui, você aprimorará suas habilidades, explorará novos sabores e trabalhará em um ambiente dinâmico, mas sempre positivo!"
},
"If you have knife skills, attention to detail, and a desire to learn (or perfect) the art of sushi, we want to hear from you!": {
  en: "If you have knife skills, attention to detail, and a desire to learn (or perfect) the art of sushi, we want to hear from you!",
  pt: "Se você tem habilidades com facas, atenção aos detalhes e desejo de aprender (ou aperfeiçoar) a arte do sushi, queremos ouvir você!"
},
'Submit your application and come join our kitchen.🍙': {
  en: 'Submit your application and come join our kitchen.🍙',
  pt: 'Envie sua inscrição e venha se juntar à nossa cozinha.🍙'
},
'Join Our Team': {
  en: 'Join Our Team',
  pt: 'Junte-se à Nossa Equipe'
},
// Add these to your translationsDictionary in LanguageContext.tsx
'The Ultimate Japanese Dining Experience for Special Occasions': {
  en: 'The Ultimate Japanese Dining Experience for Special Occasions',
  pt: 'A Experiência Suprema de Culinária Japonesa para Ocasiões Especiais'
},
'Book Your Boat Now': {
  en: 'Book Your Boat Now',
  pt: 'Reserve Seu Barco Agora'
},
'Learn More': {
  en: 'Learn More',
  pt: 'Saiba Mais'
},
'We are more than delivery and takeaway': {
  en: 'We are more than delivery and takeaway',
  pt: 'Somos mais que entrega e takeaway'
},
'Sushi Boat': {
  en: 'Sushi Boat',
  pt: 'Barco de Sushi'
},
"It's not just sushi. It's an event.": {
  en: "It's not just sushi. It's an event.",
  pt: 'Não é apenas sushi. É um evento.'
},
"300 pieces, a boat, and no room for amateurs. Made to share (or pretend to), with everything included: chopsticks, soy, wasabi, sauceboats, and envious glances.": {
  en: "300 pieces, a boat, and no room for amateurs. Made to share (or pretend to), with everything included: chopsticks, soy, wasabi, sauceboats, and envious glances.",
  pt: "300 peças, um barco e nenhum espaço para amadores. Feito para compartilhar (ou fingir que compartilha), com tudo incluído: pauzinhos, shoyu, wasabi, molheiras e olhares invejosos."
},
"Our Sushi Boat is the perfect choice for any celebration worth remembering (and sharing). It serves a large group, or just your most ambitious desires. It's all about freshness. And about doing things big.": {
  en: "Our Sushi Boat is the perfect choice for any celebration worth remembering (and sharing). It serves a large group, or just your most ambitious desires. It's all about freshness. And about doing things big.",
  pt: "Nosso Barco de Sushi é a escolha perfeita para qualquer celebração que valha a pena lembrar (e compartilhar). Serve um grande grupo, ou apenas seus desejos mais ambiciosos. Tudo gira em torno da frescura. E de fazer as coisas em grande."
},
'Sushi Boat Composition': {
  en: 'Sushi Boat Composition',
  pt: 'Composição do Barco de Sushi'
},
'300 premium sushi pieces': {
  en: '300 premium sushi pieces',
  pt: '300 peças de sushi premium'
},
'Traditional wooden boat presentation': {
  en: 'Traditional wooden boat presentation',
  pt: 'Apresentação em barco de madeira tradicional'
},
'Assorted nigiri, sashimi, and specialty rolls': {
  en: 'Assorted nigiri, sashimi, and specialty rolls',
  pt: 'Nigiri, sashimi e rolos especiais variados'
},
'Complete with chopsticks, soy sauce, and wasabi': {
  en: 'Complete with chopsticks, soy sauce, and wasabi',
  pt: 'Completo com pauzinhos, molho de soja e wasabi'
},
'Serves 8-12 people': {
  en: 'Serves 8-12 people',
  pt: 'Serve 8-12 pessoas'
},
'48-hour advance booking required': {
  en: '48-hour advance booking required',
  pt: 'Reserva com 48 horas de antecedência necessária'
},
'Talk to us and book your Sushi Boat now': {
  en: 'Talk to us and book your Sushi Boat now',
  pt: 'Fale conosco e reserve seu Barco de Sushi agora'
},
'Book Your Sushi Boat Experience': {
  en: 'Book Your Sushi Boat Experience',
  pt: 'Reserve Sua Experiência de Barco de Sushi'
},
"Fill out the form below and we'll get back to you within 24 hours to confirm your reservation": {
  en: "Fill out the form below and we'll get back to you within 24 hours to confirm your reservation",
  pt: 'Preencha o formulário abaixo e entraremos em contato em até 24 horas para confirmar sua reserva'
},
'Name': {
  en: 'Name',
  pt: 'Nome'
},
'Enter your name': {
  en: 'Enter your name',
  pt: 'Digite seu nome'
},
'Email': {
  en: 'Email',
  pt: 'E-mail'
},
'Enter your email': {
  en: 'Enter your email',
  pt: 'Digite seu e-mail'
},
'Mobile number': {
  en: 'Mobile number',
  pt: 'Número de celular'
},
'Enter your mobile number': {
  en: 'Enter your mobile number',
  pt: 'Digite seu número de celular'
},
'Enter your mobile number (any length)': {
  en: 'Enter your mobile number (any length)',
  pt: 'Digite seu número de celular (qualquer comprimento)'
},
'Message': {
  en: 'Message',
  pt: 'Mensagem'
},
'Enter all relevant details such as date, time of delivery and collection, and number of people': {
  en: 'Enter all relevant details such as date, time of delivery and collection, and number of people',
  pt: 'Digite todos os detalhes relevantes, como data, horário de entrega e retirada, e número de pessoas'
},
'Submitting...': {
  en: 'Submitting...',
  pt: 'Enviando...'
},
'Book My Sushi Boat Experience': {
  en: 'Book My Sushi Boat Experience',
  pt: 'Reservar Minha Experiência de Barco de Sushi'
},
"We'll contact you within 24 hours to confirm your Sushi Boat reservation": {
  en: "We'll contact you within 24 hours to confirm your Sushi Boat reservation",
  pt: 'Entraremos em contato em até 24 horas para confirmar sua reserva do Barco de Sushi'
},
'48-Hour Notice': {
  en: '48-Hour Notice',
  pt: 'Aviso de 48 Horas'
},
'Book at least 48 hours in advance for the perfect preparation and fresh ingredients': {
  en: 'Book at least 48 hours in advance for the perfect preparation and fresh ingredients',
  pt: 'Reserve com pelo menos 48 horas de antecedência para a preparação perfeita e ingredientes frescos'
},
'Serves 8-12 People': {
  en: 'Serves 8-12 People',
  pt: 'Serve 8-12 Pessoas'
},
'Perfect for parties, celebrations, corporate events, and special gatherings': {
  en: 'Perfect for parties, celebrations, corporate events, and special gatherings',
  pt: 'Perfeito para festas, celebrações, eventos corporativos e encontros especiais'
},
'Fresh Daily Preparation': {
  en: 'Fresh Daily Preparation',
  pt: 'Preparação Diária Fresca'
},
'Prepared with the freshest ingredients on the day of your event for optimal quality': {
  en: 'Prepared with the freshest ingredients on the day of your event for optimal quality',
  pt: 'Preparado com os ingredientes mais frescos no dia do seu evento para qualidade ideal'
},
'Ready to make your event unforgettable?': {
  en: 'Ready to make your event unforgettable?',
  pt: 'Pronto para tornar seu evento inesquecível?'
},
'Book your Sushi Boat today and create memories that will last a lifetime': {
  en: 'Book your Sushi Boat today and create memories that will last a lifetime',
  pt: 'Reserve seu Barco de Sushi hoje e crie memórias que durarão uma vida'
},
'Book Now': {
  en: 'Book Now',
  pt: 'Reservar Agora'
},
'Thank you! Your Sushi Boat reservation request has been submitted successfully.': {
  en: 'Thank you! Your Sushi Boat reservation request has been submitted successfully.',
  pt: 'Obrigado! Sua solicitação de reserva do Barco de Sushi foi enviada com sucesso.'
},
'Failed to submit your request. Please try again.': {
  en: 'Failed to submit your request. Please try again.',
  pt: 'Falha ao enviar sua solicitação. Por favor, tente novamente.'
},
'An error occurred. Please try again.': {
  en: 'An error occurred. Please try again.',
  pt: 'Ocorreu um erro. Por favor, tente novamente.'
},
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isTranslating, setIsTranslating] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    const savedTranslations = getStoredTranslations();
    
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'pt')) {
      setLanguage(savedLanguage);
    }
    
    setTranslations(savedTranslations);
  }, []);

  // Save to localStorage when changes occur
  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    setStoredTranslations(translations);
  }, [translations]);

  // Backend translation function
  const translateWithBackend = async (texts: string[], targetLang: Language): Promise<Record<string, string>> => {
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';
      const response = await fetch(`${API_BASE_URL}/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          texts: texts,
          targetLang: targetLang
        }),
      });

      if (!response.ok) {
        throw new Error('Translation service unavailable');
      }

      const result = await response.json();
      
      if (result.success) {
        return result.data;
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Backend translation failed:', error);
      // Fallback to dictionary-based translation
      return dictionaryTranslateBatch(texts, targetLang);
    }
  };

  // Dictionary-based translation fallback
  const dictionaryTranslateBatch = (texts: string[], targetLang: Language): Record<string, string> => {
    const result: Record<string, string> = {};
    
    texts.forEach(text => {
      const lowerText = text.toLowerCase();
      const translation = translationsDictionary[text] || translationsDictionary[lowerText];
      
      if (translation) {
        result[text] = translation[targetLang];
      } else {
        // Fallback to word-by-word translation for unknown phrases
        result[text] = simpleWordTranslate(text, targetLang);
      }
    });

    return result;
  };

  // Simple word-by-word translation for unknown phrases
  const simpleWordTranslate = (text: string, targetLang: Language): string => {
    if (targetLang === 'en') return text;

    const wordMap: Record<string, string> = {
      'the': 'o', 'a': 'um', 'an': 'uma', 'and': 'e', 'or': 'ou', 'but': 'mas',
      'in': 'em', 'on': 'sobre', 'at': 'em', 'to': 'para', 'for': 'para',
      'with': 'com', 'by': 'por', 'from': 'de', 'about': 'sobre', 'as': 'como',
      'into': 'em', 'through': 'através', 'during': 'durante', 'before': 'antes',
      'after': 'depois', 'above': 'acima', 'below': 'abaixo', 'between': 'entre',
      'among': 'entre', 'under': 'sob', 'over': 'sobre', 'again': 'novamente',
      'further': 'além', 'then': 'então', 'once': 'uma vez', 'here': 'aqui',
      'there': 'lá', 'when': 'quando', 'where': 'onde', 'why': 'por que',
      'how': 'como', 'all': 'todos', 'any': 'qualquer', 'both': 'ambos',
      'each': 'cada', 'few': 'poucos', 'more': 'mais', 'most': 'mais',
      'other': 'outro', 'some': 'alguns', 'such': 'tal', 'only': 'somente',
      'own': 'próprio', 'same': 'mesmo', 'so': 'então', 'than': 'do que',
      'too': 'também', 'very': 'muito', 'just': 'apenas', 'now': 'agora',
    };

    return text.split(' ').map(word => {
      const cleanWord = word.toLowerCase().replace(/[.,!?;:]$/, '');
      const translated = wordMap[cleanWord] || word;
      
      // Preserve capitalization
      if (word[0] === word[0]?.toUpperCase()) {
        return translated.charAt(0).toUpperCase() + translated.slice(1);
      }
      return translated;
    }).join(' ');
  };

  // Function to translate entire page
  const translatePage = async (): Promise<void> => {
    if (language === 'en') return; // No need to translate English
    
    setIsTranslating(true);
    
    try {
      // Collect all unique text nodes from the page
      const textNodes = new Set<string>();
      
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: function(node) {
            // Only include text nodes that are visible and not in scripts/styles
            if (node.parentElement && 
                !['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(node.parentElement.tagName) &&
                node.textContent?.trim()) {
              return NodeFilter.FILTER_ACCEPT;
            }
            return NodeFilter.FILTER_REJECT;
          }
        }
      );

      let node;
      while (node = walker.nextNode()) {
        const text = node.textContent?.trim();
        if (text && text.length > 1) { // Ignore single characters
          textNodes.add(text);
        }
      }

      const textsToTranslate = Array.from(textNodes);
      
      if (textsToTranslate.length > 0) {
        const newTranslations = await translateWithBackend(textsToTranslate, language);
        setTranslations(prev => ({ ...prev, ...newTranslations }));
      }
    } catch (error) {
      console.error('Page translation failed:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  // Main translation function
  const t = (text: string): string => {
    if (language === 'en') return text;
    
    // Check if we already have a translation
    if (translations[text]) {
      return translations[text];
    }

    // Check dictionary first
    const dictionaryTranslation = translationsDictionary[text] || translationsDictionary[text.toLowerCase()];
    if (dictionaryTranslation) {
      return dictionaryTranslation[language];
    }

    // For new text, try to translate immediately via backend
    if (text.trim() && !translations[text]) {
      // Queue for translation (non-blocking)
      setTimeout(async () => {
        try {
          const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';
          const response = await fetch(`${API_BASE_URL}/translate-single`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              text: text,
              targetLang: language
            }),
          });

          if (response.ok) {
            const result = await response.json();
            if (result.success) {
              setTranslations(prev => ({
                ...prev,
                [text]: result.data.translated
              }));
            }
          }
        } catch (error) {
          console.error('Single translation failed:', error);
        }
      }, 0);
    }

    // Return original text while translating
    return text;
  };

  const value: LanguageContextType = {
    language,
    setLanguage: (newLang: Language) => {
      setLanguage(newLang);
      if (newLang !== 'en') {
        // Auto-translate when switching to Portuguese
        setTimeout(() => translatePage(), 100);
      }
    },
    t,
    isTranslating,
    translatePage
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};