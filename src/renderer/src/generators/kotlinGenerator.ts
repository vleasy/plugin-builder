import type { Node, Edge } from '@xyflow/react'
import { getBlockById } from '../data'
import type { Project } from '../types/project'
import type { BlockDefinition } from '../types/blocks'

function escapeKotlin(str: string): string {
  return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}

function indent(code: string, level: number = 1): string {
  return code.split('\n').map(l => '  '.repeat(level) + l).join('\n')
}

export function generateKotlin(project: Project, nodes: Node[], edges: Edge[]): string {
  const triggerNodes = nodes.filter(n => {
    const def = getBlockById(n.data.definitionId)
    return def?.type === 'trigger'
  })

  if (triggerNodes.length === 0) return '// No trigger block found. Add an Event block to start.'

  const edgeMap = new Map<string, Edge[]>()
  for (const edge of edges) {
    const existing = edgeMap.get(edge.source) || []
    existing.push(edge)
    edgeMap.set(edge.source, existing)
  }

  function getConnectedNodes(nodeId: string, branch?: string): Node[] {
    const outgoing = edgeMap.get(nodeId) || []
    const filtered = branch
      ? outgoing.filter(e => e.sourceHandle === `branch-${branch}`)
      : outgoing.filter(e => !e.sourceHandle || e.sourceHandle === 'output' || e.sourceHandle === 'flow')
    return filtered.map(e => nodes.find(n => n.id === e.target)).filter(Boolean) as Node[]
  }

  function generateActionBlock(node: Node, depth: number): string {
    const def = getBlockById(node.data.definitionId)
    if (!def) return `// Unknown block: ${node.data.definitionId}`
    const props = node.data.properties || {}
    const prefix = '  '.repeat(depth)
    const delay = props.delay ?? 0

    let actionCode = ''

    switch (def.id) {
      case 'send_message':
        actionCode = `${prefix}player.sendMessage("${escapeKotlin(props.message || 'Hello!')}")`
        break
      case 'broadcast_message':
        actionCode = `${prefix}Bukkit.broadcastMessage(ChatColor.translateAlternateColorCodes('&', "${escapeKotlin(props.message || 'Announcement!')}"))`
        break
      case 'send_actionbar':
        actionCode = `${prefix}player.sendActionBar(ChatColor.translateAlternateColorCodes('&', "${escapeKotlin(props.message || '')}"))`
        break
      case 'send_title': {
        const title = escapeKotlin(props.title || '')
        const subtitle = escapeKotlin(props.subtitle || '')
        actionCode = `${prefix}player.sendTitle("$title", "$subtitle", ${props.fadeIn ?? 10}, ${props.stay ?? 70}, ${props.fadeOut ?? 20})`
        break
      }
      case 'send_bossbar': {
        const msg = escapeKotlin(props.message || 'Alert!')
        const color = props.color || 'RED'
        actionCode = `${prefix}val bar = Bukkit.createBossBar("$msg", BarColor.$color, BarStyle.SOLID)\n${prefix}bar.addPlayer(player)\n${prefix}bar.isVisible = true\n${prefix}object : BukkitRunnable() { override fun run() { bar.removeAll() } }.runTaskLater(plugin, 100)`
        break
      }
      case 'teleport': {
        const x = props.x ?? 0; const y = props.y ?? 64; const z = props.z ?? 0
        const world = escapeKotlin(props.world || 'world')
        actionCode = `${prefix}val loc = Location(Bukkit.getWorld("$world"), ${x}.0, ${y}.0, ${z}.0)\n${prefix}player.teleport(loc)`
        break
      }
      case 'give_item': {
        const item = props.item || 'DIAMOND'; const amount = props.amount ?? 1
        actionCode = `${prefix}val item = ItemStack(Material.$item, $amount)\n${prefix}player.inventory.addItem(item)`
        break
      }
      case 'remove_item': {
        const item = props.item || 'DIAMOND'; const amount = props.amount ?? 1
        actionCode = `${prefix}val item = ItemStack(Material.$item, $amount)\n${prefix}player.inventory.removeItem(item)`
        break
      }
      case 'cancel_event': {
        const clearBlocks = props.clear_blocks ?? true
        if (clearBlocks) {
          actionCode = `${prefix}event.blockList().clear()`
        } else {
          actionCode = `${prefix}event.isCancelled = true`
        }
        break
      }
      case 'damage_event_entity': {
        const dmg = props.damage ?? 1
        actionCode = `${prefix}if (_entity is Damageable) (_entity as Damageable).damage($dmg.0)`
        break
      }
      case 'clear_inventory':
        actionCode = `${prefix}player.inventory.clear()`
        break
      case 'spawn_entity': {
        const entity = props.entity || 'ZOMBIE'; const amount = props.amount ?? 1
        actionCode = `${prefix}repeat($amount) { player.world.spawnEntity(player.location, EntityType.$entity) }`
        break
      }
      case 'kill_entity': {
        const radius = props.radius ?? 10
        actionCode = `${prefix}player.getNearbyEntities($radius.0, $radius.0, $radius.0).filter { it is Monster }.forEach { it.remove() }`
        break
      }
      case 'damage_entity': {
        const dmg = props.damage ?? 5
        actionCode = `${prefix}player.getNearbyEntities(3.0, 3.0, 3.0).firstOrNull()?.let { if (it is Damageable) it.damage($dmg.0) }`
        break
      }
      case 'explosion': {
        const power = props.power ?? 4; const fire = props.fire ?? false
        actionCode = `${prefix}player.world.createExplosion(player.location, ${power}.0f, $fire)`
        break
      }
      case 'set_block': {
        const block = props.block || 'DIAMOND_BLOCK'
        const x = props.x ?? 0; const y = props.y ?? 1; const z = props.z ?? 0
        actionCode = `${prefix}val blockLoc = player.location.add(${x}.0, ${y}.0, ${z}.0)\n${prefix}blockLoc.block.type = Material.$block`
        break
      }
      case 'play_sound': {
        const sound = props.sound || 'ENTITY_EXPERIENCE_ORB_PICKUP'
        const vol = props.volume ?? 1; const pitch = props.pitch ?? 1
        actionCode = `${prefix}player.playSound(player.location, Sound.$sound, ${vol}.0f, ${pitch}.0f)`
        break
      }
      case 'execute_command': {
        const cmd = escapeKotlin(props.command || '/say Hello!').replace('/', '')
        actionCode = props.as_console
          ? `${prefix}Bukkit.dispatchCommand(Bukkit.getConsoleSender(), "$cmd")`
          : `${prefix}player.performCommand("$cmd")`
        break
      }
      case 'wait': {
        const ticks = props.ticks ?? 20
        const connected = getConnectedNodes(node.id)
        const nextCode = connected.map(n => indent(generateActionBlock(n, depth + 1))).join('\n')
        actionCode = `${prefix}object : BukkitRunnable() {\n${prefix}  override fun run() {\n$nextCode\n${prefix}  }\n${prefix}}.runTaskLater(plugin, ${ticks}L)`
        break
      }
      case 'repeat': {
        const interval = props.interval ?? 20
        const times = props.times ?? 0
        const connected = getConnectedNodes(node.id)
        const nextCode = connected.map(n => indent(generateActionBlock(n, depth + 2))).join('\n')
        if (times > 0) {
          actionCode = `${prefix}object : BukkitRunnable() {\n${prefix}  var _count = 0\n${prefix}  override fun run() {\n$nextCode\n${prefix}    _count++\n${prefix}    if (_count >= $times) cancel()\n${prefix}  }\n${prefix}}.runTaskTimer(plugin, 0L, ${interval}L)`
        } else {
          actionCode = `${prefix}object : BukkitRunnable() {\n${prefix}  override fun run() {\n$nextCode\n${prefix}  }\n${prefix}}.runTaskTimer(plugin, 0L, ${interval}L)`
        }
        break
      }
      case 'kick_player':
        actionCode = `${prefix}player.kickPlayer("${escapeKotlin(props.reason || 'Kicked')}")`
        break
      case 'set_gamemode':
        actionCode = `${prefix}player.gameMode = GameMode.${props.gamemode || 'CREATIVE'}`
        break
      case 'heal_player':
        actionCode = `${prefix}player.health = minOf(player.health + ${props.amount ?? 10}, player.maxHealth)`
        break
      case 'set_health':
        actionCode = `${prefix}player.health = minOf(${props.health ?? 20}.0, player.maxHealth)`
        break
      case 'set_food':
        actionCode = `${prefix}player.foodLevel = ${props.food ?? 20}\n${prefix}player.saturation = ${props.saturation ?? 10}.0f`
        break
      case 'lightning':
        actionCode = `${prefix}player.world.strikeLightning(player.location)`
        break
      case 'apply_effect': {
        const effect = props.effect || 'SPEED'; const dur = props.duration ?? 100; const amp = props.amplifier ?? 0
        actionCode = `${prefix}player.addPotionEffect(PotionEffect(PotionEffectType.$effect, $dur, $amp, false, ${props.particles ?? true}))`
        break
      }
      case 'remove_effect':
        actionCode = props.effect === 'ALL'
          ? `${prefix}player.activePotionEffects.forEach { player.removePotionEffect(it.type) }`
          : `${prefix}player.removePotionEffect(PotionEffectType.${props.effect || 'POISON'})`
        break
      case 'give_experience':
        actionCode = `${prefix}player.giveExp(${props.amount ?? 100})`
        break
      case 'set_experience':
        actionCode = `${prefix}player.level = ${props.level ?? 10}`
        break
      case 'set_velocity':
        actionCode = `${prefix}player.velocity = org.bukkit.util.Vector(${props.x ?? 0}.0, ${props.y ?? 1}.0, ${props.z ?? 0}.0)`
        break
      case 'launch_projectile': {
        const proj = props.projectile || 'ARROW'
        actionCode = `${prefix}player.launchProjectile(${proj === 'FIREBALL' ? 'Fireball' : proj === 'SMALL_FIREBALL' ? 'SmallFireball' : proj === 'WITHER_SKULL' ? 'WitherSkull' : proj}::class.java)`
        break
      }
      case 'set_time':
        actionCode = `${prefix}player.world.time = ${props.time ?? 1000}`
        break
      case 'set_weather': {
        const w = props.weather || 'CLEAR'
        actionCode = w === 'CLEAR'
          ? `${prefix}player.world.isStorm = false\n${prefix}player.world.isThundering = false`
          : w === 'RAIN'
          ? `${prefix}player.world.isStorm = true\n${prefix}player.world.isThundering = false`
          : `${prefix}player.world.isStorm = true\n${prefix}player.world.isThundering = true`
        break
      }
      case 'set_difficulty':
        actionCode = `${prefix}player.world.difficulty = Difficulty.${props.difficulty || 'NORMAL'}`
        break
      case 'spawn_particles':
        actionCode = `${prefix}player.world.spawnParticle(Particle.${props.particle || 'FLAME'}, player.location, ${props.count ?? 20})`
        break
      case 'set_fire_ticks':
        actionCode = `${prefix}player.fireTicks = ${props.ticks ?? 100}`
        break
      case 'set_glowing':
        actionCode = `${prefix}player.isGlowing = ${props.glowing ?? true}`
        break
      case 'set_walk_speed':
        actionCode = `${prefix}player.walkSpeed = ${(props.speed ?? 0.2).toFixed(1)}f`
        break
      case 'toggle_flight':
        actionCode = `${prefix}player.allowFlight = ${props.allow ?? true}`
        break
      case 'play_animation':
        actionCode = `${prefix}player.playEffect(EntityEffect.${props.animation || 'SWING_MAIN'})`
        break
      case 'close_inventory':
        actionCode = `${prefix}player.closeInventory()`
        break
      default:
        actionCode = `${prefix}// TODO: implement ${def.id}`
        break
    }

    if (props.target_player) {
      const target = props.target_player
      const replaced = actionCode.replace(/\bplayer\b(?!\s*\.\s*hasPermission)/g, 'targetPlayer')
      if (target.startsWith('%')) {
        const varName = target.slice(1)
        actionCode = `${prefix}val _targetName = variables.getOrDefault("${varName}", "")\n${prefix}val targetPlayer = if (_targetName.isNotEmpty()) Bukkit.getPlayer(_targetName) else null\n${prefix}if (targetPlayer != null) {\n${indent(replaced)}\n${prefix}}`
      } else {
        const escaped = escapeKotlin(target)
        actionCode = `${prefix}val targetPlayer = Bukkit.getPlayer("${escaped}")\n${prefix}if (targetPlayer != null) {\n${indent(replaced)}\n${prefix}}`
      }
    }

    if (delay > 0 && def.id !== 'wait' && def.id !== 'repeat') {
      return `${prefix}object : BukkitRunnable() {\n${prefix}  override fun run() {\n${indent(actionCode, 1)}\n${prefix}  }\n${prefix}}.runTaskLater(plugin, ${delay}L)`
    }

    return actionCode
  }

  function generateConditionBlock(node: Node, depth: number): string {
    const def = getBlockById(node.data.definitionId)
    if (!def) return ''
    const props = node.data.properties || {}
    const prefix = '  '.repeat(depth)

    let condition = ''
    switch (def.id) {
      case 'if_permission':
        condition = `player.hasPermission("${escapeKotlin(props.permission || 'myplugin.use')}")`
        break
      case 'if_gamemode':
        condition = `player.gameMode == GameMode.${props.gamemode || 'CREATIVE'}`
        break
      case 'if_item':
        condition = `player.inventory.containsAtLeast(ItemStack(Material.${props.item || 'DIAMOND'}), ${props.amount ?? 1})`
        break
      case 'if_holding_item': {
        const checkOff = props.check_offhand ?? true
        condition = `player.inventory.itemInMainHand.type == Material.${props.item || 'DIAMOND_SWORD'}${checkOff ? ' || player.inventory.itemInOffHand.type == Material.' + (props.item || 'DIAMOND_SWORD') : ''}`
        break
      }
      case 'if_biome':
        condition = `player.location.block.biome == Biome.${props.biome || 'PLAINS'}`
        break
      case 'if_world':
        condition = `player.world.name == "${escapeKotlin(props.world || 'world')}"`
        break
      case 'if_flying':
        condition = 'player.isFlying'
        break
      case 'if_sneaking':
        condition = 'player.isSneaking'
        break
      case 'if_sprinting':
        condition = 'player.isSprinting'
        break
      case 'if_on_ground':
        condition = 'player.isOnGround'
        break
      case 'if_in_water':
        condition = 'player.isInWater'
        break
      case 'if_health_above':
        condition = `player.health > ${props.value ?? 10}.0`
        break
      case 'if_health_below':
        condition = `player.health < ${props.value ?? 6}.0`
        break
      case 'if_random':
        condition = `Math.random() * 100 < ${props.chance ?? 50}`
        break
      case 'if_player_count':
        condition = `Bukkit.getOnlinePlayers().size ${props.operation || '>='} ${props.value ?? 5}`
        break
      case 'if_light_level':
        condition = `player.location.block.lightLevel ${props.operation || '<'} ${props.value ?? 7}`
        break
      case 'if_killer_is_player': {
        condition = 'event.entity is LivingEntity && (event.entity as? LivingEntity)?.killer != null'
        break
      }
      case 'if_entity_type': {
        const entityType = props.entity || 'CREEPER'
        condition = `_entity.type == EntityType.$entityType`
        break
      }
      case 'if_block_below': {
        const blockType = props.block || 'DIAMOND_ORE'
        const offset = props.offset ?? 1
        condition = `player.location.subtract(0.0, $offset.0, 0.0).block.type == Material.$blockType`
        break
      }
      case 'if_var': {
        const varName = escapeKotlin(props.variable || 'my_var')
        const op = props.operation || '=='
        const value = escapeKotlin(props.value || '0')
        condition = `getVariable("$varName") $op "$value"`
        break
      }
      default:
        condition = 'true'
    }

    const trueNodes = getConnectedNodes(node.id, 'true')
    const falseNodes = getConnectedNodes(node.id, 'false')
    const trueCode = trueNodes.map(n => indent(generateActionBlock(n, depth + 1))).join('\n')
    const falseCode = falseNodes.map(n => indent(generateActionBlock(n, depth + 1))).join('\n')

    let result = `${prefix}if ($condition) {\n${trueCode}\n${prefix}`
    if (falseNodes.length > 0) result += `} else {\n${falseCode}\n${prefix}`
    result += '}'
    return result
  }

  function generateVariableBlock(node: Node, depth: number): string {
    const def = getBlockById(node.data.definitionId)
    if (!def) return ''
    const props = node.data.properties || {}
    const prefix = '  '.repeat(depth)

    switch (def.id) {
      case 'set_var':
        return `${prefix}variables["${escapeKotlin(props.name || 'my_var')}"] = "${escapeKotlin(props.value || '0')}"`
      case 'increment_var': {
        const name = escapeKotlin(props.name || 'my_var')
        const amt = props.amount ?? 1
        return `${prefix}val _incVal = (variables.getOrDefault("$name", "0").toDoubleOrNull() ?: 0.0).toInt() + $amt\n${prefix}variables["$name"] = _incVal.toString()`
      }
      case 'decrement_var': {
        const name = escapeKotlin(props.name || 'my_var')
        const amt = props.amount ?? 1
        return `${prefix}val _decVal = (variables.getOrDefault("$name", "0").toDoubleOrNull() ?: 0.0).toInt() - $amt\n${prefix}variables["$name"] = _decVal.toString()`
      }
      case 'math_op':
        return `${prefix}val ${escapeKotlin(props.result || 'result')} = (variables.getOrDefault("${escapeKotlin(props.var_a || '0')}", "0").toDoubleOrNull() ?: 0.0) ${props.operation || '+'} (variables.getOrDefault("${escapeKotlin(props.var_b || '0')}", "0").toDoubleOrNull() ?: 0.0)\n${prefix}variables["${escapeKotlin(props.result || 'result')}"] = ${escapeKotlin(props.result || 'result')}.toString()`
      case 'random_int':
        return `${prefix}val ${escapeKotlin(props.result || 'random')} = (${props.min ?? 1}..${props.max ?? 100}).random()\n${prefix}variables["${escapeKotlin(props.result || 'random')}"] = ${escapeKotlin(props.result || 'random')}.toString()`
      case 'concat_text':
        return `${prefix}variables["${escapeKotlin(props.result || 'combined')}"] = "${escapeKotlin(props.text_a || '')}" + "${escapeKotlin(props.text_b || '')}"`
      case 'store_player_name':
        return `${prefix}variables["${escapeKotlin(props.result || 'player_name')}"] = player.name`
      case 'store_player_uuid':
        return `${prefix}variables["${escapeKotlin(props.result || 'player_uuid')}"] = player.uniqueId.toString()`
      case 'store_player_health':
        return `${prefix}variables["${escapeKotlin(props.result || 'player_health')}"] = player.health.toString()`
      case 'store_player_x':
        return `${prefix}variables["${escapeKotlin(props.result || 'player_x')}"] = player.location.x.toString()`
      case 'store_player_y':
        return `${prefix}variables["${escapeKotlin(props.result || 'player_y')}"] = player.location.y.toString()`
      case 'store_player_z':
        return `${prefix}variables["${escapeKotlin(props.result || 'player_z')}"] = player.location.z.toString()`
      case 'store_random_player':
        return `${prefix}val _players = Bukkit.getOnlinePlayers().toList()\n${prefix}val _rp = if (_players.isNotEmpty()) _players.random() else null\n${prefix}variables["${escapeKotlin(props.result || 'random_player')}"] = _rp?.name ?: ""`
      case 'get_command_arg': {
        const index = props.index ?? 1
        const result = escapeKotlin(props.result || 'target_arg')
        return `${prefix}val _cmdArgs = event.message.split(" ")\n${prefix}val _argVal = if (_cmdArgs.size > ${index}) _cmdArgs[${index}] else ""\n${prefix}variables["${result}"] = _argVal`
      }
      default:
        return ''
    }
  }

  function generateChain(node: Node, depth: number): string[] {
    const def = getBlockById(node.data.definitionId)
    if (!def) return []

    let code = ''
    switch (def.type) {
      case 'action':
        code = generateActionBlock(node, depth)
        break
      case 'condition':
        code = generateConditionBlock(node, depth)
        break
      case 'variable':
        code = generateVariableBlock(node, depth)
        break
    }
    if (!code) return []

    const result = [code]
    if (def.type !== 'condition' && def.id !== 'wait' && def.id !== 'repeat') {
      const nextNodes = getConnectedNodes(node.id)
      for (const next of nextNodes) {
        result.push(...generateChain(next, depth))
      }
    }
    return result
  }

  function generateNodeCode(node: Node, depth: number): string {
    return generateChain(node, depth).join('\n')
  }

  const mainTrigger = triggerNodes[0]
  const triggerDef = getBlockById(mainTrigger.data.definitionId)
  if (!triggerDef) return '// Unknown trigger'

  const connectedNodes = getConnectedNodes(mainTrigger.id)
  let bodyLines: string[] = []

  // Context extraction
  if (triggerDef.id === 'entity_explode') {
    bodyLines.push('    val _entity = event.entity\n    val loc = event.location\n    val player = loc.world.players.firstOrNull()')
  } else if (triggerDef.id === 'entity_death') {
    bodyLines.push('    val _entity = event.entity\n    val player = if (_entity is Player) _entity else null')
  } else if (triggerDef.id !== 'server_start') {
    bodyLines.push('    val player = event.player')
  }

  // Command filter for player_command trigger
  if (triggerDef.id === 'player_command') {
    const cmd = (mainTrigger.data.properties?.command || '/hello').replace(/^\//, '')
    bodyLines.push(`    val _pref = "/${escapeKotlin(cmd.lowercase())}"\n    val _msg = event.message.lowercase()\n    if (_msg != _pref && !_msg.startsWith("$_pref ")) return`)
  }

  // Distance filter for player_move trigger
  if (triggerDef.id === 'player_move') {
    const minDist = mainTrigger.data.properties?.min_distance ?? 0
    if (minDist > 0) {
      bodyLines.push(`    if (event.from.distanceSquared(event.to) < ${(minDist * minDist).toFixed(1)}) return`)
    }
  }

  for (const node of connectedNodes) {
    const code = generateNodeCode(node, 2)
    if (code) bodyLines.push(code)
  }

  const pluginClass = project.name.replace(/[^a-zA-Z0-9]/g, '')
  const body = bodyLines.join('\n')

  function getEventAnnotation(id: string): string {
    switch (id) {
      case 'player_join': return 'fun onPlayerJoin(event: PlayerJoinEvent)'
      case 'player_leave': return 'fun onPlayerLeave(event: PlayerQuitEvent)'
      case 'player_command': return 'fun onPlayerCommand(event: PlayerCommandPreprocessEvent)'
      case 'player_death': return 'fun onPlayerDeath(event: PlayerDeathEvent)'
      case 'block_break': return 'fun onBlockBreak(event: BlockBreakEvent)'
      case 'block_place': return 'fun onBlockPlace(event: BlockPlaceEvent)'
      case 'entity_damage': return 'fun onEntityDamage(event: EntityDamageByEntityEvent)'
      case 'player_interact': return 'fun onPlayerInteract(event: PlayerInteractEvent)'
      case 'chat_message': return 'fun onChatMessage(event: AsyncPlayerChatEvent)'
      case 'first_join': return 'fun onPlayerJoin(event: PlayerJoinEvent)'
      case 'player_respawn': return 'fun onPlayerRespawn(event: PlayerRespawnEvent)'
      case 'advancement': return 'fun onPlayerAdvancement(event: PlayerAdvancementDoneEvent)'
      case 'level_change': return 'fun onPlayerLevelChange(event: PlayerLevelChangeEvent)'
      case 'drop_item': return 'fun onPlayerDropItem(event: PlayerDropItemEvent)'
      case 'pickup_item': return 'fun onPlayerPickupItem(event: PlayerAttemptPickupItemEvent)'
      case 'consume_item': return 'fun onPlayerConsume(event: PlayerItemConsumeEvent)'
      case 'player_teleport': return 'fun onPlayerTeleport(event: PlayerTeleportEvent)'
      case 'sneak_toggle': return 'fun onPlayerToggleSneak(event: PlayerToggleSneakEvent)'
      case 'sprint_toggle': return 'fun onPlayerToggleSprint(event: PlayerToggleSprintEvent)'
      case 'bucket_empty': return 'fun onBucketEmpty(event: PlayerBucketEmptyEvent)'
      case 'bucket_fill': return 'fun onBucketFill(event: PlayerBucketFillEvent)'
      case 'block_explode': return 'fun onBlockExplode(event: BlockExplodeEvent)'
      case 'block_grow': return 'fun onBlockGrow(event: BlockGrowEvent)'
      case 'entity_death': return 'fun onEntityDeath(event: EntityDeathEvent)'
      case 'entity_tame': return 'fun onEntityTame(event: EntityTameEvent)'
      case 'entity_breed': return 'fun onEntityBreed(event: EntityBreedEvent)'
      case 'entity_explode': return 'fun onEntityExplode(event: EntityExplodeEvent)'
      case 'projectile_hit': return 'fun onProjectileHit(event: ProjectileHitEvent)'
      case 'player_move': return 'fun onPlayerMove(event: PlayerMoveEvent)'
      case 'weather_change': return 'fun onWeatherChange(event: WeatherChangeEvent)'
      case 'server_start': return 'fun onServerStart()'
      case 'server_stop': return 'fun onServerStop()'
      default: return 'fun onCustomEvent()'
    }
  }

  const eventAnnotation = getEventAnnotation(triggerDef.id)

  return `package me.you.${pluginClass.lowercase()}

import org.bukkit.Bukkit
import org.bukkit.GameMode
import org.bukkit.Location
import org.bukkit.Material
import org.bukkit.entity.Player
import org.bukkit.event.EventHandler
import org.bukkit.event.Listener
import org.bukkit.entity.Entity
import org.bukkit.entity.Damageable
import org.bukkit.entity.LivingEntity
import org.bukkit.event.block.BlockBreakEvent
import org.bukkit.event.block.BlockPlaceEvent
import org.bukkit.event.entity.EntityDamageByEntityEvent
import org.bukkit.event.entity.EntityExplodeEvent
import org.bukkit.event.player.*
import org.bukkit.inventory.ItemStack
import org.bukkit.plugin.java.JavaPlugin
import org.bukkit.scheduler.BukkitRunnable
import org.bukkit.entity.EntityType
import org.bukkit.Sound
import org.bukkit.block.Biome
import java.util.*

class $pluginClass : JavaPlugin(), Listener {
  private val variables = HashMap<String, String>()

  override fun onEnable() {
    server.pluginManager.registerEvents(this, this)
  }

  @EventHandler
  $eventAnnotation {
$body
  }
}
`
}
