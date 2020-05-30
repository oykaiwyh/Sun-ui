import React from 'react'
import classNames from 'classnames'

export enum ButtonSize {
    Large = 'lg',
    Small = 'sm'
}

export enum ButtonType {
    Primary = 'primary',
    Default = 'default',
    Danger = 'danger',
    Link = 'link'
}

interface BaseButtonProps {
    className ? : string ;
    disabled ? :boolean ;
    size ? : ButtonSize;
    btnType ? : ButtonType ;
    children : React.ReactNode ; 
    href ? : string;
}

// 结合button和a标签元素上自身的属性
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type NativeAProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>

export type ButtonProps = Partial< NativeButtonProps & NativeAProps >



const Button : React.FunctionComponent<ButtonProps> = (props) => {
    const { btnType , disabled , size , children , href , className, ...restProps  } = props
    
    //btn , btn-lg , btn-primary
    const classes = classNames('btn', className,{
        [`btn-${btnType}`] : btnType,
        [`btn-${size}`] : size,
        'disabled' : (btnType === ButtonType.Link ) && disabled
    })
    if ( btnType === ButtonType.Link && href) {
        return (
            <a className={classes} href={href} {...restProps}>{children}</a>
        )
    }else{
        return (
            <button className={classes} disabled={disabled}  {...restProps}>{children}</button>
        )
    }

}

Button.defaultProps = {
    disabled : false,
    btnType : ButtonType.Default
}

export default Button
