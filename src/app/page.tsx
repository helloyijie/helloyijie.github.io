"use client";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
// 需要先安装 remark-gfm 依赖
// npm install remark-gfm
import remarkGfm from "remark-gfm";

export default function Home() {
  const [history, setHistory] = useState([
    { type: "command", content: "whoami" },
    { type: "output", content: "0nsec" },
    { type: "command", content: "cat about.txt" },
    { type: "output", content: "Personal tech blog exploring code, systems, and digital craftsmanship.\nSharing knowledge through minimal design and clean code." },
    { type: "command", content: "ls -la posts/" },
    { type: "output", content: "total 42\ndrwxr-xr-x  13 posts\ndrwxr-xr-x   7 projects" },
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  // 读取 README.md 内容
  const readmeContent = `# 0nsec Blog Terminal\n\n这是一个极简风格的个人技术博客，采用 Next.js 构建，首页模拟了 macOS 终端窗口，支持常用命令交互体验。\n\n## 功能特色\n- 首页为仿真终端，支持输入 \`whoami\`、\`ls\`、\`cat about.txt\`、\`help\` 等命令，体验极简交互。\n- 博客内容以 Markdown 文件存放于 \`src/posts/\` 目录，便于扩展和维护。\n- 支持响应式设计，适配多端浏览。\n\n## 使用说明\n1. 启动开发服务器：\n\n\`\`\`bash\nnpm run dev\n\`\`\`\n\n2. 访问 [http://localhost:3000](http://localhost:3000) 查看终端首页。\n3. 在终端输入框输入命令，体验仿真交互。\n\n## 主要命令示例\n- \`whoami\`：显示用户名\n- \`ls\`：列出文件\n- \`cat about.txt\`：显示关于信息\n- \`help\`：显示可用命令\n- \`clear\`：清空终端\n\n## 目录结构\n\n├── src/\n│   ├── app/\n│   │   ├── page.tsx      # 首页终端组件\n│   │   └── posts/        # 文章页面\n│   └── posts/            # Markdown 博客内容\n\n## 技术栈\n- Next.js 14\n- React 18\n- TypeScript\n- CSS Modules\n\n---\n\n原始 Next.js 说明如下：\n\nThis is a [Next.js](https://nextjs.org) project bootstrapped with [\`create-next-app\`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).\n\n## Getting Started\n\nFirst, run the development server:\n\n\`\`\`bash\nnpm run dev\n# or\nyarn dev\n# or\npnpm dev\n# or\nbun dev\n\`\`\`\n\nOpen [http://localhost:3000](http://localhost:3000) with your browser to see the result.\n\nYou can start editing the page by modifying \`app/page.tsx\`. The page auto-updates as you edit the file.\n\nThis project uses [\`next/font\`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.\n\n## Learn More\n\nTo learn more about Next.js, take a look at the following resources:\n\n- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.\n- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.\n\nYou can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!\n\n## Deploy on Vercel\n\nThe easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.\n\nCheck out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.`;
  const commands = {
    help: "Available commands: help, whoami, ls, cat, clear, date, pwd, echo",
    whoami: "0nsec",
    ls: "posts/  projects/  about.txt  README.md",
    "ls -la": "total 42\ndrwxr-xr-x  13 posts\ndrwxr-xr-x   7 projects\n-rw-r--r--   1 about.txt\n-rw-r--r--   1 README.md",
    "cat about.txt": "Personal tech blog exploring code, systems, and digital craftsmanship.\nSharing knowledge through minimal design and clean code.",
    "cat README.md": readmeContent,
    pwd: "/home/0nsec",
    date: new Date().toLocaleString(),
    clear: "CLEAR_TERMINAL",
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (trimmedCmd === "clear") {
      setHistory([]);
      setTimeout(() => {
        if (terminalRef.current) {
          (terminalRef.current as HTMLDivElement).scrollTop = 0;
        }
      }, 50);
      return;
    }
    if (trimmedCmd.startsWith("echo ")) {
      return trimmedCmd.slice(5);
    }
    if (trimmedCmd.startsWith("cat ")) {
      const file = trimmedCmd.slice(4).trim();
      if (file === "about.txt") return commands["cat about.txt"];
      if (file === "README.md") return readmeContent;
      // 支持 src/posts/ 下的 md 文件
      if (file.startsWith("src/posts/") && file.endsWith(".md")) {
        if (file === "src/posts/HW.md") return "# Hello World\n\nThis is a sample post.";
        if (file === "src/posts/automation-scripts.md") return "# Automation Scripts\n\nSome automation scripts.";
        if (file === "src/posts/hello-world.md") return "# Hello World\n\nWelcome to the hello world post.";
        if (file === "src/posts/system-monitoring.md") return "# System Monitoring\n\nSystem monitoring details.";
        return `cat: ${file}: No such file`;
      }
      return `cat: ${file}: No such file`;
    }
    return (commands as { [key: string]: string })[trimmedCmd] || `Command not found: ${cmd}\nType 'help' for available commands.`;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentInput.trim()) return;

    const newHistory = [...history];
    newHistory.push({ type: "command", content: currentInput });
    const output = handleCommand(currentInput);
    if (output !== "CLEAR_TERMINAL") {
      newHistory.push({ type: "output", content: output || "" });
    }
    setHistory(newHistory);
    setCurrentInput("");
    setTimeout(() => {
      if (terminalRef.current) {
        (terminalRef.current as HTMLDivElement).scrollTop = (terminalRef.current as HTMLDivElement).scrollHeight;
      }
    }, 100);
  };

  useEffect(() => {
    if (inputRef.current) {
      (inputRef.current as HTMLInputElement).focus();
    }
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#18181a" }}>
      <div style={{
        background: "rgba(35,35,38,0.85)",
        borderRadius: "18px",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37), 0 1.5px 8px 0 rgba(0,0,0,0.18)",
        border: "1.5px solid #232326",
        width: "700px",
        minHeight: "380px",
        fontFamily: "Menlo, Monaco, 'Consolas', 'Liberation Mono', 'Courier New', monospace",
        overflow: "hidden",
        position: "relative",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          height: "38px",
          background: "linear-gradient(90deg, #232326 80%, #23232600 100%)",
          borderBottom: "1px solid #333",
          borderTopLeftRadius: "18px",
          borderTopRightRadius: "18px",
          padding: "0 20px",
          boxShadow: "0 2px 8px 0 rgba(31,38,135,0.07)"
        }}>
          <span style={{
            display: "inline-block",
            width: "13px",
            height: "13px",
            borderRadius: "50%",
            background: "#ff5f56",
            marginRight: "8px",
            border: "1.5px solid #e55347",
            boxShadow: "0 0 4px #ff5f56cc"
          }}></span>
          <span style={{
            display: "inline-block",
            width: "13px",
            height: "13px",
            borderRadius: "50%",
            background: "#ffbd2e",
            marginRight: "8px",
            border: "1.5px solid #dfa123",
            boxShadow: "0 0 4px #ffbd2ecc"
          }}></span>
          <span style={{
            display: "inline-block",
            width: "13px",
            height: "13px",
            borderRadius: "50%",
            background: "#27c93f",
            border: "1.5px solid #13ae1a",
            boxShadow: "0 0 4px #27c93fcc"
          }}></span>
          <span style={{ marginLeft: 18, color: "#7c3aed", fontSize: 14, fontWeight: 600, letterSpacing: 1 }}>0nsec</span>
        </div>
        <div ref={terminalRef} style={{ padding: "18px 24px 12px 24px", minHeight: "260px", maxHeight: "320px", color: "#eaeaea", fontSize: 15, background: "#232326", overflowY: "auto" }}>
          {history.map((item, idx) => (
            item.type === "command" ? (
              <div key={idx} style={{ whiteSpace: "pre-wrap" }}>
                <span style={{ color: "#7fd6ff" }}>&gt; </span>{item.content}
              </div>
            ) : (
              <div key={idx} style={{ color: "#b5b5b5", marginLeft: 24, whiteSpace: "pre-wrap" }}>
                {item.content && item.content.startsWith("#") ? (
                  <EnhancedMarkdown content={item.content} />
                ) : (
                  item.content
                )}
              </div>
            )
          ))}
        </div>
        <form onSubmit={handleSubmit} style={{ display: "flex", borderTop: "1px solid #333", background: "#202124", height: "44px", padding: 0 }}>
          <span style={{ color: "#7fd6ff", padding: "0 8px", fontSize: 16, lineHeight: "36px" }}>$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={e => setCurrentInput(e.target.value)}
            placeholder="type a command..."
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#eaeaea",
              fontSize: 16,
              padding: "8px 0"
            }}
            autoFocus
          />
          {/* <button type="submit" style={{
            background: "#232326",
            color: "#aaa",
            border: "none",
            padding: "0 18px",
            fontSize: 15,
            cursor: "pointer"
          }}>Run</button> */}
        </form>
      </div>
    </div>
  );
}

