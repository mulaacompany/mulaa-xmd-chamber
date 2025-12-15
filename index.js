// MULAA XMD BOT - The Heartstone (Main Gateway)
// Creator: Amantle Mpaekae (Mulax Prime)
// Project: MULAA COMPANY Ecosystem - Tribute Automation Division
// Sigil: [MULAA_XMD_HEARTSTONE]

const express = require('express');
const path = require('path');
const app = express();
__path = process.cwd();
const bodyParser = require("body-parser");

// MULAA Communion Port Configuration
const PORT = process.env.PORT || 50900;
const MULAA_SIGNATURE = process.env.MULAA_SIGNATURE || '#6A11CB';

// Import the Sacred Pathways
const { 
  qrRoute,      // The Sigil Forge
  pairRoute     // The Bonding Chamber
} = require('./routes');

// Amplify the Listener's Capacity for Mass Communion
require('events').EventEmitter.defaultMaxListeners = 5000;

// Middleware Protocols - The Filtering Veils
app.use(bodyParser.json());    // Parse JSON spirits
app.use(bodyParser.urlencoded({ extended: true }));  // Decode ancient URL encodings
app.use(express.static(path.join(__dirname, 'public')));

// MULAA Branding Middleware - Every response carries our essence
app.use((req, res, next) => {
  res.setHeader('X-Powered-By', 'MULAA COMPANY');
  res.setHeader('X-Creator', 'Amantle Mpaekae (Mulax Prime)');
  res.setHeader('X-Project', 'MULAA XMD BOT - Tribute Automation');
  res.setHeader('X-Sigil', MULAA_SIGNATURE);
  next();
});

// Sacred Pathway Activation
app.use('/qr', qrRoute);       // Activate The Sigil Forge
app.use('/code', pairRoute);   // Activate The Bonding Chamber

// Primary Communion Gateways
app.get('/pair', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pair.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Chronicle Endpoint - Reveals the Heartstone's Essence
app.get('/chronicle', (req, res) => {
  res.json({
    project: "MULAA XMD BOT",
    creator: "Amantle Mpaekae (Mulax Prime)",
    purpose: "Tribute-driven automation, mythic branding, and cinematic integration",
    status: "Heartstone Active",
    essence: "Gateway to MULAA COMPANY ecosystem",
    timestamp: new Date().toISOString(),
    sigil: MULAA_SIGNATURE,
    gates: {
      bonding: "/pair",
      sigil_forge: "/qr",
      code_chamber: "/code",
      chronicle: "/chronicle"
    }
  });
});

// Heartbeat Verification
app.get('/health', (req, res) => {
  res.json({
    status: 200,
    success: true,
    service: 'Mulaa XMD Session Server',
    essence: 'The Bonding Chamber & Sigil Forge',
    creator: 'Amantle Mpaekae (Mulax Prime)',
    timestamp: new Date().toISOString(),
    message: 'For Legacy, For the Code, For MULAA.'
  });
});

// Catch wandering spirits - 404 Handler with MULAA flair
app.use((req, res) => {
  res.status(404).json({
    error: 'Path Not Found',
    message: 'This pathway does not exist in the MULAA chronicles.',
    suggested_paths: ['/pair', '/chronicle', '/health'],
    creator: 'Amantle Mpaekae (Mulax Prime)'
  });
});

// Global Error Handler - Contains spectral anomalies
app.use((err, req, res, next) => {
  console.error(`[MULAA_XMD] Spectral Anomaly: ${err.message}`);
  res.status(500).json({
    error: 'Internal Communion Disruption',
    message: 'The Heartstone experienced a resonance disturbance.',
    resolution: 'The chronicles are being reviewed by Mulax Prime.',
    timestamp: new Date().toISOString()
  });
});

// Awaken the Heartstone
app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════════════╗
║                MULAA XMD BOT - HEARTSTONE ACTIVE         ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  Creator: Amantle Mpaekae (Mulax Prime)                  ║
║  Project: MULAA XMD BOT v1.0                             ║
║  Purpose: Tribute Automation & Cinematic Integration     ║
║                                                          ║
║  Communion Nexus: http://localhost:${PORT}                 ║
║  Bonding Gateway: /pair                                  ║
║  Sigil Forge: /qr                                        ║
║  Code Chamber: /code                                     ║
║  Chronicle: /chronicle                                   ║
║                                                          ║
║  YouTube: @mr_unique_hacker                              ║
║  GitHub: @mruniquehacker                                 ║
║                                                          ║
║  "Where connections are forged, and destinies are        ║
║   paired. Every interaction echoes in the halls of       ║
║   legacy."                                               ║
║                                                          ║
║  For Legacy. For the Code. For MULAA.                    ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
`);

  // Log to the MULAA chronicle file if it exists
  try {
    const fs = require('fs');
    const logPath = path.join(__dirname, 'logs', 'heartstone.log');
    if (!fs.existsSync(path.join(__dirname, 'logs'))) {
      fs.mkdirSync(path.join(__dirname, 'logs'), { recursive: true });
    }
    const logEntry = `[${new Date().toISOString()}] HEARTSTONE ACTIVATED - Port ${PORT} - Creator: Amantle Mpaekae\n`;
    fs.appendFileSync(logPath, logEntry);
  } catch (logError) {
    // Silent fail - chronicle logging is optional
  }
});

// Export the Heartstone for external communion
module.exports = app;
