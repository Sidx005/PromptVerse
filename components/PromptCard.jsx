import { useSession } from '@node_modules/next-auth/react'
import Image from '@node_modules/next/image'
import { usePathname } from '@node_modules/next/navigation'
import React, { useState } from 'react'

const PromptCard = ({post,handleTagClick,handleEdit,handleDelete}) => {
  const {data:session}=useSession()
  const pathName=usePathname()
  const [copied, setCopied] = useState("")
  return (
    <div className='prompt_card font-satoshi relative'>
      <div className="flex justify-between items-start gap-5">
      <div className='flex-1 flex justify-between items-start gap-3 cursor-pointer'>
        <Image src={post.creator.image} alt="user_image" height={40} width={40} className="rounded-full object-contain "/>
<div className="flex flex-col">
  <h3>{post.creator.username}</h3>
  <p className='text-gray-400'>{post.creator.email}</p>
</div>
        </div>   
      
      </div>
      <button className="copy_btn absolute top-1 right-2" onClick={()=>{setCopied(post.prompt),navigator.clipboard.writeText(post.prompt),setTimeout(()=>setCopied(""),3000)}}>
      <Image src={copied==post.prompt?'/assets/tick.png':'/assets/copy.png'} width={12} height={12}/>
      </button>
      <p>{post.prompt}</p>
      <p className='text-blue-500 ' onClick={()=>handleTagClick && handleTagClick(post.tag)}>#{post.tag.includes(' ')?post.tag.split(/\s+/).join(''):post.tag}</p>
{/* PromptCard */}
{session?.user.id===post.creator._id && pathName==='/profile' && (
  <div className='flex w-full items-center justify-center gap-5'>
    <p onClick={handleEdit} className="font-inter text-sm green_gradient cursor-pointer">
      Edit
    </p> <p onClick={handleDelete} className="font-inter text-sm orange_gradient cursor-pointer">
      Delete
    </p>
  </div>
)}
      </div>
  )
}

export default PromptCard