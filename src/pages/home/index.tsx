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
    const [data, setData] = useState<dataItem[]>([]);
    const contRef = useRef<HTMLDivElement | null>(null);
    const imgspans = useRef<{ height: number, index: number }[]>([]);
    const flagRef = useRef<boolean>(false);
    useEffect(() => {
        let timer = setTimeout(() => {
            setData(list);
            flagRef.current = true;
        }, 1000)
        return () => {
            timer && clearTimeout(timer);
        }
    }, [])
    const EListener = () => {
        if (imgspans.current.length === data.length) {
            console.log(imgspans.current);
            // setData([]);
        }
    }
    useEffect(() => {
        window.addEventListener('myevent', EListener)
        return () => {
            window.removeEventListener('myevent', EListener);
        }
    }, [data])
    return (
        <div className={styles.home} onClick={() => {
        }}>
            <div className="list">
                <div
                    ref={contRef}
                    className={styles.relative}
                >
                    {
                        data.map((v, i) => {
                            return (<div key={`${v.index}${i}`} className={styles.item}>
                                <Image className='img1' lazy src={v.url} alt=""
                                    onLoad={e => {
                                        const { height, width } = e.currentTarget;
                                        imgspans.current.push({ height: (167.5 / width) * height, index: i });
                                        window.dispatchEvent(new Event('myevent'));
                                    }}
                                />
                            </div>)
                        })
                    }
                </div>
                <div onClick={() => {
                    flagRef.current = true;
                    //加载更多
                    setData(data.concat(list));
                }}>加载更多</div>
                {/* <RM /> */}
            </div>
        </div>
    );
};

export default Index;
