'use client';

import React from 'react';
import { ArrowLeft, Sparkles, Volume2, Eye, BrainCircuit, ArrowRight } from 'lucide-react';
import { audioManager } from '@/utils/audio';
import { ScreenType } from '@/types/smartwatch';

interface AIRecommendScreenProps {
  onBack: () => void;
  onNavigate: (screen: ScreenType) => void;
  onTriggerHaptic: () => void;
  isDarkMode?: boolean;
}

export const AIRecommendScreen: React.FC<AIRecommendScreenProps> = ({
  onBack,
  onNavigate,
  onTriggerHaptic,
  isDarkMode = false,
}) => {
  const handleStart = () => {
    audioManager.playSuccess();
    onTriggerHaptic();
    onNavigate('learn');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '10px 12px',
        gap: '8px',
        overflowY: 'auto',
        background: isDarkMode ? '#000000' : '#F8FAFC',
        color: isDarkMode ? '#F8FAFC' : '#172033',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={() => {
            audioManager.playTap();
            onBack();
          }}
          style={{
            background: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#F1F5F9',
            border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.15)' : 'none',
            borderRadius: '50%',
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <ArrowLeft size={16} color={isDarkMode ? '#F8FAFC' : '#334155'} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Sparkles size={14} color={isDarkMode ? '#E879F9' : '#9333EA'} />
          <span style={{ fontSize: '12px', fontWeight: 900, color: isDarkMode ? '#F5D0FE' : '#581C87' }}>Rekomendasi AI</span>
        </div>
        <div style={{ width: '28px' }} />
      </div>

      {/* AI Cosmic Card */}
      <div
        style={{
          background: isDarkMode
            ? 'linear-gradient(145deg, rgba(147, 51, 234, 0.25) 0%, rgba(88, 28, 135, 0.35) 100%)'
            : 'linear-gradient(145deg, #FAF5FF 0%, #F3E8FF 100%)',
          borderRadius: '18px',
          padding: '12px',
          border: isDarkMode ? '1px solid rgba(192, 132, 252, 0.4)' : '1.5px solid #D8B4FE',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          boxShadow: isDarkMode ? '0 4px 16px rgba(147, 51, 234, 0.3)' : '0 4px 12px rgba(168, 85, 247, 0.12)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span
            style={{
              fontSize: '9px',
              fontWeight: 800,
              color: isDarkMode ? '#E9D5FF' : '#7E22CE',
              background: isDarkMode ? 'rgba(147, 51, 234, 0.3)' : '#EDE9FE',
              padding: '2px 7px',
              borderRadius: '6px',
            }}
          >
            ADAPTIVE LEARNING
          </span>
          <span
            style={{
              fontSize: '10px',
              fontWeight: 800,
              color: isDarkMode ? '#4ADE80' : '#16A34A',
              background: isDarkMode ? 'rgba(34, 197, 94, 0.2)' : '#DCFCE7',
              padding: '2px 7px',
              borderRadius: '6px',
            }}
          >
            Level: Mudah 🌱
          </span>
        </div>

        <div>
          <div style={{ fontSize: '14px', fontWeight: 900, color: isDarkMode ? '#FFFFFF' : '#3B0764' }}>
            Latihan Pecahan Visual
          </div>
          <div style={{ fontSize: '10px', color: isDarkMode ? '#DDD6FE' : '#6B21A8', marginTop: '2px' }}>
            Disesuaikan dengan tempo belajar Alya agar lebih mudah dipahami.
          </div>
        </div>

        {/* Multimodal Badges */}
        <div style={{ display: 'flex', gap: '6px', marginTop: '2px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#FFFFFF',
              padding: '4px 8px',
              borderRadius: '8px',
              fontSize: '10px',
              fontWeight: 800,
              color: isDarkMode ? '#F5D0FE' : '#6B21A8',
              border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid #E9D5FF',
            }}
          >
            <Volume2 size={12} color={isDarkMode ? '#E879F9' : '#7E22CE'} /> Audio TTS
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#FFFFFF',
              padding: '4px 8px',
              borderRadius: '8px',
              fontSize: '10px',
              fontWeight: 800,
              color: isDarkMode ? '#F5D0FE' : '#6B21A8',
              border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid #E9D5FF',
            }}
          >
            <Eye size={12} color={isDarkMode ? '#E879F9' : '#7E22CE'} /> Diagram Warna
          </div>
        </div>
      </div>

      {/* AI Explanation note */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '6px',
          background: isDarkMode ? 'rgba(255, 255, 255, 0.06)' : '#FFFFFF',
          padding: '8px',
          borderRadius: '12px',
          border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E2E8F0',
        }}
      >
        <BrainCircuit size={16} color={isDarkMode ? '#A5B4FC' : '#6366F1'} style={{ flexShrink: 0, marginTop: '2px' }} />
        <span style={{ fontSize: '9px', color: isDarkMode ? '#CBD5E1' : '#475569', lineHeight: 1.3 }}>
          AI mendeteksi kamu sangat cepat memahami konsep visual. Ayo lanjutkan petualanganmu!
        </span>
      </div>

      {/* Start Button */}
      <button
        onClick={handleStart}
        className="kid-button kid-button-primary"
        style={{
          width: '100%',
          padding: '10px',
          fontSize: '12px',
          borderRadius: '14px',
          marginTop: 'auto',
          background: 'linear-gradient(135deg, #7E22CE 0%, #6B21A8 100%)',
          boxShadow: '0 4px 14px rgba(126, 34, 206, 0.4)',
        }}
      >
        Mulai Rekomendasi <ArrowRight size={14} />
      </button>
    </div>
  );
};
