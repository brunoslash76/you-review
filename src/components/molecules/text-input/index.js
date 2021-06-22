import './styles.css'

export const TextInput = (props) => {
    const { error } = props
    return (
        <div className="text-input--container">
            <input
                {...props}
            />
            <div className="text-input--error" data-testId="error-message" >{error && error}</div>
        </div>
    )
}