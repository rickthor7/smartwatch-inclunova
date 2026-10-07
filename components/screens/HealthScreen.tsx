'use client';

import React from 'react';
import { ArrowLeft, Heart, ShieldCheck } from 'lucide-react';
import { audioManager } from '@/utils/audio';

interface HealthScreenProps {
  onBack: () => void;
  heartRate: number;
  isDarkMode?: boolean;
}

export const HealthScreen: React.FC<HealthScreenProps> = ({ onBack, heartRate, isDarkMode = false }) => {
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
        <div style={{ fontSize: '12px', fontWeight: 900, color: isDarkMode ? '#FFFFFF' : '#1E293B' }}>Kondisi & Keamanan</div>
        <div style={{ width: '28px' }} />
      </div>

      {/* Heart rate main card */}
      <div
        style={{
          background: isDarkMode
            ? 'linear-gradient(135deg, rgba(244, 63, 94, 0.22) 0%, rgba(159, 18, 57, 0.3) 100%)'
            : 'linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%)',
          borderRadius: '18px',
          padding: '12px',
          border: isDarkMode ? '1px solid rgba(244, 63, 94, 0.4)' : '1.5px solid #FECDD3',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          boxShadow: isDarkMode ? '0 4px 16px rgba(244, 63, 94, 0.25)' : '0 2px 8px rgba(225, 29, 72, 0.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Heart size={28} color="#FB7185" className="anim-pulse-heart" />
          <div style={{ fontSize: '28px', fontWeight: 900, color: isDarkMode ? '#FFFFFF' : '#9F1239', lineHeight: 1 }}>
            {heartRate} <span style={{ fontSize: '12px', fontWeight: 700, color: isDarkMode ? '#FDA4AF' : '#BE123C' }}>BPM</span>
          </div>
        </div>

        <div style={{ fontSize: '10px', fontWeight: 800, color: isDarkMode ? '#FDA4AF' : '#9F1239' }}>
          Detak Jantung Normal & Rileks 🟢
        </div>

        {/* Animated ECG Heartbeat Line */}
        <div style={{ width: '100%', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginTop: '2px' }}>
          <svg width="180" height="24" viewBox="0 0 180 24" fill="none">
            <path
              d="M0 12 H40 L45 3 L52 22 L58 8 L65 16 L70 12 H180"
              stroke={isDarkMode ? '#FB7185' : '#E11D48'}
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Safe School Geofence / Location Card */}
      <div
        style={{
          background: isDarkMode ? 'rgba(255, 255, 255, 0.07)' : '#FFFFFF',
          borderRadius: '16px',
          padding: '9px 12px',
          border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.12)' : '1.5px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: isDarkMode ? 'rgba(34, 197, 94, 0.2)' : '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <ShieldCheck size={18} color="#4ADE80" />
        </div>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 800, color: isDarkMode ? '#FFFFFF' : '#1E293B' }}>
            Zona Sekolah Aman
          </div>
          <div style={{ fontSize: '9px', color: isDarkMode ? '#4ADE80' : '#16A34A', fontWeight: 700 }}>
            📍 SD Inklusi Ceria (Dalam Area)
          </div>
        </div>
      </div>

      {/* Sensor Privacy Note */}
      <div style={{ background: isDarkMode ? 'rgba(255, 255, 255, 0.04)' : '#F8FAFC', borderRadius: '10px', padding: '6px 8px', border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #E2E8F0', marginTop: 'auto' }}>
        <p style={{ fontSize: '8px', color: isDarkMode ? '#94A3B8' : '#64748B', lineHeight: 1.3, margin: 0 }}>
          🔒 Data sensor terenkripsi dan hanya dapat dipantau oleh wali murid & guru terdaftar.
        </p>
      </div>
    </div>
  );
};
