import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

export const DetailDrawer = ({ item, onClose, children }) => {
  useEffect(() => {
    if (!item) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [item, onClose]);

  return createPortal(
    <AnimatePresence>
      {item && (
        <div className="fixed inset-0 z-[9999]">
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          <motion.aside
            key={item.id}
            className="absolute right-0 top-0 h-full w-full md:w-[580px] bg-[#080810] border-l border-slate-800/80 overflow-y-auto shadow-2xl shadow-black/50"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 250 }}
          >
            <div className="sticky top-0 z-10 flex justify-end p-4 bg-gradient-to-b from-[#080810] via-[#080810]/80 to-transparent pointer-events-none">
              <button
                onClick={onClose}
                className="pointer-events-auto h-9 w-9 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors border border-slate-700/50"
              >
                <X size={16} />
              </button>
            </div>
            <div className="px-6 md:px-10 pb-16 -mt-2">{children}</div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
};
