// ============================================================
// Gaspard's Minecraft Mods Wiki — Data-driven static wiki
// Add new mods by adding entries to the MODS array below.
// ============================================================

const MODS = [
  {
    id: "ghastrider",
    name: "GhastRider",
    tagline: "Charge-and-dash mechanic for the Happy Ghast",
    version: "26.1.2.1-alpha.1",
    mc: "26.1.2",
    loaders: ["Fabric", "NeoForge"],
    status: "Alpha",
    repo: "https://github.com/Gaspard4i/ghastrider",
    links: {
      github: "https://github.com/Gaspard4i/ghastrider/releases",
      modrinth: null,
      curseforge: null,
    },
    icon: "https://raw.githubusercontent.com/Gaspard4i/ghastrider/main/common/src/main/resources/ghastrider.png",
    sections: [
      {
        id: "overview",
        title: "Overview",
        content: `
          <p>GhastRider adds a <strong>charge-and-dash mechanic</strong> to the Happy Ghast mount, inspired by the horse jump bar system.</p>
          <p>Hold the dash key to charge, release to boost forward with a satisfying wind sound. Feed ice to your ghast for speed boosts!</p>
          <div class="flex flex-wrap gap-2 mt-4">
            <div class="badge badge-primary">Fabric</div>
            <div class="badge badge-secondary">NeoForge</div>
            <div class="badge badge-accent">MC 26.1.2</div>
            <div class="badge badge-warning">Alpha</div>
          </div>
        `,
      },
      {
        id: "dash",
        title: "Dash Mechanic",
        content: `
          <p>The core feature of GhastRider is the <strong>dash charge bar</strong> that replaces the XP bar when riding a Happy Ghast.</p>
          <h3 class="text-lg font-semibold mt-4 mb-2">How to Dash</h3>
          <ol class="list-decimal list-inside space-y-1">
            <li>Mount a Happy Ghast (equip it with a harness first)</li>
            <li>Hold <kbd class="kbd kbd-sm">G</kbd> to start charging — the bar fills up</li>
            <li>Release <kbd class="kbd kbd-sm">G</kbd> at the right moment for maximum power</li>
            <li>The bar shows the cooldown shrinking from your charge level</li>
            <li>Once the bar empties, you can dash again</li>
          </ol>
          <div class="alert alert-info mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>Releasing at 80%+ charge gives the best boost. But don't hold too long — the charge decays after hitting the max!</span>
          </div>
          <h3 class="text-lg font-semibold mt-6 mb-2">Mechanics</h3>
          <div class="overflow-x-auto">
            <table class="table table-zebra">
              <thead><tr><th>Feature</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td>Minimum charge</td><td>2/18 bars (~11%) — quick taps are ignored</td></tr>
                <tr><td>Overcharge decay</td><td>Holding past max gradually reduces charge (stops at minimum)</td></tr>
                <tr><td>Proportional cooldown</td><td>Shorter charges mean shorter cooldowns</td></tr>
                <tr><td>Auto-recharge</td><td>Keep holding G through cooldown to auto-restart charging</td></tr>
                <tr><td>Vertical boost</td><td>30% vertical lift during dash to maintain altitude</td></tr>
                <tr><td>Dash key</td><td><kbd class="kbd kbd-sm">G</kbd> (configurable in Controls)</td></tr>
              </tbody>
            </table>
          </div>
        `,
      },
      {
        id: "ice-feeding",
        title: "Ice Feeding",
        content: `
          <p>Feed ice items to your Happy Ghast by right-clicking for temporary <strong>speed boosts</strong>.</p>
          <div class="overflow-x-auto mt-4">
            <table class="table table-zebra">
              <thead><tr><th>Item</th><th>Effect</th><th>Duration</th><th>Notes</th></tr></thead>
              <tbody>
                <tr><td>Ice</td><td>Speed I</td><td>10s</td><td>Duration stacks</td></tr>
                <tr><td>Packed Ice</td><td>Speed II</td><td>10s</td><td>Duration stacks</td></tr>
                <tr><td>Blue Ice</td><td>Speed III</td><td>10s</td><td>Duration stacks</td></tr>
                <tr><td>Powder Snow Bucket</td><td>Speed I</td><td>10s</td><td>Empties to bucket</td></tr>
              </tbody>
            </table>
          </div>
          <div class="alert alert-warning mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            <span>Feeding a different ice type resets the duration to 10s with the new speed level.</span>
          </div>
          <h3 class="text-lg font-semibold mt-6 mb-2">Effects</h3>
          <ul class="list-disc list-inside space-y-1">
            <li>Custom ice crunch sound on feeding</li>
            <li>Happy ghast purr sound</li>
            <li>Item particles of the ice block you fed</li>
          </ul>
        `,
      },
      {
        id: "installation",
        title: "Installation",
        content: `
          <div class="steps steps-vertical lg:steps-horizontal w-full mb-6">
            <div class="step step-primary">Install loader</div>
            <div class="step step-primary">Add Fabric API</div>
            <div class="step step-primary">Download JAR</div>
            <div class="step step-primary">Drop in mods/</div>
            <div class="step step-primary">Play!</div>
          </div>
          <h3 class="text-lg font-semibold mb-2">Requirements</h3>
          <ul class="list-disc list-inside space-y-1">
            <li><strong>Minecraft 26.1.2</strong></li>
            <li><a href="https://fabricmc.net/" class="link link-primary" target="_blank">Fabric Loader</a> or <a href="https://neoforged.net/" class="link link-primary" target="_blank">NeoForge</a></li>
            <li><a href="https://modrinth.com/mod/fabric-api" class="link link-primary" target="_blank">Fabric API</a> (Fabric only)</li>
          </ul>
          <h3 class="text-lg font-semibold mt-6 mb-2">Download</h3>
          <div class="flex flex-wrap gap-3">
            <a href="https://github.com/Gaspard4i/ghastrider/releases/latest" class="btn btn-outline gap-2" target="_blank">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub Releases
            </a>
          </div>
          <p class="text-sm opacity-60 mt-2">Modrinth and CurseForge links coming soon.</p>
        `,
      },
      {
        id: "commands",
        title: "Commands",
        content: `
          <h3 class="text-lg font-semibold mb-2">Debug Function</h3>
          <div class="mockup-code mb-4">
            <pre data-prefix="$"><code>/function ghastrider:debug</code></pre>
          </div>
          <p>Sets up a test environment:</p>
          <ul class="list-disc list-inside space-y-1 mt-2">
            <li>Sets difficulty to peaceful</li>
            <li>Disables time advancement, mob spawning, weather</li>
            <li>Sets time to day, weather to clear</li>
            <li>Clears your inventory</li>
            <li>Kills existing Happy Ghasts</li>
            <li>Spawns 3 invulnerable Happy Ghasts</li>
            <li>Gives you: white harness, all ice types, snowballs</li>
          </ul>
          <div class="alert mt-4">
            <span>Requires a <strong>Creative world with cheats enabled</strong> (Superflat recommended).</span>
          </div>
        `,
      },
      {
        id: "changelog",
        title: "Changelog",
        content: `
          <h3 class="text-lg font-semibold mb-2">v26.1.2.1-alpha.1 <span class="badge badge-sm badge-warning">Alpha</span></h3>
          <p class="text-sm opacity-60 mb-3">2026-04-16</p>
          <p class="font-medium mb-2">First public release. Includes:</p>
          <ul class="list-disc list-inside space-y-1">
            <li>Dash mechanic with charge bar (hold G to charge, release to boost)</li>
            <li>Overcharge decay with minimum threshold</li>
            <li>Proportional cooldown</li>
            <li>Auto-recharge when holding through cooldown</li>
            <li>Vertical boost during dash</li>
            <li>Ice feeding with Speed effects (Ice/Packed Ice/Blue Ice/Powder Snow)</li>
            <li>Custom sounds (wind whoosh, ice crunch, ghast purr)</li>
            <li>Item particles on feeding</li>
            <li>Debug function for testing</li>
            <li>Fabric and NeoForge support for MC 26.1.2</li>
          </ul>
        `,
      },
      {
        id: "source",
        title: "Building from Source",
        content: `
          <p>Requires <strong>Java 25</strong>.</p>
          <div class="mockup-code mt-4">
            <pre data-prefix="$"><code>git clone https://github.com/Gaspard4i/ghastrider.git</code></pre>
            <pre data-prefix="$"><code>cd ghastrider</code></pre>
            <pre data-prefix="$"><code>./gradlew build</code></pre>
          </div>
          <h3 class="text-lg font-semibold mt-6 mb-2">Output JARs</h3>
          <ul class="list-disc list-inside space-y-1">
            <li><code class="text-sm">fabric/build/libs/ghastrider-fabric-*.jar</code></li>
            <li><code class="text-sm">neoforge/build/libs/ghastrider-neoforge-*.jar</code></li>
          </ul>
          <h3 class="text-lg font-semibold mt-6 mb-2">Run in development</h3>
          <div class="mockup-code">
            <pre data-prefix="$" class="text-info"><code># Fabric client</code></pre>
            <pre data-prefix="$"><code>./gradlew :fabric:runClient</code></pre>
            <pre data-prefix="$" class="text-info"><code># NeoForge client</code></pre>
            <pre data-prefix="$"><code>./gradlew :neoforge:runClient</code></pre>
          </div>
        `,
      },
    ],
  },
  {
    id: "numismatic-reimagined",
    name: "Numismatic Reimagined",
    tagline: "Custom currency system inspired by Numismatic Overhaul",
    version: "WIP",
    mc: "1.20.1",
    loaders: ["Fabric", "Forge"],
    status: "In Development",
    repo: "https://github.com/Gaspard4i/numismatic-reimagined",
    links: {
      github: "https://github.com/Gaspard4i/numismatic-reimagined",
      modrinth: null,
      curseforge: null,
    },
    icon: null,
    sections: [
      {
        id: "overview",
        title: "Overview",
        content: `
          <p><strong>Numismatic Reimagined</strong> is a Minecraft currency mod inspired by <a href="https://github.com/wisp-forest/numismatic-overhaul" class="link link-primary" target="_blank">Numismatic Overhaul</a>, rebuilt from scratch.</p>
          <p class="mt-2">It adds a full economy system with multiple coin denominations, shops, piggy banks, and villager trade integration.</p>
          <div class="flex flex-wrap gap-2 mt-4">
            <div class="badge badge-primary">Fabric</div>
            <div class="badge badge-secondary">Forge</div>
            <div class="badge badge-accent">MC 1.20.1</div>
            <div class="badge badge-ghost">In Development</div>
          </div>
          <div class="alert alert-info mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>This mod is currently in early development. Phase 1 (coin items) is complete.</span>
          </div>
        `,
      },
      {
        id: "currency",
        title: "Currency System",
        content: `
          <p>Five coin denominations with a base-100 exchange rate:</p>
          <div class="overflow-x-auto mt-4">
            <table class="table table-zebra">
              <thead><tr><th>Coin</th><th>Value</th><th>Exchange</th></tr></thead>
              <tbody>
                <tr><td>Bronze Coin</td><td>1</td><td>Base unit</td></tr>
                <tr><td>Silver Coin</td><td>100</td><td>= 100 Bronze</td></tr>
                <tr><td>Gold Coin</td><td>10,000</td><td>= 100 Silver</td></tr>
                <tr><td>Netherite Coin</td><td>1,000,000</td><td>= 100 Gold</td></tr>
                <tr><td>Star Coin</td><td>Unique</td><td>Achievement reward</td></tr>
              </tbody>
            </table>
          </div>
          <p class="mt-4">The <strong>Star Coin</strong> is a special trophy coin earned by accumulating 1,000 Netherite Coins worth of total transactions. It's unique per player but not soulbound.</p>
        `,
      },
      {
        id: "planned",
        title: "Planned Features",
        content: `
          <p>The mod is being developed in 12 phases:</p>
          <ul class="timeline timeline-vertical timeline-compact">
            <li>
              <div class="timeline-start timeline-box">Coin Items + Registration</div>
              <div class="timeline-middle"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-success"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.06l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" /></svg></div>
              <hr class="bg-success"/>
            </li>
            <li>
              <hr class="bg-success"/>
              <div class="timeline-start timeline-box">Purse System (Currency Storage)</div>
              <div class="timeline-middle"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clip-rule="evenodd" /></svg></div>
              <hr/>
            </li>
            <li>
              <hr/>
              <div class="timeline-start timeline-box">Piggy Bank Block</div>
              <div class="timeline-middle"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clip-rule="evenodd" /></svg></div>
              <hr/>
            </li>
            <li>
              <hr/>
              <div class="timeline-start timeline-box">Shop Block</div>
              <div class="timeline-middle"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clip-rule="evenodd" /></svg></div>
              <hr/>
            </li>
            <li>
              <hr/>
              <div class="timeline-start timeline-box">Configuration System</div>
              <div class="timeline-middle"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clip-rule="evenodd" /></svg></div>
              <hr/>
            </li>
            <li>
              <hr/>
              <div class="timeline-start timeline-box">Loot Tables + Mob Drops</div>
              <div class="timeline-middle"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clip-rule="evenodd" /></svg></div>
              <hr/>
            </li>
            <li>
              <hr/>
              <div class="timeline-start timeline-box">Villager Trades</div>
              <div class="timeline-middle"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clip-rule="evenodd" /></svg></div>
              <hr/>
            </li>
            <li>
              <hr/>
              <div class="timeline-start timeline-box">Marketplace + Commands</div>
              <div class="timeline-middle"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clip-rule="evenodd" /></svg></div>
              <hr/>
            </li>
            <li>
              <hr/>
              <div class="timeline-start timeline-box">Achievements + Star Coin</div>
              <div class="timeline-middle"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clip-rule="evenodd" /></svg></div>
              <hr/>
            </li>
            <li>
              <hr/>
              <div class="timeline-start timeline-box">Security Hardening</div>
              <div class="timeline-middle"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clip-rule="evenodd" /></svg></div>
              <hr/>
            </li>
            <li>
              <hr/>
              <div class="timeline-start timeline-box">Addon API</div>
              <div class="timeline-middle"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clip-rule="evenodd" /></svg></div>
              <hr/>
            </li>
            <li>
              <hr/>
              <div class="timeline-start timeline-box">NeoForge + MC 1.21.1 Port</div>
              <div class="timeline-middle"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clip-rule="evenodd" /></svg></div>
            </li>
          </ul>
        `,
      },
    ],
  },
];

