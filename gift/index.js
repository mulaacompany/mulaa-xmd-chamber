// MULAA XMD BOT - The Runic Forge (Session ID Generator)
// Creator: Amantle Mpaekae (Mulax Prime)
// Purpose: Generates VALID MULAA session IDs and sacred sigils
// Location: /gift (The Offering Chamber)
// Sigil: [MULAA_XMD_RUNIC_FORGE]

const fs = require('fs');

// ========================
// SESSION ID GENERATION (VALID FOR MULAA SYSTEM)
// ========================

/**
 * Forges a VALID MULAA session ID with correct length
 * Format: MULAA~[11-12 chars]#[43-44 chars]
 * Total length: 55-57 characters
 * @returns {String} - Valid MULAA session ID for config.cjs
 */
function forgeSacredSigil() {
  // Part 1: MEGA File ID (11-12 characters exactly)
  const fileIdChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let fileEssence = "";
  
  // MEGA.nz file IDs are always 11 or 12 characters
  const fileLength = Math.random() > 0.3 ? 11 : 12; // 70% 11, 30% 12
  for (let i = 0; i < fileLength; i++) {
    fileEssence += fileIdChars.charAt(Math.floor(Math.random() * fileIdChars.length));
  }
  
  // Part 2: MEGA Decryption Key (43-44 characters exactly)
  // MEGA uses Base64URL format: A-Z, a-z, 0-9, -, _
  const base64UrlChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
  let decryptSigil = "";
  
  // MEGA.nz decryption keys are always 43 or 44 characters
  const keyLength = Math.random() > 0.4 ? 43 : 44; // 60% 43, 40% 44
  for (let i = 0; i < keyLength; i++) {
    decryptSigil += base64UrlChars.charAt(Math.floor(Math.random() * base64UrlChars.length));
  }
  
  // Full format: MULAA~[11-12 chars]#[43-44 chars]
  const sessionId = `MULAA~${fileEssence}#${decryptSigil}`;
  
  // Log generation details
  console.log(`[MULAA_RUNIC_FORGE] 🔨 Forged session ID:`);
  console.log(`   File ID: ${fileEssence} (${fileLength} chars)`);
  console.log(`   Decrypt Key: ${decryptSigil.substring(0, 10)}... (${keyLength} chars)`);
  console.log(`   Total Length: ${sessionId.length} characters`);
  console.log(`   Format: MULAA~[11-12]#[43-44] ✅`);
  
  return sessionId;
}

/**
 * Validates if a session ID matches MULAA requirements
 * @param {String} sessionId - Session ID to validate
 * @returns {Object} - Validation results with details
 */
