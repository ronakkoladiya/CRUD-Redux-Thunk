import {useNavigate, useParams} from "react-router-dom";
import UpdatedataClass from "./UpdatedataClass";

function Updatedata() {
    const navigate = useNavigate();
    const { id } = useParams();

    return <UpdatedataClass navigate={navigate} id={id} />;
}

export default Updatedata;