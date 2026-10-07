'use client';

import React, { useState, useEffect } from 'react';
import { TEACHER_VOICE_MESSAGE } from '@/data/smartwatchData';
import { ArrowLeft, Play, Pause } from 'lucide-react';
import { audioManager } from '@/utils/audio';

interface TeacherVoiceScreenProps {
  onBack: () => void;
  onTriggerHaptic: () => void;
  isDarkMode?: boolean;
}

export const TeacherVoiceScreen: React.FC<TeacherVoiceScreenProps> = ({
  onBack,
  onTriggerHaptic,
  isDarkMode = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 5;
        });
      }, 500);
    }
    return () => {
      clearInterval(interval);
      audioManager.stopSpeaking();
    };
  }, [isPlaying]);

  const togglePlay = () => {
    onTriggerHaptic();
    audioManager.playTap();

    if (isPlaying) {
      setIsPlaying(false);
      audioManager.stopSpeaking();
    } else {
      setIsPlaying(true);
      setProgress(0);
      audioManager.speakIndonesian(TEACHER_VOICE_MESSAGE.text, () => {
        setIsPlaying(false);
        setProgress(100);
      });
    }
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
        <div style={{ fontSize: '12px', fontWeight: 900, color: isDarkMode ? '#FFFFFF' : '#1E293B' }}>Pesan Suara Guru</div>
        <div style={{ width: '28px' }} />
      </div>

      {/* Teacher Profile Card */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: isDarkMode ? 'rgba(34, 197, 94, 0.18)' : '#F0FDF4',
          padding: '8px 10px',
          borderRadius: '16px',
          border: isDarkMode ? '1px solid rgba(34, 197, 94, 0.35)' : '1px solid #BBF7D0',
        }}
      >
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#22C55E', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '14px' }}>
          👩‍🏫
        </div>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 800, color: isDarkMode ? '#FFFFFF' : '#14532D' }}>
            {TEACHER_VOICE_MESSAGE.sender}
          </div>
          <div style={{ fontSize: '9px', color: isDarkMode ? '#4ADE80' : '#166534' }}>
            {TEACHER_VOICE_MESSAGE.date} • {TEACHER_VOICE_MESSAGE.duration}
          </div>
        </div>
      </div>

      {/* Message Quote */}
      <div
        style={{
          background: isDarkMode ? 'rgba(255, 255, 255, 0.07)' : '#FFFFFF',
          borderRadius: '16px',
          padding: '10px 12px',
          border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.12)' : '1.5px solid #E2E8F0',
          position: 'relative',
        }}
      >
        <p style={{ fontSize: '11px', fontWeight: 600, color: isDarkMode ? '#E2E8F0' : '#334155', fontStyle: 'italic', lineHeight: 1.4, margin: 0 }}>
          "{TEACHER_VOICE_MESSAGE.text}"
        </p>
      </div>

      {/* Waveform Animation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px', height: '28px', margin: '4px 0' }}>
        {Array.from({ length: 16 }).map((_, i) => (
          <span
            key={i}
            style={{
              width: '3px',
              height: isPlaying ? `${Math.sin(i * 0.8 + progress) * 12 + 14}px` : '4px',
              background: isPlaying ? '#22C55E' : (isDarkMode ? 'rgba(255, 255, 255, 0.15)' : '#CBD5E1'),
              borderRadius: '2px',
              transition: 'height 0.2s ease',
            }}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div style={{ width: '100%', height: '4px', background: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ width: `${progress}%`, height: '100%', background: '#22C55E', transition: 'width 0.3s ease' }} />
      </div>

      {/* Play/Pause Button */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: 'auto' }}>
        <button
          onClick={togglePlay}
          className="kid-button kid-button-green"
          style={{ padding: '8px 24px', fontSize: '12px', borderRadius: '999px' }}
        >
          {isPlaying ? (
            <>
              <Pause size={14} /> Jeda
            </>
          ) : (
            <>
              <Play size={14} fill="#FFF" /> Putar Pesan
            </>
          )}
        </button>
      </div>
    </div>
  );
};
