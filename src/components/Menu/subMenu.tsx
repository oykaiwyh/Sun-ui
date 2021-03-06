import React, { useContext , useState } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'
import { clearTimeout } from 'timers'
import Icon from '../Icon/icon'
import { CSSTransition } from 'react-transition-group'
import Transition from '../Transition/transition'

export interface SubMenusProps {
    index ? : string;
    title ? : string;
    className ? : string;
}



const SubMenu:React.FC<SubMenusProps > = ({index , title , children , className}) => {
    const context = useContext(MenuContext)
    const openedSubMenus = context.defaultOpenSubMenus as Array<string>
    const isOpend = ( index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false


    const [menuOpen ,setMenuOpen ] =useState(isOpend)
    const classes = classNames('menu-item submenu-item' , className , {
        'is-active': context.index === index , 
        'is-opened' : menuOpen ,
        'is-vertical' : context.mode === 'vertical'

    })
    const handlClick = (e:React.MouseEvent) =>{
        e.preventDefault()
        setMenuOpen(!menuOpen)
    }
    let timer:any
    const handleMouse = (e:React.MouseEvent,toggle:boolean) =>{
        clearTimeout(timer)
        e.preventDefault()
        setTimeout(() => {
            setMenuOpen(toggle)
        },300)
    }
    const clickEvents = context.mode === 'vertical' ? {onClick:handlClick} :{}
    const hoverEvents = context.mode === 'horizontal' ? {
        onMouseEnter:(e:React.MouseEvent) => { handleMouse(e,true)},
        onMouseLeave:(e:React.MouseEvent) => { handleMouse(e,false)}
    } :{}
    const renderChildren = () => {
        const submenuclasses = classNames('sunui-submenu' , {
            'submenu-opened': menuOpen
        })
        const childrenCompont = React.Children.map(children,(child,subindex) => {
            const childrenElement = child as React.FunctionComponentElement<MenuItemProps>
            if (childrenElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childrenElement,{
                    index:`${index}-${subindex}`
                })
            }else{
                console.error("Waring : SubMenu has a child which is not MenuItem");
            }
        })
        return (
            // <ul className='sunui-submenu'>
            // <CSSTransition in={menuOpen} timeout={300} classNames="zoom-in-top" appear unmountOnExit>
            //     <ul className={submenuclasses}>
            //         {childrenCompont}
            //     </ul>
            // </CSSTransition>
            // 只能有一个根节点
            <Transition in={menuOpen} timeout={300} classNames="zoom-in-top" unmountOnExit appear>
                <ul className={submenuclasses}>
                    {childrenCompont}
                </ul>
            </Transition>

        )
    }
    return (
        <li key={index} className={classes} {...hoverEvents}>
            {/* <div className='submenu-title' onClick={handlClick}> */}
            <div className="submenu-title" {...clickEvents}>
                {title}
                <Icon icon="angle-down" className="arrow-icon"/>
            </div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu
