import Arial from "@/components/ui/arial/arial.jsx";
import {Link} from "react-router-dom";

export function renderText(text) {
  try {
    if (!text.split) return text;
    
    const parts = text.split(/(Atenção,|Atenção)/g);
    let elements = [];
    
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      
      if (part === "Atenção," || part === "Atenção") {
        if (i > 1 || (i === 1 && parts[0].trim() !== "")) elements.push(<span key={`br-${i}-#1`} className={"d-block my-2"}></span>);
        elements.push(<span key={`atencao-${i}`}>{part}</span>);
      }
      
      //
      else if (part) {
        const subParts = part.split(/(\/)/);
        const subElements = subParts.map((subPart, subIndex) => {
          if (subPart === "/") return (<span key={`${i}-${subIndex}`} style={{fontSize: 'inherit', fontFamily: "'Arial', sans-serif"}}>/</span>);
          return subPart;
        });
        
        elements.push(...subElements);
      }
    }
    return elements;
  } catch {
    return text;
  }
};

export function wrapTextInArialIfNeeded(text, keyPrefix) {
  const parts = [];
  if (!text.split) return text;
  const split = text.split(/(\s+)/);
  let key = 0;
  
  split.forEach((part) => {
    if (part.includes("/")) {
      const [before, after] = part.split("/")
      
      parts.push(
        <span key={`${keyPrefix}-a-${key++}`}>
          <i className={"fst-normal"}>{before}</i>
          <Arial>/</Arial>
          <i className={"fst-normal"}>{after}</i>
        </span>
      );
      
    }
    
    //
    else parts.push(<span key={`${keyPrefix}-s-${key++}`}>{part}</span>);
  });
  
  return parts;
};

export function processContents(text) {
  const regex = /<Link\s+to={["']([^"']+)["']}>(.*?)<\/Link>/g;
  const elements = [];
  let lastIndex = 0;
  let match;
  let key = 0;
  
  while ((match = regex.exec(text)) !== null) {
    const [fullMatch, to, content] = match;
    const index = match.index;
    
    const beforeText = text.slice(lastIndex, index);
    if (beforeText) {
      elements.push(...wrapTextInArialIfNeeded(beforeText, key));
      key++;
    }
    
    const linkContent =
      content.includes("/") ? <Arial>{content}</Arial> : content;
    
    elements.push(
      <Link key={`link-${key++}`} to={to}>
        {linkContent}
      </Link>
    );
    
    lastIndex = index + fullMatch.length;
  }
  
  const afterText = text.slice(lastIndex);
  if (afterText) elements.push(...wrapTextInArialIfNeeded(afterText, key));
  return elements;
};
