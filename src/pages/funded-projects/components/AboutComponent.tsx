import React from "react";

interface AboutComponentProps {
  about: string;
}

const AboutComponent: React.FC<AboutComponentProps> = ({ about }) => {
  return <div dangerouslySetInnerHTML={{ __html: about }} />;
};

export default AboutComponent;