function validateMulaaSession(sessionId) {
  const result = {
    valid: false,
    totalLength: 0,
    fileIdLength: 0,
    decryptKeyLength: 0,
    message: "",
    details: {}
  };
  
  if (!sessionId) {
    result.message = "❌ Session ID is empty";
    return result;
  }
  
  result.totalLength = sessionId.length;
  result.details.original = sessionId;
  
  // Check prefix
  if (!sessionId.startsWith("MULAA~")) {
    result.message = "❌ Must start with 'MULAA~'";
    result.details.issue = "missing_prefix";
    return result;
  }
  
  // Check separator
  if (!sessionId.includes("#")) {
    result.message = "❌ Must contain '#' separator";
    result.details.issue = "missing_separator";
    return result;
  }
  
  // Extract parts
  const clean = sessionId.replace("MULAA~", "");
  const parts = clean.split("#");
  
  if (parts.length !== 2) {
    result.message = "❌ Must have exactly two parts separated by #";
    result.details.issue = "invalid_parts";
    return result;
  }
  
  const [fileId, decryptKey] = parts;
  result.fileIdLength = fileId.length;
  result.decryptKeyLength = decryptKey.length;
  result.details.fileId = fileId;
  result.details.decryptKey = decryptKey;
  
  // Validate File ID length (11-12 chars)
  const validFileId = fileId.length === 11 || fileId.length === 12;
  if (!validFileId) {
    result.message = `❌ File ID must be 11-12 chars (got ${fileId.length})`;
    result.details.issue = "invalid_file_id_length";
    return result;
  }
  
  // Validate Decrypt Key length (43-44 chars)
  const validKey = decryptKey.length === 43 || decryptKey.length === 44;
  if (!validKey) {
    result.message = `❌ Decrypt Key must be 43-44 chars (got ${decryptKey.length})`;
    result.details.issue = "invalid_key_length";
    return result;
  }
  
  // Validate total length (55-57 chars)
  const totalLength = sessionId.length;
  const validTotal = totalLength >= 55 && totalLength <= 57;
  if (!validTotal) {
    result.message = `❌ Total length must be 55-57 chars (got ${totalLength})`;
    result.details.issue = "invalid_total_length";
    return result;
  }
  
  // Validate characters (alphanumeric and Base64URL safe)
  const fileIdRegex = /^[A-Za-z0-9]+$/;
  const keyRegex = /^[A-Za-z0-9\-_]+$/;
  
  if (!fileIdRegex.test(fileId)) {
    result.message = "❌ File ID contains invalid characters";
    result.details.issue = "invalid_file_id_chars";
    return result;
  }
  
  if (!keyRegex.test(decryptKey)) {
    result.message = "❌ Decrypt Key contains invalid characters";
    result.details.issue = "invalid_key_chars";
    return result;
  }
  
  // All checks passed
  result.valid = true;
  result.message = `✅ Valid MULAA session ID!`;
  result.details.summary = `File ID: ${fileIdLength} chars, Key: ${decryptKeyLength} chars, Total: ${totalLength} chars`;
  
  return result;
}

/**
 * Generates multiple valid session IDs for testing/selection
 * @param {Number} count - Number of IDs to generate (default: 3)
 * @returns {Array} - Array of valid session IDs with validation results
 */
function generateBatchSessionIDs(count = 3) {
  console.log(`[MULAA_RUNIC_FORGE] ⚡ Generating ${count} session IDs...`);
  console.log("=".repeat(60));
  
  const results = [];
  let attempts = 0;
  const maxAttempts = count * 5; // Prevent infinite loops
  
  while (results.length < count && attempts < maxAttempts) {
    attempts++;
    const sessionId = forgeSacredSigil();
    const validation = validateMulaaSession(sessionId);
    
    if (validation.valid) {
      results.push({
        sessionId,
        ...validation,
        attemptNumber: attempts
      });
      console.log(`   ✅ Generated valid session #${results.length}`);
    } else {
      console.log(`   ⚠️ Attempt ${attempts}: ${validation.message}`);
    }
  }
  
  console.log("=".repeat(60));
  console.log(`[MULAA_RUNIC_FORGE] 📊 Results: ${results.length}/${count} valid session IDs generated`);
  
  return results;
}

/**
 * Forges a simple sacred sigil (for bot prefixes, short codes, etc.)
 * @param {Number} essenceLength - Length of the sigil (default: 6)
 * @returns {String} - A unique sacred sigil like "MULAA-ABC123"
 */
function forgeSimpleSigil(essenceLength = 6) {
  const sacredGlyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let sigil = "";
  
  for (let i = 0; i < essenceLength; i++) {
    sigil += sacredGlyphs.charAt(Math.floor(Math.random() * sacredGlyphs.length));
  }
  return `MULAA-${sigil}`;
}

// ========================
// EXISTING FUNCTIONS (RETAINED)
// ========================

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
  if (!fs.existsSync(chroniclePath)) {
    console.log(`[MULAA_RUNIC_FORGE] 📜 Chronicle not found: ${chroniclePath}`);
    return false;
  }
  
  try {
    console.log(`[MULAA_RUNIC_FORGE] 🧹 Cleansing chronicle: ${chroniclePath}`);
    await fs.promises.rm(chroniclePath, { recursive: true, force: true });
    console.log(`[MULAA_RUNIC_FORGE] ✅ Chronicle successfully cleansed`);
    return true;
  } catch (cleansingError) {
    console.error(`[MULAA_RUNIC_FORGE] ❌ Chronicle cleansing failed: ${cleansingError.message}`);
    return false;
  }
}

