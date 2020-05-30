import  React from 'react'

import { render , fireEvent} from '@testing-library/react'

import Button , { ButtonType , ButtonProps , ButtonSize } from './button'

const defaultEvent  ={
    onClick:jest.fn()
}
const testProps: ButtonProps = {
    btnType: ButtonType.Primary,
    size: ButtonSize.Large,
    className: 'klass'
}

const disabledProps: ButtonProps = {
    disabled: true,
    onClick: jest.fn(),
}

// 测试用例分类
describe(' test button components ' , () => {
    it('shoud render the correct default button ' , () =>{
        const wrapper  = render(<Button {...defaultEvent}>Test</Button>)
        // const elelment = wrapper.queryByText('Test')
        const elelment = wrapper.getByText('Test') as HTMLButtonElement
        // expect(elelment).toBeTruthy()
        // expect(elelment).toBeInTheDOM() //toBeInTheDOM 已被弃用

        expect(elelment.disabled).toBeFalsy()
        

        expect(elelment).toBeInTheDocument()
        expect(elelment.tagName).toEqual('BUTTON')
        expect(elelment).toHaveClass('btn btn-default')

        // 事件调用
        fireEvent.click(elelment)
        expect(defaultEvent.onClick).toHaveBeenCalled()


    })
    it('shoud render the correct base on different props ' , () =>{
        const wrapper = render(<Button {...testProps}>Nice</Button>)
        const element = wrapper.getByText('Nice')
        expect(element).toBeInTheDocument()
        expect(element).toHaveClass('btn-primary btn-lg klass')
    })
    it('should render a link when btnType equals link and href is provided ' , () =>{
        const wrapper = render(<Button btnType={ButtonType.Link} href="http://dummyurl">Link</Button>)
        const element = wrapper.getByText('Link')
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('A')
        expect(element).toHaveClass('btn btn-link')
    })
    it('should render disabled button when disabled set to true', () => {
        const wrapper = render(<Button {...disabledProps}>Nice</Button>)
        const element = wrapper.getByText('Nice') as HTMLButtonElement
        expect(element).toBeInTheDocument()
        expect(element.disabled).toBeTruthy()
        fireEvent.click(element)
        expect(disabledProps.onClick).not.toHaveBeenCalled()
    })
})

