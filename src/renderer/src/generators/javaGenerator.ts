import type { Node, Edge } from '@xyflow/react'
import { getBlockById } from '../data'
import type { Project } from '../types/project'
import type { BlockDefinition } from '../types/blocks'

function escapeJava(str: string): string {
  return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}

function indent(code: string, level: number = 1): string {
  return code.split('\n').map(l => '  '.repeat(level) + l).join('\n')
}

export function generateJava(project: Project, nodes: Node[], edges: Edge[]): string {
  const triggerNodes = nodes.filter(n => {
    const def = getBlockById(n.data.definitionId)
    return def?.type === 'trigger'
  })

  if (triggerNodes.length === 0) {
    return '// No trigger block found. Add an Event block to start.'
  }

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
    return filtered
      .map(e => nodes.find(n => n.id === e.target))
      .filter(Boolean) as Node[]
  }

  function generateActionBlock(node: Node, depth: number): string {
    const def = getBlockById(node.data.definitionId)
    if (!def) return `// Unknown block: ${node.data.definitionId}`
    const props = node.data.properties || {}

    const lines: string[] = []
    const prefix = '  '.repeat(depth)
    const delay = props.delay ?? 0

    let actionCode = ''

    switch (def.id) {
      case 'send_message': {
        const msg = escapeJava(props.message || 'Hello!')
        actionCode = `${prefix}player.sendMessage("${msg}");`
        break
      }
      case 'broadcast_message': {
        const msg = escapeJava(props.message || 'Announcement!')
        actionCode = `${prefix}Bukkit.broadcastMessage(ChatColor.translateAlternateColorCodes('&', "${msg}"));`
        break
      }
      case 'send_actionbar': {
        const msg = escapeJava(props.message || '')
        actionCode = `${prefix}player.sendActionBar(ChatColor.translateAlternateColorCodes('&', "${msg}"));`
        break
      }
      case 'send_title': {
        const title = escapeJava(props.title || '')
        const subtitle = escapeJava(props.subtitle || '')
        const fadeIn = props.fadeIn ?? 10
        const stay = props.stay ?? 70
        const fadeOut = props.fadeOut ?? 20
        actionCode = `${prefix}player.sendTitle("${title}", "${subtitle}", ${fadeIn}, ${stay}, ${fadeOut});`
        break
      }
      case 'send_bossbar': {
        const msg = escapeJava(props.message || 'Alert!')
        const color = props.color || 'RED'
        actionCode = `${prefix}BossBar bar = Bukkit.createBossBar("${msg}", BarColor.${color}, BarStyle.SOLID);\n${prefix}bar.addPlayer(player);\n${prefix}bar.setVisible(true);\n${prefix}new BukkitRunnable() { public void run() { bar.removeAll(); } }.runTaskLater(plugin, 100);`
        break
      }
      case 'teleport': {
        const x = props.x ?? 0; const y = props.y ?? 64; const z = props.z ?? 0
        const world = props.world || 'world'
        actionCode = `${prefix}Location loc = new Location(Bukkit.getWorld("${escapeJava(world)}"), ${x}, ${y}, ${z});\n${prefix}player.teleport(loc);`
        break
      }
      case 'give_item': {
        const item = props.item || 'DIAMOND'; const amount = props.amount ?? 1
        actionCode = `${prefix}ItemStack item = new ItemStack(Material.${item}, ${amount});\n${prefix}player.getInventory().addItem(item);`
        break
      }
      case 'remove_item': {
        const item = props.item || 'DIAMOND'; const amount = props.amount ?? 1
        actionCode = `${prefix}ItemStack item = new ItemStack(Material.${item}, ${amount});\n${prefix}player.getInventory().removeItem(item);`
        break
      }
      case 'cancel_event': {
        const clearBlocks = props.clear_blocks ?? true
        if (clearBlocks) {
          actionCode = `${prefix}event.blockList().clear();`
        } else {
          actionCode = `${prefix}event.setCancelled(true);`
        }
        break
      }
      case 'damage_event_entity': {
        const dmg = props.damage ?? 1
        actionCode = `${prefix}if (_entity instanceof Damageable) ((Damageable) _entity).damage(${dmg});`
        break
      }
      case 'clear_inventory': {
        actionCode = `${prefix}player.getInventory().clear();`
        break
      }
      case 'spawn_entity': {
        const entity = props.entity || 'ZOMBIE'; const amount = props.amount ?? 1
        actionCode = `${prefix}for (int i = 0; i < ${amount}; i++) {\n${prefix}  player.getWorld().spawnEntity(player.getLocation(), EntityType.${entity});\n${prefix}}`
        break
      }
      case 'kill_entity': {
        const entity = props.entity || 'ALL_HOSTILE'; const radius = props.radius ?? 10
        actionCode = `${prefix}for (Entity e : player.getNearbyEntities(${radius}, ${radius}, ${radius})) {\n${prefix}  if (e instanceof Monster ${entity === 'ALL_PASSIVE' ? '|| !(e instanceof Monster)' : ''}) e.remove();\n${prefix}}`
        break
      }
      case 'damage_entity': {
        const dmg = props.damage ?? 5
        actionCode = `${prefix}player.getWorld().getNearbyEntities(player.getLocation(), 3, 3, 3).stream().findFirst().ifPresent(e -> {\n${prefix}  if (e instanceof Damageable) ((Damageable) e).damage(${dmg});\n${prefix}});`
        break
      }
      case 'explosion': {
        const power = props.power ?? 4; const fire = props.fire ?? false
        actionCode = `${prefix}player.getWorld().createExplosion(player.getLocation(), ${power}f, ${fire});`
        break
      }
      case 'set_block': {
        const block = props.block || 'DIAMOND_BLOCK'; const x = props.x ?? 0; const y = props.y ?? 1; const z = props.z ?? 0
        actionCode = `${prefix}Location blockLoc = player.getLocation().add(${x}, ${y}, ${z});\n${prefix}blockLoc.getBlock().setType(Material.${block});`
        break
      }
      case 'play_sound': {
        const sound = props.sound || 'ENTITY_EXPERIENCE_ORB_PICKUP'; const vol = props.volume ?? 1; const pitch = props.pitch ?? 1
        actionCode = `${prefix}player.playSound(player.getLocation(), Sound.${sound}, ${vol}f, ${pitch}f);`
        break
      }
      case 'execute_command': {
        const cmd = escapeJava(props.command || '/say Hello!').replace('/', '')
        actionCode = props.as_console ? `${prefix}Bukkit.dispatchCommand(Bukkit.getConsoleSender(), "${cmd}");` : `${prefix}player.performCommand("${cmd}");`
        break
      }
      case 'wait': {
        const ticks = props.ticks ?? 20
        const connected = getConnectedNodes(node.id)
        const nextCode = connected.map(n => indent(generateActionBlock(n, depth + 1))).join('\n')
        actionCode = `${prefix}new BukkitRunnable() {\n${prefix}  @Override\n${prefix}  public void run() {\n${nextCode}\n${prefix}  }\n${prefix}}.runTaskLater(plugin, ${ticks});`
        break
      }
      case 'repeat': {
        const interval = props.interval ?? 20
        const times = props.times ?? 0
        const connected = getConnectedNodes(node.id)
        const nextCode = connected.map(n => indent(generateActionBlock(n, depth + 2))).join('\n')
        if (times > 0) {
          actionCode = `${prefix}new BukkitRunnable() {\n${prefix}  int _count = 0;\n${prefix}  @Override\n${prefix}  public void run() {\n${nextCode}\n${prefix}    _count++;\n${prefix}    if (_count >= ${times}) this.cancel();\n${prefix}  }\n${prefix}}.runTaskTimer(plugin, 0L, ${interval});`
        } else {
          actionCode = `${prefix}new BukkitRunnable() {\n${prefix}  @Override\n${prefix}  public void run() {\n${nextCode}\n${prefix}  }\n${prefix}}.runTaskTimer(plugin, 0L, ${interval});`
        }
        break
      }
      case 'kick_player': {
        actionCode = `${prefix}player.kickPlayer("${escapeJava(props.reason || 'Kicked')}");`
        break
      }
      case 'set_gamemode': {
        actionCode = `${prefix}player.setGameMode(GameMode.${props.gamemode || 'CREATIVE'});`
        break
      }
      case 'heal_player': {
        const amt = props.amount ?? 10
        actionCode = `${prefix}player.setHealth(Math.min(player.getHealth() + ${amt}, player.getMaxHealth()));`
        break
      }
      case 'set_health': {
        actionCode = `${prefix}player.setHealth(Math.min(${props.health ?? 20}, player.getMaxHealth()));`
        break
      }
      case 'set_food': {
        const food = props.food ?? 20; const sat = props.saturation ?? 10
        actionCode = `${prefix}player.setFoodLevel(${food});\n${prefix}player.setSaturation(${sat}f);`
        break
      }
      case 'lightning': {
        actionCode = `${prefix}player.getWorld().strikeLightning(player.getLocation());`
        break
      }
      case 'apply_effect': {
        const effect = props.effect || 'SPEED'; const dur = props.duration ?? 100; const amp = props.amplifier ?? 0; const part = props.particles ?? true
        actionCode = `${prefix}PotionEffect pe = new PotionEffect(PotionEffectType.${effect}, ${dur}, ${amp}, false, ${part});\n${prefix}player.addPotionEffect(pe);`
        break
      }
      case 'remove_effect': {
        actionCode = props.effect === 'ALL' ? `${prefix}player.getActivePotionEffects().forEach(e -> player.removePotionEffect(e.getType()));` : `${prefix}player.removePotionEffect(PotionEffectType.${props.effect || 'POISON'});`
        break
      }
      case 'give_experience': {
        actionCode = `${prefix}player.giveExp(${props.amount ?? 100});`
        break
      }
      case 'set_experience': {
        actionCode = `${prefix}player.setLevel(${props.level ?? 10});`
        break
      }
      case 'set_velocity': {
        const vx = props.x ?? 0; const vy = props.y ?? 1; const vz = props.z ?? 0
        actionCode = `${prefix}player.setVelocity(new org.bukkit.util.Vector(${vx}, ${vy}, ${vz}));`
        break
      }
      case 'launch_projectile': {
        const proj = props.projectile || 'ARROW'
        actionCode = `${prefix}player.launchProjectile(org.bukkit.entity.${proj === 'FIREBALL' ? 'Fireball' : proj === 'SMALL_FIREBALL' ? 'SmallFireball' : proj === 'WITHER_SKULL' ? 'WitherSkull' : proj}.class);`
        break
      }
      case 'set_time': {
        actionCode = `${prefix}player.getWorld().setTime(${props.time ?? 1000});`
        break
      }
      case 'set_weather': {
        const w = props.weather || 'CLEAR'
        actionCode = w === 'CLEAR' ? `${prefix}player.getWorld().setStorm(false);\n${prefix}player.getWorld().setThundering(false);` : w === 'RAIN' ? `${prefix}player.getWorld().setStorm(true);\n${prefix}player.getWorld().setThundering(false);` : `${prefix}player.getWorld().setStorm(true);\n${prefix}player.getWorld().setThundering(true);`
        break
      }
      case 'set_difficulty': {
        actionCode = `${prefix}player.getWorld().setDifficulty(Difficulty.${props.difficulty || 'NORMAL'});`
        break
      }
      case 'spawn_particles': {
        const p = props.particle || 'FLAME'; const count = props.count ?? 20
        actionCode = `${prefix}player.getWorld().spawnParticle(Particle.${p}, player.getLocation(), ${count});`
        break
      }
      case 'set_fire_ticks': {
        actionCode = `${prefix}player.setFireTicks(${props.ticks ?? 100});`
        break
      }
      case 'set_glowing': {
        actionCode = `${prefix}player.setGlowing(${props.glowing ?? true});`
        break
      }
      case 'set_walk_speed': {
        actionCode = `${prefix}player.setWalkSpeed(${(props.speed ?? 0.2).toFixed(1)}f);`
        break
      }
      case 'toggle_flight': {
        actionCode = `${prefix}player.setAllowFlight(${props.allow ?? true});`
        break
      }
      case 'play_animation': {
        const anim = props.animation || 'SWING_MAIN'
        actionCode = `${prefix}player.playEffect(EntityEffect.${anim});`
        break
      }
      case 'close_inventory': {
        actionCode = `${prefix}player.closeInventory();`
        break
      }
      default: {
        actionCode = `${prefix}// TODO: implement ${def.id}`
        break
      }
    }

    if (props.target_player) {
      const target = props.target_player
      const replaced = actionCode.replace(/\bplayer\b(?!\s*\.\s*hasPermission)/g, 'targetPlayer')
      if (target.startsWith('%')) {
        const varName = target.slice(1)
        actionCode = `${prefix}String _targetName = variables.getOrDefault("${varName}", "");\n${prefix}Player targetPlayer = !_targetName.isEmpty() ? Bukkit.getPlayer(_targetName) : null;\n${prefix}if (targetPlayer != null) {\n${indent(replaced)}\n${prefix}}`
      } else {
        const escaped = escapeJava(target)
        actionCode = `${prefix}Player targetPlayer = Bukkit.getPlayer("${escaped}");\n${prefix}if (targetPlayer != null) {\n${indent(replaced)}\n${prefix}}`
      }
    }

    if (delay > 0 && def.id !== 'wait' && def.id !== 'repeat') {
      return `${prefix}new BukkitRunnable() {\n${prefix}  @Override\n${prefix}  public void run() {\n${indent(actionCode, 1)}\n${prefix}  }\n${prefix}}.runTaskLater(plugin, ${delay});`
    }

    return actionCode
  }

  function generateConditionBlock(node: Node, depth: number): string {
    const def = getBlockById(node.data.definitionId)
    if (!def) return `// Unknown: ${node.data.definitionId}`
    const props = node.data.properties || {}
    const prefix = '  '.repeat(depth)

    let condition = ''
    switch (def.id) {
      case 'if_permission':
        condition = `player.hasPermission("${escapeJava(props.permission || 'myplugin.use')}")`
        break
      case 'if_gamemode':
        condition = `player.getGameMode() == GameMode.${props.gamemode || 'CREATIVE'}`
        break
      case 'if_item': {
        const item = props.item || 'DIAMOND'
        const amount = props.amount ?? 1
        condition = `player.getInventory().containsAtLeast(new ItemStack(Material.${item}), ${amount})`
        break
      }
      case 'if_holding_item': {
        const checkOff = props.check_offhand ?? true
        condition = `player.getInventory().getItemInMainHand().getType() == Material.${props.item || 'DIAMOND_SWORD'}${checkOff ? ` || player.getInventory().getItemInOffHand().getType() == Material.${props.item || 'DIAMOND_SWORD'}` : ''}`
        break
      }
      case 'if_biome':
        condition = `player.getLocation().getBlock().getBiome() == Biome.${props.biome || 'PLAINS'}`
        break
      case 'if_world':
        condition = `player.getWorld().getName().equals("${escapeJava(props.world || 'world')}")`
        break
      case 'if_flying':
        condition = 'player.isFlying()'
        break
      case 'if_sneaking':
        condition = 'player.isSneaking()'
        break
      case 'if_sprinting':
        condition = 'player.isSprinting()'
        break
      case 'if_on_ground':
        condition = 'player.isOnGround()'
        break
      case 'if_in_water':
        condition = 'player.isInWater()'
        break
      case 'if_health_above':
        condition = `player.getHealth() > ${props.value ?? 10}`
        break
      case 'if_health_below':
        condition = `player.getHealth() < ${props.value ?? 6}`
        break
      case 'if_random':
        condition = `Math.random() * 100 < ${props.chance ?? 50}`
        break
      case 'if_player_count': {
        const op = props.operation || '>='
        condition = `Bukkit.getOnlinePlayers().size() ${op} ${props.value ?? 5}`
        break
      }
      case 'if_light_level': {
        const op = props.operation || '<'
        condition = `player.getLocation().getBlock().getLightLevel() ${op} ${props.value ?? 7}`
        break
      }
      case 'if_killer_is_player': {
        condition = 'event.getEntity() instanceof LivingEntity && ((LivingEntity) event.getEntity()).getKiller() != null'
        break
      }
      case 'if_entity_type': {
        const entityType = props.entity || 'CREEPER'
        condition = `_entity.getType() == EntityType.${entityType}`
        break
      }
      case 'if_block_below': {
        const blockType = props.block || 'DIAMOND_ORE'
        const offset = props.offset ?? 1
        condition = `player.getLocation().subtract(0, ${offset}, 0).getBlock().getType() == Material.${blockType}`
        break
      }
      case 'if_var': {
        const varName = escapeJava(props.variable || 'my_var')
        const op = props.operation || '=='
        const value = escapeJava(props.value || '0')
        condition = `getVariable("${varName}") ${op} "${value}"`
        break
      }
      default:
        condition = 'true'
    }

    const trueNodes = getConnectedNodes(node.id, 'true')
    const falseNodes = getConnectedNodes(node.id, 'false')

    const lines: string[] = []
    lines.push(`${prefix}if (${condition}) {`)
    for (const n of trueNodes) {
      const code = generateActionBlock(n, depth + 1)
      if (code) lines.push(code)
    }
    if (falseNodes.length > 0) {
      lines.push(`${prefix}} else {`)
      for (const n of falseNodes) {
        const code = generateActionBlock(n, depth + 1)
        if (code) lines.push(code)
      }
    }
    lines.push(`${prefix}}`)
    return lines.join('\n')
  }

  function generateVariableBlock(node: Node, depth: number): string {
    const def = getBlockById(node.data.definitionId)
    if (!def) return ''
    const props = node.data.properties || {}
    const prefix = '  '.repeat(depth)

    switch (def.id) {
      case 'set_var': {
        const name = escapeJava(props.name || 'my_var')
        const value = escapeJava(props.value || '0')
        return `${prefix}variables.put("${name}", "${value}");`
      }
      case 'increment_var': {
        const name = escapeJava(props.name || 'my_var')
        const amt = props.amount ?? 1
        return `${prefix}int _incVal = parseDouble(variables.getOrDefault("${name}", "0")).intValue() + ${amt};\n${prefix}variables.put("${name}", String.valueOf(_incVal));`
      }
      case 'decrement_var': {
        const name = escapeJava(props.name || 'my_var')
        const amt = props.amount ?? 1
        return `${prefix}int _decVal = parseDouble(variables.getOrDefault("${name}", "0")).intValue() - ${amt};\n${prefix}variables.put("${name}", String.valueOf(_decVal));`
      }
      case 'math_op': {
        const varA = escapeJava(props.var_a || '0')
        const op = props.operation || '+'
        const varB = escapeJava(props.var_b || '0')
        const result = escapeJava(props.result || 'result')
        return `${prefix}double ${result} = parseDouble(variables.getOrDefault("${varA}", "0")) ${op} parseDouble(variables.getOrDefault("${varB}", "0"));\n${prefix}variables.put("${result}", String.valueOf(${result}));`
      }
      case 'random_int': {
        const min = props.min ?? 1
        const max = props.max ?? 100
        const result = escapeJava(props.result || 'random')
        return `${prefix}Random rand = new Random();\n${prefix}int ${result} = rand.nextInt(${max} - ${min} + 1) + ${min};\n${prefix}variables.put("${result}", String.valueOf(${result}));`
      }
      case 'concat_text': {
        const textA = escapeJava(props.text_a || '')
        const textB = escapeJava(props.text_b || '')
        const result = escapeJava(props.result || 'combined')
        return `${prefix}variables.put("${result}", "${textA}" + "${textB}");`
      }
      case 'store_player_name': {
        const result = escapeJava(props.result || 'player_name')
        return `${prefix}variables.put("${result}", player.getName());`
      }
      case 'store_player_uuid': {
        const result = escapeJava(props.result || 'player_uuid')
        return `${prefix}variables.put("${result}", player.getUniqueId().toString());`
      }
      case 'store_player_health': {
        const result = escapeJava(props.result || 'player_health')
        return `${prefix}variables.put("${result}", String.valueOf(player.getHealth()));`
      }
      case 'store_player_x': {
        const result = escapeJava(props.result || 'player_x')
        return `${prefix}variables.put("${result}", String.valueOf(player.getLocation().getX()));`
      }
      case 'store_player_y': {
        const result = escapeJava(props.result || 'player_y')
        return `${prefix}variables.put("${result}", String.valueOf(player.getLocation().getY()));`
      }
      case 'store_player_z': {
        const result = escapeJava(props.result || 'player_z')
        return `${prefix}variables.put("${result}", String.valueOf(player.getLocation().getZ()));`
      }
      case 'store_random_player': {
        const result = escapeJava(props.result || 'random_player')
        return `${prefix}Player[] _players = Bukkit.getOnlinePlayers().toArray(new Player[0]);\n${prefix}Player _rp = _players.length > 0 ? _players[new Random().nextInt(_players.length)] : null;\n${prefix}variables.put("${result}", _rp != null ? _rp.getName() : "");`
      }
      case 'get_command_arg': {
        const index = props.index ?? 1
        const result = escapeJava(props.result || 'target_arg')
        return `${prefix}String[] _cmdArgs = event.getMessage().split(" ");\n${prefix}String _argVal = _cmdArgs.length > ${index} ? _cmdArgs[${index}] : "";\n${prefix}variables.put("${result}", _argVal);`
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
    // Follow output chain for blocks that don't handle children internally
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

  function getListenerAnnotation(def: BlockDefinition): string {
    switch (def.id) {
      case 'player_join': return '@EventHandler\n  public void onPlayerJoin(PlayerJoinEvent event)'
      case 'player_leave': return '@EventHandler\n  public void onPlayerLeave(PlayerQuitEvent event)'
      case 'player_command': return '@EventHandler\n  public void onPlayerCommand(PlayerCommandPreprocessEvent event)'
      case 'player_death': return '@EventHandler\n  public void onPlayerDeath(PlayerDeathEvent event)'
      case 'block_break': return '@EventHandler\n  public void onBlockBreak(BlockBreakEvent event)'
      case 'block_place': return '@EventHandler\n  public void onBlockPlace(BlockPlaceEvent event)'
      case 'entity_damage': return '@EventHandler\n  public void onEntityDamage(EntityDamageByEntityEvent event)'
      case 'player_interact': return '@EventHandler\n  public void onPlayerInteract(PlayerInteractEvent event)'
      case 'chat_message': return '@EventHandler\n  public void onChatMessage(AsyncPlayerChatEvent event)'
      case 'first_join': return '@EventHandler\n  public void onFirstJoin(PlayerJoinEvent event)'
      case 'player_respawn': return '@EventHandler\n  public void onPlayerRespawn(PlayerRespawnEvent event)'
      case 'advancement': return '@EventHandler\n  public void onAdvancement(PlayerAdvancementDoneEvent event)'
      case 'level_change': return '@EventHandler\n  public void onLevelChange(PlayerLevelChangeEvent event)'
      case 'drop_item': return '@EventHandler\n  public void onDropItem(PlayerDropItemEvent event)'
      case 'pickup_item': return '@EventHandler\n  public void onPickupItem(PlayerAttemptPickupItemEvent event)'
      case 'consume_item': return '@EventHandler\n  public void onConsume(PlayerItemConsumeEvent event)'
      case 'player_teleport': return '@EventHandler\n  public void onTeleport(PlayerTeleportEvent event)'
      case 'sneak_toggle': return '@EventHandler\n  public void onSneakToggle(PlayerToggleSneakEvent event)'
      case 'sprint_toggle': return '@EventHandler\n  public void onSprintToggle(PlayerToggleSprintEvent event)'
      case 'bucket_empty': return '@EventHandler\n  public void onBucketEmpty(PlayerBucketEmptyEvent event)'
      case 'bucket_fill': return '@EventHandler\n  public void onBucketFill(PlayerBucketFillEvent event)'
      case 'block_explode': return '@EventHandler\n  public void onBlockExplode(BlockExplodeEvent event)'
      case 'block_grow': return '@EventHandler\n  public void onBlockGrow(BlockGrowEvent event)'
      case 'entity_death': return '@EventHandler\n  public void onEntityDeath(EntityDeathEvent event)'
      case 'entity_tame': return '@EventHandler\n  public void onEntityTame(EntityTameEvent event)'
      case 'entity_breed': return '@EventHandler\n  public void onEntityBreed(EntityBreedEvent event)'
      case 'entity_explode': return '@EventHandler\n  public void onEntityExplode(EntityExplodeEvent event)'
      case 'projectile_hit': return '@EventHandler\n  public void onProjectileHit(ProjectileHitEvent event)'
      case 'player_move': return '@EventHandler\n  public void onPlayerMove(PlayerMoveEvent event)'
      case 'weather_change': return '@EventHandler\n  public void onWeatherChange(WeatherChangeEvent event)'
      case 'server_start': return 'public void onServerStart()'
      case 'server_stop': return 'public void onServerStop()'
      default: return 'public void onCustomEvent()'
    }
  }

  function getEventParam(def: BlockDefinition): string {
    switch (def.id) {
      case 'player_join': return 'PlayerJoinEvent event'
      case 'player_leave': return 'PlayerQuitEvent event'
      case 'player_command': return 'PlayerCommandPreprocessEvent event'
      case 'player_death': return 'PlayerDeathEvent event'
      case 'block_break': return 'BlockBreakEvent event'
      case 'block_place': return 'BlockPlaceEvent event'
      case 'entity_damage': return 'EntityDamageByEntityEvent event'
      case 'player_interact': return 'PlayerInteractEvent event'
      case 'chat_message': return 'AsyncPlayerChatEvent event'
      case 'first_join': return 'PlayerJoinEvent event'
      case 'player_respawn': return 'PlayerRespawnEvent event'
      case 'advancement': return 'PlayerAdvancementDoneEvent event'
      case 'level_change': return 'PlayerLevelChangeEvent event'
      case 'drop_item': return 'PlayerDropItemEvent event'
      case 'pickup_item': return 'PlayerAttemptPickupItemEvent event'
      case 'consume_item': return 'PlayerItemConsumeEvent event'
      case 'player_teleport': return 'PlayerTeleportEvent event'
      case 'sneak_toggle': return 'PlayerToggleSneakEvent event'
      case 'sprint_toggle': return 'PlayerToggleSprintEvent event'
      case 'bucket_empty': return 'PlayerBucketEmptyEvent event'
      case 'bucket_fill': return 'PlayerBucketFillEvent event'
      case 'block_explode': return 'BlockExplodeEvent event'
      case 'block_grow': return 'BlockGrowEvent event'
      case 'entity_death': return 'EntityDeathEvent event'
      case 'entity_tame': return 'EntityTameEvent event'
      case 'entity_breed': return 'EntityBreedEvent event'
      case 'entity_explode': return 'EntityExplodeEvent event'
      case 'projectile_hit': return 'ProjectileHitEvent event'
      case 'player_move': return 'PlayerMoveEvent event'
      case 'weather_change': return 'WeatherChangeEvent event'
      default: return ''
    }
  }

  function getContextExtract(def: BlockDefinition): string {
    switch (def.id) {
      case 'entity_explode':
        return 'Entity _entity = event.getEntity();\n    Location loc = event.getLocation();\n    Player player = loc.getWorld().getPlayers().stream().findFirst().orElse(null);'
      case 'server_start':
      case 'server_stop':
        return ''
      case 'entity_death':
        return 'Entity _entity = event.getEntity();\n    Player player = _entity instanceof Player ? (Player) _entity : null;'
      default:
        return 'Player player = event.getPlayer();'
    }
  }

  const mainTrigger = triggerNodes[0]
  const triggerDef = getBlockById(mainTrigger.data.definitionId)
  if (!triggerDef) return '// Unknown trigger'

  const listenerAnnotation = getListenerAnnotation(triggerDef)
  const eventParam = getEventParam(triggerDef)
  const contextExtract = getContextExtract(triggerDef)

  const connectedNodes = getConnectedNodes(mainTrigger.id)

  let bodyLines: string[] = []
  if (contextExtract) bodyLines.push(`    ${contextExtract}`)

  // Command filter for player_command trigger
  if (triggerDef.id === 'player_command') {
    const cmd = (mainTrigger.data.properties?.command || '/hello').replace(/^\//, '')
    bodyLines.push(`    String _pref = "/${escapeJava(cmd.toLowerCase())}";\n    String _msg = event.getMessage().toLowerCase();\n    if (!_msg.equals(_pref) && !_msg.startsWith(_pref + " ")) return;`)
  }

  // Distance filter for player_move trigger
  if (triggerDef.id === 'player_move') {
    const minDist = mainTrigger.data.properties?.min_distance ?? 0
    if (minDist > 0) {
      bodyLines.push(`    if (event.getFrom().distanceSquared(event.getTo()) < ${(minDist * minDist).toFixed(1)}) return;`)
    }
  }

  for (const node of connectedNodes) {
    const code = generateNodeCode(node, 2)
    if (code) bodyLines.push(code)
  }

  const body = bodyLines.join('\n')

  const importSection = `import org.bukkit.Bukkit;
import org.bukkit.GameMode;
import org.bukkit.Location;
import org.bukkit.Material;
import org.bukkit.World;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.block.BlockBreakEvent;
import org.bukkit.event.block.BlockPlaceEvent;
import org.bukkit.entity.Entity;
import org.bukkit.entity.LivingEntity;
import org.bukkit.entity.Damageable;
import org.bukkit.event.entity.EntityDamageByEntityEvent;
import org.bukkit.event.entity.EntityDeathEvent;
import org.bukkit.event.entity.EntityExplodeEvent;
import org.bukkit.event.player.AsyncPlayerChatEvent;
import org.bukkit.event.player.PlayerCommandPreprocessEvent;
import org.bukkit.event.player.PlayerDeathEvent;
import org.bukkit.event.player.PlayerInteractEvent;
import org.bukkit.event.player.PlayerJoinEvent;
import org.bukkit.event.player.PlayerMoveEvent;
import org.bukkit.event.player.PlayerQuitEvent;
import org.bukkit.inventory.ItemStack;
import org.bukkit.plugin.java.JavaPlugin;
import org.bukkit.scheduler.BukkitRunnable;
import org.bukkit.entity.EntityType;
import org.bukkit.Sound;
import org.bukkit.block.Biome;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;`

  const pluginClass = `${project.name.replace(/[^a-zA-Z0-9]/g, '')}`

  return `package me.you.${pluginClass.toLowerCase()};

${importSection}

public class ${pluginClass} extends JavaPlugin implements Listener {
  private Map<String, String> variables = new HashMap<>();

  @Override
  public void onEnable() {
    getServer().getPluginManager().registerEvents(this, this);
${triggerDef.id === 'server_start' ? body.split('\n').map(l => '    ' + l).join('\n') : '    // Event listeners registered'}
  }

  ${listenerAnnotation}(${eventParam}) {
${body}
  }

  private double parseDouble(String value) {
    try {
      return Double.parseDouble(value);
    } catch (NumberFormatException e) {
      return 0.0;
    }
  }

  public String getVariable(String name) {
    return variables.getOrDefault(name, "");
  }
}
`
}
