import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import Icon from "../Icon";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  widthPercentage?: number;
}

export const SideModalRoot = ({
  children,
  onClose,
  isOpen,
  widthPercentage,
}: SidebarProps) => {
  const widthPer = widthPercentage ? `w-[${widthPercentage}%]` : "w-[45%]";

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className={`bg-background h-full ${widthPer} shadow-lg relative flex flex-col p-4`}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex justify-end">
              <Icon
                size={20}
                name="X"
                onClick={onClose}
                className="cursor-pointer"
              />
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
