import { useEffect, useMemo, useRef, useState } from 'react';
import { MARTHA, buildMarthaPrompt } from '../content';
import { Icon } from './icons';

// TODO(step 6): move this call behind a serverless proxy so the key leaves the client bundle.
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Walks MARTHA.models in order. Groq rate-limits per model, so a 429 (or a retired
// model) on one falls through to the next instead of failing the reply.
async function askGroq(system, history) {
  const messages = [{ role: 'system', content: system }, ...history.slice(-MARTHA.historyLimit)];
  let rateLimited = false;
  for (const model of MARTHA.models) {
    const res = await fetch(GROQ_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${GROQ_API_KEY}` },
      body: JSON.stringify({ model: model.id, ...model.params, messages, max_tokens: 400, temperature: 0.8 }),
    });
    if (res.status === 429) { rateLimited = true; continue; }
    if (!res.ok) continue;
    const data = await res.json().catch(() => ({}));
    const text = data.choices?.[0]?.message?.content?.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
    if (text) return text;
  }
  return rateLimited
    ? "I'm fielding a few conversations at once. Give me a minute and ask again, or reach Tanmay directly at tshelar@asu.edu."
    : "My apologies, I've hit a momentary lapse. Do try again, or email tshelar@asu.edu.";
}

function Eyes({ happy }) {
  if (happy) {
    return <svg width="34" height="16" viewBox="0 0 34 16" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" aria-hidden="true"><path d="M4 12c1.5-5 7.5-5 9 0M21 12c1.5-5 7.5-5 9 0" /></svg>;
  }
  return <><span className="eye blink" /><span className="eye blink" /></>;
}

export default function Martha({ open, onOpenChange, seed, onSeedUsed }) {
  const system = useMemo(buildMarthaPrompt, []);
  const [messages, setMessages] = useState([{ role: 'assistant', content: MARTHA.greeting }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const logRef = useRef(null);
  const inputRef = useRef(null);

  const send = async (text) => {
    const q = (text ?? input).trim();
    if (!q || loading) return;
    setInput('');
    const history = [...messages, { role: 'user', content: q }];
    setMessages(history);
    setLoading(true);
    let reply;
    try {
      reply = await askGroq(system, history.filter((m, i) => i > 0 || m.role === 'user'));
    } catch {
      reply = 'The network seems to be uncooperative. Please try again in a moment.';
    }
    setMessages((m) => [...m, { role: 'assistant', content: reply }]);
    setLoading(false);
  };

  // A story sheet can open Martha with a question already asked.
  useEffect(() => {
    if (!open || !seed) return;
    onSeedUsed();
    send(seed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, seed]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  // After every reply, offer three questions that haven't been asked yet.
  const asked = new Set(messages.filter((m) => m.role === 'user').map((m) => m.content));
  const nextSuggestions = MARTHA.suggestions.filter((s) => !asked.has(s)).slice(0, 3);
  const showSuggestions = !loading && messages.at(-1)?.role === 'assistant' && nextSuggestions.length > 0;

  return (
    <>
      {open && (
        <div className="chat" role="dialog" aria-label="Chat with Martha">
          <div className="chat-head">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className="mini-orb morph" aria-hidden="true"><span className="orb-face"><Eyes /></span></span>
              <span className="stack-col" style={{ gap: 0 }}>
                <span style={{ fontSize: 15, fontWeight: 600 }}>Martha</span>
                <span style={{ fontSize: 12, color: 'var(--text-3)' }}>Tanmay's AI agent · usually instant</span>
              </span>
            </div>
            <button type="button" className="pill icon-btn" aria-label="Close chat" onClick={() => onOpenChange(false)}><Icon name="close" size={14} width={2.5} /></button>
          </div>

          <div className="chat-log" ref={logRef} aria-live="polite">
            {messages.map((m, i) => <div key={i} className={`bubble ${m.role === 'user' ? 'me' : 'bot'}`}>{m.content}</div>)}
            {loading && <div className="bubble bot" aria-label="Martha is typing"><span className="typing"><span /><span /><span /></span></div>}
            {showSuggestions && (
              <div className="suggest">
                {nextSuggestions.map((s) => <button key={s} type="button" className="pill" onClick={() => send(s)}>{s}</button>)}
              </div>
            )}
          </div>

          <form className="chat-input" onSubmit={(e) => { e.preventDefault(); send(); }}>
            <label htmlFor="martha-input" className="sr-only">Message Martha</label>
            <input id="martha-input" ref={inputRef} placeholder="Ask about Tanmay…" value={input} onChange={(e) => setInput(e.target.value)} disabled={loading} autoComplete="off" />
            <button type="submit" className="send" aria-label="Send" disabled={loading || !input.trim()}><Icon name="up" size={16} width={2.4} /></button>
          </form>
        </div>
      )}

      <div className="martha">
        <button type="button" className="orb-btn" aria-label={open ? 'Close Martha' : 'Ask Martha, my AI agent'} aria-expanded={open} onClick={() => onOpenChange(!open)}>
          <span className="orb-halo spin" aria-hidden="true" />
          <span className="orb-body morph" aria-hidden="true">
            <span className="orb-swirl spin" />
            <span className="orb-core morph" />
          </span>
          <span className="orb-face" aria-hidden="true"><Eyes happy={open} /></span>
        </button>
        {!open && <span className="orb-label" aria-hidden="true">Hi, I'm Martha. Ask me about Tanmay.</span>}
      </div>
    </>
  );
}
