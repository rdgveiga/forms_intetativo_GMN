import React, { useState, useEffect } from 'react';
import { SURVEY_STEPS, TOTAL_STEPS } from './constants';
import { AnswerState } from './types';
import ProgressBar from './components/ProgressBar';
import Navigation from './components/Navigation';
import OptionCard from './components/OptionCard';
import CheckoutModal from './components/CheckoutModal';
import { sendLeadData } from './services/webhook';
import { Loader2, Search, Menu, RotateCw } from 'lucide-react';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [answers, setAnswers] = useState<AnswerState>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [imgError, setImgError] = useState<boolean>(false);
  const [compImgError, setCompImgError] = useState<boolean>(false);
  
  // Progress calculation
  const progress = Math.min(95, Math.max(4, (currentStep / TOTAL_STEPS) * 100));

  const currentQuestion = SURVEY_STEPS.find(s => s.id === currentStep);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  // Handle Option Selection
  const handleSelect = (optionId: string) => {
    if (!currentQuestion) return;

    if (currentQuestion.type === 'multiple') {
      const current = (answers[currentStep] as string[]) || [];
      const isSelected = current.includes(optionId);
      let newSelection;
      
      if (isSelected) {
        newSelection = current.filter(id => id !== optionId);
      } else {
        newSelection = [...current, optionId];
      }
      setAnswers({ ...answers, [currentStep]: newSelection });
    } else {
      // Single selection (Radio)
      setAnswers({ ...answers, [currentStep]: optionId });
      
      // Auto-advance for radio buttons after a short delay for better UX
      setTimeout(() => {
         if(currentStep < TOTAL_STEPS) {
             setCurrentStep(prev => prev + 1);
         }
      }, 350);
    }
  };

  const handleNext = async () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
    } 
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleReset = () => {
    if(window.confirm('Deseja reiniciar o questionário?')) {
        setAnswers({});
        setCurrentStep(1);
    }
  };

  const handleOpenCheckout = async () => {
      // Trigger data submission when they click the main CTA
      setIsLoading(true);
      await sendLeadData({
          answers,
          timestamp: new Date().toISOString(),
          source: 'web_app',
      });
      setIsLoading(false);
      setIsModalOpen(true);
  };

  // Validation
  const hasAnswer = (stepId: number) => {
      // Info step requires no answer, just clicking continue
      const q = SURVEY_STEPS.find(s => s.id === stepId);
      if (q?.type === 'info') return true;

      const answer = answers[stepId];
      if (Array.isArray(answer)) return answer.length > 0;
      return !!answer;
  };

  if (!currentQuestion) return <div>Erro ao carregar passo.</div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-dark pb-24">
      {/* Progress Bar */}
      <ProgressBar progress={progress} />

      {/* Main Container */}
      <main className="max-w-md mx-auto min-h-screen bg-white shadow-xl overflow-hidden relative">
        
        {/* Step 1 Header (Logo) */}
        {currentStep === 1 && (
           <div className="pt-12 pb-6 text-center px-6 flex justify-center bg-white">
              <div className="flex flex-col items-center w-full">
                {!imgError ? (
                  <img 
                    src="logo.png" 
                    alt="Skipp Digital" 
                    className="h-32 sm:h-40 object-contain mb-4 mx-auto"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center animate-in fade-in duration-300 py-4">
                      {/* Fallback CSS Logo: Skipp Digital (Blue/Purple Gradient) */}
                      <h1 className="text-6xl font-black tracking-tighter leading-none select-none">
                          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00C2FF] to-[#8C52FF]">Skipp</span>
                          <span className="text-slate-900 ml-1">Digital</span>
                      </h1>
                  </div>
                )}
              </div>
           </div>
        )}

        {/* Content Padding */}
        <div className={`px-6 ${currentStep === 1 ? 'pt-2' : 'pt-16'} pb-8`}>
            
          {/* Result Screen (Step 11) */}
          {currentQuestion.type === 'result' ? (
             <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="text-center mb-6">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Empresa no Topo do Google</span>
                    <h1 className="text-3xl font-bold text-teal mt-2 mb-4">{currentQuestion.title}</h1>
                    <p className="text-gray-600 leading-relaxed mb-8">{currentQuestion.description}</p>
                </div>

                {/* Comparative Image Area */}
                <div className="bg-gray-100 rounded-2xl p-4 mb-8 border border-gray-200">
                    {!compImgError ? (
                        <img 
                            src="comparativo.png" 
                            alt="Comparativo Antes e Depois" 
                            className="w-full rounded-xl shadow-sm object-cover"
                            onError={() => setCompImgError(true)}
                        />
                    ) : (
                        /* Fallback content (CSS/Emoji Reconstruction) */
                        <div className="relative aspect-[16/9] bg-white rounded-xl overflow-hidden shadow-sm flex items-center justify-center">
                            <div className="absolute inset-0 flex">
                                {/* Left Side: Before */}
                                <div className="w-1/2 bg-white flex flex-col items-center justify-center p-2 border-r border-gray-100">
                                    <div className="flex gap-1 mb-2">
                                        <span className="text-3xl">😐</span>
                                        <span className="text-3xl">🌫️</span>
                                    </div>
                                    <span className="text-xs font-bold text-gray-400">ANTES</span>
                                    <span className="text-[10px] text-gray-500 text-center">Escondido nas buscas</span>
                                </div>
                                {/* Right Side: After */}
                                <div className="w-1/2 bg-[#E9F8F5] flex flex-col items-center justify-center p-2">
                                    <span className="text-4xl mb-2">🚀</span>
                                    <span className="text-xs font-bold text-teal">DEPOIS</span>
                                    <span className="text-[10px] text-teal-700 text-center">No topo das buscas</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Offer Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-teal/20 mb-8 transform hover:scale-[1.02] transition-transform">
                    <div className="bg-teal py-2 px-4 text-center">
                        <span className="text-white text-sm font-bold">Oferta especial por tempo limitado:</span>
                    </div>
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                             <div className="text-left">
                                 <h3 className="font-bold text-xl text-gray-800">Acesso Vitalício</h3>
                                 <p className="text-xs text-gray-500">Guia Completo + Checklist</p>
                             </div>
                             <div className="text-right">
                                 <span className="block text-xs text-gray-400 line-through">De 197,00</span>
                                 <span className="block text-2xl font-black text-teal">Por R$ 39,90</span>
                             </div>
                        </div>
                        
                        <button 
                            onClick={handleOpenCheckout}
                            disabled={isLoading}
                            className="w-full bg-teal hover:bg-[#259d8d] text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-teal/30 transition-all active:scale-95 flex items-center justify-center"
                        >
                            {isLoading ? <Loader2 className="animate-spin" /> : 'Comprar / Acessar Guia'}
                        </button>
                    </div>
                </div>
             </div>
          ) : currentQuestion.type === 'info' ? (
            /* INFO Screen (Step 5) */
            <div className="animate-in fade-in slide-in-from-right-8 duration-300 pt-2">
                <p className="text-center text-gray-600 font-medium mb-4 leading-relaxed">
                   {currentQuestion.description}
                </p>

                <h1 className="text-3xl font-black text-center text-dark mb-4 leading-none tracking-tight">
                    {currentQuestion.title}
                </h1>

                <p className="text-center text-gray-500 text-sm italic mb-8">
                    {currentQuestion.subtitle}
                </p>

                <button
                    onClick={handleNext}
                    className="w-full bg-teal text-white font-bold py-4 rounded-xl shadow-lg mb-10 hover:bg-[#259d8d] active:scale-95 transition-all"
                >
                    Continuar
                </button>

                {/* Browser Mockup */}
                <div className="bg-white rounded-t-xl shadow-lg border border-gray-200 overflow-hidden">
                    {/* Browser Address Bar */}
                    <div className="bg-gray-100 p-3 border-b border-gray-200 flex items-center justify-between gap-2">
                        <div className="flex gap-1 text-gray-400">
                             <span className="text-xs">OK</span>
                        </div>
                        <div className="flex-1 bg-white rounded-full px-3 py-1.5 text-xs text-gray-600 flex items-center justify-center gap-1 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            business.google.com
                        </div>
                        <div className="flex gap-3 text-gray-400">
                            <Menu size={16} />
                            <RotateCw size={16} />
                        </div>
                    </div>
                    {/* Browser Content */}
                    <div className="p-6 pb-12">
                        <div className="font-bold text-sm text-gray-800 mb-4 flex items-center gap-2">
                            Think with Google <span className="text-gray-400 text-xs font-normal">▼</span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            No Brasil, o uso do digital tem crescido significativamente. <span className="font-bold text-teal underline decoration-teal/30">91% das buscas</span> relacionadas a serviços e produtos <span className="font-bold text-teal underline decoration-teal/30">acontecem antes mesmo de as pessoas irem à empresa</span>. Isso significa que o futuro do setor tende a ser mais online. A pergunta que fica é: a sua empresa está pronta para navegar neste contexto?
                        </p>
                    </div>
                </div>

            </div>
          ) : (
            /* Question Screens */
            <div className="animate-in fade-in slide-in-from-right-8 duration-300">
                {/* Titles */}
                <h1 className="text-2xl font-bold text-center text-dark mb-4 leading-tight">
                    {currentQuestion.title}
                </h1>
                
                {currentQuestion.description && (
                     <p className="text-center text-gray-600 mb-6">{currentQuestion.description}</p>
                )}

                {currentQuestion.subtitle && (
                    <p className="text-center text-gray-600 font-medium mb-8 whitespace-pre-line">
                        {currentQuestion.subtitle}
                    </p>
                )}

                {/* Options Container */}
                <div className={`mt-8 ${currentQuestion.layout === 'cards-side' ? 'flex gap-4' : currentQuestion.layout === 'grid' ? 'grid grid-cols-2 gap-4' : 'flex flex-col gap-3'}`}>
                    {currentQuestion.options?.map((option) => (
                        <OptionCard
                            key={option.id}
                            id={option.id}
                            label={option.label}
                            emoji={option.emoji}
                            type={currentQuestion.type === 'multiple' ? 'checkbox' : 'radio'}
                            layout={currentQuestion.layout}
                            selected={
                                currentQuestion.type === 'multiple' 
                                ? (answers[currentStep] as string[] || []).includes(option.id)
                                : answers[currentStep] === option.id
                            }
                            onClick={() => handleSelect(option.id)}
                        />
                    ))}
                </div>
            </div>
          )}
        </div>

        {/* Navigation - Hidden on Step 5 (Info) and Step 11 (Result) */}
        {currentQuestion.type !== 'info' && (
            <Navigation 
                currentStep={currentStep}
                totalSteps={TOTAL_STEPS}
                canProceed={hasAnswer(currentStep)}
                isLoading={isLoading}
                onNext={handleNext}
                onBack={handleBack}
                onReset={handleReset}
            />
        )}

        {/* Checkout Modal */}
        <CheckoutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      </main>
    </div>
  );
};

export default App;