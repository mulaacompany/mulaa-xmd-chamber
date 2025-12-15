// MULAA XMD BOT - The Runic Forge
// Creator: Amantle Mpaekae (Mulax Prime)
// Purpose: Generates sacred sigils and cleanses chronicles
// Location: /gift (The Offering Chamber)

const fs = require('fs');

/**
 * Forges a sacred sigil of specified length for communion identification
 * @param {Number} essenceLength - Length of the sigil (default: 4)
 * @returns {String} - A unique sacred sigil
 */
function forgeSacredSigil(essenceLength = 4) {
  let sigil = "";
  const sacredGlyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const glyphsCount = sacredGlyphs.length;
  
  for (let i = 0; i < essenceLength; i++) {
    sigil += sacredGlyphs.charAt(Math.floor(Math.random() * glyphsCount));
  }
  return `MULAA-${sigil}`;
}

/**
 * Generates a communion code for pairing rituals (8 glyphs)
 * @returns {String} - A communion code for WhatsApp pairing
 */
function generateCommunionCode() {
  const communionGlyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let sacredCode = '';
  
  for (let i = 0; i < 8; i++) {
    sacredCode += communionGlyphs.charAt(Math.floor(Math.random() * communionGlyphs.length));
  }
  
  // Format: XXXX-XXXX
  return sacredCode.match(/.{1,4}/g).join('-');
}

/**
 * Purges a chronicle (file/folder) from existence
 * @param {String} chroniclePath - Path to the chronicle to cleanse
 * @returns {Boolean} - True if successfully cleansed
 */
async function purgeChronicle(chroniclePath) {
  if (!fs.existsSync(chroniclePath)) return false;
  
  try {
    await fs.promises.rm(chroniclePath, { recursive: true, force: true });
    return true;
  } catch (cleansingError) {
    console.error(`[MULAA_RUNIC_FORGE] Chronicle cleansing failed: ${cleansingError.message}`);
    return false;
  }
}

/**
 * Generates a timestamp for the MULAA chronicles
 * @returns {String} - Formatted timestamp
 */
function generateChronicleTimestamp() {
  const now = new Date();
  return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
}

module.exports = { 
  forgeSacredSigil, 
  purgeChronicle, 
  generateCommunionCode,
  generateChronicleTimestamp 
};
