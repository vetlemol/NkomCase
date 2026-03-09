import React, { useEffect, useState } from "react";

// Funksjonen tar imot en liste av søknader og viser dem i en enkel html liste
function ApplicationsList({ applications }) {
    return (
        <ul>
        {/*For hver søknad i listen, vis tittel, status og opprettelsestidspunkt*/}
            {applications.map(app => (
                <li key={app.id}>
                    {app.title} - {app.status} - {new Date(app.createdAt).toLocaleString()}
                </li>
            ))}
        </ul>
    );
}

export default ApplicationsList;
