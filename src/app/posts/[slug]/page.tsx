import { notFound } from "next/navigation";
import fs from "fs/promises";
import path from "path";
import React from "react";
import matter from "gray-matter";
// 导入 PostContent 组件
import PostContent from "./PostContent";

// 生成静态参数，用于静态导出
export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "src/posts");
  const filenames = await fs.readdir(postsDirectory);
  
  // 只处理 .md 文件
  const markdownFiles = filenames.filter(name => name.endsWith('.md'));
  
  return markdownFiles.map((name) => ({
    slug: name.replace(/\.md$/, ''),
  }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const postPath = path.join(process.cwd(), "src/posts", `${slug}.md`);
  let fileContents = "";
  try {
    await fs.access(postPath);
    fileContents = await fs.readFile(postPath, "utf-8");
  } catch {
    notFound();
  }

  const { data, content } = matter(fileContents);

  return (
    <main className="min-h-screen bg-[var(--background)] py-8">
      <div className="max-w-3xl mx-auto px-6 flex flex-col items-center">
        <article className="bg-[#1a1a1a] border border-[#333] rounded-xl p-8 mb-8 w-full flex flex-col items-center">
          <header className="mb-8 w-full flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-4 text-[#7c3aed] border-b-2 border-[#333] pb-4 w-full text-center">
              {data.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-[#888] justify-center w-full">
              <time className="bg-[#333]/30 px-3 py-1 rounded-full">
                {data.date}
              </time>
              {data.description && (
                <span className="bg-[#7c3aed]/10 text-[#7c3aed] px-3 py-1 rounded-full">
                  {data.description}
                </span>
              )}
            </div>
          </header>
          <div className="w-full">
            {content ? (
              <PostContent content={content} />
            ) : (
              <div className="text-gray-400 text-center py-8">暂无内容</div>
            )}
          </div>
        </article>
      </div>
    </main>
  );
}