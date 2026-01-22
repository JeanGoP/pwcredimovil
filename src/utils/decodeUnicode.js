/**
 * Decodifica una cadena con caracteres Unicode escritos como "u00e1" o "\u00f3".
 *
 * @param {string} str - Texto recibido de la API
 * @returns {string} - Texto ya decodificado
 */
const decodeUnicodeString = (str) => {
    if (!str || typeof str !== "string") return str;
  
    try {
      // Normaliza "u00e1" -> "\u00e1"
      const normalized = str.replace(/u00([0-9a-f]{2})/gi, "\\u00$1");
      // Usa JSON.parse para interpretar las secuencias Unicode
      return JSON.parse(`"${normalized}"`);
    } catch {
      return str;
    }
  };
  
  /**
   * Recorre un objeto JSON completo (arrays y objetos anidados)
   * y decodifica todos los valores string.
   *
   * @param {any} data - JSON recibido de la API
   * @returns {any} - JSON con strings decodificados
   */
  export const decodeUnicodeDeep = (data) => {
    if (Array.isArray(data)) {
      return data.map((item) => decodeUnicodeDeep(item));
    } else if (data && typeof data === "object") {
      return Object.fromEntries(
        Object.entries(data).map(([key, value]) => [
          key,
          decodeUnicodeDeep(value),
        ])
      );
    } else if (typeof data === "string") {
      return decodeUnicodeString(data);
    }
    return data;
  };
  