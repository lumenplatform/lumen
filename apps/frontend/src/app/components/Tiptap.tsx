import styled from '@emotion/styled';
import { Box } from '@mui/system';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const Tool = styled.button`
  font-size: inherit;
  font-family: inherit;
  color: #000;
  margin: 0.1rem;
  border: 1px solid black;
  border-radius: 0.3rem;
  padding: 0.1rem 0.4rem;
  background: white;
  accent-color: black;
`;

const MenuBar = ({ editor }: any) => {
  if (!editor) {
    return null;
  }

  return (
    <>
      <Tool
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        bold
      </Tool>
      <Tool
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        italic
      </Tool>
      <Tool
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        strike
      </Tool>
      <Tool
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? 'is-active' : ''}
      >
        code
      </Tool>
      <Tool onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </Tool>
      <Tool onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </Tool>
      <Tool
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active' : ''}
      >
        paragraph
      </Tool>
      <Tool
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        h1
      </Tool>
      <Tool
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        h2
      </Tool>
      <Tool
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
      >
        h3
      </Tool>
      <Tool
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
      >
        h4
      </Tool>
      <Tool
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
      >
        h5
      </Tool>
      <Tool
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
      >
        h6
      </Tool>
      <Tool
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        bullet list
      </Tool>
      <Tool
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        ordered list
      </Tool>
      <Tool
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        code block
      </Tool>
      <Tool
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        blockquote
      </Tool>
      <Tool onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        horizontal rule
      </Tool>
      <Tool onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </Tool>
      <Tool onClick={() => editor.chain().focus().undo().run()}>undo</Tool>
      <Tool onClick={() => editor.chain().focus().redo().run()}>redo</Tool>
    </>
  );
};

const Tiptap = ({ onChange, content }: { onChange: any; content?: string }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content ?? '<p>Hello World!</p>',
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <Box sx={{ m: 1 }}>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </Box>
  );
};

export default Tiptap;
