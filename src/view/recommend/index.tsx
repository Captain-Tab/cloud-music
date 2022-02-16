import React from "react";

const Recommend = (props: any) : JSX.Element => {
    console.log('props', props)
    return <div>Recommend</div>
}

export default React.memo(Recommend)
