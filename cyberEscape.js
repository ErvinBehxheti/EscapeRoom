#!/usr/bin/env node
// CYBER DETECTIVE - BEGINNER EDITION  =========================================
// A five-part escape-room for students who just learned JavaScript fundamentals
// Concepts covered (in increasing difficulty):
//  1. Variables & data types
//  2. Conditional logic
//  3. Loops & iterations
//  4. Functions (tiny algorithms)
//  5. Arrays & basic collection tricks
// -----------------------------------------------------------------------------
// HOW THE GAME WORKS
//   - Each “environment” prints an ALERT block + instructions.
//   - Inside the code you’ll see    // === TODO: …
//     Those lines are *wrong* on purpose. Students must edit them,
//     run the file again (`node cyberEscape.js`), and pass the verification.
//   - Passing all tasks in an environment shows an ACCESS CODE needed
//     for the next one (stored in variable `accessCodeFromPrev`).
//   - If any task fails, they’ll see which part is invalid.
// -----------------------------------------------------------------------------
// TEACHER TIP
//   If you want separate files, just cut along the big ASCII banners.
//   Otherwise a single file keeps line-numbers easy to reference in class.
// ============================================================================

// *** 0.  Framework & helpers *************************************************
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = q => new Promise(res => rl.question(q, a => res(a.trim())));

// Quick color helpers (works on most terminals)
const green = s => `\x1b[32m${s}\x1b[0m`;
const red   = s => `\x1b[31m${s}\x1b[0m`;

// Simple sleep for dramatic effect
const sleep = ms => new Promise(r => setTimeout(r, ms));

// Store access code between environments
let accessCodeFromPrev = "";

// ============================================================================
//  ENVIRONMENT 1 -- COMPROMISED NETWORK  (Variables & Data Types)
// ============================================================================
async function environment1() {
  console.clear();
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║      CYBER DETECTIVE – COMPROMISED NETWORK (Stage 1/5)       ║
╚══════════════════════════════════════════════════════════════╝\n`);
  console.log(
`SYSTEM ALERT: Core infrastructure variables corrupted!
MISSION: Fix five variable declarations to stabilise the city network.\n`);

  // ===== TASK 1: Security key (10-char string) ============================
  // === TODO: Replace null with a 10-character alphanumeric string =========
  let securityKey = null;

  // ===== TASK 2: Access level (integer 1-5) ===============================
  // === TODO: Replace 0 with a valid integer between 1 and 5 ===============
  let accessLevel = 0;

  // ===== TASK 3: Activate security protocol (boolean) =====================
  // === TODO: Set to true ===================================================
  let securityProtocolActive = false;

  // ===== TASK 4: System status (decimal 0 – 1) ============================
  // === TODO: Give a value such as 0.75 ====================================
  let systemStatus = -1;

  // ===== TASK 5: Convert emergency code "911" to number ===================
  const emergencyCode = "911";
  // === TODO: Convert using Number() or parseInt() =========================
  let emergencyCodeNumber = "not-a-number";

  // ---------- verification (no edits needed) ------------------------------
  const ok = verifyNetwork(
    securityKey, accessLevel, securityProtocolActive,
    systemStatus, emergencyCodeNumber
  );

  if (ok) {
    accessCodeFromPrev = "LOGIC-1001";
    console.log(green("\n✓ NETWORK STABLE - Access code unlocked → " + accessCodeFromPrev));
  } else {
    console.log(red("\n✗ NETWORK UNSTABLE – Fix the variables above and re-run."));
    process.exit(0);
  }
  await pauseForNext();
}

// -------- internal check (students don’t touch) ---------------------------
function verifyNetwork(key, lvl, on, status, codeNum) {
  const t1 = typeof key === "string" && key.length === 10;
  const t2 = Number.isInteger(lvl) && lvl >= 1 && lvl <= 5;
  const t3 = on === true;
  const t4 = typeof status === "number" && status >= 0 && status <= 1;
  const t5 = codeNum === 911;
  console.log("\nDiagnostics:");
  console.log(`- Security Key........ ${t1 ? "OK" : "FAIL"}`);
  console.log(`- Access Level........ ${t2 ? "OK" : "FAIL"}`);
  console.log(`- Protocol Active..... ${t3 ? "OK" : "FAIL"}`);
  console.log(`- System Status....... ${t4 ? "OK" : "FAIL"}`);
  console.log(`- Emergency Code...... ${t5 ? "OK" : "FAIL"}`);
  return t1 && t2 && t3 && t4 && t5;
}

// ============================================================================
//  ENVIRONMENT 2 -- LOGIC GATEWAY  (Conditionals)
// ============================================================================
async function environment2() {
  console.clear();
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║        CYBER DETECTIVE – LOGIC GATEWAY (Stage 2/5)           ║
╚══════════════════════════════════════════════════════════════╝\n`);

  const codeIn = await ask("ENTER ACCESS CODE FROM PREVIOUS STAGE ➜  ");
  if (codeIn !== accessCodeFromPrev) {
    console.log(red("\nACCESS DENIED – Wrong code!"));
    process.exit(0);
  }
  console.log(green("\nAccess granted.\n"));

  let allGood = true;

  // TASK 1: TRAFFIC LIGHT LOGIC --------------------------------------------
  allGood &= fixTrafficLogic();

  // TASK 2: UTILITY ROUTING -------------------------------------------------
  allGood &= fixUtilityRouting();

  // TASK 3: EMERGENCY DISPATCH ---------------------------------------------
  allGood &= fixEmergencyDispatch();

  if (allGood) {
    accessCodeFromPrev = "DEFENSE-2024";
    console.log(green("\n✓ LOGIC RESTORED – New code: " + accessCodeFromPrev));
  } else {
    console.log(red("\n✗ LOGIC STILL BROKEN – Review errors and retry."));
    process.exit(0);
  }
  await pauseForNext();
}

