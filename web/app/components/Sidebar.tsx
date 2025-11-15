'use client';

import React, { useState } from 'react';
import {
  LayoutDashboard,
  Bell,
  Cpu,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { Button } from '../components/ui/button';

export type SectionKey = 'dashboard' | 'alarms' | 'devices' | 'users' | 'settings';

export type SidebarProps = {
  active: SectionKey;
  onChange: (key: SectionKey) => void;
};

export function Sidebar({ active, onChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems: { key: SectionKey; label: string; icon: React.ReactNode }[] = [
    { key: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { key: 'alarms', label: 'Alarmes', icon: <Bell className="w-5 h-5" /> },
    { key: 'devices', label: 'Dispositivos', icon: <Cpu className="w-5 h-5" /> },
    { key: 'users', label: 'Usuários', icon: <Users className="w-5 h-5" /> },
    { key: 'settings', label: 'Configurações', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <aside
      className={`
        h-screen flex flex-col justify-between
        bg-black text-white border-r border-white/10
        transition-all duration-300 ease-in-out
        ${collapsed ? 'w-16' : 'w-56'}
      `}
    >
      {/* Topo com botão de recolher */}
      <div>
        <div className="flex items-center justify-between px-3 py-4">
          {!collapsed && <span className="text-lg font-bold">IoT Platform</span>}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto"
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </Button>
        </div>

        {/* Itens do menu */}
        <nav className={`flex flex-col ${collapsed ? 'items-center' : 'px-2'} gap-2`}>
          {menuItems.map(({ key, label, icon }) => (
            <Button
              key={key}
              variant={active === key ? 'default' : 'ghost'}
              className={`
                w-full ${collapsed ? 'justify-center px-0' : 'justify-start px-3'}
                ${active !== key ? 'text-muted-foreground' : ''}
                transition-all
              `}
              onClick={() => onChange(key)}
            >
              {icon}
              {!collapsed && <span className="ml-2">{label}</span>}
            </Button>
          ))}
        </nav>
      </div>

      {/* Botão do tema no rodapé */}
      <div className="pb-4">
        <div className={`w-full ${collapsed ? 'flex justify-center' : 'px-3'}`}>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
