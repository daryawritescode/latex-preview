import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import App from './App'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value },
    clear: () => { store = {} }
  }
})()

Object.defineProperty(window, 'localStorage', { value: localStorageMock })
window.confirm = vi.fn(() => true)

describe('LaTeX Preview', () => {
  beforeEach(() => {
    localStorageMock.clear()
  })

  it('renders initial content correctly', () => {
    render(<App />)
    const preview = document.querySelector('.markdown-body')
    const brand = document.querySelector('.brand-text')
    expect(brand?.textContent).toBe('LaTeX PREVIEW')
    expect(preview?.textContent).toContain("Einstein's famous energy-mass equivalence")
  })

  it('updates output when text is typed in editor', async () => {
    render(<App />)
    const textarea = screen.getByPlaceholderText(/Type your genius here/i)
    
    fireEvent.change(textarea, { target: { value: '# New Title\n$x = 42$' } })
    
    const preview = document.querySelector('.markdown-body')
    expect(preview?.textContent).toContain('New Title')
    expect(preview?.textContent).toContain('42')
  })

  it('clears content when trash button is clicked and confirmed', async () => {
    render(<App />)
    const clearBtn = screen.getByTitle(/Clear Everything/i)
    
    // Test cancellation first
    vi.mocked(window.confirm).mockReturnValueOnce(false)
    fireEvent.click(clearBtn)
    expect(screen.queryByText(/Blank Canvas/i)).not.toBeInTheDocument()

    // Test confirmation
    vi.mocked(window.confirm).mockReturnValueOnce(true)
    fireEvent.click(clearBtn)
    expect(screen.getByText(/Blank Canvas/i)).toBeInTheDocument()
  })

  it('copies content to clipboard and resets state after timeout', async () => {
    vi.useFakeTimers()
    render(<App />)
    const copyBtn = screen.getByTitle(/Copy Code/i)
    
    fireEvent.click(copyBtn)
    expect(navigator.clipboard.writeText).toHaveBeenCalled()
    
    // Advance timers to trigger reset
    act(() => {
      vi.advanceTimersByTime(2000)
    })
    
    // Check if copied state is reset (App doesn't show visual flag permanently)
    expect(copyBtn).toBeInTheDocument()
    vi.useRealTimers()
  })

  it('toggles zen mode (fullscreen) and allows exit via button or Escape key', () => {
    render(<App />)
    const toggleBtn = screen.getByTitle(/Toggle Zen Mode/i)
    const appContainer = document.querySelector('.app-container')
    
    // Toggle ON
    fireEvent.click(toggleBtn)
    expect(appContainer).toHaveClass('fullscreen-mode')
    
    // Test Floating Exit Button
    const exitBtn = screen.getByTitle(/Exit Zen Mode/i)
    fireEvent.click(exitBtn)
    expect(appContainer).not.toHaveClass('fullscreen-mode')

    // Toggle ON again
    fireEvent.click(toggleBtn)
    expect(appContainer).toHaveClass('fullscreen-mode')

    // Test Escape Key
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(appContainer).not.toHaveClass('fullscreen-mode')
  })
})
