"use client"
import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard'
import { useRouter } from '@node_modules/next/navigation'
// import PromptCard from './PromptCard'
const PromptCardList=({data,handleTagClick})=>{
  const router=useRouter()

  return(
    <div  className="mt-16 prompt_layout">
      {data.map((post)=>(
        <div className="" onClick={()=>{router.push(`/profile?id=${post.creator._id}`)}} >
       <PromptCard key={post._id} post={post} handleTagClick={handleTagClick}/>
       </div>
      ))}
    </div>
  )
}
const Feed = () => {
  const [searchText,setSearchText]=useState('')
  const[posts,setPosts]=useState([])
  const fetchPosts=async()=>{
    const response=await fetch('/api/prompt')
    const data=await response.json()
    console.log("Fetched Posts:", data); // Debugging
  
    setPosts(data)
  }
  useEffect(()=>{


fetchPosts()
  },[])
  const handleSearchChange=(e)=>{
    e.preventDefault()
    const searchValue=e.target.value
    setSearchText(searchValue)
    if(searchValue.length>0){
      const filterPosts=posts.filter(post=>  post.tag.toLowerCase().includes(searchValue.toLowerCase()) || 
      post.creator.username.toLowerCase().includes(searchValue.toLowerCase()) || 
      post.prompt.toLowerCase().includes(searchValue.toLowerCase())) ;
      setPosts(filterPosts)
    }else{
      fetchPosts()
    }
  }
  return (
    <section >
      <div className="flex items-center justify-center mt-5 ">
        <input className='p-2 rounded-md shadow-md' value={searchText} placeholder='Search tag or a username' required  onChange={handleSearchChange} type="text" name="" id="" />
      </div>
      <PromptCardList  data={posts} handleTagClick={()=>{}}/>
      {/* <PromptCard/> */}
    </section>
  )
}

export default Feed