import React from "react";
import Blocks from "editorjs-blocks-react-renderer-rm";

interface EditorOutputProps {
  content: any;
}

const EditorOutput: React.FC<EditorOutputProps> = ({ content }) => (
  <section>
    <div className="">
      <Blocks
        data={content}
        config={{
          code: {
            className: "language-ts",
          },
          delimiter: {
            className: "border border-2 w-16 mx-auto",
          },
          embed: {
            className: "border-0",
          },
          header: {
            className:
              "md:font-bold font-semibold  text-center md:text-4xl text-3xl my-5",
          },

          image: {
            className: "flex items-center justify-center mx-auto md:px-4 px-2",
          },
          list: {
            className: "list-inside",
          },

          paragraph: {
            className:
              "md:text-lg text-sm my-5 flex items-center justify-center max-w-[1100px] mx-auto md:px-4 px-2",

            actionsClassNames: {
              alignment: "text-center",
            },
          },
          quote: {
            className: "py-3 px-5 italic font-serif",
          },
          table: {
            className: "table-auto",
          },
        }}
      />
    </div>
  </section>
);

export default EditorOutput;
