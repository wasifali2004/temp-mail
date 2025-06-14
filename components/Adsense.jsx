import Script from 'next/script'
import React from 'react'

const Adsense = ({pid}) => {
  return (
    <Script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pid}`} 
    crossOrigin='anonymous'
    />
  )
}

export default Adsense