// ---------- TASK 1 helper --------------------------------------------------
function fixTrafficLogic() {
  const time24h = 14; // 2 PM
  const isRushHour = (time24h >= 7 && time24h <= 9) || (time24h >= 16 && time24h <= 18);
  const isEmergencyVehicle = false;
  const isPedWaiting = true;
  let status = "";

  // === TODO: Write correct if/else chain below ============================
  // Remember priority:
  //  1. Emergency vehicles
  //  2. Rush-hour main road
  //  3. Pedestrians (if waiting)
  //  4. Night flashing (22-6)
  //  5. Otherwise normal
  status = "TODO-FILL-ME";

  // ---------- check -------------------------------------------------------
  const ok =
    (isEmergencyVehicle && status === "EMERGENCY") ||
    (!isEmergencyVehicle && isRushHour && status === "MAIN ROAD") ||
    (!isEmergencyVehicle && !isRushHour && isPedWaiting && status === "PEDESTRIAN") ||
    ((time24h > 22 || time24h < 6) && status === "FLASHING") ||
    (status === "NORMAL");

  console.log(`Traffic signal status: ${status}  → ${ok ? "OK" : "BAD"}`);
  return ok;
}

// ---------- TASK 2 helper --------------------------------------------------
function fixUtilityRouting() {
  const district = "Downtown";
  const load = 85;
  let route = "";

  // === TODO: Replace with proper switch/if ================================
  // Rules: Downtown load>80 => "AUX", Residential => "CONTINUE",
  // Industrial load>60 => "BALANCE", Hospital => "BACKUP", else "STANDARD"
  route = "UNKNOWN";

  const ok =
    (district === "Downtown"   && load > 80 && route === "AUX")       ||
    (district === "Residential"                 && route === "CONTINUE") ||
    (district === "Industrial" && load > 60 && route === "BALANCE")  ||
    (district === "Hospital"                    && route === "BACKUP")   ||
    (["Downtown","Residential","Industrial","Hospital"].indexOf(district) < 0 && route === "STANDARD");

  console.log(`Utility routing for ${district}: ${route}  → ${ok ? "OK" : "BAD"}`);
  return ok;
}

