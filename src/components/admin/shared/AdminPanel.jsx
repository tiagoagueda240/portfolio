import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

/**
 * Painel deslizante reutilizável para os formulários do admin.
 */
export const AdminPanel = ({ open, onClose, title, children }) => (
  <AnimatePresence>
    {open && (
      <div className="fixed inset-0 z-50 flex">
        <motion.div
          className="flex-grow bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        <motion.div
          className="w-full max-w-xl bg-[#080810] border-l border-slate-800 flex flex-col overflow-hidden"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 250 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800 flex-shrink-0">
            <h2 className="text-lg font-bold text-white">{title}</h2>
            <button
              onClick={onClose}
              className="h-8 w-8 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
          {/* Body com scroll */}
          <div className="flex-grow overflow-y-auto px-6 py-6 space-y-5">
            {children}
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);
