import React from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Loader2 } from 'lucide-react';

interface Props {
  currentStep: number;
  totalSteps: number;
  canProceed: boolean;
  isLoading: boolean;
  onNext: () => void;
  onBack: () => void;
  onReset: () => void;
}

const Navigation: React.FC<Props> = ({ 
  currentStep, 
  totalSteps, 
  canProceed, 
  isLoading, 
  onNext, 
  onBack, 
  onReset 
}) => {
  // Don't show navigation on result screen (step 11), it has its own CTA
  // Note: Total steps is 11 now.
  if (currentStep === totalSteps) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 p-4 pb-6 z-40">
      <div className="max-w-md mx-auto flex items-center justify-between">
        
        {/* Back Button */}
        <button 
          onClick={onBack}
          disabled={currentStep === 1 || isLoading}
          className={`p-3 rounded-full transition-colors ${
            currentStep === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
          }`}
          aria-label="Voltar"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Next/Continue Button */}
        {/* Step 7 (Problemas) and Step 8 (Metas) are multi-select and need explicit Continue */}
        {currentStep === 7 || currentStep === 8 ? (
           <button
            onClick={onNext}
            disabled={!canProceed || isLoading}
            className={`flex-1 mx-4 py-3 px-6 rounded-xl font-bold text-white shadow-lg transition-all ${
              !canProceed || isLoading 
                ? 'bg-gray-300 shadow-none cursor-not-allowed' 
                : 'bg-teal hover:bg-[#259d8d] active:scale-95'
            }`}
          >
            {isLoading ? <Loader2 className="animate-spin mx-auto" /> : 'Continuar'}
          </button>
        ) : (
          // Standard arrow for single select (radio) steps
           <button 
            onClick={onNext}
            disabled={!canProceed || isLoading}
            className={`p-3 rounded-full transition-all ${
              !canProceed 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-teal bg-teal-light hover:bg-teal hover:text-white'
            }`}
            aria-label="Próximo"
          >
            {isLoading ? <Loader2 className="animate-spin" size={28} /> : <ChevronRight size={28} />}
          </button>
        )}

        {/* Reset Button (Right side) */}
        <button 
          onClick={onReset}
          className="p-3 rounded-full text-gray-400 hover:text-red-400 hover:bg-gray-50 transition-colors"
          aria-label="Reiniciar"
        >
          <RotateCcw size={20} />
        </button>
      </div>
    </div>
  );
};

export default Navigation;