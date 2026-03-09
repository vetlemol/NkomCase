import React, { useState } from "react";

function NewApplication({ onSubmitted }) {
    const [Title, setTitle] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch("http://localhost:7262/api/applications", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Title }) 
        });
        setTitle("");
        if (onSubmitted) onSubmitted();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Ny søknad</h2>
            <div>
                <label>Tittel: </label>
                <input value={Title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <button type="submit">Send inn</button>
        </form>
    );
}

export default NewApplication;
