import { useGlobalAnalytics } from './use-global-analytics.js';
import { useGlobalDomEffects } from './use-global-dom-effects.js';
import { useGlobalSw } from './use-global-sw.js';

export const useGlobalEffects = () => {
  useGlobalAnalytics();
  useGlobalDomEffects();
  useGlobalSw();
};
