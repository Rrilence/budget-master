import { ToastContainer } from "react-toastify"
import { AppRouter } from "./AppRouter"
import ErrorBoudary from "../widgets/errorBoundary/ErrorBoundary"
import { BrowserRouter } from "react-router-dom"
import { getCurrentUser, selectLoading, setUser, useAppDispatch } from "../entities/auth-slice"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { supabase } from "../entities/lib/supabase"
import AntProvider from "./ConfigProvider"
import { Flex, Spin } from "antd"


function App() {
  const dispatch = useAppDispatch();
  const loading = useSelector(selectLoading);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getCurrentUser());
      const { data : authListener } = supabase.auth.onAuthStateChange(
        async (_, session) => {
            if(session?.user) {
                dispatch(setUser(session.user))                
            } else {
              dispatch(setUser(null))
            }
          }
      )
      return () => {
        authListener?.subscription?.unsubscribe()
      }   
    }
    fetchData();
  }, [dispatch])
  
   if (loading) {
    return <Flex gap="middle" justify="center">
        <Spin tip="Loading" size="large"><div style={{padding: 50}}/></Spin>
    </Flex>; }

  return (
    <BrowserRouter>
      <ToastContainer/>
        <ErrorBoudary>
          <AntProvider>
            <AppRouter/>  
          </AntProvider>
        </ErrorBoudary>
    </BrowserRouter>
  )
}

export default App
