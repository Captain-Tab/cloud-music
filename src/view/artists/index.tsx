import React from "react";

const Artists = (props: any) : JSX.Element => {
    console.log('props', props)
    return <div>Artists</div>
}

export default React.memo(Artists)
