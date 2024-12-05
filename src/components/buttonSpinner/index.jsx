// components/SpinnerButton.js
import { useState } from "react";
import React from "react";

export default function SpinnerButton({ onClick, children, styles }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    setLoading(true);
    
    // Usamos setTimeout para retrasar la ejecución de la función
    setTimeout(async () => {
      try {
        await onClick(); // Llamada a la función onClick después de 500ms
      } finally {
        setLoading(false); // Aseguramos que setLoading(false) se ejecute al final
      }
    }, 2000); // 500ms = 0.5 segundos
  };

  const childrenArray = React.Children.toArray(children);

  return (
    <button onClick={handleClick} disabled={loading} className={styles}>
      {loading ? (
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="#887EF2"
              d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
              opacity="0.25"
            />
            <path
              fill="#887EF2"
              d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
            >
              <animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" />
            </path>
          </svg>
        </div>
      ) : (
        // Renderizar los `children` correctamente, usando `toArray` para manejar varios elementos
        <>
          {childrenArray.map((child, index) => (
            <React.Fragment key={index}>{child}</React.Fragment>
          ))}
        </>
      )}
    </button>
  );
}