// ============================================================
// Router — hash-based (#mod/section)
// ============================================================

function getRoute() {
  const hash = location.hash.slice(1) || "";
  const parts = hash.split("/");
  return { modId: parts[0] || null, sectionId: parts[1] || null };
}

function navigate(modId, sectionId) {
  if (modId && sectionId) {
    location.hash = `${modId}/${sectionId}`;
  } else if (modId) {
    location.hash = modId;
  } else {
    location.hash = "";
  }
}

// ============================================================
// Rendering
// ============================================================

function renderHome() {
  return `
    <div class="text-center py-12">
      <h1 class="text-4xl font-bold mb-2">Minecraft Mods Wiki</h1>
      <p class="text-lg opacity-70 mb-8">Documentation for all mods by Gaspard4i</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      ${MODS.map(renderModCard).join("")}
    </div>
  `;
}

function renderModCard(mod) {
  const statusColor = mod.status === "Alpha" ? "badge-warning" : "badge-ghost";
  return `
    <div class="card bg-base-100 shadow-md hover:shadow-lg transition-shadow cursor-pointer" onclick="navigate('${mod.id}','${mod.sections[0].id}')">
      <div class="card-body">
        <div class="flex items-start gap-4">
          ${mod.icon ? `<img src="${mod.icon}" alt="${mod.name}" class="w-16 h-16 rounded-lg" onerror="this.style.display='none'">` : `<div class="w-16 h-16 rounded-lg bg-base-300 flex items-center justify-center text-2xl shrink-0">⛏️</div>`}
          <div class="min-w-0">
            <h2 class="card-title">${mod.name}</h2>
            <p class="opacity-70">${mod.tagline}</p>
          </div>
        </div>
        <div class="flex flex-wrap gap-2 mt-3">
          ${mod.loaders.map((l) => `<div class="badge badge-outline badge-sm">${l}</div>`).join("")}
          <div class="badge badge-sm badge-accent">MC ${mod.mc}</div>
          <div class="badge badge-sm ${statusColor}">${mod.status}</div>
          ${mod.version !== "WIP" ? `<div class="badge badge-sm badge-neutral">v${mod.version}</div>` : ""}
        </div>
        <div class="card-actions justify-end mt-2">
          <a href="${mod.repo}" class="btn btn-ghost btn-xs gap-1" target="_blank" rel="noopener" onclick="event.stopPropagation()">
            GitHub
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
          </a>
        </div>
      </div>
    </div>
  `;
}

