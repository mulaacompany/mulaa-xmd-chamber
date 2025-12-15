// MULAA XMD BOT - The Bonding Chamber (Pair Signature Pathway)
// Creator: Amantle Mpaekae (Mulax Prime)
// Location: /routes/pair.js (Sacred Pairing Ritual)

const { 
    forgeSacredSigil,
    purgeChronicle,
    generateCommunionCode,
    generateChronicleTimestamp
} = require('../gift');
const zlib = require('zlib');
const express = require('express');
const fs = require('fs');
const path = require('path');
let router = express.Router();
const pino = require("pino");
const { sendButtons } = require('gifted-btns');
const {
    default: mulaaConnect,
    useMultiFileAuthState,
    delay,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore,
    Browsers
} = require("@whiskeysockets/baileys");

const mulaaSanctum = path.join(__dirname, "chronicles");

router.get('/', async (req, res) => {
    const chronicleId = forgeSacredSigil();
    let num = req.query.number;
    let responseConveyed = false;
    let chronicleCleansed = false;

    async function cleanseChronicle() {
        if (!chronicleCleansed) {
            try {
                await purgeChronicle(path.join(mulaaSanctum, chronicleId));
            } catch (cleanseError) {
                console.error("[MULAA_BONDING] Chronicle cleansing failed:", cleanseError);
            }
            chronicleCleansed = true;
        }
    }

    async function INITIATE_MULAA_COMMUNION() {
        const { version } = await fetchLatestBaileysVersion();
        console.log(`[MULAA_BONDING] Communion protocol v${version.join('.')}`);
        
        const { state, saveCreds } = await useMultiFileAuthState(path.join(mulaaSanctum, chronicleId));
        
        try {
            let MulaaConduit = mulaaConnect({
                version,
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
                },
                printQRInTerminal: false,
                logger: pino({ level: "fatal" }).child({ level: "fatal" }),
                browser: Browsers.macOS("Safari"),
                syncFullHistory: false,
                generateHighQualityLinkPreview: true,
                shouldIgnoreJid: jid => !!jid?.endsWith('@g.us'),
                getMessage: async () => undefined,
                markOnlineOnConnect: true,
                connectTimeoutMs: 60000,
                keepAliveIntervalMs: 30000,
                userAgent: 'MULAA_XMD_BOT/1.0'
            });

            if (!MulaaConduit.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
                
                const sacredCode = generateCommunionCode();
                const communionSigil = await MulaaConduit.requestPairingCode(num, sacredCode);
                
                if (!responseConveyed && !res.headersSent) {
                    res.json({ 
                        code: communionSigil,
                        creator: 'Amantle Mpaekae (Mulax Prime)',
                        project: 'MULAA XMD BOT',
                        timestamp: generateChronicleTimestamp(),
                        message: 'Use this sigil swiftly - it carries the essence of MULAA.'
                    });
                    responseConveyed = true;
                }
            }

            MulaaConduit.ev.on('creds.update', saveCreds);
            MulaaConduit.ev.on("connection.update", async (connectionStatus) => {
                const { connection, lastDisconnect } = connectionStatus;

                if (connection === "open") {
                    console.log('[MULAA_BONDING] ✅ Communion established!');
                    
                    await delay(50000);
                    
                    let chronicleEssence = null;
                    let essenceAttempts = 0;
                    const maxEssenceAttempts = 15;
                    
                    while (essenceAttempts < maxEssenceAttempts && !chronicleEssence) {
                        try {
                            const essencePath = path.join(mulaaSanctum, chronicleId, "creds.json");
                            if (fs.existsSync(essencePath)) {
                                const essenceData = fs.readFileSync(essencePath);
                                if (essenceData && essenceData.length > 100) {
                                    chronicleEssence = essenceData;
                                    console.log(`[MULAA_BONDING] 📜 Chronicle essence captured (${essenceData.length} bytes)`);
                                    break;
                                }
                            }
                            await delay(8000);
                            essenceAttempts++;
                        } catch (readError) {
                            console.error("[MULAA_BONDING] Essence reading error:", readError);
                            await delay(2000);
                            essenceAttempts++;
                        }
                    }

                    if (!chronicleEssence) {
                        console.log('[MULAA_BONDING] ❌ Chronicle essence could not be captured');
                        await cleanseChronicle();
                        return;
                    }
                    
                    try {
                        let compressedEssence = zlib.gzipSync(chronicleEssence);
                        let base64Essence = compressedEssence.toString('base64');
                        await delay(5000);

                        let essenceTransmitted = false;
                        let transmissionAttempts = 0;
                        const maxTransmissionAttempts = 5;
                        let TransmissionResult = null;

                        while (transmissionAttempts < maxTransmissionAttempts && !essenceTransmitted) {
                            try {
                                TransmissionResult = await sendButtons(MulaaConduit, MulaaConduit.user.id, {
                                    title: '',
                                    text: `MULAA_XMD~${base64Essence}`,
                                    footer: `> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴀᴍᴀɴᴛʟᴇ ᴍᴘᴀᴇᴋᴀᴇ (ᴍᴜʟᴀx ᴘʀɪᴍᴇ)*\n> *ᴘʀᴏᴊᴇᴄᴛ: ᴍᴜʟᴀᴀ xᴍᴅ ʙᴏᴛ*`,
                                    buttons: [
                                        { 
                                            name: 'cta_copy', 
                                            buttonParamsJson: JSON.stringify({ 
                                                display_text: '📜 Copy Chronicle', 
                                                copy_code: `MULAA_XMD~${base64Essence}` 
                                            }) 
                                        },
                                        {
                                            name: 'cta_url',
                                            buttonParamsJson: JSON.stringify({
                                                display_text: '🌌 Visit Chronicles',
                                                url: 'https://github.com/romeobwiii/MULAA-XMD'
                                            })
                                        },
                                        {
                                            name: 'cta_url',
                                            buttonParamsJson: JSON.stringify({
                                                display_text: '⚡ Join Communion',
                                                url: 'https://whatsapp.com/channel/0029VbBdM812kNFhR12QdI2F'
                                            })
                                        }
                                    ]
                                });
                                essenceTransmitted = true;
                                console.log('[MULAA_BONDING] ✅ Chronicle essence transmitted to initiatee');
                            } catch (transmissionError) {
                                console.error("[MULAA_BONDING] Essence transmission error:", transmissionError);
                                transmissionAttempts++;
                                if (transmissionAttempts < maxTransmissionAttempts) {
                                    await delay(3000);
                                }
                            }
                        }

                        if (!essenceTransmitted) {
                            console.log('[MULAA_BONDING] ❌ Chronicle transmission failed');
                            await cleanseChronicle();
                            return;
                        }

                        await delay(3000);
                        await MulaaConduit.ws.close();
                        console.log('[MULAA_BONDING] 🔄 Communion conduit closed gracefully');
                    } catch (essenceError) {
                        console.error("[MULAA_BONDING] Essence processing error:", essenceError);
                    } finally {
                        await cleanseChronicle();
                    }
                    
                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    console.log("[MULAA_BONDING] 🔄 Communion disrupted - reestablishing...");
                    await delay(5000);
                    INITIATE_MULAA_COMMUNION();
                }
            });

        } catch (err) {
            console.error("[MULAA_BONDING] ❌ Communion ritual failed:", err);
            if (!responseConveyed && !res.headersSent) {
                res.status(500).json({ 
                    code: "CHAMBER_TEMPORARILY_SEALED",
                    message: "The Bonding Chamber is undergoing maintenance by Mulax Prime.",
                    creator: "Amantle Mpaekae (Mulax Prime)",
                    resolution: "Please attempt communion again when the stars align."
                });
                responseConveyed = true;
            }
            await cleanseChronicle();
        }
    }

    try {
        await INITIATE_MULAA_COMMUNION();
    } catch (finalError) {
        console.error("[MULAA_BONDING] ❌ Final communion failure:", finalError);
        await cleanseChronicle();
        if (!responseConveyed && !res.headersSent) {
            res.status(500).json({ 
                code: "ESSENCE_DISPERSION",
                message: "The communion ritual failed to manifest.",
                creator: "Amantle Mpaekae (Mulax Prime)"
            });
        }
    }
});

module.exports = router;
