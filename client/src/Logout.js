import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { logout } from "../user/userSlice";
// import axios from "axios";

const Logout = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        const performLogout = async () => {
            try {
                // await axios.post("http://localhost:5010/api/user/logout");
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                // dispatch(logout());
                history.push("/login");
            } catch (error) {
                console.error("Logout failed:", error);
            }
        };

        performLogout();
    }, [history, dispatch]);

    return <div>Logging out...</div>;
};

export default Logout;