// ---------- TASK 3 helper --------------------------------------------------
function fixEmergencyDispatch() {
  const medical = true;
  const fire    = false;
  const police  = false;
  const disaster= false;
  let dispatch = "";

  // === TODO: Build correct decision string ===============================
  // Expected strings: "ALL", "AMBULANCE", "FIRE", "POLICE", "NONE"
  dispatch = "???";

  const ok =
    (disaster                          && dispatch === "ALL")       ||
    (medical && fire                   && dispatch === "ALL")       ||
    (medical && !fire && !disaster     && dispatch === "AMBULANCE") ||
    (fire && !medical && !disaster     && dispatch === "FIRE")      ||
    ((police && !disaster && !medical && !fire) && dispatch === "POLICE") ||
    (!medical && !fire && !police && !disaster && dispatch === "NONE");
  console.log(`Emergency dispatch: ${dispatch}  → ${ok ? "OK" : "BAD"}`);
  return ok;
}

// ============================================================================
//  ENVIRONMENT 3 -- AUTOMATED DEFENSE  (Loops & Iterations)
// ============================================================================
async function environment3() {
  console.clear();
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║    CYBER DETECTIVE – DEFENSE SYSTEM (Stage 3/5)              ║
╚══════════════════════════════════════════════════════════════╝\n`);

  const codeIn = await ask("ENTER ACCESS CODE ➜  ");
  if (codeIn !== accessCodeFromPrev) {
    console.log(red("\nACCESS DENIED – Wrong code!"));
    process.exit(0);
  }
  console.log(green("\nAccess granted.\n"));

  let ok = true;
  ok &= fixCameraLoop();
  ok &= fixZoneSweeper();
  ok &= fixAlertGenerator();

  if (ok) {
    accessCodeFromPrev = "CRYPTO-4040";
    console.log(green("\n✓ DEFENSE ONLINE – New code: " + accessCodeFromPrev));
  } else {
    console.log(red("\n✗ DEFENSE OFFLINE – Repair loops and retry."));
    process.exit(0);
  }
  await pauseForNext();
}

// ---------- TASK 1 camera loop --------------------------------------------
function fixCameraLoop() {
  const sectors = ["N","E","S","W","C"];
  const scanned = [];

  // === TODO: Write a for-loop (or while) that pushes each sector once =====
  // Remove the wrong loop below
  /*
  for (let i = sectors.length; i >= 0; i--) {
    scanned.push(sectors[i]);
  }
  */
  // << YOUR LOOP START >>

  // << YOUR LOOP END   >>

  const ok = arraysEqual(sectors, scanned);
  console.log(`Camera scan pattern: ${scanned.join("")}  → ${ok ? "OK" : "BAD"}`);
  return ok;
}

// ---------- TASK 2 nested loops -------------------------------------------
function fixZoneSweeper() {
  const zones = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
  ];
  const checked = [];

  // === TODO: Proper nested loop to push 1-9 in order ======================
  // Delete the broken logic below
  /*
  let r = 0;
  while (r < zones.length) {
    let c = 0;
    do {
      checked.push(zones[r][c]);
      c++;
    } while (c < r);
    r++;
  }
  */
  // << YOUR LOOPS >>

  const flat = zones.flat();
  const ok = arraysEqual(flat, checked);
  console.log(`Zone sweep: [${checked}]  → ${ok ? "OK" : "BAD"}`);
  return ok;
}

// ---------- TASK 3 alert generator ----------------------------------------
function fixAlertGenerator() {
  const types  = ["Motion","Perimeter","Fire","Cyber"];
  const counts = [2,0,1,3];
  const generated = [];

  // === TODO: Generate correct number of alerts ============================
  // HINT: nested for or while
  // Clear wrong code
  /*
  for (let i=0;i<types.length;i++){
    generated.push(`ALERT:${types[i]}`);
  }
  */

  // << YOUR CODE >>

  const expected = counts.reduce((a,b)=>a+b,0);
  const ok = generated.length === expected &&
             generated.filter(a=>a.includes("Motion")).length === counts[0] &&
             generated.filter(a=>a.includes("Perimeter")).length === counts[1] &&
             generated.filter(a=>a.includes("Fire")).length === counts[2] &&
             generated.filter(a=>a.includes("Cyber")).length === counts[3];

  console.log(`Alerts generated: ${generated.length}/${expected}  → ${ok ? "OK" : "BAD"}`);
  return ok;
}

// ============================================================================
//  ENVIRONMENT 4 -- ENCRYPTION VAULT  (Functions)
// ============================================================================
async function environment4() {
  console.clear();
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║      CYBER DETECTIVE – ENCRYPTION VAULT (Stage 4/5)          ║
╚══════════════════════════════════════════════════════════════╝\n`);

  const codeIn = await ask("ENTER ACCESS CODE ➜  ");
  if (codeIn !== accessCodeFromPrev) {
    console.log(red("\nACCESS DENIED – Wrong code!"));
    process.exit(0);
  }
  console.log(green("\nAccess granted.\n"));

  let all = true;
  all &= testCaesar();
  all &= testVigenere();
  all &= testMAC();

  if (all) {
    accessCodeFromPrev = "CORE-3141";
    console.log(green("\n✓ VAULT SECURE – New code: " + accessCodeFromPrev));
  } else {
    console.log(red("\n✗ VAULT COMPROMISED – Fix the functions and rerun."));
    process.exit(0);
  }
  await pauseForNext();
}

