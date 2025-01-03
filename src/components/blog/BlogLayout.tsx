import React from "react";
import Image from "next/image";

interface BlogLayoutProps {
  children: React.ReactNode;
  frontMatter: {
    title: string;
    date: string;
    description: string;
    image: string;
  };
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ children, frontMatter }) => {
  return (
    <div className="flex flex-col items-center w-full overflow-x-hidden">
      <div className="w-full max-w-4xl mx-auto px-4">
        <div className="relative w-full justify-center aspect-[1200/630] mb-8">
          <Image
            src={frontMatter.image}
            alt={frontMatter.title}
            fill
            sizes="100vw"
            className="object-cover rounded-lg"
            priority
          />
        </div>
        <article className="space-y-6 mb-12">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-center">
            {frontMatter.title}
          </h1>
          <p className="text-lg font-semibold leading-7 text-center">
            {frontMatter.description}
          </p>
          <p className="text-sm text-muted-foreground text-center">
            {frontMatter.date}
          </p>

          {children}
        </article>
      </div>
    </div>
  );
};

export default BlogLayout;
