import { useEffect, useState } from "react";
import { $getRoot, $getSelection } from "lexical";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $convertToMarkdownString, TRANSFORMERS } from "@lexical/markdown";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useDispatch, useSelector } from "react-redux";
import { setPrimaryContent } from "../../store/library";
import ImageUploader from "../molecules/ImageUploader";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import imgPlaceHolder from '../../assets/imgs/placeholder.png'

const theme = {
  ltr: "ltr",
  rtl: "rtl",
  placeholder: "editor-placeholder",
  paragraph: "editor-paragraph",
};

function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.focus();
  }, [editor]);

  return null;
}

function onError(error) {
  throw error;
}

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

const PrimaryContent = () => {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
  };

  const [image, setImage] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPrimaryContent({ image: image }));
  }, [image]);

  const handleChange = (id, value) => {
    dispatch(
      setPrimaryContent({
        [id]: value,
      })
    );
  };

  const onChange = (id, editorState, editor) => {
    editorState.read(() => {
      const rawHTML = $generateHtmlFromNodes(editor, null)
      const editorStateTextString = editorState.read(() => $getRoot().getTextContent());
      if(editorStateTextString !== '') {
        dispatch(
          setPrimaryContent({
            [id]: rawHTML,
          })
        );
      } else {
        dispatch(
          setPrimaryContent({
            [id]: null,
          })
        );
      }
    });
  };

  const primaryData = useSelector((state) => state.library.primaryContent)
  const [initialValue, setInitialValue] = useState(null)
  useEffect(() => {
    if(primaryData.title && primaryData.description) {
      setInitialValue({
        title: primaryData.title,
        description: primaryData.description
      })
    }
    if(primaryData.image) {
      setImage(primaryData.image)
    }
  }, [])

  return (
    // <div className="min-h-screen"></div>
    <div className="grid grid-cols-12 gap-0 gap-y-10 lg:gap-20 items-center">
      <div className="col-span-12 lg:col-span-4  flex flex-col gap-8">
        <ImageUploader
          handleFile={(file) => {
            setImage(file);
          }}
          defaultImg={primaryData.image ? primaryData.image : false}
          classNames="w-full min-h-72 rounded-2xl"
        />
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Enter your name here"
            className="font-bold capitalize"
            value={primaryData.name ? primaryData.name : ''}
            onChange={(text) => handleChange("name", text.target.value)}
          />
          <input
            type="email"
            placeholder="Enter email"
            className="text-sm"
            value={primaryData.email ? primaryData.email : ''}
            onChange={(text) => handleChange("email", text.target.value)}
          />
        </div>
      </div>
      <div className="col-span-12 lg:col-span-8 col-start-1 lg:col-start-5 relative w-full">
        <div className="relative w-full">
          <LexicalComposer initialConfig={initialConfig}>
            <PlainTextPlugin
              contentEditable={
                <ContentEditable className="editor-inputHead text-3xl lg:text-7xl" />
              }
              placeholder={
                <div className="editor-placeholderHead text-3xl lg:text-7xl">
                  Click to add title
                </div>
              }
            />
            <OnChangePlugin
              onChange={(editorState, editor) => onChange("title", editorState, editor)}
            />
            <MyCustomAutoFocusPlugin />
            {
              initialValue?.title &&
              <LexicalDefaultValuePlugin value={initialValue.title} />
            }
          </LexicalComposer>
        </div>
        <div className="relative w-full">
          <LexicalComposer initialConfig={initialConfig}>
            <PlainTextPlugin
              contentEditable={<ContentEditable className="editor-inputHead" />}
              placeholder={
                <div className="editor-placeholderHead">Click to add subtitle</div>
              }
            />
            <OnChangePlugin
              onChange={(editorState, editor) => onChange("description", editorState, editor)}
            />
            {
              initialValue?.description &&
              <LexicalDefaultValuePlugin value={initialValue.description} />
            }
          </LexicalComposer>
        </div>
      </div>
    </div>
  );
};

export default PrimaryContent;
