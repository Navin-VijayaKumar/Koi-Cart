import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData();
    formData.append('access_key', 'a8cf2cad-503d-4abc-8d1a-335fd6ad347d');
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    }).then((res) => res.json());

    setIsLoading(false);
    
    if (res.success) {
      alert(res.message);
      setName('');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <section id='contact' className='contact-section'>
      <h2>Get in Touch</h2>
      <p>We value your feedback! Send us a message and we’ll get back to you.</p>
      
      <form onSubmit={onSubmit} className='contact-form'>
        <input
          type='text'
          placeholder='Your Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className='contact-input'
        />
        <input
          type='email'
          placeholder='Your Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='contact-input'
        />
        <textarea
          placeholder='Your Message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className='contact-textarea'
        />
        <button type='submit' disabled={isLoading} className='contact-btn'>
          {isLoading ? 'Sending...' : 'Submit Message'}
        </button>
      </form>
    </section>
  );
};

export default Contact;