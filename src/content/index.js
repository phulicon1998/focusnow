import MainContain from "../contains/views/Main";
import StartContain from "../contains/views/Start";
import BlockContain from "../contains/views/Block";

const path = [
    {
        path: "/",
        component: MainContain,
        exact: true
    },
    {
        path: "/start",
        component: StartContain
    },
    {
        path: "/block",
        component: BlockContain
    },
    {
        path: "/setting",
        component: BlockContain
    }
]

export default path;
