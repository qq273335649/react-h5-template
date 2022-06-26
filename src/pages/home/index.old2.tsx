import styles from './index.less';
import { useEffect, useRef, useState } from 'react';
import { Image } from 'antd-mobile'

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
  const [flexdata, setFlexData] = useState<dataItem[][]>([[]]);
  const [data, setData] = useState<dataItem[]>([]);
  const flagRef = useRef<boolean>(false);
  const colList = useRef<HTMLDivElement[]>([]);
  function getRef(dom: HTMLDivElement) {
    dom && colList.current.push(dom)
  }

  useEffect(() => {
    //初始化
    let timer = setTimeout(() => {
      console.log('初始化');
      setData(list);
      setFlexData([list]);
      flagRef.current = true
    }, 1000)
    return () => {
      timer && clearTimeout(timer);
    }
  }, [])
  useEffect(() => {
    console.log(123456);
    console.log(flexdata, 'flexdata');
    if (flagRef.current) {
      console.log(document.querySelectorAll('.item')[0]?.clientHeight);
      let newFlexlist: dataItem[][] = [[], []];
      let heightArr = [0, 0];
      data.map((v, i) => {
        const clientHeight = document.querySelectorAll('.item')[i]?.clientHeight;
        if (heightArr[1] < heightArr[0]) {
          newFlexlist[1].push(v);
          heightArr[1] += clientHeight
        } else {
          newFlexlist[0].push(v);
          heightArr[0] += clientHeight
        }
      });
      console.log(newFlexlist, "newFlexlist");
      setFlexData([...newFlexlist]);
      flagRef.current = false;
    }
  }, [flexdata]);
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
          //加载更多
          setTimeout(() => {
            console.log('加载更多');
            let newFlexlist = flexdata;
            newFlexlist[0] = flexdata[0].concat(list);
            setData(data.concat(list));
            setFlexData([...newFlexlist]);
            flagRef.current = true
          }, 100)
        }}>加载更多</div>
        {/* <RM /> */}
      </div>
    </div>
  );
};

export default Index;
