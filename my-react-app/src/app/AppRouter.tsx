import { Route, Routes } from "react-router-dom";
import Layout from "../widgets/Layout/Layout";
import StartPage from "../pages/StartPage/StartPage";
import DashBoard from "../pages/Dashboard/ui/Dashboard";
import Budget from "../pages/Budget/ui/Budget";
import Transactions from "../pages/Transactions/ui/Transactions";
import Analytics from "../pages/Analytics/ui/Analytics";
import Goals from "../pages/Goals/ui/Goals";
import Predict from "../pages/Predict/ui/Predict";
import Settings from "../pages/Settings/ui/Settings";


export const AppRouter = () => {

    return (
        <Routes>
            <Route path="/welcome" index element={<StartPage/>}/>
            <Route path="/" element={<Layout/>}>

                {/* <Route element={<PrivateRoute redirectTo="/login" />}> */}
                    <Route path="/dashboard" element={<DashBoard/>}/>
                    <Route path="/budget" element={<Budget/>}/>
                    <Route path="/transactions" element={<Transactions/>}/>
                    <Route path="/analytics" element={<Analytics/>}/>
                    <Route path="/goals" element={<Goals/>}/>
                    <Route path="/predict" element={<Predict/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                    
                {/* </Route> */}
            </Route>
        </Routes>
    )
}