// ---------- TODO Function 1: Caesar cipher ---------------------------------
function caesarEncrypt(text, key) {
  // === TODO: implement simple shift (capital letters wrap) ================
  return text; // wrong
}

// ---------- TODO Function 2: Vigenère cipher ------------------------------
function vigenereEncrypt(text, keyword) {
  // === TODO: implement basic Vigenère (A=0 shift) =========================
  return text; // wrong
}

// ---------- TODO Function 3: mini MAC -------------------------------------
function makeAuth(msg, secret) {
  // Very simple hash: sum of char codes + secret length, then to hex
  // === TODO: proper calculation (few lines) ===============================
  return "BAD";
}

// ---------- tests ----------------------------------------------------------
function testCaesar() {
  const ok =
    caesarEncrypt("ABC",3)          === "DEF" &&
    caesarEncrypt("HELLO",13)       === "URYYB" &&
    caesarEncrypt("Attack At 1!",1) === "Buubdl Bu 1!";

  console.log(`Caesar cipher tests → ${ok ? green("PASS") : red("FAIL")}`);
  return ok;
}
function testVigenere() {
  const ok =
    vigenereEncrypt("ATTACKATDAWN","LEMON") === "LXFOPVEFRNHR" &&
    vigenereEncrypt("HELLO","KEY")          === "RIJVS";

  console.log(`Vigenère cipher tests → ${ok ? green("PASS") : red("FAIL")}`);
  return ok;
}
function testMAC() {
  const a = makeAuth("MSG","KEY");
  const b = makeAuth("MSG","KEY");
  const c = makeAuth("MSG.","KEY");
  const ok = a === b && a !== c && a !== "BAD" && a.length >= 4;

  console.log(`Auth-code tests → ${ok ? green("PASS") : red("FAIL")}`);
  return ok;
}

