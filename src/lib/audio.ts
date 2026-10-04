import { useSanctuary } from "@/lib/sanctuary-store";

const ALLOWED = [174, 285, 432, 528, 741, 963] as const;
export type Tone = (typeof ALLOWED)[number];

let ctx: AudioContext | null = null;
let pad: { osc: OscillatorNode; gain: GainNode } | null = null;

function ac() {
  if (!ctx) ctx = new AudioContext();
  return ctx;
}

export function unlockAudio() {
  const c = ac();
  if (c.state === "suspended") void c.resume();
}

export function resumeAudio() {
  if (ctx && ctx.state === "suspended") void ctx.resume();
}

export function blip(freq: Tone, dur = 0.1, volume = 0.028) {
  if (useSanctuary.getState().muted) return;
  if (!ctx || ctx.state !== "running") return;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = "sine";
  o.frequency.value = freq;
  const now = ctx.currentTime;
  g.gain.setValueAtTime(volume, now);
  g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
  o.connect(g);
  g.connect(ctx.destination);
  o.start(now);
  o.stop(now + dur + 0.03);
}

export function startPad(freq: Tone) {
  stopPad();
  if (useSanctuary.getState().muted || !ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  gain.gain.value = 0.016;
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  pad = { osc, gain };
}

export function setPad(freq: Tone) {
  if (!pad || !ctx) {
    startPad(freq);
    return;
  }
  const now = ctx.currentTime;
  if (useSanctuary.getState().muted) {
    pad.gain.gain.setTargetAtTime(0.0001, now, 0.06);
    return;
  }
  pad.osc.frequency.setTargetAtTime(freq, now, 0.08);
  pad.gain.gain.setTargetAtTime(0.016, now, 0.08);
}

export function stopPad() {
  if (!pad) return;
  try {
    pad.osc.stop();
  } catch {
    /* already stopped */
  }
  pad = null;
}
