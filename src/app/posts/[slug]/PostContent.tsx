"use client";
import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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



export default function PostContent({ content }: { content: string }) {
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
           padding: "20px",
           overflowX: "auto"
         }}>
          {headings.length > 0 && <Toc headings={headings} />}
          <article style={{
             lineHeight: 1.6,
             fontSize: 14,
             color: "#333",
             width: "100%",
             maxWidth: "100%",
             overflowWrap: "break-word",
             wordBreak: "break-word"
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
                h4: ({ children, ...props }) => {
                  const text = String(children);
                  const id = text.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-").replace(/^-+|-+$/g, "");
                  return (
                    <h4
                      id={id}
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#24292e",
                        marginTop: 16,
                        marginBottom: 8,
                        lineHeight: 1.25
                      }}
                      {...props}
                    >
                      {children}
                    </h4>
                  );
                },
                h5: ({ children, ...props }) => {
                  const text = String(children);
                  const id = text.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-").replace(/^-+|-+$/g, "");
                  return (
                    <h5
                      id={id}
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#24292e",
                        marginTop: 16,
                        marginBottom: 8,
                        lineHeight: 1.25
                      }}
                      {...props}
                    >
                      {children}
                    </h5>
                  );
                },
                h6: ({ children, ...props }) => {
                  const text = String(children);
                  const id = text.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-").replace(/^-+|-+$/g, "");
                  return (
                    <h6
                      id={id}
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#24292e",
                        marginTop: 16,
                        marginBottom: 8,
                        lineHeight: 1.25
                      }}
                      {...props}
                    >
                      {children}
                    </h6>
                  );
                },
                p: ({ children, ...props }) => (
                   <p
                     style={{
                       marginBottom: 12,
                       lineHeight: 1.6,
                       color: "#24292e",
                       maxWidth: "100%",
                       overflowWrap: "break-word",
                       wordBreak: "break-word"
                     }}
                     {...props}
                   >
                     {children}
                   </p>
                 ),
                ul: ({ children, ...props }) => (
                  <ul
                    style={{
                      paddingLeft: 20,
                      marginBottom: 12,
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
                      paddingLeft: 20,
                      marginBottom: 12,
                      listStyleType: "decimal"
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
                      lineHeight: 1.6,
                      color: "#24292e"
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
                      marginBottom: 12,
                      color: "#6a737d",
                      fontStyle: "italic"
                    }}
                    {...props}
                  >
                    {children}
                  </blockquote>
                ),
                table: ({ children, ...props }) => (
                   <div style={{ overflowX: "auto", marginBottom: 12, maxWidth: "100%" }}>
                     <table
                       style={{
                         borderCollapse: "collapse",
                         width: "100%",
                         minWidth: "300px",
                         border: "1px solid #dfe2e5"
                       }}
                       {...props}
                     >
                       {children}
                     </table>
                   </div>
                 ),
                th: ({ children, ...props }) => (
                  <th
                    style={{
                      border: "1px solid #dfe2e5",
                      padding: "8px 12px",
                      background: "#f6f8fa",
                      fontWeight: 600,
                      textAlign: "left"
                    }}
                    {...props}
                  >
                    {children}
                  </th>
                ),
                td: ({ children, ...props }) => (
                  <td
                    style={{
                      border: "1px solid #dfe2e5",
                      padding: "8px 12px"
                    }}
                    {...props}
                  >
                    {children}
                  </td>
                ),
                a: ({ children, href, ...props }) => (
                  <a
                    href={href}
                    style={{
                      color: "#0366d6",
                      textDecoration: "none"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.textDecoration = "underline";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.textDecoration = "none";
                    }}
                    {...props}
                  >
                    {children}
                  </a>
                ),
                strong: ({ children, ...props }) => (
                  <strong
                    style={{
                      fontWeight: 600,
                      color: "#24292e"
                    }}
                    {...props}
                  >
                    {children}
                  </strong>
                ),
                em: ({ children, ...props }) => (
                  <em
                    style={{
                      fontStyle: "italic",
                      color: "#24292e"
                    }}
                    {...props}
                  >
                    {children}
                  </em>
                ),
                hr: ({ ...props }) => (
                  <hr
                    style={{
                      border: "none",
                      borderTop: "1px solid #e1e4e8",
                      margin: "24px 0"
                    }}
                    {...props}
                  />
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
      display: "flex",
      minHeight: "100vh",
      background: "#f5f5f5",
      position: "relative"
    }}>
      {/* 左侧书签面板 - PDF查看器风格 */}
      <aside 
        className="bookmark-panel"
        style={{
          width: "280px",
          height: "calc(100vh - 64px)",
          background: "#fafbfc",
          borderRight: "1px solid #e1e4e8",
          position: "fixed",
          left: 0,
          top: "64px",
          overflowY: "auto",
          overflowX: "hidden",
          boxShadow: "inset -1px 0 0 #e1e4e8",
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
          flexShrink: 0
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
            目录
          </h2>
        </div>
        <div style={{
          padding: "8px 0",
          flex: 1,
          overflowY: "auto",
          minHeight: 0
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
          maxWidth: "none",
          width: "100%",
          margin: "0",
          padding: "40px 50px",
          minHeight: "calc(100vh - 40px)",
          position: "relative",
          overflowX: "auto"
        }}>
          <article style={{
            lineHeight: 1.6,
            fontSize: 14,
            color: "#24292e",
            width: "100%",
            maxWidth: "100%",
            overflowWrap: "break-word",
            wordBreak: "break-word"
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
                        fontSize: 28,
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
                        fontSize: 24,
                        fontWeight: 600,
                        color: "#24292e",
                        marginTop: 24,
                        marginBottom: 12,
                        lineHeight: 1.25,
                        borderBottom: "1px solid #e1e4e8",
                        paddingBottom: 6
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
                        fontSize: 20,
                        fontWeight: 600,
                        color: "#24292e",
                        marginTop: 20,
                        marginBottom: 10,
                        lineHeight: 1.25
                      }}
                      {...props}
                    >
                      {children}
                    </h3>
                  );
                },
                h4: ({ children, ...props }) => {
                  const text = String(children);
                  const id = text.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-").replace(/^-+|-+$/g, "");
                  return (
                    <h4
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
                    </h4>
                  );
                },
                h5: ({ children, ...props }) => {
                  const text = String(children);
                  const id = text.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-").replace(/^-+|-+$/g, "");
                  return (
                    <h5
                      id={id}
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#24292e",
                        marginTop: 16,
                        marginBottom: 8,
                        lineHeight: 1.25
                      }}
                      {...props}
                    >
                      {children}
                    </h5>
                  );
                },
                h6: ({ children, ...props }) => {
                  const text = String(children);
                  const id = text.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-").replace(/^-+|-+$/g, "");
                  return (
                    <h6
                      id={id}
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#24292e",
                        marginTop: 16,
                        marginBottom: 8,
                        lineHeight: 1.25
                      }}
                      {...props}
                    >
                      {children}
                    </h6>
                  );
                },
                p: ({ children, ...props }) => (
                   <p
                     style={{
                       marginBottom: 16,
                       lineHeight: 1.6,
                       color: "#24292e",
                       maxWidth: "100%",
                       overflowWrap: "break-word",
                       wordBreak: "break-word"
                     }}
                     {...props}
                   >
                     {children}
                   </p>
                 ),
                ul: ({ children, ...props }) => (
                  <ul
                    style={{
                      paddingLeft: 24,
                      marginBottom: 16,
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
                      paddingLeft: 24,
                      marginBottom: 16,
                      listStyleType: "decimal"
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
                      lineHeight: 1.6,
                      color: "#24292e"
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
                      fontStyle: "italic"
                    }}
                    {...props}
                  >
                    {children}
                  </blockquote>
                ),
                table: ({ children, ...props }) => (
                   <div style={{ overflowX: "auto", marginBottom: 16, maxWidth: "100%" }}>
                     <table
                       style={{
                         borderCollapse: "collapse",
                         width: "100%",
                         minWidth: "600px",
                         border: "1px solid #dfe2e5"
                       }}
                       {...props}
                     >
                       {children}
                     </table>
                   </div>
                 ),
                th: ({ children, ...props }) => (
                  <th
                    style={{
                      border: "1px solid #dfe2e5",
                      padding: "8px 12px",
                      background: "#f6f8fa",
                      fontWeight: 600,
                      textAlign: "left"
                    }}
                    {...props}
                  >
                    {children}
                  </th>
                ),
                td: ({ children, ...props }) => (
                  <td
                    style={{
                      border: "1px solid #dfe2e5",
                      padding: "8px 12px"
                    }}
                    {...props}
                  >
                    {children}
                  </td>
                ),
                a: ({ children, href, ...props }) => (
                  <a
                    href={href}
                    style={{
                      color: "#0366d6",
                      textDecoration: "none"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.textDecoration = "underline";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.textDecoration = "none";
                    }}
                    {...props}
                  >
                    {children}
                  </a>
                ),
                strong: ({ children, ...props }) => (
                  <strong
                    style={{
                      fontWeight: 600,
                      color: "#24292e"
                    }}
                    {...props}
                  >
                    {children}
                  </strong>
                ),
                em: ({ children, ...props }) => (
                  <em
                    style={{
                      fontStyle: "italic",
                      color: "#24292e"
                    }}
                    {...props}
                  >
                    {children}
                  </em>
                ),
                hr: ({ ...props }) => (
                  <hr
                    style={{
                      border: "none",
                      borderTop: "1px solid #e1e4e8",
                      margin: "24px 0"
                    }}
                    {...props}
                  />
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