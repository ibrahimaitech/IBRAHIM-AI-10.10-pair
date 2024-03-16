const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
	default: IBRAHIM_TECH,
	useMultiFileAuthState,
	jidNormalizedUser,
	Browsers,
	delay,
	makeInMemoryStore,
} = require("@whiskeysockets/baileys");

function removeFile(FilePath) {
	if (!fs.existsSync(FilePath)) return false;
	fs.rmSync(FilePath, {
		recursive: true,
		force: true
	})
};
const {
	readFile
} = require("node:fs/promises")
router.get('/', async (req, res) => {
	const id = makeid();
	async function IBRAHIM_TECH_QR_CODE() {
		const {
			state,
			saveCreds
		} = await useMultiFileAuthState('./temp/' + id)
		try {
			let Qr_Code_By_IBRAHIM_TECH = IBRAHIM_TECH({
				auth: state,
				printQRInTerminal: false,
				logger: pino({
					level: "silent"
				}),
				browser: Browsers.macOS("Desktop"),
			});

			Qr_Code_By_IBRAHIM_TECH.ev.on('creds.update', saveCreds)
			Qr_Code_By_IBRAHIM_TECH.ev.on("connection.update", async (s) => {
				const {
					connection,
					lastDisconnect,
					qr
				} = s;
				if (qr) await res.end(await QRCode.toBuffer(qr));
				if (connection == "open") {
					await delay(5000);
					let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
					await delay(800);
				   let b64data = Buffer.from(data).toString('base64');
				   let session = await Qr_Code_By_IBRAHIM_TECH.sendMessage(Qr_Code_By_IBRAHIM_TECH.user.id, { text: '' + b64data });
	
				   let IBRAHIM_TECH_TEXT = `
*_Qr Code By Ibrahim King_*
*_Made With 🤍_*
______________________________________
╔════◇
║ *『  IBRAHIM-TECH OFFICIAL 』*
║ YOU HAVE SUCCESSFULLY SELECTED THE BEST BOT
╰═════════════⊷
╔═════◇
║  『••• CONTACT THE OWNER 👇👇•••』
║❒ *Name:* IBRAHIM ADAMS
║❒ *Owner:* https://wa.me/message/74F2PC4JA4F3P1
║❒ *Group:* https://chat.whatsapp.com/L7T4iMvnfwCA8oLkUIRCFj
╰═════════════⊷
_____________________________________
	
_Don't Forget To Give Star To My Repo_`
	 await Qr_Code_By_IBRAHIM_TECH.sendMessage(Qr_Code_By_IBRAHIM_TECH.user.id,{text:IBRAHIM_TECH_TEXT},{quoted:session})



					await delay(100);
					await Qr_Code_By_IBRAHIM_TECH.ws.close();
					return await removeFile("temp/" + id);
				} else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
					await delay(10000);
					FLASH_MD_QR_CODE();
				}
			});
		} catch (err) {
			if (!res.headersSent) {
				await res.json({
					code: "Service is Currently Unavailable"
				});
			}
			console.log(err);
			await removeFile("temp/" + id);
		}
	}
	return await IBRAHIM_TECH_QR_CODE()
});
module.exports = router
