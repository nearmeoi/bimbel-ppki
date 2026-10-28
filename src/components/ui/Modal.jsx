import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

/**
 * Neo-brutalist Accessible Modal Component
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {Function} props.onClose
 * @param {string} [props.title]
 * @param {string} [props.description]
 * @param {React.ReactNode} props.children
 * @param {React.ReactNode} [props.footer]
 * @param {'sm' | 'md' | 'lg' | 'xl'} [props.size='md']
 */
export const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
}) => {
  const modalRef = useRef(null);
  const previouslyFocusedElement = useRef(null);

  // Close on Escape & trap focus
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedElement.current = document.activeElement;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    // Focus initial element
    setTimeout(() => {
      if (modalRef.current) {
        const firstFocusable = modalRef.current.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (firstFocusable) {
          firstFocusable.focus();
        } else {
          modalRef.current.focus();
        }
      }
    }, 50);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      if (previouslyFocusedElement.current) {
        previouslyFocusedElement.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className={`
          relative w-full bg-white border-2 border-black rounded-neo-lg shadow-neo-lg p-6 md:p-8
          transition-transform duration-200 transform scale-100 flex flex-col gap-5
          ${sizeClasses[size] || sizeClasses.md}
        `}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            {title && (
              <h2 className="text-xl md:text-2xl font-extrabold text-ink leading-snug">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-sm font-medium text-gray-600 mt-1">
                {description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup modal"
            className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center bg-white hover:bg-gray-100 transition-colors flex-shrink-0 active:scale-95 focus-visible:ring-3 focus-visible:ring-accent"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[70vh] overflow-y-auto pr-1">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-3 border-t-2 border-gray-100">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
