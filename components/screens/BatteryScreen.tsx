'use client';

import React from 'react';
import { ArrowLeft, Zap, Sun, Leaf } from 'lucide-react';
import { audioManager } from '@/utils/audio';

interface BatteryScreenProps {
  onBack: () => void;
  mainBattery: number;
  backupBattery: number;
  isUsingBackup: boolean;
  onSimulateDrain: () => void;
  onSimulateCharge: () => void;
  onTriggerHaptic: () => void;
  isDarkMode?: boolean;
}

export const BatteryScreen: React.FC<BatteryScreenProps> = ({
  onBack,
  mainBattery,
  backupBattery,
  isUsingBackup,
  onSimulateDrain,
  onSimulateCharge,
  onTriggerHaptic,
  isDarkMode = false,
}) => {
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
        <div style={{ fontSize: '12px', fontWeight: 900, color: isDarkMode ? '#FFFFFF' : '#1E293B' }}>Sistem Energi Ganda</div>
        <div style={{ width: '28px' }} />
      </div>

      {/* Failover Alert if using backup */}
      {isUsingBackup && (
        <div
          style={{
            background: isDarkMode ? 'rgba(245, 158, 11, 0.2)' : '#FEF3C7',
            border: isDarkMode ? '1.5px solid rgba(245, 158, 11, 0.5)' : '1.5px solid #F59E0B',
            borderRadius: '12px',
            padding: '6px 8px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <Zap size={16} color="#FBBF24" />
          <div>
            <div style={{ fontSize: '10px', fontWeight: 900, color: isDarkMode ? '#FDE68A' : '#92400E' }}>
              ⚡ Bio-Battery Aktif Otomatis!
            </div>
            <div style={{ fontSize: '8px', color: isDarkMode ? '#FCD34D' : '#B45309' }}>
              Baterai utama rendah, pembelajaran tetap aman berjalan.
            </div>
          </div>
        </div>
      )}

      {/* Slot 1: Main Battery (Solar) */}
      <div
        style={{
          background: isDarkMode ? 'rgba(255, 255, 255, 0.07)' : '#FFFFFF',
          borderRadius: '16px',
          padding: '8px 10px',
          border: !isUsingBackup
            ? (isDarkMode ? '2px solid #60A5FA' : '2px solid #3B82F6')
            : (isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E2E8F0'),
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sun size={15} color="#FBBF24" />
            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: isDarkMode ? '#FFFFFF' : '#1E293B' }}>Baterai Utama (Solar)</div>
              <div style={{ fontSize: '9px', color: isDarkMode ? '#94A3B8' : '#64748B' }}>Pengisian Stasiun Surya Sekolah</div>
            </div>
          </div>
          <span style={{ fontSize: '14px', fontWeight: 900, color: mainBattery < 20 ? '#EF4444' : (isDarkMode ? '#60A5FA' : '#2563EB') }}>
            {mainBattery}%
          </span>
        </div>
        <div style={{ width: '100%', height: '6px', background: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#E2E8F0', borderRadius: '4px', marginTop: '6px', overflow: 'hidden' }}>
          <div
            style={{
              width: `${mainBattery}%`,
              height: '100%',
              background: mainBattery < 20 ? '#EF4444' : '#3B82F6',
              transition: 'all 0.4s ease',
            }}
          />
        </div>
        {!isUsingBackup && (
          <span style={{ position: 'absolute', top: '-8px', right: '12px', background: '#3B82F6', color: '#FFF', fontSize: '8px', fontWeight: 900, padding: '1px 6px', borderRadius: '6px' }}>
            DIGUNAKAN
          </span>
        )}
      </div>

      {/* Slot 2: Backup Bio-Battery */}
      <div
        style={{
          background: isDarkMode ? 'rgba(255, 255, 255, 0.07)' : '#FFFFFF',
          borderRadius: '16px',
          padding: '8px 10px',
          border: isUsingBackup
            ? (isDarkMode ? '2px solid #4ADE80' : '2px solid #16A34A')
            : (isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E2E8F0'),
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Leaf size={15} color="#4ADE80" />
            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: isDarkMode ? '#FFFFFF' : '#1E293B' }}>Bio-Battery Cadangan</div>
              <div style={{ fontSize: '9px', color: isDarkMode ? '#94A3B8' : '#64748B' }}>Ekstrak Limbah Kulit Buah</div>
            </div>
          </div>
          <span style={{ fontSize: '14px', fontWeight: 900, color: isDarkMode ? '#4ADE80' : '#16A34A' }}>
            {backupBattery}%
          </span>
        </div>
        <div style={{ width: '100%', height: '6px', background: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#E2E8F0', borderRadius: '4px', marginTop: '6px', overflow: 'hidden' }}>
          <div
            style={{
              width: `${backupBattery}%`,
              height: '100%',
              background: '#22C55E',
              transition: 'all 0.4s ease',
            }}
          />
        </div>
        {isUsingBackup && (
          <span style={{ position: 'absolute', top: '-8px', right: '12px', background: '#16A34A', color: '#FFF', fontSize: '8px', fontWeight: 900, padding: '1px 6px', borderRadius: '6px' }}>
            CADANGAN AKTIF
          </span>
        )}
      </div>

      {/* Simulation test triggers */}
      <div style={{ display: 'flex', gap: '6px', marginTop: 'auto' }}>
        <button
          onClick={() => {
            onTriggerHaptic();
            audioManager.playTap();
            onSimulateDrain();
          }}
          style={{
            flex: 1,
            background: isDarkMode ? 'rgba(239, 68, 68, 0.2)' : '#FEE2E2',
            border: isDarkMode ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid #FCA5A5',
            borderRadius: '10px',
            padding: '7px',
            fontSize: '9px',
            fontWeight: 800,
            color: isDarkMode ? '#FCA5A5' : '#B91C1C',
            cursor: 'pointer',
          }}
        >
          Tes Drop Baterai ⚡
        </button>
        <button
          onClick={() => {
            onTriggerHaptic();
            audioManager.playSuccess();
            onSimulateCharge();
          }}
          style={{
            flex: 1,
            background: isDarkMode ? 'rgba(59, 130, 246, 0.2)' : '#EFF6FF',
            border: isDarkMode ? '1px solid rgba(59, 130, 246, 0.4)' : '1px solid #BFDBFE',
            borderRadius: '10px',
            padding: '7px',
            fontSize: '9px',
            fontWeight: 800,
            color: isDarkMode ? '#93C5FD' : '#1D4ED8',
            cursor: 'pointer',
          }}
        >
          Isi Ulang Surya ☀️
        </button>
      </div>
    </div>
  );
};
