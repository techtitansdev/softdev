"use client";

import EditorJS from "@editorjs/editorjs";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { z } from "zod";
import { PostValidator } from "./PostValidator";

type FormData = z.infer<typeof PostValidator>;

interface EditorProps {
  onChanges: (data: any) => void;
  initialData?: any[];
}

export const NewEditor: React.FC<EditorProps> = ({
  onChanges,
  initialData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({});
  const ref = useRef<EditorJS>();
  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const ImageTool = (await import("@editorjs/image")).default;
    const Paragraph = (await import("@editorjs/paragraph")).default;
    const Underline = (await import("@editorjs/underline")).default;
    const ColorPlugin = require("editorjs-text-color-plugin");

    const AlignmentTuneTool = (
      await import("editorjs-text-alignment-blocktune")
    ).default;

    console.log("editor initialData");
    console.log("initial data:", initialData);

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        onChange: async () => {
          if (ref.current) {
            const blocks = await ref.current?.save();
            console.log(JSON.stringify(blocks, null, 2));
            onChanges(blocks);
          }
        },
        placeholder: "",
        inlineToolbar: true,
        data: {
          blocks: initialData || [
            // Example initial data with image block
            {
              type: "image",
              data: {
                url: "https://example.com/image.jpg",
                caption: "Example Image Caption",
                withBorder: false,
                withBackground: false,
                stretched: false
              }
            }
          ]
        },
        tools: {
          alignementTool: AlignmentTuneTool,
          underline: Underline,

          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
            tunes: ["alignementTool"],
          },

          header: {
            class: Header,
            inlineToolbar: true,
            tunes: ["alignementTool"],
            config: {
              levels: [1, 2, 3, 4],
            },
          },

          Color: {
            class: ColorPlugin,
            config: {
              colorCollections: ["#EC7878", "#9C27B0"],
              defaultColor: "#FF1300",
              type: "text",
              customPicker: true,
            },
          },

          Marker: {
            class: ColorPlugin,
            config: {
              colorCollections: [
                "#EC7878",
                "#9C27B0",
                "#673AB7",
                "#3F51B5",
                "#0070FF",
                "#03A9F4",
                "#00BCD4",
                "#4CAF50",
                "#8BC34A",
                "#CDDC39",
                "#FFF",
              ],
              defaultColor: "#FFBF00",
              type: "marker",
              customPicker: true,
            },
          },

          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: any) {
                  try {
                    const formData = new FormData();
                    formData.append("file", file);

                    // Make a POST request to Cloudinary's upload API
                    const response = await axios.post(
                      "https://api.cloudinary.com/v1_1/dzpghgd8d/image/upload",
                      formData,
                      {
                        headers: {
                          "Content-Type": "multipart/form-data",
                        },
                        params: {
                          upload_preset: "gxk09fmu",
                        },
                      }
                    );

                    return {
                      success: 1,
                      file: {
                        url: response.data.secure_url,
                      },
                    };
                  } catch (error) {
                    console.error(
                      "Error uploading image to Cloudinary:",
                      error
                    );

                    // Return an error message
                    return {
                      success: 0,
                      error: {
                        message: "Failed to upload image.",
                      },
                    };
                  }
                },
              },
            },
          },

          list: {
            class: List,
            inlineToolbar: true,
            tunes: ["alignementTool"],
          },

          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, [initialData]);

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [_key, value] of Object.entries(errors)) {
        value;
      }
    }
  }, [errors]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();

      setTimeout(() => {
        _titleRef?.current?.focus();
      }, 0);
    };

    if (isMounted) {
      init();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  async function onSubmit(data: FormData) {
    const blocks = await ref.current?.save();
    console.log("blocks");
  }

  if (!isMounted) {
    return null;
  }

  const { ref: titleRef, ...rest } = register("title");

  return (
    <div className="flex min-w-[1100px]  items-center justify-center  rounded-lg border">
      <form
        id="subreddit-post-form"
        className="flex flex-col items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="prose prose-stone dark:prose-invert heading justify-center">
          <div
            id="editor"
            className="min-h-[650px] min-w-[650px] justify-center"
            data-testid="editor"
          />
        </div>
      </form>
    </div>
  );
};