function renderModPage(mod, sectionId) {
  const section = mod.sections.find((s) => s.id === sectionId) || mod.sections[0];
  return `
    <div class="mb-6">
      <div class="breadcrumbs text-sm">
        <ul>
          <li><a href="#" onclick="navigate(null);return false;">Wiki</a></li>
          <li><a href="#${mod.id}/${mod.sections[0].id}" onclick="navigate('${mod.id}','${mod.sections[0].id}');return false;">${mod.name}</a></li>
          <li>${section.title}</li>
        </ul>
      </div>
    </div>
    <div class="prose max-w-none">
      <h1>${section.title}</h1>
      ${section.content}
    </div>
  `;
}

// ============================================================
// Sidebar
// ============================================================

function renderSidebar(modId) {
  if (!modId) {
    return MODS.map(
      (mod) => `
      <li>
        <a href="#${mod.id}/${mod.sections[0].id}" class="sidebar-link">
          ${mod.name}
        </a>
      </li>
    `
    ).join("");
  }
  const mod = MODS.find((m) => m.id === modId);
  if (!mod) return "";
  const { sectionId } = getRoute();
  return `
    <li class="menu-title">${mod.name}</li>
    ${mod.sections
      .map(
        (s) => `
      <li>
        <a href="#${mod.id}/${s.id}" class="sidebar-link ${s.id === sectionId ? "active" : ""}">
          ${s.title}
        </a>
      </li>
    `
      )
      .join("")}
    <li class="mt-4"><a href="#" class="sidebar-link opacity-60" onclick="navigate(null);return false;">← All mods</a></li>
  `;
}

