/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ModManager from './components/ModManager';
import AIAssistant from './components/AIAssistant';
import NPCSimulator from './components/NPCSimulator';
import AlchemyLab from './components/AlchemyLab';
import QuestGen from './components/QuestGen';
import CombatAnalysis from './components/CombatAnalysis';
import SUADashboard from './components/SUADashboard';

export default function App() {
  const [activeModule, setActiveModule] = useState('sua-dashboard');

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard />;
      case 'sua-dashboard':
        return <SUADashboard />;
      case 'mod-manager':
        return <ModManager />;
      case 'assistant':
        return <AIAssistant />;
      case 'npc-sim':
        return <NPCSimulator />;
      case 'alchemy':
        return <AlchemyLab />;
      case 'quests':
        return <QuestGen />;
      case 'combat':
        return <CombatAnalysis />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeModule={activeModule} setActiveModule={setActiveModule}>
      {renderModule()}
    </Layout>
  );
}

