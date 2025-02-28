import Icon from "../Icon";
import { SidebarItem } from "./SidebarItem";

export const Sidebar = () => {
  const strokeW = 1.5;
  const size = 24;

  return (
    <div className="bg-dark-gray h-full border-r border-light-gray">
      <div className="flex flex-col gap-6 w-full px-6 pt-6">
        <SidebarItem title="Início">
          <Icon name="House" strokeWidth={strokeW} size={size} color="white" />
        </SidebarItem>
        <SidebarItem title="Cursos">
          <Icon
            name="BookAudio"
            strokeWidth={strokeW}
            size={size}
            color="white"
          />
        </SidebarItem>
        <SidebarItem title="Configurações">
          <Icon
            name="Settings"
            strokeWidth={strokeW}
            size={size}
            color="white"
          />
        </SidebarItem>
      </div>
    </div>
  );
};
