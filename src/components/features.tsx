import { DarkMagicCard } from "@/components/ui/magic-card";
import { TextGenerateEffect } from "@/components/ui/generate-text-effect";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-start bg-black p-4 sm:p-8 md:p-12 lg:p-24">
      <h1 className="text-4xl md:text-6xl lg:text-8xl  text-white mb-12 md:mb-16 lg:mb-24">
         <TextGenerateEffect words="MagicalCards"/>
         MagicalCards
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        <DarkMagicCard
          heading="Mystical Dark Card 1"
          description="Hover over me to reveal the magical purple and blue gradient!"
          className="w-full h-full"
          gradientFrom="#4A0E4E"
          gradientTo="#0A4A94"
        >
          <p className="text-gray-300">
            This card showcases a mesmerizing dark purple to blue gradient
            effect on hover, perfectly complementing the dark theme and creating a
            mystical atmosphere.
          </p>
        </DarkMagicCard>
        <DarkMagicCard
          heading="Mystical Dark Card 2"
          description="Experience the enchanting hover effect!"
          className="w-full h-full"
          gradientFrom="#3B0F50"
          gradientTo="#0B5FA5"
        >
          <p className="text-gray-300">
            Dive into the depths of this magical card, where dark purples and deep
            blues create an otherworldly experience that captivates the imagination.
          </p>
        </DarkMagicCard>
        <DarkMagicCard
          heading="Mystical Dark Card 3"
          description="Uncover the secrets within the gradient!"
          className="w-full h-full"
          gradientFrom="#2C1053"
          gradientTo="#0C74B6"
        >
          <p className="text-gray-300">
            Let your cursor dance across this mystical card to reveal a hidden
            world of swirling purples and blues, each movement bringing new wonders
            to light.
          </p>
        </DarkMagicCard>
      </div>
    </main>
  );
}

