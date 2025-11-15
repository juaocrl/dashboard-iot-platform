'use client';

import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import DashboardHome from '../components/DashboardHome';
import AlarmManager from '../components/AlarmManager';
import DeviceManager from '../components/DeviceManager';
import UserManager from '../components/UserManager';
import SettingsPanel from '../components/SettingsPanel';

export default function PlatformPage() {
  const [activeSection, setActiveSection] = useState<SectionKey>('dashboard');
type SectionKey = 'dashboard' | 'alarms' | 'devices' | 'users' | 'settings';


  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardHome />;
      case 'alarms':
        return <AlarmManager />;
      case 'devices':
        return <DeviceManager />;
      case 'users':
        return <UserManager />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-background text-foreground">
      <Sidebar active={activeSection} onChange={setActiveSection} />
      <main className="flex-1 p-6 overflow-y-auto">{renderContent()}</main>
    </div>
  );
}