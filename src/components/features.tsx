import { DarkMagicCard } from "@/components/ui/magic-card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-center bg-black px-4 py-10 sm:p-8 md:p-12 lg:p-24 mt-10"
    style={{
      backgroundImage: "url('/feature-background.jpg')",
      backgroundSize: 'cover', // Ensures the background image covers the entire screen
      backgroundPosition: 'center', // Centers the image
    }}
    >
      <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-6xl font-bold text-white mb-8 lg:mb-12 font-akira">
        From Data to Decisions...
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-6">
        {/* Card 1 */}
        <DarkMagicCard
          heading="Data Storage Magic"
          description="Unleashing the power of DataStax Astra DB."
          className="w-full h-full"
          gradientFrom="#4A0E4E"
          gradientTo="#0A4A94"
        >
          <p className="text-gray-400 text-justify font-mono text-xl">
            Store and query engagement data effortlessly with DataStax Astra DB. 
            Our project uses a seamless backend to handle likes, shares, and comments 
            across diverse social media post types.
          </p>
        </DarkMagicCard>
        
        {/* Card 2 */}
        <DarkMagicCard
          heading="Analytics Enhancements"
          description="Langflow-powered workflow creation."
          className="w-full h-full"
          gradientFrom="#3B0F50"
          gradientTo="#0B5FA5"
        >
          <p className="text-gray-400 text-justify font-mono text-xl">
            Dive into magical analytics with Langflow. Our custom workflow calculates 
            engagement metrics, helping you uncover which content types perform best—whether 
            it&apos;s reels, carousels, or static posts.
          </p>
        </DarkMagicCard>
        
        {/* Card 3 */}
        <DarkMagicCard
          heading="GPT-Driven Insights"
          description="Transforming data into actionable insights."
          className="w-full h-full"
          gradientFrom="#2C1053"
          gradientTo="#0C74B6"
        >
          <p className="text-gray-400 text-justify font-mono text-xl">
            Witness the magic of GPT integration! Our system generates insightful 
            recommendations like &quot;Reels drive 2x more comments,&quot; empowering content creators 
            with data-driven decisions.
          </p>
        </DarkMagicCard>
      </div>
    </main>
  );
}
