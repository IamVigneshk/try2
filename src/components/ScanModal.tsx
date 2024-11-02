import React, { useState } from 'react';
import { X, Globe, Server, AlertCircle } from 'lucide-react';
import AuthModal from './AuthModal';

interface ScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanStart: (targetInfo: { type: 'domain' | 'ip'; value: string }, isAdmin: boolean) => void;
}

export default function ScanModal({ isOpen, onClose, onScanStart }: ScanModalProps) {
  const [scanType, setScanType] = useState<'domain' | 'ip'>('domain');
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [showAuth, setShowAuth] = useState(false);

  const validateInput = () => {
    setError('');
    
    if (!input) {
      setError('Please enter a value');
      return false;
    }

    if (scanType === 'domain') {
      const domainRegex = /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
      if (!domainRegex.test(input)) {
        setError('Please enter a valid domain (e.g., example.com)');
        return false;
      }
    } else {
      const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
      if (!ipRegex.test(input)) {
        setError('Please enter a valid IP address (e.g., 192.168.1.1)');
        return false;
      }
      
      const parts = input.split('.');
      const valid = parts.every(part => {
        const num = parseInt(part, 10);
        return num >= 0 && num <= 255;
      });
      
      if (!valid) {
        setError('IP address numbers must be between 0 and 255');
        return false;
      }
    }

    return true;
  };

  const handleScan = () => {
    if (validateInput()) {
      setShowAuth(true);
    }
  };

  const handleAuthSuccess = (isAdmin: boolean) => {
    onScanStart({ type: scanType, value: input }, isAdmin);
    setShowAuth(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
          <div className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75" onClick={onClose} />
          
          <div className="relative inline-block w-full max-w-lg p-6 overflow-hidden text-left align-middle transition-all transform bg-gray-800 rounded-lg shadow-xl">
            <div className="absolute top-0 right-0 pt-4 pr-4">
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mt-2">
              <h3 className="text-2xl font-bold text-white mb-6">
                Start Security Scan
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Select Target Type
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setScanType('domain')}
                      className={`flex items-center justify-center gap-2 p-3 rounded-lg border ${
                        scanType === 'domain'
                          ? 'border-cyan-500 bg-cyan-500/10 text-white'
                          : 'border-gray-600 text-gray-400 hover:border-gray-500'
                      }`}
                    >
                      <Globe className="w-5 h-5" />
                      Domain
                    </button>
                    <button
                      onClick={() => setScanType('ip')}
                      className={`flex items-center justify-center gap-2 p-3 rounded-lg border ${
                        scanType === 'ip'
                          ? 'border-cyan-500 bg-cyan-500/10 text-white'
                          : 'border-gray-600 text-gray-400 hover:border-gray-500'
                      }`}
                    >
                      <Server className="w-5 h-5" />
                      IP Address
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="target" className="block text-sm font-medium text-gray-300 mb-2">
                    Enter {scanType === 'domain' ? 'Domain' : 'IP Address'}
                  </label>
                  <input
                    type="text"
                    id="target"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={scanType === 'domain' ? 'example.com' : '192.168.1.1'}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                  />
                  {error && (
                    <div className="mt-2 flex items-center gap-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleScan}
                className="w-full inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-cyan-500 border border-transparent rounded-md hover:bg-cyan-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-500"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        targetInfo={{ type: scanType, value: input }}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
}