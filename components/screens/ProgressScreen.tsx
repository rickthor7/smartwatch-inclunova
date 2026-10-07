'use client';

import React from 'react';
import { ArrowLeft, Award, Star, Flame, Trophy } from 'lucide-react';
import { audioManager } from '@/utils/audio';

interface ProgressScreenProps {
  onBack: () => void;
  xp: number;
  isDarkMode?: boolean;
}

export const ProgressScreen: React.FC<ProgressScreenProps> = ({ onBack, xp, isDarkMode = false }) => {
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
        <div style={{ fontSize: '12px', fontWeight: 900, color: isDarkMode ? '#FFFFFF' : '#1E293B' }}>Capaian Belajar</div>
        <div style={{ width: '28px' }} />
      </div>

      {/* Main Score Progress Card */}
      <div
        style={{
          background: isDarkMode
            ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.22) 0%, rgba(5, 150, 105, 0.3) 100%)'
            : 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
          borderRadius: '18px',
          padding: '10px 14px',
          border: isDarkMode ? '1px solid rgba(16, 185, 129, 0.4)' : '1.5px solid #A7F3D0',
          textAlign: 'center',
          boxShadow: isDarkMode ? '0 4px 16px rgba(16, 185, 129, 0.2)' : '0 2px 8px rgba(16, 185, 129, 0.1)',
        }}
      >
        <div style={{ fontSize: '26px', fontWeight: 900, color: isDarkMode ? '#FFFFFF' : '#065F46', lineHeight: 1 }}>
          82%
        </div>
        <div style={{ fontSize: '11px', fontWeight: 800, color: isDarkMode ? '#6EE7B7' : '#047857', marginTop: '3px' }}>
          🌟 Kamu Hebat Sekali!
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '6px' }}>
          <span style={{ fontSize: '9px', fontWeight: 900, color: isDarkMode ? '#A7F3D0' : '#065F46', background: isDarkMode ? 'rgba(0, 0, 0, 0.3)' : '#FFFFFF', padding: '2px 8px', borderRadius: '10px' }}>
            Total XP: {xp}
          </span>
          <span style={{ fontSize: '9px', fontWeight: 900, color: isDarkMode ? '#FDE68A' : '#B45309', background: isDarkMode ? 'rgba(245, 158, 11, 0.25)' : '#FEF3C7', padding: '2px 8px', borderRadius: '10px' }}>
            Streak: 4 Hari 🔥
          </span>
        </div>
      </div>

      {/* Subject Bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
        {/* Matematika */}
        <div style={{ background: isDarkMode ? 'rgba(255, 255, 255, 0.07)' : '#FFFFFF', padding: '9px 11px', borderRadius: '14px', border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 800, color: isDarkMode ? '#FFFFFF' : '#1E293B' }}>
            <span>📚 Matematika (Pecahan)</span>
            <span style={{ color: isDarkMode ? '#60A5FA' : '#2563EB' }}>90%</span>
          </div>
          <div style={{ width: '100%', height: '7px', background: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#E2E8F0', borderRadius: '999px', marginTop: '5px', overflow: 'hidden' }}>
            <div style={{ width: '90%', height: '100%', background: 'linear-gradient(90deg, #3B82F6, #60A5FA)', borderRadius: '999px' }} />
          </div>
        </div>

        {/* IPA Inklusif */}
        <div style={{ background: isDarkMode ? 'rgba(255, 255, 255, 0.07)' : '#FFFFFF', padding: '9px 11px', borderRadius: '14px', border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 800, color: isDarkMode ? '#FFFFFF' : '#1E293B' }}>
            <span>🔬 Ilmu Alam & Energi</span>
            <span style={{ color: isDarkMode ? '#34D399' : '#059669' }}>75%</span>
          </div>
          <div style={{ width: '100%', height: '7px', background: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#E2E8F0', borderRadius: '999px', marginTop: '5px', overflow: 'hidden' }}>
            <div style={{ width: '75%', height: '100%', background: 'linear-gradient(90deg, #10B981, #34D399)', borderRadius: '999px' }} />
          </div>
        </div>
      </div>

      {/* Badges Collection */}
      <div>
        <div style={{ fontSize: '10px', fontWeight: 800, color: isDarkMode ? '#94A3B8' : '#64748B', marginBottom: '4px' }}>
          LENCANA DIDAPAT:
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <div style={{ background: isDarkMode ? 'rgba(245, 158, 11, 0.2)' : '#FEF3C7', border: isDarkMode ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid #FDE047', borderRadius: '10px', padding: '4px 8px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '9px', fontWeight: 800, color: isDarkMode ? '#FDE68A' : '#92400E' }}>
            🍕 Ahli Pecahan
          </div>
          <div style={{ background: isDarkMode ? 'rgba(168, 85, 247, 0.2)' : '#EDE9FE', border: isDarkMode ? '1px solid rgba(168, 85, 247, 0.4)' : '1px solid #DDD6FE', borderRadius: '10px', padding: '4px 8px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '9px', fontWeight: 800, color: isDarkMode ? '#E9D5FF' : '#5B21B6' }}>
            ⭐ Murid Teladan
          </div>
        </div>
      </div>
    </div>
  );
};
