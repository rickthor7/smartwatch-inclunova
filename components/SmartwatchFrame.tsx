'use client';

import React from 'react';
import { audioManager } from '@/utils/audio';

export type StrapColor = 'indigo' | 'cyan' | 'pink' | 'orange' | 'mint' | 'black';

interface SmartwatchFrameProps {
  children: React.ReactNode;
  strapColor: StrapColor;
  isVibrating: boolean;
  isScreenOn: boolean;
  onCrownClick: () => void;
  onSideButtonClick: () => void;
}

export const SmartwatchFrame: React.FC<SmartwatchFrameProps> = ({
  children,
  strapColor,
  isVibrating,
  isScreenOn,
  onCrownClick,
  onSideButtonClick,
}) => {
  // Strap color definitions
  const strapStyles: Record<StrapColor, { bg: string; border: string; accent: string; label: string }> = {
    indigo: {
      bg: 'linear-gradient(180deg, #4F46E5 0%, #3730A3 100%)',
      border: '#312E81',
      accent: '#6366F1',
      label: 'Royal Indigo',
    },
    cyan: {
      bg: 'linear-gradient(180deg, #06B6D4 0%, #0E7490 100%)',
      border: '#155E75',
      accent: '#22D3EE',
      label: 'Ocean Cyan',
    },
    pink: {
      bg: 'linear-gradient(180deg, #F43F5E 0%, #BE123C 100%)',
      border: '#9F1239',
      accent: '#FB7185',
      label: 'Berry Pink',
    },
    orange: {
      bg: 'linear-gradient(180deg, #F97316 0%, #C2410C 100%)',
      border: '#9A3412',
      accent: '#FB923C',
      label: 'Solar Orange',
    },
    mint: {
      bg: 'linear-gradient(180deg, #10B981 0%, #047857 100%)',
      border: '#065F46',
      accent: '#34D399',
      label: 'Mint Green',
    },
    black: {
      bg: 'linear-gradient(180deg, #334155 0%, #0F172A 100%)',
      border: '#020617',
      accent: '#475569',
      label: 'Stealth Slate',
    },
  };

  const currentStrap = strapStyles[strapColor];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        userSelect: 'none',
        margin: '1.5rem auto',
      }}
      className={isVibrating ? 'watch-vibrating' : ''}
    >
      {/* Top Silicone Strap with Realistic Ridges */}
      <div
        style={{
          width: '160px',
          height: '90px',
          background: currentStrap.bg,
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          boxShadow: 'inset 0 4px 10px rgba(255,255,255,0.2), 0 8px 16px rgba(0,0,0,0.3)',
          border: `2px solid ${currentStrap.border}`,
          borderBottom: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '8px 0',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Strap holes & texture */}
        <div style={{ width: '40px', height: '6px', background: 'rgba(0,0,0,0.25)', borderRadius: '3px' }} />
        <div style={{ width: '40px', height: '6px', background: 'rgba(0,0,0,0.25)', borderRadius: '3px' }} />
        <div style={{ width: '40px', height: '6px', background: 'rgba(0,0,0,0.25)', borderRadius: '3px' }} />
      </div>

      {/* Main Watch Body Chassis (Squircle) */}
      <div
        style={{
          width: '364px',
          height: '428px',
          background: 'linear-gradient(145deg, #334155 0%, #1E293B 50%, #0F172A 100%)',
          borderRadius: '56px',
          padding: '22px',
          position: 'relative',
          boxShadow: `
            0 20px 50px rgba(0, 0, 0, 0.6),
            0 0 0 1px rgba(255, 255, 255, 0.15) inset,
            0 8px 16px rgba(0, 0, 0, 0.4)
          `,
          border: '3px solid #475569',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Left Side: Speaker Grill Slit */}
        <div
          style={{
            position: 'absolute',
            left: '-6px',
            top: '46%',
            transform: 'translateY(-50%)',
            width: '4px',
            height: '36px',
            background: '#0F172A',
            borderRadius: '4px',
            border: '1px solid #64748B',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            padding: '3px 0',
            alignItems: 'center',
          }}
          title="Speaker Grill INCLUNOVA"
        >
          <div style={{ width: '2px', height: '4px', background: '#334155', borderRadius: '1px' }} />
          <div style={{ width: '2px', height: '4px', background: '#334155', borderRadius: '1px' }} />
          <div style={{ width: '2px', height: '4px', background: '#334155', borderRadius: '1px' }} />
        </div>

        {/* Top: Microphone Dot */}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '5px',
            height: '5px',
            background: '#0F172A',
            borderRadius: '50%',
            border: '1px solid #475569',
          }}
          title="Microphone Hole"
        />

        {/* Right Side: Interactive Digital Crown */}
        <div
          onClick={() => {
            audioManager.playTap();
            onCrownClick();
          }}
          title="Digital Crown (Klik untuk Kembali ke Home)"
          style={{
            position: 'absolute',
            right: '-14px',
            top: '32%',
            transform: 'translateY(-50%)',
            width: '12px',
            height: '50px',
            background: 'linear-gradient(180deg, #64748B 0%, #334155 50%, #1E293B 100%)',
            borderRadius: '5px',
            border: '1.5px solid #94A3B8',
            cursor: 'pointer',
            boxShadow: '2px 4px 8px rgba(0,0,0,0.4)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            padding: '2px 0',
            alignItems: 'center',
            transition: 'transform 0.1s',
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = 'translateY(-50%) scale(0.92)')}
          onMouseUp={(e) => (e.currentTarget.style.transform = 'translateY(-50%) scale(1)')}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ width: '8px', height: '2px', background: '#94A3B8', borderRadius: '1px' }} />
          ))}
        </div>

        {/* Right Side: Interactive Power/Sleep Side Button */}
        <div
          onClick={() => {
            audioManager.playTap();
            onSideButtonClick();
          }}
          title="Tombol Daya / Siaga (Klik untuk Toggle Layar)"
          style={{
            position: 'absolute',
            right: '-10px',
            top: '64%',
            transform: 'translateY(-50%)',
            width: '8px',
            height: '36px',
            background: 'linear-gradient(180deg, #64748B 0%, #334155 100%)',
            borderRadius: '4px',
            border: '1.5px solid #94A3B8',
            cursor: 'pointer',
            boxShadow: '2px 2px 6px rgba(0,0,0,0.4)',
            transition: 'transform 0.1s',
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = 'translateY(-50%) scale(0.92)')}
          onMouseUp={(e) => (e.currentTarget.style.transform = 'translateY(-50%) scale(1)')}
        />

        {/* Inner Bezel (AMOLED Display Border) */}
        <div
          style={{
            width: '320px',
            height: '380px',
            background: '#000000',
            borderRadius: '44px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.9)',
          }}
        >
          {/* Glass Glare Overlay for realistic screen reflection */}
          <div className="glass-reflection" />

          {/* Screen Content or Sleep Screen */}
          {isScreenOn ? (
            <div className="smartwatch-screen">
              {children}
            </div>
          ) : (
            <div
              onClick={onSideButtonClick}
              style={{
                width: '100%',
                height: '100%',
                background: '#090D16',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#64748B',
                cursor: 'pointer',
                textAlign: 'center',
                padding: '20px',
                gap: '8px',
              }}
            >
              <div style={{ fontSize: '32px' }}>🌙</div>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#94A3B8' }}>Layar Siaga Hemat Daya</div>
              <div style={{ fontSize: '10px', color: '#64748B' }}>Sentuh layar atau tekan tombol samping untuk menyalakan</div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Silicone Strap with Pin Clasp */}
      <div
        style={{
          width: '160px',
          height: '110px',
          background: currentStrap.bg,
          borderBottomLeftRadius: '24px',
          borderBottomRightRadius: '24px',
          boxShadow: 'inset 0 -4px 10px rgba(255,255,255,0.2), 0 12px 24px rgba(0,0,0,0.4)',
          border: `2px solid ${currentStrap.border}`,
          borderTop: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '12px 0',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Strap holes & texture */}
        <div style={{ width: '40px', height: '6px', background: 'rgba(0,0,0,0.25)', borderRadius: '3px' }} />
        <div style={{ width: '40px', height: '6px', background: 'rgba(0,0,0,0.25)', borderRadius: '3px' }} />
        <div style={{ width: '40px', height: '6px', background: 'rgba(0,0,0,0.25)', borderRadius: '3px' }} />
        <div style={{ width: '32px', height: '8px', background: '#1E293B', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  );
};