function renderNavMods() {
  return MODS.map(
    (mod) =>
      `<li><a href="#${mod.id}/${mod.sections[0].id}">${mod.name}</a></li>`
  ).join("");
}

// ============================================================
// App
// ============================================================

function render() {
  const { modId, sectionId } = getRoute();
  const content = document.getElementById("content");
  const sidebar = document.getElementById("sidebar-nav");
  const sidebarMobile = document.getElementById("sidebar-nav-mobile");
  const navMods = document.getElementById("nav-mods");

  if (!modId) {
    content.innerHTML = renderHome();
  } else {
    const mod = MODS.find((m) => m.id === modId);
    if (mod) {
      content.innerHTML = renderModPage(mod, sectionId);
    } else {
      content.innerHTML = `<div class="alert alert-error">Mod not found: ${modId}</div>`;
    }
  }

  const sidebarHtml = renderSidebar(modId);
  sidebar.innerHTML = sidebarHtml;
  sidebarMobile.innerHTML = sidebarHtml;
  navMods.innerHTML = renderNavMods();

  // Close mobile sidebar on navigation
  document.getElementById("sidebar-toggle").checked = false;

  // Scroll to top
  window.scrollTo(0, 0);
}

// Theme
const themeSelect = document.getElementById("theme-select");
const savedTheme = localStorage.getItem("wiki-theme") || "dark";
document.documentElement.setAttribute("data-theme", savedTheme);
themeSelect.value = savedTheme;
themeSelect.addEventListener("change", (e) => {
  document.documentElement.setAttribute("data-theme", e.target.value);
  localStorage.setItem("wiki-theme", e.target.value);
});

// Mobile sidebar toggle
const sidebarToggle = document.getElementById("sidebar-toggle");
const overlay = document.getElementById("sidebar-overlay");
const mobileSidebar = document.getElementById("mobile-sidebar");
sidebarToggle.addEventListener("change", () => {
  if (sidebarToggle.checked) {
    overlay.classList.remove("hidden");
    mobileSidebar.classList.remove("-translate-x-full");
  } else {
    overlay.classList.add("hidden");
    mobileSidebar.classList.add("-translate-x-full");
  }
});

// Route changes
window.addEventListener("hashchange", render);
render();
