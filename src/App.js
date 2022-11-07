import logo from './logo.svg';
import { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import Deposit from './components/Deposit';
import './App.less';

function App() {

  const [poolContract, setPoolContract] = useState();
  const [generalInfo, setGeneralInfo] = useState();

  const setupPoolContract = async () => {
      const pc = await        
      window.tronWeb.contract().at('TL2u1mr95NeRg4rSHRGCfxeESdc9CEHMwM');
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
    { label: '项目 1', key: 'item-1', children: <Deposit poolContract={poolContract} generalInfo={generalInfo} /> }, // 务必填写 key
    { label: '项目 2', key: 'item-2', children: '内容 2' },
  ];

  return (
    <div className="App">
      <Tabs items={items} />
    </div>
  );
}

export default App;
