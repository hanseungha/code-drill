"use client";

import { LinkProvider } from "@astryxdesign/core/Link";
import { Theme } from "@astryxdesign/core/theme";
import Link from "next/link";
import { createContext, useCallback, useContext, useState } from "react";
import { COLOR_MODE_KEY } from "@/components/ColorModeScript";
import { codeDrillTheme } from "@/theme/code-drill";

export type ColorMode = "system" | "light" | "dark";

const ColorModeContext = createContext<{
  mode: ColorMode;
  setMode: (mode: ColorMode) => void;
}>({ mode: "system", setMode: () => {} });

export const useColorMode = () => useContext(ColorModeContext);

/**
 * `Theme` owns the `data-theme` attribute on <html> — it writes it on mount and
 * clears it for "system". So the saved choice has to reach Theme as its `mode`
 * prop; setting the attribute ourselves would just get reverted on hydration.
 *
 * Reading localStorage in the initializer (not an effect) means Theme's first
 * mount already applies the right mode, so it agrees with what ColorModeScript
 * painted and nothing flashes. The value drives an imperative attribute rather
 * than rendered markup, so a server/client difference is not a hydration
 * mismatch.
 */
function readSavedMode(): ColorMode {
  if (typeof window === "undefined") return "system";
  try {
    const saved = window.localStorage.getItem(COLOR_MODE_KEY);
    return saved === "light" || saved === "dark" ? saved : "system";
  } catch {
    return "system";
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ColorMode>(readSavedMode);

  const setMode = useCallback((next: ColorMode) => {
    setModeState(next);
    try {
      if (next === "system") window.localStorage.removeItem(COLOR_MODE_KEY);
      else window.localStorage.setItem(COLOR_MODE_KEY, next);
    } catch {
      // Private mode — the choice just won't survive a reload.
    }
  }, []);

  return (
    <ColorModeContext value={{ mode, setMode }}>
      <Theme theme={codeDrillTheme} mode={mode}>
        <LinkProvider component={Link}>{children}</LinkProvider>
      </Theme>
    </ColorModeContext>
  );
}
