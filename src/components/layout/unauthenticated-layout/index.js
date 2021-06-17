import './styles.css'

export const UnauthenticatedLayout = (props) => {
    const { children } = props

    return (
        <div className="wrapper">
            <div className="container">
                <h1>You Review</h1>
                <section className="content">

                    {children}
                </section>
            </div>  
        </div>
    )
}