import StartContain from "../contains/views/Start";
import FocusContain from "../contains/views/Focus";
import BlockContain from "../contains/views/Block";
import OptionContain from "../contains/views/Option";

import Option from "./Option";

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
        path: "/option",
        comp: OptionContain,
        display: Option
    }
]

export default path;
