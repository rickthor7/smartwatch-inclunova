'use client';

import React, { useState, useEffect } from 'react';
import { LESSONS } from '@/data/smartwatchData';
import { ArrowLeft, Volume2, VolumeX, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import { audioManager } from '@/utils/audio';
import { ScreenType } from '@/types/smartwatch';

interface LearnScreenProps {
  onBack: () => void;
  onNavigate: (screen: ScreenType) => void;
  onTriggerHaptic: () => void;
  onAddXP: (points: number) => void;
  isDarkMode?: boolean;
}

export const LearnScreen: React.FC<LearnScreenProps> = ({
  onBack,
  onNavigate,
  onTriggerHaptic,
  onAddXP,
  isDarkMode = false,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const lesson = LESSONS[currentStepIndex];

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      audioManager.stopSpeaking();
    };
  }, []);

  const handleToggleTTS = () => {
    onTriggerHaptic();
    if (isPlayingAudio) {
      audioManager.stopSpeaking();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      audioManager.speakIndonesian(lesson.audioScript, () => {
        setIsPlayingAudio(false);
      });
    }
  };

  const handleNext = () => {
    audioManager.stopSpeaking();
    setIsPlayingAudio(false);
    audioManager.playTap();
    onTriggerHaptic();

    if (currentStepIndex < LESSONS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      // Completed all steps
      audioManager.playSuccess();
      onAddXP(15);
      onNavigate('quiz');
    }
  };

  const handlePrev = () => {
    audioManager.stopSpeaking();
    setIsPlayingAudio(false);
    audioManager.playTap();
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '8px 12px 10px',
        gap: '6px',
        overflowY: 'auto',
        background: isDarkMode ? '#000000' : '#F8FAFC',
        color: isDarkMode ? '#F8FAFC' : '#172033',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={() => {
            audioManager.stopSpeaking();
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
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '9px', fontWeight: 800, color: isDarkMode ? '#818CF8' : '#4F46E5', textTransform: 'uppercase' }}>
            {lesson.title}
          </div>
          <div style={{ fontSize: '11px', fontWeight: 900, color: isDarkMode ? '#FFFFFF' : '#1E293B' }}>
            Langkah {lesson.step} / {lesson.totalSteps}
          </div>
        </div>
        <div style={{ width: '28px' }} />
      </div>

      {/* Progress Dots */}
      <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', padding: '2px 0' }}>
        {LESSONS.map((_, idx) => (
          <div
            key={idx}
            style={{
              height: '4px',
              width: idx === currentStepIndex ? '20px' : '8px',
              borderRadius: '4px',
              background: idx === currentStepIndex
                ? (isDarkMode ? '#818CF8' : '#5B5FEF')
                : (isDarkMode ? 'rgba(255, 255, 255, 0.15)' : '#CBD5E1'),
              boxShadow: idx === currentStepIndex && isDarkMode ? '0 0 8px rgba(129, 140, 248, 0.6)' : 'none',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>

      {/* Visual Interactive Illustration Card */}
      <div
        style={{
          background: isDarkMode ? 'rgba(255, 255, 255, 0.07)' : '#FFFFFF',
          borderRadius: '18px',
          padding: '10px',
          border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.12)' : '1.5px solid #E0E7FF',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          boxShadow: isDarkMode ? '0 4px 16px rgba(0,0,0,0.4)' : '0 2px 8px rgba(91, 95, 239, 0.06)',
          backdropFilter: isDarkMode ? 'blur(10px)' : 'none',
        }}
      >
        <div style={{ fontSize: '11px', fontWeight: 800, color: isDarkMode ? '#A5B4FC' : '#4338CA' }}>
          {lesson.subtitle}
        </div>

        {/* Visual Bar representation */}
        {lesson.visualType === 'fraction-bar' ? (
          <div
            style={{
              display: 'flex',
              gap: '4px',
              width: '100%',
              maxWidth: '180px',
              height: '26px',
              background: isDarkMode ? 'rgba(0, 0, 0, 0.4)' : '#F1F5F9',
              borderRadius: '8px',
              padding: '3px',
              border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid #CBD5E1',
            }}
          >
            {Array.from({ length: lesson.visualData.denominator }).map((_, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: i < lesson.visualData.numerator
                    ? 'linear-gradient(135deg, #6366F1 0%, #38BDF8 100%)'
                    : (isDarkMode ? 'rgba(255, 255, 255, 0.08)' : '#FFFFFF'),
                  borderRadius: '5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '9px',
                  fontWeight: 900,
                  color: i < lesson.visualData.numerator ? '#FFFFFF' : (isDarkMode ? '#64748B' : '#94A3B8'),
                  boxShadow: i < lesson.visualData.numerator && isDarkMode ? '0 0 8px rgba(99, 102, 241, 0.5)' : 'none',
                }}
              >
                1/{lesson.visualData.denominator}
              </div>
            ))}
          </div>
        ) : (
          /* Visual Pizza representation */
          <div style={{ position: 'relative', width: '60px', height: '60px', borderRadius: '50%', background: '#FDE047', border: '3px solid #CA8A04', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `conic-gradient(#EA580C 0% ${(lesson.visualData.numerator / lesson.visualData.denominator) * 100
                  }%, transparent ${(lesson.visualData.numerator / lesson.visualData.denominator) * 100}% 100%)`,
                opacity: 0.85,
              }}
            />
            <span style={{ position: 'relative', zIndex: 2, background: '#FFFFFF', padding: '2px 5px', borderRadius: '999px', fontSize: '9px', fontWeight: 900, color: '#9A3412', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>
              {lesson.visualData.numerator}/{lesson.visualData.denominator}
            </span>
          </div>
        )}

        {/* Lesson text */}
        <p style={{ fontSize: '11px', color: isDarkMode ? '#E2E8F0' : '#334155', textAlign: 'center', lineHeight: 1.4, margin: '2px 0 0', fontWeight: 600 }}>
          {lesson.content}
        </p>
      </div>

      {/* TTS Button (Text-to-Speech) */}
      <button
        onClick={handleToggleTTS}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          background: isPlayingAudio
            ? (isDarkMode ? 'rgba(99, 102, 241, 0.25)' : '#EEF2FF')
            : (isDarkMode ? 'rgba(255, 255, 255, 0.08)' : '#F8FAFC'),
          border: isPlayingAudio
            ? '1.5px solid #818CF8'
            : (isDarkMode ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid #CBD5E1'),
          borderRadius: '14px',
          padding: '6px 12px',
          cursor: 'pointer',
          color: isPlayingAudio ? (isDarkMode ? '#A5B4FC' : '#4F46E5') : (isDarkMode ? '#F8FAFC' : '#475569'),
          fontWeight: 700,
          fontSize: '11px',
          transition: 'all 0.2s',
        }}
      >
        {isPlayingAudio ? (
          <>
            <VolumeX size={14} color={isDarkMode ? '#A5B4FC' : '#4F46E5'} />
            <span>Sedang Membaca...</span>
            <div style={{ display: 'flex', gap: '2px', alignItems: 'center', height: '12px' }}>
              <span style={{ width: '2px', height: '10px', background: isDarkMode ? '#A5B4FC' : '#4F46E5', borderRadius: '2px', animation: 'audioWave 0.6s infinite' }} />
              <span style={{ width: '2px', height: '14px', background: isDarkMode ? '#A5B4FC' : '#4F46E5', borderRadius: '2px', animation: 'audioWave 0.8s infinite 0.2s' }} />
              <span style={{ width: '2px', height: '8px', background: isDarkMode ? '#A5B4FC' : '#4F46E5', borderRadius: '2px', animation: 'audioWave 0.5s infinite 0.4s' }} />
            </div>
          </>
        ) : (
          <>
            <Volume2 size={14} color={isDarkMode ? '#818CF8' : '#6366F1'} />
            <span>🔊 Dengarkan Suara</span>
          </>
        )}
      </button>

      {/* Navigation Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
        <button
          onClick={handlePrev}
          disabled={currentStepIndex === 0}
          style={{
            background: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : (currentStepIndex === 0 ? '#F1F5F9' : '#FFFFFF'),
            border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid #CBD5E1',
            borderRadius: '12px',
            padding: '6px 12px',
            fontSize: '11px',
            fontWeight: 800,
            color: currentStepIndex === 0 ? (isDarkMode ? '#475569' : '#94A3B8') : (isDarkMode ? '#F8FAFC' : '#334155'),
            cursor: currentStepIndex === 0 ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
          }}
        >
          <ChevronLeft size={13} /> Kembali
        </button>

        <button
          onClick={handleNext}
          className="kid-button kid-button-primary"
          style={{
            padding: '7px 14px',
            fontSize: '11px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6366F1 0%, #4338CA 100%)',
          }}
        >
          {currentStepIndex === LESSONS.length - 1 ? (
            <>
              Kuis Seru <Sparkles size={12} />
            </>
          ) : (
            <>
              Lanjut <ChevronRight size={12} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
