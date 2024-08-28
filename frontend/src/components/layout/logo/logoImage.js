import React from "react";
import companylogo from "../../../assets/images/Laguna.png";

const LogoImage = ({className = 'w-auto h-auto'}) => {

return (
        <img
        src={companylogo}
        alt="Company Logo"
        className={className}
        />
    )
}

export default LogoImage;