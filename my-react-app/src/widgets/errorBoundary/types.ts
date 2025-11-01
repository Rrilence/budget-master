export interface ErrorBoundaryState {
    hasError: boolean,
    error: Error | null,
    errorInfo: React.ErrorInfo | null  
}

export interface ErrorBoundaryProps {
    children: React.ReactNode
}