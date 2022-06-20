import "./HomePage.css";
import LoginPage from "./LoginPage";
import Base from "../base.png";
function HomePage() {
  return (
    <div className="flex flex-row bg-primary h-screen">
      <div className="w-1/2 mt-56">
        <div>
          <h2 className="text-white text-4xl text-center">Assignment grading tool</h2>
          <p className="lg:ml-48 text-white text-center">
            Grade submitted assignments automatically using pre-written test
            scripts.
          </p>
        </div>
        <p style={{ color: "#61D0C5" }} className="mb-3 lg:ml-48 mt-5 text-center">
          Sign in below using your Citrone credentials.
        </p>
        <div className="bg-white">
          <LoginPage />
        </div>
      </div>

      <div
        className="lg:visible md:invisible sm:invisible"
        style={{
          background: `url(${Base})`,
          width: '50%',
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>
    </div>
  );
}
export default HomePage;
