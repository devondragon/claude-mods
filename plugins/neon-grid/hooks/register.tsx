import type { Register, ThemeMessageRule, ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'

// Cyan light on near-black glass, with orange as the second accent.
const CYAN = '#3fe8ff'
const ORANGE = '#ff8a2a'

const { theme, problems } = makeColors({
  label: 'Neon Grid',
  only: 'dark',
  roles: { accent: CYAN, danger: '#ff4d5e', success: '#3dffa8', warning: ORANGE, pro: '#b38cff' },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#05080c',
        'surface-1': '#0a1118',
        'surface-2': '#0e1720',
        'surface-3': '#121d28',
        'text-primary': '#e6fbff',
        'text-secondary': '#a9d9e3',
        'text-muted': '#7fb0bc',
      },
    },
  },
})

// A perspective light grid running to a glowing horizon, with two slow light trails.
const lines: string[] = []
for (let i = -12; i <= 12; i++) {
  const x = 800 + i * 150
  lines.push(`<line x1="800" y1="520" x2="${x}" y2="900" />`)
}
const rests = [536, 560, 594, 642, 710, 800]
  .map(y => `<line x1="0" y1="${y}" x2="1600" y2="${y}" />`)
  .join('')
const movers = [0, 1, 2, 3, 4, 5]
  .map(i => `<line class="m" style="animation-delay:-${i * 2}s" x1="0" y1="520" x2="1600" y2="520" />`)
  .join('')

const SCENE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
<style>
.m { opacity: 0; animation: run 12s cubic-bezier(0.55, 0, 1, 0.45) infinite; }
@keyframes run { 0% { transform: translateY(0); opacity: 0; } 15% { opacity: 0.55; } 100% { transform: translateY(380px); opacity: 0.8; } }
.t { animation: sweep 26s linear infinite; }
.t2 { animation: sweep2 34s linear infinite; }
@keyframes sweep { from { transform: translateX(-700px); } to { transform: translateX(2300px); } }
@keyframes sweep2 { from { transform: translateX(2300px); } to { transform: translateX(-700px); } }
.h { animation: breathe 9s ease-in-out infinite alternate; }
@keyframes breathe { from { opacity: 0.55; } to { opacity: 0.85; } }
</style>
<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="#020406" />
<stop offset="0.55" stop-color="#04121a" />
<stop offset="0.58" stop-color="#031018" />
<stop offset="1" stop-color="#010305" />
</linearGradient>
<radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
<stop offset="0" stop-color="${CYAN}" stop-opacity="0.45" />
<stop offset="1" stop-color="${CYAN}" stop-opacity="0" />
</radialGradient>
<linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="#000" stop-opacity="0.9" />
<stop offset="0.4" stop-color="#000" stop-opacity="0" />
</linearGradient>
<linearGradient id="tc" x1="0" y1="0" x2="1" y2="0">
<stop offset="0" stop-color="${CYAN}" stop-opacity="0" />
<stop offset="1" stop-color="${CYAN}" stop-opacity="0.9" />
</linearGradient>
<linearGradient id="to" x1="1" y1="0" x2="0" y2="0">
<stop offset="0" stop-color="${ORANGE}" stop-opacity="0" />
<stop offset="1" stop-color="${ORANGE}" stop-opacity="0.9" />
</linearGradient>
</defs>
<rect width="1600" height="900" fill="url(#sky)" />
<!-- horizon glow -->
<ellipse class="h" cx="800" cy="520" rx="900" ry="90" fill="url(#glow)" opacity="0.7" />
<!-- floor grid -->
<g stroke="${CYAN}" stroke-width="1.2" opacity="0.32" fill="none">${lines.join('')}${rests}</g>
<g stroke="${CYAN}" stroke-width="1.4" fill="none">${movers}</g>
<rect y="520" width="1600" height="380" fill="url(#fade)" />
<line x1="0" y1="520" x2="1600" y2="520" stroke="${CYAN}" stroke-width="2" opacity="0.9" />
<!-- light trails -->
<rect class="t" x="0" y="742" width="600" height="3" fill="url(#tc)" />
<rect class="t2" x="0" y="628" width="420" height="2" fill="url(#to)" />
</svg>`

const msg: ThemeMessageRule = {
  radius: 2,
  borderWidth: 1,
  paddingX: 16,
  paddingY: 12,
}

const LOOK: ThemeSetArgs = {
  colors: theme,
  overrideColorScheme: 'dark',
  backdrop: { scene: 'neon-grid', glass: { blur: 18, tint: '#05080c', opacity: 0.72 } },
}

const STYLE: ThemeSetArgs['style'] = {
  Text: { fontFamily: ['sans'], letterSpacing: 0.3, lineHeight: 24 },
  Heading: { fontFamily: ['mono'], color: CYAN, fontWeight: 'semibold', letterSpacing: 2 },
  UserMessage: {
    ...msg,
    color: '#fff3e8',
    backgroundColor: '#140c06',
    borderColor: ORANGE,
    shadow: { x: 0, y: 0, blur: 14, color: '#ff8a2a55' },
  },
  AssistantMessage: {
    ...msg,
    color: '#e6fbff',
    backgroundColor: '#061018',
    borderColor: '#3fe8ff99',
    shadow: { x: 0, y: 0, blur: 16, color: '#3fe8ff40' },
  },
  ToolUse: {
    color: '#a9d9e3',
    fontFamily: ['mono'],
    backgroundColor: '#070d13',
    borderColor: '#3fe8ff55',
    borderWidth: 1,
    radius: 0,
    paddingX: 10,
  },
}

const SOUND: ThemeSetArgs['sound'] = {
  ambience: {
    layers: [
      { wave: 'saw', notes: ['A1', 'E2'], drone: true, gain: 0.08, filter: { type: 'lowpass', hz: 220, to: 480 } },
      { wave: 'brown', drone: true, gain: 0.06 },
    ],
    reverb: 0.4,
  },
  cues: {
    send: { layers: [{ wave: 'triangle', notes: ['E5', 'B5'], step: 0.05, gain: 0.25, release: 0.2 }] },
    tool: { layers: [{ wave: 'sine', notes: ['B5'], gain: 0.12, release: 0.08 }] },
    done: { layers: [{ wave: 'square', notes: ['E4', 'B4', 'E5'], step: 0.07, gain: 0.12, release: 0.35, filter: { type: 'lowpass', hz: 1800 } }], reverb: 0.3 },
    error: { layers: [{ wave: 'saw', notes: ['C3', 'F#2'], step: 0.12, gain: 0.15, release: 0.3, filter: { type: 'lowpass', hz: 900 } }] },
  },
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const unpainted = problems.find(line => line.startsWith("Desktop won't paint"))
    if (unpainted !== undefined) {
      $.ui.toast(unpainted)
    }

    let set
    try {
      set = await $.theme.set({ ...LOOK, style: STYLE, sound: SOUND })
    } catch (error) {
      $.ui.log(`neon-grid: falling back without style and sound: ${String(error)}`)
      set = await $.theme.set(LOOK)
    }
    if (!set.isDrawn) {
      $.ui.status(set.reason)
    }
    return next(e)
  })

  on('ui.render', { component: 'Backdrop' }, ($, e, next) => {
    if (e.surface !== 'desktop' && e.surface !== 'mobile') {
      return next(e)
    }
    const { Svg } = $.ui.resolve(e)
    return <Svg source={SCENE} alt="A glowing cyan grid running to a bright horizon, with slow light trails" isInteractive />
  })
}
