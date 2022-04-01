function FormErrorMsg( {condition = false, text = "Placeholder error msg"} ) {
    if (!condition) {
        return (
            <div className="invalid-feedback d-block">
                <p>{text}</p>
            </div>
        );
    } else {
        return (null);
    }
}

export default FormErrorMsg;