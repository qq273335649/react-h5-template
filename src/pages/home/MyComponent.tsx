import React from 'react';
import { lazyload } from 'react-lazyload';

@lazyload({
  height: 200,
  once: true,
  offset: 100
})
export default class MyComponent extends React.Component {
  render() {
    return <div style={{ width: "50%" }}>this component is lazyloaded by default!</div>;
  }
}