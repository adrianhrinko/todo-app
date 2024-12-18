"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface Post {
  slug: string;
  frontMatter: {
    title: string;
    date: string;
    description: string;
    image: string;
  };
}

interface BlogListProps {
  posts: Post[];
  postsPerPage?: number;
}

const BlogList: React.FC<BlogListProps> = ({ posts, postsPerPage = 9 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPosts.map((post) => (
          <div
            key={post.slug}
            className="rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative aspect-[16/9]">
              <Image
                src={post.frontMatter.image}
                alt={post.frontMatter.title}
                fill
                className="object-cover rounded-t-lg"
              />
            </div>
            <div className="p-6 space-y-4">
              <h2 className="text-lg font-semibold">{post.frontMatter.title}</h2>
              <p className="text-sm text-muted-foreground">
                {post.frontMatter.date}
              </p>
              <p className="text-sm">{post.frontMatter.description}</p>
              <div className="flex justify-end">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex space-x-1">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-9 w-9 ${
                  currentPage === i + 1 ? "bg-accent text-accent-foreground" : "bg-background"
                }`}
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default BlogList;
