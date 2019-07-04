import React from "react";
import AppLayout from "../layout/AppLayout";
import "../../assets/css/Setting/setting.css";

import {ReactComponent as Save} from "../../assets/icon/save.svg";

const TimeItem = ({text, value}) => (
    <div className="timeItem">
        <span>{text}</span>
        <span>{value}</span>
    </div>
)

const Setting = ({title, work, short, long, round}) => (
    <AppLayout>
        {/* <h3 className="setting edit">{title} <button><Save/> Save</button></h3> */}
        <h3 className="setting">{title} <button>Edit</button></h3>
        <div className="time-setting">
            <TimeItem text="Work" value={work} />
            <TimeItem text="Short Break" value={short} />
            <TimeItem text="Long Break" value={long} />
            <TimeItem text="Round" value={round} />
        </div>
    </AppLayout>
)

export default Setting;
