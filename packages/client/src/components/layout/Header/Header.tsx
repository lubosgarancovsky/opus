import { Button } from "@/components/ui/button";
import { HeaderDropdown } from "./HeaderDropdown";
import { HeaderNavigation } from "./HeaderNavigation";
import { Bell } from "lucide-react";
import { NotificationsSheet } from "./NotificationsSheet";

export const Header = () => {
  return (
    <header className="bg-white p-2 px-8 gap-4 flex items-center">
      <h3>Opus</h3>
      <div className="ml-12">
        <HeaderNavigation />
      </div>
      <div className="ml-auto">
        <NotificationsSheet />
      </div>
      <div>
        <HeaderDropdown />
      </div>
    </header>
  );
};
