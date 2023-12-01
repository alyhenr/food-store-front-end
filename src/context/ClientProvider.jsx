import { createContext, useState } from "react";

import PropTypes from "prop-types";

export const ClientContext = createContext(undefined);

const ClientProvider = ({ children }) => {
    const [client, setClient] = useState(undefined);

    return (
        <ClientContext.Provider value={{ client, setClient }}>
            {children}
        </ClientContext.Provider>
    )
}

ClientProvider.propTypes = {
    children: PropTypes.node,
}

export default ClientProvider
