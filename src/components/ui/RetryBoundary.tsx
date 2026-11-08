import { Component, type ReactNode } from 'react'

export interface RetryBoundaryProps {
  children: ReactNode
  onRetry: () => void
}

interface RetryBoundaryState {
  error: boolean
  version: number
}

export class RetryBoundary extends Component<
  RetryBoundaryProps,
  RetryBoundaryState
> {
  state: RetryBoundaryState = { error: false, version: 0 }

  static getDerivedStateFromError(): Partial<RetryBoundaryState> {
    return { error: true }
  }

  retry = () => {
    this.props.onRetry()
    this.setState((current) => ({ error: false, version: current.version + 1 }))
  }

  render() {
    if (this.state.error)
      return (
        <div className="container status-panel" role="alert">
          <h2>That part could not load.</h2>
          <p>Check the connection and try again.</p>
          <button className="primary-button" onClick={this.retry}>
            Try again
          </button>
        </div>
      )
    return <div key={this.state.version}>{this.props.children}</div>
  }
}
