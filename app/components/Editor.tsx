'use client'

import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import ImageExtension from '@tiptap/extension-image'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import TextAlign from '@tiptap/extension-text-align'
import Typography from '@tiptap/extension-typography'
import { Undo, Redo, Bold, Italic, ImageIcon } from 'lucide-react'

export default function TiptapEditor({ content, setContent }: { content: string, setContent: (value: string) => void }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            ImageExtension,
            TaskList,
            TaskItem,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Typography,
        ],
        content,
        onUpdate: ({ editor }) => {
            setContent(editor.getHTML())
        }
    })

    return (
        <div className="border rounded-lg p-4">
            {editor && <Toolbar editor={editor} />}
            <EditorContent editor={editor} className="prose min-h-[200px] focus:outline-none" />
        </div>
    )
}

function Toolbar({ editor }: { editor: Editor }) {
    return (
        <div className="flex items-center space-x-2 border-b pb-2 mb-2">
            <button
                onClick={() => editor.chain().focus().undo().run()}
                className="p-1 hover:bg-gray-100 rounded"
                title="Undo"
            >
                <Undo size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().redo().run()}
                className="p-1 hover:bg-gray-100 rounded"
                title="Redo"
            >
                <Redo size={18} />
            </button>
            <div className="border-l h-5 mx-2" />
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-1 hover:bg-gray-100 rounded ${editor.isActive('bold') ? 'text-blue-500' : ''}`}
                title="Bold"
            >
                <Bold size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-1 hover:bg-gray-100 rounded ${editor.isActive('italic') ? 'text-blue-500' : ''}`}
                title="Italic"
            >
                <Italic size={18} />
            </button>
            <div className="border-l h-5 mx-2" />
            <button
                onClick={() => {
                    const url = prompt('Image URL')
                    if (url) {
                        editor.chain().focus().setImage({ src: url }).run()
                    }
                }}
                className="p-1 hover:bg-gray-100 rounded"
                title="Insert Image"
            >
                <ImageIcon size={18} />
            </button>
            <div className="border-l h-5 mx-2" />
            {/* Alignment */}
            <button
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                className={`p-1 hover:bg-gray-100 rounded ${editor.isActive({ textAlign: 'left' }) ? 'text-blue-500' : ''}`}
                title="Align Left"
            >
                <span className="text-sm">≡</span>
            </button>
            <button
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                className={`p-1 hover:bg-gray-100 rounded ${editor.isActive({ textAlign: 'center' }) ? 'text-blue-500' : ''}`}
                title="Align Center"
            >
                <span className="text-sm">≡</span>
            </button>
            <button
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                className={`p-1 hover:bg-gray-100 rounded ${editor.isActive({ textAlign: 'right' }) ? 'text-blue-500' : ''}`}
                title="Align Right"
            >
                <span className="text-sm">≡</span>
            </button>
            <button
                onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                className={`p-1 hover:bg-gray-100 rounded ${editor.isActive({ textAlign: 'justify' }) ? 'text-blue-500' : ''}`}
                title="Justify"
            >
                <span className="text-sm">≡</span>
            </button>
        </div>
    )
}
