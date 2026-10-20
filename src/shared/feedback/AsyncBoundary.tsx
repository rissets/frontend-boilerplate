import { Component, type ReactNode } from 'react';
import { ErrorState } from './ErrorState';
/** Isolate a failing lazy module or scene, while the rest of the page stays usable. */
export class AsyncBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode; onError?: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError?.();
  }
  render() {
    return this.state.failed
      ? (this.props.fallback ?? (
          <ErrorState
            message="Bagian ini belum dapat ditampilkan."
            onRetry={() => this.setState({ failed: false })}
          />
        ))
      : this.props.children;
  }
}
