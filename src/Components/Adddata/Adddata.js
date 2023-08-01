import { useNavigate } from "react-router-dom";
import AdddataClass from "./AdddataClass";

function Adddata(){
    const navigate = useNavigate();

    return <AdddataClass navigate={navigate} />;
}

export default Adddata;
