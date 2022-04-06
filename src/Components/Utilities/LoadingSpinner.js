function LoadingSpinner(props){
    return(
        <div className="h-25 text-center">
            {props.text ? <p>{props.text}</p> : null}
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}

export default LoadingSpinner;