import './App.css';
import PrimaryTopNav from "./Components/TopNav/PrimaryTopNav";
import HeroImage from "./Components/Hero/HeroImage"
import LoremIpsum from "./Components/Utilities/LoremIpsum";
function App() {
    return (
        <div>
            <PrimaryTopNav/>
            <main>
                <HeroImage href="Modern-kitchen-interior-banner.jpeg" header="Roommate++"/>
                <div className="container pt-5">
                    <div className="row g-5">
                        <div className="col-md-5 d-flex align-items-center">
                            <div className="text-center ">
                                <h3>What is Roommate++</h3>
                                <LoremIpsum/>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <img className="img-fluid" src="/Images/List.png" alt="List graphic"/>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;