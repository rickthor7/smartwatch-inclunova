'use client';

import React from 'react';
import { ArrowLeft, Moon, Sun, Type, Eye, Volume2, Vibrate, Check } from 'lucide-react';
import { audioManager } from '@/utils/audio';

interface SettingsScreenProps {
  onBack: () => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  isLargeFont: boolean;
  onToggleLargeFont: () => void;
  isHighContrast: boolean;
  onToggleHighContrast: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  hapticEnabled: boolean;
  onToggleHaptic: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onBack,
  isDarkMode = false,
  onToggleDarkMode,
  isLargeFont,
  onToggleLargeFont,
  isHighContrast,
  onToggleHighContrast,
  soundEnabled,
  onToggleSound,
  hapticEnabled,
  onToggleHaptic,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '10px 12px', gap: '8px', overflowY: 'auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={() => {
            audioManager.playTap();
            onBack();
          }}
          style={{ background: isDarkMode ? '#1E293B' : '#F1F5F9', border: 'none', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >
          <ArrowLeft size={16} color={isDarkMode ? '#F8FAFC' : '#334155'} />
        </button>
        <div style={{ fontSize: '12px', fontWeight: 900, color: isDarkMode ? '#F8FAFC' : '#1E293B' }}>Aksesibilitas & Tampilan</div>
        <div style={{ width: '28px' }} />
      </div>

      <div style={{ fontSize: '10px', color: isDarkMode ? '#94A3B8' : '#64748B', fontWeight: 600 }}>
        Sesuaikan kenyamanan belajar:
      </div>

      {/* Toggle list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {/* Dark Mode Toggle */}
        <div
          onClick={() => {
            audioManager.playTap();
            onToggleDarkMode?.();
          }}
          style={{
            background: isDarkMode ? '#131B2E' : '#FFFFFF',
            padding: '8px 10px',
            borderRadius: '12px',
            border: isDarkMode ? '1.5px solid #FACC15' : '1px solid #E2E8F0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Moon size={16} color={isDarkMode ? '#FACC15' : '#6366F1'} fill={isDarkMode ? '#FACC15' : 'none'} />
            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: isDarkMode ? '#F8FAFC' : '#1E293B' }}>
                Mode Gelap (Dark Mode)
              </div>
              <div style={{ fontSize: '8px', color: isDarkMode ? '#94A3B8' : '#64748B' }}>
                Tampilan gelap hemat daya & ramah mata
              </div>
            </div>
          </div>
          <div style={{ width: '20px', height: '20px', borderRadius: '6px', background: isDarkMode ? '#FACC15' : '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {isDarkMode && <Check size={14} color="#0F172A" />}
          </div>
        </div>

        {/* Large Text */}
        <div
          onClick={() => {
            audioManager.playTap();
            onToggleLargeFont();
          }}
          style={{
            background: isDarkMode ? '#131B2E' : '#FFFFFF',
            padding: '8px 10px',
            borderRadius: '12px',
            border: isLargeFont ? '1.5px solid #5B5FEF' : (isDarkMode ? '1px solid #1E293B' : '1px solid #E2E8F0'),
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Type size={16} color="#818CF8" />
            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: isDarkMode ? '#F8FAFC' : '#1E293B' }}>Teks Lebih Besar</div>
              <div style={{ fontSize: '8px', color: isDarkMode ? '#94A3B8' : '#64748B' }}>Memperjelas tulisan bacaan</div>
            </div>
          </div>
          <div style={{ width: '20px', height: '20px', borderRadius: '6px', background: isLargeFont ? '#5B5FEF' : (isDarkMode ? '#1E293B' : '#F1F5F9'), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {isLargeFont && <Check size={14} color="#FFF" />}
          </div>
        </div>

        {/* High Contrast */}
        <div
          onClick={() => {
            audioManager.playTap();
            onToggleHighContrast();
          }}
          style={{
            background: isDarkMode ? '#131B2E' : '#FFFFFF',
            padding: '8px 10px',
            borderRadius: '12px',
            border: isHighContrast ? '1.5px solid #5B5FEF' : (isDarkMode ? '1px solid #1E293B' : '1px solid #E2E8F0'),
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Eye size={16} color="#38BDF8" />
            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: isDarkMode ? '#F8FAFC' : '#1E293B' }}>Kontras Tinggi</div>
              <div style={{ fontSize: '8px', color: isDarkMode ? '#94A3B8' : '#64748B' }}>Membantu penglihatan peka</div>
            </div>
          </div>
          <div style={{ width: '20px', height: '20px', borderRadius: '6px', background: isHighContrast ? '#5B5FEF' : (isDarkMode ? '#1E293B' : '#F1F5F9'), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {isHighContrast && <Check size={14} color="#FFF" />}
          </div>
        </div>

        {/* Haptic Vibration */}
        <div
          onClick={() => {
            audioManager.playTap();
            onToggleHaptic();
          }}
          style={{
            background: isDarkMode ? '#131B2E' : '#FFFFFF',
            padding: '8px 10px',
            borderRadius: '12px',
            border: hapticEnabled ? '1.5px solid #5B5FEF' : (isDarkMode ? '1px solid #1E293B' : '1px solid #E2E8F0'),
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Vibrate size={16} color="#F59E0B" />
            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: isDarkMode ? '#F8FAFC' : '#1E293B' }}>Getaran Haptic</div>
              <div style={{ fontSize: '8px', color: isDarkMode ? '#94A3B8' : '#64748B' }}>Umpan balik raba kuis & notif</div>
            </div>
          </div>
          <div style={{ width: '20px', height: '20px', borderRadius: '6px', background: hapticEnabled ? '#5B5FEF' : (isDarkMode ? '#1E293B' : '#F1F5F9'), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {hapticEnabled && <Check size={14} color="#FFF" />}
          </div>
        </div>

        {/* Sound FX */}
        <div
          onClick={() => {
            audioManager.playTap();
            onToggleSound();
          }}
          style={{
            background: isDarkMode ? '#131B2E' : '#FFFFFF',
            padding: '8px 10px',
            borderRadius: '12px',
            border: soundEnabled ? '1.5px solid #5B5FEF' : (isDarkMode ? '1px solid #1E293B' : '1px solid #E2E8F0'),
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Volume2 size={16} color="#10B981" />
            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: isDarkMode ? '#F8FAFC' : '#1E293B' }}>Efek Suara Ceria</div>
              <div style={{ fontSize: '8px', color: isDarkMode ? '#94A3B8' : '#64748B' }}>Bel & apresiasi suara</div>
            </div>
          </div>
          <div style={{ width: '20px', height: '20px', borderRadius: '6px', background: soundEnabled ? '#5B5FEF' : (isDarkMode ? '#1E293B' : '#F1F5F9'), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {soundEnabled && <Check size={14} color="#FFF" />}
          </div>
        </div>
      </div>

      {/* Device Info */}
      <div style={{ background: isDarkMode ? '#131B2E' : '#F8FAFC', borderRadius: '10px', padding: '6px 8px', border: isDarkMode ? '1px solid #1E293B' : '1px solid #E2E8F0', marginTop: 'auto', fontSize: '8px', color: isDarkMode ? '#94A3B8' : '#64748B', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <div>🌱 Casing: Daur Ulang Ramah Anak</div>
        <div>⚡ Dual Baterai: Solar + Bio Limbah Kulit Buah</div>
      </div>
    </div>
  );
};
