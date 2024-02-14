import CustomTheme from "./CustomTheme";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import ToolbarPlugin from "./CustomToolBar";
import { HeadingNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $getRoot } from 'lexical';
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { HashtagPlugin } from "@lexical/react/LexicalHashtagPlugin";
import { HashtagNode } from "@lexical/hashtag";
import '../assets/scss/editor.css'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Placeholder() {
  return <div className="editor-placeholder">Start writing...</div>;
}

const editorConfig = {
  // The editor theme
  theme: CustomTheme,
  // Handling of errors during update
  onError(error) {
    throw error;
  },
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
    HashtagNode,
  ],
};

function LexicalDefaultValuePlugin({value}) {
  const [editor] = useLexicalComposerContext();

  const updateHTML = (editor, value, clear) => {
    const root = $getRoot();
    const parser = new DOMParser();
    const dom = parser.parseFromString(value, "text/html");
    const nodes = $generateNodesFromDOM(editor, dom);
    if (clear) {
      root.clear();
    }
    root.append(...nodes);
  };

  useEffect(() => {
    if (editor && value) {
      editor.update(() => {
        updateHTML(editor, value, true);
      });
    }
  }, [value]);

  return null;
}

const Editor = ({getContent}) => {

  const handleMarkdownChange = (content) => {
    console.log(content)
  };

  const [hasValue, setHasValue] = useState(false)
  const [html, setHtml] = useState(null)

  useEffect(() => {
      getContent(html)
  }, [html])

  const onChange = (editorState, editor) => {
    editor.update(() => {
      const rawHTML = $generateHtmlFromNodes(editor, null)
      const editorStateTextString = editorState.read(() => $getRoot().getTextContent());
      if(editorStateTextString !== '') {
        setHtml(rawHTML)
      } else {
        setHtml(null)
      }
    });
  }

  const content = useSelector((state) => state.library.content)

  const [defaultValue, setDefaultValue] = useState(null)

  useEffect(() => {
    const existingData = content.find((r) => r.name === 'About')
    if(existingData.value) {
      setDefaultValue(existingData.value)
        // setIsEditing(false)
    }
  }, [])

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <OnChangePlugin
            onChange={onChange}
          />
          <AutoFocusPlugin />
          <ListPlugin />
          <LinkPlugin />
          <HashtagPlugin />
          <LexicalDefaultValuePlugin value={defaultValue} />
        </div>
      </div>
    </LexicalComposer>
  );
};

export default Editor
