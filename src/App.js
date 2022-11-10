import logo from './logo.svg';
import { useEffect, useState } from 'react';
import { Tabs, Typography } from 'antd';
import Deposit from './components/Deposit';
import './App.less';
import Prize from './components/Prize';
const { Title } = Typography;

function App() {

  const [poolContract, setPoolContract] = useState();
  const [generalInfo, setGeneralInfo] = useState();

  const setupPoolContract = async () => {
      const pc = await        
      window.tronWeb.contract().at('TNRmUiD22YytRhqAbosQWL7uyqS5D4Rm4T');
      setPoolContract(pc);
  }

  const getGeneralInfo = async () => {
    if (poolContract) {
      const gi  = await poolContract.generalInfo().call();
      setGeneralInfo(gi);
    }
  }

  useEffect(() => {
    setupPoolContract();
  }, []);

  useEffect(() => {
    getGeneralInfo();
  }, [poolContract]);

  const items = [
    { label: 'Deposit', key: 'depoist', children: <Deposit poolContract={poolContract} generalInfo={generalInfo} /> }, // 务必填写 key
    { label: 'Prizes', key: 'prizes', children: <Prize generalInfo={generalInfo} poolContract={poolContract} /> },
  ];

  return (
    <div className="App">
       <div className="logo">
            <Title level={6} style={{ margin: "0 0.5rem 0 0" }}>
              <img alt="logo" style={{ width: "60px", marginRight: "8px" }} src="/logo.png" /> Tron Prize Pool
            </Title>
        </div>
      {poolContract ? <Tabs items={items} /> : <div style={{textAlign: "center"}}>Please refresh to connect to TRON Nile Testnet first</div>}
    </div>
  );
}

export default App;
