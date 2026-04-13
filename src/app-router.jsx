import {Route, Routes} from 'react-router-dom';
import {useCaptcha} from './components/captcha-verifier/use-captcha.js';
import {useGlobalEffects} from './hooks/use-global-effects.js';
import AppLayout from './components/layout/app-layout.jsx';
import CaptchaVerifier from "./components/captcha-verifier/captcha-verifier.jsx";
import {Company, DeparturePoints, Development, Guide, HistoryDayDepartureTimes, HistoryDepartureTimes, HistoryFares, Home, Lines, Live, Manifest, News, NotFound, OneDeparturePoints, Privacy, SabaraInfo, Search, TermsOfService} from "./pages/index.d.ts";

const AppRouter = () => {
  const {isVerified} = useCaptcha();
  useGlobalEffects();
  if (!isVerified) return <CaptchaVerifier/>;
  
  return (
    <AppLayout>
      <Routes>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/404" element={<NotFound/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/lines/:id?" element={<Lines/>}/>
        <Route path="/development" element={<Development/>}/>
        <Route path="/terms-of-service" element={<TermsOfService/>}/>
        <Route path="/privacy" element={<Privacy/>}/>
        <Route path="/company/:id?" element={<Company/>}/>
        <Route path="/news/:id?" element={<News/>}/>
        <Route path="/guide" element={<Guide/>}/>
        <Route path="/live" element={<Live/>}/>
        <Route path="/history/departure-times/:id" element={<HistoryDepartureTimes/>}/>
        <Route path="/history/departure-times/:id/:id" element={<HistoryDayDepartureTimes/>}/>
        <Route path="/history/fares/:id" element={<HistoryFares/>}/>
        <Route path="/history/departure-points/:id" element={<DeparturePoints/>}/>
        <Route path="/history/departure-points/:id/:id" element={<OneDeparturePoints/>}/>
        <Route path="/sabara" element={<SabaraInfo/>}/>
        <Route path="/manifest" element={<Manifest/>}/>
      </Routes>
    </AppLayout>
  );
};

export default AppRouter;
