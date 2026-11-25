import AboutBento from "./components/Home/AboutBento";
import CtaBanner from "./components/Home/CtaBanner";
import Hero from "./components/Home/Hero";
import Steps from "./components/Home/Steps";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <AboutBento />
      <Steps />
      <CtaBanner />
    </div>
  );
}
