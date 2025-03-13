import React from 'react'

const Form = ({type,post,setPost,submitting,handleSubmit}) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className="blue_gradient">{type} Post</span>
        </h1>
        
        <p className="desc text-left max-w-md">
          {type} and share amazing prompts with the world,and let your imagination run wild with any AI-powered platform
        </p>
        <form onSubmit={handleSubmit} className=' glassmorphism w-full mt-10 flex flex-col gap-7 max-w-2xl '>
          <label>
          <span className="font-santoshi font-semibold text-base text-gray-700">
            Prompt
          </span>
          </label>
          <textarea className='form_textarea' value={post.prompt} onChange={e=>setPost({...post,prompt:e.target.value})} placeholder='Write your prompt here ....' name="" id=""></textarea>
        <span className="font-santoshi font-semibold text-base text-gray-700">Tags</span>
      <input type="text" value={post.tag} placeholder='#tag' onChange={e=>setPost({...post,tag:e.target.value})} required className="form_input" />
       
       <div className="flex-end mx-3 mb-5 gap-4">
        <button className="text-gray-400">Cancel</button>
        <button type='submit'  className="bg-orange-600 p-2 rounded-md text-white" disabled={submitting}>{submitting?`${type}...`:`${type}`}</button>
       </div>
        </form>
    </section>
  )
}

export default Form