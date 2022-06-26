import React from 'react';
import { lazyload } from 'react-lazyload';

@lazyload({
  height: 200,
  once: true,
  offset: 100
})
export default class MyComponent2 extends React.Component {
  render() {
    return <div style={{ width: "50%" }}><img style={{ width: "100%",height:"200px" }} src="https://t7.baidu.com/it/u=3332251293,4211134448&fm=193&f=GIF" /></div>;
  }
}