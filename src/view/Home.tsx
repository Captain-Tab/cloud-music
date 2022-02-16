import React from "react";

const Home = (props: any) : JSX.Element => {
    console.log('props', props)
    return <div>Home</div>
}

export default React.memo(Home)
