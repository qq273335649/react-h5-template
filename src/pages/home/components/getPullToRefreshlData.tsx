import { List } from 'antd-mobile';
import { useEffect } from 'react';
export const GetPullToRefreshlData = (props: { itemKey: string; data: any[]; setData: any }) => {
  const { itemKey, data, setData } = props;
  function getNextData() {
    const ret: string[] = [];
    for (let i = 0; i < 100; i += 1) {
      ret.push(`${i}`);
    }
    return ret;
  }
  useEffect(() => {
    setData([]);
    getNextData();
  }, [itemKey]);

  return (
    <div>
      <List>
        {data.map((item: any, index: number) => (
          <List.Item key={index}>
            {item}-{index}
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default GetPullToRefreshlData;
