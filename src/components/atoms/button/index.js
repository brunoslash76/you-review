import './styles.css'

export const Button = (props) => {
    const { children, kind } = props
    return (
        <button 
            className={kind}
            {...props}
        >
            {children}
        </button>
    )
}