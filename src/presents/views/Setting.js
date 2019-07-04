import React from "react";
import AppLayout from "../layout/AppLayout";
import "../../assets/css/Setting/setting.css";

import {ReactComponent as Save} from "../../assets/icon/save.svg";
import {ReactComponent as Check} from "../../assets/icon/check.svg";
import {ReactComponent as Uncheck} from "../../assets/icon/uncheck.svg";
import {ReactComponent as Add} from "../../assets/icon/add.svg";
import {ReactComponent as Minus} from "../../assets/icon/minus.svg";

const TimeItem = ({text, value}) => (
    <div className="timeItem">
        <span>{text}</span>
        <div>
            <Add />
            <span>{value}</span>
            <Minus />
        </div>
    </div>
)

const CheckItem = ({text}) => (
    <div className="checked">
        <Check />
        <span>{text}</span>
    </div>
)

const UncheckItem = ({text}) => (
    <div>
        <Uncheck />
        <span>{text}</span>
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
        <div className="app-setting">
            <UncheckItem text="Run on window startup" />
            <CheckItem text="Minimize to system tray" />
        </div>
    </AppLayout>
)

export default Setting;
