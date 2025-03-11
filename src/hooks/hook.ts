import { useEffect, useState } from "react"







export interface Post{
  toLowerCase(): unknown;
  title: string;  
  text: string;  
  tags: string;  
  autor: string;  
  img: string;  
  img_2x: string;  
  date: string;  
  views: string;  

}

  export  const usePost =(url:string)=>{
    //vapshe xi er null
    const [data,setData]=useState<Post[]>([])
    const [isPending, setIsPending] = useState<boolean>(false);
    const [error,setError]=useState<string|null>(null)
    

    useEffect(()=>{


       async function postData (){
        setIsPending(true)
try{
        const response=  await fetch(url)
        if(!response.ok)throw new  Error(response.statusText)

        const json =await response.json()
        setIsPending(false)

        // vor karoxanas cuic tal sarkum es qo uzac data
        setData(json)
        setError(null)
}
        catch(error){
          setError(`${error}`);
          setIsPending(false)

        }


      };
    
       
      postData()
      

    },[url])


    return {data,isPending,error}
}





