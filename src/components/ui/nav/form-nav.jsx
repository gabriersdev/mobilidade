import {useCallback, useEffect, useRef, useState} from "react";
import {Form, FormControl, FormLabel} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export default function FormNav() {
  const [term, setTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  
  const handleFocusedTrue = useCallback((e) => {
    e.stopPropagation()
    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
    setIsFocused(true);
  }, []);
  
  const handleFocusedFalse = useCallback((e) => {
    e.stopPropagation()
    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
    setIsFocused(false);
  }, []);
  
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
        className={"bg-body px-2 py-1 rounded d-flex align-items-center overflow-x-hidden "}
        style={{
          maxWidth: "183.75px", height: "35px",
          ...(isFocused ? {
            color: "var(--bs-body-color)",
            backgroundColor: "var(--bs-body-bg)",
            border: "var(--bs-border-width) solid #97d2f3",
            outline: 0,
            boxShadow: "0 0 0 .25rem rgba(47,164,231,.25)",
          } : {
            border: "var(--bs-border-width) solid var(--bs-border-color)",
          })
        }}
        onClick={handleFocusedTrue}
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
          onFocus={handleFocusedTrue}
          onBlur={handleFocusedFalse}
          minLength={3}
          aria-autocomplete={"none"}
          required
        />
        
        {showPlaceholder && (
          <button
            className="d-flex align-items-center border-0 shadow-none bg-body"
            onClick={handleFocusedTrue}
          >
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
