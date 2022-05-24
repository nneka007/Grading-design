import "./HomePage.css";
import LoginPage from "./LoginPage";
import Base from "../base.png";
function HomePage() {
  return (
    <div className="container">
      <div className="leftside mt-52">
        <div>
          <h2 className="text-white text-4xl text-center">Assignment grading tool</h2>
          <p className="lg:ml-48 text-white">
            Grade submitted assignments automatically using pre-written test
            scripts.
          </p>
          {/* <p className="text-center text-white">
            Grade submitted assignments automatically using <br />
            pre-written test scripts
          </p> */}
        </div>
        {/* <hr className="horizontal-line "></hr>
        <h4 className="signin-below textCenter">
          Sign in below using your Citrone credentials
        </h4> */}
        <p style={{ color: "#61D0C5" }} className="mb-3 lg:ml-48 mt-12">
          Sign in below using your Citrone credentials.
        </p>
        <div className="ml-36">
          <LoginPage />
        </div>
      </div>

      <div
        className="lg:visible md:invisible sm:invisible"
        style={{
          background: `url(${Base})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>
    </div>
  );
}
export default HomePage;
