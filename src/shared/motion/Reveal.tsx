import { m, useReducedMotion, type HTMLMotionProps } from 'motion/react';
import { motionTokens } from './motion.tokens';
/** Content is visible before JS; use once at a meaningful content transition. */
export function Reveal({
  children,
  ...props
}: Omit<HTMLMotionProps<'div'>, 'initial' | 'animate' | 'transition'>) {
  const reduced = useReducedMotion();
  return (
    <m.div
      {...props}
      initial={reduced ? false : { opacity: 1, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduced ? 0 : motionTokens.duration.normal,
        ease: motionTokens.easeOut,
      }}
    >
      {children}
    </m.div>
  );
}
