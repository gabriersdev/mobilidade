import Util from "@/lib/Util.jsx";
import ThemeSelector from "../theme-selector.jsx";
import InstallPWAButton from "@/components/install-PWA-button/install-PWA-button.jsx";
import {useTheme} from "@/components/ui/theme-context/theme-context.jsx";

const ActionButtons = () => {
  const {theme, handleTheme} = useTheme();
  
  return (
    <div className="d-flex gap-3 flex-wrap">
      <button className={"btn text-start p-0 m-0 text-primary-emphasis border-0"} onClick={() => {
        Util.clearServiceWorker();
        window.location.reload();
      }}>
        <span className={"me-1"}>Limpar cache</span>
        <i className="bi bi-database-fill-x"></i>
      </button>
      
      <button className={"btn text-start p-0 m-0 text-primary-emphasis border-0"} onClick={() => {
        if (localStorage) localStorage.clear();
        window.location.reload();
      }}>
        <span className={"me-1"}>Limpar outros dados</span>
        <i className="bi bi-menu-button-fill"></i>
      </button>
      
      <ThemeSelector theme={theme} onThemeChange={handleTheme}/>
      
      <InstallPWAButton/>
    </div>
  );
};

export default ActionButtons;
