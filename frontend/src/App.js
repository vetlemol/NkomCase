import React, { useEffect, useState } from "react";
import ApplicationsList from "./ApplicationsList";
import NewApplication from "./NewApplication";

function App() {
    const [applications, setApplications] = useState([]);

    // Hent søknader fra API
    const fetchApplications = () => {
        fetch("http://localhost:7262/api/applications")
            .then(res => res.json())
            .then(setApplications)
            .catch(console.error);
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    // Hent liste på nytt når søknad sendes
    const handleSubmitted = () => {
        fetchApplications();
    };

    return (
        <div>
            <h1>Oversikt</h1>
            <NewApplication onSubmitted={handleSubmitted} />
            <ApplicationsList applications={applications} /> 
        </div>
    );
}

export default App;
