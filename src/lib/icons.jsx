import {
  Code2,
  Globe,
  Layout,
  PenTool,
  Server,
  Smartphone,
  Terminal,
} from "lucide-react";

const ICON_MAP = {
  Code2,
  Globe,
  Layout,
  PenTool,
  Server,
  Smartphone,
  Terminal,
};

export const getIcon = (name, className, size = 24) => {
  const Icon = ICON_MAP[name];
  if (!Icon) return null;
  return <Icon className={className} size={size} />;
};

export const ICON_OPTIONS = Object.keys(ICON_MAP);
