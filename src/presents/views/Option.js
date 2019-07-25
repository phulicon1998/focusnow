import React from "react";
import AppLayout from "../../contains/layout/AppLayout";
import "../../assets/css/Option/option.css";

import {ReactComponent as Save} from "../../assets/icon/save.svg";
import {ReactComponent as Check} from "../../assets/icon/check.svg";
import {ReactComponent as Uncheck} from "../../assets/icon/uncheck.svg";
import {ReactComponent as Add} from "../../assets/icon/add.svg";
import {ReactComponent as Minus} from "../../assets/icon/minus.svg";

const TimeItem = ({add, min, edit, text, value, name}) => (
    <div className="timeItem">
        <span>{text}</span>
        <div>
            {edit && <Add onClick={add.bind(this, name, value)}/>}
            <span>{value}</span>
            {edit && <Minus onClick={min.bind(this, name, value)}/>}
        </div>
    </div>
)

const CheckItem = ({text, check, name, doCheck}) => (
    <div className={check ? "checked" : ""} onClick={doCheck.bind(this, name)}>
        {check ? <Check /> : <Uncheck />}
        <span>{text}</span>
    </div>
)

const Option = ({title, work, short, long, round, edit, doEdit, save, onStart, minimize, add, min, doCheck, ...props}) => (
    <AppLayout {...props}>
        <h3 className="option">{title}</h3>
        <div className="time-setting">
            <TimeItem
                text="Work"
                value={work}
                edit={edit}
                name="work"
                add={add}
                min={min}
            />
            <TimeItem
                text="Short Break"
                value={short}
                edit={edit}
                name="short"
                add={add}
                min={min}
            />
            <TimeItem
                text="Long Break"
                value={long}
                edit={edit}
                name="long"
                add={add}
                min={min}
            />
            <TimeItem
                text="Round"
                value={round}
                edit={edit}
                name="round"
                add={add}
                min={min}
            />
            {
                edit
                ? <button onClick={save.bind(this, undefined)}><Save/> Save changes</button>
                : <button onClick={doEdit.bind(true)}>Edit time number here...</button>
            }
        </div>
        <div className="app-setting">
            <CheckItem
                text="Run on window startup"
                name="onStart"
                check={onStart}
                doCheck={doCheck}
            />
            <CheckItem
                text="Minimize to system tray"
                name="minimize"
                check={minimize}
                doCheck={doCheck}
            />
        </div>
    </AppLayout>
)

export default Option;