// ============================================================================
//  ENVIRONMENT 5 -- CORE SYSTEM  (Arrays & Objects)
// ============================================================================
async function environment5() {
  console.clear();
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║    CYBER DETECTIVE – CORE SYSTEM (Final Stage 5/5)           ║
╚══════════════════════════════════════════════════════════════╝\n`);

  const codeIn = await ask("ENTER ACCESS CODE ➜  ");
  if (codeIn !== accessCodeFromPrev) {
    console.log(red("\nACCESS DENIED – Wrong code!"));
    process.exit(0);
  }
  console.log(green("\nAccess granted.\n"));

  let ok = true;
  ok &= taskAccessArray();
  ok &= taskUserPermissions();
  ok &= taskCommandDict();

  if (ok) {
    console.log(green("\n✓ CORE RESTORED – City saved, Phantom identified. 🎉"));
  } else {
    console.log(red("\n✗ CORE CORRUPTED – Correct remaining errors."));
  }
  rl.close();
}

// ---------- TASK 1: access levels array -----------------------------------
function taskAccessArray() {
  let accessLevels = [3,7,1,5,9,2,8,4,6];

  // === TODO STEP 1: sort ascending ========================================
  // accessLevels = [...]

  // STEP 2: median
  let median = -1; // TODO

  // STEP 3: sum
  let sum = 0;     // TODO

  // STEP 4: highLevels >=5
  let highLevels = []; // TODO

  const good =
    arraysEqual(accessLevels,[1,2,3,4,5,6,7,8,9]) &&
    median === 5 &&
    sum === 45 &&
    arraysEqual(highLevels,[5,6,7,8,9]);

  console.log(`Access array check → ${good ? "OK" : "BAD"}`);
  return good;
}

// ---------- TASK 2: user permissions --------------------------------------
function taskUserPermissions() {
  const admins   = ["sysadmin","netadmin","secadmin"];
  let powerUsers = ["op1","op2","dev1","analyst"];
  let regulars   = ["user1","user2","user3","user4","user5"];

  // STEP 1: allUsers
  let allUsers = []; // TODO

  // STEP 2: remove any "admin" substring from powerUsers (none here but test)
  // TODO

  // STEP 3: add "emergencyUser" to regulars
  // TODO

  // STEP 4: specialUsers = names containing '1' from admins + power
  let specialUsers = []; // TODO

  const expectedAll = [...admins,...powerUsers,...regulars];
  const good =
    arraysEqual(allUsers, expectedAll) &&
    regulars.includes("emergencyUser") &&
    powerUsers.every(u=>!u.includes("admin")) &&
    arraysEqual(specialUsers, ["dev1"]);

  console.log(`User permission check → ${good ? "OK" : "BAD"}`);
  return good;
}

// ---------- TASK 3: command dictionary ------------------------------------
function taskCommandDict() {
  let cmd = { REBOOT:5, SCAN:2, BACKUP:3, RESTORE:6, SHUTDOWN:1 };

  // 1. add LOCKDOWN:4
  // TODO
  // 2. remove SHUTDOWN
  // TODO
  // 3. change RESTORE to 7
  // TODO
  // 4. highPrio >=5
  let high = {}; // TODO

  const good =
    "LOCKDOWN" in cmd &&
    !("SHUTDOWN" in cmd) &&
    cmd.RESTORE === 7 &&
    Object.values(high).every(v=>v>=5) &&
    Object.keys(high).length === 3; // REBOOT, RESTORE, LOCKDOWN

  console.log(`Command dict check → ${good ? "OK" : "BAD"}`);
  return good;
}

// ============================================================================
//  Utility helpers (don’t change) ===========================================
function arraysEqual(a,b){
  return a.length===b.length && a.every((v,i)=>v===b[i]);
}
async function pauseForNext(){
  console.log("\nPress ENTER to continue…");
  await ask("");
}

// ============================================================================
//  GAME FLOW (sequential) ====================================================
(async ()=>{
  await environment1();
  await environment2();
  await environment3();
  await environment4();
  await environment5();
})();
