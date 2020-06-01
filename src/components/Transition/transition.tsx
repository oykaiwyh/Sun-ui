import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'


type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right'

type TransitionProps = CSSTransitionProps & {
    animation?: AnimationName,
    wrapper? :boolean
}
  

const Transition: React.FC<TransitionProps> = (props) => {
    const {
      children,
      classNames,
      appear,
      animation,
      unmountOnExit,
      wrapper,
      ...restProps
    } = props
    return (
      <CSSTransition
        appear
        unmountOnExit
        classNames = {classNames ? classNames: animation}
        {...restProps}
      >
          {/* {children} */}
          {wrapper ? <div>{children}</div> : children}
      </CSSTransition>
    )
}
Transition.defaultProps = {
    unmountOnExit: true,
    appear: true,
}
  
export default Transition