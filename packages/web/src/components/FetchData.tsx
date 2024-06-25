import { useState, useEffect } from "react";
import { Workspace } from "types";

// dane z endpointu w backendzie
export default function FetchData() {
    const [data, setData] = useState<Workspace[]>([]);

    useEffect(() => {
        fetch('http://localhost:5000/workspaces')
          .then((response) => response.json())
          .then(({ data }) => setData(data));
      }, []);

    return (
        <>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
    );
}