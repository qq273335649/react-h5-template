import styles from './index.less';
import { useEffect, useRef, useState } from 'react';
import { Image } from 'antd-mobile'
import ImagList from './imglist';
const list = [{
  url: "https://t7.baidu.com/it/u=3631608752,3069876728&fm=193&f=GIF",
  height: 251,
  index: 1,
}, {
  url: "https://t7.baidu.com/it/u=1699747003,4225413511&fm=193&f=GIF",
  height: 111,
  index: 2,
}, {
  url: "https://t7.baidu.com/it/u=352502701,346286041&fm=193&f=GIF",
  height: 223,
  index: 3,
}, {
  url: "https://t7.baidu.com/it/u=1699747003,4225413511&fm=193&f=GIF",
  height: 111,
  index: 4,
}, {
  url: "https://t7.baidu.com/it/u=1699747003,4225413511&fm=193&f=GIF",
  height: 111,
  index: 5,
},
  // {
  //   url: "https://t7.baidu.com/it/u=352502701,346286041&fm=193&f=GIF",
  //   height: 223,
  //   index: 6,
  // }, {
  //   url: "https://t7.baidu.com/it/u=1699747003,4225413511&fm=193&f=GIF",
  //   height: 111,
  //   index: 7,
  // }, {
  //   url: "https://t7.baidu.com/it/u=1699747003,4225413511&fm=193&f=GIF",
  //   height: 111,
  //   index: 8,
  // }, {
  //   url: "https://t7.baidu.com/it/u=1699747003,4225413511&fm=193&f=GIF",
  //   height: 111,
  //   index: 9,
  // }, {
  //   url: "https://t7.baidu.com/it/u=1699747003,4225413511&fm=193&f=GIF",
  //   height: 111,
  //   index: 10,
  // }
]

interface dataItem {
  url: string;
  height: number;
  index: number;
}

const Index = () => {
  let itemlength = 2;
  let loadedImg = useRef({});
  const [data, setData] = useState<dataItem[]>([]);
  const [flexdata, setFlexData] = useState<dataItem[][]>([[]]);
  const colList = useRef<HTMLDivElement[]>([]);
  function getRef(dom: HTMLDivElement) {
    dom && colList.current.push(dom)
  }

  const load = useRef<boolean>(false);
  useEffect(() => {
    let timer = setTimeout(() => {
      setData(list);
      console.log('初始化');
    }, 1000)
    return () => {
      timer && clearTimeout(timer);
    }
  }, [])
  useEffect(() => {
    function setdata(data: dataItem[]) {
      let newFlexData = flexdata.map((v, i) => i === 0 ? data : v);
      console.log(data);
      console.log(newFlexData, 'newFlexData');
      console.log('data改变二次初始化');
      setFlexData(newFlexData);
      load.current = true;
    }
    if (data.length > 0) {
      setdata(data);
    }
  }, [data])
  console.log(flexdata, 'flexdata');
  const flag = useRef(false);
  useEffect(() => {
    if (load.current && colList.current.length > 0) {
      const heightArr = [0, 0];
      let fdata: dataItem[][] = Array.from({ length: itemlength }).map(() => []);
      console.log('dom渲染完');
      const doms = document.querySelectorAll('.item');
      doms.forEach((v) => {
        console.log(v.clientHeight, 'clientHeight123');
      })
      data.map((v, i) => {
        const height = doms[i]?.clientHeight || 0;
        if (heightArr[0] > heightArr[1]) {
          fdata[1].push(v);
          heightArr[1] += height;
        } else {
          fdata[0].push(v);
          heightArr[0] += height;
        }
      })
      console.log(fdata);
      // console.log(colList.current);
      // setFlexData([...fdata]);
      // load.current = false;
    }
  });
  console.log('test');
  return (
    <div className={styles.home} onClick={() => {
      let oItems = document.querySelectorAll('.item');
    }}>
      <div className="list">
        <div
          className={styles.flex}
          style={{ display: "flex" }}
        >
          {
            flexdata.map((v, i) => {
              return <div key={i} className={styles.col}>{
                v.map((m, n) => <div className={"item"} ref={getRef} key={`${m.index}${n}`} style={{ position: 'relative' }}>
                  <Image className='img1' lazy src={m.url} alt="" />
                  <span style={{ position: 'absolute', left: 0, top: 0, color: 'white' }}>{m.index}</span></div>)
              }</div>
            })
          }
        </div>
        <div onClick={() => {
          colList.current = [];
          setData(data.concat(list));
        }}>加载更多</div>
        {/* <RM /> */}
      </div>
    </div>
  );
};

export default Index;
