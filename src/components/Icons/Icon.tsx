import { icons } from "lucide-react";
import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: keyof typeof icons;
  size?: string | number;
}

const Icon = ({ name, size, color, ...rest }: IconProps) => {
  const LucideIcon = icons[name];

  return <LucideIcon {...rest} size={size} color={color} />;
};

export default Icon;