// 目录组件
function Toc({ headings }: { headings: { text: string; id: string; level: number }[] }) {
  return (
    <nav style={{
      background: "transparent",
      padding: "0"
    }}>
      <ul style={{
        listStyle: "none",
        padding: 0,
        margin: 0
      }}>
        {headings.map((heading, index) => (
          <li key={index} style={{
            marginBottom: "2px"
          }}>
            <a
              href={`#${heading.id}`}
              style={{
                display: "block",
                padding: `${4 + (heading.level - 1) * 2}px ${12 + (heading.level - 1) * 8}px`,
                fontSize: heading.level === 1 ? "13px" : heading.level === 2 ? "12px" : "11px",
                fontWeight: heading.level === 1 ? 600 : heading.level === 2 ? 500 : 400,
                color: heading.level === 1 ? "#24292e" : heading.level === 2 ? "#586069" : "#6a737d",
                textDecoration: "none",
                borderRadius: "3px",
                transition: "all 0.15s ease",
                lineHeight: 1.4,
                borderLeft: heading.level === 1 ? "3px solid transparent" : "none",
                marginLeft: heading.level === 1 ? "0" : "8px"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f1f8ff";
                e.currentTarget.style.color = "#0366d6";
                if (heading.level === 1) {
                  e.currentTarget.style.borderLeftColor = "#0366d6";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = heading.level === 1 ? "#24292e" : heading.level === 2 ? "#586069" : "#6a737d";
                if (heading.level === 1) {
                  e.currentTarget.style.borderLeftColor = "transparent";
                }
              }}
            >
              <span style={{
                display: "inline-block",
                marginRight: "6px",
                fontSize: "10px",
                opacity: 0.6
              }}>
                {heading.level === 1 ? "📄" : heading.level === 2 ? "📋" : "📝"}
              </span>
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}



// Markdown 渲染增强
// 删除这行导出语句
// export { EnhancedMarkdown };
function EnhancedMarkdown({ content }: { content: string }) {
  // 解析标题生成目录
  const [headings, setHeadings] = useState<{ text: string; id: string; level: number }[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  useEffect(() => {
    const lines = content.split("\n");
    const hs: { text: string; id: string; level: number }[] = [];
    lines.forEach(line => {
      const match = line.match(/^(#{1,6})\s+(.+)/);
      if (match) {
        const level = match[1].length;
        const text = match[2];
        const id = text.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-").replace(/^-+|-+$/g, "");
        hs.push({ text, id, level });
      }
    });
    setHeadings(hs);
  }, [content]);
  
  if (isMobile) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        padding: "10px"
      }}>
        <main style={{
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          padding: "20px"
        }}>
          {headings.length > 0 && <Toc headings={headings} />}
          <article style={{
            lineHeight: 1.6,
            fontSize: 14,
            color: "#333",
            width: "100%"
          }}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code: ({ children, ...props }) => {
                  return (
                    <code
                      style={{
                        background: "#f0f0f0",
                        color: "#d73a49",
                        padding: "2px 4px",
                        borderRadius: 3,
                        fontSize: "0.9em",
                        fontFamily: "'Courier New', monospace"
                      }}
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
                h1: ({ children, ...props }) => {
                  const text = String(children);
                  const id = text.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-").replace(/^-+|-+$/g, "");
                  return (
                    <h1
                      id={id}
                      style={{
                        fontSize: 20,
                        fontWeight: 700,
                        color: "#000",
                        marginTop: 24,
                        marginBottom: 12,
                        lineHeight: 1.3,
                        borderBottom: "2px solid #e1e4e8",
                        paddingBottom: 8
                      }}
                      {...props}
                    >
                      {children}
                    </h1>
                  );
                },
                h2: ({ children, ...props }) => {
                  const text = String(children);
                  const id = text.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-").replace(/^-+|-+$/g, "");
                  return (
                    <h2
                      id={id}
                      style={{
                        fontSize: 18,
                        fontWeight: 600,
                        color: "#24292e",
                        marginTop: 20,
                        marginBottom: 10,
                        lineHeight: 1.25
                      }}
                      {...props}
                    >
                      {children}
                    </h2>
                  );
                },
                h3: ({ children, ...props }) => {
                  const text = String(children);
                  const id = text.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-").replace(/^-+|-+$/g, "");
                  return (
                    <h3
                      id={id}
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: "#24292e",
                        marginTop: 16,
                        marginBottom: 8,
                        lineHeight: 1.25
                      }}
                      {...props}
                    >
                      {children}
                    </h3>
                  );
                },
                p: ({ children, ...props }) => (
                  <p
                    style={{
                      marginBottom: 12,
                      lineHeight: 1.6,
                      color: "#24292e"
                    }}
                    {...props}
                  >
                    {children}
                  </p>
                ),
                ul: ({ children, ...props }) => (
                  <ul
                    style={{
                      marginBottom: 12,
                      paddingLeft: 20,
                      listStyleType: "disc"
                    }}
                    {...props}
                  >
                    {children}
                  </ul>
                ),
                ol: ({ children, ...props }) => (
                  <ol
                    style={{
                      marginBottom: 12,
                      paddingLeft: 20
                    }}
                    {...props}
                  >
                    {children}
                  </ol>
                ),
                li: ({ children, ...props }) => (
                  <li
                    style={{
                      marginBottom: 4,
                      lineHeight: 1.5
                    }}
                    {...props}
                  >
                    {children}
                  </li>
                ),
                blockquote: ({ children, ...props }) => (
                  <blockquote
                    style={{
                      borderLeft: "4px solid #dfe2e5",
                      paddingLeft: 12,
                      marginLeft: 0,
                      marginBottom: 12,
                      color: "#6a737d",
                      background: "#f6f8fa",
                      padding: "12px 12px 12px 16px",
                      borderRadius: "0 3px 3px 0"
                    }}
                    {...props}
                  >
                    {children}
                  </blockquote>
                )
              }}
            >
              {content}
            </ReactMarkdown>
          </article>
        </main>
      </div>
    );
  }
  
  return (
    <div style={{
      minHeight: "100vh",
      background: "#f5f5f5",
      display: "flex",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
    }}>
      {/* 左侧书签面板 - PDF查看器风格 */}
      <aside 
        className="bookmark-panel"
        style={{
          width: "280px",
          height: "calc(100vh - 64px)", // 减去导航栏高度
          background: "#fafbfc",
          borderRight: "1px solid #e1e4e8",
          position: "fixed",
          left: 0,
          top: "64px",
          overflowY: "auto",
          overflowX: "hidden",
          boxShadow: "inset -1px 0 0 #e1e4e8",
          // 自定义滚动条样式
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "thin",
          scrollbarColor: "#c1c7cd #f1f3f4",
          display: "flex",
          flexDirection: "column",
          zIndex: 1000
        }}>
        <div style={{
          padding: "16px",
          borderBottom: "1px solid #e1e4e8",
          background: "#f6f8fa",
          flexShrink: 0 // 防止标题区域被压缩
        }}>
          <h2 style={{
            margin: 0,
            fontSize: 14,
            fontWeight: 600,
            color: "#24292e",
            display: "flex",
            alignItems: "center"
          }}>
            <span style={{
              marginRight: 8,
              fontSize: 16
            }}>📑</span>
            书签
          </h2>
        </div>
        <div style={{
          padding: "8px 0",
          flex: 1, // 占据剩余空间
          overflowY: "auto", // 内容区域可滚动
          minHeight: 0 // 允许flex子项收缩
        }}>
          {headings.length > 0 && <Toc headings={headings} />}
        </div>
      </aside>
      
      {/* 右侧文档查看区域 - PDF页面风格 */}
      <main style={{
        marginLeft: "280px",
        flex: 1,
        padding: "20px",
        paddingTop: "84px",
        background: "#f5f5f5",
        minHeight: "100vh"
      }}>
        <div style={{
          background: "#fff",
          boxShadow: "0 0 0 1px rgba(0,0,0,0.1), 0 4px 11px rgba(0,0,0,0.1)",
          maxWidth: "none", // 移除A4纸张宽度限制
          width: "100%", // 使用全宽
          margin: "0", // 移除居中
          padding: "40px 50px", // 保持内边距
          minHeight: "calc(100vh - 40px)", // 调整最小高度
          position: "relative"
        }}>
          <article style={{
            lineHeight: 1.6,
            fontSize: 14,
            color: "#24292e",
            width: "100%"
          }}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code: ({ children, ...props }) => {
                  return (
                    <code
                      style={{
                        background: "#f6f8fa",
                        color: "#d73a49",
                        padding: "2px 4px",
                        borderRadius: 3,
                        fontSize: "0.9em",
                        fontFamily: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace",
                        border: "1px solid #e1e4e8"
                      }}
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
                h1: ({ children, ...props }) => {
                  const text = String(children);
                  const id = text.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-").replace(/^-+|-+$/g, "");
                  return (
                    <h1
                      id={id}
                      style={{
                        fontSize: 24,
                        fontWeight: 700,
                        color: "#24292e",
                        marginTop: 32,
                        marginBottom: 16,
                        lineHeight: 1.25,
                        borderBottom: "1px solid #e1e4e8",
                        paddingBottom: 8
                      }}
                      {...props}
                    >
                      {children}
                    </h1>
                  );
                },
                h2: ({ children, ...props }) => {
                  const text = String(children);
                  const id = text.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-").replace(/^-+|-+$/g, "");
                  return (
                    <h2
                      id={id}
                      style={{
                        fontSize: 20,
                        fontWeight: 600,
                        color: "#24292e",
                        marginTop: 24,
                        marginBottom: 12,
                        lineHeight: 1.25
                      }}
                      {...props}
                    >
                      {children}
                    </h2>
                  );
                },
                h3: ({ children, ...props }) => {
                  const text = String(children);
                  const id = text.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-").replace(/^-+|-+$/g, "");
                  return (
                    <h3
                      id={id}
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: "#24292e",
                        marginTop: 20,
                        marginBottom: 8,
                        lineHeight: 1.25
                      }}
                      {...props}
                    >
                      {children}
                    </h3>
                  );
                },
                p: ({ children, ...props }) => (
                  <p
                    style={{
                      marginBottom: 16,
                      lineHeight: 1.6,
                      color: "#24292e",
                      textAlign: "justify" // 两端对齐，更像PDF
                    }}
                    {...props}
                  >
                    {children}
                  </p>
                ),
                ul: ({ children, ...props }) => (
                  <ul
                    style={{
                      marginBottom: 16,
                      paddingLeft: 24,
                      listStyleType: "disc"
                    }}
                    {...props}
                  >
                    {children}
                  </ul>
                ),
                ol: ({ children, ...props }) => (
                  <ol
                    style={{
                      marginBottom: 16,
                      paddingLeft: 24
                    }}
                    {...props}
                  >
                    {children}
                  </ol>
                ),
                li: ({ children, ...props }) => (
                  <li
                    style={{
                      marginBottom: 6,
                      lineHeight: 1.5
                    }}
                    {...props}
                  >
                    {children}
                  </li>
                ),
                blockquote: ({ children, ...props }) => (
                  <blockquote
                    style={{
                      borderLeft: "4px solid #dfe2e5",
                      paddingLeft: 16,
                      marginLeft: 0,
                      marginBottom: 16,
                      color: "#6a737d",
                      background: "#f6f8fa",
                      padding: "16px 16px 16px 20px",
                      borderRadius: "0 3px 3px 0"
                    }}
                    {...props}
                  >
                    {children}
                  </blockquote>
                )
              }}
            >
              {content}
            </ReactMarkdown>
          </article>
        </div>
      </main>
    </div>
  );
}
