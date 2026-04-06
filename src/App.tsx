import { useState, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  SquareFunction, 
  Trash2, 
  Copy, 
  Check, 
  Maximize2, 
  Minimize2,
  Terminal,
  Type
} from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Utility for merging classes */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const DEFAULT_CONTENT = `# Modern LaTeX Preview
Experience real-time $\\LaTeX$ rendering with zero latency.

## Math Examples
Einstein's famous energy-mass equivalence:
$$E = mc^2$$

The Schrödinger equation describes how the quantum state of a physical system changes with time:
$$i\\hbar\\frac{\\partial}{\\partial t}\\Psi(r,t) = \\hat{H}\\Psi(r,t)$$

## Features
- **Modern UI**: Glassmorphism & Neon accents.
- **Persistence**: Your work is saved locally.
- **Precision**: KaTeX powered mathematical rendering.
`

function App() {
  const [content, setContent] = useState(() => {
    return localStorage.getItem('latex-content') ?? DEFAULT_CONTENT
  })
  const [copied, setCopied] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    localStorage.setItem('latex-content', content)
  }, [content])

  const handleClear = () => {
    if (window.confirm("Nuclear option? This will wipe the editor.")) {
      setContent('')
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const toggleFullscreen = () => setFullscreen(!fullscreen)

  return (
    <div className={cn("app-container", fullscreen && "fullscreen-mode")}>
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "circOut" }}
        className="top-bar"
      >
        <div className="brand">
          <SquareFunction className="brand-icon" size={26} strokeWidth={2.5} />
          <span className="brand-text">ZAVTRA PREVIEW</span>
        </div>
        
        <div className="actions">
          <button className="btn-icon" onClick={toggleFullscreen} title="Toggle Zen Mode">
            {fullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>
          <div className="v-divider" />
          <button className="btn-icon group" onClick={handleCopy} title="Copy Code">
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                >
                  <Check className="text-secondary" size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                >
                  <Copy size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
          <button className="btn-icon group danger" onClick={handleClear} title="Clear Everything">
            <Trash2 size={20} />
          </button>
        </div>
      </motion.header>

      <main className="workspace">
        <section className={cn("pane editor-pane", fullscreen && "hidden")}>
          <div className="pane-label">
            <Terminal size={14} className="inline mr-2" /> SOURCE
          </div>
          <textarea
            ref={textareaRef}
            className="textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type your genius here..."
            spellCheck="false"
            autoFocus
          />
        </section>

        <section className="pane preview-pane">
          <div className="pane-label">
            <Type size={14} className="inline mr-2" /> RENDERED
          </div>
          <div className="markdown-body">
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
              components={{
                h1: ({node, ...props}) => <motion.h1 initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} {...(props as any)} />,
                p: ({node, ...props}) => <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} {...(props as any)} />
              }}
            >
              {content || '# Blank Canvas\nType some code to start rendering.'}
            </ReactMarkdown>
          </div>
        </section>
      </main>

      <footer className="footer-bar">
        <div className="meta">
          <span className="dot active" /> 
          Connected to local storage
        </div>
        <div className="stats">
          {content.length} characters • {content.split(/\s+/).filter(Boolean).length} words
        </div>
      </footer>
    </div>
  )
}

export default App
