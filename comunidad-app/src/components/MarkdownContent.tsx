import ReactMarkdown from 'react-markdown'
import { cn } from '@/lib/utils'

/**
 * Renderiza contenido de tema/comentario/respuesta con Markdown básico
 * (negrita, títulos, listas, citas). react-markdown no interpreta HTML crudo
 * incluido en el texto (no hay rehype-raw) — es la barrera contra XSS, no una
 * elección de estilo.
 */
export function MarkdownContent({ content, className }: { content: string; className?: string }) {
  return (
    <div className={cn('space-y-2 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0', className)}>
      <ReactMarkdown
        components={{
          h1: ({ node: _node, ...props }) => <h3 className="text-lg font-semibold" {...props} />,
          h2: ({ node: _node, ...props }) => <h4 className="text-base font-semibold" {...props} />,
          h3: ({ node: _node, ...props }) => <h4 className="text-sm font-semibold" {...props} />,
          p: ({ node: _node, ...props }) => <p className="whitespace-pre-wrap" {...props} />,
          ul: ({ node: _node, ...props }) => <ul className="list-disc space-y-1 pl-5" {...props} />,
          ol: ({ node: _node, ...props }) => <ol className="list-decimal space-y-1 pl-5" {...props} />,
          blockquote: ({ node: _node, ...props }) => (
            <blockquote className="border-l-2 border-primary/40 pl-3 italic text-muted-foreground" {...props} />
          ),
          a: ({ node: _node, ...props }) => (
            // eslint-disable-next-line jsx-a11y/anchor-has-content
            <a className="text-primary underline" target="_blank" rel="noreferrer" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
