import Image from "next/image";
import demo from "../../../public/demo.png";

import GetStartedButton from "../shared/GetStartedButton";

export default function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 px-6 py-12">
      <div className="flex flex-col gap-8 items-center justify-center text-center lg:text-left lg:items-start">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl flex flex-col gap-3 items-center lg:items-start">
          <span className="relative">
            <span className="absolute bg-muted -left-2 -top-1 -bottom-1 -right-2 -rotate-1"></span>
            <span className="relative">
              Build <span className="text-destructive">Firebase</span>
            </span>
          </span>
          <span className="whitespace-nowrap relative">
            <span className="mr-3">apps now,</span>
            <span className="relative whitespace-nowrap">
              <span className="absolute bg-primary/20 -left-2 -top-1 -bottom-1 -right-2 rotate-1"></span>
              <span className="relative text-primary">not later</span>
            </span>
          </span>
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed">
          This NextJS template has everything you need to build your next SaaS
          project with Firebase fast.
        </p>

        <GetStartedButton />
      </div>

      <div className="relative lg:w-full">
        <Image
          src={demo}
          alt="Hero Image"
          width={1080}
          height={1080}
          className="rounded-lg overflow-hidden"
        />
      </div>
    </section>
  );
}
