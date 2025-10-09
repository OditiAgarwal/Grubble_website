
import React from "react";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

interface GradientButtonProps extends ButtonProps {
  gradientFrom?: string;
  gradientTo?: string;
  className?: string;
}

export const GradientButton = ({
  gradientFrom = "from-grubble-500",
  gradientTo = "to-teal-600",
  className,
  children,
  ...props
}: GradientButtonProps) => {
  return (
    <Button
      className={cn(
        `bg-gradient-to-r ${gradientFrom} ${gradientTo} hover:opacity-90 text-white transition-all duration-200 shadow-md hover:shadow-lg`,
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};
