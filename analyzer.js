import fs from 'node:fs';

const fileName = "chat.txt";

const file = fs.readFileSync("data/" + fileName, "utf8");
const lines = file.split("\n");

const totalChat = {};
const pattern = /^(\d{2}\/\d{2}\/\d{2}) (\d{2})\.\d{2} - ([^:]+):/;

for (const line of lines) {
    if (line.match(pattern)) {
        const name = line.match(pattern)[3].trim();

        if (!totalChat[name]) {
            totalChat[name] = 1;
        } else {
            totalChat[name]++;
        }
    }
}

const result = Object.entries(totalChat).sort((a, b) => b[1] - a[1]);

console.log("\n===============================================");
console.log("||       Top Chat Contributor Analyzer       ||");
console.log("===============================================");
console.log("No | Name                           | Messages");
console.log("-----------------------------------------------");

for (let i = 0; i < result.length; i++) {
    const no = String(i + 1).padEnd(2);
    const name = result[i][0].padEnd(30);
    const messages = String(result[i][1]).padStart(8);

    console.log(`${no} | ${name} | ${messages}`);
}
