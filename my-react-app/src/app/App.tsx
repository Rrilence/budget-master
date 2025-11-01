import { ToastContainer } from "react-toastify"
import { MainPropvider } from "./MainProvider"
import { AppRouter } from "./AppRouter"
import ErrorBoudary from "../widgets/errorBoundary/ErrorBoundary"
import { BrowserRouter } from "react-router-dom"


function App() {

  return (
    <MainPropvider>
        <ToastContainer/>
        <ErrorBoudary>
          <BrowserRouter>
            <AppRouter/>
          </BrowserRouter>
        </ErrorBoudary>
    </MainPropvider>
  )
}

export default App
