import React from "react";

const Rank = (props: any) : JSX.Element => {
    console.log('props', props)
    return <div>Rank</div>
}

export default React.memo(Rank)
