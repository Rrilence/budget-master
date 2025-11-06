import { ToastContainer } from "react-toastify"
import { AppRouter } from "./AppRouter"
import ErrorBoudary from "../widgets/errorBoundary/ErrorBoundary"
import { BrowserRouter } from "react-router-dom"
import { getCurrentUser, selectLoading, selectUser, setUser, useAppDispatch } from "../entities/auth-slice"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { supabase } from "../entities/lib/supabase"


function App() {
  const dispatch = useAppDispatch();
  const loading = useSelector(selectLoading);
  const user = useSelector(selectUser)

  useEffect(() => {
    dispatch(getCurrentUser());
    const { data : authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(`Auth event: ${event}`);
          if(session?.user) {
              dispatch(setUser(session.user))
          } else {
            dispatch(setUser(null))
          }
        }
    )
    console.log(user);
    
    return () => {
      authListener?.subscription?.unsubscribe()
    }   
  }, [dispatch])
  
  if(loading) {
    return <p>Загрузка...</p>
  }

  return (
    <BrowserRouter>
      <ToastContainer/>
        <ErrorBoudary>
          <AppRouter/>
        </ErrorBoudary>
    </BrowserRouter>
  )
}

export default App
