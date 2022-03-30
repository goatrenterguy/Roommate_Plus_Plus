import './HeroImage.css';

function HeroImage(props) {
    const HeroImageStyle = {
        backgroundImage: 'url(./Images/' + props.href + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
        backgroundPosition: "50% 50%",
        width: '100%',
        height: '350px',
    };
    let header = null
    let text = null
    if (props.header !== undefined) {
        header = <h1 className="h1">{props.header}</h1>
    }
    if (props.text !== undefined) {
        text = <p>{props.text}</p>
    }
    return(
        <div className="container-fluid HeroImage position-relative" style={HeroImageStyle}>
            <div className="bg-light position-absolute bottom-0 start-0 mb-3 ms-3 p-2" >
                {header}
                {text}
            </div>
        </div>
    );
}

export default HeroImage;