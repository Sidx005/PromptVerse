"use client"
import Form from '@components/Form'
import { useSession } from '@node_modules/next-auth/react'
import { useRouter } from '@node_modules/next/navigation'
import React, { Suspense } from 'react'

// Main component with Suspense
const EditPromptPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditPromptContent />
    </Suspense>
  )
}

// Content component that uses useSearchParams
import { useSearchParams } from '@node_modules/next/navigation'

const EditPromptContent = () => {
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  })

  useEffect(() => {
    const getPromptDetails = async() => {
      const response = await fetch(`/api/prompt/${promptId}`)
      const data = await response.json()
      
      setPost({
        prompt: data.prompt,
        tag: data.tag
      })
    }
    
    if(promptId) getPromptDetails()
  }, [promptId])

  const updatePrompt = async(e) => {
    e.preventDefault()
    setSubmitting(true)
    
    if(!promptId) return alert("Prompt ID not found")
    
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        })
      })
      
      if(response.ok) {
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  if (!promptId) return <div>Loading...</div>

  return (
    <Form 
      type="Edit" 
      post={post} 
      setPost={setPost} 
      submitting={submitting} 
      handleSubmit={updatePrompt} 
    />
  )
}

export default EditPromptPage