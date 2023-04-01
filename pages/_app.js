import '../pages/style.css';
import Table from '../components/Table';


export default function MyApp({ Component, pageProps }) {
  return <><Component {...pageProps} />
  <Table/>
   </>;
}