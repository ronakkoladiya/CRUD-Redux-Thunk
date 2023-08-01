import { useNavigate } from "react-router-dom";
import DashboardClass from "./DashboardClass";

function Dashboard() {
    const navigate = useNavigate();

    return <DashboardClass navigate={navigate} />;
}

export default Dashboard;