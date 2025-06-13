# 0nsec Blog Terminal

这是一个极简风格的个人技术博客，采用 Next.js 构建，首页模拟了 macOS 终端窗口，支持常用命令交互体验。

## 功能特色
- 首页为仿真终端，支持输入 `whoami`、`ls`、`cat about.txt`、`help` 等命令，体验极简交互。
- 博客内容以 Markdown 文件存放于 `src/posts/` 目录，便于扩展和维护。
- 支持响应式设计，适配多端浏览。

## 使用说明
1. 启动开发服务器：

```bash
npm run dev
```

2. 访问 [http://localhost:3000](http://localhost:3000) 查看终端首页。
3. 在终端输入框输入命令，体验仿真交互。

## 主要命令示例
- `whoami`：显示用户名
- `ls`：列出文件
- `cat about.txt`：显示关于信息
- `help`：显示可用命令
- `clear`：清空终端

## 目录结构
```
├── src/
│   ├── app/
│   │   ├── page.tsx      # 首页终端组件
│   │   └── posts/        # 文章页面
│   └── posts/            # Markdown 博客内容
```

## 技术栈
- Next.js 14
- React 18
- TypeScript
- CSS Modules

---

原始 Next.js 说明如下：

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# helloyijie.githun.io
