import React, { useEffect } from 'react'
import PromptCard from './PromptCard';
import { useSession } from '@node_modules/next-auth/react';

const Profile = ({name,desc,data,handleEdit,handleDelete }) => {
  const {data:session}=useSession()
  useEffect(()=>{
    console.log(data);
    
  },[data])
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'><span className="blue_gradient">{name}  {session?.user.id?'Profile':''}</span></h1>
        <p className="desc text-left">{desc}</p>
        <div className="mt-16 prompt_layout">
      {data.map((post)=>(
       <PromptCard key={post._id} post={post} handleEdit={()=>handleEdit && handleEdit(post) } handleDelete={()=>handleDelete(post)} />
      ))}
    </div>
    </section>
  )
}

export default Profile