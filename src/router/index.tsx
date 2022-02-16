import { useRoutes } from "react-router";
import React from "react";
import Home from "../view/Home";
import Recommend from "../view/recommend";
import Artists from "../view/artists";
import Rank from "../view/rank"

export default function Router () {
    return useRoutes([
        { path: "/", element: <Home /> },
        { path: "/recommend", element: <Recommend /> },
        { path: "/artists", element: <Artists /> },
        { path: "/rank", element: <Rank /> },
        // ...
    ])
}



