'use client';

import React, { useState } from 'react';
import { ArrowLeft, RefreshCw, CheckCircle2, Wifi, WifiOff } from 'lucide-react';
import { audioManager } from '@/utils/audio';

interface OfflineSyncScreenProps {
  onBack: () => void;
  isOnline: boolean;
  onToggleOnline: () => void;
  onTriggerHaptic: () => void;
  isDarkMode?: boolean;
}

export const OfflineSyncScreen: React.FC<OfflineSyncScreenProps> = ({
  onBack,
  isOnline,
  onToggleOnline,
  onTriggerHaptic,
  isDarkMode = false,
}) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(100);
  const [lastSyncTime, setLastSyncTime] = useState('08:24 WIB');

  const handleStartSync = () => {
    if (isSyncing) return;
    onTriggerHaptic();
    audioManager.playTap();
    setIsSyncing(true);
    setSyncProgress(10);

    const interval = setInterval(() => {
      setSyncProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSyncing(false);
          setLastSyncTime(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB');
          audioManager.playSuccess();
          return 100;
        }
        return prev + 25;
      });
    }, 400);
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
        <div style={{ fontSize: '12px', fontWeight: 900, color: isDarkMode ? '#FFFFFF' : '#1E293B' }}>Sinkronisasi Data</div>
        <div style={{ width: '28px' }} />
      </div>

      {/* Online / Offline status badge card */}
      <div
        style={{
          background: isOnline
            ? (isDarkMode ? 'rgba(34, 197, 94, 0.18)' : '#F0FDF4')
            : (isDarkMode ? 'rgba(245, 158, 11, 0.18)' : '#FEF3C7'),
          borderRadius: '16px',
          padding: '8px 10px',
          border: isOnline
            ? (isDarkMode ? '1px solid rgba(34, 197, 94, 0.4)' : '1.5px solid #86EFAC')
            : (isDarkMode ? '1px solid rgba(245, 158, 11, 0.4)' : '1.5px solid #FDE047'),
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {isOnline ? <Wifi size={16} color="#4ADE80" /> : <WifiOff size={16} color="#FBBF24" />}
          <div>
            <div style={{ fontSize: '11px', fontWeight: 900, color: isOnline ? (isDarkMode ? '#FFFFFF' : '#14532D') : (isDarkMode ? '#FFFFFF' : '#78350F') }}>
              {isOnline ? '☁️ Cloud Terhubung' : '📥 Mode Offline Sekolah'}
            </div>
            <div style={{ fontSize: '9px', color: isOnline ? (isDarkMode ? '#4ADE80' : '#166534') : (isDarkMode ? '#FDE68A' : '#92400E') }}>
              {isOnline ? 'Data tersinkron otomatis' : 'Materi aman tersimpan lokal'}
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            audioManager.playTap();
            onToggleOnline();
          }}
          style={{
            background: isDarkMode ? 'rgba(255, 255, 255, 0.15)' : (isOnline ? '#DCFCE7' : '#FDE68A'),
            border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
            borderRadius: '8px',
            padding: '3px 8px',
            fontSize: '9px',
            fontWeight: 800,
            cursor: 'pointer',
            color: isDarkMode ? '#FFFFFF' : (isOnline ? '#166534' : '#92400E'),
          }}
        >
          Ubah
        </button>
      </div>

      {/* Data items status in local cache */}
      <div style={{ background: isDarkMode ? 'rgba(255, 255, 255, 0.07)' : '#FFFFFF', borderRadius: '16px', padding: '9px 11px', border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ fontSize: '10px', fontWeight: 800, color: isDarkMode ? '#94A3B8' : '#475569' }}>KONTEN TERSIMPAN LOKAL:</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: isDarkMode ? '#FFFFFF' : '#1E293B', fontWeight: 700 }}>
          <span>📚 Materi Pelajaran</span>
          <span style={{ color: isDarkMode ? '#60A5FA' : '#2563EB' }}>4 Tersedia</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: isDarkMode ? '#FFFFFF' : '#1E293B', fontWeight: 700 }}>
          <span>🎮 Kuis Interaktif</span>
          <span style={{ color: isDarkMode ? '#4ADE80' : '#16A34A' }}>3 Siap Diuji</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: isDarkMode ? '#FFFFFF' : '#1E293B', fontWeight: 700 }}>
          <span>📝 Rekaman Aktivitas</span>
          <span style={{ color: isDarkMode ? '#FBBF24' : '#D97706' }}>18 Event Pending</span>
        </div>
      </div>

      {/* Sync progress bar */}
      <div style={{ background: isDarkMode ? 'rgba(255, 255, 255, 0.04)' : '#F8FAFC', borderRadius: '14px', padding: '8px 10px', border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #E2E8F0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 800, color: isDarkMode ? '#94A3B8' : '#64748B' }}>
          <span>Progres Sinkron</span>
          <span>{syncProgress}%</span>
        </div>
        <div style={{ width: '100%', height: '6px', background: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#E2E8F0', borderRadius: '6px', marginTop: '4px', overflow: 'hidden' }}>
          <div style={{ width: `${syncProgress}%`, height: '100%', background: '#6366F1', transition: 'width 0.3s ease' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '5px', fontSize: '9px', color: isDarkMode ? '#4ADE80' : '#16A34A', fontWeight: 800 }}>
          <CheckCircle2 size={11} /> Terakhir sinkron: {lastSyncTime}
        </div>
      </div>

      {/* Sync trigger button */}
      <button
        onClick={handleStartSync}
        disabled={isSyncing}
        className="kid-button kid-button-primary"
        style={{
          width: '100%',
          padding: '9px',
          fontSize: '11px',
          borderRadius: '14px',
          marginTop: 'auto',
          background: 'linear-gradient(135deg, #6366F1 0%, #4338CA 100%)',
        }}
      >
        <RefreshCw size={13} className={isSyncing ? 'spin-slow' : ''} />
        {isSyncing ? 'Menyinkronkan...' : 'Sinkronkan Sekarang'}
      </button>
    </div>
  );
};
