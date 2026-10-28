import React from 'react';
import { AppHeader } from './AppHeader';
import { MobileBottomNav } from './MobileBottomNav';
import { Footer } from './Footer';

/**
 * Bimbel Core Page Shell Component
 * Features rounded-top gray content area overlapping the blue header with drop shadow
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.currentPath='/dashboard']
 * @param {Function} [props.onNavigate]
 * @param {boolean} [props.hideHeader=false]
 * @param {boolean} [props.hideBottomNav=false]
 * @param {boolean} [props.showFooter=false]
 * @param {string} [props.bgClass='bg-bglight']
 * @param {string} [props.className='']
 * @param {Object} [props.user]
 */
export const PageShell = ({
  children,
  currentPath = '/dashboard',
  onNavigate,
  hideHeader = false,
  hideBottomNav = false,
  showFooter = false,
  bgClass = 'bg-bglight',
  className = '',
  user,
}) => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-primary antialiased selection:bg-accent selection:text-black">
      {/* Blue Top App Bar */}
      {!hideHeader && (
        <AppHeader
          currentPath={currentPath}
          onNavigate={onNavigate}
          user={user}
        />
      )}

      {/* Main Content with Rounded-Top Overlap */}
      <main
        className={`
          flex-1 ${bgClass}
          ${!hideHeader ? 'rounded-t-neo-top -mt-4 pt-8 md:pt-10 pb-24 md:pb-12 relative z-10 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]' : 'py-6'}
          ${className}
        `}
      >
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 w-full h-full">
          {children}
        </div>
      </main>

      {/* Global Footer (optional on content pages) */}
      {showFooter && <Footer onNavigate={onNavigate} />}

      {/* Mobile Sticky Bottom Navigation */}
      {!hideBottomNav && (
        <MobileBottomNav currentPath={currentPath} onNavigate={onNavigate} />
      )}
    </div>
  );
};

export default PageShell;
