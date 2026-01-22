import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import "./editorTexto.css";

export default function EditorTexto({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: value || "<p></p>",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (onChange) {
        onChange(html);
      }
    },
  });

  // Cuando cambia el prop value, actualizamos el contenido del editor
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "<p></p>", false);
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const urlPrompt = window.prompt("Ingresa la URL", previousUrl || "");
    if (urlPrompt === null) {
      return; // Cancelado
    }
    if (urlPrompt === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: urlPrompt, target: "_blank" })
      .run();
  };

  return (
    <div className="editor-container">
      <div className="editor-toolbar">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
          title="Negrita (Ctrl+B)"
          type="button"
        >
          <b>B</b>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
          title="Cursiva (Ctrl+I)"
          type="button"
        >
          <i>I</i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "is-active" : ""}
          title="Subrayado"
          type="button"
        >
          <u>U</u>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
          title="Tachado"
          type="button"
        >
          <s>S</s>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
          title="Cita"
          type="button"
        >
          ❝
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
          title="Lista con viñetas"
          type="button"
        >
          •
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
          title="Lista numerada"
          type="button"
        >
          1.
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
          title="Alinear a la izquierda"
          type="button"
        >
          🡸
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={editor.isActive({ textAlign: "center" }) ? "is-active" : ""}
          title="Centrar"
          type="button"
        >
          ☰
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
          title="Alinear a la derecha"
          type="button"
        >
          🡺
        </button>
        <button
          onClick={setLink}
          className={editor.isActive("link") ? "is-active" : ""}
          title="Insertar / editar enlace"
          type="button"
        >
          🔗
        </button>
        <button
          onClick={() => editor.chain().focus().unsetLink().run()}
          title="Quitar enlace"
          type="button"
        >
          ❌
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          title="Deshacer (Ctrl+Z)"
          type="button"
        >
          ↺
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          title="Rehacer (Ctrl+Y)"
          type="button"
        >
          ↻
        </button>
      </div>

      <EditorContent
        editor={editor}
        className="editor-content"
        spellCheck={true}
      />
    </div>
  );
}
