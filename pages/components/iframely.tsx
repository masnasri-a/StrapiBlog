import React, { useEffect, useState } from 'react';

const KEY = 'bd8c20deb9b448e3d6adcbf955d9381f';

export default function Iframely(props:any) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [html, setHtml] = useState({
    __html: '<div />',
  });

  useEffect(() => {
    if (props && props.url) {
        const url = 
        `https://cdn.iframe.ly/api/iframely?url=${encodeURIComponent(
          props.url
        )}&key=${KEY}&iframe=1&omit_script=1`
        console.log(url);
        
      fetch(
        url
      )
        .then((res) => res.json())
        .then(
          (res) => {
            setIsLoaded(true);
            if (res.html) {
              setHtml({ __html: res.html });
            }
             
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    } 
  }, []);

  useEffect(() => {
    window.iframely && window.iframely.load();
  });

  if (!isLoaded) {
    return <div>Loading…</div>;
  } else {
    return <div dangerouslySetInnerHTML={html} />;
  }
}