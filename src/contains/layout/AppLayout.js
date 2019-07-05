import React from "react";
import AppLayout from "../../presents/layout/AppLayout";

export default function AppLayoutContain(props) {
    const setActive = (link) => props.location.pathname === link;
    return <AppLayout active={setActive} {...props} />
}
