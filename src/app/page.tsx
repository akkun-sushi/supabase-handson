import "./style/home.css";
import Email from "./components/Email";
import Google from "./components/Google";
import Twitter from "./components/Twitter";
import Github from "./components/Github";

export default function Home() {
  return (
    <main>
      <div className="container_top">
        <Email />
      </div>
      <div className="container_bottom">
        <div className="container_left">
          <Google />
        </div>
        <div className="container_middle">
          <Twitter />
        </div>
        <div className="container_right">
          <Github />
        </div>
      </div>
    </main>
  );
}
