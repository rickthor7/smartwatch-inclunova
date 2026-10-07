'use client';

import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '@/data/smartwatchData';
import { ArrowLeft, Mic, Sparkles, Check, HelpCircle, Trophy } from 'lucide-react';
import { audioManager } from '@/utils/audio';
import { ScreenType } from '@/types/smartwatch';
import confetti from 'canvas-confetti';

interface QuizScreenProps {
  onBack: () => void;
  onNavigate: (screen: ScreenType) => void;
  onTriggerHaptic: () => void;
  onAddXP: (points: number) => void;
  isDarkMode?: boolean;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  onBack,
  onNavigate,
  onTriggerHaptic,
  onAddXP,
  isDarkMode = false,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);

  const question = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (optId: string) => {
    if (isAnswered) return;
    setSelectedOptionId(optId);
    setIsAnswered(true);

    const chosen = question.options.find((o) => o.id === optId);
    const correct = !!chosen?.isCorrect;
    setIsCorrect(correct);

    if (correct) {
      audioManager.playSuccess();
      onTriggerHaptic();
      setScore((s) => s + 1);
      onAddXP(10);
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#5B5FEF', '#22C55E', '#FACC15', '#38BDF8', '#FB7185'],
        });
      } catch (e) {
        console.warn('confetti error', e);
      }
    } else {
      audioManager.playTryAgain();
      onTriggerHaptic();
    }
  };

  const handleNextQuestion = () => {
    audioManager.playTap();
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
      setIsCorrect(false);
    } else {
      setQuizFinished(true);
      audioManager.playSuccess();
    }
  };

  const handleRestart = () => {
    audioManager.playTap();
    setCurrentIdx(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setQuizFinished(false);
    setScore(0);
  };

  if (quizFinished) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: '14px 12px',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: '8px',
          background: isDarkMode ? '#000000' : '#F8FAFC',
          color: isDarkMode ? '#F8FAFC' : '#172033',
        }}
      >
        <div style={{ fontSize: '42px', filter: isDarkMode ? 'drop-shadow(0 0 16px rgba(250, 204, 21, 0.6))' : 'none' }} className="anim-bounce">
          🏆
        </div>
        <div style={{ fontSize: '16px', fontWeight: 900, color: isDarkMode ? '#FFFFFF' : '#1E293B' }}>
          Hebat Sekali, Erik!
        </div>
        <div style={{ fontSize: '11px', color: isDarkMode ? '#94A3B8' : '#64748B' }}>
          Kamu menyelesaikan kuis pecahan dengan sempurna!
        </div>
        <div
          style={{
            background: isDarkMode ? 'rgba(16, 185, 129, 0.16)' : '#ECFDF5',
            border: isDarkMode ? '1px solid rgba(16, 185, 129, 0.4)' : '1.5px solid #6EE7B7',
            padding: '8px 16px',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            margin: '4px 0',
          }}
        >
          <Trophy size={18} color="#34D399" />
          <span style={{ fontSize: '12px', fontWeight: 900, color: isDarkMode ? '#6EE7B7' : '#065F46' }}>
            Skor: {score} / {QUIZ_QUESTIONS.length} Benar (+{score * 10} XP)
          </span>
        </div>

        <div style={{ display: 'flex', gap: '8px', width: '100%', marginTop: '8px' }}>
          <button
            onClick={handleRestart}
            style={{
              flex: 1,
              padding: '9px',
              fontSize: '11px',
              fontWeight: 800,
              borderRadius: '12px',
              border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid #CBD5E1',
              background: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : '#FFFFFF',
              color: isDarkMode ? '#F8FAFC' : '#334155',
              cursor: 'pointer',
            }}
          >
            Ulangi 🔄
          </button>
          <button
            onClick={() => onNavigate('home')}
            className="kid-button kid-button-primary"
            style={{ flex: 1, padding: '9px', fontSize: '11px', borderRadius: '12px' }}
          >
            Selesai ✨
          </button>
        </div>
      </div>
    );
  }

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
        <span
          style={{
            fontSize: '11px',
            fontWeight: 800,
            color: isDarkMode ? '#A5B4FC' : '#4F46E5',
            background: isDarkMode ? 'rgba(99, 102, 241, 0.25)' : '#EEF2FF',
            border: isDarkMode ? '1px solid rgba(99, 102, 241, 0.35)' : 'none',
            padding: '2px 8px',
            borderRadius: '12px',
          }}
        >
          Kuis {currentIdx + 1}/{QUIZ_QUESTIONS.length}
        </span>
        <button
          onClick={() => onNavigate('stt')}
          style={{
            background: isDarkMode ? 'rgba(245, 158, 11, 0.2)' : '#FEF3C7',
            border: isDarkMode ? '1px solid rgba(245, 158, 11, 0.35)' : 'none',
            borderRadius: '50%',
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          title="Jawab dengan Suara (STT)"
        >
          <Mic size={14} color="#F59E0B" />
        </button>
      </div>

      {/* Question Card */}
      <div
        style={{
          background: isDarkMode ? 'rgba(255, 255, 255, 0.07)' : '#FFFFFF',
          borderRadius: '16px',
          padding: '9px 11px',
          border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.12)' : '1.5px solid #E2E8F0',
          boxShadow: isDarkMode ? '0 4px 14px rgba(0,0,0,0.4)' : '0 2px 6px rgba(0,0,0,0.04)',
        }}
      >
        <p style={{ fontSize: '11px', fontWeight: 800, color: isDarkMode ? '#FFFFFF' : '#1E293B', lineHeight: 1.35, margin: 0 }}>
          {question.question}
        </p>
        {question.context && (
          <span style={{ fontSize: '9px', color: isDarkMode ? '#818CF8' : '#6366F1', fontWeight: 600, display: 'block', marginTop: '3px' }}>
            💡 {question.context}
          </span>
        )}
      </div>

      {/* Choices Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        {question.options.map((opt) => {
          let btnBg = isDarkMode ? 'rgba(255, 255, 255, 0.06)' : '#FFFFFF';
          let borderCol = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#E2E8F0';
          let textCol = isDarkMode ? '#F8FAFC' : '#1E293B';

          if (isAnswered) {
            if (opt.isCorrect) {
              btnBg = isDarkMode ? 'rgba(34, 197, 94, 0.25)' : '#DCFCE7';
              borderCol = '#22C55E';
              textCol = isDarkMode ? '#4ADE80' : '#166534';
            } else if (selectedOptionId === opt.id) {
              btnBg = isDarkMode ? 'rgba(239, 68, 68, 0.25)' : '#FEE2E2';
              borderCol = '#EF4444';
              textCol = isDarkMode ? '#F87171' : '#991B1B';
            }
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleSelectOption(opt.id)}
              disabled={isAnswered}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 10px',
                background: btnBg,
                border: `1.5px solid ${borderCol}`,
                borderRadius: '14px',
                cursor: isAnswered ? 'default' : 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s',
              }}
            >
              <span
                style={{
                  background: isAnswered && opt.isCorrect
                    ? '#22C55E'
                    : (isDarkMode ? 'rgba(99, 102, 241, 0.3)' : '#EEF2FF'),
                  color: isAnswered && opt.isCorrect
                    ? '#FFFFFF'
                    : (isDarkMode ? '#C7D2FE' : '#4F46E5'),
                  width: '20px',
                  height: '20px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  fontWeight: 900,
                  flexShrink: 0,
                }}
              >
                {opt.id}
              </span>
              <span style={{ fontSize: '11px', fontWeight: 700, color: textCol, flex: 1 }}>
                {opt.text}
              </span>
              {isAnswered && opt.isCorrect && <Check size={14} color={isDarkMode ? '#4ADE80' : '#166534'} />}
            </button>
          );
        })}
      </div>

      {/* Feedback Banner if answered */}
      {isAnswered && (
        <div
          style={{
            background: isCorrect
              ? (isDarkMode ? 'rgba(34, 197, 94, 0.2)' : '#DCFCE7')
              : (isDarkMode ? 'rgba(245, 158, 11, 0.2)' : '#FEF3C7'),
            border: `1px solid ${
              isCorrect
                ? (isDarkMode ? 'rgba(34, 197, 94, 0.4)' : '#86EFAC')
                : (isDarkMode ? 'rgba(245, 158, 11, 0.4)' : '#FDE047')
            }`,
            borderRadius: '14px',
            padding: '7px 10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 'auto',
          }}
        >
          <div>
            <div style={{ fontSize: '10px', fontWeight: 900, color: isCorrect ? (isDarkMode ? '#4ADE80' : '#166534') : (isDarkMode ? '#FBBF24' : '#854D0E') }}>
              {isCorrect ? '🎉 Mantap! +10 XP' : '✨ Belum tepat, yuk coba lagi!'}
            </div>
            <div style={{ fontSize: '9px', color: isCorrect ? (isDarkMode ? '#86EFAC' : '#15803D') : (isDarkMode ? '#FDE68A' : '#A16207') }}>
              {isCorrect ? question.explanation : question.hint}
            </div>
          </div>
          <button
            onClick={handleNextQuestion}
            className="kid-button kid-button-primary"
            style={{ padding: '5px 11px', fontSize: '10px', borderRadius: '10px' }}
          >
            Lanjut →
          </button>
        </div>
      )}
    </div>
  );
};
