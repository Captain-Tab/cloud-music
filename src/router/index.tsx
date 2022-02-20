import { useRoutes } from "react-router";
import React from "react";
import Recommend from "../view/recommend";
import Artists from "../view/artists";
import Rank from "../view/rank"
import TopBar from "../component/layout/TopBar";

const withLayout = (page: React.ReactElement) =>{
    return <TopBar>{page}</TopBar>
}

export default function Router () {
    return useRoutes([
        { path: '/', element: withLayout(<Recommend />)},
        { path: "/artists", element: withLayout(<Artists />) },
        { path: "/rank", element: withLayout(<Rank />)},
        // ...
    ])
}



