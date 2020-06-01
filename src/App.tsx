import React, { FC, useState } from 'react';
import Button  from './components/button/button'
import Menu  from './components/Menu/menu'
import MenuItem  from './components/Menu/menuItem'
import SubMenu  from './components/Menu/subMenu'
import Icon  from './components/Icon/icon'
import Transition from './components/Transition/transition'

import { library } from '@fortawesome/fontawesome-svg-core'
// import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons' // fas为所有图标的集合

// library.add( faCheckSquare, faCoffee)
library.add( fas )

const App:React.FC = () =>{
  const [ transate , settransate ] = useState(false)
  return (
    <div>
      <div>
        {/* 封装的button */}
        <h2>Button 组件</h2>
        <Button  autoFocus className='aaa'> default button </Button>
        <Button disabled > default button </Button>
        <Button size={'lg'}> large button </Button>
        <Button size={'sm'}> small button </Button>
        <Button btnType={'primary'}> primary button </Button>
        <Button btnType={'danger'}> danger button </Button>
        <Button btnType={'link'} href="https://www.baidu.com" target='_blank'> link button </Button>
        <Button btnType={'link'} href="https://www.baidu.com" disabled> link button </Button>
        <Button>Hello</Button>
      </div>
      <div>
        <h2>Menu 组件</h2>
        <Menu mode='horizontal' onSelect={(index) => {alert(index)}} defaultOpenSubMenus={['4']}>
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
        <Icon icon="coffee" theme="primary" size="10x"></Icon>
      </div>
      <div>
        <h2>Transate 组件</h2>
        <Button size={'lg'} onClick={()=>{settransate(!transate)}} > 动画 </Button>
        <Transition in={transate} timeout={300} animation='zoom-in-left' appear={true} unmountOnExit={true}>  
          <div>
            <p>this is world</p>
            <p>this is world</p>
            <p>this is world</p>
          </div>
        </Transition>
        <Transition in={transate} timeout={300} animation='zoom-in-left' wrapper={true}>  
          <Button btnType={'primary'}> primary button </Button>
        </Transition>
      </div>

    </div>
  );
}


export default App;
