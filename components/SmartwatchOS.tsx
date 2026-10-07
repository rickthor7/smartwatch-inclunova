'use client';

import React from 'react';
import { ScreenType, NotificationItem } from '@/types/smartwatch';
import { HomeScreen } from './screens/HomeScreen';
import { NotificationsScreen } from './screens/NotificationsScreen';
import { LearnScreen } from './screens/LearnScreen';
import { QuizScreen } from './screens/QuizScreen';
import { STTScreen } from './screens/STTScreen';
import { AIRecommendScreen } from './screens/AIRecommendScreen';
import { ProgressScreen } from './screens/ProgressScreen';
import { TeacherVoiceScreen } from './screens/TeacherVoiceScreen';
import { OfflineSyncScreen } from './screens/OfflineSyncScreen';
import { BatteryScreen } from './screens/BatteryScreen';
import { HealthScreen } from './screens/HealthScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { audioManager } from '@/utils/audio';

interface SmartwatchOSProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  heartRate: number;
  mainBattery: number;
  backupBattery: number;
  isUsingBackup: boolean;
  onSimulateDrain: () => void;
  onSimulateCharge: () => void;
  isOnline: boolean;
  onToggleOnline: () => void;
  xp: number;
  onAddXP: (points: number) => void;
  onTriggerHaptic: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  isLargeFont: boolean;
  onToggleLargeFont: () => void;
  isHighContrast: boolean;
  onToggleHighContrast: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  hapticEnabled: boolean;
  onToggleHaptic: () => void;
}

export const SmartwatchOS: React.FC<SmartwatchOSProps> = ({
  currentScreen,
  onNavigate,
  notifications,
  onMarkAllRead,
  heartRate,
  mainBattery,
  backupBattery,
  isUsingBackup,
  onSimulateDrain,
  onSimulateCharge,
  isOnline,
  onToggleOnline,
  xp,
  onAddXP,
  onTriggerHaptic,
  isDarkMode,
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
  const handleBackToHome = () => {
    audioManager.playTap();
    onNavigate('home');
  };

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen
            onNavigate={onNavigate}
            notifications={notifications}
            heartRate={heartRate}
            mainBattery={mainBattery}
            backupBattery={backupBattery}
            isUsingBackup={isUsingBackup}
            isOnline={isOnline}
            xp={xp}
            isDarkMode={isDarkMode}
            onToggleDarkMode={onToggleDarkMode}
          />
        );

      case 'notifications':
        return (
          <NotificationsScreen
            onBack={handleBackToHome}
            onNavigate={onNavigate}
            notifications={notifications}
            onMarkAllRead={onMarkAllRead}
            isDarkMode={isDarkMode}
          />
        );

      case 'learn':
        return (
          <LearnScreen
            onBack={handleBackToHome}
            onNavigate={onNavigate}
            onTriggerHaptic={onTriggerHaptic}
            onAddXP={onAddXP}
            isDarkMode={isDarkMode}
          />
        );

      case 'quiz':
        return (
          <QuizScreen
            onBack={handleBackToHome}
            onNavigate={onNavigate}
            onTriggerHaptic={onTriggerHaptic}
            onAddXP={onAddXP}
            isDarkMode={isDarkMode}
          />
        );

      case 'stt':
        return (
          <STTScreen
            onBack={() => onNavigate('quiz')}
            onAnswerSubmitted={(ans) => {
              console.log('Voice answer submitted:', ans);
            }}
            onTriggerHaptic={onTriggerHaptic}
            isDarkMode={isDarkMode}
          />
        );

      case 'recommendation':
        return (
          <AIRecommendScreen
            onBack={handleBackToHome}
            onNavigate={onNavigate}
            onTriggerHaptic={onTriggerHaptic}
            isDarkMode={isDarkMode}
          />
        );

      case 'progress':
        return <ProgressScreen onBack={handleBackToHome} xp={xp} isDarkMode={isDarkMode} />;

      case 'teacher-voice':
        return (
          <TeacherVoiceScreen
            onBack={handleBackToHome}
            onTriggerHaptic={onTriggerHaptic}
            isDarkMode={isDarkMode}
          />
        );

      case 'offline-sync':
        return (
          <OfflineSyncScreen
            onBack={handleBackToHome}
            isOnline={isOnline}
            onToggleOnline={onToggleOnline}
            onTriggerHaptic={onTriggerHaptic}
            isDarkMode={isDarkMode}
          />
        );

      case 'battery':
        return (
          <BatteryScreen
            onBack={handleBackToHome}
            mainBattery={mainBattery}
            backupBattery={backupBattery}
            isUsingBackup={isUsingBackup}
            onSimulateDrain={onSimulateDrain}
            onSimulateCharge={onSimulateCharge}
            onTriggerHaptic={onTriggerHaptic}
            isDarkMode={isDarkMode}
          />
        );

      case 'health':
        return <HealthScreen onBack={handleBackToHome} heartRate={heartRate} isDarkMode={isDarkMode} />;

      case 'settings':
        return (
          <SettingsScreen
            onBack={handleBackToHome}
            isDarkMode={isDarkMode}
            onToggleDarkMode={onToggleDarkMode}
            isLargeFont={isLargeFont}
            onToggleLargeFont={onToggleLargeFont}
            isHighContrast={isHighContrast}
            onToggleHighContrast={onToggleHighContrast}
            soundEnabled={soundEnabled}
            onToggleSound={onToggleSound}
            hapticEnabled={hapticEnabled}
            onToggleHaptic={onToggleHaptic}
          />
        );

      default:
        return (
          <HomeScreen
            onNavigate={onNavigate}
            notifications={notifications}
            heartRate={heartRate}
            mainBattery={mainBattery}
            backupBattery={backupBattery}
            isUsingBackup={isUsingBackup}
            isOnline={isOnline}
            xp={xp}
            isDarkMode={isDarkMode}
            onToggleDarkMode={onToggleDarkMode}
          />
        );
    }
  };

  return (
    <div
      style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
      className={`
        ${isDarkMode ? 'smartwatch-dark' : ''}
        ${isLargeFont ? 'accessibility-large-text' : ''}
        ${isHighContrast ? 'accessibility-high-contrast' : ''}
      `}
    >
      {renderActiveScreen()}
    </div>
  );
};
