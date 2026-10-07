'use client';

import React from 'react';
import { StrapColor } from './SmartwatchFrame';
import { Bell, Wifi, WifiOff, Zap, Sun, Heart, Sparkles, Smartphone, Power, Activity } from 'lucide-react';
import { audioManager } from '@/utils/audio';

interface SimulatorDockProps {
  strapColor: StrapColor;
  onChangeStrapColor: (color: StrapColor) => void;
  isOnline: boolean;
  onToggleOnline: () => void;
  mainBattery: number;
  backupBattery: number;
  isUsingBackup: boolean;
  onSimulateDrain: () => void;
  onSimulateCharge: () => void;
  heartRate: number;
  onChangeHeartRate: (bpm: number) => void;
  onSendMockNotification: () => void;
  isScreenOn: boolean;
  onToggleScreen: () => void;
  onCrownClick: () => void;
}

export const SimulatorDock: React.FC<SimulatorDockProps> = ({
  strapColor,
  onChangeStrapColor,
  isOnline,
  onToggleOnline,
  mainBattery,
  backupBattery,
  isUsingBackup,
  onSimulateDrain,
  onSimulateCharge,
  heartRate,
  onChangeHeartRate,
  onSendMockNotification,
  isScreenOn,
  onToggleScreen,
  onCrownClick,
}) => {
  const strapOptions: { id: StrapColor; label: string; bg: string }[] = [
    { id: 'indigo', label: 'Indigo', bg: '#4F46E5' },
    { id: 'cyan', label: 'Cyan', bg: '#06B6D4' },
    { id: 'pink', label: 'Pink', bg: '#F43F5E' },
    { id: 'orange', label: 'Orange', bg: '#F97316' },
    { id: 'mint', label: 'Mint', bg: '#10B981' },
    { id: 'black', label: 'Slate', bg: '#334155' },
  ];

  return (
    <div
      style={{
        maxWidth: '720px',
        width: '100%',
        background: 'rgba(30, 41, 59, 0.75)',
        backdropFilter: 'blur(16px)',
        borderRadius: '24px',
        padding: '16px 20px',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 16px 36px rgba(0,0,0,0.4)',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        marginTop: '0.5rem',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Smartphone size={18} color="#818CF8" />
          <span style={{ fontSize: '13px', fontWeight: 800, color: '#F1F5F9', letterSpacing: '0.5px' }}>
            SIMULATOR HARDWARE & PENGUJIAN INCLUNOVA
          </span>
        </div>
        <span style={{ fontSize: '10px', fontWeight: 700, color: '#94A3B8', background: 'rgba(255,255,255,0.06)', padding: '3px 8px', borderRadius: '10px' }}>
          Interactive Testbench
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
        {/* Strap Color Picker */}
        <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '10px 12px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8', marginBottom: '8px' }}>
            Warna Tali Smartwatch (Strap):
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {strapOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  audioManager.playTap();
                  onChangeStrapColor(opt.id);
                }}
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: opt.bg,
                  border: strapColor === opt.id ? '2.5px solid #FFFFFF' : '1px solid rgba(255,255,255,0.2)',
                  cursor: 'pointer',
                  boxShadow: strapColor === opt.id ? '0 0 10px rgba(255,255,255,0.5)' : 'none',
                  transition: 'transform 0.15s',
                }}
                title={opt.label}
              />
            ))}
          </div>
        </div>

        {/* Connectivity & Notification triggers */}
        <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '10px 12px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8' }}>
            Jaringan & Notifikasi Sekolah:
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => {
                audioManager.playTap();
                onToggleOnline();
              }}
              style={{
                flex: 1,
                padding: '6px 8px',
                borderRadius: '10px',
                border: 'none',
                background: isOnline ? '#065F46' : '#78350F',
                color: isOnline ? '#A7F3D0' : '#FDE68A',
                fontSize: '11px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
              }}
            >
              {isOnline ? <Wifi size={13} /> : <WifiOff size={13} />}
              {isOnline ? 'Online (Cloud)' : 'Offline (Lokal)'}
            </button>

            <button
              onClick={() => {
                audioManager.playNotification();
                onSendMockNotification();
              }}
              style={{
                padding: '6px 10px',
                borderRadius: '10px',
                border: 'none',
                background: '#4338CA',
                color: '#EEF2FF',
                fontSize: '11px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
              title="Kirim Notifikasi Baru"
            >
              <Bell size={13} /> Kirim Info
            </button>
          </div>
        </div>

        {/* Battery Failover Simulation */}
        <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '10px 12px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 700, color: '#94A3B8' }}>
            <span>Uji Baterai Ganda:</span>
            <span style={{ color: isUsingBackup ? '#F59E0B' : '#38BDF8' }}>
              {isUsingBackup ? 'Bio Cadangan Aktif' : `Solar ${mainBattery}%`}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={onSimulateDrain}
              style={{
                flex: 1,
                padding: '6px 8px',
                borderRadius: '10px',
                border: 'none',
                background: '#7F1D1D',
                color: '#FECACA',
                fontSize: '10px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '3px',
              }}
            >
              <Zap size={12} /> Drop Solar Baterai
            </button>
            <button
              onClick={onSimulateCharge}
              style={{
                flex: 1,
                padding: '6px 8px',
                borderRadius: '10px',
                border: 'none',
                background: '#1E3A8A',
                color: '#BFDBFE',
                fontSize: '10px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '3px',
              }}
            >
              <Sun size={12} /> Cas Tenaga Surya
            </button>
          </div>
        </div>

        {/* Physical Buttons & Health slider */}
        <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '10px 12px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 700, color: '#94A3B8' }}>
            <span>Tombol Fisik & Sensor:</span>
            <span style={{ color: '#FB7185' }}>❤️ {heartRate} BPM</span>
          </div>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <button
              onClick={onCrownClick}
              style={{
                flex: 1,
                padding: '6px 8px',
                borderRadius: '10px',
                border: 'none',
                background: '#334155',
                color: '#F8FAFC',
                fontSize: '10px',
                fontWeight: 800,
                cursor: 'pointer',
              }}
              title="Tekan Crown Fisik untuk kembali ke Home"
            >
              👑 Putar Crown (Home)
            </button>
            <button
              onClick={onToggleScreen}
              style={{
                flex: 1,
                padding: '6px 8px',
                borderRadius: '10px',
                border: 'none',
                background: isScreenOn ? '#475569' : '#047857',
                color: '#FFFFFF',
                fontSize: '10px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '3px',
              }}
            >
              <Power size={12} /> {isScreenOn ? 'Tidur (Sleep)' : 'Bangun (Wake)'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
