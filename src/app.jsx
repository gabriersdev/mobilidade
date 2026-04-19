import '@/styles/app.css';
import 'aos/dist/aos.css';

import {BreadcrumbProvider} from '@/components/breadcrumb-app/breadcrumb-provider.jsx';
import {ThemeProvider} from '@/components/ui/theme-context/theme-context.jsx';
import {CaptchaProvider} from '@/components/captcha-verifier/captcha-context.jsx';
import AppRouter from '@/app-router.jsx';

function App() {
  return (
    <CaptchaProvider>
      <ThemeProvider>
        <BreadcrumbProvider>
          <AppRouter/>
        </BreadcrumbProvider>
      </ThemeProvider>
    </CaptchaProvider>
  );
}

export default App;
