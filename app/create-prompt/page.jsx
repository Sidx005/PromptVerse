'use client'
import Form from '@components/Form'
import { useSession } from '@node_modules/next-auth/react'
import { useRouter } from '@node_modules/next/navigation'
// import { useRouter } from '@node_modules/next/router'
import React, { useState } from 'react'

const CreatePrompt = () => {
  const {data:session}=useSession()
  const router=useRouter()
    const [submitting,setSubmitting]=useState(false)
    const [post,setPost]=useState({
        prompt:'',
        tag:''

    })
    const createPrompt=async(e)=>{
        e.preventDefault();
        setSubmitting(true);
        try {

          const response=await fetch('/api/prompt/new',{
            method:'POST',
            body:JSON.stringify({
              prompt:post.prompt,
              userId:session?.user.id,
              tag:post.tag
            }),
          })
          if(response.ok){
            router.push('/')
          }
        } catch (error) {
          console.log(error);
          
        }
    }
  return (
   <Form type="Create" post={post} setPost={setPost} submitting={submitting} handleSubmit={createPrompt} />
  )
}

export default CreatePrompt