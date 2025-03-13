import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
    <h1 className="head_text text-center">Discover &share

        <br />
        <span className="orange_gradient text-center">
            AI-Powered Prompts
        </span>
    </h1>
    <p className="desc text-center">
        PromptVerse is a platform that provides AI-generated prompts for writers, artists, and creators. 
    
        Explore the infinite possibilities of AI-generated prompts and share your creations with the world.
    </p>
    {/* Feed */}
    <Feed/>
    </section>
  )
}

export default Home