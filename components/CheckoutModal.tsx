import React from 'react';
import { X, Lock, CheckCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl p-6 shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-300">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-900">Finalizar Acesso</h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        {/* Summary */}
        <div className="bg-teal-light rounded-xl p-4 mb-6 border border-teal/20">
          <p className="text-sm text-teal-800 font-semibold mb-1">Resumo do pedido:</p>
          <div className="flex justify-between items-center">
            <span className="text-gray-800 font-bold">Guia Empresa no Topo</span>
            <span className="text-teal font-bold text-lg">R$ 39,90</span>
          </div>
        </div>

        {/* Placeholder Payment Form */}
        <div className="space-y-4 mb-6">
            <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase">E-mail para envio</label>
                <input type="email" placeholder="seu@email.com" className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-teal" />
            </div>
            <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase">Dados do cartão (Simulado)</label>
                <input type="text" placeholder="0000 0000 0000 0000" className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-teal" />
                <div className="flex gap-4">
                    <input type="text" placeholder="MM/AA" className="w-1/2 p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-teal" />
                    <input type="text" placeholder="CVV" className="w-1/2 p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-teal" />
                </div>
            </div>
        </div>

        {/* Submit */}
        <button 
          onClick={() => alert('Integração de pagamento seria acionada aqui.')}
          className="w-full bg-teal text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:bg-[#259d8d] active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <Lock size={20} />
          Pagar e Receber Guia
        </button>
        
        <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
          <CheckCircle size={12} /> Pagamento 100% seguro
        </p>

      </div>
    </div>
  );
};

export default CheckoutModal;