import './App.css'
import axios from 'axios'
import { useEffect, useState } from 'react'

function App() {
  const [state, setState] = useState([])
  const [skip, setSkip] = useState(0)
  const [stopRequest, setStopRequest] = useState(true)

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products?skip=${skip}&limit=5`)
      .then((res) => {
        setState([...state, ...res.data.products])
        console.log(res.data.products)
        if (res.data.products == 0) {
          setStopRequest(false)
        }
      })
  }, [skip])

  const scrollToEnd = () => {
    setSkip(skip + 5)
  }

  window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement

    if (stopRequest == true) {
      if (scrollTop + clientHeight >= scrollHeight) {
        scrollToEnd()
      }
    }
  })

  return (
    <div className="App">
      {state.map((e, i) => {
        return (
          <div key={i} className="container">
            <div className="image">
              <img src={e.thumbnail} width="100%" height="100%" />
            </div>
            <div className="brandName">
              <h3>{e.title}</h3>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default App

// if we want to see initially 30 products and on scrolling next 5 products we can use

/* if(skip===0)
{
  axios
  .get(`https://dummyjson.com/products?skip=${skip}&limit=30`)
  .then((res) => {
    console.log(res.data.products)
    setState([...state, ...res.data.products])
  })
}
else{
  axios
  .get(`https://dummyjson.com/products?skip=${skip}&limit=5`)
  .then((res) => {
    console.log(res.data.products)
    setState([...state, ...res.data.products])
  })
} */
