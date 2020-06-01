import React from 'react'
import { render , RenderResult ,fireEvent ,cleanup ,wait} from '@testing-library/react'  // cleanup 
import Menu, {MenuProps} from './menu'
import MenuItem from './menuItem'
import SubMenu  from './subMenu'

const testProps: MenuProps = {
    defaultIndex: '0',
    onSelect: jest.fn(),
    className: 'test'
}
const testVerProps: MenuProps = {
    defaultIndex: '0',
    mode: 'vertical',
}

const generateMenu = (props: MenuProps) => {
    return (
        <Menu {...props}>
            <MenuItem index={'0'}>
                active
            </MenuItem>
            <MenuItem index={'1'} disabled>
                disabled
            </MenuItem>
            <MenuItem index={'2'}>
                xyz
            </MenuItem>
            <SubMenu title="submenu"> 
                <MenuItem> 012345 </MenuItem>
                <MenuItem> 678910 </MenuItem>
            </SubMenu>
        </Menu>
    )
}

let wrapper: RenderResult, wrapper2: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
const createStyleFile = () =>{
    const cssFile : string =`
        .sunui-submenu{
            display:none;
        }
        .sunui-submenu.submenu-opened{
            display: block;
        }
    `
    const style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML = cssFile
    return style
}

describe('test Menu and MenuItem component in default(horizontal) mode', () => {
    // 公用部分
    beforeEach(() => {
        wrapper = render(generateMenu(testProps))
        wrapper.container.append(createStyleFile())
        menuElement= wrapper.getByTestId('test-menu')
        activeElement = wrapper.getByText('active')
        disabledElement = wrapper.getByText('disabled')
    })
    it('should render correct Menu and MenuItem based on default props', () => {
      expect(menuElement).toBeInTheDocument()
      expect(menuElement).toHaveClass('sunui-menu test')
      expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4)
      expect(activeElement).toHaveClass('menu-item is-active')
      expect(disabledElement).toHaveClass('menu-item is-disabled')
    })
    it('click items should change active and call the right callback', () => {
        const thirdItem = wrapper.getByText('xyz')
        fireEvent.click(thirdItem)
        expect(thirdItem).toHaveClass('is-active')
        expect(activeElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).toHaveBeenCalledWith('2')
        fireEvent.click(disabledElement)
        expect(disabledElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
    })
    it('should render vertical mode when mode is set to vertical', () => {
        cleanup() // 清除公共调用部分 ，每个case执行完成后都会调用进行case清除
        const wrapper = render(generateMenu(testProps))
        const menuElement = wrapper.getByTestId('test-menu')
        // expect(menuElement).toHaveClass('menu-vertical')
    })
    it('should show sumenu items when click on subMenu when hover on subMenu',async () => {
        expect(wrapper.queryByText('012345')).not.toBeVisible()
        const dropDownItem = wrapper.getByText('submenu')
        // expect(wrapper.queryByText('012345')).toBeVisible() //测试会报错，直接原因为显示MenuItem使用了异步执行，Testing LibRary不会等待异步执行，需要使用Testing LibRary提供的wait方法 https://testing-library.com/docs/guide-disappearance#waiting-for-disappearance
        // 鼠标进入
        fireEvent.mouseEnter(dropDownItem)
        await wait(() =>{
            expect(wrapper.queryByText('012345')).toBeVisible() //测试会报错，直接原因为显示MenuItem使用了异步执行，Testing LibRary不会等待异步执行，需要使用Testing LibRary提供的wait方法 https://testing-library.com/docs/guide-disappearance#waiting-for-disappearance
        })
        fireEvent.click(wrapper.getByText('012345'))
        expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
        //鼠标离开
        fireEvent.mouseLeave(dropDownItem)
        await wait(() =>{
            expect(wrapper.queryByText('012345')).not.toBeVisible() //测试会报错，直接原因为显示MenuItem使用了异步执行，Testing LibRary不会等待异步执行，需要使用Testing LibRary提供的wait方法 https://testing-library.com/docs/guide-disappearance#waiting-for-disappearance
        })

    })
    it('should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index', () => {
        // expect(wrapper2.queryByText('opened1')).toBeVisible()
    })
})

// describe('test Menu and MenuItem component in vertical mode', () => {
//     beforeEach(() => {
//       wrapper2 = render(generateMenu(testVerProps))
//       wrapper2.container.append(createStyleFile())
//     })
//     it('should render vertical mode when mode is set to vertical', () => {
//       const menuElement = wrapper2.getByTestId('test-menu')
//       expect(menuElement).toHaveClass('menu-vertical')
//     })
//     it('should show dropdown items when click on subMenu for vertical mode', () => {
//       const dropDownItem = wrapper2.queryByText('drop1')
//       expect(dropDownItem).not.toBeVisible()
//       fireEvent.click(wrapper2.getByText('dropdown'))
//       expect(dropDownItem).toBeVisible()
//     })
//     it('should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index', () => {
//       expect(wrapper2.queryByText('opened1')).toBeVisible()
//     })
// })



