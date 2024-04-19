import Output from "editorjs-react-renderer";
import Image from "next/image";
import React from "react";
import Blocks from "editorjs-blocks-react-renderer-rm";
function CustomImageRenderer({ data }: any) {
  const src = data.file.url;

  return (
    <div className="relative min-h-[300rem] w-full justify-center">
      <Image
        alt="image"
        className="object-contain"
        src={src}
        width={600}
        height={400}
      />
    </div>
  );
}

function CustomCodeRenderer({ data }: any) {
  return (
    <pre className="rounded-md p-4">
      <code className="text-sm text-gray-100">{data.code}</code>
    </pre>
  );
}
function CustomParagraphRenderer({ data }: any) {
    console.log("pararaph",data)

    const color = 'black-900'
  return (
    <pre className="">
      <div className={`max-w-100 text-sm text-${color} text-center text-balance`}>
          {data.text}
        </div>
    </pre>
  );
}
function CustomHeaderRenderer({ data }: any) {
  console.log("header",data)
return (
  <pre className="text-center text-4xl font-bold">
    <h1 >
        {data.text}
      </h1>
  </pre>
);
}
const renderers = {
  //   image: CustomImageRenderer,
  code: CustomCodeRenderer,
  paragraph: CustomParagraphRenderer,
  header:CustomHeaderRenderer
};

const style = {
  paragraph: {
    fontSize: "20px",
    color:"black",
    margin: "20px",
    
  },
  header:{
    fontSize: '20px', marginRight: '150px'
  }
};
interface EditorOutputProps {
  content: any;
}

const classes = {
    header: 'header-class1 header-class2',
    paragraph: 'text-red-500',
  };

  const config = {
    header: {
      disableDefaultStyle: false,
    },
    image: {
      disableDefaultStyle: false,
    },
    video: {
      disableDefaultStyle: true,
    },
  };

const EditorOutput: React.FC<EditorOutputProps> = ({ content }) => (
  <section>
    <Output data={content} renderers={renderers} style={style} className={classes} config={config} />

    {/* option 2 */}
    <div>
        option 2
    </div>
    <Blocks
      data={content}
      config={{
        code: {
          className: "language-js"
        },
        delimiter: {
          className: "border border-2 w-16 mx-auto"
        },
        embed: {
          className: "border-0"
        },
        header: {
          className: "text-center font-bold text-4xl"
        },
        image: {
          className: "item-center m-20",
         
        },
        list: {
          className: "list-inside"
        },
        paragraph: {
          className: "p-20 text-black- text-2xl",
          actionsClassNames: {
            alignment: "text-center", // This is a substitution placeholder: left or center.
          }
        },
        quote: {
          className: "py-3 px-5 italic font-serif"
        },
        table: {
          className: "table-auto"
        }
      }} 
    />
  </section>
);

export default EditorOutput;
