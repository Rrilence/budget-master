import { Navigate, Outlet, Route, Routes} from "react-router-dom";
import StartPage from "../pages/StartPage/StartPage";
import UpdatePassword from "../entities/UpdatePassword/UpdatePassword"
import DashBoard from "../pages/Dashboard/ui/Dashboard";
import Budget from "../pages/Budget/ui/Budget";
import Transactions from "../pages/Transactions/ui/Transactions";
import Analytics from "../pages/Analytics/ui/Analytics";
import Goals from "../pages/Goals/ui/Goals";
import Predict from "../pages/Predict/ui/Predict";
import Settings from "../pages/Settings/ui/Settings";
import { useSelector } from "react-redux";
import type { PrivateRouteProps } from "../shared/types";
import { selectUser } from "../entities/auth-slice";
import LayoutWidget from "../widgets/Layout/Layout";

const PrivateRoute = ({ redirectTo}: PrivateRouteProps) => {
    const user = useSelector(selectUser);
    return user ? <Outlet/> : <Navigate to={redirectTo}/>
}

export const AppRouter = () => {

    return (
        <Routes>
            <Route path="/welcome" index element={<StartPage/>}/>
                <Route element={<PrivateRoute redirectTo="/welcome" />}>
                    <Route path="/"  element={<LayoutWidget/> }>
                    <Route index element={<DashBoard />} />
                    <Route path="dashboard" element={<DashBoard/>}/>
                    <Route path="budget" element={<Budget/>}/>
                    <Route path="transactions" element={<Transactions/>}/>
                    <Route path="analytics" element={<Analytics/>}/>
                    <Route path="goals" element={<Goals/>}/>
                    <Route path="predict" element={<Predict/>}/>
                    <Route path="settings" element={<Settings/>}/>
                </Route>
            </Route>
            <Route path="/update-password" element={<UpdatePassword />} />
        </Routes>
    )
}
