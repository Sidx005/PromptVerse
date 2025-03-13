"use client"
import React, { useEffect, useState } from 'react'
import Profile from '@components/Profile'
import { useSession } from '@node_modules/next-auth/react'
import { useRouter, useSearchParams } from '@node_modules/next/navigation'
const ProfilePage = () => {
  const {data:session}=useSession()
  const searchParams=useSearchParams()
  const otherUserId=searchParams.get('id')
  const [posts,setPosts]=useState([])
  // const [user,setUser]=useState(null)

const router=useRouter()
    useEffect(()=>{
  const fetchPosts=async()=>{
    const userId=otherUserId?otherUserId:session?.user.id
    const response=await fetch(`/api/users/${userId}/posts`)
    const data=await response.json()
  
    setPosts(data)
    console.log("Fetched Posts:", data); // Debugging

  }
 if(session?.user.id) fetchPosts()
  if(otherUserId) fetchPosts()
    },[session?.user.id,otherUserId])  
  
    const handleEdit=(post)=>{
    router.push(`/update-prompt?id=${post._id}`)
  }
  const handleDelete=async(post)=>{
    const confirm=window.confirm("Are you sure you want to delete this prompt?")
    if(confirm){
      try {
        const response=await fetch(`/api/prompt/${post._id.toString()}`,{
          method:'DELETE'
        })
        if(response.ok){
          setPosts((prevPosts)=>prevPosts.filter((p)=>p._id!==post._id))
        }
      } catch (error) {
        console.log(error);
        
      }
    }
  }
  return (
    <Profile name={otherUserId?posts[0]?.creator.username:'My'} desc="Welcome to your personalized profile page "
    data={posts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
    />
  )
}

export default ProfilePage