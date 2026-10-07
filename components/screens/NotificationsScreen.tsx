'use client';

import React from 'react';
import { ScreenType, NotificationItem } from '@/types/smartwatch';
import { ArrowLeft, BookOpen, Gamepad2, Mic, Bell, CheckCircle2 } from 'lucide-react';
import { audioManager } from '@/utils/audio';

interface NotificationsScreenProps {
  onBack: () => void;
  onNavigate: (screen: ScreenType) => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  isDarkMode?: boolean;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  onBack,
  onNavigate,
  notifications,
  onMarkAllRead,
  isDarkMode = false,
}) => {
  const getCategoryIcon = (cat: NotificationItem['category']) => {
    switch (cat) {
      case 'materi':
        return <BookOpen size={13} color={isDarkMode ? '#60A5FA' : '#2563EB'} />;
      case 'kuis':
        return <Gamepad2 size={13} color={isDarkMode ? '#4ADE80' : '#16A34A'} />;
      case 'voice':
        return <Mic size={13} color={isDarkMode ? '#FBBF24' : '#D97706'} />;
      case 'pr':
        return <Bell size={13} color={isDarkMode ? '#F87171' : '#DC2626'} />;
    }
  };

  const handleItemClick = (item: NotificationItem) => {
    audioManager.playTap();
    onNavigate(item.actionScreen);
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
        <div style={{ fontWeight: 900, fontSize: '13px', color: isDarkMode ? '#FFFFFF' : '#1E293B' }}>Pemberitahuan</div>
        <button
          onClick={() => {
            audioManager.playSuccess();
            onMarkAllRead();
          }}
          title="Tandai sudah dibaca semua"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: isDarkMode ? '#818CF8' : '#6366F1', display: 'flex', alignItems: 'center' }}
        >
          <CheckCircle2 size={16} />
        </button>
      </div>

      <div style={{ fontSize: '10px', color: isDarkMode ? '#94A3B8' : '#64748B', fontWeight: 600 }}>
        Update materi & info sekolah terbaru:
      </div>

      {/* Notifications list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {notifications.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item)}
            style={{
              padding: '9px 11px',
              borderRadius: '16px',
              borderLeft: item.read
                ? (isDarkMode ? '3px solid #475569' : '3px solid #CBD5E1')
                : (isDarkMode ? '3px solid #818CF8' : '3px solid #5B5FEF'),
              background: item.read
                ? (isDarkMode ? 'rgba(255, 255, 255, 0.04)' : '#F8FAFC')
                : (isDarkMode ? 'rgba(255, 255, 255, 0.08)' : '#FFFFFF'),
              border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #E2E8F0',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              boxShadow: isDarkMode ? '0 4px 12px rgba(0,0,0,0.3)' : '0 1px 4px rgba(0,0,0,0.05)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                {getCategoryIcon(item.category)}
                <span style={{ fontSize: '11px', fontWeight: item.read ? 700 : 900, color: isDarkMode ? '#F8FAFC' : '#1E293B' }}>
                  {item.title}
                </span>
              </div>
              <span style={{ fontSize: '9px', color: isDarkMode ? '#64748B' : '#94A3B8', fontWeight: 600 }}>{item.time}</span>
            </div>
            <div style={{ fontSize: '10px', color: isDarkMode ? '#94A3B8' : '#64748B', paddingLeft: '18px' }}>
              {item.sender}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '3px' }}>
              <span
                style={{
                  fontSize: '9px',
                  fontWeight: 800,
                  color: isDarkMode ? '#C7D2FE' : '#4F46E5',
                  background: isDarkMode ? 'rgba(99, 102, 241, 0.25)' : '#EEF2FF',
                  padding: '2px 7px',
                  borderRadius: '6px',
                }}
              >
                Buka →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
