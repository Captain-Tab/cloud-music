import { useRoutes } from "react-router";
import React from "react";
import Recommend from "../view/recommend";
import Artists from "../view/artists";
import Rank from "../view/rank"
import Album from "../view/album";
import TopBar from "../component/layout/TopBar";
import Artist from "../view/artist";
import Search from "../view/search";

const withLayout = (page: React.ReactElement) =>{
    return <TopBar>{page}</TopBar>
}

export default function Router () {
    return useRoutes([
        { path: '/', element: withLayout(<Recommend />) },
        {
          path: '/artists', element: withLayout(<Artists />),
            children: [{ path: ':id', element: <Artist /> }]
        },
        { path: '/recommend', element: withLayout(<Recommend />),
            children: [ { path: ':id', element: <Album /> } ]
        },
        { path: '/rank', element: withLayout(<Rank />),
            children: [ { path: ':id', element: <Album /> } ]
        },
        {
            path: '/search', element: withLayout(<Search />),
            children: [{ path: ':id', element: <Search /> }]
        },
        // ...
    ])
}
