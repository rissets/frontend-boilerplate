import { Component, type ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <main className="starter">
        <h1>Halaman perlu dimuat ulang</h1>
        <button onClick={() => location.reload()}>Muat ulang</button>
      </main>
    ) : (
      this.props.children
    );
  }
}
export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
