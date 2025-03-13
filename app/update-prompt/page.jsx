'use client'
import Form from '@components/Form'
import { useSession } from '@node_modules/next-auth/react'
import { useRouter,useSearchParams } from '@node_modules/next/navigation'
// import { useRouter } from '@node_modules/next/router'
import React, { useEffect, useState } from 'react'

const EditPrompt = () => {
  // const {data:session}=useSession()
  const searchParams=useSearchParams()
  const promptId=searchParams.get('id')
  const router=useRouter()
    const [submitting,setSubmitting]=useState(false)
    const [post,setPost]=useState({
        prompt:'',
        tag:''

    })


    useEffect(()=>{
const getPromptDetails=async()=>{
  const response=await fetch(`/api/prompt/${promptId}`)
  const data=await response.json();
  
  setPost({
    prompt:data.prompt,
    tag:data.tag
  })
}
if(promptId) getPromptDetails()

console.log(promptId);

    },[promptId])

    const updatePrompt=async(e)=>{
       e.preventDefault();
       setSubmitting(true);
       if(!promptId) return alert("Prompt ID not found");
       try {
        const response=await fetch(`/api/prompt/${promptId}`,{
          method:'PATCH',
          body:JSON.stringify({
            prompt:post.prompt,
            tag:post.tag
          })
        })
        if(response.ok){
          router.push('/')
        }
       } catch (error) {
        console.log(error);
        
       }
       finally{
          setSubmitting(false)
       }
    }
  return (
   <Form type="Edit" post={post} setPost={setPost} submitting={submitting} handleSubmit={updatePrompt} />
  )
}

export default EditPrompt