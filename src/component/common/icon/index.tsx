import React from 'react'
import cx from 'classnames'

interface IProps {
    className?: string;
    type: string;
}

const Index = (props: IProps): JSX.Element =>  {
    const { className, type } = props
    return <i  className={cx({
        [`iconfont icon-${type}`]: true,
        [`${className}`]: !!className
    })} />
}

export default Index

