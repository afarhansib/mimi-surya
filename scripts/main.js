console.log('Mimi Surya loaded.')

import { system, world } from "@minecraft/server"
import { config } from "./config"

// world.afterEvents.itemStartUse.subscribe(event => {
//     const { itemStack, player } = event
//     console.log(JSON.stringify(itemStack?.typeId))
// })
// world.afterEvents.itemStopUse.subscribe(event => {
//     const { itemStack, player } = event
//     console.log(JSON.stringify(itemStack?.typeId))
// })
world.beforeEvents.playerInteractWithBlock.subscribe(event => {
    const { itemStack, player } = event

    if (config["required_player_tag"]) {
        if (!player.hasTag(config["required-player-tag"])) return
    }

    // console.log(JSON.stringify(itemStack?.typeId))
    // console.log(config["mimi-item"])
    // console.log(config["mimi-item-nametag"])
    // console.log(JSON.stringify(itemStack?.nameTag))


    if (isMimiItem(itemStack)) {
        if (player.isSneaking) {
            // console.log('Mimi Surya pressed with sneaking.')
            system.run(() => {
                player.runCommand('time add -10')
            })
        } else {
            // console.log('Mimi Surya pressed.')
            system.run(() => {
                player.runCommand('time add 10')
            })
        }
    }
})

const isMimiItem = itemStack => {
    const configNametag = config["mimi-item-nametag"]
    try {
        return itemStack?.typeId === config["mimi-item"] && configNametag ? itemStack?.nameTag === configNametag : true
    } catch (error) {
        return false
    }
}