"use client";

import { Icon } from "@astryxdesign/core/Icon";
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@astryxdesign/core/SegmentedControl";
import { useColorMode, type ColorMode } from "@/app/providers";

const MODES: { value: ColorMode; label: string; icon: typeof SunIcon }[] = [
  { value: "system", label: "시스템 설정 따르기", icon: MonitorIcon },
  { value: "light", label: "밝게", icon: SunIcon },
  { value: "dark", label: "어둡게", icon: MoonIcon },
];

export function ColorModeToggle() {
  const { mode, setMode } = useColorMode();

  return (
    <SegmentedControl
      value={mode}
      onChange={(next) => setMode(next as ColorMode)}
      label="색상 모드"
      size="sm"
    >
      {MODES.map(({ value, label, icon }) => (
        <SegmentedControlItem
          key={value}
          value={value}
          label={label}
          isLabelHidden
          icon={<Icon icon={icon} size="sm" />}
        />
      ))}
    </SegmentedControl>
  );
}

/* Lucide-style glyphs, matching the neutral theme's icon set. */

function SunIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function MonitorIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}
