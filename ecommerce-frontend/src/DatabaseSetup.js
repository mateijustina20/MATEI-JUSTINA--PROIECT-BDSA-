import React from 'react';

const DatabaseSetup = () => (
  <section>
    <h2>Configurare Oracle Database</h2>
    <p>Urmează pașii de mai jos pentru a configura Oracle Database pe sistemul tău:</p>
    <ol>
      <li>
        <strong>Descarcă arhiva:</strong> Accesează site-ul oficial Oracle și descarcă fișierul ZIP al bazei de date.
      </li>
      <li>
        <strong>Extrage fișierele:</strong> Folosește un utilitar precum WinRAR sau 7-Zip pentru a extrage arhiva într-un folder dedicat, de exemplu, <code>C:\Oracle</code>.
      </li>
      <li>
        <strong>Rulează installer-ul:</strong> Găsește fișierul <code>setup.exe</code> în folderul extras și rulează-l. Acceptă permisiunile administrative.
      </li>
      <li>
        <strong>Finalizare:</strong> Urmează pașii din ghidul de instalare pentru a configura baza de date.
      </li>
    </ol>
    <p>
      După instalare, accesează <strong>Enterprise Manager</strong> la <code>https://localhost:5500/em</code> pentru configurări suplimentare.
    </p>
    <p>
      În cazul în care întâmpini probleme, folosește browserul Microsoft Edge în loc de Google Chrome.
    </p>
  </section>
);

export default DatabaseSetup;
