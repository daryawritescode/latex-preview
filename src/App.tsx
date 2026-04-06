import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { FunctionSquare, Eraser, Copy, Check } from 'lucide-react'

const DEFAULT_CONTENT = `Add your LaTex or Markdown code here.`

function App() {
  const [content, setContent] = useState(() => {
    return localStorage.getItem('latex-content') ?? DEFAULT_CONTENT
  })

  const [copied, setCopied] = useState(false)

  useEffect(() => {
    localStorage.setItem('latex-content', content)
  }, [content])

  const handleClear = () => {
    setContent('')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="app-container">
      <header className="top-bar">
        <div className="brand">
          <FunctionSquare className="brand-icon" size={24} />
          <span>LaTex Preview</span>
        </div>
        <div className="actions">
          <button className="btn-icon" onClick={handleCopy} title="Copy Raw Text">
            {copied ? <Check size={18} /> : <Copy size={18} />}
          </button>
          <button className="btn-icon" onClick={handleClear} title="Clear Editor">
            <Eraser size={18} />
          </button>
        </div>
      </header>

      <main className="workspace">
        <section className="pane editor-pane">
          <div className="pane-header">Input</div>
          <textarea
            className="textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type some markdown and $ \\LaTeX $ here..."
            spellCheck="false"
          />
        </section>

        <section className="pane preview-pane">
          <div className="pane-header">Rendered</div>
          <div className="markdown-body">
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {content || '*No content to render*'}
            </ReactMarkdown>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
