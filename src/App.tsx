/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { Navbar } from "./components/Navbar";
import { LearnView } from "./components/LearnView";
import { AlgorithmView } from "./components/AlgorithmView";
import { LeaderboardView } from "./components/LeaderboardView";
import { StudyGroupsView } from "./components/StudyGroupsView";
import { NotesView } from "./components/NotesView";
import { OfflineHandbookView } from "./components/OfflineHandbookView";
import { ProfileView } from "./components/ProfileView";
import { AdminDashboard } from "./components/AdminDashboard";
import { AuthModal } from "./components/AuthModal";
import { AiTutorDrawer } from "./components/AiTutorDrawer";
import { AuthGateView } from "./components/AuthGateView";
import { SupabaseSyncModal } from "./components/SupabaseSyncModal";

function AppContent() {
  const { currentUser, activeTab } = useApp();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);
  const [aiContext, setAiContext] = useState<any>(undefined);

  // If student/user is not logged in, enforce the authentication gate
  if (!currentUser) {
    return <AuthGateView />;
  }

  const handleOpenAiWithContext = (context: any) => {
    setAiContext(context);
    setIsAiOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* Navigation Bar */}
      <Navbar
        onOpenAuth={() => setIsAuthOpen(true)}
        onToggleAi={() => setIsAiOpen(!isAiOpen)}
        onOpenSupabaseSync={() => setIsSupabaseModalOpen(true)}
        isAiOpen={isAiOpen}
      />

      {/* Main Active Tab Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {activeTab === "learn" && (
          <LearnView onOpenAiWithContext={handleOpenAiWithContext} />
        )}
        {activeTab === "algorithms" && (
          <AlgorithmView onOpenAiWithContext={handleOpenAiWithContext} />
        )}
        {activeTab === "leaderboard" && <LeaderboardView />}
        {activeTab === "groups" && <StudyGroupsView />}
        {activeTab === "notes" && <NotesView />}
        {activeTab === "handbook" && <OfflineHandbookView />}
        {activeTab === "profile" && (
          <ProfileView onOpenSupabaseSync={() => setIsSupabaseModalOpen(true)} />
        )}
        {activeTab === "admin" && (
          <AdminDashboard onOpenSupabaseSync={() => setIsSupabaseModalOpen(true)} />
        )}
      </main>

      {/* 24/7 AI Tutor Drawer */}
      <AiTutorDrawer
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        attachedContext={aiContext}
      />

      {/* Auth & Registration Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      {/* Supabase Database Migration & Sync Modal */}
      <SupabaseSyncModal
        isOpen={isSupabaseModalOpen}
        onClose={() => setIsSupabaseModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

