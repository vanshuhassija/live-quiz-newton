import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import HomeScreen from "../screens/Home";
import { withApollo } from '../lib/apollo';

 function Home() {
  return (
    <div >
      <HomeScreen />;
    </div>
  );
}

export default withApollo({ ssr: true })(Home);
