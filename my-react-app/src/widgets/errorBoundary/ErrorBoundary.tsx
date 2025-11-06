import React from "react";
import type { ErrorBoundaryProps, ErrorBoundaryState } from "./types";
import styles from './style.module.css'
import clsx from "clsx";



class ErrorBoudary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        }
    }

    static getDerivedStateFromError(error: Error) {
       return { hasError: true, error: error };
     }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.error("Поймана ошибка в ErrorBoundary:", error, errorInfo);
        
         this.setState({
            hasError: true,
            errorInfo: errorInfo
         }) 
     }

    render(): React.ReactNode {
         if(this.state.hasError) {
             return (
                <div className={clsx('container', styles.container)}>
                    <h2>При загрузке страницы возникли неполадки</h2>
                    <h3>Попробуйте перезагрузить страницу</h3>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                    {this.state.error && this.state.error.toString()}
                    <br />
                    {this.state.errorInfo?.componentStack}
                    </details>
                </div>
             )            
         }
         return this.props.children
     } 
}

export default ErrorBoudary