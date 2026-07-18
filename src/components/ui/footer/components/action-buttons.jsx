import ThemeSelector from "../theme-selector.jsx";
import InstallPWAButton from "@/components/install-PWA-button/install-PWA-button.jsx";
import {useTheme} from "@/components/ui/theme-context/use-theme.js";
import CacheControl from "@/components/cache-control/cache-control.jsx";

const ActionButtons = () => {
  const {theme, handleTheme} = useTheme();
  
  return (
    <div className="d-flex gap-3 flex-wrap">
      <div className={"d-flex align-items-center gap-1"}>
        <ThemeSelector theme={theme} onThemeChange={handleTheme}/>
        <CacheControl/>
      </div>
      
      <InstallPWAButton/>
    </div>
  );
};

export default ActionButtons;
