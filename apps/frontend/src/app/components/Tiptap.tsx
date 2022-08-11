import styled from '@emotion/styled';
import {
  CodeOutlined,
  FormatBoldOutlined,
  FormatItalicOutlined,
  FormatListBulleted,
  FormatQuote,
  FormatStrikethroughOutlined,
  HorizontalRule,
  IntegrationInstructionsOutlined,
} from '@mui/icons-material';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const ToolX = styled(Button)`
  margin: 0.1rem;
  background: white;
  line-height: 1;
  min-width: unset;
  &.is-active {
    background: #eee;
  }
`;

const Tool = (props: any) => <ToolX {...props} size="small" color="inherit" />;

const MenuBar = ({ editor }: any) => {
  if (!editor) {
    return null;
  }

  return (
    <Box sx={{ borderBottom: '1px solid lightgray', p: 1 }}>
      <Tool
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        <FormatBoldOutlined fontSize="small" />
      </Tool>
      <Tool
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        <FormatItalicOutlined />
      </Tool>
      <Tool
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        <FormatStrikethroughOutlined />
      </Tool>
      <Tool
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? 'is-active' : ''}
      >
        <CodeOutlined />
      </Tool>
      <Tool
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        <FormatListBulleted />
      </Tool>
      <Tool
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        <FormatListBulleted />
      </Tool>
      <Tool
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        <IntegrationInstructionsOutlined />
      </Tool>
      <Tool
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        <FormatQuote />
      </Tool>
      <Tool onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <HorizontalRule />
      </Tool>
      <br></br>
      {/* <Tool onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </Tool>
      <Tool onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </Tool> */}
      &nbsp;
      <Tool
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active' : ''}
      >
        P
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
      <Tool onClick={() => editor.chain().focus().setHardBreak().run()}>
        BR
      </Tool>
      {/* <Tool onClick={() => editor.chain().focus().undo().run()}>undo</Tool> */}
      {/* <Tool onClick={() => editor.chain().focus().redo().run()}>redo</Tool> */}
    </Box>
  );
};

const Tiptap = ({ onChange, content }: { onChange: any; content?: string }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content ?? '<p>Enter your content Here</p>',
    onUpdate({ editor }) {
      if (onChange) onChange(editor.getHTML());
    },
  });

  return (
    <Box
      sx={{
        border: '1px solid lightgray',
        m: 1,
        borderRadius: '5px',
      }}
    >
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </Box>
  );
};

export default Tiptap;
