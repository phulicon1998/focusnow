import MainContain from "../contains/views/Main";
import StartContain from "../contains/views/Start";
import BlockContain from "../contains/views/Block";
import SettingContain from "../contains/views/Setting";

import Setting from "./Setting";

const path = [
    {
        path: "/",
        comp: MainContain,
        exact: true,
        display: {}
    },
    {
        path: "/start",
        comp: StartContain,
        display: {}
    },
    {
        path: "/block",
        comp: BlockContain,
        display: {}
    },
    {
        path: "/setting",
        comp: SettingContain,
        display: Setting
    }
]

export default path;
