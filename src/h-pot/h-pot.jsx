import config from '../assets/config';

// TODO - implementar verificação HONEY POT
export default function HPot() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    // Client-side check (optional, but good for quick feedback)
    if (data.honeypot) {
      console.log("Honeypot triggered on client-side!");
      return;
    }
    
    // Proceed with form submission, sending all data to the backend for verification
    try {
      const response = await fetch(`${config.host}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Send all form fields, including the honeypot, to the backend
        body: JSON.stringify(data),
      });
      
      // Handle successful submission (e.g., show a success message)
      if (response.ok) console.log("Form submitted successfully!");
      
      // Handle submission error
      else console.error("Form submission failed.");
      
    } catch (error) {
      console.error("An error occurred during submission:", error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email: <input type="email" name="email"/></label>
        <label>Mensagem: <textarea name="message"></textarea></label>
      </div>
      {/* This is the honeypot field, hidden from users */}
      <div style={{position: 'absolute', left: '-5000px'}} aria-hidden="true">
        <label htmlFor="honeypot">Do not fill this out</label>
        <input type="text" id="honeypot" name="honeypot" tabIndex="-1" autoComplete="off"/>
      </div>
      <button type="submit">Enviar</button>
    </form>
  )
}
