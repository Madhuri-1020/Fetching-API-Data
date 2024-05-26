import { useEffect, useState } from "react";
const ApiFetching=()=>{
  const [data, setData]=useState(" ");
  const [error, setError]=useState(null);
  const [loading, setLoading]=useState(true);
  const [topTenWord, setTopTenWords]=useState([]);
  useEffect(()=>{
    const fetchingData=async()=>{
    try{
      const response= await fetch ('/api/big.txt')
      if(!response.ok){
        throw new Error('response not ok')
      }
      // used .text() beacuse the api data is not in the format of JSON
      const content=await response.text();
      setData(content);
      setTopTenWords(searchWord(content));
    }catch(error){
      setError(error);
    }finally{
      setLoading(false);
    }
    }
  fetchingData();
  },[])

  // for counting the repeated words in the api
  const searchWord=(content)=>{
    const words=content.toLowerCase().match(/\b\w+\b/g);
    const wordCount=words.reduce((count,word)=>{
      count[word]=(count[word] || 0)+1;
      return count;
    },{});

    // converting the array data into object data
    const wordCountArray=Object.entries(wordCount);
    // retrieving the top ten repeated words
    const sortByCount=wordCountArray.sort(([,a],[,b])=>b-a).slice(0,10);
    return sortByCount;
  }

  if(loading) return <div>Loading...</div>
  if(error) return <div>Error: {error.message}</div>
  
  return(
    <div>
      <h1>Top 10 Repeated Words</h1>
      {/* displaying the JSON format data on UI */}
      <pre>{JSON.stringify(topTenWord.map(([word, count]) => ({ word, count })), null, 2)}</pre>
    </div>
  )
}
export default ApiFetching;