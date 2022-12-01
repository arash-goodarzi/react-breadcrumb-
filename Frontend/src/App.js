import './App.css';
import Bread from './components/Bread';
import React, { useState, useEffect } from 'react';


function App() {

  const [breadCrumb, setbreadCrumb] = useState(['root', 'home', 'myname'])
  const [dataBreadCrumb, setDataBreadCrumb] = useState()
  function arrayCompare(_arr1, _arr2) {
      if (
        !Array.isArray(_arr1)
        || !Array.isArray(_arr2)
        || _arr1.length !== _arr2.length
        ) {
          return false;
        }
      
      const arr1 = _arr1.concat().sort();
      const arr2 = _arr2.concat().sort();
      
      for (let i = 0; i < arr1.length; i++) {
          if (arr1[i] !== arr2[i]) {
              return false;
          }
      }
      return true;
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const  path_querry = [...breadCrumb].join("->")
        const response = await fetch(`http://localhost:3000/path/${path_querry}`)
        const data = await response.json();
        if (JSON.stringify(dataBreadCrumb) !== JSON.stringify(data)) {
          setDataBreadCrumb(data)
        }
        if (!arrayCompare(breadCrumb, data.address)) {
          setDataBreadCrumb(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[breadCrumb,dataBreadCrumb])  

  const handleNewAddress = (address) => {
    setbreadCrumb(()=> address)
  }

  return (
    <div className="App">
      <h1 style={{height:'10vh',color:'white',backgroundColor:'#21BBD1',display:'flex',alignItems: 'center',justifyContent: 'center'}}>ParseHub-</h1>
      <div style={{border:"1px solid black",height:'5vh',display:'flex'}}>
        
        {
          breadCrumb.map((item, index) => {
            let item_index = [...breadCrumb].findIndex(i => i === item)+1
            let item_add = [...breadCrumb].slice(0,item_index)
            return (
              < >
                  <Bread key={index} item={item} handleNewAddress={handleNewAddress} current_address={item_add} />  
                  <img key={"image"+index} src="images/chevron_right.png" alt="chevron right" />
              </>
            )
          })
        }

      </div>
      <div style={{ "border": "1px solid brown", "height": '80vh' }}>
        {
          dataBreadCrumb?.children?.map((child, idx) => {
            return (

              <div key={idx} onClick={e => setbreadCrumb( child.type === "file" ? [...breadCrumb]: [...breadCrumb,child.name])} style={{display:'flex', marginLeft:'5px'}} >
                <div style={{margin:'5px'}}>
                  {child.type==='file' && "This is file"}
                  {child.type==='dir' &&"This is folder"}
                </div>
                <div style={{margin:'5px',backgroundColor:'lightGray',borderRadius:'5px',padding:'2px',cursor: 'pointer'}}>
                  {child.name}  
                </div>
                {/* {JSON.stringify(child)} */}
              </div>                  
            )
            }
          )
        }
      </div>
    </div>
  );
}

export default App;
