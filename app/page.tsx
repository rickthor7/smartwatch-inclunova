'use client';

import React, { useState } from 'react';
import { SmartwatchFrame, StrapColor } from '@/components/SmartwatchFrame';
import { SmartwatchOS } from '@/components/SmartwatchOS';
import { ScreenType, NotificationItem } from '@/types/smartwatch';
import { INITIAL_NOTIFICATIONS } from '@/data/smartwatchData';
import { audioManager } from '@/utils/audio';

export default function SmartwatchPrototypePage() {
  // Screen routing
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Hardware states (Orange strap default matching user screenshot)
  const [strapColor, setStrapColor] = useState<StrapColor>('orange');
  const [isVibrating, setIsVibrating] = useState(false);
  const [isScreenOn, setIsScreenOn] = useState(true);
  const [isOnline, setIsOnline] = useState(true);

  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Battery System states (Solar Main + Fruit peel Bio-battery backup)
  const [mainBattery, setMainBattery] = useState(95);
  const [backupBattery, setBackupBattery] = useState(95);
  const [isUsingBackup, setIsUsingBackup] = useState(false);

  // Health and gamification states
  const [heartRate, setHeartRate] = useState(78);
  const [xp, setXp] = useState(140);

  // Accessibility states
  const [isLargeFont, setIsLargeFont] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hapticEnabled, setHapticEnabled] = useState(true);

  // Trigger tactile vibration simulation
  const triggerHaptic = () => {
    if (!hapticEnabled) return;
    setIsVibrating(true);
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate([60, 40, 60]);
    }
    setTimeout(() => {
      setIsVibrating(false);
    }, 280);
  };

  // Toggle Dark Mode
  const handleToggleDarkMode = () => {
    triggerHaptic();
    setIsDarkMode((prev) => !prev);
  };

  // Simulate Battery Drain to test automatic failover to Bio-Battery
  const handleSimulateDrain = () => {
    setMainBattery(14);
    setIsUsingBackup(true);
    triggerHaptic();
    audioManager.playTryAgain();
  };

  // Simulate Solar Re-charge
  const handleSimulateCharge = () => {
    setMainBattery(95);
    setIsUsingBackup(false);
    triggerHaptic();
    audioManager.playSuccess();
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Physical crown click -> Always return Home
  const handleCrownClick = () => {
    triggerHaptic();
    setCurrentScreen('home');
    if (!isScreenOn) setIsScreenOn(true);
  };

  // Physical side power button -> Toggle Sleep / Wake
  const handleSideButtonClick = () => {
    triggerHaptic();
    setIsScreenOn((prev) => !prev);
  };

  return (
    <main
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Smartwatch Frame Hero */}
      <SmartwatchFrame
        strapColor={strapColor}
        isVibrating={isVibrating}
        isScreenOn={isScreenOn}
        onCrownClick={handleCrownClick}
        onSideButtonClick={handleSideButtonClick}
      >
        <SmartwatchOS
          currentScreen={currentScreen}
          onNavigate={(s) => setCurrentScreen(s)}
          notifications={notifications}
          onMarkAllRead={handleMarkAllRead}
          heartRate={heartRate}
          mainBattery={mainBattery}
          backupBattery={backupBattery}
          isUsingBackup={isUsingBackup}
          onSimulateDrain={handleSimulateDrain}
          onSimulateCharge={handleSimulateCharge}
          isOnline={isOnline}
          onToggleOnline={() => setIsOnline((prev) => !prev)}
          xp={xp}
          onAddXP={(p) => setXp((prev) => prev + p)}
          onTriggerHaptic={triggerHaptic}
          isDarkMode={isDarkMode}
          onToggleDarkMode={handleToggleDarkMode}
          isLargeFont={isLargeFont}
          onToggleLargeFont={() => setIsLargeFont((prev) => !prev)}
          isHighContrast={isHighContrast}
          onToggleHighContrast={() => setIsHighContrast((prev) => !prev)}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled((prev) => !prev)}
          hapticEnabled={hapticEnabled}
          onToggleHaptic={() => setHapticEnabled((prev) => !prev)}
        />
      </SmartwatchFrame>
    </main>
  );
}
