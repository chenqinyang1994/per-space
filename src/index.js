import React from 'react';
import ReactDOM from 'react-dom';
import './l.less';
import Tharu from './Tharu.jpg';
import Nv from './nv.jpeg';

ReactDOM.render(<div>
    <h2 className='rcrc'>h2h2h2</h2>
    <div className="aaa">
        <img src={Tharu} alt="Tharu"/>
        <img onClick={()=>{import('./a')}} src={Nv} alt="Nv"/>
    </div>
</div>, document.getElementById('root'));

if(module.hot){
    module.hot.accept();
}