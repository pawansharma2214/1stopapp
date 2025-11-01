"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to Thank You page on submit
    router.push("/contact/thank-you");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
