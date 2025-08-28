import React, { useState } from 'react';
import { Shield, Phone, Eye, Heart, Waves, ChevronDown, ChevronUp } from 'lucide-react';

export function SafetyTips() {
  const [expandedTip, setExpandedTip] = useState<number | null>(null);

  const safetyTips = [
    {
      icon: <Waves className="h-5 w-5" />,
      title: 'Swimming Between the Flags',
      summary: 'Always swim in patrolled areas between red and yellow flags',
      details: [
        'Lifeguards patrol these areas and can provide immediate assistance',
        'These zones are selected for the safest swimming conditions',
        'Flags are moved daily based on current conditions',
        'If you can\'t see flags, ask a lifeguard about safe swimming areas'
      ]
    },
    {
      icon: <Eye className="h-5 w-5" />,
      title: 'Rip Current Awareness',
      summary: 'Learn to identify and escape dangerous rip currents',
      details: [
        'Look for channels of churning, choppy water',
        'Watch for lines of foam or debris moving seaward',
        'If caught in a rip: don\'t panic, don\'t swim against it',
        'Swim parallel to shore until out of the current, then swim to shore'
      ]
    },
    {
      icon: <Heart className="h-5 w-5" />,
      title: 'Know Your Limits',
      summary: 'Be honest about your swimming ability and fitness level',
      details: [
        'Don\'t swim alone - use the buddy system',
        'Stay close to shore if you\'re not a strong swimmer',
        'Take regular breaks and stay hydrated',
        'Be extra cautious if you have medical conditions'
      ]
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: 'Emergency Contacts',
      summary: 'Know who to call in case of emergency',
      details: [
        'Emergency Services: 000',
        'Surf Life Saving Australia: 1800 888 555',
        'Save the emergency number in your phone',
        'Know the beach name and nearest access point for emergency services'
      ]
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <Shield className="h-5 w-5 mr-2 text-blue-600" />
        Beach Safety Tips
      </h2>
      
      <div className="space-y-3">
        {safetyTips.map((tip, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <button
              onClick={() => setExpandedTip(expandedTip === index ? null : index)}
              className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="text-blue-600">
                  {tip.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{tip.title}</h4>
                  <p className="text-gray-600 text-sm">{tip.summary}</p>
                </div>
              </div>
              <div className="text-gray-400">
                {expandedTip === index ? <ChevronUp /> : <ChevronDown />}
              </div>
            </button>
            
            {expandedTip === index && (
              <div className="px-4 pb-4">
                <ul className="space-y-2 text-gray-600">
                  {tip.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start space-x-2">
                      <span className="text-blue-600 mt-1.5 w-1 h-1 bg-blue-600 rounded-full flex-shrink-0"></span>
                      <span className="text-sm">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center space-x-3">
          <Phone className="h-5 w-5 text-red-600" />
          <div>
            <h4 className="font-semibold text-red-800">Emergency: 000</h4>
            <p className="text-red-600 text-sm">For immediate life-threatening situations</p>
          </div>
        </div>
      </div>
    </div>
  );
}