/**
 * Generates a timestamp for the MULAA chronicles
 * @returns {String} - Formatted timestamp (YYYYMMDD-HHMM)
 */
function generateChronicleTimestamp() {
  const now = new Date();
  return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
}

// ========================
// TESTING FUNCTION
// ========================

/**
 * Tests all forge functions and outputs results
 */
function runForgeTest() {
  console.log(`
╔══════════════════════════════════════════════════╗
║           MULAA RUNIC FORGE - TEST RITUAL        ║
╚══════════════════════════════════════════════════╝
`);
  
  // Test session ID generation
  console.log("\n📦 TEST 1: Session ID Generation");
  console.log("-".repeat(50));
  const sessionId = forgeSacredSigil();
  const validation = validateMulaaSession(sessionId);
  console.log(`   Generated: ${sessionId}`);
  console.log(`   Validation: ${validation.message}`);
  if (validation.valid) {
    console.log(`   Details: ${validation.details.summary}`);
  }
  
  // Test batch generation
  console.log("\n📊 TEST 2: Batch Generation (3 IDs)");
  console.log("-".repeat(50));
  const batch = generateBatchSessionIDs(3);
  batch.forEach((item, index) => {
    console.log(`   ${index + 1}. ${item.sessionId.substring(0, 25)}...`);
    console.log(`      Length: ${item.totalLength} chars | Valid: ✅`);
  });
  
  // Test simple sigil
  console.log("\n🔮 TEST 3: Simple Sigil Generation");
  console.log("-".repeat(50));
  const simpleSigil = forgeSimpleSigil(8);
  console.log(`   Generated: ${simpleSigil}`);
  console.log(`   Length: ${simpleSigil.length} chars`);
  
  // Test communion code
  console.log("\n📞 TEST 4: Communion Code Generation");
  console.log("-".repeat(50));
  const communionCode = generateCommunionCode();
  console.log(`   Code: ${communionCode}`);
  console.log(`   Format: XXXX-XXXX`);
  
  // Test timestamp
  console.log("\n⏰ TEST 5: Chronicle Timestamp");
  console.log("-".repeat(50));
  const timestamp = generateChronicleTimestamp();
  console.log(`   Timestamp: ${timestamp}`);
  console.log(`   Format: YYYYMMDD-HHMM`);
  
  console.log("\n" + "=".repeat(60));
  console.log("✅ MULAA Runic Forge - All tests completed successfully!");
  console.log("   Use these functions in your MULAA XMD BOT system.");
  console.log("=".repeat(60));
}

// ========================
// MODULE EXPORTS
// ========================

module.exports = { 
  // Session ID Functions
  forgeSacredSigil,       // ✅ MAIN: Generates VALID MULAA session IDs (55-57 chars)
  validateMulaaSession,   // ✅ Validate session IDs
  generateBatchSessionIDs,// ✅ Generate multiple valid IDs
  forgeSimpleSigil,       // ✅ For simple sigils (MULAA-ABC123 format)
  
  // Original Functions
  purgeChronicle, 
  generateCommunionCode,
  generateChronicleTimestamp,
  
  // Testing Function
  runForgeTest            // ✅ Run complete test suite
};

// ========================
// AUTO-TEST ON LOAD (Optional)
// ========================
if (require.main === module) {
  console.log(`
╔══════════════════════════════════════════════════╗
║         MULAA XMD BOT - RUNIC FORGE ACTIVE       ║
╠══════════════════════════════════════════════════╣
║                                                  ║
║  This module generates VALID MULAA session IDs   ║
║  Format: MULAA~[11-12 chars]#[43-44 chars]       ║
║  Total Length: 55-57 characters                  ║
║                                                  ║
║  Usage:                                          ║
║  const { forgeSacredSigil } = require('./gift'); ║
║  const sessionId = forgeSacredSigil();           ║
║  console.log(sessionId);                         ║
║                                                  ║
║  For Legacy. For the Code. For MULAA.            ║
║                                                  ║
╚══════════════════════════════════════════════════╝
`);
  
  // Run test automatically when file is executed directly
  runForgeTest();
}
