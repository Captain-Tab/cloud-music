import React from 'react'
import cx from 'classnames'

interface IProps {
    className?: string;
    type: string;
    onClick?: (args: any) => any;
    color?: string
}

const Index = (props: IProps): JSX.Element =>  {
    const { className, type, onClick, color } = props
    return <i  style={{color: color}}
               onClick={onClick}
               className={cx({
                        [`iconfont icon-${type}`]: true,
                        [`${className}`]: !!className
                    })}
    />
}

export default Index

