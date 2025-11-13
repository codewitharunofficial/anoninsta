"use client";
import axios from 'axios';
import Head from 'next/head';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {

      const {data} = await axios.post('/api/contact', formData);
     

      if (data.success) {
        setStatus('Email sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send email. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('An error occurred. Please try again.');
    }

  };

  return (
    <>
      <Head>
        <title>Contact Us - Insecview</title>
      </Head>
      <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
        <h1>Contact Us</h1>
        <p>
          Have questions, suggestions, or feedback? We’d love to hear from you!
          Fill out the form below, and we’ll get back to you as soon as possible.
        </p>
        <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{ display: 'block', width: '100%', margin: '10px 0', padding: '8px' }}
              required
              className='border rounded-md'
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ display: 'block', width: '100%', margin: '10px 0', padding: '8px' }}
              required
              className='border rounded-md'
            />
          </label>
          <label>
            Message:
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              style={{ display: 'block', width: '100%', margin: '10px 0', padding: '8px' }}
              rows="5"
              required
              className='border rounded-md'
            />
          </label>
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#0070f3', color: '#fff', border: 'none', cursor: 'pointer' }} className='border rounded-md' >
            {
              status === "Sending..." ? "Sending..." : "Submit"
            }
          </button>
        </form>
      </div>
    </>
  );
};

export default Contact;