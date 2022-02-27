import React from 'react'
import cx from 'classnames'

interface IProps {
    className?: string;
    type: string;
    onClick?: (args: any) => any;
}

const Index = (props: IProps): JSX.Element =>  {
    const { className, type, onClick } = props

    return <i  className={cx({
        [`iconfont icon-${type}`]: true,
        [`${className}`]: !!className
    })} onClick={onClick}
    />
}

export default Index

