import StartContain from "../contains/views/Start";
import FocusContain from "../contains/views/Focus";
import BlockContain from "../contains/views/Block";
import SettingContain from "../contains/views/Setting";

import Setting from "./Setting";

const path = [
    {
        path: "/",
        comp: StartContain,
        exact: true,
        display: {}
    },
    {
        path: "/focus",
        comp: FocusContain,
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
