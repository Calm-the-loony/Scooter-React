import { useNavigate } from "react-router-dom";
import React, {useEffect} from "react";

export const RedirectUser = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/login");
    }, [navigate]);

}