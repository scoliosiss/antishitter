import request from "requestV2/index"
const prefix = ("&9Shitter &3list &b> ")

register("chat", (shitter, classlevel) => {
    request("https://raw.githubusercontent.com/scoliosiss/mushroomclient/main/dungeonshitters.json").then(stuff => {
        request(`https://api.mojang.com/users/profiles/minecraft/${shitter}`).then(function(stuff2) {
            stuff = JSON.parse(stuff)
            stuff2 = JSON.parse(stuff2.replace(new RegExp("    ", "g"), ""))
            playeruuid = stuff2.id
            if (Object.keys(stuff).includes(stuff2.id)) {
                new Message(`&9&m${ChatLib.getChatBreak("-")}\n`,
                new TextComponent(`${prefix} &a&l${shitter} &2is a shitter because&f&l: ${stuff[playeruuid]["reason"]}`),
                new TextComponent(`\n&cClick here to kick &4${shitter}&c!`).setClick(
                    "run_command",
                    `/p kick ${shitter}`
                ).setHover(
                    "show_text",
                    `&aClick to kick this shitter\n&7/p kick ${shitter}`
                ),
                `\n&9&m${ChatLib.getChatBreak("-")}`).chat()
            }
        })
    }).catch(error => {
        ChatLib.chat(`${prefix} &cError whilst checking for update: ${error}`)
    })
}).setCriteria("Dungeon Finder > ${shitter} joined the dungeon group! (${classlevel})")
