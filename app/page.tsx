'use client';

import React, { useState, useEffect } from 'react';
import { SmartwatchFrame, StrapColor } from '@/components/SmartwatchFrame';
import { SmartwatchOS } from '@/components/SmartwatchOS';
import { ScreenType, NotificationItem } from '@/types/smartwatch';
import { INITIAL_NOTIFICATIONS } from '@/data/smartwatchData';
import { audioManager } from '@/utils/audio';
import { Maximize2, Minimize2, ZoomIn, ZoomOut, Smartphone, Watch } from 'lucide-react';

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

  // Full Screen & Zoom scale states
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [viewMode, setViewMode] = useState<'frame' | 'display'>('frame');

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

  // Listen to browser fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Toggle browser Fullscreen
  const toggleFullscreen = () => {
    audioManager.playTap();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
      // Auto-boost zoom scale when entering fullscreen for maximum impact
      setZoomScale(1.25);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
      setZoomScale(1);
    }
  };

  // Cycle zoom scales (1x -> 1.2x -> 1.35x -> 1x)
  const cycleZoom = () => {
    audioManager.playTap();
    setZoomScale((prev) => {
      if (prev === 1) return 1.2;
      if (prev === 1.2) return 1.35;
      return 1;
    });
  };

  // Toggle View Mode (Full Watch Frame vs Pure Display Screen)
  const toggleViewMode = () => {
    audioManager.playTap();
    setViewMode((prev) => (prev === 'frame' ? 'display' : 'frame'));
  };

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
        background: isDarkMode ? '#05070D' : '#0B1120',
      }}
    >
      {/* Floating Fullscreen & View Mode Control Pill (Discreet & Elegant) */}
      <div
        style={{
          position: 'fixed',
          top: '16px',
          right: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '999px',
          padding: '4px 8px',
          zIndex: 9999,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
        }}
      >
        {/* Toggle Mode: Frame Jam vs Hanya Layar */}
        <button
          onClick={toggleViewMode}
          style={{
            background: 'none',
            border: 'none',
            color: '#CBD5E1',
            padding: '4px 8px',
            borderRadius: '999px',
            fontSize: '11px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            transition: 'all 0.15s',
          }}
          title={viewMode === 'frame' ? 'Beralih ke Tampilan Layar Saja (Screen Only)' : 'Beralih ke Tampilan Frame Jam Lengkap'}
        >
          {viewMode === 'frame' ? <Watch size={13} color="#FBBF24" /> : <Smartphone size={13} color="#38BDF8" />}
          <span>{viewMode === 'frame' ? 'Frame Jam' : 'Hanya Layar'}</span>
        </button>

        <span style={{ width: '1px', height: '14px', background: 'rgba(255, 255, 255, 0.2)' }} />

        {/* Zoom Scale Button */}
        <button
          onClick={cycleZoom}
          style={{
            background: 'none',
            border: 'none',
            color: '#CBD5E1',
            padding: '4px 8px',
            borderRadius: '999px',
            fontSize: '11px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            transition: 'all 0.15s',
          }}
          title="Ubah Skala Ukuran Smartwatch (1x / 1.2x / 1.35x)"
        >
          {zoomScale > 1 ? <ZoomIn size={13} color="#34D399" /> : <ZoomOut size={13} color="#94A3B8" />}
          <span>{zoomScale}x</span>
        </button>

        <span style={{ width: '1px', height: '14px', background: 'rgba(255, 255, 255, 0.2)' }} />

        {/* Native Browser Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          style={{
            background: isFullscreen ? 'rgba(99, 102, 241, 0.35)' : 'rgba(255, 255, 255, 0.08)',
            border: isFullscreen ? '1px solid rgba(99, 102, 241, 0.6)' : '1px solid rgba(255, 255, 255, 0.15)',
            color: isFullscreen ? '#A5B4FC' : '#F8FAFC',
            padding: '4px 10px',
            borderRadius: '999px',
            fontSize: '11px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            boxShadow: isFullscreen ? '0 0 12px rgba(99, 102, 241, 0.4)' : 'none',
            transition: 'all 0.2s ease',
          }}
          title={isFullscreen ? 'Keluar dari Layar Penuh' : 'Jadikan Layar Penuh (Fullscreen)'}
        >
          {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          <span>{isFullscreen ? 'Keluar Full' : 'Layar Penuh'}</span>
        </button>
      </div>

      {/* Main Smartwatch Container with dynamic zoom scale and view mode */}
      <div
        style={{
          transform: `scale(${zoomScale})`,
          transformOrigin: 'center center',
          transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {viewMode === 'frame' ? (
          /* Mode 1: Complete Realistic Smartwatch with Straps & Bezel */
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
        ) : (
          /* Mode 2: Pure Screen Display (Direct Large Wearable Display) */
          <div
            style={{
              width: '350px',
              height: '420px',
              borderRadius: '48px',
              background: '#000000',
              padding: '12px',
              border: '3px solid #334155',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.15) inset',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div className="glass-reflection" style={{ borderRadius: '44px' }} />
            <div className="smartwatch-screen" style={{ width: '100%', height: '100%' }}>
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
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
