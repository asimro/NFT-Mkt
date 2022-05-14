import './App.css';
import { Connection } from './components/main';
import { MintTrax } from './components/mint';
import { TransferTrax } from './components/transfer';
import { ApproveTrax } from './components/approve';
import { TransferFromTrax } from './components/transferFrom';
import 'bootstrap/dist/css/bootstrap.css'

function App() {
  return (
    <div class="d-flex justify-content-center">
      <div >

        <Connection />
        <MintTrax />
        <TransferTrax />
        <ApproveTrax />
        <TransferFromTrax />

        <br /><br />
      </div>
    </div>
  );
}

export default App;
