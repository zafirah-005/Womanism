import React, { useState } from 'react';
import { BookOpen, Globe, Heart, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { GlassCard } from '../../components/GlassCard';
import { BackButton } from '../../components/BackButton';

interface GuideContent {
  title: string;
  sections: {
    title: string;
    content: {
      steps?: string[];
      afterUse?: string[];
      alternatives?: {
        title: string;
        description: string[];
      }[];
      avoid?: string;
      tips?: string[];
      myths?: string[];
    };
  }[];
}

export const PeriodHealthGuide: React.FC = () => {
  const [language, setLanguage] = useState<'english' | 'hindi'>('english');

  const content: Record<'english' | 'hindi', GuideContent> = {
    english: {
      title: 'Period Health Guide',
      sections: [
        {
          title: 'How to Use a Sanitary Pad',
          content: {
            steps: [
              'Wash your hands with soap before touching the pad.',
              'Unwrap the pad from its packet.',
              'Place it firmly in the center of your underwear.',
              'If the pad has wings, fold them around the sides of the underwear.',
              'Wear underwear that fits well (not loose) so the pad stays in place.',
              'Change the pad every 4–6 hours (or sooner if soaked).'
            ],
            afterUse: [
              'Wrap the pad in paper or its wrapper.',
              'Throw it in a waste bin or a dug pit.',
              'Never flush pads in toilets, as it blocks pipes.'
            ]
          }
        },
        {
          title: 'What to Use If Pads Are Not Available',
          content: {
            alternatives: [
              {
                title: 'Clean Cotton Cloth',
                description: [
                  'Use soft cotton cloth (not synthetic).',
                  'Wash thoroughly with soap and water after use.',
                  'Dry in direct sunlight (sunlight kills germs).',
                  'If possible, iron before reuse.'
                ]
              },
              {
                title: 'Homemade Cloth Pads',
                description: [
                  'Stitch layers of clean cotton cloth to make reusable pads.',
                  'Wash, sun-dry, and reuse safely.'
                ]
              },
              {
                title: 'Menstrual Cups (where available)',
                description: [
                  'Can be reused for 5–10 years.',
                  'Clean with soap and water.',
                  'Boil in hot water after every cycle to keep germ-free.'
                ]
              }
            ],
            avoid: 'Unsafe materials to avoid: old dirty rags, leaves, newspaper, sawdust, sand, or ash. These can cause infections.'
          }
        },
        {
          title: 'Hygiene Tips During Periods',
          content: {
            tips: [
              'Always wash hands before and after changing pads/cloth.',
              'Bathe daily if possible.',
              'Keep underwear clean and dry.',
              'Have at least 3–4 pieces of cloth so you can rotate between uses.',
              'Store clean pads/cloth in a dry, covered place.'
            ]
          }
        },
        {
          title: 'Breaking Myths & Taboos',
          content: {
            myths: [
              'Periods are natural, not dirty or shameful.',
              'Girls and women should not be isolated during their period.',
              'You can eat regular food during periods.',
              'Talking openly with mothers, sisters, and friends helps reduce fear.',
              'Sharing knowledge helps younger girls feel prepared.'
            ]
          }
        }
      ]
    },
    hindi: {
      title: 'माहवारी स्वास्थ्य गाइड',
      sections: [
        {
          title: 'सैनिटरी पैड का उपयोग कैसे करें',
          content: {
            steps: [
              'पैड छूने से पहले हाथ साबुन से धोएँ।',
              'पैड का पैकेट खोलें।',
              'पैड को अंडरवियर के बीच में चिपकाएँ।',
              'अगर पैड में विंग्स हैं, तो उन्हें अंडरवियर के किनारों पर मोड़ दें।',
              'ढीली नहीं, सही फिटिंग की अंडरवियर पहनें।',
              'हर 4–6 घंटे में (या पैड गीला होने पर तुरंत) बदलें।'
            ],
            afterUse: [
              'पैड को कागज़ में या उसके कवर में लपेटें।',
              'कूड़ेदान या गड्ढे में डालें।',
              'पैड को टॉयलेट में कभी न फेंकें।'
            ]
          }
        },
        {
          title: 'यदि पैड उपलब्ध नहीं हैं तो क्या उपयोग करें',
          content: {
            alternatives: [
              {
                title: 'साफ़ सूती कपड़ा',
                description: [
                  'मुलायम सूती कपड़ा इस्तेमाल करें (नकली कपड़ा नहीं)।',
                  'हर बार धोकर अच्छे से साफ़ करें।',
                  'धूप में सुखाएँ (धूप की रोशनी कीटाणु मारती है)।',
                  'संभव हो तो इस्त्री करके इस्तेमाल करें।'
                ]
              },
              {
                title: 'घर पर बने कपड़े के पैड',
                description: [
                  'कई परतों वाला साफ़ कपड़ा सिलकर पैड बना सकते हैं।',
                  'हर बार धोकर धूप में सुखाएँ और सुरक्षित रूप से दोबारा इस्तेमाल करें।'
                ]
              },
              {
                title: 'मेंस्ट्रुअल कप (जहाँ उपलब्ध हों)',
                description: [
                  '5-10 साल तक इस्तेमाल किए जा सकते हैं।',
                  'साबुन-पानी से धोएँ।',
                  'हर माहवारी के बाद उबालकर साफ़ करें।'
                ]
              }
            ],
            avoid: 'इन चीज़ों का इस्तेमाल न करें: गंदे कपड़े, पत्ते, अख़बार, बुरादा, रेत या राख – ये इंफेक्शन फैला सकते हैं।'
          }
        },
        {
          title: 'पीरियड्स के दौरान स्वच्छता के टिप्स',
          content: {
            tips: [
              'पैड/कपड़ा बदलने से पहले और बाद में हाथ धोएँ।',
              'रोज़ नहाने की कोशिश करें।',
              'अंडरवियर हमेशा साफ़ और सूखा रखें।',
              'कम से कम 3–4 कपड़े रखें ताकि बारी-बारी से इस्तेमाल हो सकें।',
              'साफ़ पैड/कपड़े को सूखी, ढकी हुई जगह पर रखें।'
            ]
          }
        },
        {
          title: 'मिथकों और वर्जनाओं को तोड़ना',
          content: {
            myths: [
              'माहवारी स्वाभाविक है, यह गंदी या शर्म की बात नहीं है।',
              'पीरियड्स के समय लड़कियों/महिलाओं को अलग नहीं करना चाहिए।',
              'पीरियड्स में सामान्य खाना खा सकते हैं।',
              'माँ, बहन या सहेलियों से खुलकर बात करना डर कम करता है।',
              'जानकारी बाँटने से छोटी लड़कियाँ तैयार रहती हैं।'
            ]
          }
        }
      ]
    }
  };

  const currentContent = content[language];

  const renderSection = (section: typeof currentContent.sections[0], index: number) => {
    return (
      <GlassCard key={index} className="p-6 mb-6" hover={false}>
        <h3 className="text-xl font-bold text-gray-700 mb-4 flex items-center" style={{ fontFamily: 'Times New Roman, serif' }}>
          <div className="w-8 h-8 bg-gradient-to-r from-pink-300 to-pink-400 rounded-full flex items-center justify-center mr-3 text-white font-bold text-sm">
            {index + 1}
          </div>
          {section.title}
        </h3>

        {/* Steps */}
        {section.content.steps && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-700 mb-3 flex items-center" style={{ fontFamily: 'Times New Roman, serif' }}>
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              {language === 'english' ? 'Steps to Follow:' : 'अनुसरण करने के चरण:'}
            </h4>
            <ol className="space-y-2">
              {section.content.steps.map((step, stepIndex) => (
                <li key={stepIndex} className="flex items-start space-x-3">
                  <span className="w-6 h-6 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">
                    {stepIndex + 1}
                  </span>
                  <span className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Times New Roman, serif' }}>
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* After Use */}
        {section.content.afterUse && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-700 mb-3 flex items-center" style={{ fontFamily: 'Times New Roman, serif' }}>
              <AlertTriangle className="w-5 h-5 text-orange-500 mr-2" />
              {language === 'english' ? 'After Use:' : 'इस्तेमाल के बाद:'}
            </h4>
            <ul className="space-y-2">
              {section.content.afterUse.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Times New Roman, serif' }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Alternatives */}
        {section.content.alternatives && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-700 mb-3 flex items-center" style={{ fontFamily: 'Times New Roman, serif' }}>
              <Heart className="w-5 h-5 text-pink-500 mr-2" />
              {language === 'english' ? 'Safe Alternatives:' : 'सुरक्षित विकल्प:'}
            </h4>
            <div className="space-y-4">
              {section.content.alternatives.map((alt, altIndex) => (
                <div key={altIndex} className="p-4 bg-white/10 rounded-xl border border-white/20">
                  <h5 className="font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Times New Roman, serif' }}>
                    {alt.title}
                  </h5>
                  <ul className="space-y-1">
                    {alt.description.map((desc, descIndex) => (
                      <li key={descIndex} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: 'Times New Roman, serif' }}>
                          {desc}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Avoid */}
        {section.content.avoid && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
            <h4 className="font-semibold text-red-700 mb-2 flex items-center" style={{ fontFamily: 'Times New Roman, serif' }}>
              <X className="w-5 h-5 text-red-500 mr-2" />
              {language === 'english' ? 'Important Warning:' : 'महत्वपूर्ण चेतावनी:'}
            </h4>
            <p className="text-red-600 text-sm leading-relaxed" style={{ fontFamily: 'Times New Roman, serif' }}>
              {section.content.avoid}
            </p>
          </div>
        )}

        {/* Tips */}
        {section.content.tips && (
          <div className="mb-4">
            <ul className="space-y-2">
              {section.content.tips.map((tip, tipIndex) => (
                <li key={tipIndex} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Times New Roman, serif' }}>
                    {tip}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Myths */}
        {section.content.myths && (
          <div className="mb-4">
            <ul className="space-y-2">
              {section.content.myths.map((myth, mythIndex) => (
                <li key={mythIndex} className="flex items-start space-x-3">
                  <Heart className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Times New Roman, serif' }}>
                    {myth}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </GlassCard>
    );
  };

  return (
    <div className="pt-20 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <BackButton to="/period-health" />
        </div>

        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-300 to-pink-400 rounded-full flex items-center justify-center shadow-2xl">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4" style={{ fontFamily: 'Times New Roman, serif' }}>
            {currentContent.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Times New Roman, serif' }}>
            {language === 'english' 
              ? 'Comprehensive guide for period health and hygiene practices'
              : 'माहवारी स्वास्थ्य और स्वच्छता प्रथाओं के लिए व्यापक गाइड'
            }
          </p>
        </div>

        {/* Language Toggle */}
        <GlassCard className="p-4 mb-8 text-center" hover={false}>
          <div className="flex items-center justify-center space-x-4">
            <Globe className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700 font-medium" style={{ fontFamily: 'Times New Roman, serif' }}>
              {language === 'english' ? 'Language:' : 'भाषा:'}
            </span>
            <div className="flex bg-white/20 rounded-full p-1">
              <button
                onClick={() => setLanguage('english')}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  language === 'english'
                    ? 'bg-pink-400 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-white/20'
                }`}
                style={{ fontFamily: 'Times New Roman, serif' }}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('hindi')}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  language === 'hindi'
                    ? 'bg-pink-400 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-white/20'
                }`}
                style={{ fontFamily: 'Times New Roman, serif' }}
              >
                हिंदी
              </button>
            </div>
          </div>
        </GlassCard>

        {/* Content Sections */}
        <div className="space-y-6">
          {currentContent.sections.map((section, index) => renderSection(section, index))}
        </div>

        {/* Additional Resources */}
        <GlassCard className="p-6 text-center" hover={false}>
          <h3 className="text-xl font-bold text-gray-700 mb-4" style={{ fontFamily: 'Times New Roman, serif' }}>
            {language === 'english' ? 'Need More Help?' : 'और मदद चाहिए?'}
          </h3>
          <p className="text-gray-600 mb-4" style={{ fontFamily: 'Times New Roman, serif' }}>
            {language === 'english' 
              ? 'If you have questions or concerns about your period health, consult with a healthcare provider or trusted adult.'
              : 'यदि आपके पास माहवारी स्वास्थ्य के बारे में प्रश्न या चिंताएं हैं, तो किसी स्वास्थ्य सेवा प्रदाता या विश्वसनीय वयस्क से सलाह लें।'
            }
          </p>
          <div className="text-pink-600 font-semibold" style={{ fontFamily: 'Times New Roman, serif' }}>
            {language === 'english' ? '💝 Remember: You are not alone in this journey!' : '💝 याद रखें: इस यात्रा में आप अकेली नहीं हैं!'}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};