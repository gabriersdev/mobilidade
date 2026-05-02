import {Route, Routes} from 'react-router-dom';
import {useCaptcha} from '@/components/captcha-verifier/use-captcha.js';
import {useGlobalEffects} from '@/hooks/use-global-effects.js';
import AppLayout from '@/components/layout/app-layout.jsx';
import {Company, DeparturePoints, Development, Guide, HistoryDayDepartureTimes, HistoryDepartureTimes, HistoryFares, Home, Lines, Live, Manifest, News, NotFound, OneDeparturePoints, Privacy, SabaraInfo, Search, TermsOfService} from "@/pages/index.d.ts";
import CaptchaVerifier from "@/components/captcha-verifier/captcha-verifier.jsx";
import {Alert} from "react-bootstrap";

const AppRouter = () => {
  // O hook agora também pode expor uma função para realizar a verificação no backend.
  const {isVerified, handleVerification} = useCaptcha();
  useGlobalEffects();
  
  // Se o usuário não estiver verificado, mostramos o Captcha.
  // A prop 'onSuccess' será chamada pelo CaptchaVerifier com o token do captcha,
  // que então aciona a verificação completa no backend.
  if (!isVerified) return <CaptchaVerifier onSuccess={handleVerification}/>;
  
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
        <Route path="/re-valid-session" element={
          <div className={"d-flex flex-column gap-3"}>
            <Alert variant={"danger"}>
              A sessão expirou. Faça a verificação novamente.
            </Alert>
            <CaptchaVerifier onSuccess={handleVerification}/>
          </div>
        }/>
      </Routes>
    </AppLayout>
  );
};

export default AppRouter;
