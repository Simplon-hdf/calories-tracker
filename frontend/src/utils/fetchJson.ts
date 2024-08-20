/**
 * Utility function to perform a fetch request and process the JSON response.
 * @param url The URL to fetch.
 * @param options The fetch options, including method, headers, body, etc.
 * @returns The parsed JSON response if the request is successful.
 * @throws An error if the request fails or if the response is not JSON.
 */
export const fetchJson = async (url: string, options: RequestInit) => {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erreur lors de la requête');
    }
  
    const contentType = response.headers.get('Content-Type');
    
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      console.error('Type de contenu inattendu:', contentType);
      throw new Error('Réponse inattendue du serveur');
    }
  };
  