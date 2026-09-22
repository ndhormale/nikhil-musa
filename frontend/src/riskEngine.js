import { signalMeta } from './data.js';

const rules = [
  ['emotional_dependency', /only (person|one).*(understand|rely|need|trust)|what i'?d do without you|don'?t disappear|all i need/i],
  ['secrecy', /don'?t tell|keep (this|our).*(between|private)|don'?t let anyone read|don'?t show.*conversation|delete these messages|nobody else needs to know/i],
  ['isolation', /friends.*(separate|understand|influence)|family.*(interfere|understand)|you don'?t need (anyone|their opinion)|only need me/i],
  ['emotional_pressure', /if you (really )?(care|love|trust)|prove (that )?you trust|if i mean.*prove|you won'?t say no/i],
  ['guilt_manipulation', /i thought you trusted|after everything|don'?t care|disappointing|making this difficult|wrong about you/i],
  ['urgency', /right now|can'?t wait|urgent|emergency|immediately|few minutes|hurry|running out of time|before tonight/i],
  ['time_pressure', /few minutes|30 minutes|before [0-9]+|deadline|tonight|tomorrow/i],
  ['financial_request', /lend me|send.*₹|transfer.*₹|need.*₹|pay (this )?bill|money|financially|recharge my account|cover the payment/i],
  ['private_content_request', /private (photo|picture)|something more personal|send.*(photo|picture)|nobody else will see|send it privately/i],
  ['verification_avoidance', /video call|camera.*working|don'?t.*verify|just trust me|stop asking.*verify|don'?t involve anyone/i],
  ['identity_inconsistency', /backup account|different name|old account|previous profile|explain later/i]
];
const bonusPairs = [ ['emotional_dependency','secrecy',5], ['secrecy','emotional_pressure',5], ['emotional_pressure','urgency',5], ['urgency','financial_request',8], ['financial_request','private_content_request',8], ['secrecy','private_content_request',5], ['verification_avoidance','financial_request',7] ];

export function detectSignals(text, sender='alex') {
  if (sender === 'you') return [];
  const lower = text.toLowerCase();
  // Context guards keep ordinary references to money, love, or urgency from becoming signals.
  if (/friend needed|college project|love talking to my family|exam is urgent|good luck for your exam/i.test(lower)) return [];
  return rules.filter(([, pattern]) => pattern.test(text)).map(([type]) => type);
}

export function scoreMessage(text, state, sender='alex') {
  const signals = detectSignals(text, sender);
  const previous = state.score;
  let added = signals.reduce((total, signal) => total + signalMeta[signal][2], 0);
  const existing = new Set(state.seen);
  signals.forEach(signal => {
    bonusPairs.forEach(([before, after, points]) => {
      if (signal === after && existing.has(before)) added += points;
    });
  });
  // Repeated messages still matter, but much less than a new signal. Damping
  // also keeps the demo's escalation gradual rather than instantly maxing out.
  signals.filter(s => existing.has(s)).forEach(s => { added -= Math.max(0, signalMeta[s][2] - 3); });
  added = Math.round(added * 0.75);
  const score = Math.min(100, Math.max(previous, previous + Math.max(0, added)));
  return { signals, previous, score, contribution: score - previous, seen: [...new Set([...state.seen, ...signals])] };
}

export function riskLevel(score) { return score >= 70 ? 'HIGH RISK' : score >= 45 ? 'ELEVATED' : score >= 25 ? 'WATCH' : 'SAFE'; }
