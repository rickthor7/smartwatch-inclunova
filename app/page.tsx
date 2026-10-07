'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { SmartwatchFrame, StrapColor } from '@/components/SmartwatchFrame';
import { SmartwatchOS } from '@/components/SmartwatchOS';
import { SimulatorDock } from '@/components/SimulatorDock';
import { ScreenType, NotificationItem } from '@/types/smartwatch';
import { INITIAL_NOTIFICATIONS } from '@/data/smartwatchData';
import { audioManager } from '@/utils/audio';
import {
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Smartphone,
  Watch,
  Sliders,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

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
  const [zoomMode, setZoomMode] = useState<'auto' | '1x' | '1.2x'>('auto');
  const [viewMode, setViewMode] = useState<'frame' | 'display'>('frame');
  const [showTestbench, setShowTestbench] = useState(false);

  // Window viewport measurement for responsive auto-fit
  const [viewport, setViewport] = useState({ width: 1200, height: 800 });
  const [mounted, setMounted] = useState(false);

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

  // Listen to browser resize for auto-fit calculation
  useEffect(() => {
    setMounted(true);
    const updateSize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

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

  // Calculate optimal responsive scale factor
  const effectiveScale = useMemo(() => {
    if (!mounted) return 1;
    if (zoomMode === '1x') return 1;
    if (zoomMode === '1.2x') return 1.2;

    // 'auto' mode calculation:
    // Frame natural bounds: ~390px width x 680px height
    // Display mode natural bounds: ~350px width x 440px height
    const targetW = viewMode === 'frame' ? 390 : 360;
    const targetH = viewMode === 'frame' ? 680 : 440;

    // Available screen space (subtracting floating top pill & safe padding)
    const availW = Math.max(viewport.width - 24, 280);
    const availH = Math.max(viewport.height - 84, 280);

    const scaleW = availW / targetW;
    const scaleH = availH / targetH;
    const fit = Math.min(scaleW, scaleH);

    // Limit between 0.45x (very small phone in landscape) and 1.15x (large desktop)
    return Math.min(1.15, Math.max(0.48, Math.round(fit * 100) / 100));
  }, [mounted, zoomMode, viewMode, viewport]);

  // Toggle browser Fullscreen
  const toggleFullscreen = () => {
    audioManager.playTap();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  // Cycle zoom scales (auto -> 1x -> 1.2x -> auto)
  const cycleZoom = () => {
    audioManager.playTap();
    setZoomMode((prev) => {
      if (prev === 'auto') return '1x';
      if (prev === '1x') return '1.2x';
      return 'auto';
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

  // Send mock school notification from testbench
  const handleSendMockNotification = () => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Tugas Sains Baru 🔬',
      sender: 'Ibu Guru Rini',
      category: 'kuis',
      time: 'Baru saja',
      read: false,
      actionScreen: 'quiz',
    };
    setNotifications((prev) => [newNotif, ...prev]);
    triggerHaptic();
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

  // Zoom button display label
  const zoomLabel = useMemo(() => {
    if (zoomMode === 'auto') return `Fit (${Math.round(effectiveScale * 100)}%)`;
    return zoomMode;
  }, [zoomMode, effectiveScale]);

  return (
    <main
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '64px 12px 28px',
        boxSizing: 'border-box',
        overflowX: 'hidden',
        overflowY: 'auto',
        background: isDarkMode ? '#05070D' : '#0B1120',
        transition: 'background 0.3s ease',
      }}
    >
      {/* Floating Responsive Control Pill (Centered at top) */}
      <header
        className="watch-control-pill"
        style={{
          position: 'fixed',
          top: '12px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(15, 23, 42, 0.88)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          borderRadius: '999px',
          padding: '5px 10px',
          zIndex: 9999,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)',
          maxWidth: 'min(calc(100vw - 20px), 640px)',
        }}
      >
        {/* Toggle Mode: Frame Jam vs Hanya Layar */}
        <button
          onClick={toggleViewMode}
          style={{
            background: 'none',
            border: 'none',
            color: '#CBD5E1',
            padding: '5px 9px',
            borderRadius: '999px',
            fontSize: '11px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            transition: 'all 0.15s ease',
          }}
          title={viewMode === 'frame' ? 'Beralih ke Tampilan Layar Saja' : 'Beralih ke Tampilan Frame Jam'}
        >
          {viewMode === 'frame' ? <Watch size={14} color="#FBBF24" /> : <Smartphone size={14} color="#38BDF8" />}
          <span className="pill-text-desktop">{viewMode === 'frame' ? 'Frame Jam' : 'Hanya Layar'}</span>
          <span className="pill-text-mobile">{viewMode === 'frame' ? 'Frame' : 'Layar'}</span>
        </button>

        <span style={{ width: '1px', height: '14px', background: 'rgba(255, 255, 255, 0.2)' }} />

        {/* Zoom Scale Button (Auto Fit / 1x / 1.2x) */}
        <button
          onClick={cycleZoom}
          style={{
            background: zoomMode === 'auto' ? 'rgba(52, 211, 153, 0.15)' : 'none',
            border: zoomMode === 'auto' ? '1px solid rgba(52, 211, 153, 0.4)' : 'none',
            color: zoomMode === 'auto' ? '#6EE7B7' : '#CBD5E1',
            padding: '5px 9px',
            borderRadius: '999px',
            fontSize: '11px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            transition: 'all 0.15s ease',
          }}
          title="Ubah Skala / Zoom: Fit Layar Otomatis, 1x, atau 1.2x"
        >
          {effectiveScale > 1 ? (
            <ZoomIn size={14} color="#34D399" />
          ) : (
            <ZoomOut size={14} color={zoomMode === 'auto' ? '#34D399' : '#94A3B8'} />
          )}
          <span>{zoomLabel}</span>
        </button>

        <span style={{ width: '1px', height: '14px', background: 'rgba(255, 255, 255, 0.2)' }} />

        {/* Toggle Testbench Drawer */}
        <button
          onClick={() => {
            audioManager.playTap();
            setShowTestbench((prev) => !prev);
          }}
          style={{
            background: showTestbench ? 'rgba(99, 102, 241, 0.3)' : 'none',
            border: showTestbench ? '1px solid rgba(99, 102, 241, 0.6)' : 'none',
            color: showTestbench ? '#A5B4FC' : '#CBD5E1',
            padding: '5px 9px',
            borderRadius: '999px',
            fontSize: '11px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            transition: 'all 0.15s ease',
          }}
          title="Buka / Tutup Panel Uji Simulator Hardware"
        >
          <Sliders size={14} color={showTestbench ? '#818CF8' : '#CBD5E1'} />
          <span className="pill-text-desktop">Panel Uji</span>
          {showTestbench ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>

        <span style={{ width: '1px', height: '14px', background: 'rgba(255, 255, 255, 0.2)' }} />

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          style={{
            background: isFullscreen ? 'rgba(99, 102, 241, 0.35)' : 'rgba(255, 255, 255, 0.08)',
            border: isFullscreen ? '1px solid rgba(99, 102, 241, 0.6)' : '1px solid rgba(255, 255, 255, 0.15)',
            color: isFullscreen ? '#A5B4FC' : '#F8FAFC',
            padding: '5px 9px',
            borderRadius: '999px',
            fontSize: '11px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            transition: 'all 0.2s ease',
          }}
          title={isFullscreen ? 'Keluar Layar Penuh' : 'Layar Penuh'}
        >
          {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          <span className="pill-text-desktop">{isFullscreen ? 'Keluar Full' : 'Full'}</span>
        </button>
      </header>

      {/* Main Responsive Smartwatch Visual Container */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          // Dynamic container height prevents artificial scrollbars when scaled down on mobile:
          height: effectiveScale < 1 ? `${(viewMode === 'frame' ? 680 : 440) * effectiveScale}px` : undefined,
          transition: 'height 0.25s ease',
          margin: 'auto 0',
        }}
      >
        <div
          style={{
            width: viewMode === 'frame' ? 390 : 360,
            height: viewMode === 'frame' ? 680 : 440,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${effectiveScale})`,
            transformOrigin: 'center center',
            transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
            flexShrink: 0,
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
            /* Mode 2: Pure Screen Display (Direct Large AMOLED Wearable Display) */
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
                flexShrink: 0,
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
      </div>

      {/* Collapsible Testbench Hardware Simulator Dock */}
      {showTestbench && (
        <div
          style={{
            width: '100%',
            maxWidth: '720px',
            marginTop: '20px',
            animation: 'fadeIn 0.25s ease',
          }}
        >
          <SimulatorDock
            strapColor={strapColor}
            onChangeStrapColor={(c) => {
              setStrapColor(c);
              triggerHaptic();
            }}
            isOnline={isOnline}
            onToggleOnline={() => {
              setIsOnline((prev) => !prev);
              triggerHaptic();
            }}
            mainBattery={mainBattery}
            backupBattery={backupBattery}
            isUsingBackup={isUsingBackup}
            onSimulateDrain={handleSimulateDrain}
            onSimulateCharge={handleSimulateCharge}
            heartRate={heartRate}
            onChangeHeartRate={(bpm) => setHeartRate(bpm)}
            onSendMockNotification={handleSendMockNotification}
            isScreenOn={isScreenOn}
            onToggleScreen={handleSideButtonClick}
            onCrownClick={handleCrownClick}
          />
        </div>
      )}
    </main>
  );
}
