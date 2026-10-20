import { AnimatePresence, m, useReducedMotion } from 'motion/react';
import { motionTokens } from './motion.tokens';
export function PresenceMessage({ message }: { message: string | null }) {
  const reduced = useReducedMotion();
  return (
    <div role="status" aria-live="polite" className="min-h-6 text-sm text-muted-foreground">
      <AnimatePresence initial={false} mode="wait">
        {message && (
          <m.p
            key={message}
            initial={{ opacity: reduced ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: reduced ? 1 : 0 }}
            transition={{ duration: reduced ? 0 : motionTokens.duration.fast }}
          >
            {message}
          </m.p>
        )}
      </AnimatePresence>
    </div>
  );
}
