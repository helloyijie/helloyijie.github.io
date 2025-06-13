'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface PostMeta {
  title: string;
  date: string;
  description: string;
  slug: string;
  readTime: string;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For now, use static data since we can't use fs in client components
    const staticPosts: PostMeta[] = [
      {
        title: "Hello World",
        date: "2024-01-01",
        description: "Welcome to my blog! This is my first post.",
        slug: "hello-world",
        readTime: "3 min read"
      },
      {
        title: "System Monitoring",
        date: "2024-01-02",
        description: "Learn how to monitor your system effectively.",
        slug: "system-monitoring",
        readTime: "8 min read"
      },
      {
        title: "Automation Scripts",
        date: "2024-01-03",
        description: "Automate your workflow with these useful scripts.",
        slug: "automation-scripts",
        readTime: "10 min read"
      },
      {
        title: "HW",
        date: "2024-01-04",
        description: "Hardware related topics and discussions.",
        slug: "HW",
        readTime: "12 min read"
      }
    ];
    
    setPosts(staticPosts);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading posts...</p>
        </div>
      </div>
    );
  }
  
  return (
    <main
      className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-gray-950 to-black flex flex-col items-center justify-start py-12 px-2 sm:px-6 animate-fade-in"
    >
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl w-full">
          {posts.map((post, idx) => (
            <article
              key={post.slug}
              className={
                `rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/80 to-gray-800/80 shadow-xl hover:shadow-emerald-400/30 hover:border-emerald-400/60 transition-all duration-300 p-8 flex flex-col items-center text-center group animate-fade-in-up` +
                ` animate-delay-${idx * 100}`
              }
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <h2 className="text-2xl font-bold mb-2 text-emerald-300 drop-shadow-lg text-center group-hover:scale-105 transition-transform duration-300 animate-fade-in">
                {post.title}
              </h2>
              <p className="text-gray-300 mb-4 text-center animate-fade-in">
                {post.description}
              </p>
              <Link
                href={`/posts/${post.slug}`}
                className="mt-auto inline-block px-6 py-2 rounded-lg bg-emerald-500 text-white font-semibold shadow-md hover:bg-emerald-400 hover:shadow-emerald-300/50 transition-all duration-300 border border-transparent hover:border-emerald-200 relative overflow-hidden group"
              >
                <span className="relative z-10">阅读更多</span>
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-transparent to-emerald-400 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}