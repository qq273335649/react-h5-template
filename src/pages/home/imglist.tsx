import { useEffect, useRef, useState } from "react"

let url1 = "https://t7.baidu.com/it/u=3631608752,3069876728&fm=193&f=GIF";
const imglist = () => {
  const [url, setUrl] = useState<string>("");
  const flag = useRef(false);
  useEffect(() => {
    if (!flag.current) {
      flag.current = true;
    } else {
      let heights = document.querySelectorAll('.imgitem');
      console.log(heights[0].clientHeight, 'clientHeight');
      console.log('I am didUpdate123')
    }
  })
  useEffect(() => {
    setUrl(url1);
  }, [])
  return (
    <div>imglist

      <img className="imgitem" style={{ width: '50%' }} src={url} />
    </div>
  )
}

export default imglist