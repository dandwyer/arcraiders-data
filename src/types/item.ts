import * as z from "zod"; // https://zod.dev/basics
import { LocalizedText } from "./localized-text";

const Ingredients = z.record(z.string(), z.number()).describe("Ingredients");

const Effect = LocalizedText.and(
  z.object({
    value: z.xor([z.string(), z.number(), z.array(z.string())])
  })
).describe("Effect");

const Effects = z
  .record(z.string(), Effect)
  .describe("Effects")
  .describe("Effects");

export const ModSlots = z
  .strictObject({
    grip: z.array(z.string()),
    magazine: z.array(z.string()),
    muzzle: z.array(z.string()),
    special: z.array(z.string()),
    stock: z.array(z.string())
  })
  .partial()
  .describe("ModSlots");

const Vendor = z
  .strictObject({
    cost: z.any(),
    limit: z.number().optional(),
    refreshSeconds: z.number().optional(),
    requiredLevel: z.number().default(0),
    trader: z.string()
  })
  .describe("Vendor");

export const Item = z
  .object({
    // Match sort order defined by:
    // https://github.com/RaidTheory/arcraiders-data/blob/70ea45c891af8b86817f12ecf364df2d223cbc43/prettier.config.js#L28-L50
    id: z.string(),
    name: LocalizedText,
    description: LocalizedText.optional(),
    type: z.string(),
    rarity: z.string(),
    foundIn: z.string().optional(),
    value: z.number().default(0),
    weightKg: z.number().default(0),
    stackSize: z.number().default(1),
    craftQuantity: z.number().optional(),
    isWeapon: z.boolean().default(false),
    questItem: z.boolean().default(false),
    compatibleWith: z.array(z.string()).optional(),
    blueprintLocked: z.boolean().optional(),
    effects: Effects.optional(),
    craftBench: z.xor([z.string(), z.array(z.string())]).optional(),
    stationLevelRequired: z.number().optional(),
    recipe: Ingredients.optional(),
    recyclesInto: Ingredients.optional(),
    salvagesInto: Ingredients.optional(),
    upgradeCost: Ingredients.optional(),
    imageFilename: z.string().optional(),
    updatedAt: z.string(),

    // Sort everything else alphabetically after the above fields
    addedIn: z.string().optional(),
    modSlots: ModSlots.optional(),
    repairCost: Ingredients.optional(),
    repairDurability: z.number().optional(),
    tip: z.string().optional(),
    upgradesTo: z.string().optional(),
    vendors: z.array(Vendor).optional(),

    // Specific to the three shield variants:
    damageMitigation: z.number().optional(),
    movementSpeedModifier: z.number().optional(),
    shieldCharge: z.number().optional(),

    // Specific to several guns:
    agility: z.number().optional(),
    damage: z.number().optional(),
    fireRate: z.number().optional(),
    range: z.number().optional(),
    stability: z.number().optional(),
    stealth: z.number().optional()
  })
  .describe("Item");
