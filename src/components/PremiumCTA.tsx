
import { motion } from "framer-motion";
import { GradientButton } from "@/components/ui/gradient-button";
import { Link } from "react-router-dom";

export const PremiumCTA = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg bg-gradient-to-r from-grubble-50 to-teal-50 dark:from-grubble-900/40 dark:to-teal-900/40 p-4 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-sm font-medium">Unlock Premium Features</h3>
          <p className="text-xs text-muted-foreground">
            Get access to all features and premium content
          </p>
        </div>
        <Link to="/pricing">
          <GradientButton size="sm">Try Premium</GradientButton>
        </Link>
      </div>
    </motion.div>
  );
};
