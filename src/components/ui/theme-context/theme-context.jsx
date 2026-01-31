import {createContext, useCallback, useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";

const ThemeContext = createContext(undefined);

export const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState("light");

  const handleTheme = useCallback((themeParam) => {
    if (!["default", "light", "dark"].includes(themeParam)) {
      throw new Error(`Theme "${themeParam}" is not supported`);
    }

    if ("localStorage" in window) {
      try {
        let ls = JSON.parse(localStorage.getItem("mobilidade-app"));
        if (ls) {
          localStorage.setItem("mobilidade-app", JSON.stringify({
            ...ls,
            theme: themeParam
          }));
        } else {
          localStorage.setItem("mobilidade-app", JSON.stringify({theme: themeParam}));
        }
        setTheme(themeParam);
        document.querySelector('html').dataset.bsTheme = themeParam;
      } catch (error) {
        console.log(error.message);
      }
    }
  }, []);

  useEffect(() => {
    if (!("localStorage" in window)) {
      console.log("Navegador não suporta localStorage");
    } else {
      let ls;
      try {
        ls = JSON.parse(localStorage.getItem("mobilidade-app"));
        if (ls && ls["theme"]) handleTheme(ls["theme"]);
        else {
          const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
          const initialTheme = prefersDarkMode ? "dark" : "light";
          handleTheme(initialTheme);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  }, [handleTheme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      // Only change if user hasn't manually set a preference (optional logic, keeping simple for now)
      // For now, let's respect manual overrides stored in localStorage, so we might not auto-switch here
      // unless we want to follow system preference strictly when no local storage is set.
      // Given the existing logic, we initialize based on storage or system pref.
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <ThemeContext.Provider value={{theme, handleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
