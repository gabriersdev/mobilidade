import {useEffect, useRef, useState} from "react";
import {Form, FormControl, FormLabel} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export default function FormNav() {
  const [term, setTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  
  // Hook para capturar o atalho CTRL + K
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  
  useEffect(() => {
    if (isFocused && inputRef.current) inputRef.current.focus();
  }, [isFocused]);
  
  const showPlaceholder = !isFocused && !term;
  
  return (
    <Form
      onSubmit={(e) => {
        if (term.length < 3) return;
        e.preventDefault();
        navigate("/search/?term=" + term);
      }}
    >
      <FormLabel htmlFor="search-term" visuallyHidden>
        Pesquisar
      </FormLabel>
      
      <div
        className="bg-body px-2 py-1 border rounded d-flex align-items-center overflow-x-hidden"
        style={{maxWidth: "183.75px", height: "35px"}}
      >
        <div
          className="text-body-tertiary me-2 d-flex align-items-center"
          style={{marginLeft: "0.155rem"}}
        >
          <i className="bi bi-search"></i>
        </div>
        
        <FormControl
          ref={inputRef}
          id="search-term"
          name="term"
          type="search"
          autoComplete="off"
          className="p-0 border-0 bg-transparent shadow-none w-100 text-sml"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          minLength={3}
          aria-autocomplete={"none"}
          required
        />
        
        {showPlaceholder && (
          <button className="d-flex align-items-center border-0 shadow-none bg-body" onClick={() => setIsFocused(true)}>
            <kbd className="mb-0 me-2 text-sml px-1 py-0 bg-body-secondary text-body-tertiary font-monospace text-nowrap">
              CTRL + K
            </kbd>
            <span className="text-muted text-sml">Pesquisar</span>
          </button>
        )}
      </div>
    </Form>
  );
}
