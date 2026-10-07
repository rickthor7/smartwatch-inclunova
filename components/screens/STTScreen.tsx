'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Mic, MicOff, Check } from 'lucide-react';
import { audioManager } from '@/utils/audio';

interface STTScreenProps {
  onBack: () => void;
  onAnswerSubmitted: (transcript: string) => void;
  onTriggerHaptic: () => void;
  isDarkMode?: boolean;
}

export const STTScreen: React.FC<STTScreenProps> = ({
  onBack,
  onAnswerSubmitted,
  onTriggerHaptic,
  isDarkMode = false,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'id-ID';

        recognition.onresult = (event: any) => {
          const text = event.results[0][0].transcript;
          setTranscript(text);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const toggleListening = () => {
    onTriggerHaptic();
    audioManager.playTap();

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
    } else {
      setIsListening(true);
      setTranscript('');
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (e) {
          console.warn('Speech recognition error', e);
        }
      } else {
        setTimeout(() => {
          setTranscript('Satu per empat');
          setIsListening(false);
        }, 2200);
      }
    }
  };

  const handleQuickChip = (text: string) => {
    audioManager.playTap();
    setTranscript(text);
  };

  const handleSubmit = () => {
    if (!transcript) return;
    audioManager.playSuccess();
    onTriggerHaptic();
    onAnswerSubmitted(transcript);
    onBack();
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '10px 12px',
        gap: '8px',
        alignItems: 'center',
        textAlign: 'center',
        background: isDarkMode ? '#000000' : '#F8FAFC',
        color: isDarkMode ? '#F8FAFC' : '#172033',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
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
        <div style={{ fontSize: '12px', fontWeight: 900, color: isDarkMode ? '#FFFFFF' : '#1E293B' }}>Jawab dengan Suara</div>
        <div style={{ width: '28px' }} />
      </div>

      <div style={{ fontSize: '10px', color: isDarkMode ? '#94A3B8' : '#64748B' }}>
        Katakan jawabanmu ke mikrofon smartwatch:
      </div>

      {/* Big Mic Button with Glowing Waves */}
      <div style={{ position: 'relative', margin: '4px 0' }}>
        <button
          onClick={toggleListening}
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: isListening
              ? 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)'
              : 'linear-gradient(135deg, #6366F1 0%, #4338CA 100%)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            cursor: 'pointer',
            boxShadow: isListening ? '0 0 24px rgba(239, 68, 68, 0.7)' : '0 4px 16px rgba(99, 102, 241, 0.45)',
            transition: 'all 0.2s',
          }}
        >
          {isListening ? <MicOff size={28} /> : <Mic size={28} />}
        </button>

        {isListening && (
          <div style={{ display: 'flex', gap: '3px', justifyContent: 'center', alignItems: 'center', height: '16px', marginTop: '6px' }}>
            <span style={{ width: '3px', height: '12px', background: '#EF4444', borderRadius: '3px', animation: 'audioWave 0.5s infinite' }} />
            <span style={{ width: '3px', height: '18px', background: '#EF4444', borderRadius: '3px', animation: 'audioWave 0.7s infinite 0.15s' }} />
            <span style={{ width: '3px', height: '10px', background: '#EF4444', borderRadius: '3px', animation: 'audioWave 0.4s infinite 0.3s' }} />
          </div>
        )}
      </div>

      <div style={{ fontSize: '11px', fontWeight: 800, color: isListening ? '#EF4444' : (isDarkMode ? '#CBD5E1' : '#64748B') }}>
        {isListening ? 'Mendengarkan suaramu...' : 'Tekan mic untuk mulai bicara'}
      </div>

      {/* Recognized text box */}
      <div
        style={{
          width: '100%',
          background: isDarkMode ? 'rgba(255, 255, 255, 0.07)' : '#FFFFFF',
          borderRadius: '14px',
          padding: '8px 10px',
          border: isDarkMode ? '1.5px dashed rgba(255, 255, 255, 0.2)' : '1.5px dashed #CBD5E1',
          minHeight: '38px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ fontSize: '12px', fontWeight: 700, color: transcript ? (isDarkMode ? '#FFFFFF' : '#1E293B') : (isDarkMode ? '#64748B' : '#94A3B8'), fontStyle: transcript ? 'normal' : 'italic' }}>
          {transcript ? `"${transcript}"` : 'Hasil suara akan muncul di sini...'}
        </span>
      </div>

      {/* Quick Voice Simulation Chips */}
      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
        <button
          onClick={() => handleQuickChip('Satu per empat (1/4)')}
          style={{ background: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#F1F5F9', border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid #CBD5E1', borderRadius: '8px', padding: '3px 8px', fontSize: '9px', fontWeight: 800, color: isDarkMode ? '#F8FAFC' : '#334155', cursor: 'pointer' }}
        >
          "1/4"
        </button>
        <button
          onClick={() => handleQuickChip('Dua per lima (2/5)')}
          style={{ background: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#F1F5F9', border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid #CBD5E1', borderRadius: '8px', padding: '3px 8px', fontSize: '9px', fontWeight: 800, color: isDarkMode ? '#F8FAFC' : '#334155', cursor: 'pointer' }}
        >
          "2/5"
        </button>
        <button
          onClick={() => handleQuickChip('Setengah (1/2)')}
          style={{ background: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#F1F5F9', border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid #CBD5E1', borderRadius: '8px', padding: '3px 8px', fontSize: '9px', fontWeight: 800, color: isDarkMode ? '#F8FAFC' : '#334155', cursor: 'pointer' }}
        >
          "Setengah"
        </button>
      </div>

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={!transcript}
        className="kid-button kid-button-green"
        style={{
          width: '100%',
          padding: '9px',
          fontSize: '11px',
          marginTop: 'auto',
          opacity: transcript ? 1 : 0.5,
          cursor: transcript ? 'pointer' : 'not-allowed',
        }}
      >
        Kirim Jawaban <Check size={12} />
      </button>
    </div>
  );
};
