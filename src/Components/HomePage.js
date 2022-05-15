import './HomePage.css'
import LoginPage from'./LoginPage';
import Base from '../base.png'
function HomePage() {
    return (
        <div className='container'>
            <div className="leftside" >
                <div>
                    <h2 className='stutern'>STUTERN</h2>
                </div>
                <div>
                    <h1 className='assignment-grading textCenter'>Assignment grading tool</h1>
                    <p className='long-gist textCenter'>Grade submitted assignments automatically using <br />pre-written test scripts</p>
                </div>
                <hr className='horizontal-line '></hr>
                <h4 className='signin-below textCenter'>Sign in below using your Citrone credentials</h4>
                    <LoginPage/>
            </div>
            

            <div style={{background: `url(${Base})`,backgroundRepeat: "no-repeat",backgroundPosition: "center",backgroundSize: "cover"}}>

            </div>

        </div>
    );
}
export default HomePage;