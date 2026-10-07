'use client';

import React from 'react';
import { ScreenType, NotificationItem } from '@/types/smartwatch';
import { BookOpen, Bell, Sparkles, Heart, Zap, Award, Settings, Wifi, WifiOff, Moon, Sun } from 'lucide-react';
import { audioManager } from '@/utils/audio';

interface HomeScreenProps {
  onNavigate: (screen: ScreenType) => void;
  notifications: NotificationItem[];
  heartRate: number;
  mainBattery: number;
  backupBattery: number;
  isUsingBackup: boolean;
  isOnline: boolean;
  xp: number;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  notifications,
  heartRate,
  mainBattery,
  backupBattery,
  isUsingBackup,
  isOnline,
  xp,
  isDarkMode = false,
  onToggleDarkMode,
}) => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNav = (screen: ScreenType) => {
    audioManager.playTap();
    onNavigate(screen);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '10px 12px 12px',
        gap: '8px',
        overflowY: 'auto',
        background: isDarkMode ? '#000000' : '#F8FAFC',
        color: isDarkMode ? '#F8FAFC' : '#172033',
        transition: 'background 0.25s ease, color 0.25s ease',
      }}
    >
      {/* Top Status Bar in Watch */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px', fontWeight: 800, paddingTop: '1px' }}>
        {/* Online / Offline Status Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {isOnline ? (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px',
                color: isDarkMode ? '#4ADE80' : '#059669',
                background: isDarkMode ? 'rgba(34, 197, 94, 0.18)' : '#DCFCE7',
                border: isDarkMode ? '1px solid rgba(34, 197, 94, 0.35)' : 'none',
                padding: '2px 7px',
                borderRadius: '999px',
              }}
            >
              <Wifi size={10} /> Online
            </span>
          ) : (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px',
                color: isDarkMode ? '#FBBF24' : '#D97706',
                background: isDarkMode ? 'rgba(245, 158, 11, 0.18)' : '#FEF3C7',
                border: isDarkMode ? '1px solid rgba(245, 158, 11, 0.35)' : 'none',
                padding: '2px 7px',
                borderRadius: '999px',
              }}
            >
              <WifiOff size={10} /> Offline
            </span>
          )}
        </div>

        {/* Sleek Dark / Light Mode Pill Toggle */}
        <button
          onClick={() => {
            audioManager.playTap();
            onToggleDarkMode?.();
          }}
          style={{
            background: isDarkMode ? 'rgba(250, 204, 21, 0.16)' : '#E2E8F0',
            border: isDarkMode ? '1px solid rgba(250, 204, 21, 0.4)' : '1px solid #CBD5E1',
            borderRadius: '999px',
            padding: '2px 8px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '10px',
            fontWeight: 800,
            color: isDarkMode ? '#FDE047' : '#334155',
            cursor: 'pointer',
            boxShadow: isDarkMode ? '0 0 10px rgba(250, 204, 21, 0.25)' : 'none',
            transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
          title={isDarkMode ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
        >
          {isDarkMode ? <Moon size={11} fill="#FDE047" /> : <Sun size={11} />}
          <span>{isDarkMode ? 'Dark' : 'Light'}</span>
        </button>

        {/* Battery Indicator Pill */}
        <button
          onClick={() => handleNav('battery')}
          style={{
            background: isUsingBackup
              ? (isDarkMode ? 'rgba(245, 158, 11, 0.2)' : '#FEF3C7')
              : (isDarkMode ? 'rgba(59, 130, 246, 0.2)' : '#EFF6FF'),
            border: isDarkMode
              ? (isUsingBackup ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid rgba(59, 130, 246, 0.4)')
              : 'none',
            borderRadius: '999px',
            padding: '2px 7px',
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            fontSize: '10px',
            fontWeight: 900,
            color: isUsingBackup
              ? (isDarkMode ? '#FBBF24' : '#B45309')
              : (isDarkMode ? '#60A5FA' : '#2563EB'),
            cursor: 'pointer',
          }}
          title="Lihat Sistem Baterai Ganda"
        >
          <Zap size={10} fill="currentColor" />
          {isUsingBackup ? `Bio ${backupBattery}%` : `${mainBattery}%`}
        </button>
      </div>

      {/* Mascot & Greeting Glass Header */}
      <div
        style={{
          background: isDarkMode
            ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(139, 92, 246, 0.15) 100%)'
            : 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)',
          borderRadius: '20px',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: isDarkMode ? '1px solid rgba(165, 180, 252, 0.3)' : '1px solid #C7D2FE',
          boxShadow: isDarkMode ? '0 4px 16px rgba(0, 0, 0, 0.4)' : '0 2px 8px rgba(91, 95, 239, 0.08)',
          backdropFilter: isDarkMode ? 'blur(10px)' : 'none',
        }}
      >
        <div>
          <div style={{ fontSize: '9px', fontWeight: 800, color: isDarkMode ? '#A5B4FC' : '#4F46E5', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
            INCLUNOVA OS
          </div>
          <div style={{ fontSize: '16px', fontWeight: 900, color: isDarkMode ? '#FFFFFF' : '#1E1B4B', lineHeight: 1.2, marginTop: '1px' }}>
            Hai, Alya! ✨
          </div>
          <div style={{ fontSize: '10px', color: isDarkMode ? '#C7D2FE' : '#4338CA', marginTop: '2px', fontWeight: 500 }}>
            Siap berpetualang hari ini?
          </div>
        </div>
        <div
          className="anim-float"
          style={{
            fontSize: '30px',
            cursor: 'pointer',
            filter: isDarkMode ? 'drop-shadow(0 0 12px rgba(250, 204, 21, 0.6))' : 'drop-shadow(0 4px 6px rgba(0,0,0,0.12))',
            transition: 'transform 0.2s',
          }}
          onClick={() => {
            audioManager.playSuccess();
          }}
          title="Nova, Teman Belajarmu"
        >
          ⭐
        </div>
      </div>

      {/* Quick Action: Mulai Belajar Hero Button */}
      <button
        onClick={() => handleNav('learn')}
        className="kid-button kid-button-primary"
        style={{
          width: '100%',
          padding: '12px 14px',
          borderRadius: '20px',
          fontSize: '14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #6366F1 0%, #4338CA 100%)',
          boxShadow: isDarkMode ? '0 6px 20px rgba(99, 102, 241, 0.45)' : '0 6px 16px rgba(91, 95, 239, 0.35)',
          border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', textAlign: 'left' }}>
          <div style={{ background: 'rgba(255,255,255,0.22)', borderRadius: '12px', padding: '6px', display: 'flex' }}>
            <BookOpen size={18} color="#FFFFFF" />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '14px', lineHeight: 1.1, color: '#FFFFFF' }}>Mulai Belajar</div>
            <div style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.85)', marginTop: '2px' }}>Pecahan Dasar • Step 1/4</div>
          </div>
        </div>
        <span
          style={{
            background: '#FFFFFF',
            color: '#3730A3',
            borderRadius: '12px',
            padding: '4px 9px',
            fontSize: '11px',
            fontWeight: 900,
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
          }}
        >
          GO →
        </span>
      </button>

      {/* Grid of 4 Polished Interactive Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        {/* Notifikasi Card */}
        <div
          onClick={() => handleNav('notifications')}
          style={{
            cursor: 'pointer',
            padding: '9px 11px',
            borderRadius: '18px',
            background: isDarkMode ? 'rgba(255, 255, 255, 0.06)' : '#FFFFFF',
            border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.12)' : '1.5px solid #E2E8F0',
            display: 'flex',
            flexDirection: 'column',
            gap: '3px',
            transition: 'all 0.15s ease',
            boxShadow: isDarkMode ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 2px 6px rgba(0,0,0,0.04)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ width: '22px', height: '22px', borderRadius: '8px', background: isDarkMode ? 'rgba(245, 158, 11, 0.2)' : '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bell size={13} color="#F59E0B" />
            </div>
            {unreadCount > 0 && (
              <span style={{ background: '#EF4444', color: '#FFF', fontSize: '9px', fontWeight: 900, borderRadius: '999px', padding: '1px 5px', boxShadow: '0 2px 4px rgba(239,68,68,0.4)' }}>
                {unreadCount}
              </span>
            )}
          </div>
          <div style={{ fontSize: '11px', fontWeight: 800, color: isDarkMode ? '#FFFFFF' : '#1E293B', marginTop: '3px' }}>Notifikasi</div>
          <div style={{ fontSize: '9px', color: isDarkMode ? '#94A3B8' : '#64748B' }}>{unreadCount} info sekolah</div>
        </div>

        {/* AI Rekomendasi Card */}
        <div
          onClick={() => handleNav('recommendation')}
          style={{
            cursor: 'pointer',
            padding: '9px 11px',
            borderRadius: '18px',
            background: isDarkMode ? 'rgba(192, 132, 252, 0.12)' : '#FDF4FF',
            border: isDarkMode ? '1px solid rgba(192, 132, 252, 0.3)' : '1.5px solid #F0ABFC',
            display: 'flex',
            flexDirection: 'column',
            gap: '3px',
            transition: 'all 0.15s ease',
            boxShadow: isDarkMode ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 2px 6px rgba(0,0,0,0.04)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ width: '22px', height: '22px', borderRadius: '8px', background: isDarkMode ? 'rgba(192, 132, 252, 0.25)' : '#FAE8FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={13} color={isDarkMode ? '#E879F9' : '#C026D3'} />
            </div>
            <span style={{ fontSize: '8px', fontWeight: 900, color: isDarkMode ? '#F5D0FE' : '#A21CAF', background: isDarkMode ? 'rgba(192, 132, 252, 0.2)' : '#F5D0FE', padding: '1px 5px', borderRadius: '6px' }}>AI</span>
          </div>
          <div style={{ fontSize: '11px', fontWeight: 800, color: isDarkMode ? '#FFFFFF' : '#701A75', marginTop: '3px' }}>Untukmu ✨</div>
          <div style={{ fontSize: '9px', color: isDarkMode ? '#D8B4FE' : '#A21CAF' }}>Rekomendasi adaptif</div>
        </div>

        {/* Detak Jantung Sensor Card */}
        <div
          onClick={() => handleNav('health')}
          style={{
            cursor: 'pointer',
            padding: '9px 11px',
            borderRadius: '18px',
            background: isDarkMode ? 'rgba(244, 63, 94, 0.12)' : '#FFF1F2',
            border: isDarkMode ? '1px solid rgba(244, 63, 94, 0.3)' : '1.5px solid #FECDD3',
            display: 'flex',
            flexDirection: 'column',
            gap: '3px',
            transition: 'all 0.15s ease',
            boxShadow: isDarkMode ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 2px 6px rgba(0,0,0,0.04)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ width: '22px', height: '22px', borderRadius: '8px', background: isDarkMode ? 'rgba(244, 63, 94, 0.25)' : '#FFE4E6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Heart size={13} color="#FB7185" className="anim-pulse-heart" />
            </div>
            <span style={{ fontSize: '8px', fontWeight: 900, color: isDarkMode ? '#FDA4AF' : '#E11D48' }}>Sehat</span>
          </div>
          <div style={{ fontSize: '13px', fontWeight: 900, color: isDarkMode ? '#FFFFFF' : '#9F1239', marginTop: '3px' }}>{heartRate} BPM</div>
          <div style={{ fontSize: '9px', color: isDarkMode ? '#FDA4AF' : '#BE123C' }}>Detak jantung siswa</div>
        </div>

        {/* XP & Capaian Card */}
        <div
          onClick={() => handleNav('progress')}
          style={{
            cursor: 'pointer',
            padding: '9px 11px',
            borderRadius: '18px',
            background: isDarkMode ? 'rgba(16, 185, 129, 0.12)' : '#ECFDF5',
            border: isDarkMode ? '1px solid rgba(16, 185, 129, 0.3)' : '1.5px solid #A7F3D0',
            display: 'flex',
            flexDirection: 'column',
            gap: '3px',
            transition: 'all 0.15s ease',
            boxShadow: isDarkMode ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 2px 6px rgba(0,0,0,0.04)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ width: '22px', height: '22px', borderRadius: '8px', background: isDarkMode ? 'rgba(16, 185, 129, 0.25)' : '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Award size={13} color="#34D399" />
            </div>
            <span style={{ fontSize: '8px', fontWeight: 900, color: isDarkMode ? '#6EE7B7' : '#059669' }}>Lv. 3</span>
          </div>
          <div style={{ fontSize: '13px', fontWeight: 900, color: isDarkMode ? '#FFFFFF' : '#065F46', marginTop: '3px' }}>{xp} XP</div>
          <div style={{ fontSize: '9px', color: isDarkMode ? '#6EE7B7' : '#047857' }}>Progres belajar</div>
        </div>
      </div>

      {/* Bottom Nav Bar Icons */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingTop: '6px',
          borderTop: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E2E8F0',
          marginTop: 'auto',
        }}
      >
        <button
          onClick={() => handleNav('teacher-voice')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}
          title="Pesan Guru"
        >
          <span style={{ fontSize: '14px' }}>🎙️</span>
          <span style={{ fontSize: '8px', fontWeight: 800, color: isDarkMode ? '#94A3B8' : '#64748B' }}>Guru</span>
        </button>

        <button
          onClick={() => handleNav('quiz')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}
          title="Kuis Interaktif"
        >
          <span style={{ fontSize: '14px' }}>🎮</span>
          <span style={{ fontSize: '8px', fontWeight: 800, color: isDarkMode ? '#94A3B8' : '#64748B' }}>Kuis</span>
        </button>

        <button
          onClick={() => handleNav('offline-sync')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}
          title="Sinkronisasi Offline"
        >
          <span style={{ fontSize: '14px' }}>🔄</span>
          <span style={{ fontSize: '8px', fontWeight: 800, color: isDarkMode ? '#94A3B8' : '#64748B' }}>Sync</span>
        </button>

        <button
          onClick={() => handleNav('settings')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}
          title="Pengaturan Aksesibilitas"
        >
          <Settings size={14} color={isDarkMode ? '#94A3B8' : '#64748B'} />
          <span style={{ fontSize: '8px', fontWeight: 800, color: isDarkMode ? '#94A3B8' : '#64748B' }}>Akses</span>
        </button>
      </div>
    </div>
  );
};
