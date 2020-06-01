import React, { FC } from 'react';
import Button , { ButtonType , ButtonSize } from './components/button/button'
import Menu  from './components/Menu/menu'
import MenuItem  from './components/Menu/menuItem'
import SubMenu  from './components/Menu/subMenu'
import Icon  from './components/Icon/icon'
import { library } from '@fortawesome/fontawesome-svg-core'
// import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons' // fas为所有图标的集合

// library.add( faCheckSquare, faCoffee)
library.add( fas )

const App:React.FC = () =>{
  return (
    <div>
      <div>
        {/* 封装的button */}
        <h2>Button 组件</h2>
        <Button  autoFocus className='aaa'> default button </Button>
        <Button disabled > default button </Button>
        <Button size={ButtonSize.Large}> large button </Button>
        <Button size={ButtonSize.Small}> small button </Button>
        <Button btnType={ButtonType.Primary}> primary button </Button>
        <Button btnType={ButtonType.Danger}> danger button </Button>
        <Button btnType={ButtonType.Link} href="https://www.baidu.com" target='_blank'> link button </Button>
        <Button btnType={ButtonType.Link} href="https://www.baidu.com" disabled> link button </Button>
        <Button>Hello</Button>
      </div>
      <div>
        <h2>Menu 组件</h2>
        <Menu mode='vertical' onSelect={(index) => {alert(index)}} defaultOpenSubMenus={['4']}>
          <MenuItem> 0 </MenuItem>
          <MenuItem  disabled> 1 </MenuItem>
          <MenuItem > 2 </MenuItem>
          <MenuItem> 3 </MenuItem>
          <SubMenu title="submen"> 
            <MenuItem> 422222222 </MenuItem>
            <MenuItem> 5 </MenuItem>
          </SubMenu>
        </Menu>
      </div>
      <div>
        <h2>Icon 组件</h2>
        <Icon icon="coffee" theme="danger" size="10x"></Icon>
      </div>

    </div>
  );
}


export default App;
