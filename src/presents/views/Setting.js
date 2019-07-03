import React from "react";
import AppLayout from "../layout/AppLayout";
import "../../assets/css/Setting/setting.css";

const TimeItem = ({text, value}) => (
    <div className="timeItem">
        <span>{text}</span>
        <span>{value}</span>
    </div>
)

const Setting = ({title, work, short, long, round}) => (
    <AppLayout>
        {/* <div> */}
            <h3 className="title">{title}</h3>
            <div>
                <TimeItem text="Work" value={work} />
                <TimeItem text="Short Break" value={short} />
                <TimeItem text="Long Break" value={long} />
                <TimeItem text="Round" value={round} />
                <p>a</p>
                <p>a</p>
                <p>a</p>
                <p>a</p>
                <p>a</p>
                <p>a</p>
                <p>a</p>
                <p>a</p>
                <p>a</p>
                <p>a</p>
                <p>a</p>
                <p>a</p>
                <p>a</p>
                <p>a</p>
            </div>
        {/* </div> */}

    </AppLayout>
)

export default Setting;
