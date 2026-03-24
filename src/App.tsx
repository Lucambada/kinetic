/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Traceability from './components/Traceability';
import Operations from './components/Operations';
import AuditLogs from './components/AuditLogs';
import Team from './components/Team';
import Login from './components/Login';
import Register from './components/Register';
import { AuthService } from './services/supabaseService';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await AuthService.getCurrentUser();
      setIsAuthenticated(!!user);
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await AuthService.signOut();
      setIsAuthenticated(false);
    } catch (err) {
      console.error('Logout failed:', err);
      // Fallback for legacy session
      setIsAuthenticated(false);
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-container border-t-transparent"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <Route element={<Layout onLogout={handleLogout} />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/traceability" element={<Traceability />} />
            <Route path="/operations" element={<Operations />} />
            <Route path="/audit" element={<AuditLogs />} />
            <Route path="/team" element={<Team />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
}

