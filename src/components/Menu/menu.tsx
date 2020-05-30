import React ,{ useState , createContext} from 'react'

import classNames from 'classnames'
import { MenuItemProps } from './menuItem'


// 自变量
type MenuMode = 'horizontal' | 'vertical'
type SelectCallbacl = (selectedIndex:number) => void
export interface MenuProps{
    defaultIndex?:number;
    className?:string;
    mode?:MenuMode;
    style?:React.CSSProperties;
    onSelect?:SelectCallbacl
}

interface IMenuContext {
    index : number;
    onSelect ? : SelectCallbacl;
    mode ? : MenuMode
}

export const MenuContext = createContext<IMenuContext>({index:0})

const Menu:React.FC<MenuProps> = (props) =>{
    // console.log(props);

    
    const { className , mode , style , children , defaultIndex , onSelect} = props

    const [ curentActive , setActive ] = useState(defaultIndex)
    const handleClick = (index:number) => {
        setActive(index)
        if (onSelect) {
            onSelect(index)
        }
    }
    const passedContext :IMenuContext = {
        index : curentActive ?  curentActive : 0 , 
        onSelect:handleClick,
        mode : mode
    }

    const classes = classNames('sunui-menu' , className ,{
        'menu-vertical':mode==='vertical',
        'menu-horizontal' : mode !== 'vertical'
    })

    const  renderChildren = () =>{
        return React.Children.map(children,(child,index) => {
            // child.type 拿不到displayNname属性
            // https://zh-hans.reactjs.org/docs/react-api.html#reactchildren
            // console.log(child);
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const { displayName } = childElement.type
            if ( displayName === 'MenuItem' || displayName === 'SubMenu' )  {
                // return child
                // console.log('2',child);
                return React.cloneElement(childElement,{
                    index
                })
            }else{
                console.log('Waring');
            }
            // console.log(childElement);
            

        })
    }

    return (
        <MenuContext.Provider value={passedContext}>
            <ul className = { classes } style = { style} data-testid='test-menu'>
                {/* {children} */}
                {renderChildren()}
            </ul>
        </MenuContext.Provider>
    )
}

Menu.defaultProps = {
    defaultIndex:0,
    mode:'horizontal'
}

export default  Menu
