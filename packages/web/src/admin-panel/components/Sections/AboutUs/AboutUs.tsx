import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";

import { useEffect, useState } from "react";

export default function AboutUs() {
  const [data, setData] = useState<any[]>([]);

  const fetchAboutUs = async () => {
    const response = await fetch("http://localhost:5000/about-us");
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error fetching:", errorText);
      return;
    }
    const d = await response.json();
    console.log(d);
    setData(d);
  };

  useEffect(() => {
    fetchAboutUs();
  }, []);

  return (
    <section>
      <h2 className="SectionTitle">O nas</h2>

      <div className="AboutUsDescription">
        <img src="jbojarski_small.png" alt="Jacek Bojarski" height={300} />
        {data.length > 0 && <div className="PostContent">
        <ReactMarkdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex, rehypeRaw]}
        >
          {data[0].content}
        </ReactMarkdown>
      </div>}
        
      </div>
    </section>
  );
}
