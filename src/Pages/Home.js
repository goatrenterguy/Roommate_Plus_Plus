import HeroImage from "../Components/Hero/HeroImage";
import LoremIpsum from "../Components/Utilities/LoremIpsum";

function Home() {
    return (<main>
        <HeroImage href="Modern-kitchen-interior-banner.jpeg" header="Roommate++"/>
        <div className="container pt-5">
            <div className="row g-5">
                <div className="col-md-5 d-flex align-items-center">
                    <div className="text-center">
                        <h3>What is Roommate++</h3>
                        <LoremIpsum/>
                    </div>
                </div>
                <div className="col-md-7">
                    <img className="img-fluid" src={"/Images/List.png"} alt="List graphic"/>
                </div>
            </div>
        </div>
    </main>
    );
}

export default Home;