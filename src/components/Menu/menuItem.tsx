import React , { createContext, useContext } from 'react'
import classNames from 'classnames'
import { MenuProps } from './menu'
import { MenuContext } from './menu'

export interface MenuItemProps {
    index ? : number;
    disabled ? : boolean;
    className ? : string;
    style ? : React.CSSProperties;
}


const MenuItem:React.FC<MenuItemProps> = (props) =>{

    const { index , disabled , className , style , children } = props
    const context = useContext(MenuContext)
    const classes = classNames( 'menu-item' , className , {
        'is-disabled':disabled,
        'is-active':context.index === index
    })
    
    const handleClick = () =>{
        if (context.onSelect && !disabled && (typeof index === "number") ) {
            context.onSelect(index)
        }
    }

    return(
        <li className={classes} style={style} onClick={handleClick}>{children}</li>
    )
}
MenuItem.displayName = 'MenuItem' // 定义组件的签名/名称


export default MenuItem