import { InfiniteScroll, Swiper, Tabs } from 'antd-mobile';
import { SwiperRef } from 'antd-mobile/es/components/swiper';
import { useEffect, useRef, useState } from 'react';
import GetPullToRefreshlData from './components/getPullToRefreshlData';
import './styles.css';

export const TabScroll = () => {
  const tabItems = [
    { key: 'fruits', title: '水果' },
    { key: 'vegetables', title: '蔬菜' },
    { key: 'animals', title: '动物' },
  ];

  const swiperRef = useRef<SwiperRef>(null);
  const swiperContTopRef = useRef<Record<string, number>>({});
  const swiperContRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const [data, setData] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState(true);
  function getNextData() {
    const ret: string[] = [];
    for (let i = 0; i < 100; i += 1) {
      ret.push(`${i}`);
    }
    return ret;
  }
  const loadMore = async () => {
    const append = await getNextData();
    setData([...data, ...append]);
    setHasMore(append.length > 0);
  };

  useEffect(() => {
    function scroll() {
      const tabscont = swiperContRef.current?.getBoundingClientRect();
      if (tabscont!.top > 0) {
        swiperContTopRef.current = {};
      } else {
        console.log('isfixed');
        swiperContTopRef.current[activeIndex] = window.scrollY;
      }
    }
    window.addEventListener('scroll', scroll);
    return () => {
      window.removeEventListener('scroll', scroll);
    };
  }, [activeIndex]);
  return (
    <div className="contentTabs" ref={(el) => (swiperContRef.current = el)}>
      <div style={{ position: 'sticky', top: 0, zIndex: 2, background: '#fff' }}>
        <Tabs
          activeKey={tabItems[activeIndex].key}
          onChange={(key) => {
            const index = tabItems.findIndex((item) => item.key === key);
            setActiveIndex(index);
            swiperRef.current?.swipeTo(index);

            const toTop = swiperContTopRef.current[index];
            setTimeout(() => {
              if (toTop === undefined) {
                swiperContRef.current?.scrollIntoView();
              } else {
                window.scrollTo({ top: toTop });
              }
            }, 100);
          }}
        >
          {tabItems.map((item) => (
            <Tabs.Tab title={item.title} key={item.key} />
          ))}
        </Tabs>
      </div>
      <Swiper
        direction="horizontal"
        loop
        indicator={() => null}
        ref={swiperRef}
        defaultIndex={activeIndex}
        onIndexChange={(index) => {
          setActiveIndex(index);
        }}
      >
        <Swiper.Item>
          <div className="ontent">
            <GetPullToRefreshlData data={data} setData={setData} itemKey="1" />
            菠萝
          </div>
        </Swiper.Item>
        <Swiper.Item>
          <div className="ontent">
            <GetPullToRefreshlData data={data} setData={setData} itemKey="2" />
            西红柿
          </div>
        </Swiper.Item>
        <Swiper.Item>
          <div className="ontent">
            <GetPullToRefreshlData data={data} setData={setData} itemKey="3" />
            蚂蚁
          </div>
        </Swiper.Item>
      </Swiper>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </div>
  );
};

export default TabScroll;
