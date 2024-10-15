const colors = require("colors")
module.exports = (client) => {
    client.manager
        .on("nodeConnect", (node) => {
          console.log(`LAVALINK CONNECTED TO: ${node.options.identifier}`.green)
        })
        .on("nodeCreate", (node) => {
            console.log(`NODE CREATED!!`)
        })
        .on("nodeReconnect", (node) => {
            console.log(`LAVALINK RECONNECTING TO: ${node.options.identifier}`.yellow)
        })
        .on("nodeDisconnect", (node) => {
            console.log(`LAVALINK DISCONNECTED TO: ${node.options.identifier}`.red)
        })
       /* .on("nodeError", (node, error) => {
            console.log(`LAVALINK ERROR TO: ${node.options.identifier}`.red)
        })
*/
};
/**
 * @INFO
 BOT CODED BY SHREY#5420
 PLEASE MENTION HIM WHILE USING THIS CODE
 PLEASE DONT MISUSE CODE FOR RESELLING OR GIVEAWAY
* @INFO
 LISENCE - GENERAL PUBLIC LISENCE V3 (GPL V3.0)
**/