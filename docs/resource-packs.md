# A guide to Minecraft resource packs

- [Each Minecraft version is a resource pack](#each-minecraft-version-is-a-resource-pack)
- [Namespaces](#namespaces)
- [Textures](#textures)
- [Blockstates](#blockstates)
  - [Block model identifier](#block-model-identifier)
  - [when selector](#when-selector)
- [Languages](#languages)
- [Models](#models)
  - [texture idents](#texture-idents)
- [Particles](#particles)
- [Shaders](#shaders)
- [Text](#text)
- [How to read my JSON specifications](#how-to-read-my-json-specifications)

## Each Minecraft version is a resource pack

You can see the entire possible structure of a resource pack by simply looking at the files for a Minecraft version!

Go to your Minecraft data location. On Linux this is `~/.minecraft` by default. Then, navigate to `versions/`. You will
see a list of directories, each pertaining to a different version, e.g. `1.16.3`. Navigate into one of these directories.

Inside this directory, there will be a `.jar` file. `jar` files are just zip archives, meaning you can easily extract them
to find the internal bits of the exectuable. You will see lots of `.class` files; ignore these. What you really want are the
directories like `assets/minecraft/textures/`, the location of all the block and item textures! What's more, if you navigate
into this directory for example, you can see the names of all the different textures and the structures of different data
files.

## Namespaces

Throughout this guide, you will see `minecraft` used. This is the default namespace. You may also use it for your resource
pack, but you can also use your own namespace. To create your own namespace, simply replace every occurance of `minecraft`
in this guide with whatever you want. That includes in directory names, too, so `assets/minecraft/textures/` could be
`assets/cheese/textures/` if you really wanted.

## Textures

- Location: `assets/minecraft/textures/`

- Subdirectories:
  - `assets/minecraft/textures/block`: textures for various different blocks
  - `assets/minecraft/textures/entity`: textures for entities (i.e. anything that isn't a block / can move)
  - `assets/minecraft/textures/environment`: textures for the world backdrop and weather (e.g. sun, moon, rain, snow)
  - `assets/minecraft/textures/environment`: textures for the world backdrop and weather (e.g. sun, moon, rain, snow)
  - `assets/minecraft/textures/font`: textures for Minecraft fonts. Not of real interest, apart from `ascii_sga.png`, which
    contains the enchanting table font.
  - `assets/minecraft/textures/gui`: textures for the user interface (e.g. buttons, menus)
  - `assets/minecraft/textures/items`: textures for items (anything that you can hold in the hotbar)
  - `assets/minecraft/textures/map`: textures for maps, for some reason in their own directory
  - `assets/minecraft/textures/misc`: textures for everything not already covered - mostly screen overlays (e.g. pumpkin helmet)
    but also for world borders and the enchanted weapon glint
  - `assets/minecraft/textures/mob_effect`: textures for the icons that appear when an effect is applied to the player (e.g. hunger, poison)
  - `assets/minecraft/textures/map`: textures for maps, for some reason in their own directory
  - `assets/minecraft/textures/models/armor`: textures for armour, mostly, but also for turtle shells
  - `assets/minecraft/textures/painting`: textures for paintings. Can be of any resolution (but above a certain resolution will be compressed in-game).
  - `assets/minecraft/textures/particle`: textures for particle effects

## Blockstates

- Location: `assets/minecraft/blockstates/`

This is a fairly complex system. For each block there is a `.json` file describing how that block should behave in the presence of adjacent blocks,
and how different variants of a block should behave.

Structure of each blockstate `.json` file:

```js
{
  "variants": {   // the different types of this block that can be placed, which are all considered to be the same block.
    "[variant-name]": "{variant-obj}",
    "": [         // alternative to [variant-name], use this to specify a list of unnamed variants which will be
      "{variant-obj}",
    ],
    "": "{variant-obj}",   // or, alternatively, just specify a single unnamed variant like this
  },
  "multipart": [  // instructions for how this block behaves when adjacent to other blocks
    {
      "when": {   // when this rule should apply
        "<direction>": "<string>",  // see 'when selector'
      },
      "apply": "{variant-obj}",   // what to do with block meeting the criteria
    }
  ]
}

"{variant-obj}" = {
  "model": "<string>",  // see 'block model identifier'
  "x": "<number>",      // rotation around x-axis
  "y": "<number>",      // rotation around y-axis
  "z": "<number>",      // rotation around z-axis
  "uvlock": "<bool>",   // not sure what this does, actually
}
```

### Block model identifier

This will change the block's model to that at the provided reference point. The reference must be to a block defined
in `assets/minecraft/models/`, with a given namespace. Example:

- `minecraft:block/andesite_wall_post`

### when selector

. The value that the string takes is one of:

- `"low"`: low blocks (e.g. pressure plate)
- `"tall"`: tall blocks (e.g. any normal block, fences)
- `"true"`: if there **is** an adjacent block in that direction
- `"false"`: if there **isn't** an adjacent block in that direction

e.g.

- `"up": "true"` makes the rule apply when there is a block above this one
- `"east": "low"` makes the rule apply when there is a low block east of this one

## Languages

- Location: `assets/minecraft/lang/`

This is very simple. Each translatable string in Minecraft has a unique identifier. The language is given as a single
json file with language code, e.g. `en_us.json`. The file takes the format:

```js
{
  "[unique-ident]": "[translated-string]",
}
```

## Models

- Location: `assets/minecraft/models/`

These files describe how to apply textures to different models, and how to display them in the inventory among other things.

Each description is derived from a 'parent' description, with the top-level one being `block/block`.

Model specifications are given as so:

```js
{
  "parent": "[parent-specifier]",   // which model to derive rules from, e.g. minecraft:block/block
  "gui-light": "[lighting-side]",   // one of "front", "side"
  "display": {  // all of these rules are optional
    "gui": "{display-rules}",     // rules for displaying in inventory
    "ground": "{display-rules}",  // rules for displaying on ground
    "fixed": "{display-rules}",   // rules for displaying on armour stand (?)
    "thirdperson_righthand": "{display-rules}",   // rules for displaying in 3rd person view
    "firstperson_righthand": "{display-rules}",   // rules for displaying in 1st person view main hand
    "firstperson_lefthand": "{display-rules}",    // rules for displaying in 1st person view offhand
  },
  "textures": {
    "[texture-ident]": "[texture-location]",  // e.g. location within resource pack
    "[texture-ident]": "#[texture-ident]",    // alternatively, this can reference another texture ident
  },
  "elements": [     // named areas to which textures can be mapped
    {
      "from": "<3-vector>",   // 0 - 16, 3d coordinate, the area from which this element applies
      "to": "<3-vector>",     // as above, but the endpoint of the area
      "faces": {
        "<direction>": {
          "uv": "<4-vector>",   // uv specifies which part of the texture should be used, in form [x, y, width, height]
          "texture": "#[texture-ident]",  // specifies which textures should apply to this face
          "cullface": "<direction>",  // culling direction for use by the renderer (e.g. bottom face might use "down")
          "rotation": "<number>",     // the rotation of the texture for this face
          "tintindex": "<number>",    // this only ever seems to have a value of zero
        },
      },
      "rotation": {   // another optional way to specify rotation of a texture on this element
        "origin": "<3-vector>",
        "axis": "<string>",   // one of x, y, z
        "angle": "<number>",  // rotation angle
        "rescale": "<bool>",
      },
      "shade": "<bool>",   // whether to shade this element
    },
  ],
  "ambientocclusion": "<bool>",   // whether to use ambient occlusion
}

"{display-rules}" = {
  "rotation": "<3-vector>",
  "translation": "<3-vector>",
  "scale": "<3-vector>",
}
```

Much of these rules are optional, but not all of them, so be careful.

There is one special value of `[parent-specifier]`, which is `"builtin/generated"`. This will create a 3D representation from
a texture, and is used for many items (think potions, weapons etc.).

### texture idents

Texture idents are given with a hash symbol # in front of them, e.g. `#side`. They will be replaced by actual texture references,
e.g. `minecraft:block/cobblestone`, depending on what they are specified to be for a given block. This happens in the
`"textures"` part of a model specification.

## Particles

- Location: `assets/minecraft/particles/`

Simply specifies which textures in the `assets/textures/particle/` directory to use.

```js
{
  "textures": [
    "[texture-location]",
  ],
}
```

## Shaders

- Location: `assets/minecraft/shaders/`

I'm not touching shaders, they're incredibly complex. Use at your own risk.

## Text

- Location: `assets/minecraft/texts/`

- `credits.txt` holds the game credits
- `end.txt` holds the ending scene after defeating the Ender Dragon
- `splashes.txt` holds splash screen messages, one per line

## How to read my JSON specifications

- anything in `[square-brackets]` can be replaced by your own text
- anything in `<angular-brackets>` is a type specification. The type of whatever replaces this
  must match what is specified. For example:
  - `<string>` could be `"dog"`, `"three hundred and sixty"`, `""`, but not `12` or `true`.
  - `<number>` can be any number, e.g. `34`, `0.1231`, `-13`, but not `"34"`.
  - `<bool>` must be one of `true`, `false`.
  - `<n-vector>` is an array of length n, with `<number>` elements, e.g. `[ 1, 2.1, -3 ]` for a `<3-vector>`.
  - `<direction>` is one of `"up"`, `"down"`, `"east"`, `"north"`, `"west"`, `"south"`
- anything in `{curly-brackets}` is a reference to a structure defined elsewhere. I do this to make specifications
  more concise, and to prevent accidental errors in the specification.
