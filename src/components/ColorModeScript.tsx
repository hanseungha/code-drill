export const COLOR_MODE_KEY = "code-drill:color-mode";
export const COLOR_MODE_ATTR = "data-theme";

/**
 * Applies a saved light/dark choice before first paint.
 *
 * Astryx's theme CSS switches modes on `html[data-theme="light"|"dark"]`; with
 * the attribute absent, `:root { color-scheme: light dark }` leaves the OS
 * preference in charge. So an explicit choice is just that attribute, and
 * "system" is its absence.
 *
 * This runs as a blocking inline script rather than an effect so the page never
 * paints the wrong mode first.
 */
const SCRIPT = `try{var m=localStorage.getItem(${JSON.stringify(COLOR_MODE_KEY)});if(m==="light"||m==="dark"){document.documentElement.setAttribute(${JSON.stringify(COLOR_MODE_ATTR)},m)}}catch(e){}`;

export function ColorModeScript() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}
